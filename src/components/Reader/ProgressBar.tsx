import { useStore } from '@nanostores/react';
import { $currentPage, $totalPages } from '../../stores/readerStore';

export default function ProgressBar() {
  const currentPage = useStore($currentPage);
  const totalPages = useStore($totalPages);

  const progress = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

  return (
    <div class="fixed top-0 left-0 w-full h-1 bg-[--bg-secondary]">
      <div
        class="h-full bg-[--accent] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
