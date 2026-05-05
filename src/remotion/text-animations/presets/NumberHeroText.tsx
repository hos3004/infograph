import React from 'react';
import { interpolate } from 'remotion';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { extractNumberHero } from '../textUtils';
import { FONT_FAMILY } from '../textStyles';

function normalizeDigit(char: string): string {
  const code = char.charCodeAt(0);
  if (code >= 0x0660 && code <= 0x0669) return String(code - 0x0660);
  if (code >= 0x06f0 && code <= 0x06f9) return String(code - 0x06f0);
  return char;
}

function getNumberParts(valueText: string): {
  target: number | null;
  decimals: number;
  unit: string;
  fallback: string;
} {
  const normalized = Array.from(valueText).map(normalizeDigit).join('');
  const match = normalized.match(/\d+(?:[.,]\d+)?/);
  const hasPercent = valueText.includes('%') || valueText.includes('٪');

  if (!match) {
    return {
      target: null,
      decimals: 0,
      unit: hasPercent ? '%' : '',
      fallback: valueText,
    };
  }

  const numericText = match[0].replace(',', '.');
  const decimalPart = numericText.split('.')[1] ?? '';
  const extraUnit = normalized
    .replace(match[0], '')
    .replace(/[.,\s]/g, '')
    .replace(/٪/g, '%');

  return {
    target: Number(numericText),
    decimals: decimalPart.length,
    unit: hasPercent ? '%' : extraUnit,
    fallback: valueText,
  };
}

function splitDescription(description: string): string[] {
  const words = description.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 3) return description ? [description] : [];

  const middle = Math.min(words.length - 1, Math.ceil(words.length * 0.65));
  return [
    words.slice(0, middle).join(' '),
    words.slice(middle).join(' '),
  ].filter(Boolean);
}

export const NumberHeroText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  fontSize,
}) => {
  const { valueText, description } = extractNumberHero(text);
  const { target, decimals, unit, fallback } = getNumberParts(valueText);
  const descriptionLines = splitDescription(description);

  const countProgress = interpolate(frame, [0, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const easedCountProgress = 1 - Math.pow(1 - countProgress, 3);
  const displayNumber = target === null
    ? fallback
    : decimals > 0
      ? (target * easedCountProgress).toFixed(decimals)
      : String(Math.round(target * easedCountProgress));

  const numberScale = interpolate(frame, [0, 18, 34], [0.62, 1.12, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const numberOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const unitIn = interpolate(frame, [10, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const unitPulseGate = interpolate(frame, [44, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const unitPulse = 1 + Math.sin(Math.max(0, frame - 48) / 8) * 0.18 * unitPulseGate;

  const descY = interpolate(frame, [30, 52], [28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const descOpacity = interpolate(frame, [30, 48], [0, 1], {
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
          width: 'min(1080px, 82%)',
          transform: 'translateY(18px)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            flexDirection: 'row',
            direction: 'ltr',
            gap: Math.max(8, fontSize * 0.16),
            opacity: numberOpacity,
            transform: `scale(${numberScale})`,
            transformOrigin: 'center center',
            filter: `drop-shadow(0 0 34px rgba(255,225,154,0.48)) drop-shadow(0 14px 28px rgba(0,0,0,0.62))`,
          }}
        >
          {unit ? (
            <span
              style={{
                display: 'inline-block',
                color: '#ffffff',
                fontSize: fontSize * 1.22,
                fontWeight: 1000,
                lineHeight: 1,
                opacity: unitIn,
                transform: `translateY(-${fontSize * 0.1}px) scale(${unitIn * unitPulse})`,
                transformOrigin: 'center center',
                textShadow: '0 8px 28px rgba(0,0,0,0.72)',
              }}
            >
              {unit}
            </span>
          ) : null}
          <span
            style={{
              display: 'inline-block',
              color: '#ffe19a',
              fontSize: fontSize * 2.45,
              fontWeight: 1000,
              lineHeight: 0.92,
              letterSpacing: 0,
              minWidth: `${Math.max(2, displayNumber.length)}ch`,
              textAlign: 'left',
            }}
          >
            {displayNumber}
          </span>
        </div>

        {descriptionLines.length > 0 ? (
          <div
            style={{
              marginTop: Math.max(12, fontSize * 0.22),
              color: '#ffffff',
              fontSize: fontSize * 0.92,
              fontWeight: 1000,
              lineHeight: 1.18,
              opacity: descOpacity,
              transform: `translateY(${descY}px)`,
              textShadow: '0 10px 30px rgba(0,0,0,0.78)',
              whiteSpace: 'normal',
            }}
          >
            {descriptionLines.map((line, index) => (
              <span key={`${line}-${index}`} style={{ display: 'block' }}>
                {line}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
