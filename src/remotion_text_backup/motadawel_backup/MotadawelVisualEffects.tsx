import React from 'react';
import { AbsoluteFill } from 'remotion';
import type { MotadawelEffect } from './types';

// ── Dust particles ─────────────────────────────────────────────────────────
const DustEffect: React.FC = () => {
  const particles = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < 60; i++) {
      const seed = i * 1.618;
      list.push({
        cx: (seed * 137.5) % 1920,
        cy: (seed * 89.3)  % 1080,
        r:  1 + (seed % 3),
        opacity: 0.08 + (seed % 0.12),
      });
    }
    return list;
  }, []);

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" style={{ position: 'absolute', opacity: 0.6 }}>
        {particles.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#fff" opacity={p.opacity} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// ── Light leak ────────────────────────────────────────────────────────────
const LightLeakEffect: React.FC = () => (
  <AbsoluteFill>
    <svg width="1920" height="1080" style={{ position: 'absolute' }}>
      <defs>
        <radialGradient id="ml1" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ff9900" stopOpacity="0.9" />
          <stop offset="60%"  stopColor="#ff5500" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff3300" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="220" cy="200" rx="320" ry="220" fill="url(#ml1)" opacity="0.18" />
    </svg>
  </AbsoluteFill>
);

// ── Bokeh ─────────────────────────────────────────────────────────────────
const BokehEffect: React.FC = () => {
  const circles = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < 12; i++) {
      const s = i * 2.7;
      list.push({
        cx: (s * 173) % 1920,
        cy: (s * 97)  % 1080,
        r: 30 + (s % 60),
        opacity: 0.04 + (s % 0.06),
      });
    }
    return list;
  }, []);

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" style={{ position: 'absolute' }}>
        <defs>
          <filter id="mb">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#ffffaa" opacity={c.opacity} filter="url(#mb)" />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// ── MotadawelVisualEffects ─────────────────────────────────────────────────
export const MotadawelVisualEffects: React.FC<{ effects: MotadawelEffect[] }> = ({ effects }) => (
  <>
    {effects.includes('dust')       && <DustEffect />}
    {effects.includes('light-leak') && <LightLeakEffect />}
    {effects.includes('bokeh')      && <BokehEffect />}
  </>
);
