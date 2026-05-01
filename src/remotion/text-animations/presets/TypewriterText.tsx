import React from 'react';
import { TEXT_PRESETS } from '../../types';
import type { TextAnimationCommonProps } from '../TextAnimationRenderer';
import { getLineStyle, getTextContainerStyle } from '../textStyles';

export const TypewriterText: React.FC<TextAnimationCommonProps> = ({
  text,
  frame,
  bottomOffset,
  fontSize,
  textPreset,
}) => {
  const colors = TEXT_PRESETS[textPreset] ?? TEXT_PRESETS.dark;
  const chars = Array.from(text.replace(/\+\+/g, ' '));
  const charsToShow = Math.min(chars.length, Math.max(0, Math.floor((frame - 5) / 1.2)));
  const visible = chars.slice(0, charsToShow).join('');
  const cursorOn = charsToShow < chars.length && Math.floor(frame / 8) % 2 === 0;

  return (
    <div style={getTextContainerStyle(bottomOffset)}>
      <div
        style={getLineStyle({
          bg: colors.bg,
          color: colors.color,
          border: colors.border,
          fontSize,
        })}
      >
        {visible}
        {cursorOn ? (
          <span
            style={{
              display: 'inline-block',
              width: 3,
              height: '0.85em',
              backgroundColor: colors.color,
              marginRight: 6,
              verticalAlign: 'middle',
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
