import React from 'react';
import { interpolate } from 'remotion';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { splitLines } from '../textUtils';
import { FONT_FAMILY } from '../textStyles';

function getFallbackParts(text: string): {
  kicker: string;
  headline: string;
  body: string;
  highlight: string;
} {
  const lines = splitLines(text);

  return {
    kicker: lines[0] || 'تقرير خاص',
    headline: lines[1] || lines[0] || text,
    body: lines[2] || '',
    highlight: lines[3] || '',
  };
}

export const NewsLedgerText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
}) => {
  const { kicker, headline, body, highlight } = getFallbackParts(text);

  const containerIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panelY = interpolate(frame, [0, 28], [54, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panelBlur = interpolate(frame, [0, 22], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const kickerX = interpolate(frame, [8, 28], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [18, 42], [42, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bodyY = interpolate(frame, [32, 56], [28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const highlightX = interpolate(frame, [44, 70], [-74, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const kickerOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineOpacity = interpolate(frame, [18, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bodyOpacity = interpolate(frame, [32, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const highlightOpacity = interpolate(frame, [44, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const accentProgress = interpolate(frame, [24, 76], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scan = interpolate(frame, [52, 112], [-110, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 112,
        bottom: Math.max(86, bottomOffset - 28),
        width: 920,
        maxWidth: '52%',
        direction: 'rtl',
        fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
        pointerEvents: 'none',
        opacity: containerIn,
        transform: `translateY(${panelY}px)`,
        filter: `blur(${panelBlur}px)`,
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 28,
          padding: `${Math.round(fontSize * 0.58)}px ${Math.round(fontSize * 0.72)}px`,
          background: 'linear-gradient(135deg, rgba(7,12,20,0.88) 0%, rgba(18,27,42,0.72) 54%, rgba(0,0,0,0.58) 100%)',
          border: '1px solid rgba(255,255,255,0.16)',
          boxShadow: '0 28px 80px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.16)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: `${accentProgress}%`,
            height: 5,
            background: 'linear-gradient(90deg, rgba(255,225,154,0), #ffe19a 42%, #ff3b30 100%)',
            opacity: 0.95,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(110deg, transparent ${scan - 18}%, rgba(255,255,255,0.13) ${scan}%, transparent ${scan + 18}%)`,
            opacity: frame > 48 && frame < 118 ? 1 : 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            opacity: kickerOpacity,
            transform: `translateX(${kickerX}px)`,
            background: 'rgba(255,59,48,0.92)',
            color: '#fff',
            borderRadius: 999,
            padding: `${Math.max(7, fontSize * 0.13)}px ${Math.max(18, fontSize * 0.34)}px`,
            fontSize: fontSize * 0.44,
            fontWeight: 1000,
            letterSpacing: 0,
            boxShadow: '0 10px 24px rgba(255,59,48,0.25)',
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 999,
              background: '#ffe19a',
              boxShadow: '0 0 16px rgba(255,225,154,0.9)',
            }}
          />
          {kicker}
        </div>

        <div
          style={{
            position: 'relative',
            marginTop: fontSize * 0.32,
            color: '#ffffff',
            fontSize: fontSize * 1.36,
            fontWeight: 1000,
            lineHeight: 1.08,
            textAlign: 'right',
            textShadow: '0 12px 36px rgba(0,0,0,0.7)',
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          {headline}
        </div>

        {body ? (
          <div
            style={{
              position: 'relative',
              marginTop: fontSize * 0.26,
              color: 'rgba(255,255,255,0.84)',
              fontSize: fontSize * 0.58,
              fontWeight: 800,
              lineHeight: 1.55,
              maxWidth: '94%',
              marginRight: 0,
              opacity: bodyOpacity,
              transform: `translateY(${bodyY}px)`,
            }}
          >
            {body}
          </div>
        ) : null}

        {highlight ? (
          <div
            style={{
              position: 'relative',
              marginTop: fontSize * 0.38,
              opacity: highlightOpacity,
              transform: `translateX(${highlightX}px)`,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                maxWidth: '100%',
                background: 'linear-gradient(135deg, rgba(255,59,48,0.96), rgba(185,28,28,0.94))',
                color: '#ffffff',
                borderRadius: 18,
                padding: `${Math.round(fontSize * 0.18)}px ${Math.round(fontSize * 0.42)}px`,
                fontSize: fontSize * 0.7,
                fontWeight: 1000,
                lineHeight: 1.25,
                boxShadow: '0 16px 36px rgba(185,28,28,0.36)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              {highlight}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
