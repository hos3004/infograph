const TEXT_PRESET_STYLES = {
  dark: { bg: 'rgba(0, 0, 0, 0.68)', color: '#ffffff', border: 'rgba(255, 255, 255, 0.14)' },
  gold: { bg: 'rgba(160, 90, 0, 0.88)', color: '#fff8e0', border: 'rgba(255, 220, 80, 0.35)' },
  blue: { bg: 'rgba(0, 45, 130, 0.9)', color: '#e8f0ff', border: 'rgba(80, 140, 255, 0.35)' },
  red: { bg: 'rgba(160, 10, 10, 0.88)', color: '#ffe8e8', border: 'rgba(255, 80, 80, 0.35)' },
  orange: { bg: 'rgba(230, 90, 0, 0.95)', color: '#ffffff', border: 'rgba(255, 180, 60, 0.55)' },
};

const FPS = 30;
const TRANSITION_OPTIONS = ['fade', 'light-leak', 'blur-wipe'];

const state = {
  assets: { overlays: [], music: [], endpage: [] },
  slides: [],
  overlay: '',
  music: '',
  endPage: '',
  effects: ['dust', 'light-leak', 'bokeh'],
  textPreset: 'dark',
  textFontSize: 46,
  textBottomOffset: 160,
  slideDurationInSeconds: 5,
  endPageDurationFrames: 0,
  isRendering: false,
  lastRender: null,
  selectedSlideId: null,
  draggedSlideId: null,
  dragOverSlideId: null,
  previewPlaying: false,
  previewMuted: false,
  previewPositionMs: 0,
  previewRafId: null,
  previewStartedAt: 0,
};

const elements = {
  brandLogo: document.getElementById('brand-logo'),
  overlaySelect: document.getElementById('overlay-select'),
  musicSelect: document.getElementById('music-select'),
  endPageSelect: document.getElementById('endpage-select'),
  endPageDurationHint: document.getElementById('endpage-duration-hint'),
  textPresetSelect: document.getElementById('text-preset-select'),
  textPresetButtons: Array.from(document.querySelectorAll('[data-preset]')),
  fontSizeInput: document.getElementById('font-size-input'),
  fontSizeValue: document.getElementById('font-size-value'),
  bottomOffsetInput: document.getElementById('bottom-offset-input'),
  bottomOffsetValue: document.getElementById('bottom-offset-value'),
  slideDurationInput: document.getElementById('slide-duration-input'),
  pickSlidesBtn: document.getElementById('pick-slides-btn'),
  refreshAssetsBtn: document.getElementById('refresh-assets-btn'),
  renderBtn: document.getElementById('render-btn'),
  openOutputBtn: document.getElementById('open-output-btn'),
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

function updateRangeVisual(input) {
  const min = Number(input.min || 0);
  const max = Number(input.max || 100);
  const value = Number(input.value || min);
  const ratio = max > min ? ((value - min) / (max - min)) * 100 : 0;
  input.style.setProperty('--range-fill', `${ratio}%`);
}

function syncTextSettingsUi() {
  elements.bottomOffsetValue.textContent = `${state.textBottomOffset}px`;
  elements.fontSizeValue.textContent = `${state.textFontSize}px`;
  elements.bottomOffsetInput.value = String(state.textBottomOffset);
  elements.fontSizeInput.value = String(state.textFontSize);
  elements.textPresetSelect.value = state.textPreset;

  [elements.bottomOffsetInput, elements.fontSizeInput].forEach(updateRangeVisual);

  elements.textPresetButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.preset === state.textPreset);
  });
}

function isVideoFile(value) {
  return /\.(mp4|mov|webm|m4v)$/i.test(value || '');
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
    state.endPage = '';
    state.endPageDurationFrames = 0;
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
    })),
    overlay: overlayAsset ? overlayAsset.url : null,
    music: musicAsset ? musicAsset.url : null,
    endPage: endPageAsset ? endPageAsset.url : null,
    slideDurationInSeconds: Number(state.slideDurationInSeconds || 5),
    effects: [...state.effects],
    endPageDurationFrames: Number(state.endPageDurationFrames || 0),
    textBottomOffset: Number(state.textBottomOffset || 160),
    textFontSize: Number(state.textFontSize || 46),
    textPreset: state.textPreset,
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

  window.DesktopRemotionPreview.update({
    inputProps: buildExactPreviewInputProps(),
    durationInFrames: getExactPreviewDurationInFrames(),
  });

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
}

function reorderSlidesById(draggedSlideId, targetSlideId) {
  if (!draggedSlideId || !targetSlideId || draggedSlideId === targetSlideId) {
    return;
  }

  const fromIndex = state.slides.findIndex((slide) => slide.id === draggedSlideId);
  const toIndex = state.slides.findIndex((slide) => slide.id === targetSlideId);
  moveSlide(fromIndex, toIndex);
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
  const thumb = document.createElement('img');
  thumb.className = 'slide-thumb';
  thumb.src = slide.fileUrl;
  thumb.alt = `Slide ${index + 1}`;
  thumbWrap.appendChild(thumb);

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
  elements.slidesList.innerHTML = '';
  elements.slidesCount.textContent = String(state.slides.length);
  elements.emptyState.style.display = state.slides.length === 0 ? 'block' : 'none';

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

async function refreshAssets() {
  state.assets = await window.desktopApi.refreshAssets();
  syncAssetControlsV2();
  renderPreviewFrame();
}

function buildRenderPayload() {
  return {
    slides: state.slides.map((slide) => ({
      id: slide.id,
      imagePath: slide.imagePath,
      text: slide.text || '',
    })),
    overlay: state.overlay || null,
    music: state.music || null,
    endPage: state.endPage || null,
    effects: state.effects,
    slideDurationInSeconds: Number(state.slideDurationInSeconds),
    endPageDurationFrames: Number(state.endPageDurationFrames || 0),
    textBottomOffset: Number(state.textBottomOffset),
    textFontSize: Number(state.textFontSize),
    textPreset: state.textPreset,
  };
}

async function handleRender() {
  if (state.slides.length === 0 || state.isRendering) {
    return;
  }

  state.isRendering = true;
  elements.renderBtn.disabled = true;
  elements.renderResult.innerHTML = '';
  setStatus('جاري الرندر', 'يتم الآن تجهيز الفيديو.');
  setProgress(0.02, 'بدء مهمة الرندر...');

  try {
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
  } catch (error) {
    setStatus('فشل الرندر', error.message || 'حدث خطأ غير متوقع أثناء الرندر.');
    setProgress(0, 'فشل الرندر');
  } finally {
    state.isRendering = false;
    elements.renderBtn.disabled = false;
  }
}

async function bootstrap() {
  ensurePreviewShell();

  const bootstrapPayload = await window.desktopApi.bootstrap();
  state.assets = bootstrapPayload.assets;
  ensureDesktopFont(bootstrapPayload.fontDataUrl);
  const logoPath = `${bootstrapPayload.assetsDir.replace(/[\\/]+$/, '')}\\logo.png`;
  elements.brandLogo.src = bootstrapPayload.logoDataUrl || window.desktopApi.toFileUrl(logoPath);
  elements.runtimeSummary.textContent =
    `Mode: ${bootstrapPayload.mode} | Assets: ${bootstrapPayload.assetsDir} | Output: ${bootstrapPayload.outputDir}`;
  elements.runtimeSummary.title = elements.runtimeSummary.textContent;

  syncAssetControlsV2();
  renderSlides();
  setStatus('رندر الفيديو', '');
  setProgress(0, 'لم يبدأ الرندر بعد');
}

async function handlePickSlides() {
  const pickedSlides = await window.desktopApi.pickSlides();
  if (pickedSlides.length === 0) {
    return;
  }

  state.slides = [...state.slides, ...pickedSlides];
  state.selectedSlideId = state.selectedSlideId || pickedSlides[0].id;
  renderSlides();
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

elements.overlaySelect.addEventListener('change', (event) => {
  state.overlay = event.target.value;
  renderPreviewFrame();
});

elements.musicSelect.addEventListener('change', (event) => {
  state.music = event.target.value;
  renderPreviewFrame();
});

elements.endPageSelect.addEventListener('change', async (event) => {
  state.endPage = event.target.value;
  const endPageAsset = findEndPageAsset();
  state.endPageDurationFrames = endPageAsset ? await detectVideoDurationFrames(endPageAsset.url) : 0;
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

elements.slideDurationInput.addEventListener('input', (event) => {
  state.slideDurationInSeconds = Number(event.target.value);
  const timeline = getPreviewTimeline();
  state.previewPositionMs = clamp(state.previewPositionMs, 0, timeline.totalMs || 0);
  renderPreviewFrame();
});

elements.effectCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    collectEffects();
    renderPreviewFrame();
  });
});

elements.textPresetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.textPreset = button.dataset.preset || 'dark';
    syncTextSettingsUi();
    renderPreviewFrame();
  });
});

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

bootstrap();
