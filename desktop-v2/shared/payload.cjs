const fs = require('fs');
const { resolveAssetPath } = require('./assets.cjs');


const ALLOWED_EFFECTS = new Set(['dust', 'light-leak', 'bokeh', 'scanlines', 'grain', 'vignette', 'cinematic-bars']);
const ALLOWED_PRESETS = new Set(['dark', 'gold', 'blue', 'red', 'orange']);
const ALLOWED_TEXT_ANIMATIONS = new Set([
  'motion-blur',
  'typewriter',
  'live-reveal-dot',
  'broadcast-split',
  'number-hero',
  'layered-title',
  'morph-compare',
  'impact-shock',
  'word-by-word',
  'timeline-marker',
  'cinematic-reveal',
  'split-lines-stagger',
  'highlight-sweep',
  'kinetic-keyword',
]);

function normalizeSlides(slides) {
  return (Array.isArray(slides) ? slides : [])
    .filter((slide) => slide && slide.imagePath)
    .map((slide, index) => ({
      id: slide.id || `slide-${Date.now()}-${index}`,
      imagePath: slide.imagePath,
      text: typeof slide.text === 'string' ? slide.text : '',
      isMuted: slide.isMuted !== false,
    }));
}

function normalizeNumber(value, fallback) {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : fallback;
}

function resolveMediaPath(paths, type, value) {
  if (!value) return null;
  // If it's already a full absolute path that exists on disk, use it directly
  if (fs.existsSync(value)) return value;
  // Otherwise treat it as a filename and look it up in the assets directories
  return resolveAssetPath(paths, type, value);
}

function normalizeRenderPayload(paths, payload) {
  const slides = normalizeSlides(payload.slides);
  if (slides.length === 0) {
    throw new Error('No slides selected');
  }

  const overlayPath = resolveMediaPath(paths, 'overlay', payload.overlay);
  const musicPath   = resolveMediaPath(paths, 'music',   payload.music);
  const endPagePath = resolveMediaPath(paths, 'endPage', payload.endPage);
  const detectedEndPageFrames = normalizeNumber(payload.endPageDurationFrames, 0);

  const effects = (Array.isArray(payload.effects) ? payload.effects : []).filter((effect) => ALLOWED_EFFECTS.has(effect));
  const textPreset = ALLOWED_PRESETS.has(payload.textPreset) ? payload.textPreset : 'orange';

  return {
    slides,
    overlayPath,
    musicPath,
    voiceoverPath: typeof payload.voiceover === 'string' ? payload.voiceover : null,
    endPagePath,
    slideDurationInSeconds: normalizeNumber(payload.slideDurationInSeconds, 5),
    effects,
    endPageDurationFrames: endPagePath && detectedEndPageFrames <= 0 ? 5 * 25 : detectedEndPageFrames,
    textBottomOffset: normalizeNumber(payload.textBottomOffset, 160),
    textFontSize: normalizeNumber(payload.textFontSize, 65),
    textPreset,
    textAnimationType: ALLOWED_TEXT_ANIMATIONS.has(payload.textAnimationType) ? payload.textAnimationType : 'motion-blur',
    parallaxEnabled: payload.parallaxEnabled !== false,
    cinematicBarSize: normalizeNumber(payload.cinematicBarSize, 6),
    musicVolume: normalizeNumber(payload.musicVolume, 50),
    voiceoverVolume: normalizeNumber(payload.voiceoverVolume, 100),
  };
}

module.exports = {
  normalizeRenderPayload,
};
