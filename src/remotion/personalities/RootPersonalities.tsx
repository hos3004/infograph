import React from 'react';
import { Composition } from 'remotion';
import { PersonalitiesComposition } from './PersonalitiesComposition';
import type { PersonalitiesProps } from './types';

const FPS = 25;

const getTrimmedDurationMs = (scene: PersonalitiesProps['scenes'][number], fallbackSceneDurationMs: number) => {
  const mediaDurationMs = Math.max(0, Number(scene.mediaDurationMs || 0));
  const trimStartMs = Math.max(0, Number(scene.trimStartMs || 0));
  const trimEndMs = scene.trimEndMs == null ? null : Math.max(trimStartMs, Number(scene.trimEndMs || trimStartMs));

  if (scene.mediaType !== 'video') {
    return Math.max(1000, Number(scene.voiceoverDurationMs || 0) || fallbackSceneDurationMs);
  }

  if (trimEndMs != null && trimEndMs > trimStartMs) {
    return Math.max(1000, trimEndMs - trimStartMs);
  }

  if (mediaDurationMs > trimStartMs) {
    return Math.max(1000, mediaDurationMs - trimStartMs);
  }

  return Math.max(1000, fallbackSceneDurationMs);
};

const getSceneDurationMs = (scene: PersonalitiesProps['scenes'][number], fallbackSceneDurationMs: number) => {
  const trimmedDurationMs = getTrimmedDurationMs(scene, fallbackSceneDurationMs);
  const voiceoverDurationMs = Math.max(0, Number(scene.voiceoverDurationMs || 0));

  if (scene.mediaType === 'video') {
    if (voiceoverDurationMs > 0) {
      return Math.max(1000, Math.min(trimmedDurationMs, voiceoverDurationMs));
    }
    return trimmedDurationMs;
  }

  if (voiceoverDurationMs > 0) {
    return Math.max(1000, voiceoverDurationMs);
  }

  return Math.max(1000, fallbackSceneDurationMs);
};

const calculateDurationInFrames = (props: PersonalitiesProps) => {
  const targetSceneDurationMs = Number(props.targetSceneDurationMs || 8000);
  const transitionFrames = Number(props.transitionFrames || 20);
  const safeScenes = (Array.isArray(props.scenes) ? props.scenes : []).filter(
    (scene) => scene && (scene.fileUrl || props.placeholderUrl || scene.voiceoverUrl),
  );

  if (safeScenes.length === 0) {
    return 25;
  }

  let currentStart = 0;
  let maxFrame = 0;

  safeScenes.forEach((scene) => {
    const sceneDurationMs = getSceneDurationMs(scene, targetSceneDurationMs);
    const sceneFrames = Math.max(1, Math.round((sceneDurationMs / 1000) * FPS));
    maxFrame = Math.max(maxFrame, currentStart + sceneFrames);
    currentStart += Math.max(1, sceneFrames - transitionFrames);
  });

  if (props.endPageUrl && Number(props.endPageDurationFrames || 0) > 0) {
    const endPageFrames = Math.max(0, Number(props.endPageDurationFrames || 0));
    const fadeFrames = Math.min(Math.round(FPS * 1.5), Math.max(8, endPageFrames));
    maxFrame += endPageFrames - fadeFrames;
  }

  return Math.max(25, maxFrame);
};

const defaultProps: PersonalitiesProps = {
  scenes: [],
  placeholderUrl: null,
  musicUrl: null,
  musicVolume: 0.3,
  voiceoverVolume: 1,
  effects: ['dust', 'light-leak', 'bokeh'],
  endPageUrl: null,
  endPageDurationFrames: 0,
  targetSceneDurationMs: 8000,
  transitionFrames: 20,
  cinematicBarSize: 6,
};

export const PersonalitiesRoot: React.FC = () => (
  <Composition
    id="PersonalitiesVideo"
    component={PersonalitiesComposition}
    width={1920}
    height={1080}
    fps={FPS}
    durationInFrames={250}
    defaultProps={defaultProps}
    calculateMetadata={({ props }) => ({
      durationInFrames: calculateDurationInFrames(props as PersonalitiesProps),
    })}
  />
);
