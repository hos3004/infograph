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
const MotadawelSubtitle: React.FC<{
  text: string;
  bottomOffset: number;
  fontSize: number;
  preset: MotadawelProps['textPreset'];
  animationType?: 'motion-blur' | 'typewriter';
}> = ({ text, bottomOffset, fontSize, preset, animationType = 'motion-blur' }) => {
  const frame = useCurrentFrame();
  const { bg, color, border } = MOTADAWEL_TEXT_PRESETS[preset] ?? MOTADAWEL_TEXT_PRESETS.dark;

  const isTypewriter = animationType === 'typewriter';
  const isBlur = animationType === 'motion-blur';

  // Base opacity
  const opacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Semantic segmenter for faithful Arabic text tracking
  const segmenter = new Intl.Segmenter('ar', { granularity: 'grapheme' });
  const segments = Array.from(segmenter.segment(text.normalize('NFC'))).map(s => s.segment);
  
  const charsShown = interpolate(frame, [10, 10 + segments.length * 1.5], [0, segments.length], { 
    extrapolateRight: 'clamp', 
    extrapolateLeft: 'clamp' 
  });
  const displayText = isTypewriter ? segments.slice(0, Math.floor(charsShown)).join('') : text;

  // Motion Blur effect optionally replacing the static translation
  const blurValue = isBlur ? interpolate(frame, [10, 25], [8, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }) : 0;
  const yOffset = isBlur ? interpolate(frame, [10, 28], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;

  // Top stroke growing left to right (opposite of Arabic RTL reading direction)
  const strokeWidth = interpolate(frame, [10, 80], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const strokeHeight = Math.max(3, Math.round(fontSize * 0.07));

  // Glass shine
  const glassProgress = interpolate(frame, [10, 85], [-120, 200], { 
    extrapolateRight: 'clamp', 
    extrapolateLeft: 'clamp' 
  });

  const gradientHeight = Math.max(18, Math.round((bottomOffset / 1080) * 100) + 10);

  return (
    <>
      {/* Bottom vignette */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, width: '100%',
          height: `${gradientHeight}%`,
          background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0) 100%)',
          opacity: opacity * 0.8,
          pointerEvents: 'none',
        }}
      />
      {/* Text pill */}
      <div
        style={{
          position: 'absolute',
          bottom: `${bottomOffset}px`,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity,
          transform: `translateY(${yOffset}px)`,
          filter: blurValue > 0 ? `blur(${blurValue}px)` : 'none',
        }}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: bg,
            color,
            padding: `${Math.round(fontSize * 0.22)}px ${Math.round(fontSize * 0.65)}px`,
            borderRadius: '12px',
            fontSize: `${fontSize}px`,
            fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
            fontWeight: 'bold',
            textAlign: 'center',
            maxWidth: '82%',
            lineHeight: 1.5,
            boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
            border: `1px solid ${border}`,
            backdropFilter: 'blur(8px)',
            direction: 'rtl',
            letterSpacing: '0.5px',
          }}
        >
          {isTypewriter ? (
            <div style={{ position: 'relative' }}>
              <span style={{ opacity: 0, pointerEvents: 'none' }}>{text}</span>
              <span style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, textAlign: 'center' }}>
                {displayText}
              </span>
            </div>
          ) : (
            text
          )}

          {/* Animated top stroke */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: `${strokeHeight}px`,
              width: `${strokeWidth}%`,
              backgroundColor: color,
              opacity: 0.9,
              borderRadius: '2px',
              boxShadow: `0 0 10px ${color}`,
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
        </div>
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
  const OVERLAP_FRAMES = 75; // 3 seconds transition at 25fps
  const OUTRO_OVERLAP = 38; // ~1.5 seconds transition into outro

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
        <Sequence from={mainStart} durationInFrames={mainFrames + outroOverlap} layout="none">
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
