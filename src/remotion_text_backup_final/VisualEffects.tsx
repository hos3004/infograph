import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { VisualEffect } from './types';

interface VisualEffectsProps {
  effects: VisualEffect[];
  cinematicBarSize?: number;
}

export const VisualEffects: React.FC<VisualEffectsProps> = ({ effects, cinematicBarSize = 6 }) => {
  if (!effects || effects.length === 0) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 10 }}>
      {effects.includes('dust')           && <DustParticles />}
      {effects.includes('light-leak')     && <LightLeaks />}
      {effects.includes('bokeh')          && <BokehEffect />}
      {effects.includes('scanlines')      && <Scanlines />}
      {effects.includes('grain')          && <FilmGrain />}
      {effects.includes('vignette')       && <Vignette />}
      {effects.includes('cinematic-bars') && <CinematicBars barSize={cinematicBarSize} />}
    </AbsoluteFill>
  );
};

// ─── 1. Dust Particles ────────────────────────────────────────────────────────
// 50 deterministic white/golden specks drifting upward with soft oscillation
const DustParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const COUNT = 50;

  const particles = Array.from({ length: COUNT }, (_, i) => {
    // Deterministic positions from index seed
    const seedX    = (Math.sin(i * 127.1 + 311.7) * 0.5 + 0.5);
    const seedY    = (Math.sin(i * 43.3  + 17.9)  * 0.5 + 0.5);
    const speed    = 0.25 + (Math.sin(i * 7.3) * 0.5 + 0.5) * 0.35;
    const wobble   = Math.sin(frame * 0.04 + i * 1.7) * 14;
    const x        = (seedX * 1920 + wobble + frame * speed * 0.3) % 1920;
    const rawY     = seedY * 1080 - (frame * speed) % 1080;
    const y        = ((rawY % 1080) + 1080) % 1080;
    const size     = 1.5 + (Math.sin(i * 5.7) * 0.5 + 0.5) * 3;
    const opacity  = 0.08 + (Math.sin(i * 2.3 + frame * 0.02) * 0.5 + 0.5) * 0.22;
    const isGolden = i % 4 === 0;
    return { x, y, size, opacity, isGolden };
  });

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" style={{ position: 'absolute' }}>
        {particles.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill={p.isGolden ? '#ffd080' : '#ffffff'}
            opacity={p.opacity}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// ─── 2. Light Leaks ───────────────────────────────────────────────────────────
// Warm amber/orange radial light blobs that drift slowly across corners
const LightLeaks: React.FC = () => {
  const frame = useCurrentFrame();

  // Leak 1 — top-left drift
  const x1 = interpolate(Math.sin(frame * 0.012), [-1, 1], [-200, 100]);
  const y1 = interpolate(Math.cos(frame * 0.009), [-1, 1], [-150, 50]);
  const op1 = interpolate(Math.sin(frame * 0.018), [-1, 1], [0.08, 0.22]);

  // Leak 2 — bottom-right drift
  const x2 = interpolate(Math.sin(frame * 0.014 + 2), [-1, 1], [1600, 2000]);
  const y2 = interpolate(Math.cos(frame * 0.011 + 1), [-1, 1], [700, 1000]);
  const op2 = interpolate(Math.sin(frame * 0.016 + 1), [-1, 1], [0.05, 0.18]);

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" style={{ position: 'absolute' }}>
        <defs>
          <radialGradient id="lg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff9900" stopOpacity="1" />
            <stop offset="60%"  stopColor="#ff5500" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff3300" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffcc44" stopOpacity="1" />
            <stop offset="70%"  stopColor="#ff8800" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Leak blob 1 */}
        <ellipse
          cx={x1} cy={y1}
          rx={500} ry={380}
          fill="url(#lg1)"
          opacity={op1}
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Leak blob 2 */}
        <ellipse
          cx={x2} cy={y2}
          rx={420} ry={320}
          fill="url(#lg2)"
          opacity={op2}
          style={{ mixBlendMode: 'screen' }}
        />
      </svg>
    </AbsoluteFill>
  );
};

// ─── 3. Bokeh ─────────────────────────────────────────────────────────────────
// Large out-of-focus blurred circles drifting slowly — like background city lights
const BokehEffect: React.FC = () => {
  const frame = useCurrentFrame();

  const circles = [
    { baseX: 200,  baseY: 200,  r: 160, color: 'rgba(255,200,80,0.18)',  speed: 0.008, phase: 0   },
    { baseX: 700,  baseY: 800,  r: 220, color: 'rgba(200,150,255,0.12)', speed: 0.011, phase: 1.2 },
    { baseX: 1400, baseY: 150,  r: 190, color: 'rgba(100,200,255,0.10)', speed: 0.009, phase: 2.1 },
    { baseX: 1700, baseY: 700,  r: 250, color: 'rgba(255,160,80,0.14)',  speed: 0.007, phase: 3.0 },
    { baseX: 960,  baseY: 500,  r: 130, color: 'rgba(255,240,180,0.10)', speed: 0.013, phase: 0.7 },
    { baseX: 400,  baseY: 600,  r: 170, color: 'rgba(180,220,255,0.10)', speed: 0.010, phase: 1.8 },
  ];

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" style={{ position: 'absolute' }}>
        <defs>
          <filter id="bokeh-blur">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>

        {circles.map((c, i) => {
          const dx = Math.sin(frame * c.speed + c.phase) * 60;
          const dy = Math.cos(frame * c.speed + c.phase + 0.5) * 40;
          return (
            <circle
              key={i}
              cx={c.baseX + dx}
              cy={c.baseY + dy}
              r={c.r}
              fill={c.color}
              filter="url(#bokeh-blur)"
              style={{ mixBlendMode: 'screen' }}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ─── 4. Scanlines (CRT Effect) ────────────────────────────────────────────────
const Scanlines: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.5) % 10;
  return (
    <AbsoluteFill style={{ 
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', 
      backgroundSize: '100% 8px',
      backgroundPosition: `0px ${drift}px`,
      mixBlendMode: 'overlay',
      opacity: 0.4
    }} />
  );
};

// ─── 5. Film Grain ────────────────────────────────────────────────────────────
// Deterministic grain using SVG feTurbulence with a low octave count
const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  // We use a modulo operation to create a fast but deterministic "flicker" 
  // pattern across frames (e.g. 10 frames loop) without recalculating pure random turbulence
  const offset = (frame % 10) * 10;
  
  return (
    <AbsoluteFill style={{ overflow: 'hidden', mixBlendMode: 'overlay', opacity: 0.15 }}>
      <svg
        width="200%"
        height="200%"
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          transform: `translate(${offset}px, ${offset}px)`
        }}
      >
        <filter id="film-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="1" seed="10" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </AbsoluteFill>
  );
};

// ─── 6. Vignette ──────────────────────────────────────────────────────────────
const Vignette: React.FC = () => {
  return (
    <AbsoluteFill style={{
      background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.85) 150%)',
      mixBlendMode: 'multiply',
    }} />
  );
};

// ─── 7. Cinematic Bars (Letterbox) ────────────────────────────────────────────
const CinematicBars: React.FC<{ barSize: number }> = ({ barSize }) => {
  const heightStr = `${barSize}%`;
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ width: '100%', height: heightStr, backgroundColor: '#000' }} />
      <div style={{ width: '100%', height: heightStr, backgroundColor: '#000' }} />
    </AbsoluteFill>
  );
};

