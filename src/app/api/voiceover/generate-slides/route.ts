import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

type SlidePayload = {
  id: string;
  imageUrl: string;
  text?: string;
  isMuted?: boolean;
  voiceoverText?: string;
  voiceoverUrl?: string;
  voiceoverDurationMs?: number;
};

type GenerateSlidesRequest = {
  slides?: SlidePayload[];
  maxWords?: number;
  languageCode?: string;
  voiceName?: string;
  ttsModel?: string;
  apiKey?: string;
  ssmlGender?: 'MALE' | 'FEMALE' | 'NEUTRAL';
  speakingRate?: number;
  pitch?: number;
};

function getBaseUrl(request: NextRequest): string {
  const origin = request.headers.get('origin');
  if (origin) return origin;
  const host = request.headers.get('host') || 'localhost:3000';
  return `http://${host}`;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.details || data?.error || response.statusText);
  }

  return data as T;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as GenerateSlidesRequest;
    const slides = Array.isArray(payload.slides) ? payload.slides : [];

    if (slides.length === 0) {
      return NextResponse.json({ error: 'slides array is required' }, { status: 400 });
    }

    const baseUrl = getBaseUrl(request);
    const updatedSlides: SlidePayload[] = [];
    const errors: { id: string; error: string }[] = [];

    for (const slide of slides) {
      if (!slide?.text?.trim()) {
        updatedSlides.push(slide);
        continue;
      }

      try {
        const narration = await postJson<{ narrationText: string }>(`${baseUrl}/api/voiceover/narration-text`, {
          slideText: slide.text,
          maxWords: payload.maxWords ?? 24,
        });

        const audio = await postJson<{ url: string }>(`${baseUrl}/api/voiceover/google-tts`, {
          text: narration.narrationText,
          languageCode: payload.languageCode || 'ar-XA',
          voiceName: payload.voiceName,
          ttsModel: payload.ttsModel,
          apiKey: payload.apiKey,
          ssmlGender: payload.ssmlGender || 'MALE',
          speakingRate: payload.speakingRate ?? 0.92,
          pitch: payload.pitch ?? 0,
        });

        updatedSlides.push({
          ...slide,
          voiceoverText: narration.narrationText,
          voiceoverUrl: audio.url,
        });
      } catch (error: any) {
        errors.push({ id: slide.id, error: error?.message || String(error) });
        updatedSlides.push(slide);
      }
    }

    return NextResponse.json({
      success: errors.length === 0,
      slides: updatedSlides,
      errors,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to generate slide voiceovers', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
