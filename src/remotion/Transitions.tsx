import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Img } from 'remotion';
import React from 'react';

export const springConfig = {
  damping: 200,
  stiffness: 300,
};

export type TransitionType = 'fade' | 'blur-wipe' | 'light-leak';

export const TRANSITION_DURATION_FRAMES = 30;

export const getEffectByIndex = (index: number): TransitionType => {
  // Simple deterministic rotation — guarantees all 3 transitions are used equally
  const options: TransitionType[] = ['fade', 'light-leak', 'blur-wipe'];
  return options[(index - 1) % options.length]; // index-1 because first slide (index 0) skips transition
};

export const TransitionOverlay: React.FC<{
  type: TransitionType;
  frameInTransition: number;
  duration: number;
}> = ({ type, frameInTransition, duration }) => {
  // If not entering, don't show overlay over previous slide
  if (frameInTransition < 0 || frameInTransition > duration) return null;

  const progress = frameInTransition / duration;

  if (type === 'light-leak') {
    const opacity = interpolate(progress, [0, 0.5, 1], [0, 0.8, 0], { extrapolateRight: 'clamp' });
    return (
      <AbsoluteFill style={{ 
        backgroundColor: '#ff8c00', 
        mixBlendMode: 'screen',
        opacity: opacity,
        boxShadow: 'inset 0 0 100px #ffea00'
      }} />
    );
  }

  return null;
};

// EnterTransition is kept for backward compatibility but Slide.tsx now applies
// transitions at the container level via getSlideContainerStyle in Slide.tsx
export const EnterTransition: React.FC<{
  type: TransitionType;
  children: React.ReactNode;
}> = ({ type, children }) => {
  const frame = useCurrentFrame();
  const d = TRANSITION_DURATION_FRAMES;

  let style: React.CSSProperties = {};

  if (type === 'fade' || type === 'light-leak') {
    style.opacity = interpolate(frame, [0, d], [0, 1], { extrapolateRight: 'clamp' });
  } else if (type === 'blur-wipe') {
    const blur = interpolate(frame, [0, d / 2, d], [20, 10, 0], { extrapolateRight: 'clamp' });
    const clip = interpolate(frame, [0, d], [100, 0], { extrapolateRight: 'clamp' });
    style.clipPath = `polygon(${clip}% 0, 100% 0, 100% 100%, ${clip}% 100%)`;
    style.filter = `blur(${blur}px)`;
  }

  return (
    <div style={{ ...style, width: '100%', height: '100%', position: 'absolute' }}>
      {children}
    </div>
  );
};
