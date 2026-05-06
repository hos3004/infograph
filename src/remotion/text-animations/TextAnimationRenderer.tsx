import React from 'react';
import type { TextAnimationPreset, TextPreset } from '../types';
import { ParallaxDepth } from './ParallaxDepth';

import { MotionBlurText } from './presets/MotionBlurText';
import { TypewriterText } from './presets/TypewriterText';
import { LiveRevealDotText } from './presets/LiveRevealDotText';
import { BroadcastSplitText } from './presets/BroadcastSplitText';
import { NewsLedgerText } from './presets/NewsLedgerText';
import { NumberHeroText } from './presets/NumberHeroText';
import { LayeredTitleText } from './presets/LayeredTitleText';
import { MorphCompareText } from './presets/MorphCompareText';
import { ImpactShockText } from './presets/ImpactShockText';
import { WordByWordText } from './presets/WordByWordText';
import { TimelineMarkerText } from './presets/TimelineMarkerText';
import { CinematicRevealText } from './presets/CinematicRevealText';
import { SplitLinesStaggerText } from './presets/SplitLinesStaggerText';
import { HighlightSweepText } from './presets/HighlightSweepText';
import { KineticKeywordText } from './presets/KineticKeywordText';

export type TextAnimationCommonProps = {
  text: string;
  frame: number;
  isFirst: boolean;
  bottomOffset: number;
  fontSize: number;
  textPreset: TextPreset;
  textHorizontalOffset?: number;
};

type Props = TextAnimationCommonProps & {
  textAnimationType?: TextAnimationPreset;
  parallaxEnabled?: boolean;
};

export const TextAnimationRenderer: React.FC<Props> = (props) => {
  const preset = props.textAnimationType ?? 'motion-blur';
  const shift = props.textHorizontalOffset ?? 0;

  const rendered = (() => {
    switch (preset) {
      case 'typewriter':
        return <TypewriterText {...props} />;

      case 'live-reveal-dot':
        return <LiveRevealDotText {...props} />;

      case 'broadcast-split':
        return <BroadcastSplitText {...props} />;

      case 'news-ledger':
        return <NewsLedgerText {...props} />;

      case 'number-hero':
        return <NumberHeroText {...props} />;

      case 'layered-title':
        return <LayeredTitleText {...props} />;

      case 'morph-compare':
        return <MorphCompareText {...props} />;

      case 'impact-shock':
        return <ImpactShockText {...props} />;

      case 'word-by-word':
        return <WordByWordText {...props} />;

      case 'timeline-marker':
        return <TimelineMarkerText {...props} />;

      case 'cinematic-reveal':
        return <CinematicRevealText {...props} />;

      case 'split-lines-stagger':
        return <SplitLinesStaggerText {...props} />;

      case 'highlight-sweep':
        return <HighlightSweepText {...props} />;

      case 'kinetic-keyword':
        return <KineticKeywordText {...props} />;

      case 'motion-blur':
      default:
        return <MotionBlurText {...props} />;
    }
  })();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: shift !== 0 ? `translateX(${shift}%)` : undefined,
        pointerEvents: 'none',
      }}
    >
      <ParallaxDepth
        frame={props.frame}
        enabled={props.parallaxEnabled ?? true}
        delayFrames={52}
        strength={1}
      >
        {rendered}
      </ParallaxDepth>
    </div>
  );
};
