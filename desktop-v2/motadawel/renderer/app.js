const FPS = 25;
const PROJECT_TYPE = 'motadawel';
const PROJECT_AUTOSAVE_DELAY_MS = 1600;
const TEXT_PRESET_VALUES = ['dark', 'gold', 'blue', 'red', 'orange'];

const state = {
  assets: {
    motadawel_intros: [],
    motadawel_outros: [],
    frem_mutadawel: [],
  },
  appVersion: '1.0.0',
  project: {
    currentProjectPath: '',
    projectName: 'Motadawel Project',
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
    autosaveEnabled: true,
    createdAt: null,
  },
  intro: '',
  introDurationMs: 0,
  introDurationFrames: 0,
  mainVideo: '',
  mainVideoUrl: '',
  mainVideoDurationMs: 0,
  mainVideoDurationFrames: 0,
  frame: '',
  outro: '_AUTO_',
  outroDurationMs: 0,
  outroDurationFrames: 0,
  text: 'ضع النص المطلوب هنا ',
  textBottomOffset: 160,
  textFontSize: 46,
  textPreset: 'dark',
  textAnimationType: 'motion-blur',
  cinematicBarSize: 6,
  effects: [],
  videoScale: 1.0,
  videoX: 0,
  videoY: 0,
  bgMusic: '',
  bgMusicVolume: 25,
  isRendering: false,
};

const elements = {
  brandLogo: document.getElementById('brand-logo'),
  projectSaveBtn: document.getElementById('project-save-btn'),
  projectOpenBtn: document.getElementById('project-open-btn'),
  projectSaveStatus: document.getElementById('project-save-status'),
  runtimeSummary: document.getElementById('runtime-summary'),
  refreshAssetsBtn: document.getElementById('refresh-assets-btn'),
  openOutputBtn: document.getElementById('open-output-btn'),

  introSelect: document.getElementById('motadawel-intro-select'),
  frameSelect: document.getElementById('motadawel-frame-select'),
  outroSelect: document.getElementById('motadawel-outro-select'),

  pickMainVideoBtn: document.getElementById('pick-main-video-btn'),
  mainVideoLabel: document.getElementById('main-video-label-name'),
  bgMusicSelect: document.getElementById('motadawel-bg-music-select'),
  bgMusicVolInput: document.getElementById('motadawel-bg-music-vol'),
  bgMusicVolValue: document.getElementById('motadawel-bg-music-val'),
  scaleInput: document.getElementById('motadawel-scale-input'),
  scaleValue: document.getElementById('motadawel-scale-value'),
  xInput: document.getElementById('motadawel-x-input'),
  xValue: document.getElementById('motadawel-x-value'),
  yInput: document.getElementById('motadawel-y-input'),
  yValue: document.getElementById('motadawel-y-value'),
  textInput: document.getElementById('motadawel-text-input'),
  bottomOffsetInput: document.getElementById('motadawel-bottom-offset-input'),
  bottomOffsetValue: document.getElementById('motadawel-bottom-offset-value'),
  fontSizeInput: document.getElementById('motadawel-font-size-input'),
  fontSizeValue: document.getElementById('motadawel-font-size-value'),
  textPresetSelect: document.getElementById('motadawel-text-preset-select'),
  textPresetButtons: Array.from(document.querySelectorAll('#motadawel-text-preset-buttons [data-preset]')),
  barSizeInput: document.getElementById('motadawel-bar-size-input'),
  barSizeValue: document.getElementById('motadawel-bar-size-value'),
  animationRadios: Array.from(document.querySelectorAll('.motadawel-animation-radio')),
  effectCheckboxes: Array.from(document.querySelectorAll('.motadawel-effect-checkbox')),
  resetBtn: document.getElementById('reset-motadawel-btn'),

  statusPanel: document.getElementById('status-panel'),
  statusTitle: document.getElementById('status-title'),
  statusMessage: document.getElementById('status-message'),
  progressContainer: document.getElementById('progress-container'),
  progressBar: document.getElementById('progress-bar'),
  progressLabel: document.getElementById('progress-label'),
  progressPercent: document.getElementById('progress-percent'),
  renderResult: document.getElementById('render-result'),
  renderBtn: document.getElementById('render-btn'),
  cancelRenderBtn: document.getElementById('cancel-render-btn'),
  navBtns: document.querySelectorAll('.app-nav-pills a.nav-btn'),

  previewContainer: document.getElementById('preview-stage'),
};

let autosaveTimerId = null;
let isApplyingProjectData = false;
let projectChangeRevision = 0;

const debugLogEl = document.getElementById('motadawel-debug-log');
function debugSerialize(value) {
  try {
    if (typeof value === 'string') return value;
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
function debugLog(...parts) {
  const line = `[${new Date().toLocaleTimeString('en-GB')}] ` + parts.map(debugSerialize).join(' ');
  console.log('[MotadawelUI]', ...parts);
  if (debugLogEl) {
    debugLogEl.textContent += line + '\n';
    debugLogEl.scrollTop = debugLogEl.scrollHeight;
  }
}
window.__motadawelDebugPush = (...parts) => debugLog(...parts);
window.addEventListener('error', (event) => {
  debugLog('window.error', { message: event.message, filename: event.filename, lineno: event.lineno, colno: event.colno });
});
window.addEventListener('unhandledrejection', (event) => {
  debugLog('unhandledrejection', event.reason?.message || String(event.reason));
});

function prettifyPath(fullPath) {
  if (!fullPath) return '';
  const parts = fullPath.split(/[/\\]/);
  return parts[parts.length - 1];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function updateRangeVisual(inputEl) {
  if (!inputEl) return;
  const min = parseFloat(inputEl.min) || 0;
  const max = parseFloat(inputEl.max) || 100;
  const val = parseFloat(inputEl.value) || 0;
  const percent = ((val - min) / (max - min)) * 100;
  inputEl.style.setProperty('--range-fill', `${percent}%`);
}

function getActiveTabId() {
  return document.querySelector('.tab-btn.active')?.dataset.target || 'tab-content-project';
}

function activateTab(tabId) {
  if (!tabId) return;
  const tabs = Array.from(document.querySelectorAll('.tab-btn'));
  const targetTab = tabs.find((tab) => tab.dataset.target === tabId);
  if (!targetTab) return;

  tabs.forEach((tab) => tab.classList.toggle('active', tab === targetTab));
  const displayModes = {
    'tab-content-project': 'flex',
    'tab-content-text': 'block',
    'tab-content-audio': 'block',
  };
  Object.entries(displayModes).forEach(([id, display]) => {
    const panel = document.getElementById(id);
    if (panel) panel.style.display = id === tabId ? display : 'none';
  });
}

function updateProjectStatusUi(statusText) {
  if (!elements.projectSaveBtn || !elements.projectSaveStatus) return;

  elements.projectSaveBtn.classList.toggle('is-dirty', state.project.isDirty && !state.project.isSaving);
  elements.projectSaveBtn.classList.toggle('is-saving', state.project.isSaving);
  elements.projectSaveBtn.disabled = state.project.isSaving;

  if (statusText) {
    elements.projectSaveStatus.textContent = statusText;
    return;
  }

  if (state.project.isSaving) {
    elements.projectSaveStatus.textContent = 'جارٍ الحفظ...';
  } else if (state.project.isDirty) {
    elements.projectSaveStatus.textContent = 'تغييرات غير محفوظة';
  } else if (state.project.lastSavedAt) {
    elements.projectSaveStatus.textContent = 'تم الحفظ';
  } else {
    elements.projectSaveStatus.textContent = 'مشروع جديد';
  }
}

function scheduleAutosave() {
  window.clearTimeout(autosaveTimerId);
  if (!state.project.autosaveEnabled || !state.project.currentProjectPath || !state.project.isDirty) {
    return;
  }

  autosaveTimerId = window.setTimeout(() => {
    saveCurrentProject({ autosave: true });
  }, PROJECT_AUTOSAVE_DELAY_MS);
}

function markProjectDirty() {
  if (isApplyingProjectData) {
    return;
  }
  projectChangeRevision += 1;
  state.project.isDirty = true;
  updateProjectStatusUi();
  scheduleAutosave();
}

function buildMotadawelProjectData() {
  return {
    scene: {
      intro: state.intro,
      introDurationMs: state.introDurationMs,
      introDurationFrames: state.introDurationFrames,
      mainVideo: state.mainVideo,
      mainVideoUrl: state.mainVideoUrl,
      mainVideoDurationMs: state.mainVideoDurationMs,
      mainVideoDurationFrames: state.mainVideoDurationFrames,
      frame: state.frame,
      outro: state.outro,
      outroDurationMs: state.outroDurationMs,
      outroDurationFrames: state.outroDurationFrames,
    },
    text: {
      value: state.text,
      bottomOffset: state.textBottomOffset,
      fontSize: state.textFontSize,
      preset: state.textPreset,
      animationType: state.textAnimationType,
      cinematicBarSize: state.cinematicBarSize,
    },
    videoTransform: {
      scale: state.videoScale,
      x: state.videoX,
      y: state.videoY,
    },
    audio: {
      bgMusic: state.bgMusic,
      bgMusicVolume: state.bgMusicVolume,
    },
    appearance: {
      effects: [...state.effects],
    },
    render: {
      turboMode: document.getElementById('turbo-render-checkbox')?.checked || false,
    },
    ui: {
      activeTab: getActiveTabId(),
    },
  };
}

function buildProjectPayload() {
  return {
    projectType: PROJECT_TYPE,
    appVersion: state.appVersion,
    currentProjectPath: state.project.currentProjectPath,
    projectName: state.project.projectName,
    createdAt: state.project.createdAt,
    data: buildMotadawelProjectData(),
  };
}

function applyProjectMeta(project, filePath) {
  state.project.currentProjectPath = filePath || '';
  state.project.projectName = project?.projectName || (filePath ? prettifyPath(filePath).replace(/\.mtp$/i, '') : 'Motadawel Project');
  state.project.createdAt = project?.createdAt || state.project.createdAt;
  state.project.lastSavedAt = project?.updatedAt || new Date().toISOString();
  state.project.isDirty = false;
}

async function saveCurrentProject({ forceSaveAs = false, autosave = false } = {}) {
  if (state.project.isSaving) return;

  window.clearTimeout(autosaveTimerId);
  state.project.isSaving = true;
  updateProjectStatusUi('جارٍ الحفظ...');
  let failed = false;

  try {
    const savingRevision = projectChangeRevision;
    const payload = buildProjectPayload();
    const result = forceSaveAs
      ? await window.projectApi.saveProjectAs(payload)
      : await window.projectApi.saveProject(payload);

    if (!result?.success) {
      throw new Error(result?.error || 'فشل الحفظ');
    }
    if (result.canceled) {
      return;
    }

    applyProjectMeta(result.project, result.filePath);
    if (projectChangeRevision !== savingRevision) {
      state.project.isDirty = true;
      scheduleAutosave();
    }
    updateProjectStatusUi('تم الحفظ');
  } catch (err) {
    failed = true;
    if (!autosave) {
      setStatus('خطأ', err?.message || 'فشل حفظ المشروع', true);
    }
    updateProjectStatusUi('فشل الحفظ');
  } finally {
    state.project.isSaving = false;
    updateProjectStatusUi(failed ? 'فشل الحفظ' : undefined);
  }
}

async function applyOpenedProject(project, filePath) {
  const data = project.data || {};
  const scene = data.scene || {};
  const text = data.text || {};
  const videoTransform = data.videoTransform || {};
  const audio = data.audio || {};
  const appearance = data.appearance || {};
  const ui = data.ui || {};

  isApplyingProjectData = true;
  try {
    state.intro = scene.intro || '';
    state.introDurationMs = Number(scene.introDurationMs || 0);
    state.introDurationFrames = Number(scene.introDurationFrames || 0);
    state.mainVideo = scene.mainVideo || '';
    state.mainVideoUrl = scene.mainVideoUrl || (state.mainVideo ? window.desktopApi.toFileUrl(state.mainVideo) : '');
    state.mainVideoDurationMs = Number(scene.mainVideoDurationMs || 0);
    state.mainVideoDurationFrames = Number(scene.mainVideoDurationFrames || 0);
    state.frame = scene.frame || '';
    state.outro = scene.outro || '';
    state.outroDurationMs = Number(scene.outroDurationMs || 0);
    state.outroDurationFrames = Number(scene.outroDurationFrames || 0);
    state.text = typeof text.value === 'string' ? text.value : state.text;
    state.textBottomOffset = Number(text.bottomOffset || state.textBottomOffset);
    state.textFontSize = Number(text.fontSize || state.textFontSize);
    state.textPreset = TEXT_PRESET_VALUES.includes(text.preset) ? text.preset : state.textPreset;
    state.textAnimationType = text.animationType || state.textAnimationType;
    state.cinematicBarSize = Number(text.cinematicBarSize || state.cinematicBarSize);
    state.videoScale = Number(videoTransform.scale || state.videoScale);
    state.videoX = Number(videoTransform.x || 0);
    state.videoY = Number(videoTransform.y || 0);
    state.bgMusic = audio.bgMusic || '';
    state.bgMusicVolume = Number(audio.bgMusicVolume ?? state.bgMusicVolume);
    state.effects = Array.isArray(appearance.effects) ? [...appearance.effects] : [];

    const turboCheckbox = document.getElementById('turbo-render-checkbox');
    if (turboCheckbox && data.render) {
      turboCheckbox.checked = Boolean(data.render.turboMode);
    }

    applyProjectMeta(project, filePath);
    syncUI();
    await updateIntroDuration();
    await updateOutroDuration();
    syncUI();
    await renderPreview();
    activateTab(ui.activeTab || 'tab-content-project');
    setStatus('المشروع', 'تم فتح المشروع بنجاح');
  } finally {
    isApplyingProjectData = false;
    projectChangeRevision = 0;
    state.project.isDirty = false;
    updateProjectStatusUi();
  }
}

async function openProjectFromDisk() {
  const result = await window.projectApi.openProject({
    isDirty: state.project.isDirty,
    project: buildProjectPayload(),
  });

  if (!result?.success) {
    setStatus('خطأ', result?.error || 'تعذر فتح المشروع', true);
    updateProjectStatusUi('فشل الحفظ');
    return;
  }
  if (result.canceled) {
    return;
  }

  await applyOpenedProject(result.project, result.filePath);
}

function buildOption(value, text, isSelected = false) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  option.selected = isSelected;
  return option;
}

function syncAssetDropdown(selectEl, assets, currentValue, allowNoneText) {
  selectEl.innerHTML = '';
  selectEl.appendChild(buildOption('', allowNoneText || 'بدون', currentValue === ''));
  assets.forEach((asset) => {
    selectEl.appendChild(buildOption(asset.path, asset.name, asset.path === currentValue));
  });
}

function isAssetPathAvailable(assets, targetPath) {
  return assets.some((asset) => asset.path === targetPath);
}

function sanitizeSelectedAssets() {
  if (state.intro && !isAssetPathAvailable(state.assets.motadawel_intros || [], state.intro)) {
    state.intro = '';
    state.introDurationMs = 0;
    state.introDurationFrames = 0;
    saveStateField('intro', '');
  }
  if (state.frame && !isAssetPathAvailable(state.assets.frem_mutadawel || [], state.frame)) {
    state.frame = '';
    saveStateField('frame', '');
  }
  if (state.outro === '_AUTO_') {
    if (state.assets.motadawel_outros && state.assets.motadawel_outros.length > 0) {
      state.outro = state.assets.motadawel_outros[0].path;
      saveStateField('outro', state.outro);
    } else {
      state.outro = '';
    }
  } else if (state.outro && !isAssetPathAvailable(state.assets.motadawel_outros || [], state.outro)) {
    state.outro = '';
    state.outroDurationMs = 0;
    state.outroDurationFrames = 0;
    saveStateField('outro', '');
  }
  if (state.bgMusic && !isAssetPathAvailable(state.assets.music || [], state.bgMusic)) {
    state.bgMusic = '';
    saveStateField('bgMusic', '');
  }
}

function findAssetByPath(assets, targetPath) {
  return assets.find((asset) => asset.path === targetPath) || null;
}

function getFileUrlForAsset(targetPath, assets) {
  if (!targetPath) return null;
  const asset = findAssetByPath(assets, targetPath);
  return asset?.url || window.desktopApi.toFileUrl(targetPath);
}

function setPresetUi() {
  if (elements.textPresetSelect) {
    elements.textPresetSelect.value = state.textPreset;
  }
  elements.textPresetButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.preset === state.textPreset);
  });
}

function setEffectsUi() {
  const active = new Set(state.effects);
  elements.effectCheckboxes.forEach((checkbox) => {
    checkbox.checked = active.has(checkbox.value);
  });
  const barContainer = document.getElementById('cinematic-bar-size-container');
  if (barContainer) {
    if (active.has('cinematic-bars')) barContainer.classList.remove('ui-hidden');
    else barContainer.classList.add('ui-hidden');
  }
}

function syncUI() {
  sanitizeSelectedAssets();

  syncAssetDropdown(elements.introSelect, state.assets.motadawel_intros || [], state.intro, 'بدون مقدمة');
  syncAssetDropdown(elements.frameSelect, state.assets.frem_mutadawel || [], state.frame, 'بدون إطار');
  syncAssetDropdown(elements.outroSelect, state.assets.motadawel_outros || [], state.outro, 'بدون خاتمة');
  syncAssetDropdown(elements.bgMusicSelect, state.assets.music || [], state.bgMusic, 'بدون موسيقى');

  const durationSec = state.mainVideoDurationMs > 0 ? `${(state.mainVideoDurationMs / 1000).toFixed(1)}ث` : '';
  const videoLabel = state.mainVideo
    ? `${prettifyPath(state.mainVideo)}${durationSec ? ` (${durationSec})` : ''}`
    : 'لم يتم الاختيار';
  elements.mainVideoLabel.textContent = videoLabel;

  elements.scaleInput.value = String(state.videoScale);
  elements.scaleValue.textContent = state.videoScale.toFixed(1);
  elements.xInput.value = String(state.videoX);
  elements.xValue.textContent = `${state.videoX}px`;
  elements.yInput.value = String(state.videoY);
  elements.yValue.textContent = `${state.videoY}px`;
  elements.textInput.value = state.text;
  elements.bottomOffsetInput.value = String(state.textBottomOffset);
  elements.bottomOffsetValue.textContent = `${state.textBottomOffset}px`;
  elements.fontSizeInput.value = String(state.textFontSize);
  elements.fontSizeValue.textContent = `${state.textFontSize}px`;
  
  if (elements.bgMusicVolInput && elements.bgMusicVolValue) {
    elements.bgMusicVolInput.value = String(state.bgMusicVolume);
    elements.bgMusicVolValue.textContent = `${state.bgMusicVolume}%`;
  }

  if (elements.barSizeInput && elements.barSizeValue) {
    elements.barSizeInput.value = String(state.cinematicBarSize);
    elements.barSizeValue.textContent = `${state.cinematicBarSize}%`;
  }
  if (elements.animationRadios) {
    elements.animationRadios.forEach(r => { r.checked = r.value === state.textAnimationType; });
  }

  setPresetUi();
  setEffectsUi();

  [
    elements.scaleInput,
    elements.xInput,
    elements.yInput,
    elements.bottomOffsetInput,
    elements.fontSizeInput,
    elements.barSizeInput,
    elements.bgMusicVolInput,
  ].filter(Boolean).forEach(updateRangeVisual);
}

const getStoredVal = (key) => localStorage.getItem('motadawel:' + key) || '';
function loadSavedState() {
  state.intro = getStoredVal('intro');
  state.frame = getStoredVal('frame');
  state.outro = getStoredVal('outro');
  state.videoScale = Number(getStoredVal('videoScale') || 1);
  state.videoX = Number(getStoredVal('videoX') || 0);
  state.videoY = Number(getStoredVal('videoY') || 0);
  state.text = getStoredVal('text') || 'ضع النص المطلوب هنا ';
  state.textBottomOffset = Number(getStoredVal('textBottomOffset') || 160);
  state.textFontSize = Number(getStoredVal('textFontSize') || 46);
  const storedPreset = getStoredVal('textPreset') || 'dark';
  state.textPreset = TEXT_PRESET_VALUES.includes(storedPreset) ? storedPreset : 'dark';
  state.textAnimationType = getStoredVal('textAnimationType') || 'motion-blur';
  state.cinematicBarSize = Number(getStoredVal('cinematicBarSize')) || 6;
  const storedEffects = getStoredVal('effects');
  state.effects = storedEffects
    ? storedEffects.split(',').map((effect) => effect.trim()).filter(Boolean)
    : [];
  state.bgMusic = getStoredVal('bgMusic');
  state.bgMusicVolume = getStoredVal('bgMusicVolume') !== '' ? Number(getStoredVal('bgMusicVolume')) : 25;
}

function saveStateField(key, val) {
  localStorage.setItem('motadawel:' + key, String(val));
}

async function readMediaDurationMs(fileUrl, fallbackMs = 0) {
  if (!fileUrl) return fallbackMs;

  return new Promise((resolve) => {
    const media = document.createElement('video');
    let settled = false;

    const finish = (value) => {
      if (settled) return;
      settled = true;
      media.removeAttribute('src');
      media.load();
      resolve(value);
    };

    const timeoutId = window.setTimeout(() => finish(fallbackMs), 8000);

    media.preload = 'metadata';
    media.muted = true;
    media.src = fileUrl;

    media.onloadedmetadata = () => {
      debugLog('metadata loaded', { fileUrl, duration: media.duration, videoWidth: media.videoWidth, videoHeight: media.videoHeight });
      window.clearTimeout(timeoutId);
      if (Number.isFinite(media.duration) && media.duration > 0) {
        finish(Math.round(media.duration * 1000));
        return;
      }
      finish(fallbackMs);
    };

    media.onerror = () => {
      debugLog('metadata error', { fileUrl, mediaError: media.error ? { code: media.error.code, message: media.error.message } : null });
      window.clearTimeout(timeoutId);
      finish(fallbackMs);
    };
  });
}

async function updateIntroDuration() {
  if (!state.intro) {
    state.introDurationMs = 0;
    state.introDurationFrames = 0;
    return;
  }

  const url = getFileUrlForAsset(state.intro, state.assets.motadawel_intros || []);
  const durationMs = await readMediaDurationMs(url, 5000);
  state.introDurationMs = durationMs;
  state.introDurationFrames = Math.max(0, Math.ceil((durationMs / 1000) * FPS));
}

async function updateOutroDuration() {
  if (!state.outro) {
    state.outroDurationMs = 0;
    state.outroDurationFrames = 0;
    return;
  }

  const url = getFileUrlForAsset(state.outro, state.assets.motadawel_outros || []);
  const durationMs = await readMediaDurationMs(url, 5000);
  state.outroDurationMs = durationMs;
  state.outroDurationFrames = Math.max(0, Math.ceil((durationMs / 1000) * FPS));
}

function getMainVideoDurationFrames() {
  return state.mainVideoDurationMs > 0 ? Math.ceil((state.mainVideoDurationMs / 1000) * FPS) : 0;
}

function getTotalPreviewDurationFrames() {
  const introFrames = state.introDurationFrames;
  const mainFrames = getMainVideoDurationFrames();
  const outroFrames = state.outroDurationFrames;
  
  const introOverlap = state.intro ? Math.min(25, introFrames) : 0;
  const outroOverlap = state.outro ? Math.min(25, outroFrames) : 0;
  
  const total = introFrames + mainFrames + outroFrames - introOverlap - outroOverlap;
  return Math.max(30, total || 30);
}

function buildPreviewInputProps() {
  return {
    introVideoUrl: getFileUrlForAsset(state.intro, state.assets.motadawel_intros || []),
    mainVideoUrl: state.mainVideoUrl || null,
    frameUrl: getFileUrlForAsset(state.frame, state.assets.frem_mutadawel || []),
    outroVideoUrl: getFileUrlForAsset(state.outro, state.assets.motadawel_outros || []),
    mainText: state.text,
    videoScale: state.videoScale,
    videoX: state.videoX,
    videoY: state.videoY,
    effects: [...state.effects],
    introDurationFrames: state.introDurationFrames,
    mainVideoDurationFrames: getMainVideoDurationFrames(),
    outroDurationFrames: state.outroDurationFrames,
    textBottomOffset: state.textBottomOffset,
    textFontSize: state.textFontSize,
    textPreset: state.textPreset,
    textAnimationType: state.textAnimationType,
    cinematicBarSize: state.cinematicBarSize,
    bgMusicUrl: getFileUrlForAsset(state.bgMusic, state.assets.music || []),
    bgMusicVolume: state.bgMusicVolume / 100,
  };
}

function previewApi() {
  const api = window.DesktopRemotionPreviewMotadawel || window.window?.DesktopRemotionPreviewMotadawel;
  if (!api) debugLog('previewApi missing');
  return api;
}

async function renderPreview() {
  const api = previewApi();
  debugLog('renderPreview called', {
    intro: state.intro,
    mainVideo: state.mainVideo,
    mainVideoUrl: state.mainVideoUrl,
    frame: state.frame,
    outro: state.outro,
    previewWidth: elements.previewContainer?.clientWidth || 0,
    previewHeight: elements.previewContainer?.clientHeight || 0,
  });
  if (!api || typeof api.update !== 'function') {
    console.error('Preview player not loaded');
    return;
  }

  const payload = {
    inputProps: buildPreviewInputProps(),
    durationInFrames: getTotalPreviewDurationFrames(),
  };
  debugLog('preview payload', payload);
  api.update(payload);
}

function setStatus(title, message, isError = false) {
  elements.statusPanel.classList.remove('is-hidden');
  elements.statusTitle.textContent = title;
  elements.statusMessage.textContent = message;
  if (isError) {
    elements.statusPanel.classList.add('error');
  } else {
    elements.statusPanel.classList.remove('error');
  }
}

function setProgress(fraction, labelText) {
  if (fraction < 0) {
    elements.progressContainer.classList.add('is-hidden');
    return;
  }

  const safeFraction = clamp(fraction, 0, 1);
  elements.progressContainer.classList.remove('is-hidden');
  elements.progressBar.style.width = `${safeFraction * 100}%`;
  elements.progressPercent.textContent = `${Math.round(safeFraction * 100)}%`;
  if (labelText) {
    elements.progressLabel.textContent = labelText;
  }
}

function collectEffects() {
  state.effects = elements.effectCheckboxes
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);
  saveStateField('effects', state.effects.join(','));
  setEffectsUi(); // update visibility of conditional settings
}

async function handleIntroChange(value) {
  state.intro = value;
  saveStateField('intro', state.intro);
  await updateIntroDuration();
  syncUI();
  await renderPreview();
}

async function handleOutroChange(value) {
  state.outro = value;
  saveStateField('outro', state.outro);
  await updateOutroDuration();
  syncUI();
  await renderPreview();
}

function shouldIgnoreDirtyEvent(target) {
  if (!target || typeof target.closest !== 'function') return false;
  return Boolean(target.closest(
    '#preview-seek, .preview-icon-btn, #preview-stage, #project-save-btn, #project-open-btn',
  ));
}

document.addEventListener('input', (event) => {
  if (!shouldIgnoreDirtyEvent(event.target)) {
    markProjectDirty();
  }
}, true);

document.addEventListener('change', (event) => {
  if (!shouldIgnoreDirtyEvent(event.target)) {
    markProjectDirty();
  }
}, true);

document.addEventListener('click', (event) => {
  if (event.target.closest('.tab-btn')) {
    markProjectDirty();
  }
}, true);

if (elements.projectSaveBtn) {
  elements.projectSaveBtn.addEventListener('click', () => saveCurrentProject());
}
if (elements.projectOpenBtn) {
  elements.projectOpenBtn.addEventListener('click', openProjectFromDisk);
}

elements.introSelect.addEventListener('change', async (e) => {
  await handleIntroChange(e.target.value);
});

elements.frameSelect.addEventListener('change', async (e) => {
  state.frame = e.target.value;
  saveStateField('frame', state.frame);
  syncUI();
  await renderPreview();
});

elements.outroSelect.addEventListener('change', async (e) => {
  await handleOutroChange(e.target.value);
});

if (elements.bgMusicSelect) {
  elements.bgMusicSelect.addEventListener('change', async (e) => {
    state.bgMusic = e.target.value;
    saveStateField('bgMusic', state.bgMusic);
    syncUI();
    await renderPreview();
  });
}

if (elements.bgMusicVolInput) {
  elements.bgMusicVolInput.addEventListener('input', async (e) => {
    state.bgMusicVolume = Number(e.target.value);
    elements.bgMusicVolValue.textContent = `${state.bgMusicVolume}%`;
    updateRangeVisual(elements.bgMusicVolInput);
    saveStateField('bgMusicVolume', state.bgMusicVolume);
    await renderPreview();
  });
}

elements.textInput.addEventListener('input', async (e) => {
  state.text = e.target.value;
  saveStateField('text', state.text);
  await renderPreview();
});

elements.scaleInput.addEventListener('input', async (e) => {
  state.videoScale = Number(e.target.value);
  elements.scaleValue.textContent = state.videoScale.toFixed(1);
  updateRangeVisual(elements.scaleInput);
  saveStateField('videoScale', state.videoScale);
  await renderPreview();
});

elements.xInput.addEventListener('input', async (e) => {
  state.videoX = Number(e.target.value);
  elements.xValue.textContent = `${state.videoX}px`;
  updateRangeVisual(elements.xInput);
  saveStateField('videoX', state.videoX);
  await renderPreview();
});

elements.yInput.addEventListener('input', async (e) => {
  state.videoY = Number(e.target.value);
  elements.yValue.textContent = `${state.videoY}px`;
  updateRangeVisual(elements.yInput);
  saveStateField('videoY', state.videoY);
  await renderPreview();
});

elements.bottomOffsetInput.addEventListener('input', async (e) => {
  state.textBottomOffset = Number(e.target.value);
  elements.bottomOffsetValue.textContent = `${state.textBottomOffset}px`;
  updateRangeVisual(elements.bottomOffsetInput);
  saveStateField('textBottomOffset', state.textBottomOffset);
  await renderPreview();
});

elements.fontSizeInput.addEventListener('input', async (e) => {
  state.textFontSize = Number(e.target.value);
  elements.fontSizeValue.textContent = `${state.textFontSize}px`;
  updateRangeVisual(elements.fontSizeInput);
  saveStateField('textFontSize', state.textFontSize);
  await renderPreview();
});

if (elements.barSizeInput) {
  elements.barSizeInput.addEventListener('input', async (e) => {
    state.cinematicBarSize = Number(e.target.value);
    elements.barSizeValue.textContent = `${state.cinematicBarSize}%`;
    updateRangeVisual(elements.barSizeInput);
    saveStateField('cinematicBarSize', state.cinematicBarSize);
    await renderPreview();
  });
}

if (elements.animationRadios) {
  elements.animationRadios.forEach((radio) => {
    radio.addEventListener('change', async (e) => {
      if (e.target.checked) {
        state.textAnimationType = e.target.value;
        saveStateField('textAnimationType', state.textAnimationType);
        await renderPreview();
      }
    });
  });
}

elements.textPresetSelect.addEventListener('change', async (e) => {
  state.textPreset = TEXT_PRESET_VALUES.includes(e.target.value) ? e.target.value : 'dark';
  setPresetUi();
  saveStateField('textPreset', state.textPreset);
  await renderPreview();
});

elements.textPresetButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    state.textPreset = TEXT_PRESET_VALUES.includes(button.dataset.preset) ? button.dataset.preset : 'dark';
    setPresetUi();
    saveStateField('textPreset', state.textPreset);
    markProjectDirty();
    await renderPreview();
  });
});

elements.effectCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', async () => {
    collectEffects();
    await renderPreview();
  });
});

elements.resetBtn.addEventListener('click', async () => {
  state.videoScale = 1;
  state.videoX = 0;
  state.videoY = 0;
  saveStateField('videoScale', 1);
  saveStateField('videoX', 0);
  saveStateField('videoY', 0);
  markProjectDirty();
  syncUI();
  await renderPreview();
});

elements.pickMainVideoBtn.addEventListener('click', async () => {
  debugLog('pick main video clicked');
  const result = await window.desktopApi.pickMainVideo();
  if (!result) {
    return;
  }

  state.mainVideo = result.path;
  state.mainVideoUrl = result.url;
  debugLog('main video selected', result);

  try {
    const durationMs = await readMediaDurationMs(result.url, 10000);
    state.mainVideoDurationMs = durationMs;
    state.mainVideoDurationFrames = getMainVideoDurationFrames();
  } catch {
    state.mainVideoDurationMs = 10000;
    state.mainVideoDurationFrames = getMainVideoDurationFrames();
  }

  syncUI();
  markProjectDirty();
  await renderPreview();
});

elements.renderBtn.addEventListener('click', async () => {
  if (!state.mainVideo) {
    alert('يرجى اختيار الفيديو الرئيسي أولاً');
    return;
  }
  if (state.isRendering) return;

  state.isRendering = true;
  elements.renderBtn.disabled = true;
  elements.renderBtn.style.display = 'none';
  if (elements.cancelRenderBtn) elements.cancelRenderBtn.style.display = 'inline-flex';
  elements.navBtns.forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';
  });
  elements.renderBtn.classList.add('is-loading');
  elements.renderResult.innerHTML = '';
  setStatus('جاري الرندر', 'يتم الآن تجهيز الفيديو.');
  setProgress(0.02, 'بدء مهمة الرندر (متداول)...');

  try {
    const payload = {
      model: 'motadawel',
      compositionId: 'MotadawelVideo',
      intro: state.intro || null,
      introDurationFrames: state.introDurationFrames,
      mainVideo: state.mainVideo || null,
      mainVideoDurationMs: state.mainVideoDurationMs || 0,
      mainVideoDurationFrames: getMainVideoDurationFrames(),
      frame: state.frame || null,
      outro: state.outro || null,
      outroDurationFrames: state.outroDurationFrames,
      text: state.text || '',
      videoScale: Number(state.videoScale || 1),
      videoX: Number(state.videoX || 0),
      videoY: Number(state.videoY || 0),
      effects: [...state.effects],
      textBottomOffset: Number(state.textBottomOffset || 160),
      textFontSize: Number(state.textFontSize || 46),
      textPreset: state.textPreset || 'dark',
      textAnimationType: state.textAnimationType || 'motion-blur',
      cinematicBarSize: Number(state.cinematicBarSize || 6),
      bgMusic: state.bgMusic || null,
      bgMusicVolume: Number(state.bgMusicVolume !== undefined ? state.bgMusicVolume : 25) / 100,
      turboMode: document.getElementById('turbo-render-checkbox')?.checked || false,
    };

    const result = await window.desktopApi.render(payload);

    setStatus('اكتمل الرندر', 'تم حفظ الفيديو بنجاح.');
    setProgress(1, 'اكتمل الرندر');
    elements.renderResult.innerHTML = `
      <div class="result-card">
        <strong>تم حفظ فيديو متداول</strong>
        <span class="muted">${result.outputPath}</span>
        <div class="result-actions">
          <button id="reveal-file-btn" class="btn secondary small">إظهار الملف</button>
          <button id="open-folder-btn" class="btn secondary small">فتح المجلد</button>
        </div>
      </div>
    `;

    document.getElementById('reveal-file-btn')?.addEventListener('click', () => {
      window.desktopApi.revealInFolder(result.outputPath);
    });
    document.getElementById('open-folder-btn')?.addEventListener('click', () => {
      window.desktopApi.openOutputFolder();
    });

    showSuccessModal(result.outputPath);
  } catch (error) {
    console.error('Render failed:', error);
    setStatus('فشل الرندر', error.message || 'حدث خطأ غير متوقع', true);
    setProgress(-1);
  } finally {
    state.isRendering = false;
    elements.renderBtn.disabled = false;
    elements.renderBtn.classList.remove('is-loading');
    elements.renderBtn.style.display = 'inline-flex';
    if (elements.cancelRenderBtn) elements.cancelRenderBtn.style.display = 'none';
    elements.navBtns.forEach(btn => {
      btn.style.pointerEvents = 'auto';
      btn.style.opacity = '1';
    });
  }
});

if (elements.cancelRenderBtn) {
  elements.cancelRenderBtn.addEventListener('click', async () => {
    const canceled = await window.desktopApi.cancelRender({ model: 'motadawel' });
    if (canceled) {
      setStatus('تم الإيقاف', 'تم إيقاف عملية الرندر بناءً على طلبك.', false);
      setProgress(-1);
    }
  });
}

function showSuccessModal(outputPath) {
  const overlay = document.getElementById('success-modal-overlay');
  if (!overlay) return;
  document.getElementById('modal-file-path').textContent = outputPath;
  overlay.classList.add('is-active');

  const revealBtn = document.getElementById('modal-reveal-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  const newRevealBtn = revealBtn.cloneNode(true);
  const newCloseBtn = closeBtn.cloneNode(true);
  revealBtn.parentNode.replaceChild(newRevealBtn, revealBtn);
  closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

  newRevealBtn.addEventListener('click', () => {
    window.desktopApi.revealInFolder(outputPath);
  });
  newCloseBtn.addEventListener('click', () => {
    overlay.classList.remove('is-active');
  });

  createConfetti();
}

function createConfetti() {
  const emojis = ['🎉', '🎊', '✨', '🎈', '⭐'];
  for (let i = 0; i < 40; i++) {
    const flake = document.createElement('div');
    flake.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    flake.style.position = 'fixed';
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.top = '-50px';
    flake.style.fontSize = (Math.random() * 20 + 15) + 'px';
    flake.style.zIndex = '100000';
    flake.style.pointerEvents = 'none';
    flake.style.transition = 'transform ' + (Math.random() * 1.5 + 1.5) + 's linear, top ' + (Math.random() * 1.5 + 2) + 's ease-in';
    document.body.appendChild(flake);

    setTimeout(() => {
      flake.style.top = '120vh';
      flake.style.transform = 'rotate(' + (Math.random() * 720 - 360) + 'deg)';
    }, 50);

    setTimeout(() => {
      flake.remove();
    }, 4000);
  }
}

elements.refreshAssetsBtn.addEventListener('click', async () => {
  try {
    state.assets = await window.desktopApi.refreshAssets();
  } catch (e) {
    debugLog('Failed to refresh assets via IPC', e);
  }
  
  try {
    await updateIntroDuration();
  } catch (e) {
    debugLog('updateIntroDuration failed, continuing', e);
  }
  
  try {
    await updateOutroDuration();
  } catch (e) {
    debugLog('updateOutroDuration failed, continuing', e);
  }
  
  try {
    syncUI();
    await renderPreview();
  } catch (e) {
    debugLog('syncUI or renderPreview failed', e);
  }
});

elements.openOutputBtn.addEventListener('click', () => {
  window.desktopApi.openOutputFolder();
});

window.desktopApi.onRenderProgress((payload) => {
  if (!payload) {
    return;
  }

  if (payload.stage === 'queued') {
    setProgress(0.05, payload.message);
    return;
  }

  if (payload.stage === 'bundle') {
    setProgress(0.1 + ((payload.progress || 0) * 0.1), payload.message);
    return;
  }

  if (payload.stage === 'composition') {
    setProgress(0.2 + ((payload.progress || 0) * 0.1), payload.message);
    return;
  }

  if (payload.stage === 'render') {
    setProgress(0.3 + ((payload.progress || 0) * 0.7), payload.message);
  }
});

async function bootstrap() {
  debugLog('bootstrap start');
  const payload = await window.desktopApi.bootstrap();
  debugLog('bootstrap payload', { hasLogo: !!payload.logoDataUrl, hasFont: !!payload.fontDataUrl, assets: Object.fromEntries(Object.entries(payload.assets || {}).map(([k,v]) => [k, Array.isArray(v) ? v.length : 0])) });
  state.appVersion = payload.appVersion || state.appVersion;
  state.assets = payload.assets;
  loadSavedState();

  try {
    await updateIntroDuration();
  } catch (e) {
    debugLog('bootstrap: updateIntroDuration failed', e);
  }
  
  try {
    await updateOutroDuration();
  } catch (e) {
    debugLog('bootstrap: updateOutroDuration failed', e);
  }
  
  try {
    syncUI();
  } catch(e) {
    debugLog('bootstrap: syncUI failed', e);
  }

  if (payload.logoDataUrl) {
    elements.brandLogo.src = payload.logoDataUrl;
  }

  if (payload.fontDataUrl && !document.head.querySelector('[data-desktop-font="AvenirArabic"]')) {
    const style = document.createElement('style');
    style.setAttribute('data-desktop-font', 'AvenirArabic');
    style.textContent = `
      @font-face {
        font-family: 'AvenirArabic';
        src: url('${payload.fontDataUrl}') format('opentype');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  const api = previewApi();
  if (api && typeof api.mount === 'function') {
    debugLog('mounting preview', { width: elements.previewContainer?.clientWidth || 0, height: elements.previewContainer?.clientHeight || 0 });
    api.mount(elements.previewContainer);
    await renderPreview();
  } else {
    debugLog('preview api unavailable at bootstrap');
  }
  updateProjectStatusUi();
}

document.addEventListener('DOMContentLoaded', bootstrap);
