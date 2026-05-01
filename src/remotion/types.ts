export type SlideData = {
  id: string;
  imageUrl: string;
  text?: string;
  isMuted?: boolean;
};

export type VisualEffect = 'dust' | 'light-leak' | 'bokeh' | 'scanlines' | 'grain' | 'vignette' | 'cinematic-bars';

// Text bar color presets
export type TextPreset = 'dark' | 'gold' | 'blue' | 'red' | 'orange';

export const TEXT_PRESETS: Record<TextPreset, { bg: string; color: string; border: string }> = {
  dark:   { bg: 'rgba(0,0,0,0.65)',      color: '#ffffff', border: 'rgba(255,255,255,0.12)' },
  gold:   { bg: 'rgba(160,90,0,0.88)',   color: '#fff8e0', border: 'rgba(255,220,80,0.35)'  },
  blue:   { bg: 'rgba(0,45,130,0.90)',   color: '#e8f0ff', border: 'rgba(80,140,255,0.35)'  },
  red:    { bg: 'rgba(160,10,10,0.88)',  color: '#ffe8e8', border: 'rgba(255,80,80,0.35)'   },
  orange: { bg: 'rgba(230,90,0,0.95)',   color: '#ffffff', border: 'rgba(255,180,60,0.55)'  },
};

export type CompositionProps = {
  slides: SlideData[];
  overlay: string | null;
  music: string | null;
  voiceover?: string | null;
  musicVolume?: number;
  voiceoverVolume?: number;
  endPage: string | null;
  slideDurationInSeconds: number;
  effects: VisualEffect[];
  endPageDurationFrames: number;

  // Text appearance (applies to ALL slides)
  textBottomOffset: number;  // px from bottom in 1920×1080 space (default 160 = safe for TV ticker)
  textFontSize: number;      // px (default 46)
  textPreset: TextPreset;    // color preset
  textAnimationType?: 'motion-blur' | 'typewriter';
  cinematicBarSize?: number;
};
