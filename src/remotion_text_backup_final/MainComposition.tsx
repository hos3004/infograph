import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, Video, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { CompositionProps } from './types';
import { Slide } from './Slide';
import { VisualEffects } from './VisualEffects';

export const MainComposition: React.FC<CompositionProps> = ({
  slides,
  overlay,
  music,
  endPage,
  slideDurationInSeconds,
  effects,
  endPageDurationFrames,
  textBottomOffset,
  textFontSize,
  textPreset,
  textAnimationType,
  cinematicBarSize,
  voiceover,
  musicVolume = 50,
  voiceoverVolume = 100,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  const framesPerSlide = Math.floor(slideDurationInSeconds * fps);
  const overlapFrames = 30; // 1-second slide-to-slide crossfade
  const validSlides = slides.filter(s => s.imageUrl);

  const offsetFrames = framesPerSlide - overlapFrames;
  const EP_FRAMES = endPageDurationFrames ?? 0;

  // Frame at which all slides have finished
  const slideEndFrame = validSlides.length > 0
    ? (validSlides.length * offsetFrames) + overlapFrames
    : 0;

  // End-page crossfade: 2 seconds fade-in overlap with the last slide
  const EP_FADE_SEC = 2;
  const EP_FADE_FRAMES = Math.round(EP_FADE_SEC * fps);

  // End page Sequence starts EP_FADE_FRAMES before slides end
  const epStartFrame = endPage && EP_FRAMES > 0
    ? Math.max(0, slideEndFrame - EP_FADE_FRAMES)
    : slideEndFrame;

  // Total duration of the composition
  const totalVideoFrames = slideEndFrame + (endPage && EP_FRAMES > 0 ? EP_FRAMES : 0);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', direction: 'ltr' }}>

      {/* ── 1. Slides ───────────────────────────────────────────── */}
      {validSlides.map((slide, i) => {
        const startFrame = i * offsetFrames;
        return (
          <Sequence
            key={slide.id}
            from={startFrame}
            durationInFrames={framesPerSlide}
            layout="none"
          >
            <Slide
              slide={slide}
              index={i}
              isFirst={i === 0}
              textBottomOffset={textBottomOffset ?? 160}
              textFontSize={textFontSize ?? 46}
              textPreset={textPreset ?? 'dark'}
              textAnimationType={textAnimationType ?? 'motion-blur'}
            />
          </Sequence>
        );
      })}

      {/* ── 2. End Page — crossfade fade-in over 2 seconds ──────── */}
      {endPage && EP_FRAMES > 0 && (
        <Sequence
          from={epStartFrame}
          durationInFrames={EP_FRAMES + EP_FADE_FRAMES}
          layout="none"
        >
          {/*
            EndPageFade reads useCurrentFrame() which is local to this Sequence.
            Frame 0 here = when the Sequence starts (EP_FADE_FRAMES before slideEndFrame).
            opacity goes 0 → 1 over the first EP_FADE_FRAMES frames.
          */}
          <EndPageFade src={endPage} fadeFrames={EP_FADE_FRAMES} />
        </Sequence>
      )}

      {/* ── 3. Overlay (video OR image) ─────────────────────────── */}
      {overlay && (() => {
        const isImageOverlay = /\.(png|gif|jpg|jpeg)$/i.test(overlay);
        const overlayStyle: React.CSSProperties = {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          mixBlendMode: 'screen',
          opacity: 0.85,
        };
        return (
          <Sequence from={0} durationInFrames={totalVideoFrames || durationInFrames}>
            {isImageOverlay
              ? <Img src={overlay} style={overlayStyle} />
              : <Video src={overlay} style={overlayStyle} loop muted />
            }
          </Sequence>
        );
      })()}

      {/* ── 4. Music & Voiceover with fade-out ──────────────────── */}
      {music && (
        <Audio
          src={music}
          loop
          volume={(frame) => {
            const fadeStart = Math.max(0, durationInFrames - 45);
            const baseVol = (typeof musicVolume === 'number' && !isNaN(musicVolume)) ? musicVolume / 100 : 0.5;
            if (fadeStart >= durationInFrames) return baseVol;
            return interpolate(frame, [fadeStart, durationInFrames], [baseVol, 0], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
          }}
        />
      )}

      {voiceover && (
        <Audio
          src={voiceover}
          volume={(frame) => {
            const fadeStart = Math.max(0, durationInFrames - 45);
            const baseVol = (typeof voiceoverVolume === 'number' && !isNaN(voiceoverVolume)) ? voiceoverVolume / 100 : 1;
            if (fadeStart >= durationInFrames) return baseVol;
            return interpolate(frame, [fadeStart, durationInFrames], [baseVol, 0], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
          }}
        />
      )}

      {/* ── 5. Visual Effects ────────────────────────────────────── */}
      <VisualEffects effects={effects ?? []} cinematicBarSize={cinematicBarSize ?? 6} />

    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EndPageFade: renders inside a Sequence, so useCurrentFrame() returns a local
// frame (0 = when the Sequence starts). Opacity fades 0 → 1 over fadeFrames.
// ─────────────────────────────────────────────────────────────────────────────
const EndPageFade: React.FC<{ src: string; fadeFrames: number }> = ({ src, fadeFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', opacity }}>
      <Video
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </AbsoluteFill>
  );
};
