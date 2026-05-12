import React from 'react';
import {
  AbsoluteFill,
  Audio,
  getRemotionEnvironment,
  Img,
  OffthreadVideo,
  Sequence,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { VisualEffects } from '../VisualEffects';
import { LAQTAT_TEXT_PRESETS, type LaqtatBlurRegion, type LaqtatProps } from './types';

const FONT_FAMILY = 'AvenirArabic';
if (typeof document !== 'undefined') {
  const fontUrl = staticFile('assets/fonts/alfont_com_AlFont_com_AvenirArabic-Heavy.otf');
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${FONT_FAMILY}';
      src: url('${fontUrl}') format('opentype');
      font-weight: bold;
      font-style: normal;
      font-display: block;
    }
  `;
  if (!document.head.querySelector('[data-font="AvenirArabic-Laqtat"]')) {
    style.setAttribute('data-font', 'AvenirArabic-Laqtat');
    document.head.appendChild(style);
  }
}

const TYPEWRITER_START = 10;
const FRAMES_PER_CHAR = 1;
const CURSOR_BLINK_RATE = 8;
const IS_PLAYER = getRemotionEnvironment().isPlayer;

const isRTL = (s: string) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(s);

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

const buildCenteredVideoStyle = ({
  objectFit,
  transform,
  filter,
}: {
  objectFit: React.CSSProperties['objectFit'];
  transform?: string;
  filter?: string;
}): React.CSSProperties => {
  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    objectPosition: 'center center',
    transform,
    transformOrigin: 'center center',
    filter,
  };

  if (!IS_PLAYER) {
    style.position = 'absolute';
    style.inset = 0;
  }

  return style;
};

const LaqtatSubtitle: React.FC<{
  text: string;
  bottomOffset: number;
  fontSize: number;
  preset: LaqtatProps['textPreset'];
  animationType?: 'motion-blur' | 'typewriter';
}> = ({ text, bottomOffset, fontSize, preset, animationType = 'motion-blur' }) => {
  const frame = useCurrentFrame();
  const { bg, color, border } = LAQTAT_TEXT_PRESETS[preset] ?? LAQTAT_TEXT_PRESETS.dark;
  const segmenter = React.useMemo(() => new Intl.Segmenter('ar', { granularity: 'grapheme' }), []);
  const segments = React.useMemo(() => Array.from(segmenter.segment(text.normalize('NFC'))).map((s) => s.segment), [text, segmenter]);
  const isTypewriter = animationType === 'typewriter';
  const charsToShow = Math.min(segments.length, Math.max(0, Math.floor((frame - TYPEWRITER_START) / FRAMES_PER_CHAR)));
  const visibleText = isTypewriter ? segments.slice(0, charsToShow).join('') : text;
  const visibleLines = visibleText.split('++').map((line) => line.trim()).filter(Boolean);
  const isTyping = isTypewriter && charsToShow < segments.length;
  const cursorOn = isTyping && Math.floor(frame / CURSOR_BLINK_RATE) % 2 === 0;
  const xOffset = interpolate(frame, [0, 210], [0, 222], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gradientHeight = Math.max(20, Math.round((bottomOffset / 1080) * 100) + 12);

  if (!text.trim()) return null;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${gradientHeight}%`,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)',
          opacity: frame > 10 ? Math.min(1, (frame - 10) / 10) : 0,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: `${bottomOffset}px`,
          left: '20%',
          width: 'max-content',
          maxWidth: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
          transform: `translateX(${xOffset}px)`,
        }}
      >
        {visibleLines.map((lineText, index) => {
          const lineDelay = isTypewriter ? 10 : 10 + index * 15;
          const lineRelativeFrame = Math.max(0, frame - lineDelay);
          const lineOpacity = Math.min(1, lineRelativeFrame / 12);
          const lineYOffset = isTypewriter ? 0 : interpolate(lineRelativeFrame, [0, 18], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const lineBlur = isTypewriter ? 0 : interpolate(lineRelativeFrame, [0, 18], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const rtl = isRTL(lineText);
          const isCurrentTypingLine = isTyping && index === visibleLines.length - 1;
          return (
            <div
              key={`${index}-${lineText}`}
              style={{
                opacity: lineOpacity,
                filter: lineBlur ? `blur(${lineBlur}px)` : 'none',
                transform: `translateY(${lineYOffset}px)`,
                backgroundColor: bg,
                color,
                padding: `${Math.round(fontSize * 0.15)}px ${Math.round(fontSize * 0.45)}px`,
                borderRadius: 0,
                fontSize: `${fontSize}px`,
                fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
                fontWeight: 'bold',
                textAlign: rtl ? 'right' : 'left',
                lineHeight: 1.4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
                border: `1px solid ${border}`,
                backdropFilter: 'blur(8px)',
                direction: rtl ? 'rtl' : 'ltr',
                letterSpacing: '0.5px',
                overflow: 'hidden',
                position: 'relative',
                maxWidth: '100%',
              }}
            >
              {lineText.trim()}
              {isCurrentTypingLine && cursorOn ? (
                <span style={{ display: 'inline-block', width: '3px', height: '0.85em', backgroundColor: color, marginRight: '4px', verticalAlign: 'middle', opacity: 0.8 }} />
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

const SegmentVideoLayer: React.FC<{
  src: string;
  startFrom: number;
  endAt: number;
  fitMode: LaqtatProps['fitMode'];
  videoScale: number;
  videoX: number;
  videoY: number;
  blurBackgroundAmount: number;
  backgroundScale: number;
  keepSourceAudio: boolean;
}> = ({
  src,
  startFrom,
  endAt,
  fitMode,
  videoScale,
  videoX,
  videoY,
  blurBackgroundAmount,
  backgroundScale,
  keepSourceAudio,
}) => {
  const sharedTransform = `scale(${videoScale}) translateX(${videoX}px) translateY(${videoY}px)`;
  const audioEnabled = keepSourceAudio;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {fitMode === 'blurred-background' ? (
        <>
          <AdaptiveVideo
            src={src}
            startFrom={startFrom}
            endAt={endAt}
            muted
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: `scale(${backgroundScale})`,
              filter: `blur(${blurBackgroundAmount}px) brightness(0.85)`,
            }}
          />
          <AbsoluteFill
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <AdaptiveVideo
              src={src}
              startFrom={startFrom}
              endAt={endAt}
              muted={!audioEnabled}
              style={buildCenteredVideoStyle({
                objectFit: 'contain',
                transform: sharedTransform,
              })}
            />
          </AbsoluteFill>
        </>
      ) : (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <AdaptiveVideo
            src={src}
            startFrom={startFrom}
            endAt={endAt}
            muted={!audioEnabled}
            style={buildCenteredVideoStyle({
              objectFit: fitMode === 'cover' ? 'cover' : 'contain',
              transform: sharedTransform,
            })}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const BlurRegionOverlay: React.FC<{
  region: LaqtatBlurRegion;
  currentMs: number;
  sourceUrl: string;
  startFrom: number;
  endAt: number;
  fitMode: LaqtatProps['fitMode'];
  videoScale: number;
  videoX: number;
  videoY: number;
  backgroundScale: number;
  blurBackgroundAmount: number;
}> = ({
  region,
  currentMs,
  sourceUrl,
  startFrom,
  endAt,
  fitMode,
  videoScale,
  videoX,
  videoY,
  backgroundScale,
  blurBackgroundAmount,
}) => {
  const borderRadius = Math.max(0, region.radius ?? 12);
  const feather = Math.max(0, Math.min(80, region.feather ?? 0));
  const motionStartMs = Number(region.startMs ?? 0);
  const motionEndMs = Number(region.endMs ?? motionStartMs);
  const motionProgress = region.motionEnabled && motionEndMs > motionStartMs
    ? Math.max(0, Math.min(1, (currentMs - motionStartMs) / (motionEndMs - motionStartMs)))
    : 0;
  const animatedX = region.x + ((region.endX ?? region.x) - region.x) * motionProgress;
  const animatedY = region.y + ((region.endY ?? region.y) - region.y) * motionProgress;
  const style: React.CSSProperties = {
    position: 'absolute',
    left: animatedX,
    top: animatedY,
    width: region.width,
    height: region.height,
    pointerEvents: 'none',
  };
  const clipStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    borderRadius,
    boxShadow: '0 0 0 1px rgba(255,255,255,0.18) inset',
  };
  const featherStyle: React.CSSProperties = feather > 0
    ? {
        position: 'absolute',
        inset: 0,
        filter: `blur(${Math.max(0.5, feather / 2)}px)`,
        opacity: 0.92,
      }
    : {};

  const foregroundTransform = `scale(${Math.max(1.02, videoScale)}) translateX(${videoX}px) translateY(${videoY}px)`;

  const renderBlurContent = () => {
    if (fitMode === 'blurred-background') {
      return (
        <>
          <AdaptiveVideo
            src={sourceUrl}
            startFrom={startFrom}
            endAt={endAt}
            muted
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: `scale(${backgroundScale}) scale(1.08)`,
              filter: `blur(${Math.max(8, Math.round(blurBackgroundAmount * 0.75))}px) saturate(0.9)`,
            }}
          />
          <AbsoluteFill
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AdaptiveVideo
              src={sourceUrl}
              startFrom={startFrom}
              endAt={endAt}
              muted
              style={buildCenteredVideoStyle({
                objectFit: 'contain',
                transform: foregroundTransform,
                filter: `blur(${region.blur}px)`,
              })}
            />
          </AbsoluteFill>
        </>
      );
    }

    return (
      <AdaptiveVideo
        src={sourceUrl}
        startFrom={startFrom}
        endAt={endAt}
        muted
        style={buildCenteredVideoStyle({
          objectFit: fitMode === 'cover' ? 'cover' : 'contain',
          transform: foregroundTransform,
          filter: `blur(${region.blur}px)`,
        })}
      />
    );
  };

  return (
    <div data-laqtat-blur-region={region.id} style={style}>
      {feather > 0 ? (
        <div style={featherStyle}>
          <div style={clipStyle}>{renderBlurContent()}</div>
        </div>
      ) : null}
      <div style={clipStyle}>{renderBlurContent()}</div>
    </div>
  );
};

const regionIsActive = (region: LaqtatBlurRegion, segmentStartMs: number, localFrame: number, fps: number) => {
  if (region.alwaysOn !== false) return true;
  const currentMs = segmentStartMs + (localFrame / fps) * 1000;
  const startMs = Number(region.startMs ?? segmentStartMs);
  const endMs = Number(region.endMs ?? segmentStartMs);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
    return true;
  }
  return currentMs >= startMs && currentMs <= endMs;
};

const SegmentScene: React.FC<{
  segmentStartMs: number;
  startFrom: number;
  endAt: number;
  mainVideoUrl: string | null;
  blurRegions: LaqtatBlurRegion[];
  fitMode: LaqtatProps['fitMode'];
  videoScale: number;
  videoX: number;
  videoY: number;
  backgroundScale: number;
  blurBackgroundAmount: number;
  keepSourceAudio: boolean;
}> = ({
  segmentStartMs,
  startFrom,
  endAt,
  mainVideoUrl,
  blurRegions,
  fitMode,
  videoScale,
  videoX,
  videoY,
  backgroundScale,
  blurBackgroundAmount,
  keepSourceAudio,
}) => {
  const localFrame = useCurrentFrame();
  const currentMs = segmentStartMs + (localFrame / 25) * 1000;

  return (
    <AbsoluteFill>
      {mainVideoUrl ? (
        <SegmentVideoLayer
          src={mainVideoUrl}
          startFrom={startFrom}
          endAt={endAt}
          fitMode={fitMode}
          videoScale={videoScale}
          videoX={videoX}
          videoY={videoY}
          blurBackgroundAmount={blurBackgroundAmount}
          backgroundScale={backgroundScale}
          keepSourceAudio={keepSourceAudio}
        />
      ) : null}

      {blurRegions.map((region) =>
        mainVideoUrl && regionIsActive(region, segmentStartMs, localFrame, 25) ? (
          <BlurRegionOverlay
            key={`${segmentStartMs}-${region.id}`}
            region={region}
            currentMs={currentMs}
            sourceUrl={mainVideoUrl}
            startFrom={startFrom}
            endAt={endAt}
            fitMode={fitMode}
            videoScale={videoScale}
            videoX={videoX}
            videoY={videoY}
            backgroundScale={backgroundScale}
            blurBackgroundAmount={blurBackgroundAmount}
          />
        ) : null,
      )}
    </AbsoluteFill>
  );
};

export const LaqtatComposition: React.FC<LaqtatProps> = ({
  mainVideoUrl,
  frameUrl,
  mainText,
  videoScale,
  videoX,
  videoY,
  effects,
  textBottomOffset,
  textFontSize,
  textPreset,
  textAnimationType = 'motion-blur',
  cinematicBarSize = 6,
  bgMusicUrl,
  bgMusicVolume = 0.25,
  fitMode,
  blurBackgroundAmount = 36,
  backgroundScale = 1.18,
  segments,
  blurRegions,
  keepSourceAudio = false,
}) => {
  const isImageFrame = frameUrl ? /\.(png|gif|jpg|jpeg|webp)$/i.test(frameUrl) : false;

  const normalizedSegments = React.useMemo(
    () => (Array.isArray(segments) ? segments : []).filter((segment) => Number.isFinite(segment.startMs) && Number.isFinite(segment.endMs) && segment.endMs > segment.startMs),
    [segments],
  );

  const sequenceDurations = React.useMemo(
    () => normalizedSegments.map((segment) => Math.max(1, Math.round(((segment.endMs - segment.startMs) / 1000) * 25))),
    [normalizedSegments],
  );

  let accumulatedFrom = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', direction: 'ltr' }}>
      {bgMusicUrl ? <Audio src={bgMusicUrl} volume={bgMusicVolume ?? 0.25} /> : null}

      {normalizedSegments.map((segment, index) => {
        const durationInFrames = sequenceDurations[index];
        const sequenceFrom = accumulatedFrom;
        accumulatedFrom += durationInFrames;
        const startFrom = Math.max(0, Math.round((segment.startMs / 1000) * 25));
        const endAt = Math.max(1, startFrom + durationInFrames);

        return (
          <Sequence key={segment.id || index} from={sequenceFrom} durationInFrames={durationInFrames} layout="none">
            <SegmentScene
              segmentStartMs={segment.startMs}
              startFrom={startFrom}
              endAt={endAt}
              mainVideoUrl={mainVideoUrl}
              blurRegions={blurRegions}
              fitMode={fitMode}
              videoScale={videoScale}
              videoX={videoX}
              videoY={videoY}
              backgroundScale={backgroundScale}
              blurBackgroundAmount={blurBackgroundAmount}
              keepSourceAudio={keepSourceAudio}
            />
          </Sequence>
        );
      })}

      {frameUrl ? (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
          {isImageFrame ? (
            <Img src={frameUrl} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
          ) : (
            <AdaptiveVideo src={frameUrl} muted style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
          )}
        </AbsoluteFill>
      ) : null}

      <LaqtatSubtitle
        text={mainText}
        bottomOffset={textBottomOffset}
        fontSize={textFontSize}
        preset={textPreset}
        animationType={textAnimationType}
      />

      <VisualEffects effects={effects} cinematicBarSize={cinematicBarSize} />
    </AbsoluteFill>
  );
};
