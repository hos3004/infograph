import fs from 'fs';
import path from 'path';

type AssetRootOptions = {
  preferExisting?: boolean;
};

const unique = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

export function getAssetRootCandidates(options: AssetRootOptions = {}) {
  const cwd = process.cwd();
  const appHome = process.env.APP_HOME || '';
  const explicitAssetsDir = process.env.ASSETS_DIR || '';

  const candidates = unique([
    explicitAssetsDir,
    appHome ? path.join(appHome, 'Assets') : '',
    path.join(cwd, 'Assets'),
    path.join(cwd, 'assets'),
    path.join(cwd, 'public', 'assets'),
  ]);

  if (!options.preferExisting) {
    return candidates;
  }

  const existing = candidates.filter((candidate) => fs.existsSync(candidate));
  return existing.length > 0 ? existing : candidates;
}

export function resolveAssetDirectory(subfolder: string) {
  const safeSubfolder = subfolder ? path.basename(subfolder) : '';
  const roots = getAssetRootCandidates({ preferExisting: true });

  return roots.map((root) => path.join(root, safeSubfolder));
}

export function resolveAssetFile(subfolder: string, filename: string) {
  const safeFilename = path.basename(filename || '');
  if (!safeFilename) {
    return null;
  }

  for (const dir of resolveAssetDirectory(subfolder)) {
    const candidate = path.join(dir, safeFilename);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function getWritableAssetDirectory(subfolder: string) {
  const safeSubfolder = subfolder ? path.basename(subfolder) : '';
  const [root] = getAssetRootCandidates();
  return path.join(root, safeSubfolder);
}
