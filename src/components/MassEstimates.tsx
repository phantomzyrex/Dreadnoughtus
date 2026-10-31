import React, { useState } from 'react';
import { MASS_DEBATE_STUDIES, MassStudyEstimate } from '../data/dreadnoughtusData';
import { getMassAxisPercent } from '../utils/floodplainLogic';
import { EpistemicTag } from './RiverDivider';

export const MassEstimates: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<MassStudyEstimate>(MASS_DEBATE_STUDIES[0]);
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const studies = MASS_DEBATE_STUDIES.filter(
    (s) => methodFilter === 'all' || s.method === methodFilter
  );

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#0C3E38]/55 border border-[#4DB48C]/30">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#4DB48C]/25">
        <div>
          <div className="text-xs font-display uppercase tracking-[0.18em] text-[#9BDDBB] mb-1">
            Interactive Dot-and-Whisker Analysis · [debated]
          </div>
          <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-[0.04em] text-[#F4FFF8]">
            Why Is the Weight Debated? (22.1 t – 59.3 t)
          </h3>
          <p className="text-sm text-[#E1F1EA]/85 font-light mt-2 max-w-3xl leading-relaxed">
            Quadrupedal limb-bone scaling equations (measuring humerus and femur circumference) and
            3D digital volumetric reconstructions yield markedly different mass estimates. Campione
            suggests the gap between methods may come from posture and gait effects, or from the
            fact that the main specimen was still immature when it died.
          </p>
        </div>

        {/* Method Filter Buttons */}
        <div
          role="group"
          aria-label="Filter mass estimates by scientific methodology"
          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#06221F] border border-[#4DB48C]/30 shrink-0"
        >
          {[
            { id: 'all', label: 'All Studies (8)' },
            { id: 'Scaling Equation', label: 'Scaling' },
            { id: '3D Volumetric', label: '3D Volumetric' },
            { id: 'Modified Scaling', label: 'Modified Scaling' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setMethodFilter(btn.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-display uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                methodFilter === btn.id
                  ? 'bg-[#17604F] text-[#F4FFF8]'
                  : 'text-[#E1F1EA]/70 hover:text-[#F4FFF8]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Axis Header (20 t to 60 t) */}
      <div className="hidden sm:grid grid-cols-12 gap-4 items-center text-[11px] font-display uppercase tracking-[0.14em] text-[#9BDDBB] mb-3 px-3">
        <div className="col-span-4">Study &amp; Method</div>
        <div className="col-span-5 flex justify-between tabular-nums">
          <span>20 t</span>
          <span>30 t</span>
          <span>40 t</span>
          <span>50 t</span>
          <span>60 t</span>
        </div>
        <div className="col-span-3 text-right">Estimate Range</div>
      </div>

      {/* Dot-and-Whisker Rows */}
      <div className="space-y-3">
        {studies.map((item) => {
          const isSelected = selectedStudy.id === item.id;
          const minPct = getMassAxisPercent(item.minTonnes, 18, 62);
          const maxPct = getMassAxisPercent(item.maxTonnes, 18, 62);
          const pointPct = getMassAxisPercent(item.pointTonnes, 18, 62);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedStudy(item)}
              className={`w-full text-left p-3.5 sm:px-4 rounded-xl border transition-all cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center ${
                isSelected
                  ? 'bg-[#06221F] border-[#C6F5DB]'
                  : 'bg-[#06221F]/65 border-[#4DB48C]/20 hover:border-[#9BDDBB]/50'
              }`}
            >
              <div className="sm:col-span-4">
                <div className="font-display text-sm sm:text-base text-[#F4FFF8]">
                  {item.study}
                </div>
                <div className="text-xs text-[#9BDDBB] font-light">{item.method}</div>
              </div>

              {/* Whisker and Dot Track */}
              <div className="sm:col-span-5 relative h-7 flex items-center bg-[#08110F] rounded-full px-3 border border-[#17604F]/50">
                {/* Reference grid ticks */}
                <div className="absolute inset-x-3 inset-y-0 flex justify-between pointer-events-none opacity-20">
                  <span className="w-[1px] h-full bg-[#9BDDBB]" />
                  <span className="w-[1px] h-full bg-[#9BDDBB]" />
                  <span className="w-[1px] h-full bg-[#9BDDBB]" />
                  <span className="w-[1px] h-full bg-[#9BDDBB]" />
                  <span className="w-[1px] h-full bg-[#9BDDBB]" />
                </div>

                {/* Whisker range bar */}
                {item.maxTonnes > item.minTonnes && (
                  <div
                    className="absolute h-2 rounded-full bg-[#4DB48C]/65"
                    style={{
                      left: `${minPct}%`,
                      width: `${Math.max(4, maxPct - minPct)}%`,
                    }}
                  />
                )}

                {/* Point estimate dot */}
                <div
                  className="absolute w-3.5 h-3.5 -ml-1.5 rounded-full bg-[#CFEFF0] border-2 border-[#06221F] shadow-[0_0_10px_rgba(207,239,240,0.9)]"
                  style={{ left: `${pointPct}%` }}
                />
              </div>

              <div className="sm:col-span-3 sm:text-right text-xs font-display text-[#E1F1EA] tabular-nums">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Study Footnote Callout */}
      <div className="mt-6 p-4 rounded-xl bg-[#06221F] border border-[#4DB48C]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-display uppercase tracking-[0.14em] text-[#9BDDBB]">
            <span>Selected Study Details: {selectedStudy.study}</span>
            <EpistemicTag type={selectedStudy.badge} />
          </div>
          <p className="text-sm text-[#E1F1EA]/90 font-light mt-1">{selectedStudy.notes}</p>
        </div>
        <div className="font-display text-lg text-[#C6F5DB] tabular-nums shrink-0">
          {selectedStudy.label}
        </div>
      </div>
    </div>
  );
};
