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
  'bundle-staging-motadawel',
  'remotion-bundle'
);

ensureDesktopDirs(desktopPaths);

try {
  process.env.REMOTION_FFMPEG_EXECUTABLE = require('ffmpeg-static');
  process.env.REMOTION_FFPROBE_EXECUTABLE = require('ffprobe-static').path;
} catch {
  // Falls back to system binaries if the packaged ones are unavailable.
}

function reply(message) {
  if (process.send) {
    process.send(message);
  }
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

function toDurationFrames(value, fallbackFrames = 0) {
  const numeric = Number(value || 0);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return fallbackFrames;
  }
  return Math.max(0, Math.round(numeric));
}

async function ensureBundle() {
  const bundleMarker = path.join(desktopPaths.bundleDir, 'bundle.js');
  if (fs.existsSync(bundleMarker)) {
    return desktopPaths.bundleDir;
  }

  if (desktopPaths.packaged) {
    throw new Error('Desktop V2 Motadawel bundle is missing from the packaged app.');
  }

  await fs.promises.mkdir(path.dirname(desktopPaths.bundleDir), { recursive: true });

  reply({
    type: 'progress',
    payload: {
      stage: 'bundle',
      progress: 0.5,
      message: 'Building the Remotion bundle for Motadawel...',
    },
  });

  const stagedPublicDir = await prepareRemotionPublicDir(desktopPaths);

  return bundle({
    entryPoint: path.join(desktopPaths.repoRoot, 'src', 'remotion', 'motadawel', 'index.ts'),
    outDir: desktopPaths.bundleDir,
    enableCaching: true,
    publicDir: stagedPublicDir,
  });
}

async function renderVideo(payload) {
  if (!payload?.mainVideo) {
    throw new Error('Main video path is required for Motadawel rendering.');
  }
  if (!fs.existsSync(payload.mainVideo)) {
    throw new Error('The selected main video could not be found on disk.');
  }

  const serveUrl = await ensureBundle();
  const fileMap = new Map();
  const binariesDirectory = getRemotionBinariesDirectory();

  const introKey = payload.intro && fs.existsSync(payload.intro)
    ? registerMediaFile(fileMap, 'intro', payload.intro)
    : null;
  const mainVideoKey = registerMediaFile(fileMap, 'main', payload.mainVideo);
  const frameKey = payload.frame && fs.existsSync(payload.frame)
    ? registerMediaFile(fileMap, 'frame', payload.frame)
    : null;
  const outroKey = payload.outro && fs.existsSync(payload.outro)
    ? registerMediaFile(fileMap, 'outro', payload.outro)
    : null;
  const bgMusicKey = payload.bgMusic && fs.existsSync(payload.bgMusic)
    ? registerMediaFile(fileMap, 'bgMusic', payload.bgMusic)
    : null;

  const mediaServer = await startMediaServer(fileMap);

  try {
    const inputProps = {
      introVideoUrl: introKey ? mediaServer.urlFor(introKey) : null,
      mainVideoUrl: mediaServer.urlFor(mainVideoKey),
      frameUrl: frameKey ? mediaServer.urlFor(frameKey) : null,
      outroVideoUrl: outroKey ? mediaServer.urlFor(outroKey) : null,
      mainText: payload.text || '',
      videoScale: Number(payload.videoScale || 1),
      videoX: Number(payload.videoX || 0),
      videoY: Number(payload.videoY || 0),
      effects: Array.isArray(payload.effects) ? payload.effects : [],
      introDurationFrames: introKey ? toDurationFrames(payload.introDurationFrames, 150) : 0,
      mainVideoDurationFrames: toDurationFrames(
        payload.mainVideoDurationFrames,
        payload.mainVideoDurationMs ? Math.ceil((Number(payload.mainVideoDurationMs) / 1000) * 25) : 300,
      ),
      outroDurationFrames: outroKey ? toDurationFrames(payload.outroDurationFrames, 150) : 0,
      textBottomOffset: Number(payload.textBottomOffset || 160),
      textFontSize: Number(payload.textFontSize || 46),
      textPreset: payload.textPreset || 'dark',
      bgMusicUrl: bgMusicKey ? mediaServer.urlFor(bgMusicKey) : null,
      bgMusicVolume: Number(payload.bgMusicVolume ?? 0.25),
    };

    reply({
      type: 'progress',
      payload: {
        stage: 'composition',
        progress: 0.5,
        message: 'Preparing the Motadawel composition...',
      },
    });

    const composition = await selectComposition({
      serveUrl,
      id: payload.compositionId || 'MotadawelVideo',
      inputProps,
      binariesDirectory,
    });

    const outputPath = path.join(desktopPaths.outputDir, `Motadawel_${Date.now()}.mp4`);

    reply({
      type: 'progress',
      payload: {
        stage: 'render',
        progress: 0,
        message: 'Rendering the Motadawel video...',
      },
    });

    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      audioCodec: 'aac',
      muted: false,
      ...(payload.turboMode ? {
        concurrency: require('os').cpus().length,
        imageFormat: 'jpeg',
        jpegQuality: 80,
      } : {}),
      outputLocation: outputPath,
      inputProps,
      binariesDirectory,
      onProgress: ({ progress }) => {
        reply({
          type: 'progress',
          payload: {
            stage: 'render',
            progress,
            message: `Rendering... ${Math.round(progress * 100)}%`,
          },
        });
      },
    });

    return {
      outputPath,
      outputUrl: toFileUrl(outputPath),
      outputDir: desktopPaths.outputDir,
    };
  } finally {
    await mediaServer.close().catch(() => {});
  }
}

process.on('message', async (message) => {
  if (!message || message.action !== 'render') {
    return;
  }

  try {
    const result = await renderVideo(message.payload || {});
    reply({
      type: 'response',
      id: message.id,
      ok: true,
      payload: result,
    });
  } catch (error) {
    reply({
      type: 'response',
      id: message.id,
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown render error',
    });
  }
});
