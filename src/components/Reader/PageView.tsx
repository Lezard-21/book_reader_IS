import { useStore } from '@nanostores/react';
import { $pages, $currentPage, $settings } from '../../stores/readerStore';

export default function PageView() {
  const pages = useStore($pages);
  const currentPage = useStore($currentPage);
  const settings = useStore($settings);

  const page = pages[currentPage];

  if (!page) {
    return (
      <div class="flex items-center justify-center h-full text-[--text-secondary]">
        No content to display
      </div>
    );
  }

  return (
    <div
      class="h-full overflow-y-auto px-8 py-12"
      style={{
        fontFamily: settings.fontFamily,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      <div class="max-w-2xl mx-auto whitespace-pre-wrap text-[--text-primary]">
        {page.content}
      </div>
    </div>
  );
}
