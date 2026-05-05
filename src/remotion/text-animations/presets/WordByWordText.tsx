import React from 'react';
import { interpolate } from 'remotion';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { splitWords } from '../textUtils';
import { getLineStyle, getTextContainerStyle } from '../textStyles';

export const WordByWordText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
  textPreset,
}) => {
  const words = splitWords(text.replace(/\+\+/g, ' '));
  const colors = TEXT_PRESETS[textPreset] ?? TEXT_PRESETS.dark;

  return (
    <div style={getTextContainerStyle(bottomOffset)}>
      <div
        style={getLineStyle({
          bg: colors.bg,
          color: colors.color,
          border: colors.border,
          fontSize,
        })}
      >
        {words.map((word, index) => {
          const local = Math.max(0, frame - index * 5);
          const opacity = interpolate(local, [0, 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = interpolate(local, [0, 16], [24, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const blur = interpolate(local, [0, 16], [8, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={`${word}-${index}`}
              style={{
                display: 'inline-block',
                marginLeft: 8,
                opacity,
                transform: `translateY(${y}px)`,
                filter: `blur(${blur}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
