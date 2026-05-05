import React from 'react';
import { interpolate } from 'remotion';

type ParallaxDepthProps = {
  frame: number;
  enabled?: boolean;
  delayFrames?: number;
  strength?: number;
  shadowWidth?: number;
  shadowHeight?: number;
  children: React.ReactNode;
};

export const ParallaxDepth: React.FC<ParallaxDepthProps> = ({
  frame,
  enabled = true,
  delayFrames = 45,
  strength = 1,
  shadowWidth = 920,
  shadowHeight = 150,
  children,
}) => {
  if (!enabled) {
    return <>{children}</>;
  }

  const localFrame = Math.max(0, frame - delayFrames);

  const enter = interpolate(localFrame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const breathe = Math.sin(localFrame / 42);

  const textX = (-14 * enter + breathe * -4) * strength;
  const textY = (-4 * enter + breathe * -1.5) * strength;
  const textScale = 1 + 0.006 * enter;

  const shadowOpacity = interpolate(localFrame, [0, 45], [0, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shadowX = (18 + breathe * 8) * strength;
  const shadowY = (20 + breathe * 5) * strength;
  const shadowScale = 1 + 0.02 * enter;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {/* parallax-shadow */}
      <div
        style={{
          position: 'absolute',
          right: 320,
          bottom: 120,
          width: shadowWidth,
          height: shadowHeight,
          borderRadius: 28,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.24) 42%, rgba(0,0,0,0) 72%)',
          filter: 'blur(24px)',
          opacity: shadowOpacity,
          transform: `translate(${shadowX}px, ${shadowY}px) scale(${shadowScale})`,
          transformOrigin: 'center center',
        }}
      />

      {/* animated text layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${textX}px, ${textY}px) scale(${textScale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
