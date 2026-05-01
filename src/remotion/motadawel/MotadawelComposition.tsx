import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { MotadawelProps, MOTADAWEL_TEXT_PRESETS } from './types';
import { VisualEffects } from '../VisualEffects';

// Load custom Arabic font into the Remotion canvas
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
      font-display: block;
    }
  `;
  if (!document.head.querySelector('[data-font="AvenirArabic-Motadawel"]')) {
    style.setAttribute('data-font', 'AvenirArabic-Motadawel');
    document.head.appendChild(style);
  }
}

// ── Shared Overlap Transition Tool ────────────────────────────────────────────
const TransitionFadeIn: React.FC<{ overlap: number; children: React.ReactNode }> = ({ overlap, children }) => {
  const frame = useCurrentFrame();
  const opacity = overlap > 0 ? interpolate(frame, [0, overlap], [0, 1], { extrapolateRight: 'clamp' }) : 1;
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// ── Text Subtitle ─────────────────────────────────────────────────────────────
const TYPEWRITER_START = 10;
const FRAMES_PER_CHAR = 1;
const CURSOR_BLINK_RATE = 8;
const isRTL = (s: string) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(s);

const MotadawelSubtitle: React.FC<{
  text: string;
  bottomOffset: number;
  fontSize: number;
  preset: MotadawelProps['textPreset'];
  animationType?: 'motion-blur' | 'typewriter';
}> = ({ text, bottomOffset, fontSize, preset, animationType = 'motion-blur' }) => {
  const frame = useCurrentFrame();
  const { bg, color, border } = MOTADAWEL_TEXT_PRESETS[preset] ?? MOTADAWEL_TEXT_PRESETS.dark;

  // Use Intl.Segmenter for grapheme-safe typing
  const segmenter = React.useMemo(() => new Intl.Segmenter('ar', { granularity: 'grapheme' }), []);
  const segments = React.useMemo(() => Array.from(segmenter.segment(text.normalize('NFC'))).map(s => s.segment), [text, segmenter]);

  const ENTRY_DUR = 18;
  const isTypewriter = animationType === 'typewriter';

  // Continuous pan right (cinematic drift)
  const xOffset = interpolate(frame, [0, 210], [0, 222], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Typewriter exact logic
  const charsToShow = Math.min(segments.length, Math.max(0, Math.floor((frame - TYPEWRITER_START) / FRAMES_PER_CHAR)));
  const visibleText = isTypewriter ? segments.slice(0, charsToShow).join('') : text;
  
  // Split visible text into lines based on "++"
  const visibleLines = visibleText.split('++').map(l => l.trim()).filter(l => l.length > 0);
  const isTyping = isTypewriter && charsToShow < segments.length;
  const cursorOn = isTyping && Math.floor(frame / CURSOR_BLINK_RATE) % 2 === 0;

  // Animated stroke
  const strokeProgress = interpolate(frame, [10, 180], [0, 100], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const strokeHeight = Math.max(3, Math.round(fontSize * 0.07));

  // Glass shine
  const glassProgress = interpolate(frame, [10, 85], [-120, 200], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Vignette entrance
  const isVisibleDelay = frame > 10;
  const entryOpacity = interpolate(frame, [10, 10 + ENTRY_DUR], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vignetteOpacity = isVisibleDelay ? (isTypewriter ? Math.min(1, (frame - 10) / 10) : entryOpacity) : 0;

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
          left: '20%',
          width: 'max-content',
          maxWidth: '75%',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
          gap: '12px',
          transform: `translateX(${xOffset}px)`,
        }}
      >
        {visibleLines.map((lineText, i) => {
          const lineDelay = isTypewriter ? 10 : 10 + (i * 15); // Stagger motion blur
          const lineRelativeFrame = Math.max(0, frame - lineDelay);
          
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
                padding: `${Math.round(fontSize * 0.15)}px ${Math.round(fontSize * 0.45)}px`,
                borderRadius: '0px', fontSize: `${fontSize}px`,
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
                  opacity: frame > 85 ? 0 : 1,
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

// ── Main Composition ──────────────────────────────────────────────────────────
export const MotadawelComposition: React.FC<MotadawelProps> = ({
  introVideoUrl,
  mainVideoUrl,
  frameUrl,
  outroVideoUrl,
  mainText,
  videoScale,
  videoX,
  videoY,
  effects,
  introDurationFrames,
  mainVideoDurationFrames,
  outroDurationFrames,
  textBottomOffset,
  textFontSize,
  textPreset,
  textAnimationType = 'motion-blur',
  cinematicBarSize = 6,
  bgMusicUrl,
  bgMusicVolume = 0.25,
}) => {
  const { durationInFrames } = useVideoConfig();

  const hasIntro = !!introVideoUrl && introDurationFrames > 0;
  const hasOutro = !!outroVideoUrl && outroDurationFrames > 0;

  const introFrames = hasIntro ? introDurationFrames : 0;
  const OVERLAP_FRAMES = 25; // 1 second crossfade at 25fps
  const OUTRO_OVERLAP = 25; // 1 second crossfade into outro

  const introOverlap = hasIntro ? Math.min(OVERLAP_FRAMES, introFrames) : 0;
  const outroOverlap = hasOutro ? Math.min(OUTRO_OVERLAP, outroDurationFrames) : 0;

  const mainStart   = hasIntro ? introFrames - introOverlap : 0;
  const mainFrames  = mainVideoDurationFrames;
  // Outro starts before main ends for a smooth cross-fade
  const outroStart  = mainStart + Math.max(0, mainFrames - outroOverlap);
  const outroFrames = hasOutro ? outroDurationFrames : 0;

  const isImageFrame = frameUrl
    ? /\.(png|gif|jpg|jpeg|webp)$/i.test(frameUrl)
    : false;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', direction: 'ltr' }}>

      {/* ── 1. Intro video ───────────────────────────────────── */}
      {hasIntro && (
        <Sequence from={0} durationInFrames={introFrames} layout="none">
          <AbsoluteFill>
            <Video
              src={introVideoUrl!}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AbsoluteFill>
        </Sequence>
      )}

      {/* ── 2. Main video (with transform) ──────────────────── */}
      {mainFrames > 0 && (
        <Sequence from={mainStart} durationInFrames={mainFrames} layout="none">
          <TransitionFadeIn overlap={introOverlap}>
            {/* Background Music for Main Video */}
            {bgMusicUrl && (
              <Audio src={bgMusicUrl} volume={bgMusicVolume ?? 0.25} />
            )}

            {/* Black backing */}
            <AbsoluteFill style={{ backgroundColor: '#000' }} />

            {/* Main video with user-controlled transform */}
            <AbsoluteFill
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {mainVideoUrl ? (
                <Video
                  src={mainVideoUrl}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: `scale(${videoScale}) translateX(${videoX}px) translateY(${videoY}px)`,
                    transformOrigin: 'center center',
                  }}
                />
              ) : null}
            </AbsoluteFill>

            {/* Frame overlay (PNG or video on top) */}
            {frameUrl && (
              <AbsoluteFill style={{ pointerEvents: 'none' }}>
                {isImageFrame ? (
                  <Img
                    src={frameUrl}
                    style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                  />
                ) : (
                  <Video
                    src={frameUrl}
                    style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                    muted
                    loop
                  />
                )}
              </AbsoluteFill>
            )}

            {/* Text subtitle */}
              <MotadawelSubtitle
                text={mainText}
                bottomOffset={textBottomOffset}
                fontSize={textFontSize}
                preset={textPreset}
                animationType={textAnimationType}
              />
          </TransitionFadeIn>
        </Sequence>
      )}

      {/* ── 3. Outro video (with fade-in transition) ────────── */}
      {hasOutro && outroFrames > 0 && (
        <Sequence from={outroStart} durationInFrames={outroFrames} layout="none">
          <TransitionFadeIn overlap={outroOverlap}>
            <AbsoluteFill>
              <Video
                src={outroVideoUrl!}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </AbsoluteFill>
          </TransitionFadeIn>
        </Sequence>
      )}

      {/* ── 4. Visual effects (full duration) ───────────────── */}
      <VisualEffects effects={effects as any[]} cinematicBarSize={cinematicBarSize} />

    </AbsoluteFill>
  );
};
