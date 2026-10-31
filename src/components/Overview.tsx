import React, { useState } from 'react';
import { OVERVIEW_STATS, StatCardItem } from '../data/dreadnoughtusData';
import { EpistemicTag, RiverDivider } from './RiverDivider';

export const Overview: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<StatCardItem>(OVERVIEW_STATS[0]);

  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="02"
        kicker="Paleobiological Synopsis"
        title="The One That Fears Nothing"
        subtitle="Holotype MPM-PV 1156 & Paratype MPM-PV 3546 · Cerro Fortaleza Formation, Santa Cruz Province, Argentina"
      />

      {/* Editorial Lead Essay on --deep / --floor background */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
        <div className="lg:col-span-8 bg-[#0C3E38]/55 border border-[#4DB48C]/25 rounded-2xl p-6 sm:p-9">
          <p className="text-lg sm:text-xl text-[#F4FFF8] font-light leading-[1.75] max-w-2xl first-letter:text-5xl first-letter:font-display first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:text-[#9BDDBB]">
            <em>Dreadnoughtus schrani</em> was a gigantic, long-necked, plant-eating sauropod—a
            titanosaur—from the Late Cretaceous of southern Patagonia, Argentina. It is known from
            two partial skeletons, and the better one makes it the best-known of the truly gigantic
            titanosaurs. Osteohistological sampling of its upper-arm bone reveals that this massive
            animal was still actively growing when it died.
          </p>
          <div className="mt-6 pt-5 border-t border-[#4DB48C]/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#E1F1EA]/75 font-display uppercase tracking-[0.14em]">
            <span>Holotype: MPM-PV 1156</span>
            <span aria-hidden="true">·</span>
            <span>Paratype: MPM-PV 3546</span>
            <span aria-hidden="true">·</span>
            <span>Repository: Museo Padre Molina, Río Gallegos</span>
          </div>
        </div>

        {/* Active Stat Spotlight Panel */}
        <div className="lg:col-span-4 bg-[#06221F] border border-[#9BDDBB]/35 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
                Selected Dossier Record
              </span>
              <EpistemicTag type={selectedStat.badge} />
            </div>
            <h3 className="font-display text-lg uppercase tracking-[0.06em] text-[#E1F1EA]/80">
              {selectedStat.label}
            </h3>
            <p className="font-display text-2xl sm:text-3xl text-[#F4FFF8] mt-1 mb-4">
              {selectedStat.value}
            </p>
            <p className="text-sm sm:text-base text-[#E1F1EA]/90 font-light leading-relaxed">
              {selectedStat.detail}
            </p>
          </div>
          <p className="mt-6 text-xs text-[#9BDDBB]/75 font-light">
            Select any card below to inspect full osteological notes and epistemic status.
          </p>
        </div>
      </div>

      {/* 12 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {OVERVIEW_STATS.map((stat, index) => {
          const isSelected = selectedStat.id === stat.id;
          return (
            <button
              key={stat.id}
              type="button"
              onClick={() => setSelectedStat(stat)}
              className={`text-left p-6 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0C3E38] border-[#9BDDBB] shadow-[0_0_25px_rgba(155,221,187,0.14)]'
                  : 'bg-[#06221F]/90 border-[#4DB48C]/20 hover:border-[#4DB48C]/55 hover:bg-[#0C3E38]/45'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="font-display text-xs uppercase tracking-[0.16em] text-[#9BDDBB] tabular-nums">
                    {String(index + 1).padStart(2, '0')} · {stat.label}
                  </span>
                  <EpistemicTag type={stat.badge} />
                </div>
                <div className="font-display text-xl sm:text-2xl text-[#F4FFF8] tracking-[0.02em] mb-3">
                  {stat.value}
                </div>
                <p className="text-sm text-[#E1F1EA]/80 font-light leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
