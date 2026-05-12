import React, { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Player, type PlayerRef } from '@remotion/player';
import { PersonalitiesComposition } from '../../../src/remotion/personalities/PersonalitiesComposition';
import type { PersonalitiesProps } from '../../../src/remotion/personalities/types';

type PreviewPayload = {
  inputProps: PersonalitiesProps;
  durationInFrames: number;
};

type PreviewApi = {
  mount: (container: HTMLElement) => void;
  update: (payload: PreviewPayload) => void;
  seekTo: (frame: number) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    DesktopRemotionPreviewPersonalities?: PreviewApi;
  }
}

const FPS = 25;
const PLAYER_STYLE: React.CSSProperties = { width: '100%' };
const PLAYER_WRAP_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#000',
  direction: 'ltr',
};

let previewRoot: Root | null = null;
let previewContainer: HTMLElement | null = null;
let currentPlayer: PlayerRef | null = null;

let currentPayload: PreviewPayload = {
  inputProps: {
    scenes: [],
    placeholderUrl: null,
    musicUrl: null,
    musicVolume: 0.3,
    voiceoverVolume: 1,
    effects: [],
    endPageUrl: null,
    endPageDurationFrames: 0,
    targetSceneDurationMs: 8000,
    transitionFrames: 20,
    cinematicBarSize: 6,
  },
  durationInFrames: 25,
};

const PreviewApp: React.FC<{ payload: PreviewPayload }> = ({ payload }) => {
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    currentPlayer = playerRef.current;
    return () => {
      if (currentPlayer === playerRef.current) {
        currentPlayer = null;
      }
    };
  }, [payload]);

  return (
    <div style={PLAYER_WRAP_STYLE}>
      <Player
        ref={playerRef}
        component={PersonalitiesComposition}
        inputProps={payload.inputProps}
        durationInFrames={Math.max(25, payload.durationInFrames)}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={FPS}
        style={PLAYER_STYLE}
        controls
        autoPlay={false}
        loop
        clickToPlay
        doubleClickToFullscreen
        allowFullscreen
        showVolumeControls
        moveToBeginningWhenEnded
        initiallyShowControls
      />
    </div>
  );
};

function renderPreview() {
  if (!previewRoot || !previewContainer) {
    return;
  }

  previewRoot.render(<PreviewApp payload={currentPayload} />);
}

window.DesktopRemotionPreviewPersonalities = {
  mount(container) {
    if (previewRoot && previewContainer === container) {
      renderPreview();
      return;
    }

    previewContainer = container;
    previewRoot = createRoot(container);
    renderPreview();
  },
  update(payload) {
    currentPayload = payload;
    renderPreview();
  },
  seekTo(frame) {
    currentPlayer?.seekTo(frame);
  },
  play() {
    currentPlayer?.play();
  },
  pause() {
    currentPlayer?.pause();
  },
  toggle() {
    currentPlayer?.toggle();
  },
  destroy() {
    currentPlayer = null;
    previewRoot?.unmount();
    previewRoot = null;
    previewContainer = null;
  },
};
