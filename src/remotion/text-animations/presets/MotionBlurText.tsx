import React from 'react';
import { interpolate } from 'remotion';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { splitLines } from '../textUtils';
import { getLineStyle, getTextContainerStyle } from '../textStyles';

export const MotionBlurText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
  textPreset,
}) => {
  const colors = TEXT_PRESETS[textPreset] ?? TEXT_PRESETS.dark;
  const lines = splitLines(text);

  return (
    <div style={getTextContainerStyle(bottomOffset)}>
      {lines.map((line, index) => {
        const local = Math.max(0, frame - index * 15);
        const opacity = interpolate(local, [0, 18], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const y = interpolate(local, [0, 18], [40, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const blur = interpolate(local, [0, 18], [15, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={`${line}-${index}`}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              filter: `blur(${blur}px)`,
            }}
          >
            <div
              style={getLineStyle({
                bg: colors.bg,
                color: colors.color,
                border: colors.border,
                fontSize,
              })}
            >
              {line}
            </div>
          </div>
        );
      })}
    </div>
  );
};
