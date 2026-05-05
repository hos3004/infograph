import React from 'react';
import { interpolate } from 'remotion';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { splitLines } from '../textUtils';
import { getLineStyle, getTextContainerStyle } from '../textStyles';

export const ImpactShockText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
  textPreset,
}) => {
  const lines = splitLines(text);
  const colors = TEXT_PRESETS[textPreset] ?? TEXT_PRESETS.dark;
  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [0, 12, 18, 26], [0.9, 1.06, 0.98, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shake =
    frame < 26
      ? Math.sin(frame * 1.8) * interpolate(frame, [0, 26], [8, 0], { extrapolateRight: 'clamp' })
      : 0;
  const ringScale = interpolate(frame, [8, 34], [0.2, 7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringOpacity = interpolate(frame, [8, 20, 34], [0, 0.75, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={getTextContainerStyle(bottomOffset)}>
      <div
        style={{
          position: 'relative',
          opacity,
          transform: `translateX(${shake}px) scale(${scale})`,
          transformOrigin: 'right center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '50%',
            top: '50%',
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: '2px solid rgba(239,68,68,0.85)',
            opacity: ringOpacity,
            transform: `translate(50%, -50%) scale(${ringScale})`,
          }}
        />
        {lines.map((line, index) => (
          <div
            key={`${line}-${index}`}
            style={{
              ...getLineStyle({
                bg: index === 0 ? 'rgba(140,20,20,0.88)' : colors.bg,
                color: colors.color,
                border: index === 0 ? 'rgba(248,113,113,0.35)' : colors.border,
                fontSize,
              }),
              marginTop: index === 0 ? 0 : 10,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};
