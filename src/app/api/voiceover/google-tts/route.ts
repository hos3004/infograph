import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

type GeminiTtsRequest = {
  text?: string;
  apiKey?: string;
  ttsModel?: string;
  // legacy/future hooks (kept for API stability with callers)
  languageCode?: string;
  voiceName?: string;
  ssmlGender?: 'MALE' | 'FEMALE' | 'NEUTRAL';
  speakingRate?: number;
  pitch?: number;
};

type GeminiResponse = {
  candidates?: Array<{
    finishReason?: string;
    content?: {
      parts?: Array<{
        inlineData?: {
          mimeType?: string;
          data?: string;
        };
      }>;
    };
  }>;
  error?: {
    message?: string;
    status?: string;
  };
  promptFeedback?: { blockReason?: string };
};

// Gemini TTS prebuilt voices — Charon and Aoede handle Arabic well
const DEFAULT_VOICE = 'Charon';
const DEFAULT_TTS_MODEL = 'gemini-2.5-flash-preview-tts';

function normalizeText(text: unknown): string {
  if (typeof text !== 'string') return '';
  return text.replace(/\s+/g, ' ').trim();
}

function makeSafeFileName(text: string): string {
  const hash = crypto.createHash('sha1').update(text).digest('hex').slice(0, 10);
  return `voiceover-${Date.now()}-${hash}.wav`;
}

function getApiKey(): string | null {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GOOGLE_TTS_API_KEY ||
    null
  );
}

/**
 * Wrap raw PCM (signed 16-bit little-endian) in a WAV container.
 * Gemini TTS returns mimeType "audio/L16;codec=pcm;rate=24000" — mono 24 kHz.
 */
function pcmToWav(
  pcmBuffer: Buffer,
  sampleRate = 24000,
  channels = 1,
  bitsPerSample = 16
): Buffer {
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const fileSize = 36 + dataSize;

  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(fileSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // PCM format chunk size
  header.writeUInt16LE(1, 20); // audio format = PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

/**
 * Parse the sample rate out of mimeType "audio/L16;codec=pcm;rate=24000".
 * Falls back to 24 kHz which is Gemini's documented default.
 */
function parseSampleRate(mimeType: string | undefined): number {
  if (!mimeType) return 24000;
  const match = mimeType.match(/rate=(\d+)/);
  if (!match) return 24000;
  const rate = parseInt(match[1], 10);
  return Number.isFinite(rate) && rate > 0 ? rate : 24000;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as GeminiTtsRequest;

    const apiKey = (payload.apiKey && payload.apiKey.trim()) || getApiKey();
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'Gemini API key is missing.',
          details:
            'أضف مفتاح API من خلال صفحة الإعدادات، أو عبر متغير البيئة GEMINI_API_KEY في .env.local.',
        },
        { status: 500 }
      );
    }

    const text = normalizeText(payload.text);

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (text.length > 1500) {
      return NextResponse.json(
        { error: 'Text is too long. Keep each slide narration short.' },
        { status: 400 }
      );
    }

    const voiceName = payload.voiceName || DEFAULT_VOICE;
    const ttsModel = (payload.ttsModel && payload.ttsModel.trim()) || DEFAULT_TTS_MODEL;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${ttsModel}:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;

    // English instruction prefix is required so Gemini TTS treats the rest as a transcript.
    // Without this prefix, the model often replies with text instead of audio for Arabic input.
    // We try a couple of phrasings to recover from the rare "model produced text" case.
    const promptVariants = [`Read aloud: ${text}`, `Say in a clear neutral voice: ${text}`];

    let result: GeminiResponse | null = null;
    let lastStatus = 0;
    let lastStatusText = '';
    let inlineData: { mimeType?: string; data?: string } | undefined;
    let lastFinishReason: string | undefined;

    for (const ttsPrompt of promptVariants) {
      const geminiResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: ttsPrompt }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        }),
      });

      lastStatus = geminiResponse.status;
      lastStatusText = geminiResponse.statusText;
      result = (await geminiResponse.json()) as GeminiResponse;

      if (!geminiResponse.ok) {
        return NextResponse.json(
          {
            error: 'Gemini TTS request failed',
            details: result.error?.message || lastStatusText,
          },
          { status: lastStatus || 502 }
        );
      }

      const candidate = result.candidates?.[0];
      lastFinishReason = candidate?.finishReason;
      inlineData = candidate?.content?.parts?.find((p) => p.inlineData)?.inlineData;

      if (inlineData?.data) break; // got audio — stop retrying
    }

    if (!inlineData?.data) {
      return NextResponse.json(
        {
          error: 'Gemini did not return audio',
          details:
            lastFinishReason === 'OTHER'
              ? 'Model produced text instead of audio after retries. Try shortening the text.'
              : result?.promptFeedback?.blockReason || lastFinishReason || 'Unknown',
        },
        { status: 502 }
      );
    }

    const pcmBuffer = Buffer.from(inlineData.data, 'base64');
    const sampleRate = parseSampleRate(inlineData.mimeType);
    const wavBuffer = pcmToWav(pcmBuffer, sampleRate);

    const voiceoverDir = path.join(
      process.env.TEMP_DIR || path.join(process.cwd(), 'temp'),
      'voiceovers'
    );
    await fs.mkdir(voiceoverDir, { recursive: true });

    const fileName = makeSafeFileName(text);
    const filePath = path.join(voiceoverDir, fileName);
    await fs.writeFile(filePath, wavBuffer);

    return NextResponse.json({
      success: true,
      fileName,
      url: `/api/temp/voiceovers/${fileName}`,
      bytes: wavBuffer.length,
      provider: 'gemini-tts',
      model: ttsModel,
      voiceName,
      sampleRate,
    });
  } catch (error: any) {
    console.error('[Gemini TTS] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate voiceover', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
