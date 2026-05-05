import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

type GoogleTtsRequest = {
  text?: string;
  languageCode?: string;
  voiceName?: string;
  ssmlGender?: 'MALE' | 'FEMALE' | 'NEUTRAL';
  speakingRate?: number;
  pitch?: number;
};

type GoogleTtsResponse = {
  audioContent?: string;
  error?: {
    message?: string;
    status?: string;
  };
};

function clampNumber(value: unknown, fallback: number, min: number, max: number): number {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max, Math.max(min, next));
}

function normalizeText(text: unknown): string {
  if (typeof text !== 'string') return '';
  return text.replace(/\s+/g, ' ').trim();
}

function makeSafeFileName(text: string): string {
  const hash = crypto.createHash('sha1').update(text).digest('hex').slice(0, 10);
  return `voiceover-${Date.now()}-${hash}.mp3`;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_TTS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_TTS_API_KEY is missing. Add it to your local .env file.' },
        { status: 500 }
      );
    }

    const payload = (await request.json()) as GoogleTtsRequest;
    const text = normalizeText(payload.text);

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (text.length > 900) {
      return NextResponse.json({ error: 'Text is too long. Keep each slide narration short.' }, { status: 400 });
    }

    const languageCode = payload.languageCode || 'ar-XA';
    const voiceName = payload.voiceName || undefined;
    const ssmlGender = payload.ssmlGender || 'MALE';
    const speakingRate = clampNumber(payload.speakingRate, 0.92, 0.25, 4);
    const pitch = clampNumber(payload.pitch, 0, -20, 20);

    const googleResponse = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode,
            ...(voiceName ? { name: voiceName } : {}),
            ssmlGender,
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate,
            pitch,
          },
        }),
      }
    );

    const result = (await googleResponse.json()) as GoogleTtsResponse;

    if (!googleResponse.ok || !result.audioContent) {
      return NextResponse.json(
        {
          error: 'Google TTS request failed',
          details: result.error?.message || googleResponse.statusText,
        },
        { status: googleResponse.status || 502 }
      );
    }

    const voiceoverDir = path.join(process.env.TEMP_DIR || path.join(process.cwd(), 'temp'), 'voiceovers');
    await fs.mkdir(voiceoverDir, { recursive: true });

    const fileName = makeSafeFileName(text);
    const filePath = path.join(voiceoverDir, fileName);
    const audioBuffer = Buffer.from(result.audioContent, 'base64');
    await fs.writeFile(filePath, audioBuffer);

    return NextResponse.json({
      success: true,
      fileName,
      url: `/api/temp/voiceovers/${fileName}`,
      bytes: audioBuffer.length,
      provider: 'google-tts',
      languageCode,
      voiceName: voiceName || null,
      speakingRate,
      pitch,
    });
  } catch (error: any) {
    console.error('[Google TTS] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate voiceover', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
