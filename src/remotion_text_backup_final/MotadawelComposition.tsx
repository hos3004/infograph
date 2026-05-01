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
import { MotadawelVisualEffects } from './MotadawelVisualEffects';

const FONT_FAMILY = 'AvenirArabic';

// Font logic has been moved to the isolated renderer to prevent packaged bundler failures.

// ── Text Subtitle ─────────────────────────────────────────────────────────────
const MotadawelSubtitle: React.FC<{
  text: string;
  bottomOffset: number;
  fontSize: number;
  preset: MotadawelProps['textPreset'];
}> = ({ text, bottomOffset, fontSize, preset }) => {
  const frame = useCurrentFrame();
  const { bg, color, border } = MOTADAWEL_TEXT_PRESETS[preset] ?? MOTADAWEL_TEXT_PRESETS.dark;

  const opacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const yOffset = interpolate(frame, [10, 28], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
          opacity,
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
        }}
      >
        <div
          style={{
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
          {text}
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
}) => {
  const { durationInFrames } = useVideoConfig();

  const hasIntro = !!introVideoUrl && introDurationFrames > 0;
  const hasOutro = !!outroVideoUrl && outroDurationFrames > 0;

  const introFrames = hasIntro ? introDurationFrames : 0;
  const mainStart   = introFrames;
  const mainFrames  = mainVideoDurationFrames;
  const outroStart  = mainStart + mainFrames;
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
      <Sequence from={mainStart} durationInFrames={mainFrames} layout="none">
        <AbsoluteFill>
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
          {mainText ? (
            <MotadawelSubtitle
              text={mainText}
              bottomOffset={textBottomOffset}
              fontSize={textFontSize}
              preset={textPreset}
            />
          ) : null}
        </AbsoluteFill>
      </Sequence>

      {/* ── 3. Outro video ──────────────────────────────────── */}
      {hasOutro && (
        <Sequence from={outroStart} durationInFrames={outroFrames} layout="none">
          <AbsoluteFill>
            <Video
              src={outroVideoUrl!}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AbsoluteFill>
        </Sequence>
      )}

      {/* ── 4. Visual effects (full duration) ───────────────── */}
      <MotadawelVisualEffects effects={effects ?? []} />

    </AbsoluteFill>
  );
};
