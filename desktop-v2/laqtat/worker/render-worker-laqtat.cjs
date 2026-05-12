const fs = require('fs');
const http = require('http');
const path = require('path');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');

const { createDesktopPaths, ensureDesktopDirs } = require('../../shared/paths.cjs');
const { prepareRemotionPublicDir } = require('../../shared/remotion-public.cjs');

const desktopPaths = createDesktopPaths({
  packaged: process.env.DESKTOP_V2_PACKAGED === 'true',
  appHome: process.env.DESKTOP_V2_APP_HOME,
  resourcesPath: process.env.DESKTOP_V2_RESOURCES_PATH,
});

desktopPaths.bundleDir = path.join(
  desktopPaths.packaged ? desktopPaths.resourceRoot : desktopPaths.runtimeRoot,
  desktopPaths.packaged ? 'generated' : 'cache',
  'bundle-staging-laqtat',
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
    throw new Error('Desktop V2 Laqtat bundle is missing from the packaged app.');
  }

  reply({
    type: 'progress',
    payload: {
      stage: 'bundle',
      progress: 0.45,
      message: 'Building the Remotion bundle for Laqtat...',
    },
  });

  return prepareRemotionPublicDir(desktopPaths).then((stagedPublicDir) => bundle({
    entryPoint: path.join(desktopPaths.repoRoot, 'src', 'remotion', 'laqtat', 'index.ts'),
    outDir: desktopPaths.bundleDir,
    enableCaching: true,
    publicDir: stagedPublicDir,
  }));
}

function normalizeSegments(segments, fallbackDurationMs) {
  const safeSegments = Array.isArray(segments) ? segments : [];
  const normalized = safeSegments
    .map((segment, index) => ({
      id: segment.id || `segment-${index + 1}`,
      startMs: Number(segment.startMs || 0),
      endMs: Number(segment.endMs || 0),
      label: typeof segment.label === 'string' ? segment.label : '',
    }))
    .filter((segment) => Number.isFinite(segment.startMs) && Number.isFinite(segment.endMs) && segment.endMs > segment.startMs);

  if (normalized.length > 0) {
    return normalized;
  }

  return [{
    id: 'segment-1',
    startMs: 0,
    endMs: Math.max(1000, Number(fallbackDurationMs || 0)),
    label: 'المقطع الكامل',
  }];
}

function normalizeBlurRegions(blurRegions, fallbackDurationMs) {
  return (Array.isArray(blurRegions) ? blurRegions : []).map((region, index) => ({
    id: region.id || `blur-${index + 1}`,
    x: Number(region.x || 0),
    y: Number(region.y || 0),
    endX: Number(region.endX ?? region.x ?? 0),
    endY: Number(region.endY ?? region.y ?? 0),
    width: Number(region.width || 260),
    height: Number(region.height || 160),
    blur: Number(region.blur || 24),
    radius: Number(region.radius || 12),
    feather: Number(region.feather || 0),
    motionEnabled: region.motionEnabled === true,
    alwaysOn: region.alwaysOn !== false,
    startMs: Number(region.startMs || 0),
    endMs: Number(region.endMs || fallbackDurationMs || 0),
  }));
}

async function renderVideo(payload) {
  if (!payload?.mainVideo) {
    throw new Error('Main video path is required for Laqtat rendering.');
  }
  if (!fs.existsSync(payload.mainVideo)) {
    throw new Error('The selected main video could not be found on disk.');
  }

  const serveUrl = await ensureBundle();
  const fileMap = new Map();
  const binariesDirectory = getRemotionBinariesDirectory();

  const mainVideoKey = registerMediaFile(fileMap, 'main', payload.mainVideo);
  const frameKey = payload.frame && fs.existsSync(payload.frame)
    ? registerMediaFile(fileMap, 'frame', payload.frame)
    : null;
  const bgMusicKey = payload.bgMusic && fs.existsSync(payload.bgMusic)
    ? registerMediaFile(fileMap, 'bgMusic', payload.bgMusic)
    : null;

  const mediaServer = await startMediaServer(fileMap);

  try {
    const mainVideoDurationMs = Number(payload.mainVideoDurationMs || 0);
    const inputProps = {
      mainVideoUrl: mediaServer.urlFor(mainVideoKey),
      frameUrl: frameKey ? mediaServer.urlFor(frameKey) : null,
      mainText: payload.text || '',
      videoScale: Number(payload.videoScale || 1),
      videoX: Number(payload.videoX || 0),
      videoY: Number(payload.videoY || 0),
      effects: Array.isArray(payload.effects) ? payload.effects : [],
      textBottomOffset: Number(payload.textBottomOffset || 160),
      textFontSize: Number(payload.textFontSize || 46),
      textPreset: payload.textPreset || 'dark',
      textAnimationType: payload.textAnimationType || 'motion-blur',
      cinematicBarSize: Number(payload.cinematicBarSize || 6),
      bgMusicUrl: bgMusicKey ? mediaServer.urlFor(bgMusicKey) : null,
      bgMusicVolume: Number(payload.bgMusicVolume ?? 0.25),
      fitMode: payload.fitMode || 'blurred-background',
      blurBackgroundAmount: Number(payload.blurBackgroundAmount || 36),
      backgroundScale: Number(payload.backgroundScale || 1.18),
      keepSourceAudio: payload.keepSourceAudio === true,
      segments: normalizeSegments(payload.segments, mainVideoDurationMs),
      blurRegions: normalizeBlurRegions(payload.blurRegions, mainVideoDurationMs),
    };

    reply({
      type: 'progress',
      payload: {
        stage: 'composition',
        progress: 0.6,
        message: 'Preparing the Laqtat composition...',
      },
    });

    const composition = await selectComposition({
      serveUrl,
      id: payload.compositionId || 'LaqtatVideo',
      inputProps,
      binariesDirectory,
    });

    const outputPath = path.join(desktopPaths.outputDir, `Laqtat_${Date.now()}.mp4`);

    reply({
      type: 'progress',
      payload: {
        stage: 'render',
        progress: 0,
        message: 'Rendering the Laqtat video...',
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
            message: 'Rendering the Laqtat video...',
          },
        });
      },
    });

    return {
      success: true,
      outputPath,
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
