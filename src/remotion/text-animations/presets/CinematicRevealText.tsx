import React from 'react';
import { interpolate } from 'remotion';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { splitLines } from '../textUtils';
import { getLineStyle, getTextContainerStyle } from '../textStyles';
import { DataPulseSquares } from '../DataPulseSquares';

export const CinematicRevealText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
  textPreset,
}) => {
  const lines = splitLines(text);
  const colors = TEXT_PRESETS[textPreset] ?? TEXT_PRESETS.dark;

  return (
    <div style={getTextContainerStyle(bottomOffset)}>
      {lines.map((line, index) => {
        const local = Math.max(0, frame - index * 9);
        const reveal = interpolate(local, [0, 30], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const x = interpolate(local, [0, 30], [35, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const opacity = interpolate(local, [0, 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={`${line}-${index}`}
            style={{
              opacity,
              transform: `translateX(${x}px)`,
              clipPath: `inset(0 ${100 - reveal * 100}% 0 0)`,
            }}
          >
            <div
              style={{
                position: 'relative',
                ...getLineStyle({
                  bg: index === 0 ? colors.bg : 'linear-gradient(90deg, rgba(0,0,0,0.76), rgba(0,0,0,0.24))',
                  color: colors.color,
                  border: colors.border,
                  fontSize,
                }),
              }}
            >
              {index === 0 && (
                <DataPulseSquares
                  frame={frame}
                  color="#ffe19a"
                  size={7}
                  count={3}
                  startFrame={42}
                />
              )}
              {line}
            </div>
          </div>
        );
      })}
    </div>
  );
};
