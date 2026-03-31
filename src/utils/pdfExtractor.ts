export interface ExtractedPage {
  pageNum: number;
  content: string;
}

interface TextItem {
  str: string;
  x: number;
  y: number;
}

let pdfjs: typeof import('pdfjs-dist') | null = null;

async function getPdfJs() {
  if (typeof window === 'undefined') {
    throw new Error('PDF extraction is only available in the browser');
  }
  
  if (!pdfjs) {
    pdfjs = await import('pdfjs-dist');
    const version = pdfjs.version;
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
  }
  
  return pdfjs;
}

function extractItems(content: { items: unknown[] }): TextItem[] {
  return content.items
    .filter((item): item is { str: string; transform: number[] } => {
      return typeof item === 'object' && item !== null && 'str' in item && 'transform' in item;
    })
    .map((item) => ({
      str: item.str,
      x: item.transform[4] || 0,
      y: item.transform[5] || 0,
    }));
}

function groupByLines(items: TextItem[], tolerance = 5): TextItem[][] {
  const lines: TextItem[][] = [];

  for (const item of items) {
    const existingLine = lines.find((line) => Math.abs(line[0].y - item.y) < tolerance);
    
    if (existingLine) {
      existingLine.push(item);
    } else {
      lines.push([item]);
    }
  }

  return lines;
}

function sortLines(lines: TextItem[][]): TextItem[][] {
  return lines.map((line) =>
    line.slice().sort((a, b) => a.x - b.x)
  );
}

function sortByY(lines: TextItem[][]): TextItem[][] {
  return lines.slice().sort((a, b) => b[0].y - a[0].y);
}

function buildLineText(line: TextItem[]): string {
  let text = '';

  for (let i = 0; i < line.length; i++) {
    const curr = line[i];
    const next = line[i + 1];

    text += curr.str;

    if (next) {
      const gap = next.x - (curr.x + (curr.str.length * 6));
      if (gap > 5) {
        text += ' ';
      }
    }
  }

  return text;
}

function linesToParagraphs(lines: string[]): string {
  const paragraphs: string[] = [];
  let current = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const next = lines[i + 1];

    if (!line) continue;

    current += line;

    if (next) {
      const nextLine = next.trim();
      const currentLength = current.length;
      
      if (currentLength < 40 || (nextLine.length < 30 && currentLength < 80)) {
        if (current.trim()) {
          paragraphs.push(current.trim());
        }
        current = '';
      } else {
        current += ' ';
      }
    }
  }

  if (current.trim()) {
    paragraphs.push(current.trim());
  }

  return paragraphs.join('\n\n');
}

async function extractFormattedText(page: { getTextContent: () => Promise<{ items: unknown[] }> }): Promise<string> {
  const content = await page.getTextContent();

  if (!content.items || content.items.length === 0) {
    return '';
  }

  const items = extractItems(content);
  
  if (items.length === 0) {
    return '';
  }

  const lines = groupByLines(items);
  const sortedLines = sortLines(lines);
  const orderedLines = sortByY(sortedLines);
  const textLines = orderedLines.map(buildLineText);

  return linesToParagraphs(textLines);
}

export async function extractTextFromPDF(file: File): Promise<ExtractedPage[]> {
  const pdfjsModule = await getPdfJs();
  
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsModule.getDocument({ data: arrayBuffer }).promise;
  
  const pages: ExtractedPage[] = [];
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await extractFormattedText(page);
    
    pages.push({
      pageNum: i,
      content: content || '[No text content on this page]',
    });
  }
  
  return pages;
}

export function canExtractText(pages: ExtractedPage[]): boolean {
  const totalChars = pages.reduce((acc, page) => acc + page.content.length, 0);
  return totalChars > 100;
}