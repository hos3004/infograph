import React from 'react';
import { Composition } from 'remotion';
import { MainComposition } from './MainComposition';
import { CompositionProps } from './types';

// Default props — used by Remotion Studio / CLI preview only
// In production the render API always passes the full inputProps
const defaultProps: CompositionProps = {
  slides: [
    { id: '1', imageUrl: 'https://via.placeholder.com/1920x1080/1a1d24/e2e8f0?text=Slide+1', text: 'مرحباً، هذه الانطلاقة' },
    { id: '2', imageUrl: 'https://via.placeholder.com/1920x1080/2a2d34/e2e8f0?text=Slide+2', text: 'شريحة ثانية جميلة' },
  ],
  overlay:    null,
  music:      null,
  endPage:    null,
  slideDurationInSeconds: 5,
  effects:    [],
  endPageDurationFrames: 0,
  textBottomOffset: 160,
  textFontSize:     46,
  textPreset:       'dark',
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InfographicVideo"
        component={MainComposition}
        durationInFrames={150}   // overridden by calculateMetadata
        fps={25}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
        calculateMetadata={({ props }) => {
          const fps = 25;
          const framesPerSlide = Math.floor(props.slideDurationInSeconds * fps);
          const overlapFrames  = 30;
          const validLength    = props.slides.filter(s => s.imageUrl).length;

          // Use the actual detected end-page duration passed from the UI
          const endPageFrames  = props.endPageDurationFrames ?? 0;

          let totalDuration = framesPerSlide; // minimum: 1 slide
          if (validLength > 0) {
            totalDuration =
              (validLength * (framesPerSlide - overlapFrames))
              + overlapFrames
              + endPageFrames;
          }

          console.log(`[calculateMetadata] slides=${validLength}, framesPerSlide=${framesPerSlide}, endPageFrames=${endPageFrames}, total=${totalDuration}`);

          return {
            durationInFrames: Math.max(framesPerSlide, totalDuration),
            props,
          };
        }}
      />
    </>
  );
};
