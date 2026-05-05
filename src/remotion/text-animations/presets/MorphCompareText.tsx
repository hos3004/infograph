import React from 'react';
import { interpolate } from 'remotion';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { parseMorphWords, splitLines } from '../textUtils';
import { FONT_FAMILY } from '../textStyles';

export const MorphCompareText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  fontSize,
}) => {
  const lines = splitLines(text);
  const wordSource = lines[0] || text;
  const words = parseMorphWords(wordSource);
  const safeWords = words.length > 0 ? words : ['الفقر', 'الغلاء'];
  const subline = lines[1] || 'كلمات تتحول داخل نفس الموضع';

  const cycleFrames = 84;
  const index = Math.floor(frame / cycleFrames) % safeWords.length;
  const cycleFrame = frame % cycleFrames;
  const word = safeWords[index];

  const opacity = interpolate(cycleFrame, [0, 25, 35, 50, 60, 84], [1, 1, 0, 0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blur = interpolate(cycleFrame, [0, 25, 35, 50, 60, 84], [0, 0, 8, 8, 0, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(cycleFrame, [0, 25, 35, 50, 60, 84], [0, 0, -14, 14, 0, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subY = interpolate(frame, [10, 25], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        direction: 'rtl',
        fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 'min(940px, 82%)',
          transform: 'translateY(10px)',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: fontSize * 1.36,
            color: '#ffe19a',
            fontWeight: 1000,
            lineHeight: 1.05,
            opacity,
            filter: `blur(${blur}px)`,
            transform: `translateY(${y}px)`,
            textShadow: '0 0 34px rgba(255,225,154,0.48), 0 14px 28px rgba(0,0,0,0.64)',
          }}
        >
          {word}
        </span>
        <span
          style={{
            display: 'block',
            marginTop: Math.max(10, fontSize * 0.18),
            fontSize: fontSize * 0.56,
            color: '#e5e7eb',
            fontWeight: 850,
            lineHeight: 1.35,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textShadow: '0 8px 22px rgba(0,0,0,0.65)',
          }}
        >
          {subline}
        </span>
      </div>
    </div>
  );
};
