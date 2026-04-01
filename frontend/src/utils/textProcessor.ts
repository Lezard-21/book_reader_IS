export function normalizeText(text: string): string {
  return text
    .replace(/\r/g, '')
    .replace(/\t/g, ' ')
    .replace(/ +/g, ' ')
    .trim();
}

export function fixHyphenation(text: string): string {
  return text.replace(/(\w+)-\n(\w+)/g, '$1$2');
}

export function fixLineBreaks(text: string): string {
  return text
    .replace(/([a-z,])\n([a-z])/gi, '$1 $2')
    .replace(/\n{2,}/g, '\n\n');
}

export function fixWeirdBreaks(text: string): string {
  return text.replace(/\n(?!\n)/g, ' ').replace(/\n{3,}/g, '\n\n');
}

export function toParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function processText(raw: string): string[] {
  let text = normalizeText(raw);
  text = fixHyphenation(text);
  text = fixLineBreaks(text);
  text = fixWeirdBreaks(text);
  return toParagraphs(text);
}

export interface ProcessedPage {
  id: number;
  paragraphs: string[];
}
