import React, { useRef, useState } from 'react';
import {
  AISTUDIO_CUTOUT_FALLBACK,
  GALLERY_PLATES,
  GalleryPlate,
  HERO_CUTOUT_PATH,
} from '../data/dreadnoughtusData';
import { EpistemicTag, RiverDivider } from './RiverDivider';

export const Gallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [cutoutSrc, setCutoutSrc] = useState(HERO_CUTOUT_PATH);
  const [lightboxPlate, setLightboxPlate] = useState<GalleryPlate | null>(null);

  const scrollByAmount = (delta: number) => {
    scrollContainerRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const renderLabeledFloodplainPlate = (plate: GalleryPlate) => {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#17604F] via-[#0C3E38] to-[#06221F] flex flex-col justify-between p-5 overflow-hidden">
        {/* Top Plate Header & Placeholder Path Notice */}
        <div className="relative z-10 flex items-center justify-between gap-2 text-[10px] font-display uppercase tracking-[0.16em] text-[#C6F5DB]/90 border-b border-[#4DB48C]/30 pb-2">
          <span>{plate.plateNumber}</span>
          <span className="truncate">{plate.fallbackLabel}</span>
        </div>

        {/* Center Bespoke Scientific SVG Plate Visual */}
        <div className="relative z-10 my-auto py-4 flex items-center justify-center">
          {plate.svgSceneType === 'wading' && (
            <img
              src={cutoutSrc}
              onError={() => {
                if (cutoutSrc !== AISTUDIO_CUTOUT_FALLBACK) {
                  setCutoutSrc(AISTUDIO_CUTOUT_FALLBACK);
                }
              }}
              alt={plate.title}
              className="h-44 w-auto object-contain creature-graded"
              referrerPolicy="no-referrer"
            />
          )}

          {plate.svgSceneType === 'scapula' && (
            <svg viewBox="0 0 320 140" className="w-full h-40" fill="none">
              <path
                d="M 35 75 C 65 42, 115 48, 175 56 C 225 62, 265 48, 290 52 C 296 68, 292 92, 275 96 C 220 88, 150 85, 95 98 C 60 106, 38 95, 35 75 Z"
                fill="#4DB48C"
                fillOpacity="0.35"
                stroke="#C6F5DB"
                strokeWidth="1.5"
              />
              <line x1="35" y1="122" x2="292" y2="122" stroke="#9BDDBB" strokeWidth="1" />
              <text x="163" y="135" textAnchor="middle" fill="#CFEFF0" fontSize="10" fontFamily="Marcellus">
                LEFT SCAPULA · 1.74 m (LONGEST KNOWN IN ANY TITANOSAUR)
              </text>
            </svg>
          )}

          {plate.svgSceneType === 'vertebrae' && (
            <svg viewBox="0 0 320 140" className="w-full h-40" fill="none">
              {[45, 95, 145, 195, 245].map((x, i) => (
                <g key={x}>
                  <rect
                    x={x}
                    y={58}
                    width="36"
                    height="28"
                    rx="4"
                    fill="#2A8A68"
                    stroke="#C6F5DB"
                    strokeWidth="1.2"
                  />
                  {/* Neural spine with pneumatic cavity */}
                  <path
                    d={`M ${x + 10} 58 L ${x + 18} ${24 + i * 3} L ${x + 28} 58`}
                    fill="#17604F"
                    stroke="#9BDDBB"
                  />
                  <ellipse
                    cx={x + 18}
                    cy={46}
                    rx="5"
                    ry="3"
                    fill="#06221F"
                    stroke="#CFEFF0"
                    strokeWidth="0.8"
                  />
                  {/* Expanded V-shaped chevron below */}
                  <path d={`M ${x + 12} 86 L ${x + 18} 112 L ${x + 24} 86`} stroke="#9BDDBB" strokeWidth="1.5" />
                </g>
              ))}
              <text x="160" y="132" textAnchor="middle" fill="#CFEFF0" fontSize="9.5" fontFamily="Marcellus">
                ARTICULATED ANTERIOR CAUDALS · PNEUMATIC FOSSAE &amp; CHEVRONS
              </text>
            </svg>
          )}

          {plate.svgSceneType === 'floodplain' && (
            <svg viewBox="0 0 320 140" className="w-full h-40" fill="none">
              <path d="M 0 35 Q 80 20, 160 40 T 320 30" stroke="#9BDDBB" strokeWidth="1.5" />
              <path d="M 40 32 C 110 75, 210 85, 290 55" stroke="#CFEFF0" strokeWidth="1.2" />
              <path d="M 90 60 C 145 105, 225 110, 280 88" stroke="#4DB48C" strokeWidth="1" />
              <text x="160" y="128" textAnchor="middle" fill="#CFEFF0" fontSize="9.5" fontFamily="Marcellus">
                AVULSION CREVASSE-SPLAY CHANNEL NETWORK (460 m SANDSTONE)
              </text>
            </svg>
          )}

          {plate.svgSceneType === 'excavation' && (
            <svg viewBox="0 0 320 140" className="w-full h-40" fill="none">
              <rect x="25" y="20" width="270" height="90" rx="6" stroke="#4DB48C" strokeDasharray="4 4" />
              <circle cx="95" cy="62" r="18" fill="#2A8A68" fillOpacity="0.4" stroke="#C6F5DB" />
              <circle cx="165" cy="58" r="24" fill="#4DB48C" fillOpacity="0.4" stroke="#CFEFF0" />
              <circle cx="225" cy="70" r="14" fill="#17604F" stroke="#9BDDBB" />
              <text x="160" y="128" textAnchor="middle" fill="#CFEFF0" fontSize="9.5" fontFamily="Marcellus">
                RÍO LA LEONA QUARRY MAP · MPM-PV 1156 &amp; MPM-PV 3546
              </text>
            </svg>
          )}

          {plate.svgSceneType === 'histology' && (
            <svg viewBox="0 0 320 140" className="w-full h-40" fill="none">
              <circle cx="110" cy="65" r="42" fill="#0C3E38" stroke="#C6F5DB" strokeWidth="1.5" />
              <circle cx="110" cy="65" r="28" fill="#17604F" stroke="#4DB48C" strokeDasharray="3 2" />
              <path d="M 185 45 L 285 45 M 185 65 L 275 65 M 185 85 L 265 85" stroke="#9BDDBB" strokeWidth="2" />
              <text x="160" y="128" textAnchor="middle" fill="#CFEFF0" fontSize="9.5" fontFamily="Marcellus">
                FIBROLAMELLAR HUMERUS TISSUE &amp; 2022 COLLAGEN I PEPTIDES
              </text>
            </svg>
          )}
        </div>

        {/* Bottom File Drop Note */}
        <div className="relative z-10 text-[10px] text-[#9BDDBB]/80 font-display uppercase tracking-[0.12em] flex items-center justify-between">
          <span>Archival Plate Placeholder</span>
          <span>Click to Enlarge</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="gallery"
      aria-label="Floodplain Paleoart and Osteological Gallery"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="11"
        kicker="Visual Plates & Osteological Figures"
        title="Archival & Floodplain Gallery"
        subtitle="Colours are artistic; the real skin colour is unknown. Select any plate to open the full-screen museum lightbox."
      />

      {/* Gallery Controls & Artistic Colour Disclaimer */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-xs sm:text-sm text-[#9BDDBB] font-display uppercase tracking-[0.12em]">
          Note: Colours are artistic; the real skin colour is unknown. Drop custom files at{' '}
          <code className="text-[#F4FFF8]">/public/assets/gallery-01.jpg ... gallery-06.jpg</code>.
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(-380)}
            aria-label="Scroll gallery left"
            className="px-3.5 py-2 rounded-lg bg-[#06221F] border border-[#4DB48C]/35 text-xs font-display uppercase tracking-[0.12em] text-[#F4FFF8] hover:border-[#C6F5DB] cursor-pointer"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(380)}
            aria-label="Scroll gallery right"
            className="px-3.5 py-2 rounded-lg bg-[#06221F] border border-[#4DB48C]/35 text-xs font-display uppercase tracking-[0.12em] text-[#F4FFF8] hover:border-[#C6F5DB] cursor-pointer"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Horizontal Drag/Scroll Gallery Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
      >
        {GALLERY_PLATES.map((plate) => {
          return (
            <article
              key={plate.id}
              className="snap-start shrink-0 w-[310px] sm:w-[380px] rounded-2xl bg-[#06221F] border border-[#4DB48C]/30 overflow-hidden flex flex-col justify-between group hover:border-[#C6F5DB] transition-colors"
            >
              <button
                type="button"
                onClick={() => setLightboxPlate(plate)}
                aria-label={`Open lightbox for ${plate.plateNumber}: ${plate.title}`}
                className="relative h-60 w-full overflow-hidden text-left cursor-pointer block"
              >
                {renderLabeledFloodplainPlate(plate)}
              </button>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-display text-xs uppercase tracking-[0.16em] text-[#9BDDBB]">
                      {plate.plateNumber}
                    </span>
                    <EpistemicTag type={plate.badge} />
                  </div>
                  <h3 className="font-display text-lg uppercase tracking-[0.04em] text-[#F4FFF8] mb-2">
                    {plate.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E1F1EA]/80 font-light leading-relaxed">
                    {plate.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#4DB48C]/20 flex items-center justify-between text-[11px] font-display uppercase tracking-[0.14em] text-[#C6F5DB]">
                  <span>Celadon–Spruce Floodplain Grade</span>
                  <button
                    type="button"
                    onClick={() => setLightboxPlate(plate)}
                    className="underline hover:text-[#F4FFF8] cursor-pointer"
                  >
                    Inspect Plate
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxPlate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxPlate.plateNumber}: ${lightboxPlate.title}`}
          className="fixed inset-0 z-50 bg-[#06221F]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxPlate(null)}
        >
          <div
            className="max-w-3xl w-full rounded-2xl bg-[#08110F] border border-[#9BDDBB]/50 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#4DB48C]/25">
              <div className="flex items-center gap-3">
                <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
                  {lightboxPlate.plateNumber}
                </span>
                <EpistemicTag type={lightboxPlate.badge} />
              </div>
              <button
                type="button"
                onClick={() => setLightboxPlate(null)}
                aria-label="Close lightbox"
                className="px-3 py-1 rounded bg-[#0C3E38] text-xs font-display uppercase tracking-[0.14em] text-[#F4FFF8] hover:bg-[#17604F] cursor-pointer"
              >
                Close [Esc]
              </button>
            </div>

            <div className="h-72 sm:h-96 w-full">
              {renderLabeledFloodplainPlate(lightboxPlate)}
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-2">
                {lightboxPlate.title}
              </h3>
              <p className="text-sm sm:text-base text-[#E1F1EA]/90 font-light leading-relaxed">
                {lightboxPlate.caption}
              </p>
              <p className="mt-3 text-xs text-[#9BDDBB]/80 font-display uppercase tracking-[0.14em]">
                Colours are artistic; the real skin colour is unknown.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
