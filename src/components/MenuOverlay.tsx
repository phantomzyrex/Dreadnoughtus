import React, { useEffect, useState } from 'react';
import { AISTUDIO_CUTOUT_FALLBACK, HERO_CUTOUT_PATH } from '../data/dreadnoughtusData';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
}

const CHAPTER_LINKS = [
  { num: '01', id: 'hero', label: 'Floodplain Sanctuary (Hero)' },
  { num: '02', id: 'overview', label: 'Overview — The One That Fears Nothing' },
  { num: '03', id: 'discovery', label: 'Discovery & History (2005–Today)' },
  { num: '04', id: 'anatomy', label: 'Interactive Anatomy & Osteology' },
  { num: '05', id: 'size-comparison', label: 'Size Comparison & The Mass Debate' },
  { num: '06', id: 'diet-life', label: 'Diet, Histology & Scavenging' },
  { num: '07', id: 'habitat', label: 'Habitat, Floodplain Burial & Map' },
  { num: '08', id: 'classification', label: 'Classification & Skeletal Completeness' },
  { num: '09', id: 'evolution', label: 'Evolution & End-Cretaceous Extinction' },
  { num: '10', id: 'myth-reality', label: 'Myth vs. Reality' },
  { num: '11', id: 'gallery', label: 'Archival & Paleoart Gallery' },
  { num: '12', id: 'fast-facts', label: 'Fast Facts & Scientific Sources' },
  { num: '13', id: 'contact', label: 'Contact & Colophon' },
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  onSelectSection,
}) => {
  const [imgSrc, setImgSrc] = useState(HERO_CUTOUT_PATH);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Monograph Chapter Navigation"
      className="fixed inset-0 z-50 bg-[#06201C] text-[#F4FFF8] overflow-y-auto transition-opacity duration-300"
    >
      {/* Branching levee-break channel lines spreading from top-centre MENU */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none fixed inset-0 w-full h-full opacity-25"
        aria-hidden="true"
      >
        <path
          d="M720 0 C 710 140, 560 240, 380 420 C 210 590, 140 740, 40 900"
          stroke="#4DB48C"
          strokeWidth="1.5"
        />
        <path
          d="M720 0 C 740 160, 890 260, 1060 450 C 1220 620, 1310 760, 1400 900"
          stroke="#4DB48C"
          strokeWidth="1.5"
        />
        <path
          d="M720 0 C 720 220, 680 460, 730 900"
          stroke="#9BDDBB"
          strokeWidth="1"
        />
        <path
          d="M540 260 C 610 390, 590 540, 460 790"
          stroke="#9BDDBB"
          strokeWidth="0.85"
        />
        <path
          d="M900 270 C 830 410, 860 590, 990 830"
          stroke="#9BDDBB"
          strokeWidth="0.85"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-6 sm:py-8 min-h-screen flex flex-col justify-between">
        {/* Top bar with CLOSE button */}
        <div className="flex items-center justify-between border-b border-[#4DB48C]/25 pb-5">
          <span className="font-display text-sm uppercase tracking-[0.12em] text-[#9BDDBB]">
            DREADNOUGHTUS · FLOODPLAIN INDEX
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chapter navigation menu"
            className="group flex flex-col items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6F5DB]"
          >
            <span className="block h-[1px] w-16 bg-[#F4FFF8] mb-1.5 transition-all duration-300 group-hover:w-24 group-hover:bg-[#C6F5DB]" />
            <span className="font-display text-sm uppercase tracking-[0.12em] text-[#F4FFF8] group-hover:text-[#C6F5DB]">
              CLOSE
            </span>
          </button>

          <span className="font-display text-xs uppercase tracking-[0.16em] text-[#E1F1EA]/60 hidden sm:inline">
            ESC TO RETURN
          </span>
        </div>

        {/* Main Grid: Numbered Links + Small Creature Cutout Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 items-center">
          <nav
            aria-label="Monograph sections"
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3"
          >
            {CHAPTER_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectSection(item.id);
                  onClose();
                }}
                className="group flex items-baseline gap-4 py-2.5 px-3 border-b border-[#17604F]/50 hover:border-[#9BDDBB] transition-colors"
              >
                <span className="font-display text-xs tracking-[0.16em] text-[#4DB48C] group-hover:text-[#C6F5DB] tabular-nums">
                  {item.num}
                </span>
                <span className="font-display text-base sm:text-lg uppercase tracking-[0.04em] text-[#F4FFF8] group-hover:text-[#C6F5DB] transition-transform duration-200 group-hover:translate-x-1.5">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Small graded creature figure card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl border border-[#4DB48C]/25 bg-[#0C3E38]/40">
            <div className="relative w-48 h-56 flex items-center justify-center">
              <img
                src={imgSrc}
                onError={() => {
                  if (imgSrc !== AISTUDIO_CUTOUT_FALLBACK) {
                    setImgSrc(AISTUDIO_CUTOUT_FALLBACK);
                  }
                }}
                alt="Dreadnoughtus schrani floodplain silhouette"
                className="max-h-full max-w-full object-contain creature-graded"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-3 font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB] text-center">
              Holotype MPM-PV 1156 · Cerro Fortaleza
            </p>
            <p className="mt-1 text-xs text-[#E1F1EA]/70 text-center font-light">
              Scroll downstream from overcast low water into the crevasse-splay flood.
            </p>
          </div>
        </div>

        {/* Bottom footnote */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#4DB48C]/20 text-xs text-[#E1F1EA]/65">
          <span>Museo Padre Molina · Río Gallegos, Santa Cruz Province, Argentina</span>
          <span>52°S Late Cretaceous Temperate Floodplain Network</span>
        </div>
      </div>
    </div>
  );
};
