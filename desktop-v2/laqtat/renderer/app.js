const FPS = 25;
const PROJECT_TYPE = 'laqtat';
const PROJECT_AUTOSAVE_DELAY_MS = 1600;
const TEXT_PRESET_VALUES = ['dark', 'gold', 'blue', 'red', 'orange'];

const state = {
  assets: {
    frem_mutadawel: [],
    music: [],
  },
  appVersion: '1.0.0',
  project: {
    currentProjectPath: '',
    projectName: 'Laqtat Project',
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
    autosaveEnabled: true,
    createdAt: null,
  },
  mainVideo: '',
  mainVideoUrl: '',
  mainVideoDurationMs: 0,
  frame: '',
  fitMode: 'blurred-background',
  blurBackgroundAmount: 36,
  backgroundScale: 1.18,
  videoScale: 1,
  videoX: 0,
  videoY: 0,
  keepSourceAudio: false,
  segments: [],
  blurRegions: [],
  text: '',
  textBottomOffset: 160,
  textFontSize: 46,
  textPreset: 'dark',
  textAnimationType: 'motion-blur',
  cinematicBarSize: 6,
  effects: [],
  bgMusic: '',
  bgMusicVolume: 25,
  turboMode: true,
  isRendering: false,
};

const elements = {
  brandLogo: document.getElementById('brand-logo'),
  projectSaveBtn: document.getElementById('project-save-btn'),
  projectOpenBtn: document.getElementById('project-open-btn'),
  projectSaveStatus: document.getElementById('project-save-status'),
  runtimeSummary: document.getElementById('runtime-summary'),
  previewSummary: document.getElementById('preview-summary'),
  previewStage: document.getElementById('preview-exact-root'),
  statusTitle: document.getElementById('status-title'),
  statusMessage: document.getElementById('status-message'),
  progressBar: document.getElementById('progress-bar'),
  progressLabel: document.getElementById('progress-label'),
  progressPercent: document.getElementById('progress-percent'),
  renderResult: document.getElementById('render-result'),
  renderBtn: document.getElementById('render-btn'),
  cancelRenderBtn: document.getElementById('cancel-render-btn'),
  openOutputBtn: document.getElementById('open-output-btn'),
  refreshAssetsBtn: document.getElementById('refresh-assets-btn'),
  pickMainVideoBtn: document.getElementById('pick-main-video-btn'),
  mainVideoLabel: document.getElementById('main-video-label'),
  frameSelect: document.getElementById('frame-select'),
  fitModeSelect: document.getElementById('fit-mode-select'),
  backgroundBlurInput: document.getElementById('background-blur-input'),
  backgroundBlurValue: document.getElementById('background-blur-value'),
  backgroundScaleInput: document.getElementById('background-scale-input'),
  backgroundScaleValue: document.getElementById('background-scale-value'),
  blurredBgGroup: document.getElementById('blurred-bg-group'),
  keepSourceAudioCheckbox: document.getElementById('keep-source-audio-checkbox'),
  scaleInput: document.getElementById('scale-input'),
  scaleValue: document.getElementById('scale-value'),
  xInput: document.getElementById('x-input'),
  xValue: document.getElementById('x-value'),
  yInput: document.getElementById('y-input'),
  yValue: document.getElementById('y-value'),
  addSegmentBtn: document.getElementById('add-segment-btn'),
  segmentList: document.getElementById('segment-list'),
  addBlurBtn: document.getElementById('add-blur-btn'),
  blurList: document.getElementById('blur-list'),
  textInput: document.getElementById('text-input'),
  bottomOffsetInput: document.getElementById('bottom-offset-input'),
  bottomOffsetValue: document.getElementById('bottom-offset-value'),
  fontSizeInput: document.getElementById('font-size-input'),
  fontSizeValue: document.getElementById('font-size-value'),
  textPresetSelect: document.getElementById('text-preset-select'),
  textAnimationSelect: document.getElementById('text-animation-select'),
  bgMusicSelect: document.getElementById('bg-music-select'),
  bgMusicVolumeInput: document.getElementById('bg-music-volume-input'),
  bgMusicVolumeValue: document.getElementById('bg-music-volume-value'),
  tabButtons: Array.from(document.querySelectorAll('.tab-btn')),
  tabPanels: Array.from(document.querySelectorAll('.tab-panel')),
  navBtns: Array.from(document.querySelectorAll('.paper-nav-pill')),
  turboRenderCheckbox: document.getElementById('turbo-render-checkbox'),
  progressContainer: document.getElementById('progress-container'),
  statusPanel: document.getElementById('status-panel'),
};

let autosaveTimerId = null;
let isApplyingProjectData = false;
let projectChangeRevision = 0;
let previewRenderTimerId = null;

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function prettifyPath(fullPath) {
  if (!fullPath) return '';
  const parts = fullPath.split(/[/\\]/);
  return parts[parts.length - 1];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatSeconds(ms) {
  return `${(Math.max(0, ms) / 1000).toFixed(1)}ث`;
}

function escapeAttr(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatBlurValue(field, value) {
  switch (field) {
    case 'x':
    case 'y':
    case 'endX':
    case 'endY':
    case 'width':
    case 'height':
    case 'radius':
    case 'feather':
      return `${Math.round(value)}px`;
    case 'blur':
      return `${Math.round(value)}px`;
    case 'startMs':
    case 'endMs':
      return `${(Number(value || 0) / 1000).toFixed(1)} ث`;
    default:
      return String(value);
  }
}

function sliderFieldMarkup({ id, field, label, min, max, step, value }) {
  return `
    <label class="slider-field">
      <span class="slider-head">
        <span class="field-caption">${label}</span>
        <span class="slider-value">${formatBlurValue(field, value)}</span>
      </span>
      <input
        type="range"
        class="range-input"
        min="${min}"
        max="${max}"
        step="${step}"
        data-field="${field}"
        data-id="${id}"
        value="${value}"
      />
    </label>
  `;
}

function setStatus(title, message = '', isError = false) {
  elements.statusTitle.textContent = title;
  elements.statusMessage.textContent = message;
  elements.statusPanel?.classList.remove('is-hidden');
  if (isError) {
    elements.statusPanel?.classList.add('error');
  } else {
    elements.statusPanel?.classList.remove('error');
  }
}

function setProgress(progress, message) {
  if (progress < 0) {
    elements.progressContainer?.classList.add('is-hidden');
    return;
  }
  const safeProgress = Math.max(0, Math.min(1, progress || 0));
  elements.progressContainer?.classList.remove('is-hidden');
  elements.progressBar.style.width = `${safeProgress * 100}%`;
  elements.progressPercent.textContent = `${Math.round(safeProgress * 100)}%`;
  elements.progressLabel.textContent = message || 'جاهز';
}

function formatAssetOptions(select, items, placeholder) {
  select.innerHTML = '';
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = placeholder;
  select.appendChild(emptyOption);

  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.path;
    option.textContent = item.name;
    select.appendChild(option);
  });
}

function getFileUrlForAsset(assetPath, items) {
  if (!assetPath) return '';
  const hit = (items || []).find((item) => item.path === assetPath || item.name === assetPath);
  if (hit?.url) return hit.url;
  if (window.desktopApi?.toFileUrl) return window.desktopApi.toFileUrl(assetPath);
  return '';
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

function setNavInteractivity(enabled) {
  elements.navBtns.forEach((btn) => {
    btn.style.pointerEvents = enabled ? 'auto' : 'none';
    btn.style.opacity = enabled ? '1' : '0.5';
  });
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

async function readMediaDurationMs(fileUrl, fallbackMs = 0) {
  if (!fileUrl) return fallbackMs;
  return new Promise((resolve) => {
    const media = document.createElement('video');
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

function normalizeSegments() {
  const limit = Math.max(1000, state.mainVideoDurationMs || 1000);
  state.segments = (Array.isArray(state.segments) ? state.segments : [])
    .map((segment, index) => {
      const startMs = clamp(Number(segment.startMs || 0), 0, limit);
      const endMs = clamp(Number(segment.endMs || limit), 0, limit);
      return {
        id: segment.id || createId(`segment-${index + 1}`),
        label: typeof segment.label === 'string' ? segment.label : '',
        startMs,
        endMs: Math.max(startMs + 100, endMs),
      };
    })
    .filter((segment) => segment.endMs > segment.startMs);

  if (!state.segments.length && state.mainVideoDurationMs > 0) {
    state.segments = [{
      id: createId('segment'),
      label: 'المقطع الكامل',
      startMs: 0,
      endMs: state.mainVideoDurationMs,
    }];
  }
}

function normalizeBlurRegions() {
  const videoLimit = Math.max(1000, state.mainVideoDurationMs || 1000);
  state.blurRegions = (Array.isArray(state.blurRegions) ? state.blurRegions : []).map((region, index) => {
    const alwaysOn = region.alwaysOn !== false;
    const startMs = clamp(Number(region.startMs || 0), 0, videoLimit);
    const endMs = clamp(Number(region.endMs || videoLimit), startMs, videoLimit);
    return {
      id: region.id || createId(`blur-${index + 1}`),
      x: clamp(Number(region.x || 0), 0, 1919),
      y: clamp(Number(region.y || 0), 0, 1079),
      endX: clamp(Number(region.endX ?? region.x ?? 0), 0, 1919),
      endY: clamp(Number(region.endY ?? region.y ?? 0), 0, 1079),
      width: clamp(Number(region.width || 260), 20, 1920),
      height: clamp(Number(region.height || 160), 20, 1080),
      blur: clamp(Number(region.blur || 24), 4, 64),
      radius: clamp(Number(region.radius ?? 12), 0, 240),
      feather: clamp(Number(region.feather ?? 0), 0, 80),
      motionEnabled: region.motionEnabled === true,
      alwaysOn,
      startMs,
      endMs: Math.max(startMs + 100, endMs),
    };
  });
}

function getTotalPreviewDurationFrames() {
  return Math.max(
    25,
    state.segments.reduce((sum, segment) => sum + Math.max(1, Math.round(((segment.endMs - segment.startMs) / 1000) * FPS)), 0),
  );
}

function buildPreviewInputProps() {
  return {
    mainVideoUrl: state.mainVideoUrl || null,
    frameUrl: getFileUrlForAsset(state.frame, state.assets.frem_mutadawel || []) || null,
    mainText: state.text || '',
    videoScale: Number(state.videoScale || 1),
    videoX: Number(state.videoX || 0),
    videoY: Number(state.videoY || 0),
    effects: Array.isArray(state.effects) ? state.effects : [],
    textBottomOffset: Number(state.textBottomOffset || 160),
    textFontSize: Number(state.textFontSize || 46),
    textPreset: state.textPreset || 'dark',
    textAnimationType: state.textAnimationType || 'motion-blur',
    cinematicBarSize: Number(state.cinematicBarSize || 6),
    bgMusicUrl: getFileUrlForAsset(state.bgMusic, state.assets.music || []) || null,
    bgMusicVolume: Number((state.bgMusicVolume || 0) / 100),
    fitMode: state.fitMode || 'blurred-background',
    blurBackgroundAmount: Number(state.blurBackgroundAmount || 36),
    backgroundScale: Number(state.backgroundScale || 1.18),
    keepSourceAudio: state.keepSourceAudio === true,
    segments: state.segments.map((segment) => ({ ...segment })),
    blurRegions: state.blurRegions.map((region) => ({ ...region })),
  };
}

function previewApi() {
  return window.DesktopRemotionPreviewLaqtat || window.window?.DesktopRemotionPreviewLaqtat || null;
}

async function renderPreview() {
  const api = previewApi();
  if (!api || !elements.previewStage) return;
  normalizeSegments();
  normalizeBlurRegions();
  api.update({
    inputProps: buildPreviewInputProps(),
    durationInFrames: getTotalPreviewDurationFrames(),
  });
}

function schedulePreviewRender(delayMs = 60) {
  window.clearTimeout(previewRenderTimerId);
  previewRenderTimerId = window.setTimeout(() => {
    renderPreview().catch((error) => console.error(error));
  }, delayMs);
}

function updateRuntimeSummary() {
  const totalFrames = getTotalPreviewDurationFrames();
  const totalSeconds = (totalFrames / FPS).toFixed(1);
  elements.runtimeSummary.textContent = state.mainVideo ? `${state.segments.length} مقطع | ${totalSeconds}ث` : '';
  elements.previewSummary.textContent = state.mainVideo
    ? `المدة التقريبية: ${totalSeconds} ثانية | ${state.blurRegions.length} منطقة تمويه`
    : 'اختر فيديوًا رئيسيًا للبدء.';
}

function updateMainVideoLabel() {
  if (!state.mainVideo) {
    elements.mainVideoLabel.textContent = 'لم يتم الاختيار';
    return;
  }
  elements.mainVideoLabel.textContent = `${prettifyPath(state.mainVideo)} (${formatSeconds(state.mainVideoDurationMs)})`;
}

function renderSegmentsList() {
  elements.segmentList.innerHTML = '';
  if (!state.segments.length) {
    const empty = document.createElement('div');
    empty.className = 'muted-text';
    empty.textContent = 'سيظهر هنا المقطع الكامل بعد اختيار الفيديو.';
    elements.segmentList.appendChild(empty);
    return;
  }

  state.segments.forEach((segment, index) => {
    const card = document.createElement('div');
    card.className = 'editor-card';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem;">
        <strong>مقطع ${index + 1}</strong>
        <button type="button" class="btn-secondary" data-action="delete-segment" data-id="${segment.id}">حذف</button>
      </div>
      <label>
        <span class="field-caption">عنوان المقطع (اختياري)</span>
        <input type="text" class="input-v2" data-field="label" data-id="${segment.id}" value="${escapeAttr(segment.label || '')}" />
      </label>
      <div class="editor-grid">
        <label>
          <span class="field-caption">البداية (ث)</span>
          <input type="number" class="number-input" min="0" step="0.1" data-field="startMs" data-id="${segment.id}" value="${(segment.startMs / 1000).toFixed(1)}" />
        </label>
        <label>
          <span class="field-caption">النهاية (ث)</span>
          <input type="number" class="number-input" min="0" step="0.1" data-field="endMs" data-id="${segment.id}" value="${(segment.endMs / 1000).toFixed(1)}" />
        </label>
      </div>
      <div class="muted-text">المدة: ${formatSeconds(segment.endMs - segment.startMs)}</div>
    `;
    elements.segmentList.appendChild(card);
  });
}

function renderBlurRegionsList() {
  elements.blurList.innerHTML = '';
  if (!state.blurRegions.length) {
    const empty = document.createElement('div');
    empty.className = 'muted-text';
    empty.textContent = 'أضف منطقة تمويه لإخفاء منتج أو شعار أثناء العرض.';
    elements.blurList.appendChild(empty);
    return;
  }

  state.blurRegions.forEach((region, index) => {
    const blurDurationMs = Math.max(0, Number(region.endMs || 0) - Number(region.startMs || 0));
    const card = document.createElement('div');
    card.className = 'editor-card';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem;">
        <strong>تمويه ${index + 1}</strong>
        <button type="button" class="btn-secondary" data-action="delete-blur" data-id="${region.id}">حذف</button>
      </div>
      <div class="editor-grid-3">
        ${sliderFieldMarkup({ id: region.id, field: 'x', label: 'الموضع X', min: 0, max: 1920, step: 1, value: region.x })}
        ${sliderFieldMarkup({ id: region.id, field: 'y', label: 'الموضع Y', min: 0, max: 1080, step: 1, value: region.y })}
        ${sliderFieldMarkup({ id: region.id, field: 'blur', label: 'شدة البلار', min: 4, max: 64, step: 1, value: region.blur })}
      </div>
      <div class="editor-grid-3">
        ${sliderFieldMarkup({ id: region.id, field: 'width', label: 'العرض', min: 20, max: 1920, step: 1, value: region.width })}
        ${sliderFieldMarkup({ id: region.id, field: 'height', label: 'الارتفاع', min: 20, max: 1080, step: 1, value: region.height })}
        ${sliderFieldMarkup({ id: region.id, field: 'radius', label: 'دائرية الحواف', min: 0, max: 240, step: 1, value: region.radius ?? 12 })}
      </div>
      <div class="editor-grid-3">
        ${sliderFieldMarkup({ id: region.id, field: 'feather', label: '\u0646\u0639\u0648\u0645\u0629 \u0627\u0644\u062d\u062f\u0648\u062f', min: 0, max: 80, step: 1, value: region.feather ?? 0 })}
      </div>
      <label class="checkbox-row">
        <input type="checkbox" data-field="alwaysOn" data-id="${region.id}" ${region.alwaysOn !== false ? 'checked' : ''} />
        يعمل طول الوقت
      </label>
      <label class="checkbox-row">
        <input type="checkbox" data-field="motionEnabled" data-id="${region.id}" ${region.motionEnabled === true ? 'checked' : ''} />
        حركة يدوية من البداية للنهاية
      </label>
      <div class="editor-grid motion-fields" style="${region.motionEnabled === true ? '' : 'display:none;'}" data-motion-fields="${region.id}">
        ${sliderFieldMarkup({ id: region.id, field: 'endX', label: 'موضع النهاية X', min: 0, max: 1920, step: 1, value: region.endX ?? region.x })}
        ${sliderFieldMarkup({ id: region.id, field: 'endY', label: 'موضع النهاية Y', min: 0, max: 1080, step: 1, value: region.endY ?? region.y })}
      </div>
      <div class="editor-grid-3 blur-time-grid" style="${region.alwaysOn !== false ? 'display:none;' : ''}" data-time-fields="${region.id}">
        ${sliderFieldMarkup({ id: region.id, field: 'startMs', label: 'بداية التمويه', min: 0, max: Math.max(1, state.mainVideoDurationMs || 1000), step: 100, value: region.startMs })}
        ${sliderFieldMarkup({ id: region.id, field: 'endMs', label: 'نهاية التمويه', min: 100, max: Math.max(100, state.mainVideoDurationMs || 1000), step: 100, value: region.endMs })}
        <div class="slider-field">
          <span class="slider-head">
            <span class="field-caption">مدة التمويه</span>
            <span class="slider-value" data-duration-value="${region.id}">${formatSeconds(blurDurationMs)}</span>
          </span>
          <div class="slider-static" data-duration-static="${region.id}">${formatSeconds(blurDurationMs)}</div>
        </div>
      </div>
    `;
    elements.blurList.appendChild(card);
  });
}

function refreshBlurRegionCard(regionId) {
  const region = state.blurRegions.find((item) => item.id === regionId);
  const card = elements.blurList.querySelector(`input[data-id="${regionId}"]`)?.closest('.editor-card');
  if (!region || !card) return;

  const fields = ['x', 'y', 'endX', 'endY', 'blur', 'width', 'height', 'radius', 'feather', 'startMs', 'endMs'];
  fields.forEach((field) => {
    const input = card.querySelector(`[data-field="${field}"][data-id="${regionId}"]`);
    if (!input) return;
    input.value = String(region[field] ?? 0);
    const label = input.closest('.slider-field')?.querySelector('.slider-value');
    if (label) {
      label.textContent = formatBlurValue(field, region[field] ?? 0);
    }
  });

  const timeFields = card.querySelector(`[data-time-fields="${regionId}"]`);
  if (timeFields) {
    timeFields.style.display = region.alwaysOn !== false ? 'none' : '';
  }

  const motionFields = card.querySelector(`[data-motion-fields="${regionId}"]`);
  if (motionFields) {
    motionFields.style.display = region.motionEnabled === true ? '' : 'none';
  }

  const blurDurationMs = Math.max(0, Number(region.endMs || 0) - Number(region.startMs || 0));
  const durationLabel = card.querySelector(`[data-duration-value="${regionId}"]`);
  const durationStatic = card.querySelector(`[data-duration-static="${regionId}"]`);
  if (durationLabel) durationLabel.textContent = formatSeconds(blurDurationMs);
  if (durationStatic) durationStatic.textContent = formatSeconds(blurDurationMs);
}

function syncUI() {
  updateProjectStatusUi();
  updateMainVideoLabel();
  elements.frameSelect.value = state.frame || '';
  elements.fitModeSelect.value = state.fitMode;
  elements.backgroundBlurInput.value = String(state.blurBackgroundAmount);
  if (elements.backgroundBlurValue) elements.backgroundBlurValue.textContent = `${state.blurBackgroundAmount}px`;
  elements.backgroundScaleInput.value = String(state.backgroundScale);
  if (elements.backgroundScaleValue) elements.backgroundScaleValue.textContent = state.backgroundScale.toFixed(2);
  elements.blurredBgGroup.style.display = state.fitMode === 'blurred-background' ? '' : 'none';
  elements.keepSourceAudioCheckbox.checked = state.keepSourceAudio;
  elements.scaleInput.value = String(state.videoScale);
  elements.scaleValue.textContent = state.videoScale.toFixed(2);
  elements.xInput.value = String(state.videoX);
  elements.xValue.textContent = `${state.videoX}px`;
  elements.yInput.value = String(state.videoY);
  elements.yValue.textContent = `${state.videoY}px`;
  elements.textInput.value = state.text;
  elements.bottomOffsetInput.value = String(state.textBottomOffset);
  elements.bottomOffsetValue.textContent = `${state.textBottomOffset}px`;
  elements.fontSizeInput.value = String(state.textFontSize);
  elements.fontSizeValue.textContent = `${state.textFontSize}px`;
  elements.textPresetSelect.value = state.textPreset;
  elements.textAnimationSelect.value = state.textAnimationType;
  elements.bgMusicSelect.value = state.bgMusic || '';
  elements.bgMusicVolumeInput.value = String(state.bgMusicVolume);
  elements.bgMusicVolumeValue.textContent = `${state.bgMusicVolume}%`;
  if (elements.turboRenderCheckbox) {
    elements.turboRenderCheckbox.checked = state.turboMode !== false;
  }
  renderSegmentsList();
  renderBlurRegionsList();
  updateRuntimeSummary();
}

function buildLaqtatProjectData() {
  return {
    scene: {
      mainVideo: state.mainVideo,
      mainVideoUrl: state.mainVideoUrl,
      mainVideoDurationMs: state.mainVideoDurationMs,
      frame: state.frame,
      fitMode: state.fitMode,
      blurBackgroundAmount: state.blurBackgroundAmount,
      backgroundScale: state.backgroundScale,
      videoScale: state.videoScale,
      videoX: state.videoX,
      videoY: state.videoY,
      keepSourceAudio: state.keepSourceAudio,
      segments: state.segments.map((segment) => ({ ...segment })),
      blurRegions: state.blurRegions.map((region) => ({ ...region })),
    },
    text: {
      value: state.text,
      bottomOffset: state.textBottomOffset,
      fontSize: state.textFontSize,
      preset: state.textPreset,
      animationType: state.textAnimationType,
    },
    audio: {
      bgMusic: state.bgMusic,
      bgMusicVolume: state.bgMusicVolume,
    },
    render: {
      turboMode: state.turboMode !== false,
    },
    ui: {
      activeTab: document.querySelector('.tab-btn.active')?.dataset.target || 'tab-project',
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
    data: buildLaqtatProjectData(),
  };
}

function applyProjectMeta(project, filePath) {
  state.project.currentProjectPath = filePath || '';
  state.project.projectName = project?.projectName || (filePath ? prettifyPath(filePath).replace(/\.lqt$/i, '') : 'Laqtat Project');
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
      setStatus('خطأ', error?.message || 'فشل حفظ المشروع');
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
  const audio = data.audio || {};
  const render = data.render || {};
  const ui = data.ui || {};

  isApplyingProjectData = true;
  try {
    state.mainVideo = scene.mainVideo || '';
    state.mainVideoUrl = scene.mainVideoUrl || (state.mainVideo ? window.desktopApi.toFileUrl(state.mainVideo) : '');
    state.mainVideoDurationMs = Number(scene.mainVideoDurationMs || 0);
    state.frame = scene.frame || '';
    state.fitMode = scene.fitMode || 'blurred-background';
    state.blurBackgroundAmount = Number(scene.blurBackgroundAmount || 36);
    state.backgroundScale = Number(scene.backgroundScale || 1.18);
    state.videoScale = Number(scene.videoScale || 1);
    state.videoX = Number(scene.videoX || 0);
    state.videoY = Number(scene.videoY || 0);
    state.keepSourceAudio = scene.keepSourceAudio === true;
    state.segments = Array.isArray(scene.segments) ? scene.segments.map((segment) => ({ ...segment })) : [];
    state.blurRegions = Array.isArray(scene.blurRegions) ? scene.blurRegions.map((region) => ({ ...region })) : [];
    state.text = typeof text.value === 'string' ? text.value : '';
    state.textBottomOffset = Number(text.bottomOffset || 160);
    state.textFontSize = Number(text.fontSize || 46);
    state.textPreset = TEXT_PRESET_VALUES.includes(text.preset) ? text.preset : 'dark';
    state.textAnimationType = text.animationType || 'motion-blur';
    state.bgMusic = audio.bgMusic || '';
    state.bgMusicVolume = Number(audio.bgMusicVolume || 25);
    state.turboMode = render.turboMode !== false;
    normalizeSegments();
    normalizeBlurRegions();
    syncUI();
    activateTab(ui.activeTab || 'tab-project');
    applyProjectMeta(project, filePath);
    await renderPreview();
  } finally {
    isApplyingProjectData = false;
  }
}

async function openProjectFromDisk() {
  const result = await window.projectApi.openProject({
    isDirty: state.project.isDirty,
    project: buildProjectPayload(),
  });
  if (!result?.success) {
    setStatus('خطأ', result?.error || 'تعذر فتح المشروع', true);
    return;
  }
  if (result.canceled) return;
  await applyOpenedProject(result.project, result.filePath);
  setStatus('المشروع', 'تم فتح المشروع بنجاح');
}

function activateTab(tabId) {
  elements.tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.target === tabId);
  });
  elements.tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabId);
  });
}

async function handleMainVideoSelection(result) {
  if (!result?.path || !result?.url) return;
  state.mainVideo = result.path;
  state.mainVideoUrl = result.url;
  try {
    state.mainVideoDurationMs = await readMediaDurationMs(result.url, 10000);
  } catch {
    state.mainVideoDurationMs = 10000;
  }
  if (!state.segments.length) {
    state.segments = [{
      id: createId('segment'),
      label: 'المقطع الكامل',
      startMs: 0,
      endMs: state.mainVideoDurationMs,
    }];
  } else {
    normalizeSegments();
  }
  normalizeBlurRegions();
  syncUI();
  markProjectDirty();
  await renderPreview();
}

function updateAssets(assets) {
  state.assets = assets || state.assets;
  formatAssetOptions(elements.frameSelect, state.assets.frem_mutadawel || [], 'بدون إطار');
  formatAssetOptions(elements.bgMusicSelect, state.assets.music || [], 'بدون موسيقى');
}

function appendSegment() {
  const limit = Math.max(1000, state.mainVideoDurationMs || 10000);
  const last = state.segments[state.segments.length - 1];
  const fallbackStart = last ? clamp(last.endMs - 3000, 0, limit - 1000) : 0;
  const fallbackEnd = last ? clamp(last.endMs, fallbackStart + 1000, limit) : limit;
  state.segments.push({
    id: createId('segment'),
    label: '',
    startMs: fallbackStart,
    endMs: fallbackEnd,
  });
  normalizeSegments();
  syncUI();
  markProjectDirty();
  renderPreview();
}

function appendBlurRegion() {
  const limit = Math.max(1000, state.mainVideoDurationMs || 10000);
  state.blurRegions.push({
    id: createId('blur'),
    x: 830,
    y: 420,
    endX: 830,
    endY: 420,
    width: 260,
    height: 160,
    blur: 24,
    radius: 12,
    feather: 0,
    motionEnabled: false,
    alwaysOn: true,
    startMs: 0,
    endMs: limit,
  });
  normalizeBlurRegions();
  syncUI();
  markProjectDirty();
  renderPreview();
}

function handleSegmentsInput(event) {
  const target = event.target;
  const id = target.dataset.id;
  const field = target.dataset.field;
  if (!id || !field) return;
  const segment = state.segments.find((item) => item.id === id);
  if (!segment) return;
  if (field === 'label') {
    segment.label = target.value;
  } else if (field === 'startMs' || field === 'endMs') {
    segment[field] = Math.round(Number(target.value || 0) * 1000);
  }
  normalizeSegments();
  syncUI();
  markProjectDirty();
  renderPreview();
}

function handleBlurInput(event) {
  const target = event.target;
  const id = target.dataset.id;
  const field = target.dataset.field;
  if (!id || !field) return;
  const region = state.blurRegions.find((item) => item.id === id);
  if (!region) return;
  if (field === 'alwaysOn') {
    region.alwaysOn = target.checked;
  } else if (field === 'motionEnabled') {
    region.motionEnabled = target.checked;
    if (region.motionEnabled) {
      region.endX = Number.isFinite(Number(region.endX)) ? Number(region.endX) : region.x;
      region.endY = Number.isFinite(Number(region.endY)) ? Number(region.endY) : region.y;
    }
  } else if (field === 'startMs' || field === 'endMs') {
    region[field] = Math.round(Number(target.value || 0) * 1000);
  } else {
    region[field] = Number(target.value || 0);
  }
  normalizeBlurRegions();
  refreshBlurRegionCard(id);
  markProjectDirty();
  schedulePreviewRender();
}

function attachDynamicListHandlers() {
  elements.segmentList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="delete-segment"]');
    if (!button) return;
    state.segments = state.segments.filter((segment) => segment.id !== button.dataset.id);
    normalizeSegments();
    syncUI();
    markProjectDirty();
    renderPreview();
  });
  elements.segmentList.addEventListener('input', handleSegmentsInput);

  elements.blurList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="delete-blur"]');
    if (!button) return;
    state.blurRegions = state.blurRegions.filter((region) => region.id !== button.dataset.id);
    normalizeBlurRegions();
    syncUI();
    markProjectDirty();
    renderPreview();
  });
  elements.blurList.addEventListener('input', handleBlurInput);
  elements.blurList.addEventListener('change', handleBlurInput);
}

function bindStaticEvents() {
  elements.tabButtons.forEach((button) => {
    button.addEventListener('click', () => activateTab(button.dataset.target));
  });

  elements.projectSaveBtn.addEventListener('click', () => saveCurrentProject());
  elements.projectOpenBtn.addEventListener('click', openProjectFromDisk);
  elements.pickMainVideoBtn.addEventListener('click', async () => {
    const result = await window.desktopApi.pickMainVideo();
    await handleMainVideoSelection(result);
  });
  elements.frameSelect.addEventListener('change', async (event) => {
    state.frame = event.target.value;
    syncUI();
    markProjectDirty();
    await renderPreview();
  });
  elements.fitModeSelect.addEventListener('change', async (event) => {
    state.fitMode = event.target.value;
    syncUI();
    markProjectDirty();
    await renderPreview();
  });
  elements.backgroundBlurInput.addEventListener('input', async (event) => {
    state.blurBackgroundAmount = clamp(Number(event.target.value || 36), 8, 80);
    if (elements.backgroundBlurValue) elements.backgroundBlurValue.textContent = `${state.blurBackgroundAmount}px`;
    markProjectDirty();
    schedulePreviewRender();
  });
  elements.backgroundScaleInput.addEventListener('input', async (event) => {
    state.backgroundScale = clamp(Number(event.target.value || 1.18), 1, 2);
    if (elements.backgroundScaleValue) elements.backgroundScaleValue.textContent = state.backgroundScale.toFixed(2);
    markProjectDirty();
    schedulePreviewRender();
  });
  elements.keepSourceAudioCheckbox.addEventListener('change', async (event) => {
    state.keepSourceAudio = event.target.checked;
    markProjectDirty();
    await renderPreview();
  });

  [
    [elements.scaleInput, 'videoScale', (value) => clamp(Number(value || 1), 0.5, 3)],
    [elements.xInput, 'videoX', (value) => Number(value || 0)],
    [elements.yInput, 'videoY', (value) => Number(value || 0)],
    [elements.bottomOffsetInput, 'textBottomOffset', (value) => Number(value || 160)],
    [elements.fontSizeInput, 'textFontSize', (value) => Number(value || 46)],
    [elements.bgMusicVolumeInput, 'bgMusicVolume', (value) => Number(value || 25)],
  ].forEach(([element, key, parser]) => {
    element.addEventListener('input', async (event) => {
      state[key] = parser(event.target.value);
      if (key === 'videoScale') elements.scaleValue.textContent = state.videoScale.toFixed(2);
      if (key === 'videoX') elements.xValue.textContent = `${state.videoX}px`;
      if (key === 'videoY') elements.yValue.textContent = `${state.videoY}px`;
      if (key === 'textBottomOffset') elements.bottomOffsetValue.textContent = `${state.textBottomOffset}px`;
      if (key === 'textFontSize') elements.fontSizeValue.textContent = `${state.textFontSize}px`;
      if (key === 'bgMusicVolume') elements.bgMusicVolumeValue.textContent = `${state.bgMusicVolume}%`;
      markProjectDirty();
      schedulePreviewRender();
    });
  });

  elements.textInput.addEventListener('input', async (event) => {
    state.text = event.target.value;
    markProjectDirty();
    await renderPreview();
  });
  elements.textPresetSelect.addEventListener('change', async (event) => {
    state.textPreset = event.target.value;
    markProjectDirty();
    await renderPreview();
  });
  elements.textAnimationSelect.addEventListener('change', async (event) => {
    state.textAnimationType = event.target.value;
    markProjectDirty();
    await renderPreview();
  });
  elements.bgMusicSelect.addEventListener('change', async (event) => {
    state.bgMusic = event.target.value;
    markProjectDirty();
    await renderPreview();
  });

  elements.addSegmentBtn.addEventListener('click', appendSegment);
  elements.addBlurBtn.addEventListener('click', appendBlurRegion);
  elements.openOutputBtn.addEventListener('click', () => window.desktopApi.openOutputFolder());
  elements.turboRenderCheckbox?.addEventListener('change', () => {
    state.turboMode = elements.turboRenderCheckbox.checked;
    markProjectDirty();
  });
  elements.refreshAssetsBtn.addEventListener('click', async () => {
    try {
      state.assets = await window.desktopApi.refreshAssets();
      updateAssets(state.assets);
      syncUI();
      await renderPreview();
    } catch (error) {
      console.error(error);
      setStatus('خطأ', error?.message || 'تعذر تحديث الأصول', true);
    }
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
    elements.cancelRenderBtn.style.display = 'inline-flex';
    setNavInteractivity(false);
    elements.renderResult.classList.add('is-hidden');
    elements.renderResult.innerHTML = '';
    setStatus('جاري الرندر', 'يتم الآن تجهيز فيديو لقطات.');
    setProgress(0.02, 'بدء مهمة الرندر...');

    try {
      const payload = {
        model: 'laqtat',
        compositionId: 'LaqtatVideo',
        mainVideo: state.mainVideo,
        mainVideoDurationMs: state.mainVideoDurationMs || 0,
        frame: state.frame || null,
        fitMode: state.fitMode,
        blurBackgroundAmount: state.blurBackgroundAmount,
        backgroundScale: state.backgroundScale,
        keepSourceAudio: state.keepSourceAudio,
        segments: state.segments.map((segment) => ({ ...segment })),
        blurRegions: state.blurRegions.map((region) => ({ ...region })),
        text: state.text || '',
        videoScale: Number(state.videoScale || 1),
        videoX: Number(state.videoX || 0),
        videoY: Number(state.videoY || 0),
        effects: [],
        textBottomOffset: Number(state.textBottomOffset || 160),
        textFontSize: Number(state.textFontSize || 46),
        textPreset: state.textPreset || 'dark',
        textAnimationType: state.textAnimationType || 'motion-blur',
        cinematicBarSize: Number(state.cinematicBarSize || 6),
        bgMusic: state.bgMusic || null,
        bgMusicVolume: Number((state.bgMusicVolume || 0) / 100),
        turboMode: state.turboMode !== false,
      };
      const result = await window.desktopApi.render(payload);
      setStatus('اكتمل الرندر', 'تم حفظ فيديو لقطات بنجاح');
      setProgress(1, 'اكتمل الرندر');
      elements.renderResult.classList.remove('is-hidden');
      elements.renderResult.innerHTML = result?.outputPath
        ? `تم حفظ الفيديو: <span class="muted-text">${result.outputPath}</span>
           <span class="result-actions">
             <button id="laqtat-reveal-file-btn" class="btn-secondary" type="button">إظهار الملف</button>
             <button id="laqtat-open-folder-btn" class="btn-secondary" type="button">فتح المجلد</button>
           </span>`
        : 'اكتمل الرندر.';
      document.getElementById('laqtat-reveal-file-btn')?.addEventListener('click', () => {
        window.desktopApi.revealInFolder(result.outputPath);
      });
      document.getElementById('laqtat-open-folder-btn')?.addEventListener('click', () => {
        window.desktopApi.openOutputFolder();
      });
    } catch (error) {
      console.error(error);
      setStatus('فشل الرندر', error?.message || 'تعذر إكمال الرندر', true);
      setProgress(-1);
      elements.renderResult.classList.remove('is-hidden');
      elements.renderResult.textContent = error?.message || 'تعذر إكمال الرندر';
    } finally {
      state.isRendering = false;
      elements.renderBtn.disabled = false;
      elements.renderBtn.style.display = 'inline-flex';
      elements.cancelRenderBtn.style.display = 'none';
      setNavInteractivity(true);
    }
  });

  elements.cancelRenderBtn.addEventListener('click', async () => {
    const canceled = await window.desktopApi.cancelRender({ model: 'laqtat' });
    if (canceled) {
      setStatus('تم الإيقاف', 'تم إيقاف عملية الرندر بناءً على طلبك.');
      setProgress(-1);
    }
  });

  attachDynamicListHandlers();
}

async function bootstrap() {
  const data = await window.desktopApi.bootstrap();
  state.assets = data.assets || state.assets;
  state.appVersion = data.appVersion || state.appVersion;
  if (data.logoDataUrl) {
    elements.brandLogo.src = data.logoDataUrl;
  }
  updateAssets(data.assets);
  syncUI();
  previewApi()?.mount?.(elements.previewStage);
  await renderPreview();
  bindStaticEvents();
  lucide.createIcons();
  const unsubscribe = window.desktopApi.onRenderProgress((payload) => {
    if (!payload) return;
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
  window.addEventListener('beforeunload', () => {
    unsubscribe?.();
    previewApi()?.destroy?.();
  });
}

bootstrap().catch((error) => {
  console.error(error);
  setStatus('تعذر التشغيل', error?.message || 'فشل تهيئة واجهة لقطات');
});
