import React, { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Player, type PlayerRef } from '@remotion/player';
import { MainComposition } from '../../src/remotion/MainComposition';
import type { CompositionProps } from '../../src/remotion/types';

type PreviewPayload = {
  inputProps: CompositionProps;
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
    DesktopRemotionPreview?: PreviewApi;
  }
}

const FPS = 30;
const PLAYER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

let previewRoot: Root | null = null;
let previewContainer: HTMLElement | null = null;
let currentPlayer: PlayerRef | null = null;
let currentPayload: PreviewPayload = {
  inputProps: {
    slides: [],
    overlay: null,
    music: null,
    endPage: null,
    slideDurationInSeconds: 5,
    effects: [],
    endPageDurationFrames: 0,
    textBottomOffset: 160,
    textFontSize: 46,
    textPreset: 'dark',
  },
  durationInFrames: 30,
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
    <Player
      ref={playerRef}
      component={MainComposition}
      inputProps={payload.inputProps}
      durationInFrames={Math.max(30, payload.durationInFrames)}
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
  );
};

function renderPreview() {
  if (!previewRoot || !previewContainer) {
    return;
  }

  previewRoot.render(<PreviewApp payload={currentPayload} />);
}

window.DesktopRemotionPreview = {
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
