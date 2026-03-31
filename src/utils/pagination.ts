import type { Page } from '../stores/readerStore';

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
  const { fontSize, lineHeight, fontFamily, width, height, paddingX, paddingY } = options;
  
  const contentWidth = width - paddingX * 2;
  const contentHeight = height - paddingY * 2;
  
  const avgCharWidth = fontSize * 0.5;
  const charsPerLine = Math.floor(contentWidth / avgCharWidth);
  const lineHeightPx = fontSize * lineHeight;
  const linesPerPage = Math.floor(contentHeight / lineHeightPx);
  const charsPerPage = charsPerLine * linesPerPage;
  
  const pages: Page[] = [];
  let pageId = 0;
  
  for (const rawPage of rawPages) {
    const text = rawPage.content;
    if (!text || text.length === 0) {
      pages.push({ id: pageId++, content: '' });
      continue;
    }
    
    const cleanText = text.replace(/\s+/g, ' ').trim();
    let remainingText = cleanText;
    
    while (remainingText.length > 0) {
      let chunkSize = charsPerPage;
      
      if (remainingText.length <= chunkSize) {
        pages.push({ id: pageId++, content: remainingText });
        break;
      }
      
      const chunk = remainingText.slice(0, chunkSize);
      const lastSpace = chunk.lastIndexOf(' ');
      const lastNewline = chunk.lastIndexOf('\n');
      const breakPoint = Math.max(lastSpace, lastNewline);
      
      if (breakPoint > chunkSize * 0.7) {
        chunkSize = breakPoint;
      }
      
      const pageContent = remainingText.slice(0, chunkSize).trim();
      if (pageContent) {
        pages.push({ id: pageId++, content: pageContent });
      }
      
      remainingText = remainingText.slice(chunkSize).trim();
    }
  }
  
  return pages;
}
