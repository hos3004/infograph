import React from 'react';
import { interpolate } from 'remotion';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { parseTimeline } from '../textUtils';
import { FONT_FAMILY } from '../textStyles';

export const TimelineMarkerText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
}) => {
  const { period, description } = parseTimeline(text);
  const lineHeight = interpolate(frame, [0, 28], [0, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nodeScale = interpolate(frame, [20, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = 1 + Math.sin(Math.max(0, frame - 42) / 10) * 0.12;
  const contentOpacity = interpolate(frame, [14, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const contentX = interpolate(frame, [14, 32], [38, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        right: 200,
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -38,
          top: 0,
          width: 6,
          height: lineHeight,
          borderRadius: 999,
          background: 'linear-gradient(to bottom, #38bdf8, rgba(56,189,248,0))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: -47,
          top: 18,
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: '#38bdf8',
          boxShadow: '0 0 18px rgba(56,189,248,0.8)',
          transform: `scale(${nodeScale * pulse})`,
        }}
      />
      <div style={{ opacity: contentOpacity, transform: `translateX(${contentX}px)` }}>
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.64)',
            color: '#fff',
            padding: `${Math.round(fontSize * 0.16)}px ${Math.round(fontSize * 0.5)}px`,
            fontSize,
            fontWeight: 1000,
            boxShadow: '0 12px 34px rgba(0,0,0,0.45)',
            borderRight: '5px solid #38bdf8',
          }}
        >
          {period}
        </div>
        {description ? (
          <div
            style={{
              marginTop: 10,
              backgroundColor: 'rgba(8,58,128,0.78)',
              color: '#ebf7ff',
              padding: `${Math.round(fontSize * 0.14)}px ${Math.round(fontSize * 0.44)}px`,
              fontSize: fontSize * 0.82,
              fontWeight: 850,
              boxShadow: '0 12px 34px rgba(0,0,0,0.45)',
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
    </div>
  );
};
