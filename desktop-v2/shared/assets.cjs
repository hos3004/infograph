const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ASSET_DIRECTORIES = {
  root: '',
  fonts: 'fonts',
  overlay: 'overlays',
  music: 'music',
  endPage: 'endpage',
  motadawel_intros: 'motadawel_intros',
  motadawel_outros: 'motadawel_outros',
  frem_mutadawel: 'frem_mutadawel',
};

function toFileUrl(filePath) {
  return pathToFileURL(filePath).href;
}

function getAssetRootCandidates(paths) {
  return Array.from(new Set([
    paths.assetsDir,
    paths.appHome ? path.join(paths.appHome, 'assets') : null,
    paths.repoRoot ? path.join(paths.repoRoot, 'Assets') : null,
    paths.repoRoot ? path.join(paths.repoRoot, 'public', 'assets') : null,
  ].filter(Boolean)));
}

function getAssetDirectories(paths, type) {
  const dirName = ASSET_DIRECTORIES[type];
  if (typeof dirName !== 'string') {
    throw new Error(`Unsupported asset type: ${type}`);
  }

  return getAssetRootCandidates(paths).map((root) => path.join(root, dirName));
}

function listAssetFiles(paths, type) {
  for (const dirPath of getAssetDirectories(paths, type)) {
    if (!fs.existsSync(dirPath)) {
      continue;
    }

    const files = fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const absolutePath = path.join(dirPath, entry.name);
        return {
          name: entry.name,
          path: absolutePath,
          url: toFileUrl(absolutePath),
        };
      })
      .sort((left, right) => left.name.localeCompare(right.name));

    if (files.length > 0) {
      return files;
    }
  }

  return [];
}

function listAssetsSnapshot(paths) {
  return {
    overlays: listAssetFiles(paths, 'overlay'),
    music: listAssetFiles(paths, 'music'),
    endpage: listAssetFiles(paths, 'endPage'),
    motadawel_intros: listAssetFiles(paths, 'motadawel_intros'),
    motadawel_outros: listAssetFiles(paths, 'motadawel_outros'),
    frem_mutadawel: listAssetFiles(paths, 'frem_mutadawel'),
  };
}

function resolveAssetPath(paths, type, fileName) {
  const assetPath = findAssetPath(paths, type, fileName);
  if (!assetPath) {
    throw new Error(`Missing asset: ${path.basename(fileName || '')}`);
  }

  return assetPath;
}

function findAssetPath(paths, type, fileName) {
  const safeName = path.basename(fileName || '');
  if (!safeName) {
    return null;
  }

  for (const dirPath of getAssetDirectories(paths, type)) {
    const absolutePath = path.join(dirPath, safeName);
    if (fs.existsSync(absolutePath)) {
      return absolutePath;
    }
  }

  return null;
}

module.exports = {
  findAssetPath,
  listAssetsSnapshot,
  resolveAssetPath,
  toFileUrl,
};
