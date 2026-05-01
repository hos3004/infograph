import React from 'react';
import { interpolate } from 'remotion';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { splitLines } from '../textUtils';
import { getLineStyle, getTextContainerStyle } from '../textStyles';

export const LiveRevealDotText: React.FC<TextAnimationCommonProps> = ({
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
        const start = index * 10;
        const local = Math.max(0, frame - start);
        const reveal = interpolate(local, [0, 28], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const opacity = interpolate(local, [0, 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const x = interpolate(local, [0, 28], [40, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const dotScale = interpolate(local, [0, 8, 28], [0, 1, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const dotRightPercent = interpolate(local, [0, 28], [0, 100], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const pulse = 1 + Math.sin(Math.max(0, local - 32) / 8) * 0.12;

        return (
          <div
            key={`${line}-${index}`}
            style={{
              position: 'relative',
              overflow: 'hidden',
              opacity,
              transform: `translateX(${x}px)`,
            }}
          >
            <div
              style={{
                ...getLineStyle({
                  bg: index === 0 ? colors.bg : 'linear-gradient(90deg, rgba(0,0,0,0.76), rgba(0,0,0,0.24))',
                  color: colors.color,
                  border: colors.border,
                  fontSize,
                }),
                clipPath: `inset(0 ${100 - reveal * 100}% 0 0)`,
              }}
            >
              {line}
            </div>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: `${dotRightPercent}%`,
                width: Math.max(8, fontSize * 0.22),
                height: Math.max(8, fontSize * 0.22),
                borderRadius: '50%',
                backgroundColor: '#ffe19a',
                boxShadow: '0 0 22px rgba(255,225,154,0.95)',
                transform: `translate(50%, -50%) scale(${dotScale * pulse})`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
