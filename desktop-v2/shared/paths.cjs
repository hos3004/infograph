const fs = require('fs');
const path = require('path');

function createDesktopPaths({ packaged, appHome, resourcesPath }) {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const codeRoot = path.join(repoRoot, 'desktop-v2');
  const resourceRoot = packaged
    ? path.join(resourcesPath, 'desktop-v2')
    : codeRoot;
  const runtimeRoot = appHome;
  const asarUnpackedRoot = packaged
    ? path.join(resourcesPath, 'app.asar.unpacked')
    : repoRoot;

  return {
    packaged,
    repoRoot,
    codeRoot,
    resourceRoot,
    runtimeRoot,
    asarUnpackedRoot,
    appHome,
    assetsDir: packaged ? path.join(appHome, 'Assets') : path.join(repoRoot, 'public', 'assets'),
    outputDir: packaged ? path.join(appHome, 'Outputs') : path.join(runtimeRoot, 'Outputs'),
    tempDir: packaged ? path.join(appHome, 'Temp') : path.join(runtimeRoot, 'Temp'),
    bundleDir: packaged
      ? path.join(resourceRoot, 'generated', 'remotion-bundle')
      : path.join(runtimeRoot, 'cache', 'remotion-bundle'),
    stagedPublicDir: path.join(runtimeRoot, 'cache', 'remotion-public'),
    rendererHtml: path.join(codeRoot, 'renderer', 'index.html'),
    preloadScript: path.join(codeRoot, 'preload.cjs'),
    workerScript: path.join(codeRoot, 'worker', 'render-worker.cjs'),
    remotionEntry: path.join(repoRoot, 'src', 'remotion', 'index.ts'),
    publicDir: path.join(repoRoot, 'public'),
    remotionBinariesDir: packaged
      ? path.join(asarUnpackedRoot, 'node_modules', '@remotion', 'compositor-win32-x64-msvc')
      : null,
  };
}

function ensureDir(targetPath) {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }
}

function ensureDesktopDirs(paths) {
  [paths.outputDir, paths.tempDir].forEach(ensureDir);

  if (!paths.packaged) {
    [paths.bundleDir, paths.stagedPublicDir].forEach(ensureDir);
  }

  if (paths.packaged) {
    ensureDir(paths.assetsDir);
    ['overlays', 'music', 'endpage', 'fonts', 'motadawel_intros', 'motadawel_outros', 'frem_mutadawel'].forEach((name) => {
      ensureDir(path.join(paths.assetsDir, name));
    });
  }
}

module.exports = {
  createDesktopPaths,
  ensureDesktopDirs,
};
