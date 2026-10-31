import React, { useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/dreadnoughtusData';
import { EpistemicTag, RiverDivider } from './RiverDivider';

export const Timeline: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fieldwork' | 'mass-debate'>('all');

  const filteredMilestones = TIMELINE_MILESTONES.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fieldwork') {
      return ['2005', '2005-2009', '2009', '2015-mar', '2022', '2024'].includes(m.id);
    }
    return ['2011', '2014-sep-4', '2014-sep-vol', '2015-jun', '2016', '2017', '2019-2020', 'today'].includes(
      m.id
    );
  });

  return (
    <section
      id="discovery"
      aria-label="Discovery and Research History Timeline"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="03"
        kicker="Chronology of Excavation & Debate"
        title="Discovery and History"
        subtitle="From Kenneth Lacovara’s 2005 discovery on the east bank of the Río La Leona to ongoing volumetric and osteological studies."
      />

      {/* Interactive Filter Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-5 border-b border-[#4DB48C]/20">
        <p className="text-sm text-[#E1F1EA]/80 font-light max-w-xl">
          Follow the branching river channel through four austral summers of field excavation,
          trans-oceanic preparation, 3D laser scanning, and the decade-long mass debate.
        </p>

        <div
          role="group"
          aria-label="Filter timeline milestones"
          className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#06221F] border border-[#4DB48C]/30"
        >
          {[
            { id: 'all', label: 'All Milestones (14)' },
            { id: 'fieldwork', label: 'Excavation & Taphonomy' },
            { id: 'mass-debate', label: 'Mass & Osteology Debate' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as 'all' | 'fieldwork' | 'mass-debate')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-display uppercase tracking-[0.1em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-[#17604F] text-[#F4FFF8]'
                  : 'text-[#E1F1EA]/70 hover:text-[#F4FFF8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Branching River Timeline */}
      <div className="relative">
        {/* Central Branching River SVG Spine (visible on md+) */}
        <div
          className="hidden md:block pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-24"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 100 1400"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Primary meandering river channel */}
            <path
              d="M50 0 C 68 140, 32 280, 52 420 C 70 560, 30 700, 50 840 C 68 980, 34 1120, 50 1400"
              stroke="#4DB48C"
              strokeWidth="2"
              strokeOpacity="0.65"
            />
            {/* Secondary anastomosing braid channel */}
            <path
              d="M50 60 C 28 200, 72 340, 46 490 C 26 630, 74 770, 48 920 C 30 1060, 68 1220, 50 1380"
              stroke="#9BDDBB"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="6 4"
            />
          </svg>
        </div>

        {/* Mobile left river spine */}
        <div
          className="md:hidden pointer-events-none absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#9BDDBB] via-[#4DB48C] to-[#17604F]"
          aria-hidden="true"
        />

        <ol className="space-y-8 md:space-y-10 relative z-10">
          {filteredMilestones.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <li
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content column */}
                <div className="w-full md:w-[45%] pl-9 md:pl-0">
                  <article className="p-6 rounded-2xl bg-[#06221F]/95 border border-[#4DB48C]/25 hover:border-[#9BDDBB]/60 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-display text-sm sm:text-base uppercase tracking-[0.14em] text-[#9BDDBB] tabular-nums">
                        {item.year}
                      </span>
                      <EpistemicTag type={item.badge} />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#E1F1EA]/85 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                </div>

                {/* Center River Confluence Node */}
                <div
                  className="absolute left-[7px] md:static md:w-[10%] flex items-center justify-center mt-6"
                  aria-hidden="true"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C6F5DB] border-2 border-[#06221F] shadow-[0_0_12px_rgba(198,245,219,0.8)]" />
                </div>

                {/* Spacer column */}
                <div className="hidden md:block md:w-[45%]" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
