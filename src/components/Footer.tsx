import React from 'react';
import { ACADEMIC_SOURCES, FAST_FACTS } from '../data/dreadnoughtusData';
import { RiverDivider } from './RiverDivider';

interface FooterProps {
  onBackToRiverbank: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToRiverbank }) => {
  return (
    <>
      {/* ============================================================
          12. FAST FACTS AND SOURCES
         ============================================================ */}
      <section
        id="fast-facts"
        aria-label="Fast Facts and Scientific Bibliography"
        className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
      >
        <RiverDivider
          sectionNumber="12"
          kicker="Synthesis & Primary Literature"
          title="Fast Facts and Sources"
          subtitle="Eight verified paleontological takeaways and the peer-reviewed literature supporting this monograph."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 6 Cols: 8 "Did You Know" Fast Facts */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0C3E38]/55 border border-[#4DB48C]/30">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.06em] text-[#F4FFF8] mb-6">
              Eight “Did You Know?” Facts
            </h3>
            <ol className="space-y-4">
              {FAST_FACTS.map((fact, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 pb-4 border-b border-[#4DB48C]/20 last:border-none last:pb-0"
                >
                  <span className="font-display text-sm text-[#9BDDBB] tabular-nums shrink-0 mt-0.5">
                    ({idx + 1})
                  </span>
                  <p className="text-sm sm:text-base text-[#E1F1EA]/90 font-light leading-relaxed">
                    {fact}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right 6 Cols: Peer-Reviewed Bibliography & Institutional Repositories */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/30">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.06em] text-[#F4FFF8] mb-6">
              Scientific Literature &amp; Museum Archives
            </h3>
            <ul className="space-y-3 max-h-[540px] overflow-y-auto pr-2">
              {ACADEMIC_SOURCES.map((source, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-[#E1F1EA]/80 font-light leading-relaxed pb-3 border-b border-[#17604F]/40 last:border-none"
                >
                  {source}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================
          13. CONTACT AND FOOTER
         ============================================================ */}
      <footer
        id="contact"
        aria-label="Contact and Colophon"
        className="relative z-10 pt-20 pb-14 px-6 sm:px-10 border-t border-[#4DB48C]/25 bg-[#06221F]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-[#4DB48C]/20">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.22em] text-[#9BDDBB] mb-3">
                13 · Paleontological Editorial Inquiry &amp; Colophon
              </div>
              <h2
                className="font-display uppercase tracking-[0.02em] text-[#F4FFF8] leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
              >
                LET’S TALK
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#E1F1EA]/80 font-light max-w-xl">
                For museum exhibition licensing, 3D osteological scan inquiries, or editorial
                commissions regarding the Cerro Fortaleza floodplain reconstruction.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <a
                  href="mailto:curator@dreadnoughtus-monograph.org"
                  className="font-display text-sm sm:text-base uppercase tracking-[0.12em] text-[#C6F5DB] underline decoration-[#4DB48C] underline-offset-4 hover:text-[#F4FFF8] transition-colors"
                >
                  curator@dreadnoughtus-monograph.org
                </a>
                <span aria-hidden="true" className="text-[#4DB48C]">·</span>
                <a
                  href="#overview"
                  className="font-display text-xs uppercase tracking-[0.16em] text-[#E1F1EA]/80 hover:text-[#C6F5DB]"
                >
                  Museo Padre Molina Archive
                </a>
                <span aria-hidden="true" className="text-[#4DB48C]">·</span>
                <a
                  href="#classification"
                  className="font-display text-xs uppercase tracking-[0.16em] text-[#E1F1EA]/80 hover:text-[#C6F5DB]"
                >
                  3D MorphoSource Files
                </a>
              </div>
            </div>

            {/* "Back to the riverbank" button that scrolls to top & resets water gauge to LOW WATER */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={onBackToRiverbank}
                className="group px-6 py-4 rounded-xl bg-[#0C3E38] border border-[#9BDDBB]/50 hover:border-[#C6F5DB] hover:bg-[#17604F] transition-all cursor-pointer flex items-center gap-3"
              >
                <span className="font-display text-xs sm:text-sm uppercase tracking-[0.16em] text-[#F4FFF8]">
                  Back to the riverbank
                </span>
                <span
                  aria-hidden="true"
                  className="text-[#C6F5DB] transition-transform duration-200 group-hover:-translate-y-1"
                >
                  ↑
                </span>
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#E1F1EA]/65 font-display uppercase tracking-[0.14em]">
            <span>© 2026 Dreadnoughtus Floodplain Monograph</span>
            <span>Temperate Humid Floodplain Network · 52°S Southern Patagonia</span>
          </div>
        </div>
      </footer>
    </>
  );
};
