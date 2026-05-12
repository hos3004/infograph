import React, { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Player, type PlayerRef } from '@remotion/player';
import { LaqtatComposition } from '../../../src/remotion/laqtat/LaqtatComposition';
import type { LaqtatProps } from '../../../src/remotion/laqtat/types';

type PreviewPayload = {
  inputProps: LaqtatProps;
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
    DesktopRemotionPreviewLaqtat?: PreviewApi;
  }
}

const FPS = 25;
const PLAYER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  display: 'block',
  direction: 'ltr',
};

const PLAYER_WRAP_STYLE: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#000',
  overflow: 'hidden',
  direction: 'ltr',
  unicodeBidi: 'isolate',
};

let previewRoot: Root | null = null;
let previewContainer: HTMLElement | null = null;
let currentPlayer: PlayerRef | null = null;

let currentPayload: PreviewPayload = {
  inputProps: {
    mainVideoUrl: null,
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
    segments: [{ id: 'segment-1', startMs: 0, endMs: 1000 }],
    blurRegions: [],
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
        component={LaqtatComposition}
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
  if (!previewRoot || !previewContainer) return;
  previewRoot.render(<PreviewApp payload={currentPayload} />);
}

window.DesktopRemotionPreviewLaqtat = {
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
