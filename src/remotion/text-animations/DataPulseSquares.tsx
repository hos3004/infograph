import React from 'react';
import { interpolate } from 'remotion';

type DataPulseSquaresProps = {
  frame: number;
  color?: string;
  size?: number;
  count?: number;
  startFrame?: number;
};

export const DataPulseSquares: React.FC<DataPulseSquaresProps> = ({
  frame,
  color = '#ffe19a',
  size = 7,
  count = 3,
  startFrame = 38,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: -18,
        left: 0,
        display: 'flex',
        gap: 5,
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: count }).map((_, index) => {
        const local = Math.max(0, frame - startFrame - index * 6);

        const enterOpacity = interpolate(local, [0, 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const pulse = 1 + Math.sin(local / 10) * 0.18;

        const opacityPulse = 0.55 + Math.sin(local / 10) * 0.35;

        return (
          <span
            key={index}
            style={{
              width: size,
              height: size,
              display: 'block',
              borderRadius: 2,
              backgroundColor: color,
              opacity: enterOpacity * opacityPulse,
              transform: `scale(${pulse})`,
              boxShadow: `0 0 ${size * 2.2}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
