import { useStore } from '@nanostores/react';
import { $currentPage, $totalPages, $pages } from '../../stores/readerStore';

interface PageControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function PageControls({ onPrev, onNext }: PageControlsProps) {
  const currentPage = useStore($currentPage);
  const totalPages = useStore($totalPages);
  const pages = useStore($pages);

  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  return (
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[--bg-secondary] border border-[--border] rounded-full px-6 py-3 shadow-lg">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        class="p-2 rounded-lg text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-primary] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div class="text-sm text-[--text-secondary] min-w-[80px] text-center">
        {pages.length > 0 ? `${currentPage + 1} / ${totalPages}` : '0 / 0'}
      </div>

      <button
        onClick={onNext}
        disabled={!canNext}
        class="p-2 rounded-lg text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-primary] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
