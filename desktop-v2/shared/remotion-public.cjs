const fs = require('fs');
const path = require('path');

async function copyDirectory(sourceDir, targetDir) {
  await fs.promises.mkdir(targetDir, { recursive: true });

  const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
      continue;
    }

    await fs.promises.copyFile(sourcePath, targetPath);
  }
}

async function prepareRemotionPublicDir(paths) {
  const sourceFontsDir = path.join(paths.repoRoot, 'public', 'assets', 'fonts');
  const targetFontsDir = path.join(paths.stagedPublicDir, 'assets', 'fonts');

  await fs.promises.rm(paths.stagedPublicDir, { recursive: true, force: true });
  await fs.promises.mkdir(paths.stagedPublicDir, { recursive: true });
  
  if (fs.existsSync(sourceFontsDir)) {
    await copyDirectory(sourceFontsDir, targetFontsDir);
  }

  return paths.stagedPublicDir;
}

module.exports = {
  prepareRemotionPublicDir,
};
