const FPS = 25;
const PROJECT_TYPE = 'personalities';
const PROJECT_AUTOSAVE_DELAY_MS = 1600;
const DEFAULT_SCENE_DURATION_SECONDS = 8;
const TRANSITION_FRAMES = 20;

const DEFAULT_SETTINGS = {
  ttsModel: 'gemini-2.5-flash-preview-tts',
  ttsVoice: 'Charon',
  ttsStylePrompt: '',
  contentModel: 'gemini-2.5-flash',
};

const state = {
  assets: {
    music: [],
    endpage: [],
  },
  appVersion: '1.0.0',
  placeholderPath: '',
  project: {
    currentProjectPath: '',
    projectName: 'Personalities Project',
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
    autosaveEnabled: true,
    createdAt: null,
  },
  settings: { ...DEFAULT_SETTINGS },
  scenes: [],
  music: '',
  musicVolume: 30,
  voiceoverVolume: 100,
  endPage: '',
  endPageDurationFrames: 0,
  endPageDurationSource: '',
  effects: ['dust', 'light-leak', 'bokeh'],
  cinematicBarSize: 6,
  isRendering: false,
  generation: {
    sourceScript: '',
    sceneCount: 8,
    sceneDurationSeconds: DEFAULT_SCENE_DURATION_SECONDS,
    aspectRatio: '16:9',
    documentaryStylePreset: 'وثائقي عربي واقعي',
    mainCharacterNotes: '',
    globalVisualRules: '',
    prisonSceneRules: '',
    negativePrompt: '',
    languageOrDialect: 'العربية الفصحى',
  },
  ui: {
    activeTab: 'tab-content',
    openContentSceneId: null,
  },
};

const elements = {
  brandLogo: document.getElementById('brand-logo'),
  projectSaveBtn: document.getElementById('project-save-btn'),
  projectOpenBtn: document.getElementById('project-open-btn'),
  projectSaveStatus: document.getElementById('project-save-status'),
  runtimeSummary: document.getElementById('runtime-summary'),
  previewSummary: document.getElementById('preview-summary'),
  previewStage: document.getElementById('preview-stage'),
  statusTitle: document.getElementById('status-title'),
  statusMessage: document.getElementById('status-message'),
  progressBar: document.getElementById('progress-bar'),
  progressLabel: document.getElementById('progress-label'),
  progressPercent: document.getElementById('progress-percent'),
  renderResult: document.getElementById('render-result'),
  renderBtn: document.getElementById('render-btn'),
  cancelRenderBtn: document.getElementById('cancel-render-btn'),
  openOutputBtn: document.getElementById('open-output-btn'),
  tabButtons: Array.from(document.querySelectorAll('.tab-btn')),
  slidesSummary: document.getElementById('slides-summary'),
  slidesList: document.getElementById('slides-list'),
  musicSelect: document.getElementById('music-select'),
  musicVolumeInput: document.getElementById('music-volume-input'),
  musicVolumeValue: document.getElementById('music-volume-value'),
  voiceoverVolumeInput: document.getElementById('voiceover-volume-input'),
  voiceoverVolumeValue: document.getElementById('voiceover-volume-value'),
  endPageSelect: document.getElementById('endpage-select'),
  endPageDurationHint: document.getElementById('endpage-duration-hint'),
  generateAllVoiceoversBtn: document.getElementById('generate-all-voiceovers-btn'),
  audioList: document.getElementById('audio-list'),
  sourceScriptInput: document.getElementById('source-script-input'),
  sceneCountInput: document.getElementById('scene-count-input'),
  sceneDurationSelect: document.getElementById('scene-duration-select'),
  aspectRatioSelect: document.getElementById('aspect-ratio-select'),
  documentaryStyleInput: document.getElementById('documentary-style-input'),
  languageDialectInput: document.getElementById('language-dialect-input'),
  characterNotesInput: document.getElementById('character-notes-input'),
  visualRulesInput: document.getElementById('visual-rules-input'),
  prisonRulesInput: document.getElementById('prison-rules-input'),
  negativePromptInput: document.getElementById('negative-prompt-input'),
  generateScenesBtn: document.getElementById('generate-scenes-btn'),
  contentStatus: document.getElementById('content-status'),
  contentScenesList: document.getElementById('content-scenes-list'),
};

let autosaveTimerId = null;
let previewRenderTimerId = null;
let isApplyingProjectData = false;
let projectChangeRevision = 0;

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function escapeAttr(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function prettifyPath(fullPath) {
  if (!fullPath) return '';
  const parts = fullPath.split(/[/\\]/);
  return parts[parts.length - 1];
}

function isVideoPath(value) {
  return /\.(mp4|mov|webm|m4v|mkv)$/i.test(value || '');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setStatus(title, message = '') {
  elements.statusTitle.textContent = title;
  elements.statusMessage.textContent = message;
}

function setProgress(progress, message) {
  const safeProgress = Math.max(0, Math.min(1, progress || 0));
  elements.progressBar.style.width = `${safeProgress * 100}%`;
  elements.progressPercent.textContent = `${Math.round(safeProgress * 100)}%`;
  elements.progressLabel.textContent = message || 'جاهز';
}

function updateProjectStatusUi(statusText) {
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
  if (isApplyingProjectData) return;
  projectChangeRevision += 1;
  state.project.isDirty = true;
  updateProjectStatusUi();
  scheduleAutosave();
}

function updatePromptPrefix(kind, prompt, sceneNumber) {
  const prefix = `Scene ${String(sceneNumber).padStart(2, '0')} — ${kind}:`;
  const cleaned = String(prompt || '').trim();
  if (!cleaned) return prefix;
  return cleaned.replace(/^Scene\s+\d+\s*[-—]\s*(Image Prompt|Motion Prompt):\s*/i, `${prefix} `).trim();
}

function normalizeScene(scene, index) {
  const mediaPath = typeof scene.mediaPath === 'string' ? scene.mediaPath : '';
  const voiceoverPath = typeof scene.voiceoverPath === 'string' ? scene.voiceoverPath : null;
  const mediaType = scene.mediaType === 'video' || isVideoPath(mediaPath || scene.fileUrl)
    ? 'video'
    : 'image';
  const sceneNumber = Math.max(1, Number(scene.sceneNumber || index + 1));
  const trimStartMs = Math.max(0, Number(scene.trimStartMs || 0));
  const trimEndMs = scene.trimEndMs == null || scene.trimEndMs === ''
    ? null
    : Math.max(trimStartMs + 100, Number(scene.trimEndMs || 0));

  return {
    id: scene.id || createId('personality-scene'),
    sceneNumber,
    title: typeof scene.title === 'string' ? scene.title : '',
    sourceExcerpt: typeof scene.sourceExcerpt === 'string' ? scene.sourceExcerpt : '',
    ageStage: typeof scene.ageStage === 'string' ? scene.ageStage : '',
    timePeriod: typeof scene.timePeriod === 'string' ? scene.timePeriod : '',
    location: typeof scene.location === 'string' ? scene.location : '',
    voiceoverText: typeof scene.voiceoverText === 'string' ? scene.voiceoverText : '',
    imagePrompt: updatePromptPrefix('Image Prompt', scene.imagePrompt || '', sceneNumber),
    motionPrompt: updatePromptPrefix('Motion Prompt', scene.motionPrompt || '', sceneNumber),
    visualContinuityNotes: typeof scene.visualContinuityNotes === 'string' ? scene.visualContinuityNotes : '',
    copiedImagePrompt: scene.copiedImagePrompt === true,
    copiedMotionPrompt: scene.copiedMotionPrompt === true,
    mediaPath,
    fileUrl: scene.fileUrl || (mediaPath ? window.desktopApi.toFileUrl(mediaPath) : ''),
    mediaType,
    mediaDurationMs: Math.max(0, Number(scene.mediaDurationMs || 0)),
    trimStartMs,
    trimEndMs,
    voiceoverPath,
    voiceoverUrl: scene.voiceoverUrl || (voiceoverPath ? window.desktopApi.toFileUrl(voiceoverPath) : null),
    voiceoverDurationMs: Math.max(0, Number(scene.voiceoverDurationMs || 0)),
  };
}

function renumberScenes() {
  state.scenes = state.scenes.map((scene, index) => {
    const sceneNumber = index + 1;
    return {
      ...scene,
      sceneNumber,
      imagePrompt: updatePromptPrefix('Image Prompt', scene.imagePrompt, sceneNumber),
      motionPrompt: updatePromptPrefix('Motion Prompt', scene.motionPrompt, sceneNumber),
    };
  });
}

function formatAssetOptions(select, items, placeholder) {
  select.innerHTML = '';
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = placeholder;
  select.appendChild(emptyOption);

  (items || []).forEach((item) => {
    const option = document.createElement('option');
    option.value = item.path;
    option.textContent = item.name;
    select.appendChild(option);
  });
}

function findAssetByPath(items, assetPath) {
  return (items || []).find((item) => item.path === assetPath) || null;
}

function mediaFileUrlForScene(scene) {
  if (scene.fileUrl) return scene.fileUrl;
  if (scene.mediaPath) return window.desktopApi.toFileUrl(scene.mediaPath);
  if (state.placeholderPath) return window.desktopApi.toFileUrl(state.placeholderPath);
  return '';
}

function previewApi() {
  return window.DesktopRemotionPreviewPersonalities || null;
}

async function readMediaDurationMs(fileUrl, tagName = 'video', fallbackMs = 0) {
  if (!fileUrl) return fallbackMs;
  return new Promise((resolve) => {
    const media = document.createElement(tagName);
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      media.remove();
      resolve(value);
    };
    const timeoutId = window.setTimeout(() => finish(fallbackMs), 6000);
    media.preload = 'metadata';
    media.src = fileUrl;
    media.onloadedmetadata = () => {
      window.clearTimeout(timeoutId);
      if (Number.isFinite(media.duration) && media.duration > 0) {
        finish(Math.round(media.duration * 1000));
      } else {
        finish(fallbackMs);
      }
    };
    media.onerror = () => {
      window.clearTimeout(timeoutId);
      finish(fallbackMs);
    };
  });
}

async function ensureEndPageDuration() {
  const asset = findAssetByPath(state.assets.endpage, state.endPage);
  if (!asset) {
    state.endPageDurationFrames = 0;
    state.endPageDurationSource = '';
    elements.endPageDurationHint.textContent = '';
    return;
  }
  if (state.endPageDurationSource === asset.path && state.endPageDurationFrames > 0) {
    elements.endPageDurationHint.textContent = `مدة شاشة النهاية: ${(state.endPageDurationFrames / FPS).toFixed(1)} ثانية`;
    return;
  }
  const durationMs = isVideoPath(asset.path)
    ? await readMediaDurationMs(asset.url, 'video', 5000)
    : 5000;
  state.endPageDurationFrames = Math.max(1, Math.round((durationMs / 1000) * FPS));
  state.endPageDurationSource = asset.path;
  elements.endPageDurationHint.textContent = `مدة شاشة النهاية: ${(state.endPageDurationFrames / FPS).toFixed(1)} ثانية`;
}

function getSceneTrimmedDurationMs(scene) {
  if (scene.mediaType !== 'video') {
    return Math.max(1000, Number(scene.voiceoverDurationMs || 0) || (Number(state.generation.sceneDurationSeconds || DEFAULT_SCENE_DURATION_SECONDS) * 1000));
  }

  const mediaDurationMs = Math.max(0, Number(scene.mediaDurationMs || 0));
  const trimStartMs = Math.max(0, Number(scene.trimStartMs || 0));
  const trimEndMs = scene.trimEndMs == null ? null : Math.max(trimStartMs, Number(scene.trimEndMs || 0));

  if (trimEndMs != null && trimEndMs > trimStartMs) {
    return Math.max(1000, trimEndMs - trimStartMs);
  }
  if (mediaDurationMs > trimStartMs) {
    return Math.max(1000, mediaDurationMs - trimStartMs);
  }
  return Math.max(1000, Number(state.generation.sceneDurationSeconds || DEFAULT_SCENE_DURATION_SECONDS) * 1000);
}

function getSceneDurationMs(scene) {
  const targetMs = Math.max(1000, Number(state.generation.sceneDurationSeconds || DEFAULT_SCENE_DURATION_SECONDS) * 1000);
  const voiceoverDurationMs = Math.max(0, Number(scene.voiceoverDurationMs || 0));
  const trimmedDurationMs = getSceneTrimmedDurationMs(scene);

  if (scene.mediaType === 'video') {
    if (voiceoverDurationMs > 0) {
      return Math.max(1000, Math.min(trimmedDurationMs, voiceoverDurationMs));
    }
    return trimmedDurationMs;
  }

  return Math.max(1000, voiceoverDurationMs || targetMs);
}

function getPreviewDurationFrames() {
  if (!state.scenes.length) {
    return 25;
  }

  let currentStart = 0;
  let maxFrame = 0;
  state.scenes.forEach((scene) => {
    const durationFrames = Math.max(1, Math.round((getSceneDurationMs(scene) / 1000) * FPS));
    maxFrame = Math.max(maxFrame, currentStart + durationFrames);
    currentStart += Math.max(1, durationFrames - TRANSITION_FRAMES);
  });

  if (state.endPage && state.endPageDurationFrames > 0) {
    maxFrame += Math.max(0, state.endPageDurationFrames - Math.min(Math.round(FPS * 1.5), state.endPageDurationFrames));
  }

  return Math.max(25, maxFrame);
}

function buildPreviewInputProps() {
  const musicAsset = findAssetByPath(state.assets.music, state.music);
  const endPageAsset = findAssetByPath(state.assets.endpage, state.endPage);

  return {
    scenes: state.scenes.map((scene) => ({
      id: scene.id,
      sceneNumber: scene.sceneNumber,
      title: scene.title,
      sourceExcerpt: scene.sourceExcerpt,
      ageStage: scene.ageStage,
      timePeriod: scene.timePeriod,
      location: scene.location,
      voiceoverText: scene.voiceoverText,
      imagePrompt: scene.imagePrompt,
      motionPrompt: scene.motionPrompt,
      visualContinuityNotes: scene.visualContinuityNotes,
      fileUrl: mediaFileUrlForScene(scene),
      mediaType: scene.mediaType,
      mediaDurationMs: scene.mediaDurationMs,
      trimStartMs: scene.trimStartMs,
      trimEndMs: scene.trimEndMs,
      voiceoverUrl: scene.voiceoverUrl || null,
      voiceoverDurationMs: scene.voiceoverDurationMs,
    })),
    placeholderUrl: state.placeholderPath ? window.desktopApi.toFileUrl(state.placeholderPath) : null,
    musicUrl: musicAsset ? musicAsset.url : null,
    musicVolume: Number(state.musicVolume || 0) / 100,
    voiceoverVolume: Number(state.voiceoverVolume || 0) / 100,
    effects: state.effects,
    endPageUrl: endPageAsset ? endPageAsset.url : null,
    endPageDurationFrames: Number(state.endPageDurationFrames || 0),
    targetSceneDurationMs: Number(state.generation.sceneDurationSeconds || DEFAULT_SCENE_DURATION_SECONDS) * 1000,
    transitionFrames: TRANSITION_FRAMES,
    cinematicBarSize: Number(state.cinematicBarSize || 6),
  };
}

async function renderPreview() {
  const api = previewApi();
  if (!api || !elements.previewStage) return;
  api.update({
    inputProps: buildPreviewInputProps(),
    durationInFrames: getPreviewDurationFrames(),
  });
}

function schedulePreviewRender(delayMs = 60) {
  window.clearTimeout(previewRenderTimerId);
  previewRenderTimerId = window.setTimeout(() => {
    renderPreview().catch((error) => console.error(error));
  }, delayMs);
}

function updateRuntimeSummary() {
  const totalSeconds = (getPreviewDurationFrames() / FPS).toFixed(1);
  elements.runtimeSummary.textContent = state.scenes.length ? `${state.scenes.length} مشهد | ${totalSeconds}ث` : '';
  elements.previewSummary.textContent = state.scenes.length
    ? `المعاينة التقريبية: ${totalSeconds} ثانية | ${state.scenes.filter((scene) => scene.mediaPath).length} وسيط مرتبط`
    : 'ألصق السيرة ثم ولّد المشاهد أو اربط الوسائط يدويًا.';
  elements.slidesSummary.textContent = state.scenes.length
    ? `${state.scenes.filter((scene) => scene.mediaPath).length}/${state.scenes.length} بها وسائط`
    : '';
  elements.contentStatus.textContent = state.scenes.length
    ? `تم تجهيز ${state.scenes.length} مشهد`
    : 'لا توجد مشاهد بعد';
}

function buildProjectData() {
  return {
    scenes: state.scenes.map((scene) => ({ ...scene })),
    generation: { ...state.generation },
    audio: {
      music: state.music,
      musicVolume: state.musicVolume,
      voiceoverVolume: state.voiceoverVolume,
      endPage: state.endPage,
      endPageDurationFrames: state.endPageDurationFrames,
      endPageDurationSource: state.endPageDurationSource,
    },
    appearance: {
      effects: [...state.effects],
      cinematicBarSize: state.cinematicBarSize,
    },
    ui: {
      activeTab: state.ui.activeTab,
      openContentSceneId: state.ui.openContentSceneId,
    },
    settings: {
      ttsModel: state.settings.ttsModel,
      ttsVoice: state.settings.ttsVoice,
      ttsStylePrompt: state.settings.ttsStylePrompt,
      contentModel: state.settings.contentModel,
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
    data: buildProjectData(),
  };
}

function applyProjectMeta(project, filePath) {
  state.project.currentProjectPath = filePath || '';
  state.project.projectName = project?.projectName || (filePath ? prettifyPath(filePath).replace(/\.chp$/i, '') : 'Personalities Project');
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
    if (!result?.success) throw new Error(result?.error || 'فشل الحفظ');
    if (result.canceled) return;
    applyProjectMeta(result.project, result.filePath);
    if (projectChangeRevision !== savingRevision) {
      state.project.isDirty = true;
      scheduleAutosave();
    }
    updateProjectStatusUi('تم الحفظ');
  } catch (error) {
    failed = true;
    if (!autosave) {
      setStatus('خطأ', error?.message || 'تعذر حفظ المشروع');
    }
    updateProjectStatusUi('فشل الحفظ');
  } finally {
    state.project.isSaving = false;
    updateProjectStatusUi(failed ? 'فشل الحفظ' : undefined);
  }
}

function activateTab(tabId) {
  state.ui.activeTab = tabId;
  elements.tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.target === tabId);
  });
  Array.from(document.querySelectorAll('.tab-panel')).forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabId);
  });
}

async function applyOpenedProject(project, filePath) {
  const data = project.data || {};
  const audio = data.audio || {};
  const appearance = data.appearance || {};
  const ui = data.ui || {};
  const settings = data.settings || {};

  isApplyingProjectData = true;
  try {
    state.scenes = (Array.isArray(data.scenes) ? data.scenes : []).map(normalizeScene);
    renumberScenes();
    state.generation = {
      ...state.generation,
      ...(data.generation && typeof data.generation === 'object' ? data.generation : {}),
    };
    state.music = audio.music || '';
    state.musicVolume = Number(audio.musicVolume || 30);
    state.voiceoverVolume = Number(audio.voiceoverVolume || 100);
    state.endPage = audio.endPage || '';
    state.endPageDurationFrames = Number(audio.endPageDurationFrames || 0);
    state.endPageDurationSource = audio.endPageDurationSource || '';
    state.effects = Array.isArray(appearance.effects) ? appearance.effects : state.effects;
    state.cinematicBarSize = Number(appearance.cinematicBarSize || state.cinematicBarSize);
    state.ui.openContentSceneId = ui.openContentSceneId || null;
    state.settings = { ...state.settings, ...(settings && typeof settings === 'object' ? settings : {}) };
    syncGenerationInputs();
    syncAssetInputs();
    activateTab(ui.activeTab || 'tab-content');
    applyProjectMeta(project, filePath);
    await ensureEndPageDuration();
    renderAll();
    await renderPreview();
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
    setStatus('خطأ', result?.error || 'تعذر فتح المشروع');
    return;
  }
  if (result.canceled) return;
  await applyOpenedProject(result.project, result.filePath);
  setStatus('المشروع', 'تم فتح المشروع بنجاح');
}

function sceneBadgesMarkup(scene) {
  const badges = [];
  badges.push(`<span class="badge">${scene.mediaType === 'video' ? 'فيديو' : 'صورة'}</span>`);
  if (scene.voiceoverUrl) {
    badges.push('<span class="badge success">صوت جاهز</span>');
  } else if (scene.voiceoverText) {
    badges.push('<span class="badge warn">نص صوتي فقط</span>');
  }
  if (!scene.mediaPath) {
    badges.push('<span class="badge warn">بدون وسيط</span>');
  }
  return badges.join('');
}

function renderContentScenesList() {
  if (!state.scenes.length) {
    elements.contentScenesList.innerHTML = '<div class="empty-state">لم يتم توليد أي مشاهد بعد.</div>';
    return;
  }

  elements.contentScenesList.innerHTML = state.scenes.map((scene) => {
    const isOpen = state.ui.openContentSceneId === scene.id;
    return `
      <div class="scene-card ${isOpen ? 'is-open' : ''}" data-scene-id="${scene.id}">
        <div class="scene-row">
          <div>
            <div class="scene-title">المشهد ${String(scene.sceneNumber).padStart(2, '0')} - ${escapeAttr(scene.title || 'بدون عنوان')}</div>
            <div class="scene-subtitle">${escapeAttr(scene.ageStage || '')}${scene.timePeriod ? ' | ' + escapeAttr(scene.timePeriod) : ''}${scene.location ? ' | ' + escapeAttr(scene.location) : ''}</div>
          </div>
          <div class="scene-actions">
            <button class="btn-secondary ${scene.copiedImagePrompt ? 'is-success' : ''}" type="button" data-action="copy-image" data-id="${scene.id}">${scene.copiedImagePrompt ? '✓ برومبت الصورة' : 'برومبت الصورة'}</button>
            <button class="btn-secondary ${scene.copiedMotionPrompt ? 'is-success' : ''}" type="button" data-action="copy-motion" data-id="${scene.id}">${scene.copiedMotionPrompt ? '✓ برومبت الحركة' : 'برومبت الحركة'}</button>
            <button class="btn-secondary" type="button" data-action="regenerate-scene" data-id="${scene.id}">↻</button>
            <button class="btn-secondary" type="button" data-action="toggle-details" data-id="${scene.id}">${isOpen ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}</button>
          </div>
        </div>
        <div class="scene-details">
          <label>
            <span class="setting-label">عنوان المشهد</span>
            <input class="input-v2" type="text" data-action="edit-title" data-id="${scene.id}" value="${escapeAttr(scene.title)}" />
          </label>
          <label>
            <span class="setting-label">النص الصوتي</span>
            <textarea class="textarea-v2" data-action="edit-voiceover" data-id="${scene.id}">${escapeAttr(scene.voiceoverText)}</textarea>
          </label>
          <div class="grid-2">
            <label>
              <span class="setting-label">المقتطف المصدر</span>
              <textarea class="textarea-v2" readonly>${escapeAttr(scene.sourceExcerpt)}</textarea>
            </label>
            <label>
              <span class="setting-label">ملاحظات الاستمرارية</span>
              <textarea class="textarea-v2" readonly>${escapeAttr(scene.visualContinuityNotes)}</textarea>
            </label>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderSlidesList() {
  if (!state.scenes.length) {
    elements.slidesList.innerHTML = '<div class="empty-state">ولّد المشاهد أولاً ليظهر ربط الوسائط هنا.</div>';
    return;
  }

  elements.slidesList.innerHTML = state.scenes.map((scene, index) => {
    const thumbUrl = mediaFileUrlForScene(scene);
    const hasMedia = Boolean(scene.mediaPath);
    const trimStartSeconds = (Number(scene.trimStartMs || 0) / 1000).toFixed(1);
    const trimEndSeconds = scene.trimEndMs == null ? '' : (Number(scene.trimEndMs || 0) / 1000).toFixed(1);
    return `
      <div class="scene-card" data-scene-id="${scene.id}">
        <div class="media-row">
          <div class="media-thumb">
            ${hasMedia
              ? (scene.mediaType === 'video'
                ? `<video src="${thumbUrl}" muted preload="metadata"></video>`
                : `<img src="${thumbUrl}" alt="${escapeAttr(scene.title)}" />`)
              : 'بدون وسيط'}
          </div>
          <div style="display:flex; flex-direction:column; gap:0.65rem;">
            <div class="scene-row">
              <div>
                <div class="scene-title">المشهد ${String(scene.sceneNumber).padStart(2, '0')} - ${escapeAttr(scene.title || 'بدون عنوان')}</div>
                <div class="muted-text">${escapeAttr(prettifyPath(scene.mediaPath || ''))}</div>
              </div>
              <div class="scene-actions">
                <button class="btn-secondary" type="button" data-action="move-up" data-id="${scene.id}" ${index === 0 ? 'disabled' : ''}>أعلى</button>
                <button class="btn-secondary" type="button" data-action="move-down" data-id="${scene.id}" ${index === state.scenes.length - 1 ? 'disabled' : ''}>أسفل</button>
                <button class="btn-secondary" type="button" data-action="pick-media" data-id="${scene.id}">${hasMedia ? 'استبدال الوسيط' : 'إضافة وسيط'}</button>
                <button class="btn-secondary btn-danger" type="button" data-action="clear-media" data-id="${scene.id}" ${hasMedia ? '' : 'disabled'}>حذف الوسيط</button>
              </div>
            </div>
            <div class="meta-row">${sceneBadgesMarkup(scene)}</div>
            <div class="grid-2">
              <label>
                <span class="setting-label">بداية</span>
                <input class="number-input" type="number" min="0" step="0.1" data-action="trim-start" data-id="${scene.id}" value="${trimStartSeconds}" ${scene.mediaType === 'video' ? '' : 'disabled'} />
              </label>
              <label>
                <span class="setting-label">نهاية</span>
                <input class="number-input" type="number" min="0" step="0.1" data-action="trim-end" data-id="${scene.id}" value="${trimEndSeconds}" placeholder="كامل المدة" ${scene.mediaType === 'video' ? '' : 'disabled'} />
              </label>
            </div>
            <div class="muted-text">${scene.mediaType === 'video'
              ? `مدة المستخدم: ${(getSceneTrimmedDurationMs(scene) / 1000).toFixed(1)}ث`
              : 'الصور تستخدم مدة المشهد أو مدة التعليق الصوتي.'}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderAudioList() {
  if (!state.scenes.length) {
    elements.audioList.innerHTML = '<div class="empty-state">ولّد المشاهد أولاً ليظهر جدول الصوتيات هنا.</div>';
    return;
  }

  elements.audioList.innerHTML = state.scenes.map((scene) => `
    <div class="scene-card" data-scene-id="${scene.id}">
      <div class="scene-row">
        <div>
          <div class="scene-title">المشهد ${String(scene.sceneNumber).padStart(2, '0')} - ${escapeAttr(scene.title || 'بدون عنوان')}</div>
          <div class="muted-text">${scene.voiceoverDurationMs ? `${(scene.voiceoverDurationMs / 1000).toFixed(1)}ث` : 'بدون ملف صوتي'}</div>
        </div>
        <div class="scene-actions">
          <button class="btn-secondary" type="button" data-action="generate-scene-voiceover" data-id="${scene.id}">توليد الصوت</button>
          <button class="btn-secondary" type="button" data-action="pick-scene-voiceover" data-id="${scene.id}">إرفاق ملف</button>
          <button class="btn-secondary btn-danger" type="button" data-action="clear-scene-voiceover" data-id="${scene.id}" ${scene.voiceoverUrl ? '' : 'disabled'}>حذف</button>
        </div>
      </div>
      <label>
        <span class="setting-label">النص الصوتي</span>
        <textarea class="textarea-v2" data-action="edit-audio-voiceover" data-id="${scene.id}">${escapeAttr(scene.voiceoverText)}</textarea>
      </label>
    </div>
  `).join('');
}

function syncGenerationInputs() {
  elements.sourceScriptInput.value = state.generation.sourceScript;
  elements.sceneCountInput.value = String(state.generation.sceneCount);
  elements.sceneDurationSelect.value = String(state.generation.sceneDurationSeconds);
  elements.aspectRatioSelect.value = state.generation.aspectRatio;
  elements.documentaryStyleInput.value = state.generation.documentaryStylePreset;
  elements.languageDialectInput.value = state.generation.languageOrDialect;
  elements.characterNotesInput.value = state.generation.mainCharacterNotes;
  elements.visualRulesInput.value = state.generation.globalVisualRules;
  elements.prisonRulesInput.value = state.generation.prisonSceneRules;
  elements.negativePromptInput.value = state.generation.negativePrompt;
}

function syncAssetInputs() {
  formatAssetOptions(elements.musicSelect, state.assets.music || [], 'بدون موسيقى');
  formatAssetOptions(elements.endPageSelect, state.assets.endpage || [], 'بدون نهاية');
  elements.musicSelect.value = state.music || '';
  elements.endPageSelect.value = state.endPage || '';
  elements.musicVolumeInput.value = String(state.musicVolume);
  elements.voiceoverVolumeInput.value = String(state.voiceoverVolume);
  elements.musicVolumeValue.textContent = `${state.musicVolume}%`;
  elements.voiceoverVolumeValue.textContent = `${state.voiceoverVolume}%`;
}

function renderAll() {
  renderContentScenesList();
  renderSlidesList();
  renderAudioList();
  updateRuntimeSummary();
  updateProjectStatusUi();
  lucide.createIcons();
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

async function regenerateSingleScene(sceneId) {
  const scene = state.scenes.find((item) => item.id === sceneId);
  if (!scene) return;

  setStatus('إعادة التوليد', `جاري تحديث المشهد ${scene.sceneNumber}...`);
  const result = await window.desktopApi.generatePersonalityScenes({
    ...state.generation,
    regenerateScene: true,
    sceneNumber: scene.sceneNumber,
    existingScene: {
      title: scene.title,
      sourceExcerpt: scene.sourceExcerpt,
      voiceoverText: scene.voiceoverText,
    },
    totalScenes: state.scenes.length,
    model: state.settings.contentModel,
  });

  if (!result?.success || !Array.isArray(result.scenes) || !result.scenes[0]) {
    throw new Error(result?.error || 'تعذر إعادة توليد المشهد');
  }

  const regenerated = normalizeScene({
    ...scene,
    ...result.scenes[0],
    id: sceneId,
    mediaPath: scene.mediaPath,
    fileUrl: scene.fileUrl,
    mediaType: scene.mediaType,
    mediaDurationMs: scene.mediaDurationMs,
    trimStartMs: scene.trimStartMs,
    trimEndMs: scene.trimEndMs,
    voiceoverPath: null,
    voiceoverUrl: null,
    voiceoverDurationMs: 0,
    copiedImagePrompt: false,
    copiedMotionPrompt: false,
  }, scene.sceneNumber - 1);

  state.scenes = state.scenes.map((item) => item.id === sceneId ? regenerated : item);
  renderAll();
  markProjectDirty();
  schedulePreviewRender();
}

async function generateScenesFromContent() {
  setStatus('تقسيم المشاهد', 'جاري الاتصال بـ Gemini...');
  elements.generateScenesBtn.disabled = true;
  try {
    const result = await window.desktopApi.generatePersonalityScenes({
      ...state.generation,
      model: state.settings.contentModel,
    });
    if (!result?.success || !Array.isArray(result.scenes)) {
      throw new Error(result?.error || 'فشل توليد المشاهد');
    }

    const previousByNumber = new Map(state.scenes.map((scene) => [scene.sceneNumber, scene]));
    state.scenes = result.scenes.map((scene, index) => {
      const previous = previousByNumber.get(scene.sceneNumber);
      return normalizeScene({
        ...previous,
        ...scene,
        mediaPath: previous?.mediaPath || '',
        fileUrl: previous?.fileUrl || '',
        mediaType: previous?.mediaType || 'image',
        mediaDurationMs: previous?.mediaDurationMs || 0,
        trimStartMs: previous?.trimStartMs || 0,
        trimEndMs: previous?.trimEndMs ?? null,
        voiceoverPath: previous?.voiceoverPath || null,
        voiceoverUrl: previous?.voiceoverUrl || null,
        voiceoverDurationMs: previous?.voiceoverDurationMs || 0,
      }, index);
    });
    renumberScenes();
    renderAll();
    markProjectDirty();
    await renderPreview();
    setStatus('المحتوى', `تم توليد ${state.scenes.length} مشهد`);
  } finally {
    elements.generateScenesBtn.disabled = false;
  }
}

async function attachMediaToScene(sceneId) {
  const sceneIndex = state.scenes.findIndex((scene) => scene.id === sceneId);
  if (sceneIndex < 0) return;

  const picked = await window.desktopApi.pickPersonalityMedia();
  if (!picked?.path || !picked?.url) return;

  const mediaType = isVideoPath(picked.path) ? 'video' : 'image';
  const mediaDurationMs = mediaType === 'video'
    ? await readMediaDurationMs(picked.url, 'video', 0)
    : 0;

  state.scenes[sceneIndex] = normalizeScene({
    ...state.scenes[sceneIndex],
    mediaPath: picked.path,
    fileUrl: picked.url,
    mediaType,
    mediaDurationMs,
    trimStartMs: 0,
    trimEndMs: null,
  }, sceneIndex);

  renderAll();
  markProjectDirty();
  await renderPreview();
}

async function attachVoiceoverToScene(sceneId) {
  const sceneIndex = state.scenes.findIndex((scene) => scene.id === sceneId);
  if (sceneIndex < 0) return;
  const picked = await window.desktopApi.pickVoiceover();
  if (!picked?.path || !picked?.url) return;
  const durationMs = await readMediaDurationMs(picked.url, 'audio', 0);
  state.scenes[sceneIndex] = normalizeScene({
    ...state.scenes[sceneIndex],
    voiceoverPath: picked.path,
    voiceoverUrl: picked.url,
    voiceoverDurationMs: durationMs,
  }, sceneIndex);
  renderAll();
  markProjectDirty();
  await renderPreview();
}

async function generateVoiceoverForScene(sceneId) {
  const sceneIndex = state.scenes.findIndex((scene) => scene.id === sceneId);
  if (sceneIndex < 0) return;
  const scene = state.scenes[sceneIndex];
  if (!scene.voiceoverText.trim()) {
    throw new Error('النص الصوتي لهذا المشهد فارغ.');
  }
  setStatus('توليد الصوت', `جاري توليد صوت المشهد ${scene.sceneNumber}...`);
  const result = await window.desktopApi.generateSingleVoiceover({
    text: scene.voiceoverText.trim(),
    ttsModel: state.settings.ttsModel,
    voiceName: state.settings.ttsVoice,
    stylePrompt: state.settings.ttsStylePrompt,
  });
  if (!result?.success) {
    throw new Error(result?.error || 'تعذر توليد الصوت');
  }
  state.scenes[sceneIndex] = normalizeScene({
    ...scene,
    voiceoverPath: result.voiceoverPath,
    voiceoverUrl: result.voiceoverUrl,
    voiceoverDurationMs: result.durationMs || 0,
  }, sceneIndex);
  renderAll();
  markProjectDirty();
  await renderPreview();
}

async function generateAllVoiceovers() {
  if (!state.scenes.length) {
    throw new Error('لا توجد مشاهد لتوليد الصوت.');
  }
  const payload = {
    slides: state.scenes.map((scene) => ({
      id: scene.id,
      text: scene.voiceoverText || scene.title || 'Scene voiceover',
      voiceoverText: scene.voiceoverText || scene.title || '',
    })),
    ttsModel: state.settings.ttsModel,
    voiceName: state.settings.ttsVoice,
    stylePrompt: state.settings.ttsStylePrompt,
  };
  setStatus('توليد الصوت', 'جاري توليد جميع الصوتيات...');
  const result = await window.desktopApi.generateVoiceovers(payload);
  if (!result?.slides) {
    throw new Error(result?.error || 'تعذر توليد الصوتيات');
  }
  const updatedById = new Map(result.slides.map((slide) => [slide.id, slide]));
  state.scenes = state.scenes.map((scene, index) => {
    const updated = updatedById.get(scene.id);
    if (!updated) return scene;
    return normalizeScene({
      ...scene,
      voiceoverText: updated.voiceoverText || scene.voiceoverText,
      voiceoverPath: updated.voiceoverPath || null,
      voiceoverUrl: updated.voiceoverUrl || null,
      voiceoverDurationMs: updated.voiceoverDurationMs || 0,
    }, index);
  });
  renderAll();
  markProjectDirty();
  await renderPreview();
}

function moveScene(sceneId, direction) {
  const index = state.scenes.findIndex((scene) => scene.id === sceneId);
  const nextIndex = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || nextIndex < 0 || nextIndex >= state.scenes.length) return;
  const nextScenes = [...state.scenes];
  const [moved] = nextScenes.splice(index, 1);
  nextScenes.splice(nextIndex, 0, moved);
  state.scenes = nextScenes;
  renumberScenes();
  renderAll();
  markProjectDirty();
  schedulePreviewRender();
}

function updateSceneTrim(sceneId, field, value) {
  const scene = state.scenes.find((item) => item.id === sceneId);
  if (!scene) return;
  if (scene.mediaType !== 'video') return;
  if (field === 'trimStartMs') {
    scene.trimStartMs = Math.max(0, Math.round(Number(value || 0) * 1000));
    if (scene.trimEndMs != null && scene.trimEndMs <= scene.trimStartMs) {
      scene.trimEndMs = scene.trimStartMs + 100;
    }
  } else {
    const numericValue = String(value || '').trim() === '' ? null : Math.round(Number(value || 0) * 1000);
    if (numericValue == null) {
      scene.trimEndMs = null;
    } else {
      scene.trimEndMs = Math.max(scene.trimStartMs + 100, numericValue);
    }
  }
  renderAll();
  markProjectDirty();
  schedulePreviewRender();
}

async function handleRender() {
  if (!state.scenes.length) {
    throw new Error('لا توجد مشاهد للرندر.');
  }
  if (!state.scenes.some((scene) => scene.mediaPath || state.placeholderPath)) {
    throw new Error('أضف وسائط للمشاهد قبل الرندر.');
  }
  state.isRendering = true;
  elements.renderBtn.disabled = true;
  elements.cancelRenderBtn.style.display = 'inline-flex';
  elements.renderResult.textContent = '';
  setStatus('جاري الرندر', 'يتم الآن تجهيز فيديو شخصيات.');
  setProgress(0.02, 'بدء مهمة الرندر...');

  const result = await window.desktopApi.render({
    model: 'personalities',
    compositionId: 'PersonalitiesVideo',
    scenes: state.scenes.map((scene) => ({
      id: scene.id,
      sceneNumber: scene.sceneNumber,
      title: scene.title,
      sourceExcerpt: scene.sourceExcerpt,
      ageStage: scene.ageStage,
      timePeriod: scene.timePeriod,
      location: scene.location,
      voiceoverText: scene.voiceoverText,
      imagePrompt: scene.imagePrompt,
      motionPrompt: scene.motionPrompt,
      visualContinuityNotes: scene.visualContinuityNotes,
      mediaPath: scene.mediaPath || '',
      mediaType: scene.mediaType,
      mediaDurationMs: scene.mediaDurationMs || 0,
      trimStartMs: scene.trimStartMs || 0,
      trimEndMs: scene.trimEndMs,
      voiceoverPath: scene.voiceoverPath || null,
      voiceoverDurationMs: scene.voiceoverDurationMs || 0,
    })),
    placeholderPath: state.placeholderPath || null,
    musicPath: state.music || null,
    musicVolume: Number(state.musicVolume || 0) / 100,
    voiceoverVolume: Number(state.voiceoverVolume || 0) / 100,
    effects: state.effects,
    endPagePath: state.endPage || null,
    endPageDurationFrames: Number(state.endPageDurationFrames || 0),
    targetSceneDurationMs: Number(state.generation.sceneDurationSeconds || DEFAULT_SCENE_DURATION_SECONDS) * 1000,
    transitionFrames: TRANSITION_FRAMES,
    cinematicBarSize: Number(state.cinematicBarSize || 6),
  });

  setStatus('اكتمل الرندر', 'تم حفظ فيديو شخصيات بنجاح');
  setProgress(1, 'اكتمل الرندر');
  elements.renderResult.innerHTML = result?.outputPath
    ? `تم حفظ الفيديو: <span class="muted-text">${escapeAttr(result.outputPath)}</span> <button id="personalities-reveal-file-btn" class="btn-secondary" type="button">إظهار الملف</button>`
    : 'اكتمل الرندر.';
  document.getElementById('personalities-reveal-file-btn')?.addEventListener('click', () => {
    window.desktopApi.revealInFolder(result.outputPath);
  });
}

function handleRenderCleanup() {
  state.isRendering = false;
  elements.renderBtn.disabled = false;
  elements.cancelRenderBtn.style.display = 'none';
}

function bindTabEvents() {
  elements.tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activateTab(button.dataset.target);
      markProjectDirty();
    });
  });
}

function bindProjectEvents() {
  elements.projectSaveBtn.addEventListener('click', () => saveCurrentProject());
  elements.projectOpenBtn.addEventListener('click', openProjectFromDisk);
}

function bindGenerationInputs() {
  const bindings = [
    [elements.sourceScriptInput, 'sourceScript'],
    [elements.documentaryStyleInput, 'documentaryStylePreset'],
    [elements.languageDialectInput, 'languageOrDialect'],
    [elements.characterNotesInput, 'mainCharacterNotes'],
    [elements.visualRulesInput, 'globalVisualRules'],
    [elements.prisonRulesInput, 'prisonSceneRules'],
    [elements.negativePromptInput, 'negativePrompt'],
  ];

  bindings.forEach(([element, key]) => {
    element.addEventListener('input', () => {
      state.generation[key] = element.value;
      markProjectDirty();
    });
  });

  elements.sceneCountInput.addEventListener('input', () => {
    state.generation.sceneCount = clamp(Number(elements.sceneCountInput.value || 8), 1, 20);
    markProjectDirty();
  });
  elements.sceneDurationSelect.addEventListener('change', () => {
    state.generation.sceneDurationSeconds = Number(elements.sceneDurationSelect.value || DEFAULT_SCENE_DURATION_SECONDS);
    markProjectDirty();
    schedulePreviewRender();
  });
  elements.aspectRatioSelect.addEventListener('change', () => {
    state.generation.aspectRatio = elements.aspectRatioSelect.value;
    markProjectDirty();
  });

  elements.generateScenesBtn.addEventListener('click', async () => {
    try {
      await generateScenesFromContent();
    } catch (error) {
      console.error(error);
      setStatus('خطأ', error?.message || 'تعذر تقسيم المشاهد');
    }
  });
}

function bindAssetEvents() {
  elements.musicSelect.addEventListener('change', () => {
    state.music = elements.musicSelect.value;
    markProjectDirty();
    schedulePreviewRender();
  });
  elements.endPageSelect.addEventListener('change', async () => {
    state.endPage = elements.endPageSelect.value;
    await ensureEndPageDuration();
    markProjectDirty();
    schedulePreviewRender();
  });
  elements.musicVolumeInput.addEventListener('input', () => {
    state.musicVolume = Number(elements.musicVolumeInput.value || 30);
    elements.musicVolumeValue.textContent = `${state.musicVolume}%`;
    markProjectDirty();
    schedulePreviewRender();
  });
  elements.voiceoverVolumeInput.addEventListener('input', () => {
    state.voiceoverVolume = Number(elements.voiceoverVolumeInput.value || 100);
    elements.voiceoverVolumeValue.textContent = `${state.voiceoverVolume}%`;
    markProjectDirty();
    schedulePreviewRender();
  });
}

function bindContentListEvents() {
  elements.contentScenesList.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const sceneId = button.dataset.id;
    if (!sceneId) return;
    try {
      if (button.dataset.action === 'copy-image') {
        const scene = state.scenes.find((item) => item.id === sceneId);
        if (!scene) return;
        await copyText(scene.imagePrompt);
        scene.copiedImagePrompt = true;
        renderContentScenesList();
        markProjectDirty();
        return;
      }
      if (button.dataset.action === 'copy-motion') {
        const scene = state.scenes.find((item) => item.id === sceneId);
        if (!scene) return;
        await copyText(scene.motionPrompt);
        scene.copiedMotionPrompt = true;
        renderContentScenesList();
        markProjectDirty();
        return;
      }
      if (button.dataset.action === 'toggle-details') {
        state.ui.openContentSceneId = state.ui.openContentSceneId === sceneId ? null : sceneId;
        renderContentScenesList();
        markProjectDirty();
        return;
      }
      if (button.dataset.action === 'regenerate-scene') {
        await regenerateSingleScene(sceneId);
      }
    } catch (error) {
      console.error(error);
      setStatus('خطأ', error?.message || 'تعذر تنفيذ الإجراء');
    }
  });

  elements.contentScenesList.addEventListener('input', (event) => {
    const target = event.target;
    const sceneId = target.dataset.id;
    if (!sceneId) return;
    const scene = state.scenes.find((item) => item.id === sceneId);
    if (!scene) return;
    if (target.dataset.action === 'edit-title') {
      scene.title = target.value;
    }
    if (target.dataset.action === 'edit-voiceover') {
      scene.voiceoverText = target.value;
    }
    markProjectDirty();
  });
}

function bindSlidesListEvents() {
  elements.slidesList.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const sceneId = button.dataset.id;
    if (!sceneId) return;
    try {
      if (button.dataset.action === 'pick-media') {
        await attachMediaToScene(sceneId);
        return;
      }
      if (button.dataset.action === 'clear-media') {
        const sceneIndex = state.scenes.findIndex((scene) => scene.id === sceneId);
        if (sceneIndex < 0) return;
        state.scenes[sceneIndex] = normalizeScene({
          ...state.scenes[sceneIndex],
          mediaPath: '',
          fileUrl: '',
          mediaType: 'image',
          mediaDurationMs: 0,
          trimStartMs: 0,
          trimEndMs: null,
        }, sceneIndex);
        renderAll();
        markProjectDirty();
        await renderPreview();
        return;
      }
      if (button.dataset.action === 'move-up') {
        moveScene(sceneId, 'up');
        return;
      }
      if (button.dataset.action === 'move-down') {
        moveScene(sceneId, 'down');
      }
    } catch (error) {
      console.error(error);
      setStatus('خطأ', error?.message || 'تعذر تحديث الوسيط');
    }
  });

  elements.slidesList.addEventListener('change', (event) => {
    const target = event.target;
    const sceneId = target.dataset.id;
    if (!sceneId) return;
    if (target.dataset.action === 'trim-start') {
      updateSceneTrim(sceneId, 'trimStartMs', target.value);
    }
    if (target.dataset.action === 'trim-end') {
      updateSceneTrim(sceneId, 'trimEndMs', target.value);
    }
  });
}

function bindAudioListEvents() {
  elements.audioList.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const sceneId = button.dataset.id;
    if (!sceneId) return;
    try {
      if (button.dataset.action === 'generate-scene-voiceover') {
        await generateVoiceoverForScene(sceneId);
        return;
      }
      if (button.dataset.action === 'pick-scene-voiceover') {
        await attachVoiceoverToScene(sceneId);
        return;
      }
      if (button.dataset.action === 'clear-scene-voiceover') {
        const sceneIndex = state.scenes.findIndex((scene) => scene.id === sceneId);
        if (sceneIndex < 0) return;
        state.scenes[sceneIndex] = normalizeScene({
          ...state.scenes[sceneIndex],
          voiceoverPath: null,
          voiceoverUrl: null,
          voiceoverDurationMs: 0,
        }, sceneIndex);
        renderAll();
        markProjectDirty();
        await renderPreview();
      }
    } catch (error) {
      console.error(error);
      setStatus('خطأ', error?.message || 'تعذر تحديث الصوت');
    }
  });

  elements.audioList.addEventListener('input', (event) => {
    const target = event.target;
    const sceneId = target.dataset.id;
    if (!sceneId) return;
    const scene = state.scenes.find((item) => item.id === sceneId);
    if (!scene) return;
    if (target.dataset.action === 'edit-audio-voiceover') {
      scene.voiceoverText = target.value;
      markProjectDirty();
    }
  });

  elements.generateAllVoiceoversBtn.addEventListener('click', async () => {
    try {
      await generateAllVoiceovers();
    } catch (error) {
      console.error(error);
      setStatus('خطأ', error?.message || 'تعذر توليد جميع الصوتيات');
    }
  });
}

function bindRenderEvents() {
  elements.renderBtn.addEventListener('click', async () => {
    try {
      await handleRender();
    } catch (error) {
      console.error(error);
      setStatus('فشل الرندر', error?.message || 'تعذر إكمال الرندر');
      setProgress(0, 'فشل الرندر');
      elements.renderResult.textContent = error?.message || 'تعذر إكمال الرندر';
    } finally {
      handleRenderCleanup();
    }
  });

  elements.cancelRenderBtn.addEventListener('click', async () => {
    const canceled = await window.desktopApi.cancelRender({ model: 'personalities' });
    if (canceled) {
      setStatus('تم الإيقاف', 'تم إيقاف عملية الرندر بناءً على طلبك.');
      setProgress(0, 'تم الإيقاف');
      handleRenderCleanup();
    }
  });

  elements.openOutputBtn.addEventListener('click', () => window.desktopApi.openOutputFolder());
}

async function bootstrap() {
  const data = await window.desktopApi.bootstrap();
  state.assets = {
    music: data.assets?.music || [],
    endpage: data.assets?.endpage || [],
  };
  state.appVersion = data.appVersion || state.appVersion;
  state.placeholderPath = data.placeholderPath || '';
  state.settings = {
    ...state.settings,
    ...(await window.desktopApi.getSettings()),
  };
  if (data.logoDataUrl) {
    elements.brandLogo.src = data.logoDataUrl;
  }

  if (!state.endPage && state.assets.endpage.length > 0) {
    state.endPage = state.assets.endpage[0].path;
  }

  syncGenerationInputs();
  syncAssetInputs();
  renderAll();

  previewApi()?.mount?.(document.getElementById('preview-exact-root'));
  await ensureEndPageDuration();
  await renderPreview();

  bindTabEvents();
  bindProjectEvents();
  bindGenerationInputs();
  bindAssetEvents();
  bindContentListEvents();
  bindSlidesListEvents();
  bindAudioListEvents();
  bindRenderEvents();

  const unsubscribe = window.desktopApi.onRenderProgress((payload) => {
    if (!payload) return;
    if (payload.stage === 'queued') {
      setProgress(0.05, payload.message);
      return;
    }
    if (payload.stage === 'bundle') {
      setProgress(0.1 + ((payload.progress || 0) * 0.2), payload.message);
      return;
    }
    if (payload.stage === 'composition') {
      setProgress(0.3 + ((payload.progress || 0) * 0.15), payload.message);
      return;
    }
    if (payload.stage === 'render') {
      setProgress(0.45 + ((payload.progress || 0) * 0.55), payload.message);
    }
  });

  window.addEventListener('beforeunload', () => {
    unsubscribe?.();
    previewApi()?.destroy?.();
  });

  lucide.createIcons();
}

bootstrap().catch((error) => {
  console.error(error);
  setStatus('تعذر التشغيل', error?.message || 'فشل تهيئة واجهة شخصيات');
});
