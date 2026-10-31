import React from 'react';
import { EpistemicBadge } from '../data/dreadnoughtusData';

interface RiverDividerProps {
  sectionNumber: string;
  kicker: string;
  title: string;
  subtitle?: string;
}

export const RiverDivider: React.FC<RiverDividerProps> = ({
  sectionNumber,
  kicker,
  title,
  subtitle,
}) => {
  return (
    <div className="mb-12 md:mb-16">
      {/* Branching river-network hairline motif */}
      <div className="relative w-full h-10 mb-6 overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1200 40"
          fill="none"
           preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0 20 C 220 20, 310 8, 520 18 C 720 28, 880 12, 1200 20"
            stroke="#4DB48C"
            strokeOpacity="0.38"
            strokeWidth="1"
          />
          <path
            d="M240 16 C 340 28, 450 32, 620 21 C 760 12, 910 28, 1080 19"
            stroke="#9BDDBB"
            strokeOpacity="0.24"
            strokeWidth="0.85"
          />
          <path
            d="M460 20 C 530 10, 610 10, 710 22"
            stroke="#C6F5DB"
            strokeOpacity="0.28"
            strokeWidth="0.75"
          />
          <circle cx="240" cy="16" r="2" fill="#9BDDBB" fillOpacity="0.5" />
          <circle cx="620" cy="21" r="2" fill="#9BDDBB" fillOpacity="0.5" />
          <circle cx="910" cy="23" r="1.75" fill="#C6F5DB" fillOpacity="0.45" />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-start gap-5 md:gap-7">
          <span
            className="section-number-outline text-5xl md:text-7xl leading-none tracking-tight shrink-0"
            aria-hidden="true"
          >
            {sectionNumber}
          </span>
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#9BDDBB] mb-2 font-display">
              <span>{sectionNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{kicker}</span>
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] uppercase tracking-[0.04em] text-[#F4FFF8] leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {title}
            </h2>
          </div>
        </div>

        {subtitle && (
          <p className="text-sm md:text-base text-[#E1F1EA]/80 max-w-md font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Unboxed scientific status metadata label following Zero-Pill Discipline
 */
export const EpistemicTag: React.FC<{ type?: EpistemicBadge; prefix?: string }> = ({
  type,
  prefix,
}) => {
  if (!type) return null;

  const labelMap: Record<EpistemicBadge, { text: string; colorClass: string }> = {
    estimate: { text: 'estimate', colorClass: 'text-[#9BDDBB]' },
    debated: { text: 'debated', colorClass: 'text-[#CFEFF0]' },
    inferred: { text: 'inferred', colorClass: 'text-[#E1F1EA]/80' },
    preserved: { text: 'preserved fossil record', colorClass: 'text-[#4DB48C]' },
  };

  const info = labelMap[type];

  return (
    <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.14em] uppercase font-display">
      {prefix && (
        <>
          <span className="text-[#E1F1EA]/60">{prefix}</span>
          <span aria-hidden="true" className="text-[#E1F1EA]/40">·</span>
        </>
      )}
      <span className={info.colorClass}>[{info.text}]</span>
    </span>
  );
};
