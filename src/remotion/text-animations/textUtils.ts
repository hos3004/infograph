export function splitLines(text: string): string[] {
  return text
    .split('++')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function splitWords(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

export function extractNumberHero(text: string): {
  valueText: string;
  description: string;
} {
  const lines = splitLines(text);
  const source = lines[0] ?? text;

  const match = source.match(/[\d٠-٩۰-۹]+(?:[.,][\d٠-٩۰-۹]+)?\s*%?/);

  if (!match) {
    return {
      valueText: lines[0] ?? '0',
      description: lines.slice(1).join(' ') || '',
    };
  }

  const valueText = match[0].trim();
  const descriptionFromFirstLine = source.replace(match[0], '').trim();
  const description = [
    descriptionFromFirstLine,
    ...lines.slice(1),
  ]
    .join(' ')
    .trim();

  return {
    valueText,
    description,
  };
}

export function parseLayeredTitle(text: string): {
  label: string;
  title: string;
  description: string;
} {
  const lines = splitLines(text);

  return {
    label: lines[0] || 'سبب 01',
    title: lines[1] || lines[0] || text,
    description: lines[2] || '',
  };
}

export function parseTimeline(text: string): {
  period: string;
  description: string;
} {
  const lines = splitLines(text);

  return {
    period: lines[0] || text,
    description: lines[1] || '',
  };
}

export function parseMorphWords(text: string): string[] {
  if (text.includes('|')) {
    return text
      .split('|')
      .map((word) => word.trim())
      .filter(Boolean);
  }

  const lines = splitLines(text);
  if (lines.length > 1) return lines;

  return splitWords(text).slice(0, 4);
}

export function parseKeywordText(text: string): {
  before: string;
  keyword: string;
  after: string;
  subline: string;
} {
  const lines = splitLines(text);
  const main = lines[0] || text;
  const subline = lines[1] || '';

  const match = main.match(/\*\*(.*?)\*\*/);

  if (match) {
    const keyword = match[1].trim();
    const [before, afterRaw] = main.split(match[0]);

    return {
      before: before.trim(),
      keyword,
      after: (afterRaw || '').trim(),
      subline,
    };
  }

  const words = splitWords(main);
  const keyword = words.length > 1 ? words[1] : words[0] || main;

  const keywordIndex = main.indexOf(keyword);

  return {
    before: keywordIndex >= 0 ? main.slice(0, keywordIndex).trim() : '',
    keyword,
    after: keywordIndex >= 0 ? main.slice(keywordIndex + keyword.length).trim() : '',
    subline,
  };
}

export function clampFrame(frame: number, start: number): number {
  return Math.max(0, frame - start);
}
