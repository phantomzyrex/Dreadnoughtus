import React from 'react';

interface NavProps {
  onOpenMenu: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Nav: React.FC<NavProps> = ({ onOpenMenu, onNavigateSection }) => {
  return (
    <header
      className="relative z-30 w-full px-6 sm:px-8 pt-5 sm:pt-7 pb-4 flex items-center justify-between gap-8"
      style={{
        background:
          'linear-gradient(to bottom, rgba(6, 34, 31, 0.42) 0%, rgba(6, 34, 31, 0.14) 65%, transparent 100%)',
      }}
    >
      {/* Zone 1: Left Brand Name */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          onNavigateSection('hero');
        }}
        className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#F4FFF8] whitespace-nowrap shrink-0 transition-all duration-200 hover:text-[#C6F5DB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6F5DB]"
        style={{ textShadow: '0 1px 8px rgba(6, 34, 31, 0.55)' }}
      >
        DREADNOUGHTUS
      </a>

      {/* Zone 2: Centre MENU with thin 1px line (about 80px wide) above it */}
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open chapter navigation menu"
        className="group flex flex-col items-center justify-center cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6F5DB]"
      >
        <span
          className="block h-[1px] w-16 sm:w-20 bg-[#F4FFF8]/85 mb-1.5 transition-all duration-300 group-hover:w-28 group-hover:bg-[#C6F5DB] group-hover:shadow-[0_0_10px_rgba(198,245,219,0.8)]"
          aria-hidden="true"
        />
        <span
          className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#F4FFF8] transition-all duration-200 group-hover:text-[#C6F5DB] group-hover:drop-shadow-[0_0_10px_rgba(198,245,219,0.65)]"
          style={{ textShadow: '0 1px 8px rgba(6, 34, 31, 0.55)' }}
        >
          MENU
        </span>
      </button>

      {/* Zone 3: Right CONTACT */}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          onNavigateSection('contact');
        }}
        className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#F4FFF8] whitespace-nowrap shrink-0 transition-all duration-200 hover:text-[#C6F5DB] hover:drop-shadow-[0_0_10px_rgba(198,245,219,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6F5DB]"
        style={{ textShadow: '0 1px 8px rgba(6, 34, 31, 0.55)' }}
      >
        CONTACT
      </a>
    </header>
  );
};
