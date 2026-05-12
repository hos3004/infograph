const fs = require('fs');
const path = require('path');

const PROJECT_SCHEMA_VERSION = 1;

const PROJECT_CONFIGS = {
  infograph: {
    projectType: 'infograph',
    extension: '.igp',
    extensionName: 'igp',
    displayName: 'Infograph',
    dialogName: 'Infograph Project',
  },
  motadawel: {
    projectType: 'motadawel',
    extension: '.mtp',
    extensionName: 'mtp',
    displayName: 'Motadawel',
    dialogName: 'Motadawel Project',
  },
  personalities: {
    projectType: 'personalities',
    extension: '.chp',
    extensionName: 'chp',
    displayName: 'Personalities',
    dialogName: 'Personalities Project',
  },
};

function getProjectConfig(projectType) {
  const config = PROJECT_CONFIGS[projectType];
  if (!config) {
    throw new Error('Unknown project type');
  }
  return config;
}

function inferProjectConfigFromUrl(url = '') {
  if (/[\\/]personalities[\\/]renderer[\\/]|\/personalities\/renderer\//i.test(url)) {
    return PROJECT_CONFIGS.personalities;
  }
  return /[\\/]motadawel[\\/]renderer[\\/]|\/motadawel\/renderer\//i.test(url)
    ? PROJECT_CONFIGS.motadawel
    : PROJECT_CONFIGS.infograph;
}

function ensureProjectExtension(filePath, config) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === config.extension) {
    return filePath;
  }
  return `${filePath}${config.extension}`;
}

function safeProjectName(name, fallback) {
  const cleanName = String(name || '').trim();
  if (!cleanName) return fallback;
  return cleanName.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim() || fallback;
}

function safeWrite(filePath, content, { backup = true } = {}) {
  const directory = path.dirname(filePath);
  fs.mkdirSync(directory, { recursive: true });

  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, content, 'utf8');

  if (backup && fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, `${filePath}.bak`);
  }

  fs.renameSync(tempPath, filePath);
}

function readJsonProject(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('تعذر فتح المشروع. الملف تالف أو ليس JSON صالحًا.');
    }
    throw error;
  }
}

function migrateProjectIfNeeded(rawProject) {
  if (!rawProject || typeof rawProject !== 'object') {
    throw new Error('تعذر فتح المشروع. بنية الملف غير صالحة.');
  }

  return {
    ...rawProject,
    schemaVersion: rawProject.schemaVersion || PROJECT_SCHEMA_VERSION,
    data: rawProject.data && typeof rawProject.data === 'object' ? rawProject.data : {},
  };
}

function validateProject(project, config) {
  if (!project || project.projectType !== config.projectType) {
    throw new Error(`هذا الملف ليس مشروع ${config.displayName} صالحًا`);
  }
  return project;
}

function loadProjectFromFile(filePath, config) {
  const migratedProject = migrateProjectIfNeeded(readJsonProject(filePath));
  return validateProject(migratedProject, config);
}

function readExistingProjectMeta(filePath, config) {
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  try {
    return validateProject(migrateProjectIfNeeded(readJsonProject(filePath)), config);
  } catch {
    return null;
  }
}

function buildProjectDocument(payload, config, filePath, appVersion) {
  const now = new Date().toISOString();
  const existingProject = readExistingProjectMeta(filePath, config);
  const projectNameFallback = path.basename(filePath, config.extension);
  const rawProjectName = String(payload.projectName || '').trim();
  const projectName = safeProjectName(
    rawProjectName === `${config.displayName} Project` ? '' : rawProjectName,
    projectNameFallback,
  );

  return {
    schemaVersion: PROJECT_SCHEMA_VERSION,
    projectType: config.projectType,
    appVersion: payload.appVersion || appVersion || '1.0.0',
    projectName,
    createdAt: payload.createdAt || existingProject?.createdAt || now,
    updatedAt: now,
    data: payload.data && typeof payload.data === 'object' ? payload.data : {},
  };
}

async function chooseSavePath({ dialog, browserWindow, payload, config }) {
  const defaultName = `${safeProjectName(payload.projectName, `${config.displayName} Project`)}${config.extension}`;
  const result = await dialog.showSaveDialog(browserWindow, {
    title: `Save ${config.displayName} Project`,
    defaultPath: defaultName,
    filters: [{ name: config.dialogName, extensions: [config.extensionName] }],
  });

  if (result.canceled || !result.filePath) {
    return null;
  }

  return ensureProjectExtension(result.filePath, config);
}

async function saveProject({ dialog, browserWindow, payload, config, appVersion, forceSaveAs = false }) {
  if (!payload || payload.projectType !== config.projectType) {
    throw new Error(`هذا الملف ليس مشروع ${config.displayName} صالحًا`);
  }

  let filePath = !forceSaveAs && payload.currentProjectPath
    ? ensureProjectExtension(payload.currentProjectPath, config)
    : null;

  if (!filePath) {
    filePath = await chooseSavePath({ dialog, browserWindow, payload, config });
    if (!filePath) {
      return { success: true, canceled: true };
    }
  }

  const project = buildProjectDocument(payload, config, filePath, appVersion);
  safeWrite(filePath, `${JSON.stringify(project, null, 2)}\n`, { backup: true });

  return {
    success: true,
    canceled: false,
    filePath,
    project,
    projectName: project.projectName,
    savedAt: project.updatedAt,
  };
}

async function maybeSaveBeforeOpen({ dialog, browserWindow, context, config, appVersion }) {
  if (!context || !context.isDirty) {
    return { success: true, canceled: false };
  }

  const result = await dialog.showMessageBox(browserWindow, {
    type: 'warning',
    title: 'تغييرات غير محفوظة',
    message: 'لديك تغييرات غير محفوظة، هل تريد حفظها قبل فتح مشروع آخر؟',
    buttons: ['حفظ وفتح', 'فتح بدون حفظ', 'إلغاء'],
    defaultId: 0,
    cancelId: 2,
    noLink: true,
  });

  if (result.response === 2) {
    return { success: true, canceled: true };
  }

  if (result.response === 0) {
    return saveProject({
      dialog,
      browserWindow,
      payload: context.project,
      config,
      appVersion,
      forceSaveAs: false,
    });
  }

  return { success: true, canceled: false };
}

async function openProject({ dialog, browserWindow, context, config, appVersion }) {
  const beforeOpen = await maybeSaveBeforeOpen({ dialog, browserWindow, context, config, appVersion });
  if (beforeOpen.canceled) {
    return { success: true, canceled: true };
  }

  const result = await dialog.showOpenDialog(browserWindow, {
    title: `Open ${config.displayName} Project`,
    filters: [{ name: config.dialogName, extensions: [config.extensionName] }],
    properties: ['openFile'],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { success: true, canceled: true };
  }

  const filePath = result.filePaths[0];
  const project = loadProjectFromFile(filePath, config);

  return {
    success: true,
    canceled: false,
    filePath,
    project,
    projectName: project.projectName || path.basename(filePath, config.extension),
    savedBeforeOpen: Boolean(beforeOpen.filePath),
  };
}

module.exports = {
  PROJECT_CONFIGS,
  PROJECT_SCHEMA_VERSION,
  getProjectConfig,
  inferProjectConfigFromUrl,
  safeWrite,
  validateProject,
  migrateProjectIfNeeded,
  saveProject,
  openProject,
};
