import path from 'path';
import { fileURLToPath } from 'url';
import { bundle } from '@remotion/bundler';
import { createRequire } from 'module';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const require = createRequire(import.meta.url);
const { createDesktopPaths } = require('../../shared/paths.cjs');
const { prepareRemotionPublicDir } = require('../../shared/remotion-public.cjs');

const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
const buildRoot = path.join(localAppData, 'InfographicGeneratorDesktopV2Build');

async function run() {
  const desktopPaths = createDesktopPaths({
    packaged: false,
    appHome: path.join(process.env.LOCALAPPDATA || repoRoot, 'InfographicGeneratorDesktopV2Dev'),
    resourcesPath: process.resourcesPath || repoRoot,
  });

  const entryPoint = path.join(repoRoot, 'src', 'remotion', 'laqtat', 'index.ts');
  const stagedPublicDir = await prepareRemotionPublicDir(desktopPaths);
  const outDir = process.env.DESKTOP_V2_BUNDLE_OUT_DIR_LAQTAT || path.join(buildRoot, 'bundle-staging-laqtat', 'remotion-bundle');

  const serveUrl = await bundle({
    entryPoint,
    outDir,
    enableCaching: true,
    publicDir: stagedPublicDir,
  });

  console.log('Desktop V2 Laqtat Remotion bundle ready at:', serveUrl);
}

run().catch((error) => {
  console.error('Desktop V2 Laqtat bundle build failed:', error);
  process.exit(1);
});
