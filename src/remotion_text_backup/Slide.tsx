import React from 'react';
import { AbsoluteFill, Img, Video, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SlideData, TextPreset, TEXT_PRESETS } from './types';
import { getEffectByIndex, TransitionOverlay, TransitionType } from './Transitions';

// ── Load custom Arabic font into Remotion canvas ─────────────────────────────
// staticFile resolves to the /public folder which Remotion bundles
const FONT_FAMILY = 'AvenirArabic';
if (typeof document !== 'undefined') {
  const fontUrl = staticFile('assets/fonts/alfont_com_AlFont_com_AvenirArabic-Heavy.otf');
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${FONT_FAMILY}';
      src: url('${fontUrl}') format('opentype');
      font-weight: bold;
      font-style: normal;
    }
  `;
  if (!document.head.querySelector(`[data-font="${FONT_FAMILY}"]`)) {
    style.setAttribute('data-font', FONT_FAMILY);
    document.head.appendChild(style);
  }
}

// ─── Transition style applied to the WHOLE slide container ───────────────────
function getSlideContainerStyle(
  type: TransitionType,
  frame: number,
  durationFrames: number
): React.CSSProperties {
  const d = durationFrames;

  if (type === 'fade' || type === 'light-leak') {
    return {
      opacity: interpolate(frame, [0, d], [0, 1], { extrapolateRight: 'clamp' }),
    };
  }

  // Blur Dissolve — starts blurry+transparent, resolves to sharp+opaque (no direction)
  if (type === 'blur-wipe') {
    const blur = interpolate(frame, [0, d * 0.6, d], [22, 8, 0], { extrapolateRight: 'clamp' });
    const opacity = interpolate(frame, [0, d * 0.4, d], [0, 0.6, 1], { extrapolateRight: 'clamp' });
    return { filter: `blur(${blur}px)`, opacity };
  }

  return {};
}

// ─── Slide ───────────────────────────────────────────────────────────────────
export const Slide: React.FC<{
  slide: SlideData;
  index: number;
  isFirst: boolean;
  textBottomOffset: number;
  textFontSize: number;
  textPreset: TextPreset;
  textAnimationType: 'motion-blur' | 'typewriter';
}> = ({ slide, index, isFirst, textBottomOffset, textFontSize, textPreset, textAnimationType }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const TRANSITION_FRAMES = 30;

  const isZoomIn = index % 2 === 0;
  const startScale = isZoomIn ? 1.0 : 1.12;
  const endScale = isZoomIn ? 1.12 : 1.0;
  
  const scale = interpolate(frame, [0, durationInFrames], [startScale, endScale], {
    extrapolateRight: 'clamp',
  });

  const transitionType = getEffectByIndex(index);

  const transitionStyle = isFirst
    ? {}
    : getSlideContainerStyle(transitionType, frame, TRANSITION_FRAMES);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        ...transitionStyle,
      }}
    >
      {/\.(mp4|mov|webm|mkv)$/i.test(slide.imageUrl) ? (
        <Video
          src={slide.imageUrl}
          muted={slide.isMuted !== false}
          style={{
            width: 1920,
            height: 1080,
            objectFit: 'cover',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        />
      ) : (
        <Img
          src={slide.imageUrl}
          style={{
            width: 1920,
            height: 1080,
            objectFit: 'cover',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        />
      )}

      {slide.text ? (
        <Subtitle
          text={slide.text}
          bottomOffset={textBottomOffset}
          fontSize={textFontSize}
          preset={textPreset}
          textAnimationType={textAnimationType}
        />
      ) : null}

      {!isFirst && (
        <TransitionOverlay
          type={transitionType}
          frameInTransition={frame}
          duration={TRANSITION_FRAMES}
        />
      )}
    </AbsoluteFill>
  );
};

// ─── Subtitle ────────────────────────────────────────────────────────────────
const TYPEWRITER_START = 22;
const FRAMES_PER_CHAR = 1;
const CURSOR_BLINK_RATE = 8;
const isRTL = (s: string) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(s);

const Subtitle: React.FC<{
  text: string;
  bottomOffset: number;
  fontSize: number;
  preset: TextPreset;
  textAnimationType: 'motion-blur' | 'typewriter';
}> = ({ text, bottomOffset, fontSize, preset, textAnimationType }) => {
  const frame = useCurrentFrame();
  const { bg, color, border } = TEXT_PRESETS[preset] ?? TEXT_PRESETS.dark;

  // Use Intl.Segmenter for grapheme-safe typing
  const segmenter = React.useMemo(() => new Intl.Segmenter('ar', { granularity: 'grapheme' }), []);
  const segments = React.useMemo(() => Array.from(segmenter.segment(text.normalize('NFC'))).map(s => s.segment), [text, segmenter]);

  // General entrance configs
  const ENTRY_DUR = 18;
  const isTypewriter = textAnimationType === 'typewriter';

  // Fade-in + slide-up (mainly for motion-blur)
  const entryOpacity = interpolate(frame, [0, ENTRY_DUR], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const entryYOffset = interpolate(frame, [0, ENTRY_DUR], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const entryBlur = interpolate(frame, [0, ENTRY_DUR], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Continuous pan right (cinematic drift for full slide duration)
  const xOffset = interpolate(frame, [0, 210], [0, 222], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Typewriter exact logic
  const charsToShow = Math.min(segments.length, Math.max(0, Math.floor((frame - TYPEWRITER_START) / FRAMES_PER_CHAR)));
  const visibleText = isTypewriter ? segments.slice(0, charsToShow).join('') : text;
  const isTyping = isTypewriter && charsToShow < segments.length;
  const cursorOn = isTyping && Math.floor(frame / CURSOR_BLINK_RATE) % 2 === 0;

  // Animated top stroke
  const isArabic = isRTL(text);
  const strokeProgress = interpolate(frame, [0, 180], [0, 100], { extrapolateRight: 'clamp' });
  const strokeHeight = Math.max(3, Math.round(fontSize * 0.07));

  // Glass shine
  const slideDurationFrames = 150; // 5s slide at 30fps
  const glassProgress = interpolate(frame, [0, Math.floor(slideDurationFrames / 2)], [-120, 200], { extrapolateRight: 'clamp' });

  // Box entrance
  const boxOpacity = isTypewriter ? Math.min(1, frame / 10) : entryOpacity;
  const filter = isTypewriter ? 'none' : `blur(${entryBlur}px)`;
  const yOffsetAnimated = isTypewriter ? 0 : entryYOffset;

  // Gradient vignette height depends on where text sits
  const gradientHeight = Math.max(20, Math.round((bottomOffset / 1080) * 100) + 12);

  return (
    <>
      {/* Gradient vignette — scales with text position */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${gradientHeight}%`,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)',
          opacity: boxOpacity, pointerEvents: 'none',
        }}
      />

      {/* Text container */}
      <div
        style={{
          position: 'absolute', bottom: `${bottomOffset}px`, width: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          opacity: boxOpacity, filter,
          transform: `translateY(${yOffsetAnimated}px) translateX(${xOffset}px)`,
        }}
      >
        <div
          style={{
            position: 'relative', overflow: 'hidden',
            backgroundColor: bg, color, padding: `${Math.round(fontSize * 0.22)}px ${Math.round(fontSize * 0.65)}px`,
            borderRadius: '12px', fontSize: `${fontSize}px`,
            fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
            fontWeight: 'bold', textAlign: 'center', maxWidth: '80%', lineHeight: 1.5,
            boxShadow: '0 8px 32px rgba(0,0,0,0.55)', border: `1px solid ${border}`, backdropFilter: 'blur(8px)',
            direction: isArabic ? 'rtl' : 'ltr', minWidth: '200px', letterSpacing: '0.5px',
          }}
        >
          {/* Animated top stroke */}
          <div
            style={{
              position: 'absolute', top: 0, left: isArabic ? 'auto' : 0, right: isArabic ? 0 : 'auto',
              height: `${strokeHeight}px`, width: `${strokeProgress}%`, backgroundColor: color, opacity: 0.85,
            }}
          />

          {/* Glass shine layer */}
          <div
            style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, width: '40%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              transform: `translateX(${glassProgress}%) skewX(-20deg)`,
              pointerEvents: 'none',
              opacity: frame > Math.floor(slideDurationFrames / 2) ? 0 : 1,
            }}
          />

          {isTypewriter && (
            <span style={{ color: 'transparent', userSelect: 'none', pointerEvents: 'none' }}>
              {text}
            </span>
          )}

          <div style={isTypewriter ? { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: `${Math.round(fontSize * 0.22)}px ${Math.round(fontSize * 0.65)}px`, direction: isArabic ? 'rtl' : 'ltr' } : {}}>
            {visibleText}
            {cursorOn && (
              <span style={{ display: 'inline-block', width: '3px', height: '0.85em', backgroundColor: color, marginRight: '4px', verticalAlign: 'middle', borderRadius: '2px', opacity: 0.8 }} />
            )}
          </div>

        </div>
      </div>
    </>
  );
};
