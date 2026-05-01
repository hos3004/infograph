import React from 'react';
import { interpolate } from 'remotion';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { parseKeywordText } from '../textUtils';
import { FONT_FAMILY } from '../textStyles';

export const KineticKeywordText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
}) => {
  const { before, keyword, after, subline } = parseKeywordText(text);
  const keywordOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const keywordY = interpolate(frame, [0, 22], [35, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const keywordScale = interpolate(frame, [0, 18, 28], [0.86, 1.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [24, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subY = interpolate(frame, [24, 45], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glow = 0.45 + Math.sin(Math.max(0, frame - 45) / 14) * 0.2;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        right: 180,
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
      }}
    >
      <div
        style={{
          fontSize: fontSize * 1.3,
          fontWeight: 1000,
          color: '#ffffff',
          lineHeight: 1.12,
          opacity: keywordOpacity,
          transform: `translateY(${keywordY}px) scale(${keywordScale})`,
          transformOrigin: 'right center',
          textShadow: '0 14px 34px rgba(0,0,0,0.65)',
        }}
      >
        {before ? <span>{before} </span> : null}
        <span
          style={{
            color: '#ffe19a',
            textShadow: `0 0 ${30 * glow}px rgba(255,225,154,${glow})`,
          }}
        >
          {keyword}
        </span>
        {after ? <span> {after}</span> : null}
      </div>
      {subline ? (
        <div
          style={{
            marginTop: 12,
            fontSize: fontSize * 0.62,
            fontWeight: 850,
            color: '#f8fafc',
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          {subline}
        </div>
      ) : null}
    </div>
  );
};
