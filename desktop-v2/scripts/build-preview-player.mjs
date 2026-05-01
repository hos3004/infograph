import path from 'path';
import { fileURLToPath } from 'url';
import { mkdir } from 'fs/promises';
import esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const entryFile = path.join(repoRoot, 'desktop-v2', 'preview', 'player-entry.tsx');
const outFile = path.join(repoRoot, 'desktop-v2', 'renderer', 'generated', 'preview-player.js');

await mkdir(path.dirname(outFile), { recursive: true });

await esbuild.build({
  entryPoints: [entryFile],
  outfile: outFile,
  bundle: true,
  minify: false,
  sourcemap: false,
  format: 'iife',
  platform: 'browser',
  target: ['chrome124'],
  jsx: 'automatic',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
  },
});

console.log(`Desktop V2 preview player built at: ${outFile}`);
