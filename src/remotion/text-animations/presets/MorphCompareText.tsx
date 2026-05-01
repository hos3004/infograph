import React from 'react';
import { interpolate } from 'remotion';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { parseMorphWords } from '../textUtils';
import { FONT_FAMILY } from '../textStyles';

export const MorphCompareText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
}) => {
  const words = parseMorphWords(text);
  const safeWords = words.length > 0 ? words : ['الفقر', 'الغلاء'];
  const cycleFrames = 78;
  const index = Math.floor(frame / cycleFrames) % safeWords.length;
  const cycleFrame = frame % cycleFrames;
  const word = safeWords[index];
  const opacity = interpolate(cycleFrame, [0, 10, 52, 70], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blur = interpolate(cycleFrame, [0, 12, 52, 70], [8, 0, 0, 8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(cycleFrame, [0, 12, 52, 70], [18, 0, 0, -18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        right: 180,
        minWidth: 500,
        textAlign: 'right',
        direction: 'rtl',
        fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
      }}
    >
      <div
        style={{
          fontSize: fontSize * 1.45,
          color: '#ffe19a',
          fontWeight: 1000,
          opacity,
          filter: `blur(${blur}px)`,
          transform: `translateY(${y}px)`,
          textShadow: '0 0 34px rgba(255,225,154,0.45)',
        }}
      >
        {word}
      </div>
    </div>
  );
};
