export type PersonalityMediaType = 'image' | 'video';

export type PersonalityScene = {
  id: string;
  sceneNumber: number;
  title: string;
  sourceExcerpt?: string;
  ageStage?: string;
  timePeriod?: string;
  location?: string;
  voiceoverText?: string;
  imagePrompt?: string;
  motionPrompt?: string;
  visualContinuityNotes?: string;
  copiedImagePrompt?: boolean;
  copiedMotionPrompt?: boolean;
  mediaPath?: string;
  fileUrl?: string;
  mediaType?: PersonalityMediaType;
  voiceoverPath?: string | null;
  voiceoverUrl?: string | null;
  voiceoverDurationMs?: number;
  mediaDurationMs?: number;
  trimStartMs?: number;
  trimEndMs?: number | null;
};

export type PersonalitiesProps = {
  scenes: PersonalityScene[];
  placeholderUrl?: string | null;
  musicUrl?: string | null;
  musicVolume?: number;
  voiceoverVolume?: number;
  effects?: Array<'dust' | 'light-leak' | 'bokeh' | 'scanlines' | 'grain' | 'vignette' | 'cinematic-bars'>;
  endPageUrl?: string | null;
  endPageDurationFrames?: number;
  targetSceneDurationMs?: number;
  transitionFrames?: number;
  cinematicBarSize?: number;
};
