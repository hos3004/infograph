import React, { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Player, type PlayerRef } from '@remotion/player';
import { MotadawelComposition } from '../../../src/remotion/motadawel/MotadawelComposition';
import type { MotadawelProps } from '../../../src/remotion/motadawel/types';

type PreviewPayload = {
  inputProps: MotadawelProps;
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
    DesktopRemotionPreviewMotadawel?: PreviewApi;
  }
}

const FPS = 25;
const PLAYER_STYLE: React.CSSProperties = {
  width: '100%',
};

const PLAYER_WRAP_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#000',
};

let previewRoot: Root | null = null;
let previewContainer: HTMLElement | null = null;
let currentPlayer: PlayerRef | null = null;


function pushDebugLog(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  const fn = (window as typeof window & { __motadawelDebugPush?: (...items: unknown[]) => void }).__motadawelDebugPush;
  if (typeof fn === 'function') fn(...args);
  console.log('[MotadawelPreview]', ...args);
}

class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    pushDebugLog('React preview crash', error?.message || String(error), info?.componentStack || '');
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#120000',
            color: '#ffd7d7',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            padding: 24,
            textAlign: 'left',
            whiteSpace: 'pre-wrap',
            direction: 'ltr',
          }}
        >
          {`Preview error:
${this.state.error.message}`}
        </div>
      );
    }

    return this.props.children;
  }
}

let currentPayload: PreviewPayload = {
  inputProps: {
    introVideoUrl: null,
    mainVideoUrl: null,
    frameUrl: null,
    outroVideoUrl: null,
    mainText: '',
    videoScale: 1,
    videoX: 0,
    videoY: 0,
    effects: [],
    introDurationFrames: 0,
    mainVideoDurationFrames: 300,
    outroDurationFrames: 0,
    textBottomOffset: 160,
    textFontSize: 46,
    textPreset: 'dark',
    bgMusicUrl: null,
    bgMusicVolume: 0.25,
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

  useEffect(() => {
    pushDebugLog('Player payload', {
      durationInFrames: payload.durationInFrames,
      inputProps: payload.inputProps,
    });
  }, [payload]);

  return (
    <PreviewErrorBoundary>
    <div style={PLAYER_WRAP_STYLE}>
      <Player
        ref={playerRef}
        component={MotadawelComposition}
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
    </PreviewErrorBoundary>
  );
};

function renderPreview() {
  if (!previewRoot || !previewContainer) {
    return;
  }

  previewRoot.render(<PreviewApp payload={currentPayload} />);
}

window.DesktopRemotionPreviewMotadawel = {
  mount(container) {
    pushDebugLog('mount called', { width: container?.clientWidth, height: container?.clientHeight });
    if (previewRoot && previewContainer === container) {
      renderPreview();
      return;
    }

    previewContainer = container;
    previewRoot = createRoot(container);
    renderPreview();
  },
  update(payload) {
    pushDebugLog('update called', { durationInFrames: payload.durationInFrames, hasMainVideo: !!payload.inputProps.mainVideoUrl, mainVideoUrl: payload.inputProps.mainVideoUrl });
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
