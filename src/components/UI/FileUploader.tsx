import { useCallback } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export default function FileUploader({ onFileSelect, isLoading }: FileUploaderProps) {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="text-center space-y-6">
        <div class="text-6xl">📚</div>
        <h1 class="text-3xl font-light text-[--text-primary]">Book Reader</h1>
        <p class="text-[--text-secondary] max-w-md">
          Upload a PDF to start reading in a comfortable, distraction-free environment
        </p>
        
        <label class="inline-flex items-center gap-2 px-6 py-3 bg-[--accent] text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Upload PDF</span>
            </>
          )}
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            class="hidden"
            disabled={isLoading}
          />
        </label>
        
        <p class="text-sm text-[--text-secondary] opacity-60">
          Only PDF files are supported
        </p>
      </div>
    </div>
  );
}
