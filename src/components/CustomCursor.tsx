import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [clickRipple, setClickRipple] = useState<{ id: number; x: number; y: number } | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, select, [data-cursor-hover]');
      setIsHoveringInteractive(Boolean(interactive));
    };

    const onMouseDown = (e: MouseEvent) => {
      setClickRipple({ id: Date.now(), x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <div
        className="fixed top-0 left-0 rounded-full border border-[#C6F5DB]/60 bg-[#9BDDBB]/10 transition-[width,height] duration-150 ease-out"
        style={{
          width: isHoveringInteractive ? 44 : 24,
          height: isHoveringInteractive ? 44 : 24,
          transform: `translate3d(${pos.x - (isHoveringInteractive ? 22 : 12)}px, ${
            pos.y - (isHoveringInteractive ? 22 : 12)
          }px, 0)`,
        }}
      />
      {clickRipple && (
        <span
          key={clickRipple.id}
          className="fixed rounded-full border border-[#CFEFF0]/70"
          style={{
            width: 36,
            height: 36,
            left: clickRipple.x - 18,
            top: clickRipple.y - 18,
            animation: 'rippleExpand 520ms ease-out forwards',
          }}
        />
      )}
    </div>
  );
};
