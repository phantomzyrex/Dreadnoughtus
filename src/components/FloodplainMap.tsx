import React, { useState } from 'react';
import { CERRO_FORTALEZA_FAUNA } from '../data/dreadnoughtusData';
import { BurialAnimation } from './BurialAnimation';
import { EpistemicTag, RiverDivider } from './RiverDivider';

interface MapSite {
  id: string;
  name: string;
  subtitle: string;
  cx: number;
  cy: number;
  description: string;
}

const PATAGONIA_SITES: MapSite[] = [
  {
    id: 'rio-la-leona',
    name: 'East Bank of the Río La Leona (Dig Site)',
    subtitle: 'Cerro Fortaleza Formation · Santa Cruz Province',
    cx: 138,
    cy: 258,
    description:
      'Type locality where Kenneth Lacovara discovered Dreadnoughtus schrani in 2005 (~1,200 km south of the classic northern Patagonian dinosaur sites).',
  },
  {
    id: 'cerros-los-hornos',
    name: 'Cerros Los Hornos (near Lake Viedma)',
    subtitle: 'Puertasaurus & Orkoraptor Locality',
    cx: 122,
    cy: 244,
    description:
      'Nearby outcrop of the Cerro Fortaleza Formation yielding the giant titanosaur Puertasaurus reuili and the megaraptoran theropod Orkoraptor burkei.',
  },
  {
    id: 'rio-gallegos',
    name: 'Río Gallegos — Museo Padre Molina',
    subtitle: 'Permanent Fossil Repository',
    cx: 162,
    cy: 288,
    description:
      'Capital of Santa Cruz Province where the physical fossils of Dreadnoughtus schrani returned permanently in March 2015.',
  },
];

export const FloodplainMap: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<MapSite>(PATAGONIA_SITES[0]);
  const [showLateCretaceousBridge, setShowLateCretaceousBridge] = useState(false);

  return (
    <section
      id="habitat"
      aria-label="Habitat, Paleoenvironment, and Geographic Distribution"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="07"
        kicker="Sedimentology & Paleoecology"
        title="A Wet, Low-Lying Floodplain Network"
        subtitle="Cerro Fortaleza Formation (Austral Basin, ~52°S Paleolatitude) · Temperate Conifer & Southern-Beech Forests"
      />

      {/* Geological & Paleobotanical Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0C3E38]/55 border border-[#4DB48C]/25">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
              Fluvial Avulsion &amp; Crevasse Splay
            </span>
            <EpistemicTag type="inferred" />
          </div>
          <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-3">
            460 Metres of River-Deposited Sandstone
          </h3>
          <p className="text-sm sm:text-base text-[#E1F1EA]/90 font-light leading-relaxed">
            The skeletons come from the Cerro Fortaleza Formation (Austral Basin, southern
            Patagonia), about 460 m of river-deposited sandstone. At the time its paleolatitude was
            about 52° south—a high southern latitude consistent with a temperate climate (inferred).
            Both skeletons seem to have been buried quickly when a river bank broke, a levee break
            (avulsion), which sent a flood across the plain and laid down a liquefied fan of
            sediment (a crevasse splay) over the animals. That rapid, deep burial explains the
            skeleton’s exceptional completeness. Rivers that shift their courses like this build a
            floodplain network of channels, levees, pools and flood basins.
          </p>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/25">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
              Austral-Antarctic Paleobotany
            </span>
            <EpistemicTag type="inferred" />
          </div>
          <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-3">
            Conifers, Ferns &amp; Southern-Beech Forests
          </h3>
          <p className="text-sm sm:text-base text-[#E1F1EA]/90 font-light leading-relaxed">
            Fossil wood from the formation is about three-quarters (75%) conifer-type (gymnosperm)
            and one-quarter (25%) flowering-plant wood, including southern-beech (
            <em>Nothofagus</em>-type) wood; the same wood types occur in coeval rocks of the
            Antarctic Peninsula. Regional studies suggest forests of conifers, ferns and
            southern-beech-type trees extended across southern South America and Antarctica late in
            the Cretaceous, and that the climate cooled in the Maastrichtian. A humid, temperate
            forest is the best-supported picture, but the exact climate is inferred.
          </p>
        </div>
      </div>

      {/* Interactive Floodplain Cross-Section & "Play the burial" Sequence */}
      <BurialAnimation />

      {/* Bottom 2-Column Split: Interactive Map of Argentina + Cerro Fortaleza Wildlife Side Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Interactive SVG Map of Argentina & Late Cretaceous Antarctica Connection */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/30 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-[#4DB48C]/20">
              <div>
                <span className="font-display text-xs uppercase tracking-[0.16em] text-[#9BDDBB]">
                  Santa Cruz Province, Southern Patagonia
                </span>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.04em] text-[#F4FFF8]">
                  Locality Map &amp; Antarctic Land Connection
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowLateCretaceousBridge((prev) => !prev)}
                aria-pressed={showLateCretaceousBridge}
                className={`px-3.5 py-2 rounded-lg text-xs font-display uppercase tracking-[0.1em] border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  showLateCretaceousBridge
                    ? 'bg-[#17604F] border-[#C6F5DB] text-[#F4FFF8]'
                    : 'bg-[#0C3E38]/60 border-[#4DB48C]/40 text-[#E1F1EA] hover:border-[#9BDDBB]'
                }`}
              >
                {showLateCretaceousBridge
                  ? 'Hide Late Cretaceous Antarctica Bridge'
                  : 'Toggle Schematic Late Cretaceous South America [approximate]'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* SVG Map Canvas */}
              <div className="sm:col-span-7 relative rounded-xl bg-[#08110F] border border-[#17604F]/60 p-4">
                <svg viewBox="0 0 300 380" className="w-full h-72 sm:h-80" fill="none">
                  {/* Paleolatitude 52°S Reference Line */}
                  <line
                    x1="10"
                    y1="265"
                    x2="290"
                    y2="265"
                    stroke="#4DB48C"
                    strokeOpacity="0.35"
                    strokeDasharray="4 4"
                  />
                  <text x="16" y="259" fill="#9BDDBB" fontSize="8.5" fontFamily="Marcellus, serif">
                    ~52°S PALEOLATITUDE
                  </text>

                  {/* Southern South America / Argentina Silhouette */}
                  <path
                    d="M 110 20 L 185 20 L 210 75 L 195 135 L 180 185 L 168 245 L 172 295 L 155 312 L 132 295 L 118 240 L 112 165 L 105 90 Z"
                    fill="#0C3E38"
                    stroke="#4DB48C"
                    strokeWidth="1.5"
                  />

                  {/* Northern Patagonia classic sites reference marker (~1,200 km north) */}
                  <circle cx="152" cy="155" r="3" fill="#4DB48C" fillOpacity="0.6" />
                  <text x="160" y="158" fill="#9BDDBB" fontSize="8" opacity="0.75">
                    Neuquén / Chubut (~1,200 km N)
                  </text>

                  {/* Optional Schematic Late Cretaceous Land Connection to Antarctic Peninsula (labelled "approximate") */}
                  {showLateCretaceousBridge && (
                    <g>
                      <path
                        d="M 145 305 C 155 328, 175 342, 195 365 L 165 372 C 145 348, 135 328, 135 302 Z"
                        fill="#2A8A68"
                        fillOpacity="0.55"
                        stroke="#C6F5DB"
                        strokeWidth="1.2"
                        strokeDasharray="3 2"
                      />
                      <text x="150" y="348" fill="#CFEFF0" fontSize="8.5" fontFamily="Marcellus, serif">
                        CAMPANIAN–MAASTRICHTIAN
                      </text>
                      <text x="150" y="360" fill="#CFEFF0" fontSize="8.5" fontFamily="Marcellus, serif">
                        ANTARCTIC LAND BRIDGE [APPROXIMATE]
                      </text>
                    </g>
                  )}

                  {/* Interactive Locality Pins */}
                  {PATAGONIA_SITES.map((site) => {
                    const active = selectedSite.id === site.id;
                    return (
                      <g
                        key={site.id}
                        onClick={() => setSelectedSite(site)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={site.cx}
                          cy={site.cy}
                          r={active ? 7 : 4.5}
                          fill={active ? '#CFEFF0' : '#4DB48C'}
                          stroke="#06221F"
                          strokeWidth="1.5"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Site Selector Buttons & Details */}
              <div className="sm:col-span-5 flex flex-col justify-between gap-3">
                {PATAGONIA_SITES.map((site) => {
                  const active = selectedSite.id === site.id;
                  return (
                    <button
                      key={site.id}
                      type="button"
                      onClick={() => setSelectedSite(site)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-[#0C3E38] border-[#C6F5DB]'
                          : 'bg-[#08110F]/60 border-[#4DB48C]/25 hover:border-[#9BDDBB]'
                      }`}
                    >
                      <div className="font-display text-xs uppercase tracking-[0.08em] text-[#C6F5DB]">
                        {site.name}
                      </div>
                      <div className="text-[11px] text-[#9BDDBB] mt-0.5">{site.subtitle}</div>
                      <p className="text-xs text-[#E1F1EA]/85 font-light mt-2 leading-relaxed">
                        {site.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Cerro Fortaleza Coeval Wildlife Side Card */}
        <aside className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0C3E38]/55 border border-[#4DB48C]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
                Cerro Fortaleza Assemblage
              </span>
              <EpistemicTag type="preserved" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-2">
              Wildlife of the Same Formation
            </h3>
            <p className="text-xs text-[#E1F1EA]/75 font-light mb-5 pb-3 border-b border-[#4DB48C]/25">
              Found in the Cerro Fortaleza Formation (not all necessarily lived at the exact same
              time and place):
            </p>

            <ul className="space-y-3">
              {CERRO_FORTALEZA_FAUNA.map((item) => (
                <li
                  key={item.name}
                  className="p-3 rounded-xl bg-[#06221F]/85 border border-[#4DB48C]/20"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-sm text-[#F4FFF8]">{item.name}</span>
                    <span className="text-[11px] font-display uppercase tracking-[0.1em] text-[#9BDDBB]">
                      {item.group}
                    </span>
                  </div>
                  <p className="text-xs text-[#E1F1EA]/80 font-light mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};
