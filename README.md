# Book Reader

## Features

- **PDF Text Extraction** - Client-side PDF parsing using PDF.js with position-based text reconstruction
- **Book-like Formatting** - Proper paragraph handling (hyphenation repair, line break fixing)
- **Dynamic Pagination** - Height-based pagination for consistent reading experience
- **Customizable Themes** - Dark (default), Sepia, and Soft Gray themes
- **Typography Controls** - Adjustable font size, line height, and font family
- **Navigation** - Arrow keys for page navigation, space for next page
- **Reading Progress** - Persistent reading position and progress bar
- **Settings Panel** - Theme and typography controls with easy access

## Tech Stack

- **Astro** - Static site generator and meta-framework
- **React** - UI components
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **PDF.js** - Client-side PDF text extraction
- **Nanostores** - Lightweight state management

## Project Structure

```
src/
├── components/
│   ├── Reader/
│   │   ├── BookReader.tsx      # Main component - handles PDF upload, navigation, settings
│   │   ├── PageView.tsx        # Renders pages with paragraph styling
│   │   ├── PageControls.tsx    # Navigation arrows
│   │   └── ProgressBar.tsx    # Reading progress
│   ├── Config/
│   │   └── SettingsPanel.tsx   # Theme/font settings panel
│   └── UI/
│       └── FileUploader.tsx     # PDF upload component
├── stores/
│   └── readerStore.ts           # Nanostores state management
├── utils/
│   ├── pdfExtractor.ts          # Position-based PDF text extraction
│   ├── pagination.ts           # Dynamic height pagination
│   └── textProcessor.ts        # Text cleaning pipeline
├── pages/
│   └── index.astro             # Main page
├── layouts/
│   └── Layout.astro           # HTML layout with CSS variables
└── styles/
    └── global.css              # Tailwind CSS import
```

## Getting Started

```sh
npm install
npm run dev
```

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev -- --host`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Keyboard Controls

- **Space** - Next page
- **Left Arrow** - Previous page
- **Right Arrow** - Next page
- **Up/Down Arrows** - Scroll within current page
- **Escape** - Close settings panel

## Theme Options

- **Dark** (default) - Easy on the eyes for low-light reading
- **Sepia** - Warm, classic book feel
- **Soft Gray** - Clean, minimal look


## TODO
- format the titles and sub-titles
- make modular the proyect and separate the logic from the view (frontend and backend)
- change the programing languaje for the extraction of the backend
- efficient extraction of the images
- make the UI configurable 

