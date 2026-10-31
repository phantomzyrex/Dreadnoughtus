import React, { useState } from 'react';
import { TITANOSAUR_RELATIVES } from '../data/dreadnoughtusData';
import { CompletenessChart } from './CompletenessChart';
import { EpistemicTag, RiverDivider } from './RiverDivider';

const TAXONOMY_RANKS = [
  { rank: 'Kingdom', taxon: 'Animalia' },
  { rank: 'Phylum', taxon: 'Chordata' },
  { rank: 'Clade', taxon: 'Dinosauria' },
  { rank: 'Order / Clade', taxon: 'Saurischia › Sauropodomorpha › Sauropoda' },
  { rank: 'Clade', taxon: 'Macronaria › Titanosauria' },
  { rank: 'Subclade', taxon: 'Lithostrotia (membership debated)' },
  { rank: 'Genus', taxon: 'Dreadnoughtus' },
  { rank: 'Species', taxon: 'D. schrani (only known species)' },
];

export const Taxonomy: React.FC = () => {
  const [studyStop, setStudyStop] = useState<'2014' | '2016'>('2014');

  return (
    <section
      id="classification"
      aria-label="Classification, Systematics, and Skeletal Completeness"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="08"
        kicker="Phylogenetics & Osteological Completeness"
        title="Classification and Species"
        subtitle="Systematics of Dreadnoughtus schrani (the only known species in its genus) and skeletal completeness among giant titanosaurs."
      />

      {/* Top Row: Taxonomy Hierarchy Card + Interactive Family Tree Slider (2014 vs 2016) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left 5 Cols: Taxonomy Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
                Linnaean &amp; Cladistic Hierarchy
              </span>
              <EpistemicTag type="debated" />
            </div>
            <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-4">
              Taxonomic Classification
            </h3>

            <dl className="divide-y divide-[#4DB48C]/20">
              {TAXONOMY_RANKS.map((item) => (
                <div key={`${item.rank}-${item.taxon}`} className="py-2.5 flex items-baseline justify-between gap-4">
                  <dt className="font-display text-xs uppercase tracking-[0.14em] text-[#9BDDBB]">
                    {item.rank}
                  </dt>
                  <dd className="text-sm text-[#F4FFF8] font-light text-right">{item.taxon}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-5 pt-4 border-t border-[#4DB48C]/20 text-xs text-[#E1F1EA]/75 font-light">
            <em>Dreadnoughtus schrani</em> is the type and only known species of the genus{' '}
            <em>Dreadnoughtus</em>. It is definitively not a saltasaurid.
          </p>
        </div>

        {/* Right 7 Cols: Interactive "Where does it sit in the family tree?" Slider */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0C3E38]/55 border border-[#4DB48C]/30 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-[#4DB48C]/25">
              <div>
                <span className="font-display text-xs uppercase tracking-[0.16em] text-[#9BDDBB]">
                  Phylogenetic Placement Slider · [debated]
                </span>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.04em] text-[#F4FFF8]">
                  Where Does It Sit in the Family Tree?
                </h3>
              </div>

              {/* Study Stop Selector */}
              <div
                role="group"
                aria-label="Select phylogenetic study stop"
                className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#06221F] border border-[#4DB48C]/35"
              >
                <button
                  type="button"
                  onClick={() => setStudyStop('2014')}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-display uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                    studyStop === '2014'
                      ? 'bg-[#17604F] text-[#F4FFF8]'
                      : 'text-[#E1F1EA]/70 hover:text-[#F4FFF8]'
                  }`}
                >
                  2014 (Lacovara et al.)
                </button>
                <button
                  type="button"
                  onClick={() => setStudyStop('2016')}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-display uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                    studyStop === '2016'
                      ? 'bg-[#17604F] text-[#F4FFF8]'
                      : 'text-[#E1F1EA]/70 hover:text-[#F4FFF8]'
                  }`}
                >
                  2016 (Ullmann &amp; Lacovara)
                </button>
              </div>
            </div>

            {/* Cladogram SVG adapting to 2014 vs 2016 hypothesis */}
            <div className="p-4 rounded-xl bg-[#06221F] border border-[#4DB48C]/25 mb-5">
              <svg viewBox="0 0 620 180" className="w-full h-44" fill="none">
                {/* Main Cladogram Trunk */}
                <path
                  d="M 30 155 L 180 25 M 75 116 L 145 155 M 115 82 L 220 155 M 155 48 L 320 155 M 180 25 L 440 155"
                  stroke="#4DB48C"
                  strokeWidth="1.5"
                />
                {/* Node Labels */}
                <text x="15" y="170" fill="#9BDDBB" fontSize="10" fontFamily="Marcellus">
                  TITANOSAURIA
                </text>
                <text x="125" y="170" fill="#E1F1EA" fontSize="9.5">
                  Andesaurus
                </text>

                {/* 2014 Position: Derived Basal Titanosaur (Just outside Lithostrotia) */}
                <circle
                  cx="220"
                  cy="155"
                  r={studyStop === '2014' ? 6 : 3.5}
                  fill={studyStop === '2014' ? '#CFEFF0' : '#4DB48C'}
                />
                <text
                  x="220"
                  y="142"
                  textAnchor="middle"
                  fill={studyStop === '2014' ? '#CFEFF0' : '#9BDDBB'}
                  fontSize={studyStop === '2014' ? '10.5' : '9'}
                  fontFamily="Marcellus"
                >
                  {studyStop === '2014' ? '★ DREADNOUGHTUS (2014)' : 'Basal Derived Node'}
                </text>

                {/* Lithostrotia Clade Bracket */}
                <circle cx="145" cy="56" r="4" fill="#9BDDBB" />
                <text x="160" y="45" fill="#C6F5DB" fontSize="10" fontFamily="Marcellus">
                  LITHOSTROTIA CLADE
                </text>

                {/* 2016 Position: Lithostrotian close to Aeolosauridae */}
                <circle
                  cx="320"
                  cy="155"
                  r={studyStop === '2016' ? 6 : 3.5}
                  fill={studyStop === '2016' ? '#CFEFF0' : '#4DB48C'}
                />
                <text
                  x="320"
                  y="142"
                  textAnchor="middle"
                  fill={studyStop === '2016' ? '#CFEFF0' : '#E1F1EA'}
                  fontSize={studyStop === '2016' ? '10.5' : '9.5'}
                  fontFamily="Marcellus"
                >
                  {studyStop === '2016'
                    ? '★ DREADNOUGHTUS + AEOLOSAURUS (2016)'
                    : 'Aeolosaurus / Gondwanatitan'}
                </text>

                {/* Saltasauridae Node */}
                <circle cx="440" cy="155" r="3.5" fill="#4DB48C" />
                <text x="440" y="170" textAnchor="middle" fill="#9BDDBB" fontSize="9.5">
                  Saltasauridae (Not a member)
                </text>
              </svg>
            </div>

            {/* Study Description Box */}
            {studyStop === '2014' ? (
              <div className="p-4 rounded-xl bg-[#06221F]/80 border border-[#9BDDBB]/35">
                <div className="font-display text-sm uppercase tracking-[0.08em] text-[#C6F5DB] mb-1">
                  2014 · Lacovara et al. (Initial Phylogenetic Analysis)
                </div>
                <p className="text-sm text-[#E1F1EA]/90 font-light leading-relaxed">
                  Recovered <em>Dreadnoughtus schrani</em> as a derived basal titanosaur—not quite a
                  lithostrotian (sitting just outside the clade defined by <em>Malawisaurus</em> and{' '}
                  <em>Saltasaurus</em>). The authors noted that titanosaur relationships are
                  notoriously unstable, so its position may change with future matrices.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#06221F]/80 border border-[#9BDDBB]/35">
                <div className="font-display text-sm uppercase tracking-[0.08em] text-[#C6F5DB] mb-1">
                  2016 · Ullmann &amp; Lacovara (Appendicular Osteology Assessment)
                </div>
                <p className="text-sm text-[#E1F1EA]/90 font-light leading-relaxed">
                  Detailed study of the limb bones revealed that <em>Dreadnoughtus</em> shares many
                  derived osteological traits with lithostrotians—especially{' '}
                  <em>Aeolosaurus</em> and <em>Gondwanatitan</em>—suggesting it may actually be a
                  lithostrotian close to Aeolosauridae (though without running a new full cladistic
                  matrix). It is definitely not a saltasaurid.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Bar Chart: "How complete are the giant titanosaurs?" */}
      <CompletenessChart />

      {/* 8 Relatives Reference Grid */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/25">
        <h3 className="font-display text-xl uppercase tracking-[0.06em] text-[#F4FFF8] mb-5">
          Key Titanosaur Relatives &amp; Contemporaries
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TITANOSAUR_RELATIVES.map((rel) => (
            <div
              key={rel.name}
              className="p-4 rounded-xl bg-[#0C3E38]/45 border border-[#4DB48C]/20"
            >
              <div className="font-display text-base uppercase tracking-[0.04em] text-[#C6F5DB] mb-1">
                {rel.name}
              </div>
              <p className="text-xs text-[#E1F1EA]/85 font-light leading-relaxed">{rel.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
