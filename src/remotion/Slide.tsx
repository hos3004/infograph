import React from 'react';
import { AbsoluteFill, Img, Video, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SlideData, TextAnimationPreset, TextPreset } from './types';
import { getEffectByIndex, TransitionOverlay, TransitionType } from './Transitions';
import { TextAnimationRenderer } from './text-animations/TextAnimationRenderer';
import { FONT_FAMILY } from './text-animations/textStyles';

const FONT_FACE_CSS = `
  @font-face {
    font-family: '${FONT_FAMILY}';
    src: url('${staticFile('assets/fonts/rb.ttf')}') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
`;

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

  if (type === 'blur-wipe') {
    const blur = interpolate(frame, [0, d * 0.6, d], [22, 8, 0], {
      extrapolateRight: 'clamp',
    });
    const opacity = interpolate(frame, [0, d * 0.4, d], [0, 0.6, 1], {
      extrapolateRight: 'clamp',
    });
    return { filter: `blur(${blur}px)`, opacity };
  }

  return {};
}

const SubtitleVignette: React.FC<{
  relativeFrame: number;
  bottomOffset: number;
  isTypewriter: boolean;
}> = ({ relativeFrame, bottomOffset, isTypewriter }) => {
  const entryOpacity = interpolate(relativeFrame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const vignetteOpacity = relativeFrame > 0
    ? (isTypewriter ? Math.min(1, relativeFrame / 10) : entryOpacity)
    : 0;
  const gradientHeight = Math.max(20, Math.round((bottomOffset / 1080) * 100) + 12);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${gradientHeight}%`,
        background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)',
        opacity: vignetteOpacity,
        pointerEvents: 'none',
      }}
    />
  );
};

export const Slide: React.FC<{
  slide: SlideData;
  index: number;
  isFirst: boolean;
  textBottomOffset: number;
  textFontSize: number;
  textPreset: TextPreset;
  textAnimationType: TextAnimationPreset;
  parallaxEnabled?: boolean;
  textHorizontalOffset?: number;
}> = ({
  slide,
  index,
  isFirst,
  textBottomOffset,
  textFontSize,
  textPreset,
  textAnimationType,
  parallaxEnabled,
  textHorizontalOffset,
}) => {
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
  const relativeFrame = Math.max(0, frame - (isFirst ? 0 : TRANSITION_FRAMES));
  const hasText = Boolean(slide.text);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        ...transitionStyle,
      }}
    >
      <style>{FONT_FACE_CSS}</style>

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

      {hasText ? (
        <>
          <SubtitleVignette
            relativeFrame={relativeFrame}
            bottomOffset={textBottomOffset}
            isTypewriter={textAnimationType === 'typewriter'}
          />
          <TextAnimationRenderer
            text={slide.text ?? ''}
            frame={relativeFrame}
            isFirst={isFirst}
            bottomOffset={textBottomOffset}
            fontSize={textFontSize}
            textPreset={textPreset}
            textAnimationType={textAnimationType}
            parallaxEnabled={parallaxEnabled}
            textHorizontalOffset={textHorizontalOffset}
          />
        </>
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
