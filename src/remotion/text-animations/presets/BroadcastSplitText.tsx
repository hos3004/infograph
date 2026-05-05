import React from 'react';
import { interpolate } from 'remotion';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { splitLines } from '../textUtils';
import { FONT_FAMILY, getTextContainerStyle } from '../textStyles';
import { DataPulseSquares } from '../DataPulseSquares';

export const BroadcastSplitText: React.FC<TextAnimationCommonProps> = ({
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
        const y = interpolate(local, [0, 24], [110, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const opacity = interpolate(local, [0, 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={`${line}-${index}`}
            style={{
              overflow: 'hidden',
              opacity,
              height: fontSize * 1.75,
            }}
          >
            <div
              style={{
                position: 'relative',
                transform: `translateY(${y}%)`,
                background: index === 0 ? 'rgba(0,0,0,0.68)' : 'rgba(0,45,130,0.72)',
                color: colors.color,
                borderRight: '5px solid #ffe19a',
                padding: `${Math.round(fontSize * 0.16)}px ${Math.round(fontSize * 0.48)}px`,
                fontSize,
                fontWeight: 900,
                fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
                lineHeight: 1.35,
                boxShadow: '0 12px 34px rgba(0,0,0,0.46)',
                direction: 'rtl',
                letterSpacing: 0,
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
