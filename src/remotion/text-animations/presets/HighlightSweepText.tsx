import React from 'react';
import { interpolate } from 'remotion';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { splitLines } from '../textUtils';
import { getLineStyle, getTextContainerStyle } from '../textStyles';

export const HighlightSweepText: React.FC<TextAnimationCommonProps> = ({
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
        const local = Math.max(0, frame - index * 7);
        const y = interpolate(local, [0, 18], [26, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const opacity = interpolate(local, [0, 14], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const sweepX = interpolate(local, [20, 58], [160, -260], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const sweepOpacity = interpolate(local, [20, 28, 52, 58], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={`${line}-${index}`}
            style={{
              position: 'relative',
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            <div
              style={getLineStyle({
                bg: index === 0 ? colors.bg : 'rgba(0,0,0,0.64)',
                color: colors.color,
                border: colors.border,
                fontSize,
              })}
            >
              {line}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '45%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                  transform: `translateX(${sweepX}%) skewX(-20deg)`,
                  opacity: sweepOpacity,
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
