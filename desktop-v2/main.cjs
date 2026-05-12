const { app, BrowserWindow, Menu, dialog, ipcMain, shell } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');

// ─── PNG generator (pure Node.js, no deps) ────────────────────────────────

const _CRC32_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();

function _crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = _CRC32_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function _pngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.allocUnsafe(4); lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.allocUnsafe(4); crcBuf.writeUInt32BE(_crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function generateSolidPng(w, h, r, g, b) {
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = ihdr[11] = ihdr[12] = 0;
  const rowLen = 1 + w * 3;
  const raw = Buffer.alloc(h * rowLen);
  for (let y = 0; y < h; y++) {
    const o = y * rowLen;
    raw[o] = 0;
    for (let x = 0; x < w; x++) { raw[o+1+x*3]=r; raw[o+2+x*3]=g; raw[o+3+x*3]=b; }
  }
  const idat = zlib.deflateSync(raw, { level: 6 });
  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    _pngChunk('IHDR', ihdr),
    _pngChunk('IDAT', idat),
    _pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function ensurePlaceholderPng() {
  const dir = path.join(app.getPath('userData'), 'placeholders');
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'content-placeholder.png');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateSolidPng(1920, 1080, 15, 23, 42));
  }
  return filePath;
}

const { findAssetPath, listAssetsSnapshot, toFileUrl } = require('./shared/assets.cjs');
const { createDesktopPaths, ensureDesktopDirs } = require('./shared/paths.cjs');
const {
  inferProjectConfigFromUrl,
  saveProject,
  openProject,
} = require('./shared/project-store.cjs');

// ─── Voiceover helpers (runs in main process, no HTTP server needed) ──────────

function truncateToWords(text, maxWords) {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return words.slice(0, maxWords).join(' ').replace(/[،,]$/, '') + '.';
}

function wordCount(text) {
  return text ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

async function reviewVoiceoverTexts(texts, maxWords, { apiKey, model }) {
  const overLimit = texts
    .map((t, i) => ({ i, t }))
    .filter(({ t }) => wordCount(t) > maxWords);

  if (overLimit.length === 0) return texts;

  const numbered = overLimit.map(({ t }, n) => `${n + 1}. "${t}"`).join('\n');
  const prompt = `أعد صياغة كل نص صوتي أدناه في جملة عربية واحدة طبيعية لا تتجاوز ${maxWords} كلمة.
حافظ على الفكرة الجوهرية فقط. لا تبدأ بـ "يهدف" أو "يقترح" — ابدأ بفعل أو اسم مباشر.

النصوص للمراجعة:
${numbered}

أعد JSON فقط بهذا الشكل: {"results": ["النص 1 المُعاد", "النص 2 المُعاد", ...]}`;

  const body = JSON.stringify({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
  });

  try {
    const raw = await httpsPost(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      body,
    );
    const response = JSON.parse(raw);
    const content = response?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const parsed = JSON.parse(content);
    const results = Array.isArray(parsed.results) ? parsed.results : [];

    const output = [...texts];
    overLimit.forEach(({ i }, n) => {
      const reviewed = results[n];
      if (reviewed && typeof reviewed === 'string') {
        output[i] = truncateToWords(reviewed, maxWords);
      }
    });
    return output;
  } catch {
    // If review fails, fall back to hard truncation (already applied)
    return texts;
  }
}

function buildRuleBasedNarration(slideText, maxWords = 18) {
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

const SPECIAL_SLIDE_TYPES = new Set(['cover', 'content', 'question']);

function cleanGeneratedText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function stripSlideSeparators(value) {
  return cleanGeneratedText(value).split('++').map(cleanGeneratedText).filter(Boolean);
}

function textToQuestion(value, fallback) {
  const parts = stripSlideSeparators(value);
  const questionPart = parts.find((part) => /[؟?]/.test(part)) || cleanGeneratedText(value);
  const question = cleanGeneratedText(questionPart || fallback || 'ما السؤال الأهم الذي لا يجيب عنه هذا الإنفوجراف؟');
  return /[؟?]$/.test(question) ? question : `${question}؟`;
}

function inferCoverTitle(topic, slides) {
  const first = slides.find((slide) => slide && slide.slideType !== 'question') || slides[0] || {};
  const parts = stripSlideSeparators(first.text);
  const candidate = cleanGeneratedText(first.title || parts[1] || parts[0] || topic);
  return candidate.length > 90 ? `${candidate.slice(0, 87).trim()}...` : candidate;
}

function ensureOpeningAndClosingSlides(slides, { topic, count, voMaxWords }) {
  const normalized = (Array.isArray(slides) ? slides : []).map((slide) => ({
    ...slide,
    slideType: SPECIAL_SLIDE_TYPES.has(slide.slideType) ? slide.slideType : 'content',
  }));

  const existingCover = normalized.find((slide) => slide.slideType === 'cover');
  const existingQuestion = [...normalized].reverse().find((slide) => slide.slideType === 'question');
  const contentSlides = normalized.filter((slide) => slide !== existingCover && slide !== existingQuestion);
  const maxContentSlides = Math.max(1, count - 2);

  const coverTitle = inferCoverTitle(topic, existingCover ? [existingCover] : contentSlides);
  const cover = {
    ...(existingCover || {}),
    slideType: 'cover',
    title: cleanGeneratedText(existingCover?.title || coverTitle),
    text: cleanGeneratedText(existingCover?.title || coverTitle),
    voiceoverText: truncateToWords(existingCover?.title || coverTitle, voMaxWords),
    visualHint: cleanGeneratedText(existingCover?.visualHint || 'غلاف افتتاحي بعنوان كبير في منتصف الشاشة'),
    imagePrompt: cleanGeneratedText(existingCover?.imagePrompt || 'Cinematic Arabic TV infographic title card, dramatic editorial lighting, no text, no logos'),
  };

  const defaultQuestion = 'ما السؤال الأهم الذي لا يجيب عنه هذا الإنفوجراف؟';
  const questionText = textToQuestion(
    existingQuestion?.text || existingQuestion?.title || existingQuestion?.voiceoverText,
    defaultQuestion,
  );
  const question = {
    ...(existingQuestion || {}),
    slideType: 'question',
    title: questionText,
    text: questionText,
    voiceoverText: truncateToWords(questionText, voMaxWords),
    visualHint: cleanGeneratedText(existingQuestion?.visualHint || 'خاتمة بسؤال نقدي واحد فقط'),
    imagePrompt: cleanGeneratedText(existingQuestion?.imagePrompt || 'Minimal cinematic Arabic TV infographic closing frame, thoughtful dramatic lighting, no text, no logos'),
  };

  return [
    cover,
    ...contentSlides.slice(0, maxContentSlides).map((slide) => ({
      ...slide,
      slideType: 'content',
    })),
    question,
  ];
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

const LEGACY_TTS_STYLE_PROMPT = 'Premium commercial. Dynamic pacing—starts intrigued, ends punchy. Tone is polished, persuasive, and inviting.';
const DEFAULT_TTS_STYLE_PROMPT = 'Arabic television documentary narrator. Speak in Modern Standard Arabic with a calm, authoritative news-report tone. Use a medium measured pace, clear articulation, and natural pauses between sentences and paragraphs. Do not rush. Sound like a serious TV report narrator, polished and informative, not commercial or promotional.';

async function callGeminiTts(text, { apiKey, ttsModel, voiceName, stylePrompt }) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${ttsModel}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const requestedStyle = (stylePrompt && stylePrompt.trim()) ? stylePrompt.trim() : DEFAULT_TTS_STYLE_PROMPT;
  const style = requestedStyle === LEGACY_TTS_STYLE_PROMPT ? DEFAULT_TTS_STYLE_PROMPT : requestedStyle;
  const ttsInstruction = `${style}\n\nRead aloud: ${text}`;
  const promptVariants = [ttsInstruction, `Read aloud: ${text}`];

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

function getAppVersion() {
  try {
    const packageJsonPath = path.join(desktopPaths.repoRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version || '1.0.0';
  } catch {
    return '1.0.0';
  }
}

function getProjectConfigForEvent(event, payload = null) {
  const senderUrl = event.senderFrame?.url || event.sender?.getURL?.() || '';
  const config = inferProjectConfigFromUrl(senderUrl);
  const payloadType = payload?.projectType || payload?.project?.projectType;
  if (payloadType && payloadType !== config.projectType) {
    throw new Error(`هذا الملف ليس مشروع ${config.displayName} صالحًا`);
  }
  return config;
}

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
let renderWorkerLaqtat = null;

function spawnRenderWorker(model) {
  const workerModel = model === 'laqtat' ? 'laqtat' : model === 'motadawel' ? 'motadawel' : 'infograph';
  let activeWorker = workerModel === 'motadawel'
    ? renderWorkerMotadawel
    : workerModel === 'laqtat'
      ? renderWorkerLaqtat
      : renderWorkerInfograph;

  if (activeWorker && !activeWorker.killed) {
    return activeWorker;
  }

  const workerEntry = workerModel === 'motadawel'
    ? path.join(desktopPaths.codeRoot, 'motadawel', 'worker', 'render-worker-motadawel.cjs')
    : workerModel === 'laqtat'
      ? path.join(desktopPaths.codeRoot, 'laqtat', 'worker', 'render-worker-laqtat.cjs')
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

  const workerName = workerModel;

  newWorker.stdout.on('data', (data) => {
    writeWorkerLog(`stdout[${workerName}]`, data.toString().trim());
  });

  newWorker.stderr.on('data', (data) => {
    writeWorkerLog(`stderr[${workerName}]`, data.toString().trim());
  });

  newWorker.on('error', (error) => {
    writeWorkerLog(`spawn-error[${workerName}]`, error.stack || error.message);
    clearPendingRequests(`Failed to start ${workerName} render worker: ${error.message}`, workerName);
    if (workerModel === 'motadawel') renderWorkerMotadawel = null;
    else if (workerModel === 'laqtat') renderWorkerLaqtat = null;
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
    if (workerModel === 'motadawel') renderWorkerMotadawel = null;
    else if (workerModel === 'laqtat') renderWorkerLaqtat = null;
    else renderWorkerInfograph = null;
  });

  if (workerModel === 'motadawel') renderWorkerMotadawel = newWorker;
  else if (workerModel === 'laqtat') renderWorkerLaqtat = newWorker;
  else renderWorkerInfograph = newWorker;

  return newWorker;
}

function requestWorker(action, payload) {
  return new Promise((resolve, reject) => {
    const activeWorker = spawnRenderWorker(payload?.model);

    const id = `req-${Date.now()}-${++requestCounter}`;
    const workerName = payload?.model === 'laqtat'
      ? 'laqtat'
      : payload?.model === 'motadawel'
        ? 'motadawel'
        : 'infograph';
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
    backgroundColor: '#f4f1ec',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
      preload: desktopPaths.preloadScript,
    },
  });

  mainWindow.webContents.on('context-menu', (_event, params) => {
    const template = [];
    const hasSelection = Boolean(params.selectionText && params.selectionText.trim());

    if (params.isEditable) {
      template.push(
        { role: 'undo', label: 'تراجع' },
        { role: 'redo', label: 'إعادة' },
        { type: 'separator' },
        { role: 'cut', label: 'قص' },
        { role: 'copy', label: 'نسخ' },
        { role: 'paste', label: 'لصق' },
        { role: 'pasteAndMatchStyle', label: 'لصق مع مطابقة التنسيق' },
        { role: 'delete', label: 'حذف' },
        { type: 'separator' },
        { role: 'selectAll', label: 'تحديد الكل' },
      );
    } else if (hasSelection) {
      template.push(
        { role: 'copy', label: 'نسخ' },
        { type: 'separator' },
        { role: 'selectAll', label: 'تحديد الكل' },
      );
    } else {
      template.push({ role: 'selectAll', label: 'تحديد الكل' });
    }

    Menu.buildFromTemplate(template).popup({ window: mainWindow });
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
    appVersion: getAppVersion(),
    logoDataUrl: readFileAsDataUrl(logoPath),
    fontDataUrl: readFileAsDataUrl(fontPath),
    assets: listAssetsSnapshot(desktopPaths),
    placeholderPath: ensurePlaceholderPng(),
  };
}

ipcMain.handle('desktop:bootstrap', async () => buildBootstrapPayload());

ipcMain.handle('project:save', async (event, payload) => {
  try {
    const config = getProjectConfigForEvent(event, payload);
    return await saveProject({
      dialog,
      browserWindow: BrowserWindow.fromWebContents(event.sender),
      payload,
      config,
      appVersion: getAppVersion(),
      forceSaveAs: false,
    });
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});

ipcMain.handle('project:saveAs', async (event, payload) => {
  try {
    const config = getProjectConfigForEvent(event, payload);
    return await saveProject({
      dialog,
      browserWindow: BrowserWindow.fromWebContents(event.sender),
      payload,
      config,
      appVersion: getAppVersion(),
      forceSaveAs: true,
    });
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});

ipcMain.handle('project:open', async (event, context) => {
  try {
    const config = getProjectConfigForEvent(event, context?.project || null);
    return await openProject({
      dialog,
      browserWindow: BrowserWindow.fromWebContents(event.sender),
      context,
      config,
      appVersion: getAppVersion(),
    });
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});

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

ipcMain.handle('desktop:pick-slide-image', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select replacement slide image',
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp'] }],
    properties: ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  return {
    imagePath: filePath,
    fileUrl: toFileUrl(filePath),
  };
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
  const workerName = payload?.model === 'laqtat'
    ? 'laqtat'
    : payload?.model === 'motadawel'
      ? 'motadawel'
      : 'infograph';
  const worker = workerName === 'motadawel'
    ? renderWorkerMotadawel
    : workerName === 'laqtat'
      ? renderWorkerLaqtat
      : renderWorkerInfograph;
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

ipcMain.handle('desktop:generate-single-voiceover', async (_event, payload) => {
  const {
    text,
    voiceName = 'Charon',
    ttsModel = 'gemini-2.5-flash-preview-tts',
    apiKey: payloadKey,
    stylePrompt: payloadStylePrompt,
  } = payload;

  if (!text || !text.trim()) {
    return { success: false, error: 'النص مطلوب لتوليد التعليق الصوتي.' };
  }

  let apiKey = payloadKey && payloadKey.trim() ? payloadKey.trim() : null;
  let stylePrompt = payloadStylePrompt && payloadStylePrompt.trim() ? payloadStylePrompt.trim() : null;
  if (!apiKey || !stylePrompt) {
    try {
      const raw = fs.readFileSync(getSettingsPath(), 'utf-8');
      const saved = JSON.parse(raw);
      if (!apiKey) apiKey = saved.geminiApiKey || null;
      if (!stylePrompt) stylePrompt = saved.ttsStylePrompt || null;
    } catch {}
  }
  if (!apiKey) {
    apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_TTS_API_KEY || null;
  }
  if (!apiKey) {
    return { success: false, error: 'مفتاح Gemini API مفقود. أضفه في إعدادات البرنامج (⚙️).' };
  }

  try {
    const normalizedText = text
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    const { data, mimeType } = await callGeminiTts(normalizedText, { apiKey, ttsModel, voiceName, stylePrompt });

    const pcmBuffer = Buffer.from(data, 'base64');
    const sampleRate = parseSampleRate(mimeType);
    const wavBuffer = pcmToWav(pcmBuffer, sampleRate);

    const voiceoverDir = path.join(app.getPath('userData'), 'voiceovers');
    fs.mkdirSync(voiceoverDir, { recursive: true });

    const hash = crypto.createHash('sha1').update(normalizedText).digest('hex').slice(0, 10);
    const fileName = `vo-single-${Date.now()}-${hash}.wav`;
    const filePath = path.join(voiceoverDir, fileName);
    fs.writeFileSync(filePath, wavBuffer);

    const durationMs = Math.round(((wavBuffer.length - 44) / (sampleRate * 2)) * 1000);

    return {
      success: true,
      voiceoverPath: filePath,
      voiceoverUrl: toFileUrl(filePath),
      durationMs,
    };
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});

ipcMain.handle('desktop:generate-content-slides', async (_event, payload) => {
  const {
    topic,
    slideCount = 10,
    contentStyle = 'وثائقي',
    textPreset = 'automatic',
    maxWords: payloadMaxWords,
    apiKey: payloadKey,
    model: payloadModel,
    systemPrompt: payloadPrompt,
  } = payload;

  if (!topic || !topic.trim()) {
    return { success: false, error: 'يرجى إدخال نص أو موضوع أولاً' };
  }

  let apiKey = payloadKey && payloadKey.trim() ? payloadKey.trim() : null;
  let contentModel = payloadModel && payloadModel.trim() ? payloadModel.trim() : null;
  let systemPrompt = payloadPrompt && payloadPrompt.trim() ? payloadPrompt.trim() : null;

  try {
    const raw = fs.readFileSync(getSettingsPath(), 'utf-8');
    const saved = JSON.parse(raw);
    if (!apiKey) apiKey = saved.geminiApiKey || null;
    if (!contentModel) contentModel = saved.contentModel || null;
    if (!systemPrompt) systemPrompt = saved.contentSystemPrompt || null;
  } catch {}

  if (!apiKey) {
    apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_TTS_API_KEY || null;
  }
  if (!apiKey) {
    return { success: false, error: 'مفتاح Gemini API مفقود. أضفه في إعدادات البرنامج (⚙️).' };
  }

  contentModel = contentModel || 'gemini-2.5-flash';

  const defaultSystemPrompt = `أنت كاتب إنفوجراف تلفزيوني عربي محترف ومحرر تلفزيوني وكاتب سكريبت صوتي.
مهمتك: تحويل الموضوعات العربية إلى شرائح إنفوجراف مرئية موجزة وسكريبت تعليق صوتي منفصل.
نص الشاشة يجب أن يكون قصيراً ومرئياً. السكريبت الصوتي يجب أن يكون سلساً ومهنياً بأسلوب التلفزيون العربي.
أعد JSON صارماً فقط بدون أي نص خارجه.`;

  systemPrompt = systemPrompt || defaultSystemPrompt;

  const count = Math.min(30, Math.max(3, Number(slideCount) || 10));
  const voMaxWords = Math.max(8, Math.min(30, Number(payloadMaxWords) || 18));
  const preset = textPreset === 'automatic' ? 'news-ledger' : textPreset;

  const userPrompt = `حوّل الموضوع التالي إلى ${count} شريحة إنفوجراف إجمالاً.

أسلوب المحتوى: ${contentStyle}
نمط حركة النص المُفضَّل: ${preset}

ابدأ دائماً بشريحة غلاف واحدة فقط من نوع cover، تحتوي عنوان الإنفوجراف فقط.
اختم دائماً بشريحة واحدة فقط من نوع question، تحتوي سؤالاً نقدياً واحداً فقط للمشاهد، بدون أي تفاصيل أو شرح.
اجعل الشرائح بينهما من نوع content.

⚠️ قاعدة صارمة لـ voiceoverText: أقصى عدد مسموح هو ${voMaxWords} كلمة عربية فقط لكل شريحة — لا استثناءات.
إذا كتبت أكثر من ${voMaxWords} كلمة فستُقطع تلقائياً. اكتب جملة واحدة قصيرة ومكثّفة فقط.

لكل شريحة أعد:
- slideType: واحدة من cover أو content أو question
- title: عنوان داخلي مختصر
- text: نص الشاشة. في cover اكتب عنوان الإنفوجراف فقط. في content اكتب أربعة أجزاء قصيرة مفصولة بـ "++" (كيكر ++ عنوان ++ شرح ++ خلاصة). في question اكتب سؤالاً نقدياً واحداً فقط.
- voiceoverText: جملة صوتية عربية واحدة، من ${Math.max(8, voMaxWords - 3)} إلى ${voMaxWords} كلمة كحد أقصى، تُعبّر عن جوهر الشريحة بأسلوب إذاعي طبيعي
- imagePrompt: وصف بالإنجليزية لصورة سينمائية واقعية بدون نص أو شعارات
- visualHint: توجيه بصري عربي مختصر

أعد هذا الشكل من JSON فقط:
{
  "slides": [
    {
      "slideType": "cover",
      "title": "عنوان الإنفوجراف",
      "text": "عنوان الإنفوجراف",
      "voiceoverText": "مقدمة صوتية قصيرة لعنوان الإنفوجراف.",
      "imagePrompt": "English cinematic realistic visual prompt, no text, no logos",
      "visualHint": "غلاف بصري"
    },
    {
      "slideType": "content",
      "title": "عنوان داخلي",
      "text": "كيكر ++ عنوان قوي ++ شرح مختصر ++ خلاصة",
      "voiceoverText": "سكريبت صوتي عربي طبيعي من ${Math.max(8, voMaxWords - 3)}-${voMaxWords} كلمة لهذه الشريحة.",
      "imagePrompt": "English cinematic realistic visual prompt, no text, no logos",
      "visualHint": "توجيه بصري"
    },
    {
      "slideType": "question",
      "title": "سؤال نقدي؟",
      "text": "سؤال نقدي واحد فقط؟",
      "voiceoverText": "سؤال نقدي واحد فقط.",
      "imagePrompt": "English cinematic realistic visual prompt, no text, no logos",
      "visualHint": "خاتمة بسؤال"
    }
  ],
  "fullScript": "سكريبت الشريحة 1.\n\nسكريبت الشريحة 2.\n\n..."
}

الموضوع:
${topic}`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${contentModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result?.error?.message || `HTTP ${res.status}`);

    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('لم يُرجع النموذج أي محتوى');

    let parsed;
    try { parsed = JSON.parse(rawText); } catch { throw new Error('فشل تحليل JSON من النموذج'); }

    const slides = ensureOpeningAndClosingSlides(
      Array.isArray(parsed.slides) ? parsed.slides : [],
      { topic, count, voMaxWords },
    );
    if (slides.length === 0) throw new Error('لم تُولَّد أي شرائح');

    const placeholderPath = ensurePlaceholderPng();
    const placeholderUrl = toFileUrl(placeholderPath);

    const now = Date.now();

    // First pass: hard-truncate as safety net
    const rawVoiceovers = slides.map((s) => truncateToWords(s.voiceoverText || '', voMaxWords));

    // Second pass: ask Gemini to intelligently rewrite any that were over the limit
    const reviewedVoiceovers = await reviewVoiceoverTexts(
      rawVoiceovers,
      voMaxWords,
      { apiKey, model: contentModel },
    );

    const mappedSlides = slides.map((s, i) => ({
      id: `generated-${now}-${i}`,
      slideType: s.slideType || 'content',
      title: s.title || '',
      text: s.text || '',
      voiceoverText: reviewedVoiceovers[i] || rawVoiceovers[i],
      imagePrompt: s.imagePrompt || '',
      visualHint: s.visualHint || '',
      imagePath: placeholderPath,
      fileUrl: placeholderUrl,
      isMuted: true,
    }));

    const fullScript = mappedSlides
      .filter((s) => s.slideType !== 'cover')
      .map((s) => s.voiceoverText)
      .filter(Boolean)
      .join('\n\n');

    return { success: true, slides: mappedSlides, fullScript };
  } catch (err) {
    return { success: false, error: err?.message || String(err) };
  }
});

ipcMain.handle('desktop:generate-voiceovers', async (_event, payload) => {
  const {
    slides = [],
    voiceName = 'Charon',
    ttsModel = 'gemini-2.5-flash-preview-tts',
    apiKey: payloadKey,
    stylePrompt: payloadStylePrompt,
    maxWords = 18,
  } = payload;

  // Resolve API key + style prompt: payload → settings file → env var
  let apiKey = payloadKey && payloadKey.trim() ? payloadKey.trim() : null;
  let stylePrompt = payloadStylePrompt && payloadStylePrompt.trim() ? payloadStylePrompt.trim() : null;
  if (!apiKey || !stylePrompt) {
    try {
      const raw = fs.readFileSync(getSettingsPath(), 'utf-8');
      const saved = JSON.parse(raw);
      if (!apiKey) apiKey = saved.geminiApiKey || null;
      if (!stylePrompt) stylePrompt = saved.ttsStylePrompt || null;
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
      const narrationText = slide.voiceoverText?.trim() || buildRuleBasedNarration(slide.text, maxWords);
      const { data, mimeType } = await callGeminiTts(narrationText, { apiKey, ttsModel, voiceName, stylePrompt });

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
  if (renderWorkerLaqtat && !renderWorkerLaqtat.killed) {
    renderWorkerLaqtat.kill();
  }
});
