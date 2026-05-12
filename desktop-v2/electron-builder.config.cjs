const os = require('os');
const path = require('path');

const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
const buildRoot = path.join(localAppData, 'InfographicGeneratorDesktopV2Build');
const bundleStagingDir = path.join(buildRoot, 'bundle-staging', 'remotion-bundle');
const motadawelBundleStagingDir = path.join(buildRoot, 'bundle-staging-motadawel', 'remotion-bundle');
const personalitiesBundleStagingDir = path.join(buildRoot, 'bundle-staging-personalities', 'remotion-bundle');
const outputDir = process.env.DESKTOP_V2_BUILD_DIR || path.join(buildRoot, 'dist');

module.exports = {
  appId: 'com.infograph.generator.desktopv2',
  productName: 'Infographic Generator',
  directories: {
    output: outputDir,
  },
  files: [
    'desktop-v2/main.cjs',
    'desktop-v2/preload.cjs',
    'desktop-v2/renderer/**/*',
    'desktop-v2/worker/**/*',
    'desktop-v2/shared/**/*',
    'desktop-v2/motadawel/**/*',
    'desktop-v2/personalities/**/*',
    'package.json',
  ],
  extraMetadata: {
    main: 'desktop-v2/main.cjs',
  },
  extraResources: [
    {
      from: bundleStagingDir,
      to: 'desktop-v2/generated/remotion-bundle',
      filter: ['**/*'],
    },
    {
      from: motadawelBundleStagingDir,
      to: 'desktop-v2/generated/bundle-staging-motadawel/remotion-bundle',
      filter: ['**/*'],
    },
    {
      from: personalitiesBundleStagingDir,
      to: 'desktop-v2/generated/bundle-staging-personalities/remotion-bundle',
      filter: ['**/*'],
    },
  ],
  extraFiles: [
    {
      from: 'public/assets',
      to: 'Assets',
    },
  ],
  asarUnpack: [
    'node_modules/@remotion/compositor-win32-x64-msvc/**/*',
    'node_modules/ffmpeg-static/**/*',
    'node_modules/ffprobe-static/**/*',
  ],
  npmRebuild: false,
  win: {
    target: 'dir',
    icon: 'public/favicon.ico',
  },
};
