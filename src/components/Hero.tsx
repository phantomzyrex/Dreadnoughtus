import React, { useEffect, useState } from 'react';
import { AISTUDIO_CUTOUT_FALLBACK, HERO_CUTOUT_PATH } from '../data/dreadnoughtusData';
import { calculateParallaxOffset } from '../utils/floodplainLogic';
import { Nav } from './Nav';

interface HeroProps {
  isLoaded: boolean;
  onOpenMenu: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const WORDMARK_LETTERS = 'DREADNOUGHTUS'.split('');

export const Hero: React.FC<HeroProps> = ({
  isLoaded,
  onOpenMenu,
  onNavigateSection,
}) => {
  const [imgSrc, setImgSrc] = useState(HERO_CUTOUT_PATH);
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });
  const [tremorActive, setTremorActive] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Two subtle ground tremors (1-2px screen shake, ~400ms each) as the giant settles
    const t1 = setTimeout(() => setTremorActive(true), 450);
    const t2 = setTimeout(() => setTremorActive(false), 860);
    const t3 = setTimeout(() => setTremorActive(true), 1150);
    const t4 = setTimeout(() => setTremorActive(false), 1560);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isLoaded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 768) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    setMouseNorm({ x: nx, y: ny });
  };

  // Mouse parallax offsets matching Section 5 specification:
  // wordmark +-12px, creature +-24px (opposite), light bands +-40px, mist +-50px, foreground silhouettes +-80px
  const wordmarkOffset = calculateParallaxOffset(mouseNorm.x, mouseNorm.y, 12, false);
  const creatureOffset = calculateParallaxOffset(mouseNorm.x, mouseNorm.y, 24, true);
  const lightOffset = calculateParallaxOffset(mouseNorm.x, mouseNorm.y, 40, false);
  const mistOffset = calculateParallaxOffset(mouseNorm.x, mouseNorm.y, 50, false);
  const foregroundOffset = calculateParallaxOffset(mouseNorm.x, mouseNorm.y, 80, true);

  return (
    <section
      id="hero"
      aria-label="Dreadnoughtus Hero — Floodplain Sanctuary"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[680px] p-2 sm:p-3.5 bg-[#08110F] select-none overflow-hidden"
    >
      {/* Full-viewport frame with ~24px rounded corners */}
      <div
        className={`relative w-full h-full rounded-[24px] overflow-hidden hero-floodplain-bg border border-[#4DB48C]/20 flex flex-col justify-between ${
          tremorActive ? 'animate-tremor' : ''
        }`}
      >
        {/* ============================================================
            LAYER 1: DIFFUSE OVERCAST LIGHT BANDS & CLOUD SHAFTS
           ============================================================ */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${lightOffset.x}px, ${lightOffset.y}px, 0)`,
          }}
          aria-hidden="true"
        >
          {/* Soft vertical light bands near top-left and top-right (reference design) */}
          <div
            className="absolute -top-16 left-[6%] w-48 sm:w-72 h-[70%] opacity-25"
            style={{
              background:
                'radial-gradient(ellipse 50% 60% at 50% 30%, rgba(155,221,187,0.75) 0%, rgba(77,180,140,0.18) 55%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />
          <div
            className="absolute -top-16 right-[6%] w-48 sm:w-72 h-[70%] opacity-25"
            style={{
              background:
                'radial-gradient(ellipse 50% 60% at 50% 30%, rgba(155,221,187,0.75) 0%, rgba(77,180,140,0.18) 55%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Wide overcast shafts where cloud thins */}
          <div
            className="absolute -top-24 left-[22%] w-56 h-[78%] animate-shaft-a"
            style={{
              background:
                'radial-gradient(ellipse 45% 65% at 50% 25%, rgba(225,241,234,0.42) 0%, rgba(155,221,187,0.1) 60%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />
          <div
            className="absolute -top-20 left-[44%] w-72 h-[75%] animate-shaft-b"
            style={{
              background:
                'radial-gradient(ellipse 48% 65% at 50% 25%, rgba(225,241,234,0.38) 0%, rgba(155,221,187,0.08) 60%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />
          <div
            className="absolute -top-24 right-[20%] w-56 h-[76%] animate-shaft-a"
            style={{
              background:
                'radial-gradient(ellipse 45% 65% at 50% 25%, rgba(225,241,234,0.36) 0%, rgba(77,180,140,0.08) 60%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* ============================================================
            LAYER 2: DISTANT LOW HORIZON TREELINE & FLOODPLAIN GROUND PLANE (Z-INDEX 4)
            Extends continuously to bottom-0 so there is zero horizontal seam.
           ============================================================ */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[56%] bottom-0 z-[4]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="floodplainGroundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0C3E38" stopOpacity="0.92" />
                <stop offset="35%" stopColor="#092E29" stopOpacity="0.96" />
                <stop offset="100%" stopColor="#06221F" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="braidedWaterGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#17604F" stopOpacity="0.12" />
                <stop offset="25%" stopColor="#3E5B5E" stopOpacity="0.38" />
                <stop offset="50%" stopColor="#9BDDBB" stopOpacity="0.28" />
                <stop offset="75%" stopColor="#3E5B5E" stopOpacity="0.36" />
                <stop offset="100%" stopColor="#17604F" stopOpacity="0.12" />
              </linearGradient>
              <linearGradient id="waterGlint" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#CFEFF0" stopOpacity="0" />
                <stop offset="50%" stopColor="#CFEFF0" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#CFEFF0" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Distant Araucaria / conifer & broad-crowned Nothofagus southern-beech treeline */}
            <path
              d="M0 400 L0 58
                 C35 46, 65 44, 95 56
                 L112 32 L128 56
                 C165 42, 205 40, 245 58
                 L262 28 L278 58
                 C325 48, 385 54, 450 66
                 C535 76, 620 80, 720 80
                 C820 80, 905 76, 990 66
                 C1055 54, 1115 48, 1162 58
                 L1178 28 L1195 58
                 C1235 40, 1275 42, 1312 56
                 L1328 32 L1345 56
                 C1375 44, 1405 46, 1440 58
                 L1440 400 Z"
              fill="url(#floodplainGroundGrad)"
            />

            {/* Soft horizon mist band blending treeline base into floodplain */}
            <ellipse cx="720" cy="84" rx="760" ry="26" fill="#E1F1EA" fillOpacity="0.11" />

            {/* Perspective Floodplain River Network & Oxbow Channels on the Ground Plane (behind legs) */}
            <path
              d="M -40 132 C 240 116, 520 148, 780 134 C 1040 120, 1260 142, 1480 128 L 1480 150 C 1240 164, 1020 140, 760 154 C 500 168, 220 136, -40 152 Z"
              fill="url(#braidedWaterGrad)"
            />
            <path
              d="M -60 205 C 210 180, 490 230, 790 206 C 1070 184, 1270 222, 1500 202 L 1500 242 C 1250 260, 1040 222, 760 244 C 460 266, 190 220, -60 240 Z"
              fill="url(#braidedWaterGrad)"
            />
            <path
              d="M -80 295 C 260 272, 580 312, 920 288 C 1160 272, 1340 298, 1520 286 L 1520 365 C 1310 378, 1120 348, 890 362 C 550 382, 230 346, -80 360 Z"
              fill="url(#braidedWaterGrad)"
            />

            {/* Subtle silver sky glints on the water surface */}
            <path d="M 120 140 Q 460 156, 820 140 T 1340 142" stroke="url(#waterGlint)" strokeWidth="1" />
            <path d="M 80 222 Q 450 248, 810 222 T 1380 226" stroke="url(#waterGlint)" strokeWidth="1.1" />
            <path d="M 140 325 Q 520 352, 880 322 T 1360 328" stroke="url(#waterGlint)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* ============================================================
            LAYER 3: GIGANTIC "DREADNOUGHTUS" WORDMARK (Z-INDEX 10)
           ============================================================ */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[48%] -translate-y-1/2 z-[10] flex flex-col items-center justify-center px-4"
          style={{
            transform: `translate3d(${wordmarkOffset.x}px, ${wordmarkOffset.y}px, 0)`,
          }}
        >
          {/* Desktop & Tablet single-line ~85% viewport width wordmark */}
          <h1
            aria-label="DREADNOUGHTUS"
            className="hidden md:flex items-center justify-between w-[85vw] max-w-[1340px] font-display uppercase text-[#F4FFF8] tracking-[-0.01em] leading-none select-none"
            style={{
              fontSize: 'clamp(3.5rem, 8.6vw, 8.8rem)',
              textShadow: '0 0 28px rgba(198, 245, 219, 0.25), 0 4px 24px rgba(6, 34, 31, 0.45)',
            }}
          >
            {WORDMARK_LETTERS.map((char, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                <span
                  className="inline-block transition-transform duration-700 ease-out"
                  style={{
                    transform: isLoaded ? 'translateY(0%)' : 'translateY(110%)',
                    transitionDelay: `${idx * 45}ms`,
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>

          {/* Mobile (<768px) two-line wordmark: DREAD / NOUGHTUS at ~15vw */}
          <div
            aria-hidden="true"
            className="flex md:hidden flex-col items-center justify-center font-display uppercase text-[#F4FFF8] tracking-[-0.01em] leading-[0.94] text-center"
            style={{
              fontSize: '14.5vw',
              textShadow: '0 0 24px rgba(198, 245, 219, 0.25)',
            }}
          >
            <span>DREAD</span>
            <span>NOUGHTUS</span>
          </div>

          {/* Tagline under the wordmark (--bone at 70% opacity), placed cleanly under the left/open half of the wordmark */}
          <div className="w-[85vw] max-w-[1340px] mt-4 md:mt-5 flex justify-center md:justify-start md:pl-[2vw]">
            <p
              className="font-display text-xs sm:text-sm md:text-[15px] uppercase tracking-[0.28em] text-[#F4FFF8]/75"
              style={{
                textShadow: '0 2px 10px rgba(6, 34, 31, 0.95)',
              }}
            >
              The Giant That Fears Nothing
            </p>
          </div>
        </div>

        {/* ============================================================
            LAYER 4: TRANSPARENT DREADNOUGHTUS SUBJECT IN FRONT OF WORDMARK (Z-INDEX 15)
            Positioned so the neck & forequarters overlap the middle 4 letters (N-O-U-G)
            while DREAD (first 5 letters) and HTUS (last 4 letters) remain fully visible,
            and the head sits cleanly below the top MENU label.
           ============================================================ */}
        <div
          className="pointer-events-none absolute inset-0 z-[15] flex items-end justify-center overflow-hidden"
          style={{
            transform: `translate3d(${creatureOffset.x}px, ${creatureOffset.y}px, 0)`,
          }}
        >
          <div
            className={`relative h-[78%] sm:h-[82%] md:h-[85%] w-auto flex items-end justify-center transition-all duration-1000 ease-out ${
              isLoaded
                ? 'opacity-100 scale-100 translate-x-0'
                : 'opacity-0 scale-[1.08] translate-x-12'
            }`}
            style={{
              marginRight: '23vw',
              marginBottom: '-1.5vh',
            }}
          >
            <div className="relative h-full flex items-end justify-center animate-creature-idle">
              <img
                src={imgSrc}
                onError={() => {
                  if (imgSrc !== AISTUDIO_CUTOUT_FALLBACK) {
                    setImgSrc(AISTUDIO_CUTOUT_FALLBACK);
                  }
                }}
                alt="Dreadnoughtus schrani wading across the Late Cretaceous Cerro Fortaleza floodplain in overcast drizzle"
                className="h-full w-auto max-w-none object-contain creature-graded"
                referrerPolicy="no-referrer"
              />

              {/* Fine rim-lit water droplets along neck and dorsal ridge */}
              <svg
                viewBox="0 0 500 500"
                className="pointer-events-none absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <circle cx="355" cy="32" r="1.4" fill="#CFEFF0" fillOpacity="0.85" />
                <circle cx="385" cy="58" r="1.2" fill="#C6F5DB" fillOpacity="0.8" />
                <circle cx="422" cy="112" r="1.5" fill="#CFEFF0" fillOpacity="0.75" />
                <circle cx="445" cy="175" r="1.3" fill="#C6F5DB" fillOpacity="0.8" />
                <circle cx="442" cy="245" r="1.4" fill="#CFEFF0" fillOpacity="0.75" />
                <circle cx="360" cy="295" r="1.5" fill="#C6F5DB" fillOpacity="0.8" />
                <circle cx="320" cy="318" r="1.3" fill="#CFEFF0" fillOpacity="0.75" />
                <circle cx="270" cy="340" r="1.2" fill="#C6F5DB" fillOpacity="0.7" />
              </svg>
            </div>
          </div>
        </div>

        {/* ============================================================
            LAYER 5: SUBTLE WATERLINE SUBMERGENCE, ANKLE RIPPLES & GROUND MIST (Z-INDEX 18)
            Restricted to the bottom ankle zone so no bands cross the dinosaur's thighs.
           ============================================================ */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] z-[18] overflow-hidden"
          aria-hidden="true"
        >
          {/* Smooth bottom ground-haze gradient dissolving the ankles into the river */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(12, 62, 56, 0.45) 50%, rgba(6, 34, 31, 0.95) 100%)',
            }}
          />

          {/* Delicate waterline ripples right where the ankles meet the river surface */}
          <svg
            viewBox="0 0 1440 140"
            fill="none"
            preserveAspectRatio="none"
            className="relative w-full h-full"
          >
            {[
              { cx: 515, cy: 96 },
              { cx: 590, cy: 100 },
              { cx: 675, cy: 102 },
              { cx: 742, cy: 94 },
            ].map((foot, idx) => (
              <g key={idx}>
                <ellipse
                  cx={foot.cx}
                  cy={foot.cy}
                  rx="24"
                  ry="3"
                  stroke="#C6F5DB"
                  strokeOpacity="0.32"
                  strokeWidth="0.85"
                />
                <ellipse
                  cx={foot.cx}
                  cy={foot.cy}
                  rx="42"
                  ry="5.5"
                  stroke="#9BDDBB"
                  strokeOpacity="0.16"
                  strokeWidth="0.7"
                  strokeDasharray="6 6"
                />
              </g>
            ))}
          </svg>

          {/* Soft drifting low-lying mist bank */}
          <div
            className="absolute inset-x-0 bottom-2 h-16 opacity-16 animate-mist-a"
            style={{
              background:
                'radial-gradient(ellipse 55% 45% at 32% 60%, #E1F1EA 0%, transparent 75%), radial-gradient(ellipse 50% 45% at 72% 60%, #E1F1EA 0%, transparent 75%)',
              transform: `translate3d(${mistOffset.x}px, 0, 0)`,
            }}
          />
        </div>

        {/* ============================================================
            LAYER 6: FALLING FOLIAGE SILHOUETTES NEAR EDGES (Z-INDEX 21)
           ============================================================ */}
        <div className="pointer-events-none absolute inset-0 z-[21] overflow-hidden" aria-hidden="true">
          {[
            { left: '6%', delay: '0s', duration: '17s', scale: 0.9 },
            { left: '14%', delay: '4s', duration: '21s', scale: 0.75 },
            { left: '22%', delay: '9s', duration: '19s', scale: 0.8 },
            { left: '78%', delay: '2s', duration: '18s', scale: 0.85 },
            { left: '87%', delay: '7s', duration: '22s', scale: 0.7 },
            { left: '93%', delay: '11s', duration: '16s', scale: 0.95 },
          ].map((leaf, i) => (
            <div
              key={i}
              className="absolute -top-8"
              style={{
                left: leaf.left,
                animation: `leafFall ${leaf.duration} linear ${leaf.delay} infinite`,
              }}
            >
              {/* Southern-beech (Nothofagus) serrated leaf or fern pinnule silhouette */}
              <svg
                width={18 * leaf.scale}
                height={14 * leaf.scale}
                viewBox="0 0 24 18"
                fill="#06221F"
                className="opacity-65"
              >
                <path d="M2 9 C6 3, 14 2, 22 9 C14 16, 6 15, 2 9 Z" />
              </svg>
            </div>
          ))}
        </div>

        {/* ============================================================
            LAYER 7: FOREGROUND SILHOUETTES (LEFT & RIGHT EDGES, Z-INDEX 24)
            Dark tree trunks hung with moss, tree ferns and fern fronds in --floor (#06221F)
           ============================================================ */}
        <div
          className="pointer-events-none absolute inset-0 z-[24] overflow-hidden transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${foregroundOffset.x}px, ${foregroundOffset.y}px, 0)`,
          }}
          aria-hidden="true"
        >
          {/* Left Foreground Trunk, Hanging Moss & Tree Fern Fronds */}
          <svg
            viewBox="0 0 260 900"
            fill="none"
            preserveAspectRatio="none"
            className="absolute left-0 top-0 h-full w-28 sm:w-44 md:w-56 blur-[1.5px] opacity-95"
          >
            {/* Outer conifer trunk */}
            <path d="M-20 0 L52 0 L68 900 L-20 900 Z" fill="#06221F" />
            {/* High branch with hanging moss strands */}
            <path
              d="M45 140 C 110 155, 165 148, 225 170 L 220 182 C 160 168, 105 175, 48 168 Z"
              fill="#06221F"
            />
            <path d="M95 168 Q 92 215, 98 245" stroke="#06221F" strokeWidth="3" />
            <path d="M135 168 Q 130 225, 136 260" stroke="#06221F" strokeWidth="2.5" />
            <path d="M175 172 Q 172 210, 176 235" stroke="#06221F" strokeWidth="2" />
            {/* Lower tree-fern fronds arching inward */}
            <path
              d="M40 660 C 95 610, 165 595, 240 620 C 175 625, 110 645, 52 695 Z"
              fill="#06221F"
            />
            <path
              d="M45 735 C 110 690, 185 685, 255 715 C 185 715, 120 735, 55 775 Z"
              fill="#06221F"
            />
            <path
              d="M50 810 C 115 775, 175 780, 235 815 C 170 810, 115 825, 60 855 Z"
              fill="#06221F"
            />
          </svg>

          {/* Right Foreground Trunk, Moss & Fern Fronds */}
          <svg
            viewBox="0 0 260 900"
            fill="none"
            preserveAspectRatio="none"
            className="absolute right-0 top-0 h-full w-28 sm:w-44 md:w-56 blur-[1.5px] opacity-95"
          >
            <path d="M280 0 L208 0 L192 900 L280 900 Z" fill="#06221F" />
            {/* Upper branch with moss */}
            <path
              d="M215 180 C 150 195, 95 190, 35 212 L 40 224 C 100 208, 155 215, 212 208 Z"
              fill="#06221F"
            />
            <path d="M165 208 Q 168 255, 162 285" stroke="#06221F" strokeWidth="3" />
            <path d="M120 206 Q 124 260, 118 292" stroke="#06221F" strokeWidth="2.5" />
            {/* Lower fern fronds */}
            <path
              d="M220 680 C 165 630, 95 615, 20 640 C 85 645, 150 665, 208 715 Z"
              fill="#06221F"
            />
            <path
              d="M215 755 C 150 710, 75 705, 5 735 C 75 735, 140 755, 205 795 Z"
              fill="#06221F"
            />
          </svg>
        </div>

        {/* ============================================================
            LAYER 8: TOP 3-PART NAVIGATION & BOTTOM SCROLL HINT (Z-INDEX 30)
           ============================================================ */}
        <Nav onOpenMenu={onOpenMenu} onNavigateSection={onNavigateSection} />

        {/* Bottom centre "SCROLL TO FOLLOW THE RIVER" hint */}
        <div className="relative z-30 pb-5 sm:pb-6 flex flex-col items-center justify-center">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('overview');
            }}
            className="group flex flex-col items-center gap-2 text-[#F4FFF8]/80 hover:text-[#C6F5DB] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6F5DB]"
          >
            <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-[0.26em]">
              SCROLL TO FOLLOW THE RIVER
            </span>
            <span className="block w-[1px] h-6 bg-gradient-to-b from-[#C6F5DB] to-transparent group-hover:h-8 transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};
