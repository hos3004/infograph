import React from 'react';
import { interpolate } from 'remotion';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { splitLines } from '../textUtils';
import { getLineStyle, getTextContainerStyle } from '../textStyles';

export const SplitLinesStaggerText: React.FC<TextAnimationCommonProps> = ({
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
        const local = Math.max(0, frame - index * 10);
        const direction = index % 2 === 0 ? 1 : -1;
        const x = interpolate(local, [0, 28], [direction * 90, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const opacity = interpolate(local, [0, 12], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div key={`${line}-${index}`} style={{ opacity, transform: `translateX(${x}px)` }}>
            <div
              style={getLineStyle({
                bg: index === 0 ? 'rgba(140,20,20,0.86)' : colors.bg,
                color: colors.color,
                border: index === 0 ? 'rgba(248,113,113,0.35)' : colors.border,
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
