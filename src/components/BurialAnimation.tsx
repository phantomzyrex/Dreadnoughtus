import React, { useEffect, useState } from 'react';
import { EpistemicTag } from './RiverDivider';

const BURIAL_STAGES = [
  {
    step: 0,
    title: 'Stage 1 · Normal Bankfull Channel & Floodplain Forest',
    description:
      'A meandering river channel flows between raised natural levees. Across the flat flood basin stand temperate forests of conifers, ferns, and Nothofagus southern-beech trees with oxbow lakes and shallow pools.',
  },
  {
    step: 1,
    title: 'Stage 2 · Heavy Catchment Rain & Rising Stage',
    description:
      'Intense rainfall at ~52°S paleolatitude swells the Río La Leona paleochannel to bankfull capacity, increasing hydraulic pressure against the unconsolidated natural levee.',
  },
  {
    step: 2,
    title: 'Stage 3 · Levee Break (Avulsion)',
    description:
      'The river bank breaches in a sudden avulsion event. High-energy sediment-laden water breaks through the natural levee and pours out onto the adjacent low-lying floodplain.',
  },
  {
    step: 3,
    title: 'Stage 4 · Crevasse Splay & Rapid Burial',
    description:
      'A liquefied fan of poorly sorted sand (a crevasse splay) spreads across the plain and buries both Dreadnoughtus carcasses rapidly and deeply—explaining the exceptional 45.5% skeletal completeness and 2022 soft-tissue collagen preservation.',
  },
];

export const BurialAnimation: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStage((prev) => {
        if (prev >= 3) {
          setIsPlaying(false);
          return 3;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePlayBurial = () => {
    setStage(1);
    setIsPlaying(true);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/30 mb-10">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#4DB48C]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
              Interactive Taphonomic Cross-Section
            </span>
            <EpistemicTag type="inferred" prefix="Inferred from the sediments" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.04em] text-[#F4FFF8]">
            River Channel › Natural Levee › Crevasse Splay › Floodplain Forest › Oxbow Pools
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePlayBurial}
            className="px-5 py-2.5 rounded-lg bg-[#2A8A68] hover:bg-[#4DB48C] text-[#06221F] font-display text-xs uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {isPlaying ? 'Playing Burial Sequence...' : 'Play the burial'}
          </button>
          {stage > 0 && (
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setStage(0);
              }}
              className="px-3.5 py-2.5 rounded-lg bg-[#0C3E38] border border-[#4DB48C]/40 text-xs font-display uppercase tracking-[0.12em] text-[#E1F1EA] hover:border-[#C6F5DB] cursor-pointer whitespace-nowrap shrink-0"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Interactive Floodplain Cross-Section SVG */}
      <div className="relative rounded-xl overflow-hidden border border-[#17604F]/60 bg-[#08110F]">
        <svg viewBox="0 0 960 300" className="w-full h-auto block" fill="none">
          {/* Sky & Overcast Rain backdrop */}
          <rect width="960" height="300" fill="#08110F" />
          <rect
            width="960"
            height="170"
            fill="url(#crossSectionSky)"
            opacity={stage >= 1 ? 0.95 : 0.7}
          />
          <defs>
            <linearGradient id="crossSectionSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#17604F" />
              <stop offset="100%" stopColor="#06221F" />
            </linearGradient>
          </defs>

          {/* Heavy rain lines when Stage >= 1 */}
          {stage >= 1 && (
            <g stroke="#CFEFF0" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="10 8">
              <line x1="120" y1="10" x2="90" y2="160" />
              <line x1="260" y1="10" x2="230" y2="160" />
              <line x1="420" y1="10" x2="390" y2="160" />
              <line x1="580" y1="10" x2="550" y2="160" />
              <line x1="740" y1="10" x2="710" y2="160" />
              <line x1="880" y1="10" x2="850" y2="160" />
            </g>
          )}

          {/* Base Sandstone & Silt Stratigraphy (460m Cerro Fortaleza Formation) */}
          <path
            d="M0 175 L 80 175 C 110 225, 210 225, 240 165 C 265 148, 295 148, 325 178 L 680 186 C 720 206, 790 206, 825 186 L 960 184 L 960 300 L 0 300 Z"
            fill="#17604F"
            fillOpacity="0.55"
          />
          <path
            d="M0 225 L 960 225 L 960 300 L 0 300 Z"
            fill="#0C3E38"
          />

          {/* Main River Channel Water (Left) */}
          <path
            d={
              stage === 0
                ? 'M 82 182 C 115 220, 205 220, 236 182 Z'
                : 'M 72 162 C 115 222, 205 222, 255 156 Z'
            }
            fill="#4DB48C"
            fillOpacity="0.75"
          />

          {/* Natural Levee Ridge (breaches at Stage >= 2) */}
          <path
            d={
              stage >= 2
                ? 'M 235 172 C 260 165, 285 168, 320 178'
                : 'M 235 168 C 265 144, 295 146, 325 178'
            }
            stroke={stage >= 2 ? '#CFEFF0' : '#9BDDBB'}
            strokeWidth="3"
            strokeDasharray={stage >= 2 ? '5 4' : undefined}
          />

          {/* Floodwater & Liquefied Crevasse-Splay Sediment Fan spreading across plain (Stage >= 2) */}
          {stage >= 2 && (
            <path
              d={
                stage === 2
                  ? 'M 245 160 C 330 162, 430 170, 520 184 L 320 184 Z'
                  : 'M 245 158 C 390 158, 560 166, 740 186 L 320 186 Z'
              }
              fill={stage === 3 ? '#3E5B5E' : '#9BDDBB'}
              fillOpacity={stage === 3 ? '0.85' : '0.55'}
            />
          )}

          {/* Two Dreadnoughtus Carcasses on the Floodplain (buried in Stage 3) */}
          <g opacity={stage === 3 ? 0.55 : 0.95}>
            <ellipse cx="455" cy="180" rx="34" ry="9" fill="#C6F5DB" />
            <path d="M 485 178 C 510 172, 535 168, 555 174" stroke="#C6F5DB" strokeWidth="3.5" />
            <ellipse cx="585" cy="182" rx="24" ry="7" fill="#9BDDBB" />
          </g>

          {/* Conifer & Nothofagus Floodplain Forest Trees */}
          <g fill="#2A8A68">
            <polygon points="640,184 652,135 664,184" />
            <polygon points="670,184 680,145 690,184" />
            <circle cx="865" cy="155" r="18" />
            <rect x="863" y="168" width="4" height="16" fill="#06221F" />
          </g>

          {/* Oxbow Lake & Pools (Right) */}
          <path
            d="M 685 187 C 725 204, 785 204, 822 187 Z"
            fill="#4DB48C"
            fillOpacity="0.65"
          />

          {/* Zone Labels across the Cross-Section */}
          <g fontFamily="Marcellus, serif" fontSize="11" fill="#F4FFF8">
            <text x="160" y="135" textAnchor="middle">
              01 · RIVER CHANNEL
            </text>
            <text x="285" y="115" textAnchor="middle" fill="#C6F5DB">
              02 · NATURAL LEVEE {stage >= 2 ? '(BREACHED)' : ''}
            </text>
            <text x="485" y="135" textAnchor="middle" fill="#9BDDBB">
              03 · CREVASSE SPLAY &amp; CARCASSES
            </text>
            <text x="665" y="118" textAnchor="middle">
              04 · FLOODPLAIN FOREST
            </text>
            <text x="760" y="222" textAnchor="middle" fill="#CFEFF0">
              05 · OXBOW LAKE &amp; POOLS
            </text>
          </g>

          {/* Bottom Stratigraphic Caption inside SVG */}
          <text x="24" y="278" fill="#9BDDBB" fontSize="11" fontFamily="Marcellus, serif">
            CERRO FORTALEZA FORMATION (~460 m FLUVIAL SANDSTONE · ~52°S PALEOLATITUDE · INFERRED FROM THE SEDIMENTS)
          </text>
        </svg>
      </div>

      {/* Stage Stepper Bar */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-3">
        {BURIAL_STAGES.map((item) => {
          const active = stage === item.step;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setStage(item.step);
              }}
              className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                active
                  ? 'bg-[#0C3E38] border-[#C6F5DB]'
                  : 'bg-[#08110F]/60 border-[#4DB48C]/20 hover:border-[#9BDDBB]/50'
              }`}
            >
              <div className="font-display text-xs uppercase tracking-[0.08em] text-[#C6F5DB] mb-1">
                {item.title}
              </div>
              <p className="text-xs text-[#E1F1EA]/80 font-light leading-relaxed">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
