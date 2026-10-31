import React, { useState } from 'react';
import { MYTH_VS_REALITY_CARDS } from '../data/dreadnoughtusData';
import { EpistemicTag, RiverDivider } from './RiverDivider';

export const MythReality: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const flipAll = (state: boolean) => {
    const next: Record<string, boolean> = {};
    MYTH_VS_REALITY_CARDS.forEach((c) => {
      next[c.id] = state;
    });
    setFlippedIds(next);
  };

  return (
    <section
      id="myth-reality"
      aria-label="Myth versus Paleontological Reality"
      className="relative z-10 py-20 md:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      <RiverDivider
        sectionNumber="10"
        kicker="Critical Historiography"
        title="Myth vs. Reality"
        subtitle="Click or press Enter on any card to flip between popular headline claims and peer-reviewed paleontological evidence."
      />

      <div className="flex items-center justify-end gap-3 mb-8">
        <button
          type="button"
          onClick={() => flipAll(true)}
          className="px-4 py-2 rounded-lg bg-[#0C3E38] border border-[#4DB48C]/40 text-xs font-display uppercase tracking-[0.12em] text-[#F4FFF8] hover:border-[#C6F5DB] cursor-pointer"
        >
          Reveal All Realities
        </button>
        <button
          type="button"
          onClick={() => flipAll(false)}
          className="px-4 py-2 rounded-lg bg-[#06221F] border border-[#4DB48C]/25 text-xs font-display uppercase tracking-[0.12em] text-[#E1F1EA]/80 hover:text-[#F4FFF8] cursor-pointer"
        >
          Reset to Myths
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MYTH_VS_REALITY_CARDS.map((card) => {
          const isFlipped = Boolean(flippedIds[card.id]);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => toggleCard(card.id)}
              aria-pressed={isFlipped}
              aria-label={`Myth ${card.number}: ${card.myth}. Click to toggle scientific reality.`}
              className="group text-left rounded-2xl p-6 sm:p-7 min-h-[260px] border transition-all duration-300 cursor-pointer flex flex-col justify-between bg-[#06221F] border-[#4DB48C]/30 hover:border-[#C6F5DB]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#4DB48C]/20">
                  <span className="font-display text-xs uppercase tracking-[0.18em] text-[#9BDDBB] tabular-nums">
                    {card.number} · {isFlipped ? 'SCIENTIFIC REALITY' : 'POPULAR MYTH'}
                  </span>
                  <EpistemicTag type={card.badge} />
                </div>

                {!isFlipped ? (
                  <div>
                    <p className="font-display text-xl sm:text-2xl text-[#F4FFF8] leading-snug">
                      {card.myth}
                    </p>
                    <p className="mt-4 text-xs text-[#9BDDBB] font-light">
                      Common headline claim — select card to examine peer-reviewed reality.
                    </p>
                  </div>
                ) : (
                  <div className="animate-fadeIn">
                    <div className="text-xs font-display uppercase tracking-[0.12em] text-[#4DB48C] mb-1.5">
                      Claim: {card.myth}
                    </div>
                    <p className="text-sm sm:text-base text-[#F4FFF8] font-light leading-relaxed">
                      {card.reality}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-[#4DB48C]/15 flex items-center justify-between text-[11px] font-display uppercase tracking-[0.16em] text-[#C6F5DB]">
                <span>{isFlipped ? 'Showing Reality' : 'Flip for Evidence'}</span>
                <span aria-hidden="true">↻</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
