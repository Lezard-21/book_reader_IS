export interface ExtractedPage {
  pageNum: number;
  content: string;
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

export async function extractTextFromPDF(file: File): Promise<ExtractedPage[]> {
  const pdfjsModule = await getPdfJs();
  
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsModule.getDocument({ data: arrayBuffer }).promise;
  
  const pages: ExtractedPage[] = [];
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    const text = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    pages.push({
      pageNum: i,
      content: text || '[No text content on this page]',
    });
  }
  
  return pages;
}

export function canExtractText(pages: ExtractedPage[]): boolean {
  const totalChars = pages.reduce((acc, page) => acc + page.content.length, 0);
  return totalChars > 100;
}
