
const TEXT_PRESET_STYLES = {
  dark: { bg: 'rgba(0, 0, 0, 0.68)', color: '#ffffff', border: 'rgba(255, 255, 255, 0.14)' },
  gold: { bg: 'rgba(160, 90, 0, 0.88)', color: '#fff8e0', border: 'rgba(255, 220, 80, 0.35)' },
  blue: { bg: 'rgba(0, 45, 130, 0.9)', color: '#e8f0ff', border: 'rgba(80, 140, 255, 0.35)' },
  red: { bg: 'rgba(160, 10, 10, 0.88)', color: '#ffe8e8', border: 'rgba(255, 80, 80, 0.35)' },
  orange: { bg: 'rgba(230, 90, 0, 0.95)', color: '#ffffff', border: 'rgba(255, 180, 60, 0.55)' },
};

const FPS = 25;
const PROJECT_TYPE = 'infograph';
const PROJECT_AUTOSAVE_DELAY_MS = 1600;
const TRANSITION_OPTIONS = ['fade', 'light-leak', 'blur-wipe'];
const TEXT_ANIMATION_OPTIONS = [
  { value: 'live-reveal-dot', label: 'كشف سينمائي حي + نقطة' },
  { value: 'broadcast-split', label: 'أسطر إخبارية متتابعة' },
  { value: 'news-ledger', label: 'تقرير بصري / News Ledger' },
  { value: 'number-hero', label: 'عداد إحصائي متحرك' },
  { value: 'layered-title', label: 'نظام عنوان طبقي' },
  { value: 'morph-compare', label: 'مقارنة متغيرة' },
  { value: 'impact-shock', label: 'صدمة خفيفة' },
  { value: 'word-by-word', label: 'كلمة كلمة' },
  { value: 'timeline-marker', label: 'مؤشر زمني' },
  { value: 'cinematic-reveal', label: 'كشف سينمائي بسيط' },
  { value: 'split-lines-stagger', label: 'أسطر متعاكسة' },
  { value: 'highlight-sweep', label: 'لمعة عابرة' },
  { value: 'kinetic-keyword', label: 'كلمة بطلة' },
  { value: 'motion-blur', label: 'حركة ضبابية قديمة' },
  { value: 'typewriter', label: 'كتابة Typewriter قديمة' },
];

const DEFAULT_SYSTEM_PROMPT = `أنت محرر إخباري متخصص في إنتاج الإنفوجراف التلفزيوني باللغة العربية.
مهمتك: تحويل أي موضوع إلى شرائح إنفوجراف احترافية جاهزة للعرض.
القواعد:
- أنتج JSON فقط بدون أي نص خارجه
- كل شريحة تحتوي حقيقة واحدة واضحة وقوية
- استخدم صيغة: كيكر ++ عنوان ++ جسم ++ خلاصة (مفصولة بـ ++)
- الكيكر: 2-3 كلمات (فئة أو موضوع)
- العنوان: 5-8 كلمات (الفكرة الرئيسية)
- الجسم: 8-15 كلمة (التفاصيل والبيانات)
- الخلاصة: 5-8 كلمات (الاستنتاج أو الدعوة للتفكير)
- تجنب التكرار بين الشرائح`;

const DEFAULT_TTS_STYLE_PROMPT = 'Premium commercial. Dynamic pacing—starts intrigued, ends punchy. Tone is polished, persuasive, and inviting.';

const DEFAULT_SETTINGS = {
  geminiApiKey: '',
  ttsModel: 'gemini-2.5-flash-preview-tts',
  ttsVoice: 'Charon',
  ttsStylePrompt: DEFAULT_TTS_STYLE_PROMPT,
  contentModel: 'gemini-2.5-flash',
  contentSystemPrompt: DEFAULT_SYSTEM_PROMPT,
};

const state = {
  assets: { overlays: [], music: [], endpage: [] },
  appVersion: '1.0.0',
  project: {
    currentProjectPath: '',
    projectName: 'Infograph Project',
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
    autosaveEnabled: true,
    createdAt: null,
  },
  placeholderPath: null,
  slides: [],
  overlay: '',
  music: '',
  voiceover: null,
  voiceoverVolume: 100,
  voiceoverDurationMs: 0,
  endPage: 'endpage.mp4',
  endPageDisabledByUser: false,
  effects: ['dust', 'light-leak', 'bokeh'],
  textPreset: 'orange',
  textAnimationType: 'live-reveal-dot',
  parallaxEnabled: true,
  cinematicBarSize: 6,
  textFontSize: 65,
  textBottomOffset: 160,
  textHorizontalOffset: 0,
  slideDurationInSeconds: 5,
  endPageDurationFrames: 0,
  endPageDurationSource: '',
  isRendering: false,
  isGeneratingVoiceovers: false,
  lastRender: null,
  selectedSlideId: null,
  draggedSlideId: null,
  dragOverSlideId: null,
  replacingSlideImageId: null,
  previewPlaying: false,
  previewMuted: false,
  previewPositionMs: 0,
  previewRafId: null,
  previewStartedAt: 0,
  settings: { ...DEFAULT_SETTINGS },
};

const elements = {
  brandLogo: document.getElementById('brand-logo'),
  projectSaveBtn: document.getElementById('project-save-btn'),
  projectOpenBtn: document.getElementById('project-open-btn'),
  projectSaveStatus: document.getElementById('project-save-status'),
  overlaySelect: document.getElementById('overlay-select'),
  musicSelect: document.getElementById('music-select'),
  musicVolumeInput: document.getElementById('music-volume-input'),
  musicVolumeValue: document.getElementById('music-volume-value'),
  pickVoiceoverBtn: document.getElementById('pick-voiceover-btn'),
  clearVoiceoverBtn: document.getElementById('clear-voiceover-btn'),
  voiceoverFilename: document.getElementById('voiceover-filename'),
  voiceoverMeta: document.getElementById('voiceover-meta'),
  voiceoverVolumeInput: document.getElementById('voiceover-volume-input'),
  voiceoverVolumeValue: document.getElementById('voiceover-volume-value'),
  endPageSelect: document.getElementById('endpage-select'),
  endPageDurationHint: document.getElementById('endpage-duration-hint'),
  textPresetSelect: document.getElementById('text-preset-select'),
  textPresetButtons: Array.from(document.querySelectorAll('[data-preset]')),
  fontSizeInput: document.getElementById('font-size-input'),
  fontSizeValue: document.getElementById('font-size-value'),
  bottomOffsetInput: document.getElementById('bottom-offset-input'),
  bottomOffsetValue: document.getElementById('bottom-offset-value'),
  horizontalOffsetInput: document.getElementById('horizontal-offset-input'),
  horizontalOffsetValue: document.getElementById('horizontal-offset-value'),
  slideDurationInput: document.getElementById('slide-duration-input'),
  pickSlidesBtn: document.getElementById('pick-slides-btn'),
  refreshAssetsBtn: document.getElementById('refresh-assets-btn'),
  renderBtn: document.getElementById('render-btn'),
  cancelRenderBtn: document.getElementById('cancel-render-btn'),
  openOutputBtn: document.getElementById('open-output-btn'),
  navBtns: document.querySelectorAll('.app-nav-pills a.nav-btn'),
  runtimeSummary: document.getElementById('runtime-summary'),
  slidesCount: document.getElementById('slides-count'),
  slidesList: document.getElementById('slides-list'),
  emptyState: document.getElementById('empty-state'),
  statusTitle: document.getElementById('status-title'),
  statusText: document.getElementById('status-text'),
  progressLabel: document.getElementById('progress-label'),
  progressPercent: document.getElementById('progress-percent'),
  progressFill: document.getElementById('progress-fill'),
  renderResult: document.getElementById('render-result'),
  barSizeInput: document.getElementById('bar-size-input'),
  barSizeValue: document.getElementById('bar-size-value'),
  textAnimationButtons: document.getElementById('text-animation-buttons'),
  parallaxCheckbox: document.getElementById('parallax-enabled-checkbox'),
  animationRadios: Array.from(document.querySelectorAll('.animation-radio')),
  effectCheckboxes: Array.from(document.querySelectorAll('.effect-checkbox')),
  previewStageShell: document.getElementById('preview-stage-shell'),
  previewStage: document.getElementById('preview-stage'),
  previewPlayBtn: document.getElementById('preview-play-btn'),
  previewMuteBtn: document.getElementById('preview-mute-btn'),
  previewRestartBtn: document.getElementById('preview-restart-btn'),
  previewFullscreenBtn: document.getElementById('preview-fullscreen-btn'),
  previewSeek: document.getElementById('preview-seek'),
  previewTimeInline: document.getElementById('preview-time-inline'),
};

const previewRefs = {
  runtime: null,
  slideLayers: [],
  overlayLayer: null,
  endPageLayer: null,
  endPageVideo: null,
  textGradient: null,
  textWrap: null,
  textBar: null,
  effectLayer: null,
  effectDust: null,
  effectLeak: null,
  effectBokeh: null,
  lightLeakFlash: null,
  musicAudio: null,
  overlayVideo: null,
  overlayImage: null,
};

let autosaveTimerId = null;
let isApplyingProjectData = false;
let projectChangeRevision = 0;

function hasExactPreviewPlayer() {
  return Boolean(
    window.DesktopRemotionPreview &&
    typeof window.DesktopRemotionPreview.mount === 'function' &&
    typeof window.DesktopRemotionPreview.update === 'function',
  );
}

function ensureDesktopFont(fontDataUrl) {
  if (!fontDataUrl || document.head.querySelector('[data-desktop-font="AvenirArabic"]')) {
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('data-desktop-font', 'AvenirArabic');
  style.textContent = `
    @font-face {
      font-family: 'AvenirArabic';
      src: url('${fontDataUrl}') format('opentype');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}

function formatAssetOptions(select, items, placeholder) {
  select.innerHTML = '';

  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = placeholder;
  select.appendChild(emptyOption);

  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.name;
    option.textContent = item.name;
    select.appendChild(option);
  });
}

function prettifyPath(filePath) {
  return filePath.split(/[/\\]/).pop() || filePath;
}

function setStatus(title, text) {
  elements.statusTitle.textContent = title;
  elements.statusText.textContent = text || '';
  elements.statusText.style.display = text ? '' : 'none';
}

function setProgress(progress, message) {
  const safeProgress = Math.max(0, Math.min(1, progress || 0));
  elements.progressFill.style.width = `${safeProgress * 100}%`;
  elements.progressPercent.textContent = `${Math.round(safeProgress * 100)}%`;
  elements.progressLabel.textContent = message || 'جاهز';
}

function getActiveTabId() {
  return document.querySelector('.tab-btn.active')?.dataset.target || 'tab-content-slides';
}

function activateTab(tabId) {
  if (!tabId) return;
  const tabs = Array.from(document.querySelectorAll('.tab-btn'));
  const targetTab = tabs.find((tab) => tab.dataset.target === tabId);
  if (!targetTab) return;

  tabs.forEach((tab) => tab.classList.toggle('active', tab === targetTab));
  const displayModes = {
    'tab-content-slides': 'flex',
    'tab-content-text': 'block',
    'tab-content-audio': 'block',
    'tab-content-generate': 'flex',
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

function buildInfographProjectData() {
  return {
    slides: state.slides.map((slide) => ({ ...slide })),
    media: {
      overlay: state.overlay,
      music: state.music,
      voiceover: state.voiceover,
      voiceoverDurationMs: state.voiceoverDurationMs,
      voiceoverVolume: state.voiceoverVolume,
      musicVolume: state.musicVolume,
      endPage: state.endPage,
      endPageDisabledByUser: state.endPageDisabledByUser,
      endPageDurationFrames: state.endPageDurationFrames,
      endPageDurationSource: state.endPageDurationSource,
    },
    appearance: {
      effects: [...state.effects],
      textPreset: state.textPreset,
      textAnimationType: state.textAnimationType,
      parallaxEnabled: state.parallaxEnabled,
      cinematicBarSize: state.cinematicBarSize,
      textFontSize: state.textFontSize,
      textBottomOffset: state.textBottomOffset,
      textHorizontalOffset: state.textHorizontalOffset,
    },
    timing: {
      slideDurationInSeconds: state.slideDurationInSeconds,
    },
    render: {
      turboMode: document.getElementById('turbo-render-checkbox')?.checked || false,
    },
    ui: {
      selectedSlideId: state.selectedSlideId,
      activeTab: getActiveTabId(),
    },
    settings: {
      ttsModel: state.settings.ttsModel,
      ttsVoice: state.settings.ttsVoice,
      ttsStylePrompt: state.settings.ttsStylePrompt,
      contentModel: state.settings.contentModel,
      contentSystemPrompt: state.settings.contentSystemPrompt,
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
    data: buildInfographProjectData(),
  };
}

function applyProjectMeta(project, filePath) {
  state.project.currentProjectPath = filePath || '';
  state.project.projectName = project?.projectName || (filePath ? prettifyPath(filePath).replace(/\.igp$/i, '') : 'Infograph Project');
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
      setStatus('خطأ', err?.message || 'فشل حفظ المشروع');
    }
    updateProjectStatusUi('فشل الحفظ');
  } finally {
    state.project.isSaving = false;
    updateProjectStatusUi(failed ? 'فشل الحفظ' : undefined);
  }
}

function normalizeProjectSlides(slides) {
  return (Array.isArray(slides) ? slides : []).map((slide, index) => {
    const imagePath = slide.imagePath || '';
    return {
      ...slide,
      id: slide.id || `slide-${Date.now()}-${index}`,
      imagePath,
      fileUrl: slide.fileUrl || (imagePath ? window.desktopApi.toFileUrl(imagePath) : ''),
      text: slide.text || '',
      isMuted: slide.isMuted !== false,
      voiceoverUrl: slide.voiceoverUrl || (slide.voiceoverPath ? window.desktopApi.toFileUrl(slide.voiceoverPath) : null),
      voiceoverDurationMs: Number(slide.voiceoverDurationMs || 0),
    };
  });
}

async function applyOpenedProject(project, filePath) {
  const data = project.data || {};
  const media = data.media || {};
  const appearance = data.appearance || {};
  const timing = data.timing || {};
  const ui = data.ui || {};

  isApplyingProjectData = true;
  try {
    state.slides = normalizeProjectSlides(data.slides);
    state.overlay = media.overlay || '';
    state.music = media.music || '';
    state.voiceover = media.voiceover || null;
    state.voiceoverDurationMs = Number(media.voiceoverDurationMs || 0);
    state.voiceoverVolume = Number(media.voiceoverVolume || 100);
    state.musicVolume = Number(media.musicVolume || 50);
    state.endPage = media.endPage || '';
    state.endPageDisabledByUser = Boolean(media.endPageDisabledByUser);
    state.endPageDurationFrames = Number(media.endPageDurationFrames || 0);
    state.endPageDurationSource = media.endPageDurationSource || '';
    state.effects = Array.isArray(appearance.effects) ? [...appearance.effects] : [];
    state.textPreset = appearance.textPreset || state.textPreset;
    state.textAnimationType = appearance.textAnimationType || state.textAnimationType;
    state.parallaxEnabled = appearance.parallaxEnabled !== false;
    state.cinematicBarSize = Number(appearance.cinematicBarSize || state.cinematicBarSize);
    state.textFontSize = Number(appearance.textFontSize || state.textFontSize);
    state.textBottomOffset = Number(appearance.textBottomOffset || state.textBottomOffset);
    state.textHorizontalOffset = Number(appearance.textHorizontalOffset || 0);
    state.slideDurationInSeconds = Number(timing.slideDurationInSeconds || state.slideDurationInSeconds);
    state.selectedSlideId = ui.selectedSlideId || null;

    if (data.settings && typeof data.settings === 'object') {
      state.settings = { ...state.settings, ...data.settings, geminiApiKey: state.settings.geminiApiKey };
      updatePromptInspector();
    }

    const turboCheckbox = document.getElementById('turbo-render-checkbox');
    if (turboCheckbox && data.render) {
      turboCheckbox.checked = Boolean(data.render.turboMode);
    }

    applyProjectMeta(project, filePath);
    syncAssetControlsV2();
    await ensureEndPageDuration();
    updateVoiceoverMeta();
    renderSlides();
    activateTab(ui.activeTab || 'tab-content-slides');
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
    setStatus('خطأ', result?.error || 'تعذر فتح المشروع');
    updateProjectStatusUi('فشل الحفظ');
    return;
  }
  if (result.canceled) {
    return;
  }

  await applyOpenedProject(result.project, result.filePath);
}

function buildBadge(label, tone = '') {
  const badge = document.createElement('span');
  badge.className = tone ? `badge subtle ${tone}` : 'badge subtle';
  badge.textContent = label;
  return badge;
}

function createButton(label, classNames, title) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = classNames;
  button.textContent = label;
  if (title) {
    button.title = title;
  }
  return button;
}

function findAsset(items, fileName) {
  return items.find((item) => item.name === fileName) || null;
}

function findOverlayAsset() {
  return findAsset(state.assets.overlays, state.overlay);
}

function findMusicAsset() {
  return findAsset(state.assets.music, state.music);
}

function findEndPageAsset() {
  return findAsset(state.assets.endpage, state.endPage);
}

function updateEndPageDurationHint() {
  if (!state.endPage) {
    elements.endPageDurationHint.textContent = '';
    return;
  }

  const seconds = state.endPageDurationFrames > 0
    ? (state.endPageDurationFrames / FPS).toFixed(1)
    : '5.0';

  elements.endPageDurationHint.textContent = `مدة شاشة الختام: ${seconds} ثانية`;
}

async function readAudioDurationMs(fileUrl) {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = fileUrl;
    audio.onloadedmetadata = () => resolve(Math.ceil(audio.duration * 1000));
    audio.onerror = () => resolve(0);
  });
}

function updateVoiceoverMeta() {
  if (!elements.voiceoverMeta) return;
  if (!state.voiceover || state.voiceoverDurationMs === 0) {
    elements.voiceoverMeta.textContent = '';
    return;
  }
  
  const durationSec = state.voiceoverDurationMs / 1000;
  const slideDur = Number(state.slideDurationInSeconds) || 5;
  const slidesNeeded = Math.ceil(durationSec / slideDur);
  
  elements.voiceoverMeta.textContent = `${durationSec.toFixed(1)}ث (~${slidesNeeded} شريحة)`;
}

function updateRangeVisual(input) {
  const min = Number(input.min || 0);
  const max = Number(input.max || 100);
  const value = Number(input.value || min);
  const ratio = max > min ? ((value - min) / (max - min)) * 100 : 0;
  input.style.setProperty('--range-fill', `${ratio}%`);
}

function renderTextAnimationButtons() {
  const container = elements.textAnimationButtons;
  if (!container || container.dataset.ready === 'true') {
    return;
  }

  container.innerHTML = '';
  TEXT_ANIMATION_OPTIONS.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'animation-preset-btn';
    button.dataset.animationPreset = option.value;
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', 'false');
    button.title = option.value;
    button.textContent = option.label;
    container.appendChild(button);
  });
  container.dataset.ready = 'true';
}

function syncTextSettingsUi() {
  renderTextAnimationButtons();

  elements.bottomOffsetValue.textContent = `${state.textBottomOffset}px`;
  elements.fontSizeValue.textContent = `${state.textFontSize}px`;
  elements.bottomOffsetInput.value = String(state.textBottomOffset);
  elements.fontSizeInput.value = String(state.textFontSize);
  elements.textPresetSelect.value = state.textPreset;

  if (elements.horizontalOffsetInput) {
    elements.horizontalOffsetInput.value = String(state.textHorizontalOffset);
    const hv = state.textHorizontalOffset;
    if (elements.horizontalOffsetValue) {
      elements.horizontalOffsetValue.textContent = hv === 0 ? '0' : (hv > 0 ? `+${hv}` : `${hv}`);
    }
    updateRangeVisual(elements.horizontalOffsetInput);
  }

  [elements.bottomOffsetInput, elements.fontSizeInput].forEach(updateRangeVisual);

  elements.textPresetButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.preset === state.textPreset);
  });

  if (elements.barSizeInput && elements.barSizeValue) {
    elements.barSizeInput.value = String(state.cinematicBarSize);
    elements.barSizeValue.textContent = `${state.cinematicBarSize}%`;
    updateRangeVisual(elements.barSizeInput);
  }
  if (elements.animationRadios) {
    elements.animationRadios.forEach(r => { r.checked = r.value === state.textAnimationType; });
  }
  if (elements.textAnimationButtons) {
    elements.textAnimationButtons.querySelectorAll('[data-animation-preset]').forEach((button) => {
      const active = button.dataset.animationPreset === state.textAnimationType;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', active ? 'true' : 'false');
    });
  }
  if (elements.parallaxCheckbox) {
    elements.parallaxCheckbox.checked = state.parallaxEnabled !== false;
  }
}

function isVideoFile(value) {
  return /\.(mp4|mov|webm|m4v)$/i.test(value || '');
}

function isSupportedSlideImage(value) {
  return /\.(png|jpe?g|webp)$/i.test(value || '');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getTransitionType(index) {
  if (index <= 0) {
    return 'fade';
  }

  return TRANSITION_OPTIONS[(index - 1) % TRANSITION_OPTIONS.length];
}

function getPreviewTimeline() {
  const slideCount = state.slides.length;
  const slideDurationMs = Math.max(2000, Number(state.slideDurationInSeconds || 5) * 1000);
  const overlapMs = slideCount > 1 ? Math.min(1000, Math.max(300, slideDurationMs - 500)) : 0;
  const offsetMs = slideDurationMs - overlapMs;
  const slideEndMs = slideCount > 0 ? ((slideCount - 1) * offsetMs) + slideDurationMs : 0;
  const endPageMs = state.endPage && state.endPageDurationFrames > 0
    ? Math.round((state.endPageDurationFrames / FPS) * 1000)
    : 0;

  return {
    slideCount,
    slideDurationMs,
    overlapMs,
    offsetMs,
    slideEndMs,
    endPageMs,
    totalMs: slideEndMs + endPageMs,
  };
}

function formatClock(totalMs) {
  const totalSeconds = Math.max(0, Math.floor(totalMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function syncStateWithAssets() {
  if (!findOverlayAsset()) {
    state.overlay = '';
  }

  if (!findMusicAsset()) {
    state.music = '';
  }

  if (!findEndPageAsset()) {
    if (!state.endPageDisabledByUser && state.assets.endpage.length > 0) {
      state.endPage = state.assets.endpage[0].name;
    } else {
      state.endPage = '';
      state.endPageDurationFrames = 0;
      state.endPageDurationSource = '';
    }
  }
}

function syncSelectedSlide() {
  if (state.slides.length === 0) {
    state.selectedSlideId = null;
    return;
  }

  if (!state.slides.some((slide) => slide.id === state.selectedSlideId)) {
    state.selectedSlideId = state.slides[0].id;
  }
}

function getSelectedSlideIndex() {
  syncSelectedSlide();
  return state.slides.findIndex((slide) => slide.id === state.selectedSlideId);
}

function clearDragState() {
  state.draggedSlideId = null;
  state.dragOverSlideId = null;
}

function updateDragOverClasses() {
  Array.from(elements.slidesList.querySelectorAll('.slide-card')).forEach((card) => {
    card.classList.toggle('drag-over', card.dataset.slideId === state.dragOverSlideId);
  });
}

function buildExactPreviewInputProps() {
  const overlayAsset = findOverlayAsset();
  const musicAsset = findMusicAsset();
  const endPageAsset = findEndPageAsset();

  return {
    slides: state.slides.map((slide) => ({
      id: slide.id,
      imageUrl: slide.fileUrl,
      text: slide.text || '',
      isMuted: slide.isMuted !== false,
      voiceoverUrl: slide.voiceoverUrl || null,
      voiceoverDurationMs: slide.voiceoverDurationMs || 0,
    })),
    overlay: overlayAsset ? overlayAsset.url : null,
    music: musicAsset ? musicAsset.url : null,
    voiceover: state.voiceover ? window.desktopApi.toFileUrl(state.voiceover) : null,
    endPage: endPageAsset ? endPageAsset.url : null,
    slideDurationInSeconds: Number(state.slideDurationInSeconds || 5),
    effects: [...state.effects],
    endPageDurationFrames: Number(state.endPageDurationFrames || 0),
    textBottomOffset: Number(state.textBottomOffset || 160),
    textFontSize: Number(state.textFontSize || 46),
    textPreset: state.textPreset,
    textAnimationType: state.textAnimationType || 'motion-blur',
    textHorizontalOffset: Number(state.textHorizontalOffset || 0),
    parallaxEnabled: state.parallaxEnabled !== false,
    cinematicBarSize: Number(state.cinematicBarSize || 6),
    musicVolume: Number(state.musicVolume),
    voiceoverVolume: Number(state.voiceoverVolume),
  };
}

function getExactPreviewDurationInFrames() {
  const fps = FPS;
  const framesPerSlide = Math.floor(Number(state.slideDurationInSeconds || 5) * fps);
  const overlapFrames = 30;
  const validSlides = state.slides.filter((slide) => slide.fileUrl);

  if (validSlides.length === 0) {
    return 30;
  }

  const slideFrames = (validSlides.length * (framesPerSlide - overlapFrames)) + overlapFrames;
  const endPageFrames = state.endPage ? Math.max(0, Number(state.endPageDurationFrames || 0)) : 0;
  return slideFrames + endPageFrames;
}

function ensureExactPreviewMounted() {
  if (!hasExactPreviewPlayer()) {
    return false;
  }

  document.body.classList.add('preview-uses-remotion');
  let mountNode = elements.previewStage.querySelector('.preview-exact-root');
  if (!mountNode) {
    elements.previewStage.innerHTML = '';
    mountNode = document.createElement('div');
    mountNode.className = 'preview-exact-root';
    elements.previewStage.appendChild(mountNode);
  }

  if (!mountNode.dataset.mounted) {
    window.DesktopRemotionPreview.mount(mountNode);
    mountNode.dataset.mounted = 'true';
  }

  return true;
}

function renderExactPreview() {
  if (!ensureExactPreviewMounted()) {
    return false;
  }

  try {
    window.DesktopRemotionPreview.update({
      inputProps: buildExactPreviewInputProps(),
      durationInFrames: getExactPreviewDurationInFrames(),
    });
  } catch (err) {
    alert("CRASH: " + err.message + "\n" + err.stack);
  }

  return true;
}

function moveSlide(fromIndex, toIndex) {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= state.slides.length ||
    toIndex >= state.slides.length
  ) {
    return;
  }

  const nextSlides = [...state.slides];
  const [movedSlide] = nextSlides.splice(fromIndex, 1);
  nextSlides.splice(toIndex, 0, movedSlide);
  state.slides = nextSlides;
  markProjectDirty();
}

function reorderSlidesById(draggedSlideId, targetSlideId) {
  if (!draggedSlideId || !targetSlideId || draggedSlideId === targetSlideId) {
    return;
  }

  const fromIndex = state.slides.findIndex((slide) => slide.id === draggedSlideId);
  const toIndex = state.slides.findIndex((slide) => slide.id === targetSlideId);
  moveSlide(fromIndex, toIndex);
}

async function handleReplaceSlideImage(slideId) {
  if (state.replacingSlideImageId) {
    return;
  }

  const slide = state.slides.find((item) => item.id === slideId);
  if (!slide) {
    return;
  }

  state.selectedSlideId = slideId;
  state.replacingSlideImageId = slideId;
  renderSlides();
  updateProjectStatusUi();

  try {
    const pickedImage = await window.desktopApi.pickSlideImage();
    if (!pickedImage) {
      return;
    }

    if (!isSupportedSlideImage(pickedImage.imagePath || pickedImage.fileUrl)) {
      setStatus('خطأ', 'اختر صورة بصيغة PNG أو JPG أو JPEG أو WEBP');
      return;
    }

    const currentSlide = state.slides.find((item) => item.id === slideId);
    if (!currentSlide) {
      return;
    }

    currentSlide.imagePath = pickedImage.imagePath;
    currentSlide.fileUrl = pickedImage.fileUrl;
    markProjectDirty();
    setStatus('الشرائح', 'تم تغيير صورة الشريحة المحددة');
  } catch (err) {
    setStatus('خطأ', err?.message || 'تعذر تغيير صورة الشريحة');
  } finally {
    state.replacingSlideImageId = null;
    renderSlides();
  }
}

function ensurePreviewShell() {
  if (ensureExactPreviewMounted()) {
    return;
  }

  if (previewRefs.runtime) {
    return;
  }

  elements.previewStage.innerHTML = '';

  const runtime = document.createElement('div');
  runtime.className = 'preview-runtime';

  const slideLayerOne = document.createElement('div');
  slideLayerOne.className = 'preview-slide-layer';
  const slideImageOne = document.createElement('img');
  slideImageOne.className = 'preview-media';
  slideLayerOne.appendChild(slideImageOne);

  const slideLayerTwo = document.createElement('div');
  slideLayerTwo.className = 'preview-slide-layer';
  const slideImageTwo = document.createElement('img');
  slideImageTwo.className = 'preview-media';
  slideLayerTwo.appendChild(slideImageTwo);

  const endPageLayer = document.createElement('div');
  endPageLayer.className = 'preview-endpage-layer';
  const endPageVideo = document.createElement('video');
  endPageVideo.className = 'preview-media';
  endPageVideo.preload = 'auto';
  endPageVideo.playsInline = true;
  endPageVideo.loop = false;
  endPageLayer.appendChild(endPageVideo);

  const overlayLayer = document.createElement('div');
  overlayLayer.className = 'preview-overlay-layer';

  const lightLeakFlash = document.createElement('div');
  lightLeakFlash.className = 'preview-light-leak-flash';

  const effectLayer = document.createElement('div');
  effectLayer.className = 'preview-effects-layer';

  const dust = document.createElement('div');
  dust.className = 'preview-effect effect-dust';
  effectLayer.appendChild(dust);

  const leak = document.createElement('div');
  leak.className = 'preview-effect effect-light-leak';
  effectLayer.appendChild(leak);

  const bokeh = document.createElement('div');
  bokeh.className = 'preview-effect effect-bokeh';
  effectLayer.appendChild(bokeh);

  const textGradient = document.createElement('div');
  textGradient.className = 'preview-text-gradient';

  const textWrap = document.createElement('div');
  textWrap.className = 'preview-text-wrap';
  const textBar = document.createElement('div');
  textBar.className = 'preview-text-bar';
  textWrap.appendChild(textBar);

  const cornerBadge = document.createElement('div');
  cornerBadge.className = 'preview-corner-badge';
  cornerBadge.textContent = 'Preview';

  runtime.appendChild(slideLayerOne);
  runtime.appendChild(slideLayerTwo);
  runtime.appendChild(endPageLayer);
  runtime.appendChild(overlayLayer);
  runtime.appendChild(lightLeakFlash);
  runtime.appendChild(effectLayer);
  runtime.appendChild(textGradient);
  runtime.appendChild(textWrap);
  runtime.appendChild(cornerBadge);
  elements.previewStage.appendChild(runtime);

  const musicAudio = document.createElement('audio');
  musicAudio.preload = 'auto';
  musicAudio.loop = true;
  musicAudio.className = 'preview-hidden-media';
  elements.previewStage.appendChild(musicAudio);

  previewRefs.runtime = runtime;
  previewRefs.slideLayers = [
    { container: slideLayerOne, media: slideImageOne },
    { container: slideLayerTwo, media: slideImageTwo },
  ];
  previewRefs.endPageLayer = endPageLayer;
  previewRefs.endPageVideo = endPageVideo;
  previewRefs.overlayLayer = overlayLayer;
  previewRefs.effectLayer = effectLayer;
  previewRefs.effectDust = dust;
  previewRefs.effectLeak = leak;
  previewRefs.effectBokeh = bokeh;
  previewRefs.textGradient = textGradient;
  previewRefs.textWrap = textWrap;
  previewRefs.textBar = textBar;
  previewRefs.lightLeakFlash = lightLeakFlash;
  previewRefs.musicAudio = musicAudio;
}

function stopPreviewLoop() {
  if (state.previewRafId) {
    cancelAnimationFrame(state.previewRafId);
    state.previewRafId = null;
  }
}

function pauseMedia(media) {
  if (!media) {
    return;
  }

  try {
    media.pause();
  } catch {
    // Ignore preview media pause failures.
  }
}

function clearMediaSource(media) {
  if (!media) {
    return;
  }

  pauseMedia(media);
  media.removeAttribute('src');
  media.dataset.src = '';
  try {
    media.load();
  } catch {
    // Ignore preview media reset failures.
  }
}

function ensureOverlayElement(asset) {
  if (!asset) {
    previewRefs.overlayLayer.innerHTML = '';
    previewRefs.overlayVideo = null;
    previewRefs.overlayImage = null;
    previewRefs.overlayLayer.dataset.kind = '';
    return;
  }

  const isVideo = isVideoFile(asset.name);
  const currentKind = previewRefs.overlayLayer.dataset.kind || '';
  const wantedKind = isVideo ? 'video' : 'image';

  if (currentKind === wantedKind) {
    return;
  }

  previewRefs.overlayLayer.innerHTML = '';
  previewRefs.overlayLayer.dataset.kind = wantedKind;

  if (isVideo) {
    const video = document.createElement('video');
    video.className = 'preview-overlay-media';
    video.preload = 'auto';
    video.playsInline = true;
    video.loop = true;
    video.muted = true;
    previewRefs.overlayLayer.appendChild(video);
    previewRefs.overlayVideo = video;
    previewRefs.overlayImage = null;
    return;
  }

  const image = document.createElement('img');
  image.className = 'preview-overlay-media';
  previewRefs.overlayLayer.appendChild(image);
  previewRefs.overlayImage = image;
  previewRefs.overlayVideo = null;
}

function syncLoopingMedia(media, src, currentSeconds, shouldPlay, muted, volume) {
  if (!media) {
    return;
  }

  if (!src) {
    media.style.display = 'none';
    clearMediaSource(media);
    return;
  }

  media.style.display = '';
  if (media.dataset.src !== src) {
    media.src = src;
    media.dataset.src = src;
  }

  media.muted = Boolean(muted);
  if (typeof volume === 'number') {
    media.volume = volume;
  }

  const applyCurrentTime = () => {
    const duration = Number.isFinite(media.duration) && media.duration > 0 ? media.duration : null;
    const safeTime = duration
      ? clamp(currentSeconds % duration, 0, Math.max(0, duration - 0.05))
      : Math.max(0, currentSeconds);

    if (Math.abs((media.currentTime || 0) - safeTime) > 0.35) {
      try {
        media.currentTime = safeTime;
      } catch {
        // Ignore preview media seek failures.
      }
    }
  };

  if (media.readyState >= 1) {
    applyCurrentTime();
  } else {
    media.addEventListener('loadedmetadata', applyCurrentTime, { once: true });
  }

  if (shouldPlay) {
    media.play().catch(() => {});
  } else {
    pauseMedia(media);
  }
}

function syncFiniteVideo(media, src, currentSeconds, shouldPlay) {
  if (!media) {
    return;
  }

  if (!src) {
    media.style.display = 'none';
    clearMediaSource(media);
    return;
  }

  media.style.display = '';
  if (media.dataset.src !== src) {
    media.src = src;
    media.dataset.src = src;
  }

  const applyCurrentTime = () => {
    const duration = Number.isFinite(media.duration) && media.duration > 0 ? media.duration : null;
    const safeTime = duration
      ? clamp(currentSeconds, 0, Math.max(0, duration - 0.05))
      : Math.max(0, currentSeconds);

    if (Math.abs((media.currentTime || 0) - safeTime) > 0.35) {
      try {
        media.currentTime = safeTime;
      } catch {
        // Ignore preview media seek failures.
      }
    }
  };

  if (media.readyState >= 1) {
    applyCurrentTime();
  } else {
    media.addEventListener('loadedmetadata', applyCurrentTime, { once: true });
  }

  if (shouldPlay) {
    media.play().catch(() => {});
  } else {
    pauseMedia(media);
  }
}

function getVisibleSlideLayers(currentMs, timeline) {
  const visible = [];

  state.slides.forEach((slide, index) => {
    const startMs = index * timeline.offsetMs;
    const endMs = startMs + timeline.slideDurationMs;

    if (currentMs < startMs || currentMs > endMs) {
      return;
    }

    const localMs = currentMs - startMs;
    const progress = clamp(localMs / timeline.slideDurationMs, 0, 1);
    const transitionType = getTransitionType(index);
    let opacity = 1;
    let filter = '';
    let clipPath = '';
    let transitionProgress = 1;

    if (index > 0 && localMs < timeline.overlapMs) {
      transitionProgress = clamp(localMs / timeline.overlapMs, 0, 1);

      if (transitionType === 'fade' || transitionType === 'light-leak') {
        opacity = transitionProgress;
      }

      if (transitionType === 'blur-wipe') {
        opacity = 0.45 + (transitionProgress * 0.55);
        filter = `blur(${(1 - transitionProgress) * 22}px)`;
        const clipStart = 100 - (transitionProgress * 100);
        clipPath = `polygon(${clipStart}% 0, 100% 0, 100% 100%, ${clipStart}% 100%)`;
      }
    }

    const isZoomIn = index % 2 === 0;
    const startScale = isZoomIn ? 1.0 : 1.06;
    const endScale = isZoomIn ? 1.06 : 1.0;
    const scale = startScale + ((endScale - startScale) * progress);

    visible.push({
      slide,
      index,
      opacity,
      filter,
      clipPath,
      scale,
      transitionType,
      transitionProgress,
    });
  });

  return visible.slice(-2);
}

function updatePreviewMeta(items) {
  void items;
}

function applySlideLayer(slot, layerData) {
  const slotRef = previewRefs.slideLayers[slot];
  if (!slotRef) {
    return;
  }

  if (!layerData) {
    slotRef.container.style.opacity = '0';
    slotRef.container.style.display = 'none';
    return;
  }

  slotRef.container.style.display = '';
  slotRef.container.style.opacity = String(layerData.opacity);
  slotRef.container.style.filter = layerData.filter;
  slotRef.container.style.clipPath = layerData.clipPath || 'none';
  slotRef.container.style.zIndex = String(10 + slot);

  if (slotRef.media.dataset.src !== layerData.slide.fileUrl) {
    slotRef.media.src = layerData.slide.fileUrl;
    slotRef.media.dataset.src = layerData.slide.fileUrl;
  }

  slotRef.media.style.transform = `scale(${layerData.scale})`;
}

function updateEffectLayer() {
  previewRefs.effectDust.style.display = state.effects.includes('dust') ? 'block' : 'none';
  previewRefs.effectLeak.style.display = state.effects.includes('light-leak') ? 'block' : 'none';
  previewRefs.effectBokeh.style.display = state.effects.includes('bokeh') ? 'block' : 'none';
}

function updatePreviewPlayerUi(timeline) {
  const totalMs = timeline.totalMs;
  const safePosition = clamp(state.previewPositionMs, 0, totalMs || 0);
  const sliderValue = totalMs > 0 ? Math.round((safePosition / totalMs) * 1000) : 0;

  elements.previewSeek.disabled = totalMs <= 0;
  elements.previewSeek.value = String(sliderValue);
  elements.previewTimeInline.textContent = `${formatClock(safePosition)} / ${formatClock(totalMs)}`;
  elements.previewPlayBtn.textContent = state.previewPlaying ? '❚❚' : '▶';
  elements.previewMuteBtn.textContent = state.previewMuted ? '🔇' : '🔊';
  elements.previewPlayBtn.disabled = totalMs <= 0;
}

function syncPreviewButtonUi(timeline) {
  const disabled = timeline.totalMs <= 0;
  elements.previewPlayBtn.textContent = state.previewPlaying ? '❚❚' : '▶';
  elements.previewMuteBtn.textContent = state.previewMuted ? '🔇' : '🔊';
  elements.previewMuteBtn.disabled = disabled;
  elements.previewRestartBtn.disabled = disabled;
}

function renderPreviewFrame() {
  if (renderExactPreview()) {
    return;
  }

  ensurePreviewShell();
  syncStateWithAssets();
  syncSelectedSlide();

  const timeline = getPreviewTimeline();
  const totalMs = timeline.totalMs;

  if (totalMs <= 0) {
    previewRefs.slideLayers.forEach((slotRef) => {
      slotRef.container.style.display = 'none';
    });
    previewRefs.endPageLayer.style.display = 'none';
    previewRefs.overlayLayer.style.display = 'none';
    previewRefs.textGradient.style.display = 'none';
    previewRefs.textWrap.style.display = 'none';
    previewRefs.lightLeakFlash.style.opacity = '0';
    updateEffectLayer();
    updatePreviewPlayerUi(timeline);
    syncPreviewButtonUi(timeline);
    pauseMedia(previewRefs.musicAudio);
    pauseMedia(previewRefs.overlayVideo);
    pauseMedia(previewRefs.endPageVideo);
    return;
  }

  state.previewPositionMs = clamp(state.previewPositionMs, 0, totalMs);
  const currentMs = state.previewPositionMs;
  const overlayAsset = findOverlayAsset();
  const musicAsset = findMusicAsset();
  const endPageAsset = findEndPageAsset();
  const inEndPage = Boolean(endPageAsset) && currentMs >= timeline.slideEndMs;

  updatePreviewPlayerUi(timeline);
  syncPreviewButtonUi(timeline);
  updateEffectLayer();

  if (inEndPage && endPageAsset) {
    previewRefs.slideLayers.forEach((slotRef) => {
      slotRef.container.style.display = 'none';
    });

    previewRefs.endPageLayer.style.display = '';
    syncFiniteVideo(
      previewRefs.endPageVideo,
      endPageAsset.url,
      Math.max(0, (currentMs - timeline.slideEndMs) / 1000),
      state.previewPlaying,
    );

    previewRefs.textGradient.style.display = 'none';
    previewRefs.textWrap.style.display = 'none';
    previewRefs.lightLeakFlash.style.opacity = '0';
  } else {
    pauseMedia(previewRefs.endPageVideo);
    previewRefs.endPageLayer.style.display = 'none';

    const visibleLayers = getVisibleSlideLayers(currentMs, timeline);
    applySlideLayer(0, visibleLayers[0] || null);
    applySlideLayer(1, visibleLayers[1] || null);

    const activeLayer = visibleLayers[visibleLayers.length - 1] || null;
    if (activeLayer && activeLayer.slide.text) {
      const preset = TEXT_PRESET_STYLES[state.textPreset] || TEXT_PRESET_STYLES.dark;
      const bottomOffsetPercent = Math.max(18, Math.min(38, (state.textBottomOffset / 1080) * 100));
      const previewFontSize = Math.max(18, Math.min(56, Math.round(state.textFontSize * 0.72)));

      previewRefs.textGradient.style.display = '';
      previewRefs.textWrap.style.display = '';
      previewRefs.textWrap.style.bottom = `${bottomOffsetPercent}%`;
      previewRefs.textWrap.style.transform = state.textHorizontalOffset ? `translateX(${state.textHorizontalOffset}%)` : '';
      previewRefs.textBar.textContent = activeLayer.slide.text;
      previewRefs.textBar.style.backgroundColor = preset.bg;
      previewRefs.textBar.style.color = preset.color;
      previewRefs.textBar.style.borderColor = preset.border;
      previewRefs.textBar.style.fontSize = `${previewFontSize}px`;
      previewRefs.textWrap.style.opacity = String(activeLayer.opacity);
    } else {
      previewRefs.textGradient.style.display = 'none';
      previewRefs.textWrap.style.display = 'none';
    }

    if (
      activeLayer &&
      activeLayer.transitionType === 'light-leak' &&
      activeLayer.index > 0 &&
      activeLayer.transitionProgress < 1
    ) {
      const intensity = Math.sin(activeLayer.transitionProgress * Math.PI);
      previewRefs.lightLeakFlash.style.opacity = String(0.45 * intensity);
    } else {
      previewRefs.lightLeakFlash.style.opacity = '0';
    }
  }

  ensureOverlayElement(overlayAsset);
  if (overlayAsset) {
    previewRefs.overlayLayer.style.display = '';
    if (previewRefs.overlayVideo) {
      syncLoopingMedia(
        previewRefs.overlayVideo,
        overlayAsset.url,
        currentMs / 1000,
        state.previewPlaying,
        true,
        0,
      );
    } else if (previewRefs.overlayImage) {
      previewRefs.overlayImage.src = overlayAsset.url;
      previewRefs.overlayImage.alt = prettifyPath(overlayAsset.name);
    }
  } else {
    previewRefs.overlayLayer.style.display = 'none';
    pauseMedia(previewRefs.overlayVideo);
  }

  if (musicAsset) {
    const fadeStartMs = Math.max(0, totalMs - 1500);
    const fadeVolume = currentMs >= fadeStartMs && totalMs > fadeStartMs
      ? 1 - ((currentMs - fadeStartMs) / (totalMs - fadeStartMs))
      : 1;

    syncLoopingMedia(
      previewRefs.musicAudio,
      musicAsset.url,
      currentMs / 1000,
      state.previewPlaying,
      state.previewMuted,
      state.previewMuted ? 0 : clamp(fadeVolume, 0, 1),
    );
  } else {
    pauseMedia(previewRefs.musicAudio);
  }
}

function setPreviewPosition(nextMs) {
  const timeline = getPreviewTimeline();
  state.previewPositionMs = clamp(nextMs, 0, timeline.totalMs || 0);
  renderPreviewFrame();
}

function stepPreviewFrame(timestamp) {
  if (!state.previewPlaying) {
    stopPreviewLoop();
    return;
  }

  if (!state.previewStartedAt) {
    state.previewStartedAt = timestamp - state.previewPositionMs;
  }

  const timeline = getPreviewTimeline();
  if (timeline.totalMs <= 0) {
    state.previewPlaying = false;
    state.previewStartedAt = 0;
    renderPreviewFrame();
    stopPreviewLoop();
    return;
  }

  const elapsed = timestamp - state.previewStartedAt;
  state.previewPositionMs = elapsed % timeline.totalMs;
  renderPreviewFrame();
  state.previewRafId = requestAnimationFrame(stepPreviewFrame);
}

function playPreview() {
  const timeline = getPreviewTimeline();
  if (timeline.totalMs <= 0 || state.previewPlaying) {
    renderPreviewFrame();
    return;
  }

  state.previewPlaying = true;
  state.previewStartedAt = performance.now() - state.previewPositionMs;
  renderPreviewFrame();
  stopPreviewLoop();
  state.previewRafId = requestAnimationFrame(stepPreviewFrame);
}

function pausePreview() {
  state.previewPlaying = false;
  state.previewStartedAt = 0;
  stopPreviewLoop();
  pauseMedia(previewRefs.musicAudio);
  pauseMedia(previewRefs.overlayVideo);
  pauseMedia(previewRefs.endPageVideo);
  renderPreviewFrame();
}

function togglePreviewPlayback() {
  if (state.previewPlaying) {
    pausePreview();
  } else {
    playPreview();
  }
}

function togglePreviewMute() {
  state.previewMuted = !state.previewMuted;
  renderPreviewFrame();
}

async function togglePreviewFullscreen() {
  const target = elements.previewStageShell;
  if (!target) {
    return;
  }

  if (document.fullscreenElement === target) {
    await document.exitFullscreen().catch(() => {});
    return;
  }

  await target.requestFullscreen?.().catch(() => {});
}

function restartPreview(autoplay = state.previewPlaying) {
  const shouldResume = autoplay;
  pausePreview();
  state.previewPositionMs = 0;
  renderPreviewFrame();
  if (shouldResume) {
    playPreview();
  }
}

function getChapterPositions() {
  const timeline = getPreviewTimeline();
  const chapters = state.slides.map((_slide, index) => index * timeline.offsetMs);
  if (timeline.endPageMs > 0) {
    chapters.push(timeline.slideEndMs);
  }
  return chapters;
}

function seekToPreviousChapter() {
  const chapters = getChapterPositions();
  const current = state.previewPositionMs;
  let target = 0;

  chapters.forEach((chapter) => {
    if (chapter < current - 250) {
      target = chapter;
    }
  });

  setPreviewPosition(target);
}

function seekToNextChapter() {
  const chapters = getChapterPositions();
  const current = state.previewPositionMs;
  const nextChapter = chapters.find((chapter) => chapter > current + 250);
  if (typeof nextChapter === 'number') {
    setPreviewPosition(nextChapter);
    return;
  }

  const timeline = getPreviewTimeline();
  setPreviewPosition(timeline.totalMs);
}

function selectSlide(slideId) {
  state.selectedSlideId = slideId;
  const slideIndex = state.slides.findIndex((slide) => slide.id === slideId);
  if (slideIndex >= 0) {
    renderSlides();
    if (hasExactPreviewPlayer()) {
      const framesPerSlide = Math.floor(Number(state.slideDurationInSeconds || 5) * FPS);
      const overlapFrames = 30;
      const offsetFrames = framesPerSlide - overlapFrames;
      window.DesktopRemotionPreview.seekTo(slideIndex * offsetFrames);
      return;
    }

    const timeline = getPreviewTimeline();
    setPreviewPosition(slideIndex * timeline.offsetMs);
    return;
  }

  renderSlides();
}

function buildSlideCard(slide, index) {
  const wrapper = document.createElement('article');
  wrapper.className = 'slide-card';
  wrapper.dataset.slideId = slide.id;

  if (slide.id === state.selectedSlideId) {
    wrapper.classList.add('selected');
  }
  if (slide.id === state.dragOverSlideId) {
    wrapper.classList.add('drag-over');
  }

  wrapper.addEventListener('click', (event) => {
    if (event.target.closest('input,textarea,button,.drag-handle')) {
      return;
    }
    selectSlide(slide.id);
  });

  wrapper.addEventListener('dragover', (event) => {
    if (!state.draggedSlideId || state.draggedSlideId === slide.id) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });

  wrapper.addEventListener('dragenter', (event) => {
    if (!state.draggedSlideId || state.draggedSlideId === slide.id) {
      return;
    }
    event.preventDefault();
    if (state.dragOverSlideId !== slide.id) {
      state.dragOverSlideId = slide.id;
      updateDragOverClasses();
    }
  });

  wrapper.addEventListener('drop', (event) => {
    if (!state.draggedSlideId || state.draggedSlideId === slide.id) {
      return;
    }
    event.preventDefault();
    reorderSlidesById(state.draggedSlideId, slide.id);
    clearDragState();
    renderSlides();
  });

  const dragHandle = document.createElement('div');
  dragHandle.className = 'drag-handle';
  dragHandle.draggable = true;
  dragHandle.title = 'اسحب لإعادة ترتيب الشريحة';
  dragHandle.innerHTML = '<span></span><span></span><span></span>';
  dragHandle.addEventListener('dragstart', (event) => {
    state.draggedSlideId = slide.id;
    state.dragOverSlideId = slide.id;
    updateDragOverClasses();
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', slide.id);
    }
  });
  dragHandle.addEventListener('dragend', () => {
    window.setTimeout(() => {
      clearDragState();
      updateDragOverClasses();
    }, 0);
  });

  const sideMeta = document.createElement('div');
  sideMeta.className = 'slide-side-meta';

  const order = document.createElement('div');
  order.className = 'slide-order';
  order.textContent = String(index + 1);

  sideMeta.appendChild(dragHandle);
  sideMeta.appendChild(order);

  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'slide-thumb-wrap';
  thumbWrap.style.position = 'relative';
  
  const isVideo = isVideoFile(slide.imagePath);
  let thumb;
  if (isVideo) {
    thumb = document.createElement('video');
    thumb.className = 'slide-thumb';
    thumb.src = slide.fileUrl;
    thumb.muted = true;
  } else {
    thumb = document.createElement('img');
    thumb.className = 'slide-thumb';
    thumb.src = slide.fileUrl;
    thumb.alt = `Slide ${index + 1}`;
  }
  thumbWrap.appendChild(thumb);

  const changeImageBtn = document.createElement('button');
  changeImageBtn.type = 'button';
  changeImageBtn.className = 'slide-change-image-btn';
  changeImageBtn.textContent = state.replacingSlideImageId === slide.id ? '...' : 'تغيير';
  changeImageBtn.title = 'تغيير صورة الشريحة';
  changeImageBtn.setAttribute('aria-label', `تغيير صورة الشريحة ${index + 1}`);
  changeImageBtn.disabled = state.replacingSlideImageId === slide.id;
  changeImageBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleReplaceSlideImage(slide.id);
  });
  thumbWrap.appendChild(changeImageBtn);
  
  if (isVideo) {
     const muteBtn = document.createElement('button');
     muteBtn.type = 'button';
     muteBtn.style.position = 'absolute';
     muteBtn.style.bottom = '6px';
     muteBtn.style.right = '6px';
     muteBtn.style.padding = '4px 6px';
     muteBtn.style.borderRadius = '4px';
     muteBtn.style.backgroundColor = 'rgba(0,0,0,0.6)';
     muteBtn.style.color = '#fff';
     muteBtn.style.border = 'none';
     muteBtn.style.cursor = 'pointer';
     muteBtn.style.fontSize = '12px';
     muteBtn.innerHTML = slide.isMuted !== false ? '🔇' : '🔊';
     muteBtn.title = 'كتم/تشغيل الصوت في الفيديو';
     muteBtn.addEventListener('click', (e) => {
       e.stopPropagation();
       slide.isMuted = slide.isMuted === false ? true : false;
       muteBtn.innerHTML = slide.isMuted ? '🔇' : '🔊';
       markProjectDirty();
       renderPreviewFrame();
     });
     thumbWrap.appendChild(muteBtn);
  }

  const main = document.createElement('div');
  main.className = 'slide-main';

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.className = 'slide-input';
  textInput.placeholder = 'اكتب النص الذي سيظهر على هذه الشريحة';
  textInput.value = slide.text || '';
  textInput.addEventListener('input', (event) => {
    slide.text = event.target.value;
    renderPreviewFrame();
  });
  main.appendChild(textInput);

  if (slide.voiceoverUrl) {
    const voBadge = document.createElement('div');
    voBadge.className = 'slide-voiceover-badge';
    voBadge.textContent = '✅ صوت';
    voBadge.style.fontSize = '0.78rem';
    voBadge.style.color = '#10b981';
    voBadge.style.marginTop = '4px';
    voBadge.style.fontWeight = '600';
    main.appendChild(voBadge);
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'slide-delete-btn';
  deleteBtn.title = 'حذف الشريحة';
  deleteBtn.setAttribute('aria-label', 'حذف الشريحة');
  deleteBtn.innerHTML = '<span aria-hidden="true">🗑</span>';
  deleteBtn.addEventListener('click', () => {
    state.slides = state.slides.filter((item) => item.id !== slide.id);
    if (state.selectedSlideId === slide.id) {
      state.selectedSlideId = null;
    }
    markProjectDirty();
    renderSlides();
  });

  wrapper.appendChild(sideMeta);
  wrapper.appendChild(thumbWrap);
  wrapper.appendChild(main);
  wrapper.appendChild(deleteBtn);

  return wrapper;
}

function renderSlides() {
  syncSelectedSlide();
  // innerHTML = '' detaches emptyState from DOM — save and re-append it
  const emptyEl = elements.emptyState;
  elements.slidesList.innerHTML = '';
  elements.slidesList.appendChild(emptyEl);
  elements.slidesCount.textContent = String(state.slides.length);
  emptyEl.style.display = state.slides.length === 0 ? 'flex' : 'none';

  state.slides.forEach((slide, index) => {
    elements.slidesList.appendChild(buildSlideCard(slide, index));
  });

  renderPreviewFrame();
}

function syncAssetControls() {
  syncStateWithAssets();
  formatAssetOptions(elements.overlaySelect, state.assets.overlays, 'بدون Overlay');
  formatAssetOptions(elements.musicSelect, state.assets.music, 'بدون Music');
  formatAssetOptions(elements.endPageSelect, state.assets.endpage, 'بدون End Page');

  elements.overlaySelect.value = state.overlay;
  elements.musicSelect.value = state.music;
  elements.endPageSelect.value = state.endPage;
}

function syncAssetControlsV2() {
  syncStateWithAssets();
  formatAssetOptions(elements.overlaySelect, state.assets.overlays, 'بدون إطار');
  formatAssetOptions(elements.musicSelect, state.assets.music, 'بدون موسيقى');
  formatAssetOptions(elements.endPageSelect, state.assets.endpage, 'بدون شاشة ختام');

  elements.overlaySelect.value = state.overlay;
  elements.musicSelect.value = state.music;
  elements.endPageSelect.value = state.endPage;
  updateEndPageDurationHint();
  syncTextSettingsUi();
}

function collectEffects() {
  state.effects = elements.effectCheckboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

async function detectVideoDurationFrames(fileUrl) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = fileUrl;
    video.onloadedmetadata = () => resolve(Math.ceil(video.duration * FPS));
    video.onerror = () => resolve(5 * FPS);
  });
}

async function ensureEndPageDuration() {
  const endPageAsset = findEndPageAsset();
  if (!endPageAsset) {
    state.endPageDurationFrames = 0;
    state.endPageDurationSource = '';
    updateEndPageDurationHint();
    return 0;
  }

  if (state.endPageDurationFrames <= 0 || state.endPageDurationSource !== endPageAsset.url) {
    state.endPageDurationFrames = await detectVideoDurationFrames(endPageAsset.url);
    state.endPageDurationSource = endPageAsset.url;
  }

  updateEndPageDurationHint();
  return state.endPageDurationFrames;
}

async function refreshAssets() {
  state.assets = await window.desktopApi.refreshAssets();
  syncAssetControlsV2();
  await ensureEndPageDuration();
  renderPreviewFrame();
}

function buildRenderPayload() {
  const musicAsset    = findMusicAsset();
  const overlayAsset  = findOverlayAsset();
  const endPageAsset  = findEndPageAsset();

  return {
    slides: state.slides.map((slide) => ({
      id: slide.id,
      imagePath: slide.imagePath,
      text: slide.text || '',
      isMuted: slide.isMuted !== false,
      voiceoverPath: slide.voiceoverPath || null,
      voiceoverDurationMs: slide.voiceoverDurationMs || 0,
    })),
    overlay: overlayAsset ? overlayAsset.path : null,
    music: musicAsset ? musicAsset.path : null,
    voiceover: state.voiceover || null,
    musicVolume: Number(state.musicVolume !== undefined ? state.musicVolume : 50),
    voiceoverVolume: Number(state.voiceoverVolume !== undefined ? state.voiceoverVolume : 100),
    endPage: endPageAsset ? endPageAsset.path : null,
    effects: state.effects,
    slideDurationInSeconds: Number(state.slideDurationInSeconds),
    endPageDurationFrames: Number(state.endPageDurationFrames || 0),
    textBottomOffset: Number(state.textBottomOffset),
    textFontSize: Number(state.textFontSize),
    textPreset: state.textPreset,
    textAnimationType: state.textAnimationType || 'motion-blur',
    textHorizontalOffset: Number(state.textHorizontalOffset || 0),
    parallaxEnabled: state.parallaxEnabled !== false,
    cinematicBarSize: Number(state.cinematicBarSize || 6),
    turboMode: document.getElementById('turbo-render-checkbox')?.checked || false,
  };
}

async function handleGenerateVoiceovers() {
  if (state.isGeneratingVoiceovers) return;
  const slidesWithText = state.slides.filter((s) => s.text && s.text.trim().length > 0);
  if (slidesWithText.length === 0) {
    setStatus('تنبيه', 'يرجى إضافة نص لشريحة واحدة على الأقل');
    return;
  }

  state.isGeneratingVoiceovers = true;
  const btn = document.getElementById('generate-voiceovers-btn');
  const originalLabel = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'جاري توليد السرد الصوتي...';
  }
  setStatus('توليد السرد الصوتي', 'جاري الاتصال بخدمة Google TTS...');

  try {
    const payload = {
      slides: state.slides.map((slide) => ({
        id: slide.id,
        imageUrl: slide.fileUrl || slide.imagePath,
        text: slide.text,
        isMuted: slide.isMuted,
        voiceoverText: slide.voiceoverText,
        voiceoverUrl: slide.voiceoverUrl,
        voiceoverDurationMs: slide.voiceoverDurationMs,
      })),
      maxWords: 18,
      languageCode: 'ar-XA',
      ssmlGender: 'MALE',
      speakingRate: 0.92,
      pitch: 0,
      voiceName: state.settings.ttsVoice || DEFAULT_SETTINGS.ttsVoice,
      ttsModel: state.settings.ttsModel || DEFAULT_SETTINGS.ttsModel,
      apiKey: state.settings.geminiApiKey || '',
      stylePrompt: state.settings.ttsStylePrompt || DEFAULT_TTS_STYLE_PROMPT,
    };

    const data = await window.desktopApi.generateVoiceovers(payload);
    if (!data.success && !Array.isArray(data.slides)) {
      throw new Error(data?.error || 'فشل توليد السرد الصوتي');
    }

    if (Array.isArray(data.slides)) {
      const updatedById = new Map(data.slides.map((s) => [s.id, s]));
      state.slides = state.slides.map((slide) => {
        const updated = updatedById.get(slide.id);
        if (!updated) return slide;
        return {
          ...slide,
          voiceoverText: updated.voiceoverText,
          voiceoverUrl: updated.voiceoverUrl,
          voiceoverPath: updated.voiceoverPath || slide.voiceoverPath || null,
          voiceoverDurationMs: updated.voiceoverDurationMs,
        };
      });
      markProjectDirty();
      renderSlides();
    }

    if (Array.isArray(data.errors) && data.errors.length > 0) {
      setStatus('انتهى مع تحذيرات', `تم التوليد مع ${data.errors.length} خطأ`);
      console.warn('Voiceover errors', data.errors);
    } else {
      setStatus('اكتمل', 'تم توليد السرد الصوتي بنجاح');
    }
  } catch (error) {
    setStatus('فشل توليد السرد', error.message || 'تأكد من تشغيل خادم Next على :3000');
  } finally {
    state.isGeneratingVoiceovers = false;
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalLabel;
    }
  }
}

async function handleGenerateTextVoiceover() {
  const btn = document.getElementById('generate-text-voiceover-btn');
  const statusEl = document.getElementById('tts-gen-status');
  const textarea = document.getElementById('voiceover-text-input');

  const text = textarea ? textarea.value.trim() : '';
  if (!text) {
    if (statusEl) statusEl.textContent = '⚠️ اكتب النص أولاً';
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'جاري التوليد...'; }
  if (statusEl) statusEl.textContent = '';
  setStatus('توليد الصوت', 'جاري الاتصال بخدمة Gemini TTS...');

  try {
    const result = await window.desktopApi.generateSingleVoiceover({
      text,
      voiceName: state.settings.ttsVoice || DEFAULT_SETTINGS.ttsVoice,
      ttsModel: state.settings.ttsModel || DEFAULT_SETTINGS.ttsModel,
      apiKey: state.settings.geminiApiKey || '',
      stylePrompt: state.settings.ttsStylePrompt || DEFAULT_TTS_STYLE_PROMPT,
    });

    if (!result.success) throw new Error(result.error || 'فشل التوليد');

    state.voiceover = result.voiceoverPath;
    state.voiceoverDurationMs = result.durationMs || 0;

    const label = text.length > 40 ? text.slice(0, 40) + '...' : text;
    if (elements.voiceoverFilename) {
      elements.voiceoverFilename.textContent = label;
      elements.voiceoverFilename.title = text;
    }
    updateVoiceoverMeta();
    markProjectDirty();
    if (statusEl) statusEl.textContent = '✓ تم التوليد بنجاح';
    setStatus('اكتمل', 'تم توليد التعليق الصوتي بنجاح');
    renderPreviewFrame();
  } catch (err) {
    if (statusEl) statusEl.textContent = `✗ ${err.message}`;
    setStatus('خطأ', err.message || 'فشل التوليد');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="mic" style="width:17px;height:17px;display:inline;margin-left:0.4rem;"></i> توليد تعليق صوتي';
      lucide.createIcons({ nodes: [btn] });
    }
  }
}

function ensureGenerateVoiceoversButton() {
  return;
  if (document.getElementById('generate-voiceovers-btn')) return;
  const renderBtn = elements.renderBtn;
  if (!renderBtn || !renderBtn.parentElement) return;
  const btn = document.createElement('button');
  btn.id = 'generate-voiceovers-btn';
  btn.type = 'button';
  btn.className = 'btn-secondary';
  btn.style.padding = '0.4rem 1rem';
  btn.style.borderRadius = '6px';
  btn.style.fontSize = '0.9rem';
  btn.style.minHeight = '48px';
  btn.style.gap = '0.4rem';
  btn.textContent = 'توليد سرد صوتي للشرائح';
  btn.addEventListener('click', handleGenerateVoiceovers);
  renderBtn.parentElement.insertBefore(btn, renderBtn);
}

async function handleRender() {
  if (state.slides.length === 0 || state.isRendering) {
    return;
  }

  state.isRendering = true;
  elements.renderBtn.disabled = true;
  elements.renderBtn.style.display = 'none';
  if (elements.cancelRenderBtn) elements.cancelRenderBtn.style.display = 'inline-flex';
  elements.navBtns.forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';
  });
  elements.renderResult.innerHTML = '';
  setStatus('جاري الرندر', 'يتم الآن تجهيز الفيديو.');
  setProgress(0.02, 'بدء مهمة الرندر...');

  try {
    await ensureEndPageDuration();
    const result = await window.desktopApi.render(buildRenderPayload());
    state.lastRender = result;
    setStatus('اكتمل الرندر', 'تم حفظ الفيديو بنجاح.');
    setProgress(1, 'اكتمل الرندر');
    elements.renderResult.innerHTML = `
      <div class="result-card">
        <strong>تم حفظ الفيديو</strong>
        <span class="muted">${result.outputPath}</span>
        <div class="result-actions">
          <button id="reveal-file-btn" class="btn secondary small">إظهار الملف</button>
          <button id="open-folder-btn" class="btn secondary small">فتح المجلد</button>
        </div>
      </div>
    `;
    document.getElementById('reveal-file-btn').addEventListener('click', () => {
      window.desktopApi.revealInFolder(result.outputPath);
    });
    document.getElementById('open-folder-btn').addEventListener('click', () => {
      window.desktopApi.openOutputFolder();
    });
    
    showSuccessModal(result.outputPath);
  } catch (error) {
    setStatus('فشل الرندر', error.message || 'حدث خطأ غير متوقع أثناء الرندر.');
    setProgress(0, 'فشل الرندر');
  } finally {
    state.isRendering = false;
    elements.renderBtn.disabled = false;
    elements.renderBtn.style.display = 'inline-flex';
    if (elements.cancelRenderBtn) elements.cancelRenderBtn.style.display = 'none';
    elements.navBtns.forEach(btn => {
      btn.style.pointerEvents = 'auto';
      btn.style.opacity = '1';
    });
  }
}

function showSuccessModal(outputPath) {
  const overlay = document.getElementById('success-modal-overlay');
  if (!overlay) return;
  document.getElementById('modal-file-path').textContent = outputPath;
  overlay.classList.add('is-active');

  // Re-render lucide icons inside the freshly-shown modal
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  const previewBtn = document.getElementById('modal-preview-btn');
  const revealBtn = document.getElementById('modal-reveal-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  // Replace buttons to clear old listeners
  const newPreviewBtn = previewBtn.cloneNode(true);
  const newRevealBtn = revealBtn.cloneNode(true);
  const newCloseBtn = closeBtn.cloneNode(true);
  previewBtn.parentNode.replaceChild(newPreviewBtn, previewBtn);
  revealBtn.parentNode.replaceChild(newRevealBtn, revealBtn);
  closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

  newPreviewBtn.addEventListener('click', () => {
    window.desktopApi.openFile(outputPath);
  });
  newRevealBtn.addEventListener('click', () => {
    window.desktopApi.revealInFolder(outputPath);
  });
  newCloseBtn.addEventListener('click', () => {
    overlay.classList.remove('is-active');
  });

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('is-active');
  }, { once: true });

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

async function bootstrap() {
  ensurePreviewShell();
  renderTextAnimationButtons();
  syncTextSettingsUi();

  // Load persisted settings
  try {
    const saved = await window.desktopApi.getSettings();
    if (saved && typeof saved === 'object') {
      state.settings = { ...DEFAULT_SETTINGS, ...saved };
    }
  } catch {
    // settings load failure is non-fatal
  }
  updatePromptInspector();

  const bootstrapPayload = await window.desktopApi.bootstrap();
  state.appVersion = bootstrapPayload.appVersion || state.appVersion;
  state.assets = bootstrapPayload.assets;
  state.placeholderPath = bootstrapPayload.placeholderPath || null;
  ensureDesktopFont(bootstrapPayload.fontDataUrl);
  const logoPath = `${bootstrapPayload.assetsDir.replace(/[\\/]+$/, '')}\\logo.png`;
  elements.brandLogo.src = bootstrapPayload.logoDataUrl || window.desktopApi.toFileUrl(logoPath);
  elements.runtimeSummary.textContent =
    `Mode: ${bootstrapPayload.mode} | Assets: ${bootstrapPayload.assetsDir} | Output: ${bootstrapPayload.outputDir}`;
  elements.runtimeSummary.title = elements.runtimeSummary.textContent;

  syncAssetControlsV2();
  await ensureEndPageDuration();
  renderSlides();
  setStatus('رندر الفيديو', '');
  setProgress(0, 'لم يبدأ الرندر بعد');
  updateProjectStatusUi();
}

async function handlePickSlides() {
  const pickedSlides = await window.desktopApi.pickSlides();
  if (pickedSlides.length === 0) {
    return;
  }

  state.slides = [...state.slides, ...pickedSlides];
  state.selectedSlideId = state.selectedSlideId || pickedSlides[0].id;
  markProjectDirty();
  renderSlides();
}

function shouldIgnoreDirtyEvent(target) {
  if (!target || typeof target.closest !== 'function') return false;
  return Boolean(target.closest(
    '#preview-seek, .preview-icon-btn, #preview-stage, #project-save-btn, #project-open-btn, #settings-modal-overlay',
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

elements.pickSlidesBtn.addEventListener('click', handlePickSlides);
elements.emptyState.addEventListener('click', handlePickSlides);
elements.emptyState.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }
  event.preventDefault();
  handlePickSlides();
});

elements.refreshAssetsBtn.addEventListener('click', refreshAssets);
elements.openOutputBtn.addEventListener('click', () => window.desktopApi.openOutputFolder());
elements.renderBtn.addEventListener('click', handleRender);
if (elements.cancelRenderBtn) {
  elements.cancelRenderBtn.addEventListener('click', async () => {
    const canceled = await window.desktopApi.cancelRender({ model: 'infograph' });
    if (canceled) {
      setStatus('تم الإيقاف', 'تم إيقاف عملية الرندر بناءً على طلبك.');
      setProgress(0, 'تم الإيقاف');
    }
  });
}

elements.overlaySelect.addEventListener('change', (event) => {
  state.overlay = event.target.value;
  renderPreviewFrame();
});

elements.musicSelect.addEventListener('change', (event) => {
  state.music = event.target.value;
  renderPreviewFrame();
});

if (elements.musicVolumeInput && elements.voiceoverVolumeInput) {
  elements.musicVolumeInput.addEventListener('input', (event) => {
    state.musicVolume = Number(event.target.value);
    elements.musicVolumeValue.textContent = `${state.musicVolume}%`;
    updateRangeVisual(elements.musicVolumeInput);
    renderPreviewFrame();
  });
  elements.voiceoverVolumeInput.addEventListener('input', (event) => {
    state.voiceoverVolume = Number(event.target.value);
    elements.voiceoverVolumeValue.textContent = `${state.voiceoverVolume}%`;
    updateRangeVisual(elements.voiceoverVolumeInput);
    renderPreviewFrame();
  });
}

if (elements.pickVoiceoverBtn) {
  elements.pickVoiceoverBtn.addEventListener('click', async () => {
    const voiceoverData = await window.desktopApi.pickVoiceover();
    if (voiceoverData) {
      state.voiceover = voiceoverData.path;
      state.voiceoverDurationMs = await readAudioDurationMs(voiceoverData.url);
      const parsedPath = state.voiceover.replace(/\\/g, '/').split('/').pop();
      elements.voiceoverFilename.textContent = parsedPath;
      elements.voiceoverFilename.title = parsedPath;
      updateVoiceoverMeta();
      markProjectDirty();
      renderPreviewFrame();
    }
  });

  elements.clearVoiceoverBtn.addEventListener('click', () => {
    state.voiceover = null;
    state.voiceoverDurationMs = 0;
    elements.voiceoverFilename.textContent = 'بدون تعليق';
    elements.voiceoverFilename.title = 'بدون تعليق صوتی';
    updateVoiceoverMeta();
    markProjectDirty();
    renderPreviewFrame();
  });
}

elements.endPageSelect.addEventListener('change', async (event) => {
  state.endPage = event.target.value;
  state.endPageDisabledByUser = !state.endPage;
  const endPageAsset = findEndPageAsset();
  state.endPageDurationFrames = endPageAsset ? await detectVideoDurationFrames(endPageAsset.url) : 0;
  state.endPageDurationSource = endPageAsset ? endPageAsset.url : '';
  updateEndPageDurationHint();
  renderPreviewFrame();
});

elements.textPresetSelect.addEventListener('change', (event) => {
  state.textPreset = event.target.value;
  syncTextSettingsUi();
  renderPreviewFrame();
});

elements.fontSizeInput.addEventListener('input', (event) => {
  state.textFontSize = Number(event.target.value);
  syncTextSettingsUi();
  renderPreviewFrame();
});

elements.bottomOffsetInput.addEventListener('input', (event) => {
  state.textBottomOffset = Number(event.target.value);
  syncTextSettingsUi();
  renderPreviewFrame();
});

if (elements.horizontalOffsetInput) {
  elements.horizontalOffsetInput.addEventListener('input', (event) => {
    state.textHorizontalOffset = Number(event.target.value);
    syncTextSettingsUi();
    renderPreviewFrame();
  });
}

elements.slideDurationInput.addEventListener('input', (event) => {
  state.slideDurationInSeconds = Number(event.target.value);
  const timeline = getPreviewTimeline();
  state.previewPositionMs = clamp(state.previewPositionMs, 0, timeline.totalMs || 0);
  updateVoiceoverMeta();
  renderPreviewFrame();
});

elements.effectCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    collectEffects();
    
    // Toggle cinematic bars slider visibility
    const barContainer = document.getElementById('cinematic-bar-size-container');
    if (barContainer) {
      if (state.effects.includes('cinematic-bars')) barContainer.classList.remove('ui-hidden');
      else barContainer.classList.add('ui-hidden');
    }
    
    renderPreviewFrame();
  });
});

elements.textPresetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.textPreset = button.dataset.preset || 'dark';
    syncTextSettingsUi();
    markProjectDirty();
    renderPreviewFrame();
  });
});

if (elements.barSizeInput) {
  elements.barSizeInput.addEventListener('input', (event) => {
    state.cinematicBarSize = Number(event.target.value);
    syncTextSettingsUi();
    renderPreviewFrame();
  });
}

if (elements.animationRadios) {
  elements.animationRadios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      if (event.target.checked) {
        state.textAnimationType = event.target.value;
        syncTextSettingsUi();
        renderPreviewFrame();
      }
    });
  });
}

if (elements.textAnimationButtons) {
  elements.textAnimationButtons.addEventListener('click', (event) => {
    const button = event.target.closest('[data-animation-preset]');
    if (!button) {
      return;
    }
    state.textAnimationType = button.dataset.animationPreset || 'motion-blur';
    syncTextSettingsUi();
    markProjectDirty();
    renderPreviewFrame();
  });
}

if (elements.parallaxCheckbox) {
  elements.parallaxCheckbox.addEventListener('change', (event) => {
    state.parallaxEnabled = event.target.checked;
    syncTextSettingsUi();
    renderPreviewFrame();
  });
}

if (!hasExactPreviewPlayer()) {
  elements.previewPlayBtn.addEventListener('click', togglePreviewPlayback);
  elements.previewMuteBtn.addEventListener('click', togglePreviewMute);
  elements.previewRestartBtn.addEventListener('click', () => restartPreview(state.previewPlaying));
  elements.previewFullscreenBtn.addEventListener('click', togglePreviewFullscreen);
  elements.previewStage.addEventListener('click', togglePreviewPlayback);
}

elements.previewSeek.addEventListener('input', (event) => {
  const timeline = getPreviewTimeline();
  const ratio = Number(event.target.value) / 1000;
  setPreviewPosition(ratio * timeline.totalMs);
});

window.desktopApi.onRenderProgress((payload) => {
  setProgress(payload.progress, payload.message);
});

window.addEventListener('beforeunload', () => {
  if (hasExactPreviewPlayer()) {
    window.DesktopRemotionPreview.destroy();
  }
  pausePreview();
});

// ─── Generate Text Voiceover button ───────────────────────────────────────

// ─── Content Generation ───────────────────────────────────────────────────────

async function handleGenerateContentSlides() {
  const topicInput = document.getElementById('content-topic-input');
  const slideCountInput = document.getElementById('content-slide-count');
  const contentStyleSelect = document.getElementById('content-style-select');
  const presetSelect = document.getElementById('content-preset-select');
  const btn = document.getElementById('generate-content-btn');
  const status = document.getElementById('content-generate-status');
  const scriptPreview = document.getElementById('content-script-preview');

  const topic = topicInput ? topicInput.value.trim() : '';
  if (!topic) {
    if (status) status.textContent = 'يرجى كتابة موضوع أو نص أولاً';
    return;
  }

  const count = slideCountInput ? Number(slideCountInput.value) || 10 : 10;
  const contentStyle = contentStyleSelect ? contentStyleSelect.value : 'informative';
  const textPreset = presetSelect ? presetSelect.value : 'automatic';
  const maxWordsInput = document.getElementById('content-max-words');
  const slideDurationInput = document.getElementById('content-slide-duration');
  const maxWords = maxWordsInput ? Math.max(8, Math.min(30, Number(maxWordsInput.value) || 18)) : 18;
  const slideDuration = slideDurationInput ? Math.max(4, Math.min(20, Number(slideDurationInput.value) || 8)) : 8;

  if (btn) { btn.disabled = true; btn.textContent = 'جاري التوليد...'; }
  if (status) status.textContent = 'جاري الاتصال بـ Gemini...';
  if (scriptPreview) { scriptPreview.value = ''; scriptPreview.placeholder = 'جاري توليد السكريبت...'; }

  try {
    const result = await window.desktopApi.generateContentSlides({
      topic,
      count,
      contentStyle,
      textPreset,
      maxWords,
      systemPrompt: getInspectorSystemPrompt(),
      apiKey: state.settings.geminiApiKey || '',
    });

    if (!result.success) {
      throw new Error(result.error || 'فشل توليد الشرائح');
    }
    if (!Array.isArray(result.slides) || result.slides.length === 0) {
      throw new Error('لم يتم الحصول على شرائح من Gemini');
    }

    // Replace all slides with newly generated ones (fresh content session)
    state.slides = result.slides;
    state.selectedSlideId = result.slides[0].id;

    // Set slide duration from the content tab control
    state.slideDurationInSeconds = slideDuration;
    const durationInput = document.getElementById('slide-duration-input');
    if (durationInput) durationInput.value = slideDuration;

    // Apply text preset if not automatic
    if (textPreset && textPreset !== 'automatic') {
      state.textPreset = textPreset;
      const presetEl = document.getElementById('text-preset-select');
      if (presetEl) presetEl.value = textPreset;
    }

    // Populate the editable script textarea
    if (scriptPreview) {
      scriptPreview.value = result.fullScript || result.slides.map((s) => s.voiceoverText || s.text || '').join('\n\n');
      scriptPreview.placeholder = 'السكريبت الكامل للتعليق الصوتي...';
    }

    renderSlides();
    markProjectDirty();
    renderPreviewFrame();
    if (status) status.textContent = `✅ تم توليد ${result.slides.length} شريحة — راجع السكريبت أدناه`;
    setStatus('المحتوى', `تم إنشاء ${result.slides.length} شريحة من Gemini`);
  } catch (err) {
    if (status) status.textContent = `❌ ${err.message}`;
    if (scriptPreview) scriptPreview.placeholder = 'السكريبت الكامل للتعليق الصوتي...';
    setStatus('خطأ', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="sparkles" style="width:18px;height:18px;"></i> توليد الشرائح والسكريبت';
      if (window.lucide) lucide.createIcons({ nodes: [btn.querySelector('[data-lucide]')] });
    }
  }
}

async function handleGenerateScriptVoiceover() {
  const btn = document.getElementById('generate-script-audio-btn');
  const statusEl = document.getElementById('script-audio-status');
  const scriptPreview = document.getElementById('content-script-preview');

  const scriptText = scriptPreview ? scriptPreview.value.trim() : '';
  if (!scriptText) {
    if (statusEl) statusEl.textContent = 'السكريبت فارغ — يرجى توليد الشرائح أولاً';
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'جاري التوليد...'; }
  if (statusEl) statusEl.textContent = 'جاري توليد الصوت...';

  try {
    const result = await window.desktopApi.generateSingleVoiceover({
      text: scriptText,
      apiKey: state.settings.geminiApiKey || '',
      ttsModel: state.settings.ttsModel || DEFAULT_SETTINGS.ttsModel,
      voiceName: state.settings.ttsVoice || DEFAULT_SETTINGS.ttsVoice,
      stylePrompt: getInspectorTtsStyle(),
    });

    if (!result.success) throw new Error(result.error || 'فشل توليد الصوت');

    state.voiceover = result.voiceoverPath;
    state.voiceoverDurationMs = result.durationMs || 0;

    const label = 'سكريبت المحتوى';
    if (elements.voiceoverFilename) {
      elements.voiceoverFilename.textContent = label;
      elements.voiceoverFilename.title = scriptText.slice(0, 80);
    }
    updateVoiceoverMeta();
    markProjectDirty();
    renderPreviewFrame();

    if (statusEl) statusEl.textContent = `✅ تم التوليد — ${(state.voiceoverDurationMs / 1000).toFixed(1)}ث`;
    setStatus('اكتمل', 'تم توليد صوت السكريبت بنجاح');
  } catch (err) {
    if (statusEl) statusEl.textContent = `❌ ${err.message}`;
    setStatus('خطأ', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="mic" style="width:16px;height:16px;"></i> توليد صوت الاسكريبت';
      if (window.lucide) lucide.createIcons({ nodes: [btn.querySelector('[data-lucide]')] });
    }
  }
}

const generateContentBtn = document.getElementById('generate-content-btn');
if (generateContentBtn) {
  generateContentBtn.addEventListener('click', handleGenerateContentSlides);
}

const generateScriptAudioBtn = document.getElementById('generate-script-audio-btn');
if (generateScriptAudioBtn) {
  generateScriptAudioBtn.addEventListener('click', handleGenerateScriptVoiceover);
}

const copyScriptBtn = document.getElementById('copy-script-btn');
if (copyScriptBtn) {
  copyScriptBtn.addEventListener('click', () => {
    const scriptPreview = document.getElementById('content-script-preview');
    if (!scriptPreview || !scriptPreview.value.trim()) return;
    navigator.clipboard.writeText(scriptPreview.value).then(() => {
      const orig = copyScriptBtn.textContent;
      copyScriptBtn.textContent = '✓ تم النسخ';
      setTimeout(() => { copyScriptBtn.textContent = orig; }, 1500);
    });
  });
}

// ─── Prompt Inspector ─────────────────────────────────────────────────────

function updatePromptInspector() {
  const ttsEl = document.getElementById('prompt-inspector-tts');
  const contentEl = document.getElementById('prompt-inspector-content');
  if (ttsEl && !ttsEl._userEdited) ttsEl.value = state.settings.ttsStylePrompt || DEFAULT_TTS_STYLE_PROMPT;
  if (contentEl && !contentEl._userEdited) contentEl.value = state.settings.contentSystemPrompt || DEFAULT_SYSTEM_PROMPT;
}

function getInspectorTtsStyle() {
  const el = document.getElementById('prompt-inspector-tts');
  return (el && el.value.trim()) ? el.value.trim() : (state.settings.ttsStylePrompt || DEFAULT_TTS_STYLE_PROMPT);
}

function getInspectorSystemPrompt() {
  const el = document.getElementById('prompt-inspector-content');
  return (el && el.value.trim()) ? el.value.trim() : (state.settings.contentSystemPrompt || DEFAULT_SYSTEM_PROMPT);
}

// ─── Settings Modal ────────────────────────────────────────────────────────

function openSettingsModal() {
  const overlay = document.getElementById('settings-modal-overlay');
  if (!overlay) return;

  // Populate fields from state.settings
  const apiKeyInput = document.getElementById('settings-api-key');
  const modelSelect = document.getElementById('settings-tts-model');
  const ttsStylePromptInput = document.getElementById('settings-tts-style-prompt');
  const contentModelSelect = document.getElementById('settings-content-model');
  const contentSystemPromptInput = document.getElementById('settings-content-system-prompt');
  if (apiKeyInput) apiKeyInput.value = state.settings.geminiApiKey || '';
  if (modelSelect) modelSelect.value = state.settings.ttsModel || DEFAULT_SETTINGS.ttsModel;
  if (ttsStylePromptInput) ttsStylePromptInput.value = state.settings.ttsStylePrompt || DEFAULT_TTS_STYLE_PROMPT;
  if (contentModelSelect) contentModelSelect.value = state.settings.contentModel || DEFAULT_SETTINGS.contentModel;
  if (contentSystemPromptInput) contentSystemPromptInput.value = state.settings.contentSystemPrompt || DEFAULT_SYSTEM_PROMPT;

  syncVoiceGrid(state.settings.ttsVoice || DEFAULT_SETTINGS.ttsVoice);
  updateApiKeyStatus(state.settings.geminiApiKey);

  overlay.classList.add('is-active');
}

function closeSettingsModal() {
  const overlay = document.getElementById('settings-modal-overlay');
  if (overlay) overlay.classList.remove('is-active');
}

function syncVoiceGrid(selectedVoice) {
  document.querySelectorAll('#voice-selection-grid .voice-card').forEach((card) => {
    card.classList.toggle('is-selected', card.dataset.voice === selectedVoice);
  });
}

function updateApiKeyStatus(apiKey) {
  const badge = document.getElementById('api-key-status');
  if (!badge) return;
  if (apiKey && apiKey.trim().length > 10) {
    badge.innerHTML = '<span class="settings-status-badge ok">✓ مفتاح محفوظ</span>';
  } else {
    badge.innerHTML = '<span class="settings-status-badge missing">✗ لم يُضف مفتاح بعد</span>';
  }
}

async function saveSettings() {
  const apiKeyInput = document.getElementById('settings-api-key');
  const modelSelect = document.getElementById('settings-tts-model');
  const ttsStylePromptInput = document.getElementById('settings-tts-style-prompt');
  const selectedVoiceCard = document.querySelector('#voice-selection-grid .voice-card.is-selected');
  const contentModelSelect = document.getElementById('settings-content-model');
  const contentSystemPromptInput = document.getElementById('settings-content-system-prompt');

  const newSettings = {
    geminiApiKey: apiKeyInput ? apiKeyInput.value.trim() : '',
    ttsModel: modelSelect ? modelSelect.value : DEFAULT_SETTINGS.ttsModel,
    ttsVoice: selectedVoiceCard ? selectedVoiceCard.dataset.voice : DEFAULT_SETTINGS.ttsVoice,
    ttsStylePrompt: ttsStylePromptInput ? ttsStylePromptInput.value.trim() || DEFAULT_TTS_STYLE_PROMPT : DEFAULT_TTS_STYLE_PROMPT,
    contentModel: contentModelSelect ? contentModelSelect.value : DEFAULT_SETTINGS.contentModel,
    contentSystemPrompt: contentSystemPromptInput ? contentSystemPromptInput.value : DEFAULT_SYSTEM_PROMPT,
  };

  const result = await window.desktopApi.saveSettings(newSettings);
  if (result.success) {
    state.settings = newSettings;
    updatePromptInspector();
    closeSettingsModal();
    markProjectDirty();
    setStatus('الإعدادات', 'تم حفظ الإعدادات بنجاح');
  } else {
    setStatus('خطأ', 'فشل حفظ الإعدادات');
  }
}

// Gear button
const openSettingsBtn = document.getElementById('open-settings-btn');
if (openSettingsBtn) {
  openSettingsBtn.addEventListener('click', openSettingsModal);
}

// Close buttons
const settingsCloseBtn = document.getElementById('settings-modal-close-btn');
const settingsCancelBtn = document.getElementById('settings-cancel-btn');
if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', closeSettingsModal);
if (settingsCancelBtn) settingsCancelBtn.addEventListener('click', closeSettingsModal);

// Close on backdrop click
const settingsOverlay = document.getElementById('settings-modal-overlay');
if (settingsOverlay) {
  settingsOverlay.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) closeSettingsModal();
  });
}

// Save button
const settingsSaveBtn = document.getElementById('settings-save-btn');
if (settingsSaveBtn) {
  settingsSaveBtn.addEventListener('click', saveSettings);
}

// Show/hide API key
const toggleApiKeyBtn = document.getElementById('toggle-api-key-visibility');
if (toggleApiKeyBtn) {
  toggleApiKeyBtn.addEventListener('click', () => {
    const input = document.getElementById('settings-api-key');
    const icon = document.getElementById('eye-icon');
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    if (icon) {
      icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
      lucide.createIcons({ nodes: [icon] });
    }
  });
}

// Voice card selection
const voiceGrid = document.getElementById('voice-selection-grid');
if (voiceGrid) {
  voiceGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.voice-card');
    if (!card) return;
    syncVoiceGrid(card.dataset.voice);
  });
}

// Live update of API key status while typing
const apiKeyInput = document.getElementById('settings-api-key');
if (apiKeyInput) {
  apiKeyInput.addEventListener('input', () => updateApiKeyStatus(apiKeyInput.value));
}

bootstrap();
