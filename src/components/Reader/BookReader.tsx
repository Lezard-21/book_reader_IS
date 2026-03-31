import { useState, useCallback, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import {
  $pages,
  $currentPage,
  $totalPages,
  $fileName,
  $error,
  $settings,
  resetReader,
  loadSettings,
  loadReadingPosition,
  saveReadingPosition,
} from '../../stores/readerStore';
import { extractTextFromPDF, canExtractText } from '../../utils/pdfExtractor';
import { paginateByHeight } from '../../utils/pagination';

import FileUploader from '../UI/FileUploader';
import PageView from './PageView';
import PageControls from './PageControls';
import ProgressBar from './ProgressBar';
import SettingsPanel from '../Config/SettingsPanel';

export default function BookReader() {
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pages = useStore($pages);
  const currentPage = useStore($currentPage);
  const fileName = useStore($fileName);
  const error = useStore($error);
  const settings = useStore($settings);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSettings) {
        if (e.key === 'Escape') {
          setShowSettings(false);
        }
        return;
      }

      if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === ' ') {
        e.preventDefault();
        goToNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, pages.length, showSettings]);

  const processPDF = useCallback(async (file: File) => {
    setIsLoading(true);
    resetReader();
    $fileName.set(file.name);

    try {
      const extractedPages = await extractTextFromPDF(file);

      if (!canExtractText(extractedPages)) {
        $error.set('Could not extract text from this PDF. The file may contain images or have a complex layout.');
        setIsLoading(false);
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const paginated = paginateByHeight(extractedPages, {
        fontSize: settings.fontSize,
        lineHeight: settings.lineHeight,
        fontFamily: settings.fontFamily,
        width: viewportWidth,
        height: viewportHeight,
        paddingX: 64,
        paddingY: 100,
      });

      $pages.set(paginated);
      $totalPages.set(paginated.length);

      const savedPosition = loadReadingPosition(file.name);
      if (savedPosition > 0 && savedPosition < paginated.length) {
        $currentPage.set(savedPosition);
      }
    } catch (err) {
      console.error('Error processing PDF:', err);
      $error.set('Failed to process PDF. Please try another file.');
    } finally {
      setIsLoading(false);
    }
  }, [settings]);

  const goToNextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      const next = currentPage + 1;
      $currentPage.set(next);
      if (fileName) {
        saveReadingPosition(fileName, next);
      }
    }
  }, [currentPage, pages.length, fileName]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      const prev = currentPage - 1;
      $currentPage.set(prev);
      if (fileName) {
        saveReadingPosition(fileName, prev);
      }
    }
  }, [currentPage, fileName]);

  const handleClose = useCallback(() => {
    resetReader();
    setShowSettings(false);
  }, []);

  if (!pages.length && !isLoading) {
    return (
      <div class="min-h-screen">
        <FileUploader onFileSelect={processPDF} isLoading={isLoading} />
        {error && (
          <div class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-900/80 text-white px-6 py-3 rounded-lg">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div class="h-screen flex flex-col">
      <ProgressBar />

      <header class="flex items-center justify-between px-6 py-3 bg-[--bg-secondary] border-b border-[--border]">
        <div class="flex items-center gap-4">
          <button
            onClick={handleClose}
            class="p-2 rounded-lg text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-primary] transition-colors"
            aria-label="Close book"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 class="text-sm font-medium text-[--text-secondary] truncate max-w-[200px]">
            {fileName}
          </h1>
        </div>

        {!showSettings && (
          <button
            onClick={() => setShowSettings(!showSettings)}
            class="p-2 rounded-lg text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-primary] transition-colors"
            aria-label="Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        )}
      </header>

      <main ref={containerRef} class="flex-1 overflow-hidden">
        <PageView />
      </main>

      <PageControls onPrev={goToPrevPage} onNext={goToNextPage} />

      {showSettings && (
        <>
          <div 
            class="fixed inset-0 z-40" 
            onClick={() => setShowSettings(false)}
          />
          <SettingsPanel onClose={() => setShowSettings(false)} />
        </>
      )}

      {error && (
        <div class="fixed bottom-20 left-1/2 -translate-x-1/2 bg-red-900/80 text-white px-6 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
