import React from 'react';
import { interpolate } from 'remotion';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { extractNumberHero } from '../textUtils';
import { FONT_FAMILY } from '../textStyles';

export const NumberHeroText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
  textPreset,
}) => {
  const { valueText, description } = extractNumberHero(text);
  const colors = TEXT_PRESETS[textPreset] ?? TEXT_PRESETS.dark;
  const numberScale = interpolate(frame, [0, 18, 28], [0.55, 1.14, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const numberOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const descY = interpolate(frame, [22, 42], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const descOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        right: 180,
        maxWidth: 900,
        textAlign: 'right',
        direction: 'rtl',
        fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          fontSize: fontSize * 1.95,
          fontWeight: 1000,
          color: '#ffe19a',
          lineHeight: 1,
          opacity: numberOpacity,
          transform: `scale(${numberScale})`,
          transformOrigin: 'right center',
          textShadow: '0 0 36px rgba(255,225,154,0.5)',
        }}
      >
        {valueText}
      </div>
      {description ? (
        <div
          style={{
            marginTop: 12,
            background: colors.bg,
            color: colors.color,
            border: `1px solid ${colors.border}`,
            padding: `${Math.round(fontSize * 0.16)}px ${Math.round(fontSize * 0.45)}px`,
            fontSize: fontSize * 0.82,
            fontWeight: 900,
            lineHeight: 1.4,
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
            boxShadow: '0 12px 34px rgba(0,0,0,0.45)',
          }}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
};
