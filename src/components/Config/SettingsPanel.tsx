import { useStore } from '@nanostores/react';
import { $settings, setSettings, type Theme } from '../../stores/readerStore';

const FONTS = [
  { name: 'Georgia', label: 'Georgia' },
  { name: 'Merriweather', label: 'Merriweather' },
  { name: 'Inter', label: 'Inter' },
  { name: 'Open Sans', label: 'Open Sans' },
  { name: 'system-ui', label: 'System' },
];

const THEMES: { value: Theme; label: string; bg: string; text: string }[] = [
  { value: 'dark', label: 'Dark', bg: '#111111', text: '#e5e5e5' },
  { value: 'sepia', label: 'Sepia', bg: '#f4ecd8', text: '#5b4636' },
  { value: 'gray', label: 'Soft Gray', bg: '#2b2b2b', text: '#d6d6d6' },
];

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const settings = useStore($settings);

  return (
    <div class="fixed top-0 right-0 h-full w-80 bg-[--bg-secondary] border-l border-[--border] p-6 transform transition-transform duration-300 z-50 overflow-y-auto">
      <div class="flex items-center gap-3 mb-6">
        <svg className="h-6 w-6 text-[--text-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h2 class="text-xl font-semibold text-[--text-primary] flex-1">Settings</h2>
        <button
          onClick={onClose}
          class="p-2 rounded-lg text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-primary] transition-colors"
          aria-label="Close settings"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-[--text-secondary] mb-3">
            Theme
          </label>
          <div class="flex gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.value}
                onClick={() => setSettings({ theme: theme.value })}
                class={`flex-1 py-2 px-3 rounded-lg border-2 transition-all ${
                  settings.theme === theme.value
                    ? 'border-[--accent]'
                    : 'border-transparent hover:border-[--border]'
                }`}
                style={{ backgroundColor: theme.bg }}
                title={theme.label}
              >
                <span class="sr-only">{theme.label}</span>
              </button>
            ))}
          </div>
          <p class="mt-2 text-xs text-[--text-secondary]">
            Selected: {THEMES.find((t) => t.value === settings.theme)?.label}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-[--text-secondary] mb-3">
            Font Family
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => setSettings({ fontFamily: e.target.value })}
            class="w-full px-3 py-2 bg-[--bg-primary] border border-[--border] rounded-lg text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--accent]"
          >
            {FONTS.map((font) => (
              <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-[--text-secondary] mb-3">
            Font Size: {settings.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="32"
            value={settings.fontSize}
            onChange={(e) => setSettings({ fontSize: parseInt(e.target.value) })}
            class="w-full h-2 bg-[--bg-primary] rounded-lg appearance-none cursor-pointer accent-[--accent]"
          />
          <div class="flex justify-between text-xs text-[--text-secondary] mt-1">
            <span>12px</span>
            <span>32px</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-[--text-secondary] mb-3">
            Line Height: {settings.lineHeight}
          </label>
          <input
            type="range"
            min="1.2"
            max="2.4"
            step="0.1"
            value={settings.lineHeight}
            onChange={(e) => setSettings({ lineHeight: parseFloat(e.target.value) })}
            class="w-full h-2 bg-[--bg-primary] rounded-lg appearance-none cursor-pointer accent-[--accent]"
          />
          <div class="flex justify-between text-xs text-[--text-secondary] mt-1">
            <span>1.2</span>
            <span>2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
