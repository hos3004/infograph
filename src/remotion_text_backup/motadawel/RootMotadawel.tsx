import React from 'react';
import { Composition } from 'remotion';
import { MotadawelComposition } from './MotadawelComposition';
import type { MotadawelProps } from './types';

// Default props — used only by Remotion Studio / CLI preview
const defaultProps: MotadawelProps = {
  introVideoUrl:           null,
  mainVideoUrl:            'https://www.w3schools.com/html/mov_bbb.mp4',
  frameUrl:                null,
  outroVideoUrl:           null,
  mainText:                'عنوان الفيديو الرئيسي',
  videoScale:              1.0,
  videoX:                  0,
  videoY:                  0,
  effects:                 [],
  introDurationFrames:     30,
  mainVideoDurationFrames: 300,
  outroDurationFrames:     30,
  textBottomOffset:        160,
  textFontSize:            46,
  textPreset:              'dark',
  bgMusicUrl:              null,
  bgMusicVolume:           0.25,
};

export const MotadawelRoot: React.FC = () => (
  <>
    <Composition
      id="MotadawelVideo"
      component={MotadawelComposition}
      durationInFrames={360}   // overridden by calculateMetadata
      fps={25}
      width={1920}
      height={1080}
      defaultProps={defaultProps}
      calculateMetadata={({ props }) => {
        const p = props as MotadawelProps;
        const hasIntro = !!p.introVideoUrl && p.introDurationFrames > 0;
        const hasOutro = !!p.outroVideoUrl && p.outroDurationFrames > 0;

        const introFrames = hasIntro ? p.introDurationFrames : 0;
        const mainFrames = Math.max(30, p.mainVideoDurationFrames || 300);
        const outroFrames = hasOutro ? p.outroDurationFrames : 0;
        const OVERLAP_FRAMES = 75;
        const OUTRO_OVERLAP = 38;
        const introOverlap = hasIntro ? Math.min(OVERLAP_FRAMES, introFrames) : 0;
        const outroOverlap = hasOutro ? Math.min(OUTRO_OVERLAP, outroFrames) : 0;

        // main starts after intro minus introOverlap, ends mainFrames later
        // outro starts outroOverlap before main ends, so total = mainEnd + outroFrames - outroOverlap
        const mainStart = introFrames - introOverlap;
        const mainEnd = mainStart + mainFrames;
        const outroEnd = hasOutro ? (mainEnd - outroOverlap) + outroFrames : mainEnd;
        const total = Math.max(mainEnd, outroEnd);

        return {
          durationInFrames: Math.max(30, total),
          props: p,
        };
      }}
    />
  </>
);
