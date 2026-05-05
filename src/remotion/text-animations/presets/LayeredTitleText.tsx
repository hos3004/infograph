import React from 'react';
import { interpolate } from 'remotion';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { parseLayeredTitle } from '../textUtils';
import { FONT_FAMILY } from '../textStyles';

export const LayeredTitleText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
}) => {
  const { label, title, description } = parseLayeredTitle(text);
  const labelOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelY = interpolate(frame, [0, 15], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleReveal = interpolate(frame, [10, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const descOpacity = interpolate(frame, [38, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const descY = interpolate(frame, [38, 58], [22, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sideLineHeight = interpolate(frame, [6, 38], [0, 150], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sidePulse = 1 + Math.sin(Math.max(0, frame - 60) / 18) * 0.06;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        right: 180,
        maxWidth: 1050,
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -28,
          top: 0,
          width: 5,
          height: sideLineHeight,
          borderRadius: 999,
          background: 'linear-gradient(180deg, #ffe19a, rgba(255,225,154,0))',
          transform: `scaleY(${sidePulse})`,
          transformOrigin: 'top',
        }}
      />
      <div
        style={{
          display: 'inline-block',
          padding: '5px 14px',
          borderRadius: 999,
          backgroundColor: '#ffe19a',
          color: '#07111f',
          fontSize: fontSize * 0.42,
          fontWeight: 1000,
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          boxShadow: '0 0 22px rgba(255,225,154,0.35)',
        }}
      >
        {label}
      </div>
      <div style={{ marginTop: 12, overflow: 'hidden', width: 'max-content', maxWidth: 1000 }}>
        <div
          style={{
            fontSize: fontSize * 1.15,
            fontWeight: 1000,
            color: '#ffffff',
            lineHeight: 1.22,
            clipPath: `inset(0 ${100 - titleReveal * 100}% 0 0)`,
            textShadow: '0 12px 34px rgba(0,0,0,0.55)',
          }}
        >
          {title}
        </div>
      </div>
      {description ? (
        <div
          style={{
            marginTop: 10,
            color: '#dbeafe',
            fontSize: fontSize * 0.62,
            fontWeight: 850,
            lineHeight: 1.4,
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
          }}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
};
