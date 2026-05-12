import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  Video,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  getRemotionEnvironment,
} from 'remotion';
import { VisualEffects } from '../VisualEffects';
import type { PersonalitiesProps, PersonalityScene } from './types';

const FPS = 25;
const IS_PLAYER = getRemotionEnvironment().isPlayer;

type AdaptiveVideoProps = React.ComponentProps<typeof Video>;

const AdaptiveVideo: React.FC<AdaptiveVideoProps> = (props) => {
  if (!props.src) {
    return null;
  }

  if (IS_PLAYER) {
    return <Video {...props} />;
  }

  return <OffthreadVideo {...(props as React.ComponentProps<typeof OffthreadVideo>)} />;
};

const isVideoUrl = (value?: string | null) => /\.(mp4|mov|webm|m4v|mkv)$/i.test(value || '');

const getTrimmedDurationMs = (scene: PersonalityScene, fallbackSceneDurationMs: number) => {
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

const getSceneDurationMs = (scene: PersonalityScene, fallbackSceneDurationMs: number) => {
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

const SceneMedia: React.FC<{
  scene: PersonalityScene;
  placeholderUrl: string | null;
  durationInFrames: number;
}> = ({ scene, placeholderUrl, durationInFrames }) => {
  const sourceUrl = scene.fileUrl || placeholderUrl;

  if (!sourceUrl) {
    return <AbsoluteFill style={{ backgroundColor: '#05070b' }} />;
  }

  if (scene.mediaType === 'video' || isVideoUrl(sourceUrl)) {
    const startFrom = Math.max(0, Math.round((Number(scene.trimStartMs || 0) / 1000) * FPS));
    const endFromTrim = scene.trimEndMs == null
      ? null
      : Math.max(startFrom + 1, Math.round((Number(scene.trimEndMs || 0) / 1000) * FPS));
    const endAt = endFromTrim != null ? endFromTrim : startFrom + Math.max(1, durationInFrames);

    return (
      <AdaptiveVideo
        src={sourceUrl}
        startFrom={startFrom}
        endAt={endAt}
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />
    );
  }

  return (
    <Img
      src={sourceUrl}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  );
};

const SceneLayer: React.FC<{
  scene: PersonalityScene;
  index: number;
  placeholderUrl: string | null;
}> = ({ scene, index, placeholderUrl }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scaleStart = index % 2 === 0 ? 1.02 : 1.08;
  const scaleEnd = index % 2 === 0 ? 1.08 : 1.02;
  const scale = interpolate(frame, [0, durationInFrames], [scaleStart, scaleEnd], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, Math.min(18, durationInFrames - 1)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', opacity }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <SceneMedia scene={scene} placeholderUrl={placeholderUrl} durationInFrames={durationInFrames} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.05) 38%, rgba(0,0,0,0.28) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

const EndPageFade: React.FC<{ src: string; fadeFrames: number }> = ({ src, fadeFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (isVideoUrl(src)) {
    return (
      <AbsoluteFill style={{ backgroundColor: '#000', opacity }}>
        <AdaptiveVideo src={src} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', opacity }}>
      <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </AbsoluteFill>
  );
};

export const PersonalitiesComposition: React.FC<PersonalitiesProps> = ({
  scenes,
  placeholderUrl = null,
  musicUrl = null,
  musicVolume = 0.3,
  voiceoverVolume = 1,
  effects = [],
  endPageUrl = null,
  endPageDurationFrames = 0,
  targetSceneDurationMs = 8000,
  transitionFrames = 20,
  cinematicBarSize = 6,
}) => {
  const { durationInFrames } = useVideoConfig();
  const safeScenes = React.useMemo(
    () => (Array.isArray(scenes) ? scenes : []).filter((scene) => scene && (scene.fileUrl || placeholderUrl || scene.voiceoverUrl)),
    [scenes, placeholderUrl],
  );

  const sequenceData = React.useMemo(() => {
    let currentStart = 0;
    return safeScenes.map((scene) => {
      const sceneDurationMs = getSceneDurationMs(scene, targetSceneDurationMs);
      const sceneFrames = Math.max(1, Math.round((sceneDurationMs / 1000) * FPS));
      const item = {
        scene,
        from: currentStart,
        durationInFrames: sceneFrames,
      };
      currentStart += Math.max(1, sceneFrames - transitionFrames);
      return item;
    });
  }, [safeScenes, targetSceneDurationMs, transitionFrames]);

  const sceneEndFrame = sequenceData.length
    ? Math.max(...sequenceData.map((item) => item.from + item.durationInFrames))
    : 0;
  const endPageFadeFrames = Math.min(Math.round(FPS * 1.5), Math.max(8, endPageDurationFrames));
  const endPageStartFrame = endPageUrl && endPageDurationFrames > 0
    ? Math.max(0, sceneEndFrame - endPageFadeFrames)
    : sceneEndFrame;
  const totalFrames = endPageUrl && endPageDurationFrames > 0
    ? sceneEndFrame + endPageDurationFrames - endPageFadeFrames
    : sceneEndFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', direction: 'ltr' }}>
      {sequenceData.map((item, index) => (
        <Sequence
          key={item.scene.id || `scene-${index}`}
          from={item.from}
          durationInFrames={item.durationInFrames}
          layout="none"
        >
          <SceneLayer
            scene={item.scene}
            index={index}
            placeholderUrl={placeholderUrl}
          />
          {item.scene.voiceoverUrl ? (
            <Audio
              src={item.scene.voiceoverUrl}
              volume={typeof voiceoverVolume === 'number' && !Number.isNaN(voiceoverVolume)
                ? voiceoverVolume
                : 1}
            />
          ) : null}
        </Sequence>
      ))}

      {endPageUrl && endPageDurationFrames > 0 ? (
        <Sequence from={endPageStartFrame} durationInFrames={endPageDurationFrames} layout="none">
          <EndPageFade src={endPageUrl} fadeFrames={endPageFadeFrames} />
        </Sequence>
      ) : null}

      {musicUrl ? (
        <Audio
          src={musicUrl}
          loop
          volume={(frame) => {
            const fadeStart = Math.max(0, durationInFrames - 45);
            const baseVolume = typeof musicVolume === 'number' && !Number.isNaN(musicVolume) ? musicVolume : 0.3;
            return interpolate(frame, [fadeStart, durationInFrames], [baseVolume, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
          }}
        />
      ) : null}

      <VisualEffects effects={effects} cinematicBarSize={cinematicBarSize} />
    </AbsoluteFill>
  );
};
