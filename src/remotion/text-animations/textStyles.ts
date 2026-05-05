import React from 'react';

export const FONT_FAMILY = 'RB';

export function getTextContainerStyle(bottomOffset: number): React.CSSProperties {
  return {
    position: 'absolute',
    bottom: bottomOffset,
    left: '20%',
    width: 'max-content',
    maxWidth: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 12,
  };
}

export function getLineStyle(params: {
  bg: string;
  color: string;
  border: string;
  fontSize: number;
  radius?: number;
}): React.CSSProperties {
  const { bg, color, border, fontSize, radius = 0 } = params;

  return {
    position: 'relative',
    overflow: 'hidden',
    width: 'max-content',
    maxWidth: '100%',
    background: bg,
    color,
    padding: `${Math.round(fontSize * 0.15)}px ${Math.round(fontSize * 0.45)}px`,
    borderRadius: radius,
    fontSize,
    fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
    fontWeight: 'bold',
    textAlign: 'right',
    lineHeight: 1.4,
    boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
    border: `1px solid ${border}`,
    backdropFilter: 'blur(8px)',
    direction: 'rtl',
    letterSpacing: 0,
  };
}
