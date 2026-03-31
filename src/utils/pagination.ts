import type { Page } from '../stores/readerStore';
import { processText, type ProcessedPage } from './textProcessor';

export interface PaginationOptions {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  width: number;
  height: number;
  paddingX: number;
  paddingY: number;
}

export function paginateByHeight(
  rawPages: { content: string }[],
  options: PaginationOptions
): Page[] {
  const { fontSize, lineHeight, width, height, paddingX, paddingY } = options;
  
  const contentHeight = height - paddingY * 2;
  const lineHeightPx = fontSize * lineHeight;
  const maxLinesPerPage = Math.floor(contentHeight / lineHeightPx);
  
  const pages: Page[] = [];
  let pageId = 0;
  
  for (const rawPage of rawPages) {
    const paragraphs = processText(rawPage.content);
    
    if (paragraphs.length === 0) {
      pages.push({ id: pageId++, content: '' });
      continue;
    }
    
    let currentPageParagraphs: string[] = [];
    let currentLineCount = 0;
    
    for (const paragraph of paragraphs) {
      const paraLines = Math.ceil(paragraph.length / 40);
      const estimatedParaHeight = paraLines * lineHeightPx;
      
      if (currentLineCount + paraLines > maxLinesPerPage && currentPageParagraphs.length > 0) {
        pages.push({ id: pageId++, content: currentPageParagraphs.join('\n\n') });
        currentPageParagraphs = [];
        currentLineCount = 0;
      }
      
      currentPageParagraphs.push(paragraph);
      currentLineCount += paraLines + lineHeightPx * 0.5;
    }
    
    if (currentPageParagraphs.length > 0) {
      pages.push({ id: pageId++, content: currentPageParagraphs.join('\n\n') });
    }
  }
  
  return pages;
}
