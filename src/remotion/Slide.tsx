import React from 'react';
import { AbsoluteFill, Img, Video, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SlideData, TextPreset, TEXT_PRESETS } from './types';
import { getEffectByIndex, TransitionOverlay, TransitionType } from './Transitions';

// ── Load custom Arabic font into Remotion canvas ─────────────────────────────
// staticFile resolves to the /public folder which Remotion bundles
const FONT_FAMILY = 'RB';
if (typeof document !== 'undefined') {
  const fontUrl = staticFile('assets/fonts/rb.ttf');
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${FONT_FAMILY}';
      src: url('${fontUrl}') format('truetype');
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
          isFirst={isFirst}
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
  isFirst: boolean;
}> = ({ text, bottomOffset, fontSize, preset, textAnimationType, isFirst }) => {
  const frame = useCurrentFrame();
  const { bg, color, border } = TEXT_PRESETS[preset] ?? TEXT_PRESETS.dark;

  const startFrame = isFirst ? 0 : 30; // Wait for transition to finish
  const relativeFrame = Math.max(0, frame - startFrame);

  // Use Intl.Segmenter for grapheme-safe typing
  const segmenter = React.useMemo(() => new Intl.Segmenter('ar', { granularity: 'grapheme' }), []);
  const segments = React.useMemo(() => Array.from(segmenter.segment(text.normalize('NFC'))).map(s => s.segment), [text, segmenter]);

  // General entrance configs
  const ENTRY_DUR = 18;
  const isTypewriter = textAnimationType === 'typewriter';

  // Entrance animation variables have been moved to the per-line map below to support staggered delays.

  // Continuous pan right (cinematic drift for full slide duration)
  const xOffset = interpolate(relativeFrame, [0, 210], [0, 222], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Typewriter exact logic
  const TYPEWRITER_RELATIVE_START = 5;
  const charsToShow = Math.min(segments.length, Math.max(0, Math.floor((relativeFrame - TYPEWRITER_RELATIVE_START) / FRAMES_PER_CHAR)));
  const visibleText = isTypewriter ? segments.slice(0, charsToShow).join('') : text;
  
  // Split visible text into lines based on "++"
  const visibleLines = visibleText.split('++').map(l => l.trim()).filter(l => l.length > 0);
  const isTyping = isTypewriter && charsToShow < segments.length;
  const cursorOn = isTyping && Math.floor(relativeFrame / CURSOR_BLINK_RATE) % 2 === 0;

  // Animated top stroke
  const strokeProgress = interpolate(relativeFrame, [0, 180], [0, 100], { extrapolateRight: 'clamp' });
  const strokeHeight = Math.max(3, Math.round(fontSize * 0.07));

  // Glass shine
  const slideDurationFrames = 150; // 5s slide at 30fps
  const glassProgress = interpolate(relativeFrame, [0, Math.floor(slideDurationFrames / 2)], [-120, 200], { extrapolateRight: 'clamp' });

  // Vignette entrance
  const isVisibleDelay = relativeFrame > 0;
  const entryOpacity = interpolate(relativeFrame, [0, ENTRY_DUR], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vignetteOpacity = isVisibleDelay ? (isTypewriter ? Math.min(1, relativeFrame / 10) : entryOpacity) : 0;

  // Gradient vignette height depends on where text sits
  const gradientHeight = Math.max(20, Math.round((bottomOffset / 1080) * 100) + 12);

  return (
    <>
      {/* Gradient vignette — scales with text position */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${gradientHeight}%`,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)',
          opacity: vignetteOpacity, pointerEvents: 'none',
        }}
      />

      {/* Text container wrapper */}
      <div
        style={{
          position: 'absolute', bottom: `${bottomOffset}px`, 
          left: '20%', // مكان البدأ أريد أن يكون بعد 20% من اليسار
          width: 'max-content',
          maxWidth: '75%', // يترك 5% مسافة آمنة على اليمين كحد أقصى
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', // محاذاة على اليمين للأسطر
          gap: '12px', // مسافة بسيطة بين السطرين
          transform: `translateX(${xOffset}px)`,
        }}
      >
        {visibleLines.map((lineText, i) => {
          const lineDelay = isTypewriter ? 0 : i * 15; // 15 frames delay per line for motion-blur
          const lineRelativeFrame = Math.max(0, relativeFrame - lineDelay);
          
          const lineEntryOpacity = interpolate(lineRelativeFrame, [0, ENTRY_DUR], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const lineEntryYOffset = interpolate(lineRelativeFrame, [0, ENTRY_DUR], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const lineEntryBlur = interpolate(lineRelativeFrame, [0, ENTRY_DUR], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          const isLineVisibleDelay = lineRelativeFrame > 0;
          const lineOpacity = isLineVisibleDelay ? (isTypewriter ? Math.min(1, lineRelativeFrame / 10) : lineEntryOpacity) : 0;
          const lineFilter = isTypewriter ? 'none' : `blur(${lineEntryBlur}px)`;
          const lineYOffsetAnimated = isTypewriter ? 0 : lineEntryYOffset;

          const isCurrentTypingLine = isTyping && i === visibleLines.length - 1;
          const isRTL_line = isRTL(lineText);
          
          return (
            <div
              key={i}
              style={{
                opacity: lineOpacity, filter: lineFilter, transform: `translateY(${lineYOffsetAnimated}px)`,
                position: 'relative', overflow: 'hidden',
                backgroundColor: bg, color, 
                padding: `${Math.round(fontSize * 0.15)}px ${Math.round(fontSize * 0.45)}px`, // تقليل الهوامش الداخلية
                borderRadius: '0px', fontSize: `${fontSize}px`, // المستطيل خلف النص حدوده قائمة
                fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
                fontWeight: 'bold', textAlign: isRTL_line ? 'right' : 'left', maxWidth: '100%', lineHeight: 1.4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.55)', border: `1px solid ${border}`, backdropFilter: 'blur(8px)',
                direction: isRTL_line ? 'rtl' : 'ltr', letterSpacing: '0.5px',
              }}
            >
              {/* Animated stroke */}
              <div
                style={{
                  position: 'absolute', 
                  ...(i % 2 === 0 
                    ? { top: 0, right: isRTL_line ? 0 : 'auto', left: isRTL_line ? 'auto' : 0 } 
                    : { bottom: 0, left: isRTL_line ? 0 : 'auto', right: isRTL_line ? 'auto' : 0 }),
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

              <div style={isTypewriter ? { direction: isRTL_line ? 'rtl' : 'ltr' } : {}}>
                {lineText.trim()}
                {(isCurrentTypingLine && cursorOn) && (
                  <span style={{ display: 'inline-block', width: '3px', height: '0.85em', backgroundColor: color, marginRight: '4px', verticalAlign: 'middle', opacity: 0.8 }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
