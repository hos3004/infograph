import { NextRequest, NextResponse } from 'next/server';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import { promises as fs } from 'fs';

export const maxDuration = 1200;
export const dynamic = 'force-dynamic';

function resolveHttpUrl(baseUrl: string, value?: string | null): string | null {
  if (!value) return null;
  return value.startsWith('http') ? value : `${baseUrl}${value}`;
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // ── Destructure ALL settings from payload ──────────────────────────────────
    const {
      slides,
      overlay,
      music,
      endPage,
      effects,
      endPageDurationFrames,
      textBottomOffset,
      textFontSize,
      textPreset,
      textAnimationType,
      parallaxEnabled,
      slideDurationInSeconds,
    } = payload;

    // Log received payload for debugging
    console.log('\n[Render] Settings received:');
    console.log(`  slides:               ${slides?.length ?? 0}`);
    console.log(`  overlay:              ${overlay ?? 'none'}`);
    console.log(`  music:                ${music ?? 'none'}`);
    console.log(`  endPage:              ${endPage ?? 'none'}`);
    console.log(`  endPageDurationFrames:${endPageDurationFrames ?? 0}`);
    console.log(`  effects:              ${JSON.stringify(effects ?? [])}`);
    console.log(`  textBottomOffset:     ${textBottomOffset ?? 160}`);
    console.log(`  textFontSize:         ${textFontSize ?? 46}`);
    console.log(`  textPreset:           ${textPreset ?? 'dark'}`);
    console.log(`  textAnimationType:    ${textAnimationType ?? 'motion-blur'}`);
    console.log(`  parallaxEnabled:      ${parallaxEnabled ?? true}`);
    console.log(`  slideDuration:        ${slideDurationInSeconds ?? 5}s`);

    // ── Base URL: reuse the running Next.js server ─────────────────────────────
    const host    = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `http://${host}`;

    // ── Output path ────────────────────────────────────────────────────────────
    const outputDir  = process.env.OUTPUT_DIR || path.join(process.cwd(), 'output');
    await fs.mkdir(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, `Video_${Date.now()}.mp4`);

    // ── Entry point ────────────────────────────────────────────────────────────
    const nextServerDir = process.env.NEXT_SERVER_DIR || process.cwd();
    const entryPoint = path.join(nextServerDir, 'src', 'remotion', 'index.ts');

    // ── ffmpeg/ffprobe (static binaries injected for production) ────────────────
    try {
      if (process.env.APP_HOME) { // In Electron Production
        process.env.REMOTION_FFMPEG_EXECUTABLE = require('ffmpeg-static');
        process.env.REMOTION_FFPROBE_EXECUTABLE = require('ffprobe-static').path;
      } else { // Local dev fallback
        const ffmpegLocalPath = path.join(process.cwd(), 'bin', 'ffmpeg.exe');
        await fs.access(ffmpegLocalPath);
        process.env.REMOTION_FFMPEG_EXECUTABLE = ffmpegLocalPath;
      }
    } catch { /* use system ffmpeg as last resort */ }

    // ── Resolve all asset paths to full HTTP URLs ──────────────────────────────
    // (Remotion's headless Chrome blocks file:// but allows http://)
    const resolvedSlides = (slides ?? []).map((slide: any) => ({
      ...slide,
      imageUrl: resolveHttpUrl(baseUrl, slide.imageUrl) ?? '',
      voiceoverUrl: resolveHttpUrl(baseUrl, slide.voiceoverUrl),
    }));

    const resolvedMusic = music
      ? (music.startsWith('http') ? music : `${baseUrl}/api/serve-asset?type=assets&subfolder=music&file=${encodeURIComponent(music)}`)
      : null;

    const resolvedOverlay = overlay
      ? (overlay.startsWith('http') ? overlay : `${baseUrl}/api/serve-asset?type=assets&subfolder=overlays&file=${encodeURIComponent(overlay)}`)
      : null;

    const resolvedEndPage = endPage
      ? (endPage.startsWith('http') ? endPage : `${baseUrl}/api/serve-asset?type=assets&subfolder=endpage&file=${encodeURIComponent(endPage)}`)
      : null;

    // ── Build complete inputProps — must match CompositionProps type exactly ────
    const inputProps = {
      slides:                resolvedSlides,
      overlay:               resolvedOverlay,
      music:                 resolvedMusic,
      endPage:               resolvedEndPage,
      slideDurationInSeconds: slideDurationInSeconds ?? 5,
      effects:               effects ?? [],
      endPageDurationFrames: endPageDurationFrames ?? 0,
      textBottomOffset:      textBottomOffset ?? 160,
      textFontSize:          textFontSize ?? 46,
      textPreset:            textPreset ?? 'dark',
      textAnimationType:     textAnimationType ?? 'motion-blur',
      parallaxEnabled:       parallaxEnabled ?? true,
    };

    console.log('[Render] Resolved endPage URL:', resolvedEndPage);
    console.log('[Render] endPageDurationFrames:', inputProps.endPageDurationFrames);

    // ── Bundle ─────────────────────────────────────────────────────────────────
    console.log(`[Render] Bundling dynamically... (serving from ${baseUrl})`);
    const serveUrl = await bundle({
      entryPoint,
      rootDir: nextServerDir,
    });

    // ── Select composition (uses calculateMetadata in Root.tsx) ────────────────
    console.log('[Render] Selecting composition...');
    const composition = await selectComposition({
      serveUrl,
      id: 'InfographicVideo',
      inputProps,
    });

    console.log(`[Render] Total duration: ${composition.durationInFrames} frames (${(composition.durationInFrames / 30).toFixed(1)}s)`);

    // ── Render ─────────────────────────────────────────────────────────────────
    console.log('[Render] Starting render...');
    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps,
      onProgress: ({ progress }) => {
        process.stdout.write(`\r[Render] Progress: ${Math.round(progress * 100)}%`);
      },
    });

    console.log(`\n[Render] ✅ Done → ${outputPath}`);

    return NextResponse.json({
      success: true,
      outputPath,
      downloadUrl: `/api/download?file=${encodeURIComponent(path.basename(outputPath))}`,
    });

  } catch (error: any) {
    console.error('\n[Render] ❌ Error:', error);
    return NextResponse.json(
      { error: 'Failed to render video', details: error.message },
      { status: 500 }
    );
  }
}
