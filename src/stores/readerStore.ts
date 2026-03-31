import { atom, map } from 'nanostores';

export type Theme = 'dark' | 'sepia' | 'gray';

export interface ReaderSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  theme: Theme;
}

export interface Page {
  id: number;
  content: string;
}

export const $isLoading = atom(false);
export const $error = atom<string | null>(null);
export const $fileName = atom<string | null>(null);
export const $pages = atom<Page[]>([]);
export const $currentPage = atom(0);
export const $totalPages = atom(0);
export const $settings = map<ReaderSettings>({
  fontSize: 18,
  lineHeight: 1.7,
  fontFamily: 'Georgia',
  theme: 'dark',
});

export function setSettings(settings: Partial<ReaderSettings>) {
  const current = $settings.get();
  $settings.set({ ...current, ...settings });
  localStorage.setItem('reader-settings', JSON.stringify({ ...current, ...settings }));
}

export function loadSettings() {
  const saved = localStorage.getItem('reader-settings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      $settings.set({ ...$settings.get(), ...parsed });
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  }
}

export function loadReadingPosition(fileName: string) {
  const saved = localStorage.getItem(`reader-position-${fileName}`);
  if (saved) {
    try {
      return parseInt(saved, 10);
    } catch (e) {
      return 0;
    }
  }
  return 0;
}

export function saveReadingPosition(fileName: string, page: number) {
  localStorage.setItem(`reader-position-${fileName}`, page.toString());
}

export function resetReader() {
  $pages.set([]);
  $currentPage.set(0);
  $totalPages.set(0);
  $fileName.set(null);
  $error.set(null);
}
