import React, { useState } from 'react';
import { getSortedCompletenessData } from '../utils/floodplainLogic';

export const CompletenessChart: React.FC = () => {
  const [sortMetric, setSortMetric] = useState<
    'boneTypesExclSkullPercent' | 'totalSkeletalPercent'
  >('boneTypesExclSkullPercent');

  const rows = getSortedCompletenessData(sortMetric);

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#0C3E38]/55 border border-[#4DB48C]/30">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-6 border-b border-[#4DB48C]/25">
        <div>
          <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
            Comparative Taphonomy · Lacovara et al. (2014)
          </span>
          <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-[0.04em] text-[#F4FFF8] mt-1">
            How Complete Are the Giant Titanosaurs?
          </h3>
          <p className="text-sm text-[#E1F1EA]/85 font-light mt-1 max-w-2xl">
            Comparing total skeletal completeness (% of all ~256 bones in the body) and the share
            of bone types preserved (excluding the skull, where mirrored left/right elements count
            toward osteological representation).
          </p>
        </div>

        <div
          role="group"
          aria-label="Highlight completeness metric"
          className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#06221F] border border-[#4DB48C]/35 shrink-0"
        >
          <button
            type="button"
            onClick={() => setSortMetric('boneTypesExclSkullPercent')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-display uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              sortMetric === 'boneTypesExclSkullPercent'
                ? 'bg-[#17604F] text-[#F4FFF8]'
                : 'text-[#E1F1EA]/70 hover:text-[#F4FFF8]'
            }`}
          >
            Bone Types Excl. Skull (70.4% max)
          </button>
          <button
            type="button"
            onClick={() => setSortMetric('totalSkeletalPercent')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-display uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              sortMetric === 'totalSkeletalPercent'
                ? 'bg-[#17604F] text-[#F4FFF8]'
                : 'text-[#E1F1EA]/70 hover:text-[#F4FFF8]'
            }`}
          >
            Total Skeletal Bones (45.5% max)
          </button>
        </div>
      </div>

      {/* Dual-Bar Comparative Rows */}
      <div className="space-y-4">
        {rows.map((row) => (
          <div
            key={row.taxon}
            className={`p-4 rounded-xl border ${
              row.isFocal
                ? 'bg-[#06221F] border-[#C6F5DB]'
                : 'bg-[#06221F]/65 border-[#4DB48C]/20'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2.5">
              <div>
                <span className="font-display text-base sm:text-lg italic text-[#F4FFF8]">
                  {row.taxon}
                </span>
                <span className="ml-3 text-xs text-[#E1F1EA]/70 font-light">
                  {row.bonesFoundSummary}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-display uppercase tracking-[0.1em] tabular-nums">
                <span className="text-[#9BDDBB]">
                  Total Skeleton: <strong className="text-[#F4FFF8]">{row.totalSkeletalPercent}%</strong>
                </span>
                <span aria-hidden="true" className="text-[#4DB48C]">·</span>
                <span className="text-[#CFEFF0]">
                  Bone Types (Excl. Skull):{' '}
                  <strong className="text-[#F4FFF8]">{row.boneTypesExclSkullPercent}%</strong>
                </span>
              </div>
            </div>

            {/* Dual Horizontal Bars */}
            <div className="space-y-2">
              {/* Total Skeletal Completeness Bar */}
              <div className="flex items-center gap-3">
                <span className="w-28 text-[10px] font-display uppercase tracking-[0.12em] text-[#9BDDBB] shrink-0">
                  Total Bones
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-[#08110F] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#4DB48C] transition-all duration-500"
                    style={{ width: `${row.totalSkeletalPercent}%` }}
                  />
                </div>
              </div>

              {/* Share of Bone Types Preserved (Excl. Skull) Bar */}
              <div className="flex items-center gap-3">
                <span className="w-28 text-[10px] font-display uppercase tracking-[0.12em] text-[#CFEFF0] shrink-0">
                  Bone Types
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-[#08110F] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4DB48C] to-[#CFEFF0] transition-all duration-500"
                    style={{ width: `${row.boneTypesExclSkullPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
