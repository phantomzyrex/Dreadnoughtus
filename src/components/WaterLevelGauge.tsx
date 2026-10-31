import React, { useState } from 'react';
import { WaterLevelState } from '../utils/floodplainLogic';

interface WaterLevelGaugeProps {
  waterState: WaterLevelState;
}

export const WaterLevelGauge: React.FC<WaterLevelGaugeProps> = ({ waterState }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside
      aria-label="Decorative Floodplain Water-Level Gauge"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-end select-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      {/* Decorative metaphor tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          className="mb-3 mr-2 max-w-[230px] p-3 rounded-lg bg-[#06221F]/95 border border-[#4DB48C]/40 text-[11px] leading-relaxed text-[#E1F1EA] shadow-xl"
        >
          Decorative: the skeletons were buried in a flood, but this water level is a design metaphor.
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowTooltip((prev) => !prev)}
        aria-label={`Water level gauge: ${waterState.stage} (${waterState.percentage}%). Decorative: the skeletons were buried in a flood, but this water level is a design metaphor.`}
        className="group relative flex items-center gap-2.5 py-2 px-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6F5DB]"
      >
        {/* Stage labels column */}
        <div className="flex flex-col justify-between h-44 text-[9px] font-display tracking-[0.16em] uppercase text-right pr-1">
          <span
            className={
              waterState.stage === 'LOW WATER'
                ? 'text-[#C6F5DB] font-semibold'
                : 'text-[#E1F1EA]/50'
            }
          >
            LOW WATER
          </span>
          <span
            className={
              waterState.stage === 'BANKFULL'
                ? 'text-[#C6F5DB] font-semibold'
                : 'text-[#E1F1EA]/50'
            }
          >
            BANKFULL
          </span>
          <span
            className={
              waterState.stage === 'FLOOD'
                ? 'text-[#C6F5DB] font-semibold'
                : 'text-[#E1F1EA]/50'
            }
          >
            FLOOD
          </span>
        </div>

        {/* Vertical thin river gauge line + moving droplet marker */}
        <div className="relative h-44 w-3 flex justify-center">
          <div className="h-full w-[1px] bg-gradient-to-b from-[#9BDDBB]/60 via-[#4DB48C]/70 to-[#17604F]" />

          {/* Filled water column */}
          <div
            className="absolute top-0 w-[2px] bg-[#C6F5DB] transition-all duration-150"
            style={{ height: `${waterState.percentage}%` }}
          />

          {/* Droplet-shaped marker */}
          <div
            className="absolute -left-[3px] transition-all duration-150"
            style={{ top: `calc(${waterState.percentage}% - 7px)` }}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
              <path
                d="M7 1 C7 1, 13 7.2, 13 10.5 C13 13.5, 10.3 15.5, 7 15.5 C3.7 15.5, 1 13.5, 1 10.5 C1 7.2, 7 1, 7 1 Z"
                fill="#CFEFF0"
                stroke="#06221F"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </button>
    </aside>
  );
};
