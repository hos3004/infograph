import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..', '..');

const entryPoint = path.join(__dirname, '..', 'preview', 'player-entry.tsx');
const outDir = path.join(__dirname, '..', 'renderer', 'generated');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

await esbuild.build({
  entryPoints: [entryPoint],
  bundle: true,
  outfile: path.join(outDir, 'preview-player-laqtat.js'),
  format: 'iife',
  platform: 'browser',
  absWorkingDir: repoRoot,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.css': 'css',
  },
});

console.log(`Laqtat V2 preview player built at: ${path.join(outDir, 'preview-player-laqtat.js')}`);
