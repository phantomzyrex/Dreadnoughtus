import React, { useState } from 'react';
import {
  AISTUDIO_CUTOUT_FALLBACK,
  ANATOMY_HOTSPOTS,
  AnatomyHotspot,
  SIDE_CUTOUT_PATH,
} from '../data/dreadnoughtusData';
import { EpistemicTag, RiverDivider } from './RiverDivider';

export const AnatomyHotspots: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<AnatomyHotspot>(ANATOMY_HOTSPOTS[0]);
  const [showPreservedOverlay, setShowPreservedOverlay] = useState(true);
  const [imgSrc, setImgSrc] = useState(SIDE_CUTOUT_PATH);

  return (
    <section
      id="anatomy"
      aria-label="Interactive Annotated Anatomy of Dreadnoughtus"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="04"
        kicker="Osteological Atlas & Taphonomy"
        title="Interactive Skeletal & Soft-Tissue Anatomy"
        subtitle="Select any hotspot on the side-profile reconstruction or the index list to inspect preserved elements versus inferred reconstructions."
      />

      {/* Scientific Rule Notice & Dashed Outline Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 sm:p-5 rounded-xl bg-[#0C3E38]/55 border border-[#4DB48C]/30">
        <div className="text-xs sm:text-sm text-[#E1F1EA]/90 font-light">
          <strong className="font-display uppercase tracking-[0.1em] text-[#C6F5DB] mr-2">
            Reconstruction Protocol:
          </strong>
          In accordance with fossil completeness (~45.5% of bones), the skull and most of the neck
          are drawn with dashed outlines labelled{' '}
          <span className="text-[#9BDDBB] underline decoration-dashed">
            “not preserved: reconstructed from relatives”
          </span>
          . Skin colour is unknown; green floodplain tones are artistic.
        </div>

        <button
          type="button"
          onClick={() => setShowPreservedOverlay((prev) => !prev)}
          className="px-4 py-2 rounded-lg bg-[#06221F] border border-[#9BDDBB]/45 text-xs font-display uppercase tracking-[0.12em] text-[#F4FFF8] hover:border-[#C6F5DB] transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          {showPreservedOverlay
            ? 'Hide Dashed Reconstruction Overlay'
            : 'Show Dashed Reconstruction Overlay'}
        </button>
      </div>

      {/* Main Interactive Diagram + Active Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left/Center 8 cols: Annotated Creature Side-View Canvas */}
        <div className="lg:col-span-8 relative min-h-[440px] sm:min-h-[540px] rounded-2xl bg-[#06221F] border border-[#4DB48C]/30 overflow-hidden flex items-center justify-center p-6">
          {/* Subtle floodplain grid & water horizon */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 25%, rgba(77,180,140,0.35), transparent 70%)',
            }}
            aria-hidden="true"
          />

          {/* Creature Image Container */}
          <div className="relative w-full max-w-[620px] aspect-[1/1] flex items-center justify-center">
            <img
              src={imgSrc}
              onError={() => {
                if (imgSrc !== AISTUDIO_CUTOUT_FALLBACK) {
                  setImgSrc(AISTUDIO_CUTOUT_FALLBACK);
                }
              }}
              alt="Annotated side profile of Dreadnoughtus schrani showing anatomical regions"
              className="w-full h-full object-contain creature-graded select-none"
              referrerPolicy="no-referrer"
            />

            {/* SVG Layer: River-Network Connector Lines + Mandatory Dashed Skull & Neck Reconstruction Outlines */}
            <svg
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
            >
              {/* Mandatory dashed outline over skull and most of neck: "not preserved: reconstructed from relatives" */}
              {showPreservedOverlay && (
                <g>
                  {/* Dashed envelope tracing skull and cervical series */}
                  <path
                    d="M 65 4 C 73 2, 82 8, 89 22 C 95 36, 96 47, 90 54 C 84 49, 86 35, 80 21 C 75 11, 69 9, 64 8 Z"
                    fill="rgba(155, 221, 187, 0.08)"
                    stroke="#C6F5DB"
                    strokeWidth="0.45"
                    strokeDasharray="1.4 1.1"
                  />
                  {/* Callout line and label for dashed skull & neck */}
                  <path
                    d="M 73 12 C 62 12, 54 14, 44 14"
                    stroke="#C6F5DB"
                    strokeWidth="0.35"
                    strokeDasharray="1 0.8"
                    fill="none"
                  />
                  <rect
                    x="6"
                    y="10.2"
                    width="38"
                    height="6.8"
                    rx="1"
                    fill="#06221F"
                    fillOpacity="0.9"
                    stroke="#9BDDBB"
                    strokeWidth="0.25"
                    strokeDasharray="1 0.8"
                  />
                  <text
                    x="8"
                    y="13.2"
                    fill="#C6F5DB"
                    fontSize="2.1"
                    fontFamily="Marcellus, serif"
                  >
                    SKULL &amp; MOST OF NECK (DASHED):
                  </text>
                  <text
                    x="8"
                    y="15.7"
                    fill="#E1F1EA"
                    fontSize="1.95"
                    fontFamily="Jost, sans-serif"
                  >
                    not preserved: reconstructed from relatives
                  </text>
                </g>
              )}

              {/* Thin branching river-network connector lines from hotspot buttons to anatomical anchors */}
              {ANATOMY_HOTSPOTS.map((spot) => {
                const isSelected = selectedHotspot.id === spot.id;
                const midX = (spot.x + spot.anchorX) / 2;
                const midY = (spot.y + spot.anchorY) / 2 - 2.5;
                return (
                  <g key={spot.id}>
                    <path
                      d={`M ${spot.x} ${spot.y} Q ${midX} ${midY}, ${spot.anchorX} ${spot.anchorY}`}
                      stroke={isSelected ? '#C6F5DB' : '#4DB48C'}
                      strokeOpacity={isSelected ? '0.95' : '0.45'}
                      strokeWidth={isSelected ? '0.55' : '0.32'}
                      fill="none"
                    />
                    <circle
                      cx={spot.anchorX}
                      cy={spot.anchorY}
                      r={isSelected ? '1.1' : '0.65'}
                      fill={isSelected ? '#CFEFF0' : '#9BDDBB'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Hotspot Buttons positioned across the anatomy canvas */}
            {ANATOMY_HOTSPOTS.map((spot, index) => {
              const isSelected = selectedHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setSelectedHotspot(spot)}
                  aria-label={`Inspect anatomy hotspot ${index + 1}: ${spot.title}`}
                  aria-pressed={isSelected}
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full font-display text-[11px] flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6F5DB] ${
                    isSelected
                      ? 'bg-[#C6F5DB] text-[#06221F] font-semibold scale-115 shadow-[0_0_16px_rgba(198,245,219,0.85)]'
                      : 'bg-[#06221F]/90 text-[#F4FFF8] border border-[#9BDDBB]/60 hover:border-[#C6F5DB] hover:scale-105'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              );
            })}
          </div>

          {/* Bottom Dimension Scale Bar inside canvas */}
          <div className="absolute bottom-4 inset-x-6 flex flex-wrap items-center justify-between gap-2 text-[11px] font-display uppercase tracking-[0.14em] text-[#9BDDBB]/80 border-t border-[#4DB48C]/25 pt-2.5">
            <span>Tail: ~8.7 m (estimate)</span>
            <span>Torso &amp; Hips: ~5.1 m (estimate)</span>
            <span>Neck: ~11.3 m (estimate · mostly reconstructed)</span>
          </div>
        </div>

        {/* Right 4 cols: Selected Hotspot Scientific Dossier + Quick Hotspot Selector */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          <article
            aria-live="polite"
            className="p-6 sm:p-7 rounded-2xl bg-[#0C3E38]/65 border border-[#9BDDBB]/40 flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-display text-xs uppercase tracking-[0.16em] text-[#9BDDBB]">
                  {selectedHotspot.shortLabel}
                </span>
                <EpistemicTag type={selectedHotspot.badge} />
              </div>

              <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-2">
                {selectedHotspot.title}
              </h3>

              <div className="text-xs text-[#CFEFF0] font-light mb-4 pb-3 border-b border-[#4DB48C]/25">
                <strong className="uppercase tracking-[0.1em] font-display text-[#9BDDBB] mr-1.5">
                  Fossil Status:
                </strong>
                {selectedHotspot.preservedStatus}
              </div>

              <p className="text-sm sm:text-base text-[#E1F1EA]/90 font-light leading-relaxed">
                {selectedHotspot.description}
              </p>
            </div>

            {selectedHotspot.measurement && (
              <div className="mt-6 pt-4 border-t border-[#4DB48C]/25 flex items-center justify-between text-xs font-display uppercase tracking-[0.14em]">
                <span className="text-[#9BDDBB]">Key Metric</span>
                <span className="text-[#F4FFF8] tabular-nums">{selectedHotspot.measurement}</span>
              </div>
            )}
          </article>

          {/* Accessible Hotspot List */}
          <div className="p-4 rounded-2xl bg-[#06221F] border border-[#4DB48C]/25">
            <div className="text-xs font-display uppercase tracking-[0.16em] text-[#9BDDBB] mb-2.5 px-1">
              All 10 Anatomical Regions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
              {ANATOMY_HOTSPOTS.map((spot) => {
                const active = selectedHotspot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedHotspot(spot)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-display uppercase tracking-[0.08em] transition-colors cursor-pointer flex items-center justify-between ${
                      active
                        ? 'bg-[#17604F] text-[#F4FFF8]'
                        : 'text-[#E1F1EA]/75 hover:bg-[#0C3E38]/60 hover:text-[#F4FFF8]'
                    }`}
                  >
                    <span className="truncate">{spot.shortLabel}</span>
                    <span className="text-[10px] text-[#9BDDBB] ml-2 shrink-0">[{spot.badge}]</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
