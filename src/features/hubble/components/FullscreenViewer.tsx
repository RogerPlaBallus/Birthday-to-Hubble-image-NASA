import { monthNames } from '../constants';
import type { HubbleEntry } from '../types';

interface FullscreenViewerProps {
  result: HubbleEntry;
  month: number;
  day: number;
  showInfo: boolean;
  onClose: () => void;
  onToggleInfo: () => void;
  imageUrl: string;
}

// Displays the selected Hubble image in immersive fullscreen mode.
export function FullscreenViewer({
  result,
  month,
  day,
  showInfo,
  onClose,
  onToggleInfo,
  imageUrl,
}: FullscreenViewerProps) {
  return (
    <div className="fixed inset-0 bg-black text-white">
      <img src={imageUrl} alt={result.name} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-black/15" />

      <button
        onClick={onClose}
        aria-label="Close image and choose another date"
        className="absolute right-5 top-5 z-20 inline-flex h-10 w-10 items-center justify-center bg-red-500 text-xl font-semibold text-white transition hover:bg-red-600"
      >
        x
      </button>

      <div
        className={`absolute bottom-5 left-5 z-20 rounded-lg border border-white/15 bg-black/60 shadow-2xl backdrop-blur-sm transition-all duration-300 ${
          showInfo
            ? 'w-[min(530px,calc(100%-2.5rem))] p-3 sm:p-5'
            : 'w-auto max-w-[calc(100%-2.5rem)] p-3 sm:p-4'
        }`}
      >
        <div className={`flex items-center gap-2 text-xs sm:text-sm text-white/95 ${showInfo ? 'mb-3 flex-wrap' : 'mb-0 whitespace-nowrap'}`}>
          <button type="button" onClick={onToggleInfo} className="underline-offset-2 hover:underline">
            {showInfo ? 'Hide Info' : 'Show Info'}
          </button>
          <span className="text-white/70">|</span>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            See Full Image
          </a>
          <span className="text-white/70">|</span>
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            More info
          </a>
        </div>

        {showInfo && (
          <div className="space-y-3">
            <p className="text-2xl font-light leading-tight sm:text-4xl">On {monthNames[month - 1]} {day} in {result.year}</p>
            <h2 className="text-2xl font-semibold sm:text-4xl">{result.name}</h2>
            <p className="max-w-xl text-base leading-relaxed text-white/95 sm:text-xl">{result.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
