const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { findAssetPath, listAssetsSnapshot, toFileUrl } = require('./shared/assets.cjs');
const { createDesktopPaths, ensureDesktopDirs } = require('./shared/paths.cjs');

// ─── Voiceover helpers (runs in main process, no HTTP server needed) ──────────

function buildRuleBasedNarration(slideText, maxWords = 24) {
  const cleanPart = (v) => (v || '').replace(/\s+/g, ' ').trim();
  const parts = slideText.split('++').map(cleanPart).filter(Boolean);
  const [, headline, body, highlight] = parts;
  const core = [headline, body, highlight].filter(Boolean).join('، ').replace(/\s+/g, ' ').trim();
  const fallback = cleanPart(slideText.replace(/\+\+/g, '، '));
  let narration = (core || fallback)
    .replace(/\bفي هذه الشريحة\b/g, '')
    .replace(/\bتوضح الشريحة\b/g, '')
    .replace(/\bنرى هنا\b/g, '')
    .replace(/\bالصورة تعرض\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const words = narration.split(/\s+/).filter(Boolean);
  if (words.length > maxWords) narration = words.slice(0, maxWords).join(' ') + '.';
  return narration;
}

function pcmToWav(pcmBuffer, sampleRate = 24000, channels = 1, bitsPerSample = 16) {
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);
  return Buffer.concat([header, pcmBuffer]);
}

function parseSampleRate(mimeType) {
  if (!mimeType) return 24000;
  const match = mimeType.match(/rate=(\d+)/);
  if (!match) return 24000;
  const rate = parseInt(match[1], 10);
  return Number.isFinite(rate) && rate > 0 ? rate : 24000;
}

async function callGeminiTts(text, { apiKey, ttsModel, voiceName }) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${ttsModel}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const promptVariants = [`Read aloud: ${text}`, `Say in a clear neutral voice: ${text}`];

  for (const ttsPrompt of promptVariants) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: ttsPrompt }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
        },
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result?.error?.message || `Gemini TTS HTTP ${res.status}`);

    const part = result.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (part?.inlineData?.data) {
      return { data: part.inlineData.data, mimeType: part.inlineData.mimeType };
    }
  }
  throw new Error('Gemini TTS did not return audio data');
}

let mainWindow = null;
let renderWorker = null;
let requestCounter = 0;
const pendingRequests = new Map();

function createPaths() {
  return createDesktopPaths({
    packaged: app.isPackaged,
    appHome: app.isPackaged
      ? path.dirname(app.getPath('exe'))
      : path.join(process.env.LOCALAPPDATA || process.cwd(), 'InfographicGeneratorDesktopV2Dev'),
    resourcesPath: process.resourcesPath,
  });
}

const desktopPaths = createPaths();

function readFileAsDataUrl(filePath) {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      return null;
    }

    const extension = path.extname(filePath).toLowerCase();
    const mimeTypeMap = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.otf': 'font/otf',
      '.ttf': 'font/ttf',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
    };
    const mimeType = mimeTypeMap[extension] || 'application/octet-stream';
    const base64 = fs.readFileSync(filePath).toString('base64');
    return `data:${mimeType};base64,${base64}`;
  } catch {
    return null;
  }
}

function writeWorkerLog(prefix, value) {
  try {
    fs.mkdirSync(desktopPaths.appHome, { recursive: true });
    fs.appendFileSync(
      path.join(desktopPaths.appHome, 'desktop-v2-worker.log'),
      `[${new Date().toISOString()}] ${prefix} ${value}\n`,
    );
  } catch {
    // Logging must never break the desktop app.
  }
}

function sendProgress(payload) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send('desktop:render-progress', payload);
}

function clearPendingRequests(errorMessage, targetWorkerName = null) {
  for (const [requestId, pending] of pendingRequests.entries()) {
    if (targetWorkerName && pending.workerName !== targetWorkerName) {
      continue;
    }

    pending.reject(new Error(errorMessage));
    pendingRequests.delete(requestId);
  }
}

let renderWorkerInfograph = null;
let renderWorkerMotadawel = null;

function spawnRenderWorker(model) {
  const isMotadawel = model === 'motadawel';
  let activeWorker = isMotadawel ? renderWorkerMotadawel : renderWorkerInfograph;

  if (activeWorker && !activeWorker.killed) {
    return activeWorker;
  }

  const workerEntry = isMotadawel
    ? path.join(desktopPaths.codeRoot, 'motadawel', 'worker', 'render-worker-motadawel.cjs')
    : desktopPaths.workerScript;

  const workerCwd = app.isPackaged ? desktopPaths.appHome : desktopPaths.repoRoot;

  const newWorker = spawn(process.execPath, [workerEntry], {
    cwd: workerCwd,
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',
      DESKTOP_V2_PACKAGED: String(app.isPackaged),
      DESKTOP_V2_APP_HOME: desktopPaths.appHome,
      DESKTOP_V2_RESOURCES_PATH: process.resourcesPath,
    },
    stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
    windowsHide: true,
  });

  const workerName = isMotadawel ? 'motadawel' : 'infograph';

  newWorker.stdout.on('data', (data) => {
    writeWorkerLog(`stdout[${workerName}]`, data.toString().trim());
  });

  newWorker.stderr.on('data', (data) => {
    writeWorkerLog(`stderr[${workerName}]`, data.toString().trim());
  });

  newWorker.on('error', (error) => {
    writeWorkerLog(`spawn-error[${workerName}]`, error.stack || error.message);
    clearPendingRequests(`Failed to start ${workerName} render worker: ${error.message}`, workerName);
    if (isMotadawel) renderWorkerMotadawel = null;
    else renderWorkerInfograph = null;
  });

  newWorker.on('message', (message) => {
    if (!message || typeof message !== 'object') return;

    if (message.type === 'progress') {
      sendProgress(message.payload);
      return;
    }

    if (message.type !== 'response') return;

    const pending = pendingRequests.get(message.id);
    if (!pending) return;

    pendingRequests.delete(message.id);

    if (message.ok) {
      pending.resolve(message.payload);
      return;
    }

    pending.reject(new Error(message.error || `${workerName} worker failed`));
  });

  newWorker.on('exit', (code, signal) => {
    writeWorkerLog(`exit[${workerName}]`, `code=${code ?? 'null'} signal=${signal ?? 'null'}`);
    clearPendingRequests(`${workerName} worker stopped unexpectedly`, workerName);
    if (isMotadawel) renderWorkerMotadawel = null;
    else renderWorkerInfograph = null;
  });

  if (isMotadawel) renderWorkerMotadawel = newWorker;
  else renderWorkerInfograph = newWorker;

  return newWorker;
}

function requestWorker(action, payload) {
  return new Promise((resolve, reject) => {
    const activeWorker = spawnRenderWorker(payload?.model);

    const id = `req-${Date.now()}-${++requestCounter}`;
    const workerName = payload?.model === 'motadawel' ? 'motadawel' : 'infograph';
    pendingRequests.set(id, { resolve, reject, workerName });

    if (!activeWorker || !activeWorker.connected) {
      pendingRequests.delete(id);
      reject(new Error('Render worker is not available'));
      return;
    }

    activeWorker.send({ id, action, payload }, (error) => {
      if (!error) {
        return;
      }

      pendingRequests.delete(id);
      reject(new Error(`Failed to send render request: ${error.message}`));
    });
  });
}

async function createWindow() {
  ensureDesktopDirs(desktopPaths);

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 920,
    minWidth: 1100,
    minHeight: 760,
    show: false,
    backgroundColor: '#0f172a',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
      preload: desktopPaths.preloadScript,
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  await mainWindow.loadFile(desktopPaths.rendererHtml);
}

function buildBootstrapPayload() {
  const logoPath = findAssetPath(desktopPaths, 'root', 'logo.png');
  const fontPath = findAssetPath(desktopPaths, 'fonts', 'alfont_com_AlFont_com_AvenirArabic-Heavy.otf')
    || findAssetPath(desktopPaths, 'root', 'alfont_com_AlFont_com_AvenirArabic-Heavy.otf');
  return {
    mode: app.isPackaged ? 'packaged' : 'development',
    appHome: desktopPaths.appHome,
    outputDir: desktopPaths.outputDir,
    assetsDir: desktopPaths.assetsDir,
    logoDataUrl: readFileAsDataUrl(logoPath),
    fontDataUrl: readFileAsDataUrl(fontPath),
    assets: listAssetsSnapshot(desktopPaths),
  };
}

ipcMain.handle('desktop:bootstrap', async () => buildBootstrapPayload());

ipcMain.handle('desktop:refresh-assets', async () => listAssetsSnapshot(desktopPaths));

ipcMain.handle('desktop:pick-slides', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select slide media',
    filters: [{ name: 'Media', extensions: ['png', 'jpg', 'jpeg', 'webp', 'mp4', 'mov', 'webm'] }],
    properties: ['openFile', 'multiSelections'],
  });

  if (result.canceled) {
    return [];
  }

  return result.filePaths.map((filePath, index) => ({
    id: `slide-${Date.now()}-${index}`,
    imagePath: filePath,
    fileUrl: toFileUrl(filePath),
    text: '',
    isMuted: true,
  }));
});

ipcMain.handle('desktop:pick-main-video', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select main video',
    filters: [{ name: 'Videos', extensions: ['mp4', 'mov', 'webm'] }],
    properties: ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  return {
    path: filePath,
    url: toFileUrl(filePath),
  };
});

ipcMain.handle('desktop:pick-voiceover', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select Voiceover audio',
    filters: [{ name: 'Audio', extensions: ['mp3', 'wav', 'm4a', 'aac'] }],
    properties: ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  return {
    path: filePath,
    url: toFileUrl(filePath),
  };
});

ipcMain.handle('desktop:render', async (_event, payload) => {
  sendProgress({
    stage: 'queued',
    progress: 0,
    message: 'Preparing render job...',
  });

  return requestWorker('render', payload);
});

ipcMain.handle('desktop:cancel-render', async (_event, payload) => {
  const workerName = payload?.model === 'motadawel' ? 'motadawel' : 'infograph';
  const worker = workerName === 'motadawel' ? renderWorkerMotadawel : renderWorkerInfograph;
  if (worker && !worker.killed) {
    worker.kill('SIGINT');
    writeWorkerLog(`cancel[${workerName}]`, 'Render worker killed by user');
    return true;
  }
  return false;
});

ipcMain.handle('desktop:open-output-folder', async () => shell.openPath(desktopPaths.outputDir));

ipcMain.handle('desktop:reveal-in-folder', async (_event, targetPath) => shell.showItemInFolder(targetPath));

ipcMain.handle('desktop:open-file', async (_event, targetPath) => shell.openPath(targetPath));

function getSettingsPath() {
  return path.join(app.getPath('userData'), 'infograph-settings.json');
}

ipcMain.handle('desktop:get-settings', async () => {
  try {
    const settingsPath = getSettingsPath();
    if (!fs.existsSync(settingsPath)) return {};
    const raw = fs.readFileSync(settingsPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
});

ipcMain.handle('desktop:save-settings', async (_event, settings) => {
  try {
    const settingsPath = getSettingsPath();
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('desktop:generate-voiceovers', async (_event, payload) => {
  const {
    slides = [],
    voiceName = 'Charon',
    ttsModel = 'gemini-2.5-flash-preview-tts',
    apiKey: payloadKey,
    maxWords = 24,
  } = payload;

  // Resolve API key: payload → settings file → env var
  let apiKey = payloadKey && payloadKey.trim() ? payloadKey.trim() : null;
  if (!apiKey) {
    try {
      const raw = fs.readFileSync(getSettingsPath(), 'utf-8');
      apiKey = JSON.parse(raw).geminiApiKey || null;
    } catch {}
  }
  if (!apiKey) {
    apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_TTS_API_KEY || null;
  }
  if (!apiKey) {
    return { success: false, error: 'مفتاح Gemini API مفقود. أضفه في إعدادات البرنامج (⚙️).' };
  }

  const voiceoverDir = path.join(app.getPath('userData'), 'voiceovers');
  fs.mkdirSync(voiceoverDir, { recursive: true });

  const updatedSlides = [];
  const errors = [];

  for (const slide of slides) {
    if (!slide?.text?.trim()) {
      updatedSlides.push(slide);
      continue;
    }
    try {
      const narrationText = buildRuleBasedNarration(slide.text, maxWords);
      const { data, mimeType } = await callGeminiTts(narrationText, { apiKey, ttsModel, voiceName });

      const pcmBuffer = Buffer.from(data, 'base64');
      const sampleRate = parseSampleRate(mimeType);
      const wavBuffer = pcmToWav(pcmBuffer, sampleRate);

      const hash = crypto.createHash('sha1').update(narrationText).digest('hex').slice(0, 10);
      const fileName = `vo-${Date.now()}-${hash}.wav`;
      const filePath = path.join(voiceoverDir, fileName);
      fs.writeFileSync(filePath, wavBuffer);

      const durationMs = Math.round(((wavBuffer.length - 44) / (sampleRate * 2)) * 1000);

      updatedSlides.push({
        ...slide,
        voiceoverText: narrationText,
        voiceoverUrl: toFileUrl(filePath),
        voiceoverPath: filePath,
        voiceoverDurationMs: durationMs,
      });
    } catch (err) {
      errors.push({ id: slide.id, error: err?.message || String(err) });
      updatedSlides.push(slide);
    }
  }

  return { success: errors.length === 0, slides: updatedSlides, errors };
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (renderWorkerInfograph && !renderWorkerInfograph.killed) {
    renderWorkerInfograph.kill();
  }
  if (renderWorkerMotadawel && !renderWorkerMotadawel.killed) {
    renderWorkerMotadawel.kill();
  }
});
