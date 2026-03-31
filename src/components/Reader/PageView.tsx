import { useStore } from '@nanostores/react';
import { $pages, $currentPage, $settings } from '../../stores/readerStore';

export default function PageView() {
  const pages = useStore($pages);
  const currentPage = useStore($currentPage);
  const settings = useStore($settings);

  const page = pages[currentPage];

  if (!page) {
    return (
      <div className="flex items-center justify-center h-full text-[--text-secondary]">
        No content to display
      </div>
    );
  }

  const paragraphs = page.content.split('\n\n').filter(Boolean);

  return (
    <div
      className="h-full overflow-y-auto px-6 py-10"
      style={{
        fontFamily: settings.fontFamily,
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
      }}
    >
      <div className="mx-auto max-w-2xl tracking-wide">
        {paragraphs.length > 0 ? (
          paragraphs.map((para, idx) => (
            <p
              key={idx}
              className="mb-5 text-[--text-primary]"
            >
              {para}
            </p>
          ))
        ) : (
          <p className="text-[--text-secondary]">No content</p>
        )}
      </div>
    </div>
  );
}