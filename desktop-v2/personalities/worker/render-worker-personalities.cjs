const fs = require('fs');
const http = require('http');
const path = require('path');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');

const { createDesktopPaths, ensureDesktopDirs } = require('../../shared/paths.cjs');
const { prepareRemotionPublicDir } = require('../../shared/remotion-public.cjs');
const { toFileUrl } = require('../../shared/assets.cjs');

const desktopPaths = createDesktopPaths({
  packaged: process.env.DESKTOP_V2_PACKAGED === 'true',
  appHome: process.env.DESKTOP_V2_APP_HOME,
  resourcesPath: process.env.DESKTOP_V2_RESOURCES_PATH,
});

desktopPaths.bundleDir = path.join(
  desktopPaths.packaged ? desktopPaths.resourceRoot : desktopPaths.runtimeRoot,
  desktopPaths.packaged ? 'generated' : 'cache',
  'bundle-staging-personalities',
  'remotion-bundle'
);

ensureDesktopDirs(desktopPaths);

try {
  process.env.REMOTION_FFMPEG_EXECUTABLE = require('ffmpeg-static');
  process.env.REMOTION_FFPROBE_EXECUTABLE = require('ffprobe-static').path;
} catch {}

function reply(message) {
  if (process.send) process.send(message);
}

function getRemotionBinariesDirectory() {
  if (!desktopPaths.packaged) return null;
  if (!desktopPaths.remotionBinariesDir || !fs.existsSync(desktopPaths.remotionBinariesDir)) {
    throw new Error('Desktop V2 Remotion binaries are missing from the packaged app.');
  }
  return desktopPaths.remotionBinariesDir;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.m4a': 'audio/mp4',
    '.aac': 'audio/aac',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.webm': 'video/webm',
  };
  return map[ext] || 'application/octet-stream';
}

function startMediaServer(fileMap) {
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url, 'http://127.0.0.1');
      const key = decodeURIComponent(requestUrl.pathname.replace('/media/', ''));
      const filePath = fileMap.get(key);

      if (!filePath || !fs.existsSync(filePath)) {
        response.writeHead(404);
        response.end('Missing media');
        return;
      }

      const stat = await fs.promises.stat(filePath);
      const range = request.headers.range;
      const contentType = getContentType(filePath);

      if (!range) {
        response.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': stat.size,
          'Accept-Ranges': 'bytes',
        });
        fs.createReadStream(filePath).pipe(response);
        return;
      }

      const [rawStart, rawEnd] = range.replace('bytes=', '').split('-');
      const start = Number(rawStart || 0);
      const end = rawEnd ? Number(rawEnd) : stat.size - 1;

      response.writeHead(206, {
        'Content-Type': contentType,
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
      });
      fs.createReadStream(filePath, { start, end }).pipe(response);
    } catch (error) {
      response.writeHead(500);
      response.end(error instanceof Error ? error.message : 'Media server error');
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      resolve({
        close: () => new Promise((closeResolve, closeReject) => {
          server.close((error) => {
            if (error) {
              closeReject(error);
              return;
            }
            closeResolve();
          });
        }),
        urlFor: (key) => `http://127.0.0.1:${port}/media/${encodeURIComponent(key)}`,
      });
    });
    server.on('error', reject);
  });
}

function registerMediaFile(fileMap, baseKey, filePath) {
  const extension = path.extname(filePath || '');
  const mediaKey = `${baseKey}${extension}`;
  fileMap.set(mediaKey, filePath);
  return mediaKey;
}

function ensureBundle() {
  const bundleMarker = path.join(desktopPaths.bundleDir, 'bundle.js');
  if (fs.existsSync(bundleMarker)) {
    return Promise.resolve(desktopPaths.bundleDir);
  }

  if (desktopPaths.packaged) {
    throw new Error('Desktop V2 Personalities bundle is missing from the packaged app.');
  }

  reply({
    type: 'progress',
    payload: {
      stage: 'bundle',
      progress: 0.45,
      message: 'Building the Remotion bundle for Personalities...',
    },
  });

  return prepareRemotionPublicDir(desktopPaths).then((stagedPublicDir) => bundle({
    entryPoint: path.join(desktopPaths.repoRoot, 'src', 'remotion', 'personalities', 'index.ts'),
    outDir: desktopPaths.bundleDir,
    enableCaching: true,
    publicDir: stagedPublicDir,
  }));
}

function normalizeScenes(scenes) {
  return (Array.isArray(scenes) ? scenes : []).map((scene, index) => ({
    id: scene.id || `scene-${index + 1}`,
    sceneNumber: Number(scene.sceneNumber || index + 1),
    title: typeof scene.title === 'string' ? scene.title : '',
    sourceExcerpt: typeof scene.sourceExcerpt === 'string' ? scene.sourceExcerpt : '',
    ageStage: typeof scene.ageStage === 'string' ? scene.ageStage : '',
    timePeriod: typeof scene.timePeriod === 'string' ? scene.timePeriod : '',
    location: typeof scene.location === 'string' ? scene.location : '',
    voiceoverText: typeof scene.voiceoverText === 'string' ? scene.voiceoverText : '',
    imagePrompt: typeof scene.imagePrompt === 'string' ? scene.imagePrompt : '',
    motionPrompt: typeof scene.motionPrompt === 'string' ? scene.motionPrompt : '',
    visualContinuityNotes: typeof scene.visualContinuityNotes === 'string' ? scene.visualContinuityNotes : '',
    mediaPath: typeof scene.mediaPath === 'string' ? scene.mediaPath : '',
    mediaType: scene.mediaType === 'video' ? 'video' : 'image',
    voiceoverPath: typeof scene.voiceoverPath === 'string' ? scene.voiceoverPath : null,
    voiceoverDurationMs: Number(scene.voiceoverDurationMs || 0),
    mediaDurationMs: Number(scene.mediaDurationMs || 0),
    trimStartMs: Math.max(0, Number(scene.trimStartMs || 0)),
    trimEndMs: scene.trimEndMs == null ? null : Math.max(0, Number(scene.trimEndMs || 0)),
  }));
}

async function renderVideo(payload) {
  const scenes = normalizeScenes(payload?.scenes);
  const existingScenes = scenes.filter((scene) => scene.mediaPath && fs.existsSync(scene.mediaPath));

  if (!existingScenes.length && !(payload?.placeholderPath && fs.existsSync(payload.placeholderPath))) {
    throw new Error('At least one scene media file is required before rendering Personalities.');
  }

  const serveUrl = await ensureBundle();
  const fileMap = new Map();
  const binariesDirectory = getRemotionBinariesDirectory();

  const placeholderKey = payload.placeholderPath && fs.existsSync(payload.placeholderPath)
    ? registerMediaFile(fileMap, 'placeholder', payload.placeholderPath)
    : null;
  const musicKey = payload.musicPath && fs.existsSync(payload.musicPath)
    ? registerMediaFile(fileMap, 'music', payload.musicPath)
    : null;
  const endPageKey = payload.endPagePath && fs.existsSync(payload.endPagePath)
    ? registerMediaFile(fileMap, 'endpage', payload.endPagePath)
    : null;

  const mediaServer = await startMediaServer(fileMap);

  try {
    const inputProps = {
      scenes: scenes.map((scene, index) => {
        const mediaKey = scene.mediaPath && fs.existsSync(scene.mediaPath)
          ? registerMediaFile(fileMap, `scene-${index}`, scene.mediaPath)
          : null;
        const voiceoverKey = scene.voiceoverPath && fs.existsSync(scene.voiceoverPath)
          ? registerMediaFile(fileMap, `scene-vo-${index}`, scene.voiceoverPath)
          : null;

        return {
          ...scene,
          fileUrl: mediaKey ? mediaServer.urlFor(mediaKey) : null,
          voiceoverUrl: voiceoverKey ? mediaServer.urlFor(voiceoverKey) : null,
        };
      }),
      placeholderUrl: placeholderKey ? mediaServer.urlFor(placeholderKey) : null,
      musicUrl: musicKey ? mediaServer.urlFor(musicKey) : null,
      musicVolume: Number(payload.musicVolume ?? 0.3),
      voiceoverVolume: Number(payload.voiceoverVolume ?? 1),
      effects: Array.isArray(payload.effects) ? payload.effects : [],
      endPageUrl: endPageKey ? mediaServer.urlFor(endPageKey) : null,
      endPageDurationFrames: Number(payload.endPageDurationFrames || 0),
      targetSceneDurationMs: Number(payload.targetSceneDurationMs || 8000),
      transitionFrames: Number(payload.transitionFrames || 20),
      cinematicBarSize: Number(payload.cinematicBarSize || 6),
    };

    reply({
      type: 'progress',
      payload: {
        stage: 'composition',
        progress: 0.6,
        message: 'Preparing the Personalities composition...',
      },
    });

    const composition = await selectComposition({
      serveUrl,
      id: payload.compositionId || 'PersonalitiesVideo',
      inputProps,
      binariesDirectory,
    });

    const outputPath = path.join(desktopPaths.outputDir, `Personalities_${Date.now()}.mp4`);

    reply({
      type: 'progress',
      payload: {
        stage: 'render',
        progress: 0,
        message: 'Rendering the Personalities video...',
      },
    });

    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      audioCodec: 'aac',
      outputLocation: outputPath,
      inputProps,
      binariesDirectory,
      onProgress: ({ renderedFrames, encodedFrames, progress }) => {
        const frameProgress = composition.durationInFrames
          ? renderedFrames / composition.durationInFrames
          : 0;
        const encodeProgress = composition.durationInFrames
          ? encodedFrames / composition.durationInFrames
          : 0;
        reply({
          type: 'progress',
          payload: {
            stage: 'render',
            progress: typeof progress === 'number' ? progress : Math.max(frameProgress, encodeProgress),
            renderedFrames,
            encodedFrames,
            totalFrames: composition.durationInFrames,
            message: 'Rendering the Personalities video...',
          },
        });
      },
    });

    return {
      success: true,
      outputPath,
      outputUrl: toFileUrl(outputPath),
      totalFrames: composition.durationInFrames,
    };
  } finally {
    await mediaServer.close();
  }
}

async function handleRequest(action, payload) {
  switch (action) {
    case 'render':
      return renderVideo(payload);
    default:
      throw new Error(`Unsupported action: ${action}`);
  }
}

process.on('message', async (message) => {
  if (!message || typeof message !== 'object') return;
  const { id, action, payload } = message;
  try {
    const result = await handleRequest(action, payload || {});
    reply({ type: 'response', id, ok: true, payload: result });
  } catch (error) {
    reply({ type: 'response', id, ok: false, error: error instanceof Error ? error.message : String(error) });
  }
});
