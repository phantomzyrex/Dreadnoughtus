import React from 'react';
import { EpistemicTag, RiverDivider } from './RiverDivider';

export const EvolutionExtinction: React.FC = () => {
  return (
    <section
      id="evolution"
      aria-label="Evolution of Sauropod Gigantism and End-Cretaceous Extinction"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="09"
        kicker="Macroevolution & Stratigraphic Age"
        title="Evolution and Extinction"
        subtitle="Drivers of sauropod gigantism (Sander et al., 2011), Maastrichtian climate cooling, and the 66 Ma Chicxulub boundary."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0C3E38]/55 border border-[#4DB48C]/25">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
              Evolutionary Drivers · Sander et al. (2011)
            </span>
            <EpistemicTag type="inferred" />
          </div>
          <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-3">
            How Titanosaurs Reached Extreme Size
          </h3>
          <p className="text-sm sm:text-base text-[#E1F1EA]/90 font-light leading-relaxed">
            Titanosaurs were the dominant sauropods of the Cretaceous. Giant size in sauropods was
            probably made possible by a unique combination of evolutionary traits: fast,
            energy-efficient feeding (a long neck sweeping wide arcs of foliage with no chewing,
            avoiding the need for a heavy head), avian-style pneumatic air sacs invading the
            vertebrae, fast fibrolamellar bone growth, and reproductive output via many small
            offspring (Sander et al., 2011).
          </p>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/25">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
              Disappearance &amp; Chicxulub Boundary
            </span>
            <EpistemicTag type="estimate" />
          </div>
          <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-[#F4FFF8] mb-3">
            Within 10 Million Years of the Asteroid
          </h3>
          <p className="text-sm sm:text-base text-[#E1F1EA]/90 font-light leading-relaxed">
            <em>Dreadnoughtus</em> lived near the end of the Cretaceous, when regional paleobotanical
            records indicate the climate was cooling in the Maastrichtian. Why{' '}
            <em>Dreadnoughtus</em> itself disappeared is unknown; it is known only from the Cerro
            Fortaleza Formation. Titanosaurs as a clade survived until the end-Cretaceous mass
            extinction about 66 million years ago, caused by the Chicxulub asteroid impact.{' '}
            <em>Dreadnoughtus</em> lived within roughly 10 million years of that event.
          </p>
        </div>
      </div>

      {/* Animated Geological Timeline SVG (110 Ma to 66 Ma) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#06221F] border border-[#4DB48C]/35">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <div>
            <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB]">
              Chronostratigraphic Timeline (110 Ma › 66 Ma)
            </span>
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.04em] text-[#F4FFF8]">
              Campanian › Maastrichtian › End-Cretaceous Extinction (66 Ma)
            </h3>
          </div>
          <EpistemicTag type="estimate" prefix="Exact age uncertain (~76–70 Ma)" />
        </div>

        <div className="overflow-x-auto">
          <svg viewBox="0 0 960 220" className="w-full min-w-[680px] h-auto" fill="none">
            {/* Stage Epochs Band */}
            {/* Cenomanian / Turonian / Older Context (left faded) */}
            <rect
              x="20"
              y="40"
              width="310"
              height="36"
              rx="4"
              fill="#0C3E38"
              fillOpacity="0.45"
              stroke="#4DB48C"
              strokeOpacity="0.3"
            />
            <text x="175" y="62" textAnchor="middle" fill="#9BDDBB" opacity="0.65" fontSize="11" fontFamily="Marcellus">
              OLDER CRETACEOUS (~110–83.6 Ma)
            </text>

            {/* Campanian Stage (83.6 - 72.1 Ma) */}
            <rect
              x="335"
              y="40"
              width="340"
              height="36"
              rx="4"
              fill="#17604F"
              stroke="#4DB48C"
              strokeWidth="1.2"
            />
            <text x="505" y="62" textAnchor="middle" fill="#F4FFF8" fontSize="12" fontFamily="Marcellus">
              CAMPANIAN (~83.6 – 72.1 Ma)
            </text>

            {/* Maastrichtian Stage (72.1 - 66.0 Ma) */}
            <rect
              x="680"
              y="40"
              width="210"
              height="36"
              rx="4"
              fill="#2A8A68"
              stroke="#9BDDBB"
              strokeWidth="1.2"
            />
            <text x="785" y="62" textAnchor="middle" fill="#F4FFF8" fontSize="12" fontFamily="Marcellus">
              MAASTRICHTIAN (72.1 – 66 Ma)
            </text>

            {/* K-Pg Boundary (66 Ma Chicxulub Impact) */}
            <line x1="895" y1="25" x2="895" y2="195" stroke="#CFEFF0" strokeWidth="2.5" strokeDasharray="5 3" />
            <circle cx="895" cy="58" r="6" fill="#CFEFF0" />
            <text x="885" y="24" textAnchor="end" fill="#CFEFF0" fontSize="11" fontFamily="Marcellus">
              66 Ma · END-CRETACEOUS EXTINCTION (CHICXULUB)
            </text>

            {/* Faded Older Markers: Argentinosaurus (~107 Ma, re-dated 2026) & Patagotitan (~101.6 Ma) */}
            <g opacity="0.58">
              <circle cx="85" cy="125" r="5" fill="#9BDDBB" />
              <line x1="85" y1="76" x2="85" y2="125" stroke="#9BDDBB" strokeDasharray="3 3" />
              <text x="85" y="145" textAnchor="middle" fill="#E1F1EA" fontSize="10.5" fontFamily="Marcellus">
                Argentinosaurus (~107 Ma)
              </text>
              <text x="85" y="159" textAnchor="middle" fill="#9BDDBB" fontSize="9.5">
                [much older · newly re-dated 2026]
              </text>

              <circle cx="215" cy="125" r="5" fill="#9BDDBB" />
              <line x1="215" y1="76" x2="215" y2="125" stroke="#9BDDBB" strokeDasharray="3 3" />
              <text x="215" y="145" textAnchor="middle" fill="#E1F1EA" fontSize="10.5" fontFamily="Marcellus">
                Patagotitan (~101.6 Ma)
              </text>
              <text x="215" y="159" textAnchor="middle" fill="#9BDDBB" fontSize="9.5">
                [much older]
              </text>
            </g>

            {/* Dreadnoughtus Bar at ~76-70 Ma, labelled "exact age uncertain" */}
            <g>
              <rect
                x="560"
                y="112"
                width="195"
                height="24"
                rx="12"
                fill="#4DB48C"
                stroke="#CFEFF0"
                strokeWidth="1.5"
              />
              <text x="657" y="128" textAnchor="middle" fill="#06221F" fontSize="11" fontWeight="bold" fontFamily="Marcellus">
                DREADNOUGHTUS (~76–70 Ma)
              </text>
              <text x="657" y="154" textAnchor="middle" fill="#CFEFF0" fontSize="10.5" fontFamily="Marcellus">
                [exact age uncertain · older reports ~77 Ma]
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};
