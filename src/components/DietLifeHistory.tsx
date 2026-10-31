import React, { useState } from 'react';
import { EpistemicTag, RiverDivider } from './RiverDivider';

export const DietLifeHistory: React.FC = () => {
  const [activeTrophicNode, setActiveTrophicNode] = useState<'flora' | 'dreadnoughtus' | 'scavengers'>(
    'dreadnoughtus'
  );

  const trophicDetails = {
    flora: {
      title: 'Temperate Floodplain Flora (Primary Producers)',
      badge: 'inferred' as const,
      summary:
        'Fossil wood from the Cerro Fortaleza Formation is ~75% conifer-type (gymnosperm) and ~25% flowering-plant angiosperm wood, including southern-beech (Nothofagus-type) trees, alongside tree ferns and ground ferns.',
    },
    dreadnoughtus: {
      title: 'Dreadnoughtus schrani (Primary Megaherbivore)',
      badge: 'inferred' as const,
      summary:
        'A plant-eater (inferred); what specific plants it actually ate is unknown. Its ~11.3 m neck allowed wide lateral and vertical browsing sweeps without moving its massive torso.',
    },
    scavengers: {
      title: 'Megaraptoran Theropods — e.g. Orkoraptor (Carcass Scavengers)',
      badge: 'inferred' as const,
      summary:
        'Numerous small shed theropod teeth were recovered among the Dreadnoughtus bones—most likely evidence of scavenging by megaraptorans, perhaps Orkoraptor. They show scavengers fed on the carcass, not that anything hunted a living adult.',
    },
  };

  return (
    <section
      id="diet-life"
      aria-label="Diet, Bone Histology Growth, and Scavenging"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="06"
        kicker="Paleobiology & Ontogeny"
        title="Diet and Life History"
        subtitle="Trophic interactions, rapid bone microstructure growth, and post-mortem scavenging on the Cerro Fortaleza floodplain."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 1. Hypothetical Animated Food-Web Graphic */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
                Trophic Network · Labelled “Hypothetical”
              </span>
              <EpistemicTag type="inferred" prefix="Hypothetical Food Web" />
            </div>
            <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-3">
              Herbivory &amp; Post-Mortem Scavenging
            </h3>
            <p className="text-sm sm:text-base text-[#E1F1EA]/85 font-light leading-relaxed mb-6">
              <em>Dreadnoughtus</em> was a plant-eater (inferred); what it actually ate is unknown.
              The forests around it included conifers and southern-beech-type trees. Shed theropod
              teeth among the skeletons indicate carcass scavenging rather than predation on a
              healthy adult.
            </p>

            {/* Interactive SVG Trophic Flow: Plants > Dreadnoughtus > Scavengers */}
            <div className="my-6 p-4 rounded-xl bg-[#0C3E38]/45 border border-[#4DB48C]/25">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <button
                  type="button"
                  onClick={() => setActiveTrophicNode('flora')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    activeTrophicNode === 'flora'
                      ? 'bg-[#17604F] border-[#C6F5DB]'
                      : 'bg-[#06221F]/80 border-[#4DB48C]/25 hover:border-[#9BDDBB]'
                  }`}
                >
                  <div className="font-display text-[10px] uppercase tracking-[0.16em] text-[#9BDDBB]">
                    01 · Producers
                  </div>
                  <div className="font-display text-base uppercase text-[#F4FFF8] mt-1">
                    Conifers, Ferns &amp; Nothofagus
                  </div>
                  <div className="text-xs text-[#E1F1EA]/70 mt-1 font-light">
                    75% gymnosperm / 25% angiosperm wood
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTrophicNode('dreadnoughtus')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    activeTrophicNode === 'dreadnoughtus'
                      ? 'bg-[#17604F] border-[#C6F5DB]'
                      : 'bg-[#06221F]/80 border-[#4DB48C]/25 hover:border-[#9BDDBB]'
                  }`}
                >
                  <div className="font-display text-[10px] uppercase tracking-[0.16em] text-[#9BDDBB]">
                    02 · Browser [Hypothetical]
                  </div>
                  <div className="font-display text-base uppercase text-[#F4FFF8] mt-1">
                    Dreadnoughtus schrani
                  </div>
                  <div className="text-xs text-[#E1F1EA]/70 mt-1 font-light">
                    High-volume non-mastication stripping
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTrophicNode('scavengers')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    activeTrophicNode === 'scavengers'
                      ? 'bg-[#17604F] border-[#C6F5DB]'
                      : 'bg-[#06221F]/80 border-[#4DB48C]/25 hover:border-[#9BDDBB]'
                  }`}
                >
                  <div className="font-display text-[10px] uppercase tracking-[0.16em] text-[#9BDDBB]">
                    03 · Carcass Scavengers
                  </div>
                  <div className="font-display text-base uppercase text-[#F4FFF8] mt-1">
                    Megaraptorans (Orkoraptor?)
                  </div>
                  <div className="text-xs text-[#E1F1EA]/70 mt-1 font-light">
                    Shed teeth found among bones
                  </div>
                </button>
              </div>

              {/* Animated River-Line Flow Connectors */}
              <svg viewBox="0 0 600 28" className="w-full h-7 mt-2 hidden sm:block" fill="none">
                <path
                  d="M 100 14 C 180 4, 220 24, 300 14 C 380 4, 420 24, 500 14"
                  stroke="#9BDDBB"
                  strokeWidth="1.2"
                  strokeDasharray="6 4"
                />
                <polygon points="295,10 305,14 295,18" fill="#C6F5DB" />
                <polygon points="495,10 505,14 495,18" fill="#C6F5DB" />
              </svg>
            </div>
          </div>

          {/* Selected Trophic Node Explanation */}
          <div className="p-4 rounded-xl bg-[#0C3E38]/60 border border-[#9BDDBB]/30">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-display text-sm uppercase tracking-[0.06em] text-[#C6F5DB]">
                {trophicDetails[activeTrophicNode].title}
              </span>
              <EpistemicTag type={trophicDetails[activeTrophicNode].badge} />
            </div>
            <p className="text-sm text-[#E1F1EA]/90 font-light leading-relaxed">
              {trophicDetails[activeTrophicNode].summary}
            </p>
          </div>
        </div>

        {/* 2. Bone Histology & Growth Stage Infographic */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0C3E38]/55 border border-[#4DB48C]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
                Ontogenetic Histology
              </span>
              <EpistemicTag type="inferred" />
            </div>
            <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-3">
              Still Growing at Death
            </h3>
            <p className="text-sm text-[#E1F1EA]/85 font-light leading-relaxed mb-6">
              The upper-arm bone (humerus) of the main specimen lacks the outer bone layer (External
              Fundamental System, EFS) found only in fully grown animals and shows plenty of
              fast-growing fibrolamellar tissue. The second specimen was slightly smaller. Fully
              grown individuals may have been larger (inferred).
            </p>

            {/* Growth Stage Infographic SVG */}
            <div className="p-4 rounded-xl bg-[#06221F] border border-[#4DB48C]/25 mb-5">
              <div className="text-xs font-display uppercase tracking-[0.14em] text-[#9BDDBB] mb-3">
                Humeral Cortical Bone Cross-Section &amp; Growth Trajectory
              </div>
              <svg viewBox="0 0 360 140" className="w-full h-36" fill="none">
                {/* Left: Humerus Bone Histology Rings */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  fill="#0C3E38"
                  stroke="#9BDDBB"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                <circle cx="70" cy="70" r="38" fill="#17604F" stroke="#4DB48C" strokeWidth="1.2" />
                <circle cx="70" cy="70" r="22" fill="#06221F" stroke="#9BDDBB" strokeWidth="1" />
                <text x="70" y="134" textAnchor="middle" fill="#C6F5DB" fontSize="9.5" fontFamily="Marcellus">
                  NO OUTER EFS LAYER (STILL GROWING)
                </text>

                {/* Right: 3-Stage Ontogenetic Curve */}
                <line x1="155" y1="115" x2="345" y2="115" stroke="#4DB48C" strokeWidth="1" />
                <line x1="155" y1="20" x2="155" y2="115" stroke="#4DB48C" strokeWidth="1" />
                <path
                  d="M 160 110 C 195 105, 225 65, 265 42 C 295 26, 320 22, 340 22"
                  stroke="#9BDDBB"
                  strokeWidth="2"
                />
                {/* Paratype MPM-PV 3546 marker */}
                <circle cx="232" cy="64" r="4" fill="#4DB48C" />
                <text x="228" y="80" textAnchor="end" fill="#E1F1EA" fontSize="8.5">
                  2nd Specimen (Smaller)
                </text>
                {/* Holotype MPM-PV 1156 marker */}
                <circle cx="268" cy="40" r="5" fill="#CFEFF0" />
                <text x="268" y="30" textAnchor="middle" fill="#CFEFF0" fontSize="9" fontWeight="bold">
                  Main Specimen (~26 m)
                </text>
                {/* Hypothetical Adult plateau */}
                <circle cx="332" cy="22" r="4" stroke="#C6F5DB" strokeDasharray="2 2" fill="#06221F" />
                <text x="342" y="36" textAnchor="end" fill="#9BDDBB" fontSize="8.5">
                  Full Adult? [inferred]
                </text>
              </svg>
            </div>
          </div>

          <div className="text-xs text-[#E1F1EA]/75 font-light border-t border-[#4DB48C]/20 pt-3">
            Reference: Schroeter, Boles &amp; Lacovara (2011); Lacovara et al. (2014).
          </div>
        </div>
      </div>
    </section>
  );
};
