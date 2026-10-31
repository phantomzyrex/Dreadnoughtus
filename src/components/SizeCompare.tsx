import React, { useState } from 'react';
import { getSizeComparisonList } from '../utils/floodplainLogic';
import { MassEstimates } from './MassEstimates';
import { EpistemicTag, RiverDivider } from './RiverDivider';

export const SizeCompare: React.FC = () => {
  const [includeOtherGiants, setIncludeOtherGiants] = useState(false);
  const entities = getSizeComparisonList(includeOtherGiants);

  const renderSilhouetteSvg = (id: string, isFocal?: boolean) => {
    const fill = isFocal ? '#4DB48C' : '#9BDDBB';
    switch (id) {
      case 'human':
        return (
          <svg viewBox="0 0 24 60" className="h-9 w-auto" fill={fill} aria-hidden="true">
            <circle cx="12" cy="8" r="5" />
            <path d="M7 15 H17 L19 34 H15 L14 58 H10 L9 34 H5 Z" />
          </svg>
        );
      case 'elephant':
        return (
          <svg viewBox="0 0 110 70" className="h-12 w-auto" fill={fill} aria-hidden="true">
            <path d="M15 30 C25 12, 65 12, 78 25 C88 22, 98 30, 100 48 C96 50, 93 42, 90 38 L86 66 H74 L72 46 H42 L40 66 H28 L26 44 L12 52 Z" />
          </svg>
        );
      case 'trex':
        return (
          <svg viewBox="0 0 180 75" className="h-13 w-auto" fill={fill} aria-hidden="true">
            <path d="M5 42 C40 38, 75 30, 110 22 C130 16, 152 10, 168 16 L165 26 L145 26 C135 34, 125 42, 115 46 L122 70 H108 L100 48 L88 70 H75 L82 44 C55 44, 28 46, 5 42 Z" />
          </svg>
        );
      case 'bus':
        return (
          <svg viewBox="0 0 180 55" className="h-11 w-auto" fill={fill} aria-hidden="true">
            <rect x="6" y="8" width="168" height="34" rx="5" />
            <circle cx="40" cy="44" r="7" fill="#06221F" stroke={fill} strokeWidth="3" />
            <circle cx="140" cy="44" r="7" fill="#06221F" stroke={fill} strokeWidth="3" />
          </svg>
        );
      case 'blue-whale':
        return (
          <svg viewBox="0 0 360 70" className="h-14 w-auto" fill={fill} aria-hidden="true">
            <path d="M10 36 C75 14, 195 14, 295 32 C325 36, 342 24, 355 16 C350 32, 350 42, 355 56 C340 46, 322 40, 295 42 C195 58, 80 54, 10 36 Z" />
          </svg>
        );
      default:
        // Sauropod silhouette (Dreadnoughtus, Patagotitan, Argentinosaurus) with dashed neck/skull marker on Dreadnoughtus
        return (
          <svg viewBox="0 0 340 90" className="h-16 sm:h-20 w-auto" fill="none" aria-hidden="true">
            <path
              d="M4 58 C55 56, 98 50, 138 38 C165 30, 196 32, 218 40 C248 28, 282 14, 322 8 C330 7, 335 10, 332 14 C324 16, 290 28, 252 50 L256 86 H242 L236 60 C212 64, 188 64, 168 60 L162 86 H146 L148 56 C105 60, 55 62, 4 58 Z"
              fill={fill}
            />
            {isFocal && (
              <path
                d="M235 34 C265 20, 296 10, 332 8"
                stroke="#F4FFF8"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            )}
          </svg>
        );
    }
  };

  return (
    <section
      id="size-comparison"
      aria-label="Size Comparison and Body Mass Debate"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="05"
        kicker="Morphometrics & Scaling"
        title="Size Comparison & The Mass Debate"
        subtitle="Comparing Dreadnoughtus schrani (~26 m) with modern and prehistoric giants across volumetric and limb-scaling methodologies."
      />

      {/* Scale Chart Header & Patagotitan / Argentinosaurus Toggle */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/30 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#4DB48C]/20">
          <div>
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.04em] text-[#F4FFF8]">
              Comparative Length &amp; Mass Scale
            </h3>
            <p className="text-sm text-[#E1F1EA]/85 font-light mt-1">
              The blue whale is still heavier than any known sauropod.{' '}
              <em>Dreadnoughtus</em> is among the largest known from reasonably complete remains,
              but not clearly the largest.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIncludeOtherGiants((prev) => !prev)}
            aria-pressed={includeOtherGiants}
            className={`px-4 py-2.5 rounded-lg text-xs font-display uppercase tracking-[0.1em] border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              includeOtherGiants
                ? 'bg-[#17604F] border-[#C6F5DB] text-[#F4FFF8]'
                : 'bg-[#0C3E38]/60 border-[#4DB48C]/40 text-[#E1F1EA] hover:border-[#9BDDBB]'
            }`}
          >
            {includeOtherGiants
              ? 'Remove Patagotitan & Argentinosaurus'
              : 'Add Patagotitan (about 31–37 m, 50–60 tonnes) and Argentinosaurus (about 30–35 m, 65–80 tonnes)'}
          </button>
        </div>

        {/* Horizontal Metric Ruler (0m to 35m) */}
        <div className="flex justify-between text-[11px] font-display text-[#9BDDBB]/70 uppercase tracking-[0.14em] mb-4 px-1 tabular-nums">
          <span>0 m</span>
          <span>10 m</span>
          <span>20 m</span>
          <span>26 m (Dreadnoughtus)</span>
          <span>{includeOtherGiants ? '37 m' : '30 m'}</span>
        </div>

        {/* Animated Silhouette Scale Rows */}
        <div className="space-y-4">
          {entities.map((entity) => (
            <div
              key={entity.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                entity.isFocal
                  ? 'bg-[#0C3E38]/80 border-[#9BDDBB]'
                  : 'bg-[#08110F]/60 border-[#4DB48C]/20'
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-display text-base sm:text-lg uppercase tracking-[0.04em] text-[#F4FFF8]">
                    {entity.name}
                  </span>
                  <EpistemicTag type={entity.badge} />
                </div>
                <div className="flex items-center gap-4 text-xs sm:text-sm font-display tabular-nums">
                  <span className="text-[#C6F5DB]">Length: {entity.lengthLabel}</span>
                  <span aria-hidden="true" className="text-[#4DB48C]">·</span>
                  <span className="text-[#9BDDBB]">Mass: {entity.massLabel}</span>
                </div>
              </div>

              {/* Proportional Visual Bar + Silhouette */}
              <div className="relative w-full bg-[#06221F] rounded-lg p-3 overflow-hidden border border-[#17604F]/40">
                <div
                  className="flex items-center justify-between gap-3 transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(entity.widthPercent, 8)}%` }}
                >
                  <div
                    className={`h-2.5 flex-1 rounded-full ${
                      entity.isFocal
                        ? 'bg-gradient-to-r from-[#2A8A68] via-[#4DB48C] to-[#C6F5DB]'
                        : 'bg-gradient-to-r from-[#17604F] to-[#4DB48C]/75'
                    }`}
                  />
                  <div className="shrink-0">{renderSilhouetteSvg(entity.id, entity.isFocal)}</div>
                </div>
              </div>

              <p className="mt-2 text-xs text-[#E1F1EA]/75 font-light">{entity.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Dot-and-Whisker Chart: "Why is the weight debated?" */}
      <MassEstimates />
    </section>
  );
};
