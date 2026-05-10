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
  textFontSize:     65,
  textPreset:       'orange',
  textAnimationType: 'live-reveal-dot',
  parallaxEnabled: true,
  textHorizontalOffset: 0,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InfographicVideo"
        component={MainComposition}
        durationInFrames={150}   // overridden by calculateMetadata
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
        calculateMetadata={({ props }) => {
          const fps = 30;
          const framesPerSlide = Math.floor(props.slideDurationInSeconds * fps);
          const overlapFrames  = 30;
          const validSlides    = props.slides.filter(s => s.imageUrl);
          const validLength    = validSlides.length;
          const coverFrames    = Math.round(3 * fps);

          // Use the actual detected end-page duration passed from the UI
          const endPageFrames  = props.endPageDurationFrames ?? 0;
          const EP_FADE_FRAMES = 60; // 2 seconds overlap at 30 fps

          let totalDuration = framesPerSlide; // minimum: 1 slide
          if (validLength > 0) {
            let currentStart = 0;
            let slideEndFrame = 0;
            validSlides.forEach((slide, index) => {
              const duration = index === 0 && slide.slideType === 'cover' ? coverFrames : framesPerSlide;
              slideEndFrame = Math.max(slideEndFrame, currentStart + duration);
              currentStart += duration - overlapFrames;
            });
            totalDuration = endPageFrames > 0 
              ? slideEndFrame + endPageFrames - EP_FADE_FRAMES
              : slideEndFrame;
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
