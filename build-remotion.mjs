import { bundle } from '@remotion/bundler';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  try {
    const bundleLocation = await bundle({
      entryPoint: path.join(__dirname, 'src', 'remotion', 'index.ts'),
      outDir: path.join(__dirname, 'public', 'remotion-bundle'),
      enableCaching: true,
    });
    console.log('Remotion bundled to:', bundleLocation);
    process.exit(0);
  } catch (err) {
    console.error('Failed to bundle remotion:', err);
    process.exit(1);
  }
}

run();
