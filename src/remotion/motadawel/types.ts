// ── Motadawel Remotion Types ─────────────────────────────────────────────────
// Completely separate from InfographicVideo types.
// Output: 1920×1080 horizontal (landscape)

export type MotadawelTextPreset = 'dark' | 'gold' | 'blue' | 'red' | 'orange';
export type MotadawelEffect = 'dust' | 'light-leak' | 'bokeh' | 'scanlines' | 'grain' | 'vignette' | 'cinematic-bars';

export const MOTADAWEL_TEXT_PRESETS: Record<
  MotadawelTextPreset,
  { bg: string; color: string; border: string }
> = {
  dark:   { bg: 'rgba(0,0,0,0.68)',      color: '#ffffff', border: 'rgba(255,255,255,0.14)' },
  gold:   { bg: 'rgba(160,90,0,0.88)',   color: '#fff8e0', border: 'rgba(255,220,80,0.35)'  },
  blue:   { bg: 'rgba(0,45,130,0.90)',   color: '#e8f0ff', border: 'rgba(80,140,255,0.35)'  },
  red:    { bg: 'rgba(160,10,10,0.88)',  color: '#ffe8e8', border: 'rgba(255,80,80,0.35)'   },
  orange: { bg: 'rgba(230,90,0,0.95)',   color: '#ffffff', border: 'rgba(255,180,60,0.55)'  },
};

export type MotadawelProps = {
  // Media URLs (provided at runtime by the media server)
  introVideoUrl:  string | null;
  mainVideoUrl:   string;
  frameUrl:       string | null;  // PNG or video overlay on top of main
  outroVideoUrl:  string | null;

  // Text
  mainText: string;

  // Main video transform (lets user reframe portrait videos in landscape)
  videoScale: number;   // 1.0 = original
  videoX:     number;   // px offset from center
  videoY:     number;   // px offset from center

  // Visual effects
  effects: MotadawelEffect[];

  // Duration (in frames @ 30fps)
  introDurationFrames:    number;   // 30 = 1s
  mainVideoDurationFrames: number;
  outroDurationFrames:    number;   // 30 = 1s

  // Text style
  textBottomOffset: number;
  textFontSize:     number;
  textPreset:       MotadawelTextPreset;
  textAnimationType?: 'motion-blur' | 'typewriter';
  cinematicBarSize?: number;

  // Background music
  bgMusicUrl?: string | null;
  bgMusicVolume?: number;
};
