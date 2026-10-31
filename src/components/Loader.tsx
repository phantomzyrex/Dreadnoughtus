import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
  skipImmediately?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete, skipImmediately = false }) => {
  const [progress, setProgress] = useState(skipImmediately ? 100 : 0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (skipImmediately) {
      onComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(100);
      onComplete();
      return;
    }

    const duration = 1100; // crisp 1.1s river-network draw
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 380);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete, skipImmediately]);

  if (skipImmediately) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06221F] transition-opacity duration-400 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Dreadnoughtus Floodplain Monograph"
    >
      <div className="w-full max-w-2xl px-8">
        <div className="flex items-baseline justify-between mb-3 font-display uppercase tracking-[0.2em] text-xs text-[#9BDDBB]">
          <span>Cerro Fortaleza Floodplain · 52°S</span>
          <span className="tabular-nums text-lg text-[#F4FFF8]">{progress}%</span>
        </div>

        {/* Branching river-network loader SVG */}
        <svg viewBox="0 0 800 90" className="w-full h-20 overflow-visible" fill="none">
          {/* Background faint channel */}
          <path
            d="M 0 45 Q 200 45, 320 30 T 640 50 L 800 45"
            stroke="#17604F"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          {/* Main river channel growing with progress */}
          <path
            d="M 0 45 Q 200 45, 320 30 T 640 50 L 800 45"
            stroke="#C6F5DB"
            strokeWidth="1.5"
            strokeDasharray="820"
            strokeDashoffset={820 - (820 * progress) / 100}
          />
          {/* Tributary branch 1 */}
          <path
            d="M 210 41 C 280 65, 390 72, 510 52"
            stroke="#9BDDBB"
            strokeWidth="1"
            strokeDasharray="340"
            strokeDashoffset={340 - (340 * Math.max(0, progress - 20)) / 80}
          />
          {/* Tributary branch 2 */}
          <path
            d="M 350 32 C 430 12, 540 16, 670 46"
            stroke="#4DB48C"
            strokeWidth="1"
            strokeDasharray="340"
            strokeDashoffset={340 - (340 * Math.max(0, progress - 35)) / 65}
          />
          {/* Oxbow crescent */}
          <path
            d="M 480 56 C 530 76, 595 74, 635 50"
            stroke="#9BDDBB"
            strokeOpacity="0.7"
            strokeWidth="0.9"
            strokeDasharray="190"
            strokeDashoffset={190 - (190 * Math.max(0, progress - 50)) / 50}
          />
        </svg>

        <div className="mt-4 flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-[#E1F1EA]/60 font-display">
          <span>Dreadnoughtus schrani</span>
          <button
            type="button"
            onClick={onComplete}
            className="underline decoration-[#4DB48C]/50 hover:text-[#F4FFF8] transition-colors cursor-pointer"
          >
            Enter Monograph
          </button>
        </div>
      </div>
    </div>
  );
};
