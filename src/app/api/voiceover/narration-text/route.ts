import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type NarrationRequest = {
  slideText?: string;
  maxWords?: number;
};

function cleanPart(value: string | undefined): string {
  return (value || '').replace(/\s+/g, ' ').trim();
}

function splitSlideText(slideText: string): string[] {
  return slideText
    .split('++')
    .map(cleanPart)
    .filter(Boolean);
}

function trimWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(' ')}.`;
}

function removeSlideMetaPhrases(text: string): string {
  return text
    .replace(/\bفي هذه الشريحة\b/g, '')
    .replace(/\bتوضح الشريحة\b/g, '')
    .replace(/\bنرى هنا\b/g, '')
    .replace(/\bالصورة تعرض\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildRuleBasedNarration(slideText: string, maxWords: number): string {
  const [kicker, headline, body, highlight] = splitSlideText(slideText);
  void kicker;

  const core = [headline, body, highlight]
    .filter(Boolean)
    .join('، ')
    .replace(/\s+/g, ' ')
    .trim();

  const fallback = cleanPart(slideText.replace(/\+\+/g, '، '));
  const narration = removeSlideMetaPhrases(core || fallback);
  return trimWords(narration, maxWords);
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as NarrationRequest;
    const slideText = cleanPart(payload.slideText);
    const maxWords = Math.min(34, Math.max(12, Number(payload.maxWords || 24)));

    if (!slideText) {
      return NextResponse.json({ error: 'slideText is required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      narrationText: buildRuleBasedNarration(slideText, maxWords),
      maxWords,
      mode: 'rule-based',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to generate narration text', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
