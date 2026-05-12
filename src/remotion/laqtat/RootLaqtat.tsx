import React from 'react';
import { Composition } from 'remotion';
import { LaqtatComposition } from './LaqtatComposition';
import type { LaqtatProps } from './types';

const defaultProps: LaqtatProps = {
  mainVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  frameUrl: null,
  mainText: '',
  videoScale: 1,
  videoX: 0,
  videoY: 0,
  effects: [],
  textBottomOffset: 160,
  textFontSize: 46,
  textPreset: 'dark',
  textAnimationType: 'motion-blur',
  cinematicBarSize: 6,
  bgMusicUrl: null,
  bgMusicVolume: 0.25,
  fitMode: 'blurred-background',
  blurBackgroundAmount: 36,
  backgroundScale: 1.18,
  keepSourceAudio: false,
  segments: [
    { id: 'segment-1', startMs: 0, endMs: 12000, label: 'مقطع 1' },
  ],
  blurRegions: [],
};

export const LaqtatRoot: React.FC = () => (
  <>
    <Composition
      id="LaqtatVideo"
      component={LaqtatComposition}
      durationInFrames={300}
      fps={25}
      width={1920}
      height={1080}
      defaultProps={defaultProps}
      calculateMetadata={({ props }) => {
        const p = props as LaqtatProps;
        const totalFrames = (Array.isArray(p.segments) ? p.segments : [])
          .map((segment) => Math.max(1, Math.round(((segment.endMs - segment.startMs) / 1000) * 25)))
          .reduce((sum, frames) => sum + frames, 0);

        return {
          durationInFrames: Math.max(25, totalFrames || 25),
          props: p,
        };
      }}
    />
  </>
);
