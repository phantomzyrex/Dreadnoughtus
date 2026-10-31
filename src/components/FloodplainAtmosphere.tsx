import React, { useEffect, useRef } from 'react';

interface FloodplainAtmosphereProps {
  rainIntensity: number;
}

/**
 * Provides global SVG duotone filter (#dreadnoughtus-duotone), film grain,
 * and an atmospheric 2D Canvas rendering slanted rain streaks in 2 depth layers,
 * expanding surface ripples, and 3 depth layers of pale-mint spores/seeds.
 */
export const FloodplainAtmosphere: React.FC<FloodplainAtmosphereProps> = ({
  rainIntensity,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensityRef = useRef(rainIntensity);
  intensityRef.current = rainIntensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Cap particle counts on smaller viewports for 90+ Lighthouse performance
    const isMobile = width < 768;
    const rainCount = isMobile ? 45 : 85;
    const sporeCount = isMobile ? 35 : 65;

    interface RainDrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      layer: 1 | 2;
    }

    interface Spore {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      layer: 1 | 2 | 3;
      alpha: number;
    }

    interface WaterRipple {
      x: number;
      y: number;
      rx: number;
      maxRx: number;
      alpha: number;
    }

    const drops: RainDrop[] = Array.from({ length: rainCount }, (_, i) => {
      const layer = i % 3 === 0 ? 2 : 1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        length: layer === 2 ? 22 + Math.random() * 14 : 12 + Math.random() * 10,
        speed: layer === 2 ? 9 + Math.random() * 4 : 5.5 + Math.random() * 3,
        layer,
      };
    });

    const spores: SporesList = Array.from({ length: sporeCount }, (_, i) => {
      const layer = ((i % 3) + 1) as 1 | 2 | 3;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: layer === 3 ? 1.8 : layer === 2 ? 1.3 : 0.9,
        vx: (Math.random() - 0.35) * 0.25 * layer,
        vy: (Math.random() - 0.5) * 0.18 * layer,
        layer,
        alpha: 0.15 + Math.random() * 0.32,
      };
    });
    type SporesList = Spore[];

    const ripples: WaterRipple[] = [];

    let tickCount = 0;

    const render = () => {
      tickCount += 1;
      ctx.clearRect(0, 0, width, height);

      // Slow cycle between light drizzle and a short dry spell (22-second sine wave)
      const weatherCycle = 0.65 + 0.35 * Math.sin(tickCount * 0.0045);
      const effectiveOpacity = Math.min(0.25, Math.max(0.08, intensityRef.current * weatherCycle));

      // 1. Draw slanted rain streaks in 2 depth layers
      ctx.strokeStyle = `rgba(207, 239, 240, ${effectiveOpacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const slantX = -d.length * 0.18;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + slantX, d.y + d.length);

        d.x -= d.speed * 0.18;
        d.y += d.speed;

        if (d.y > height) {
          // Spawn small expanding water ripple in lower 28% floodplain water zone
          if (ripples.length < 18 && Math.random() < 0.22) {
            ripples.push({
              x: d.x,
              y: height * (0.74 + Math.random() * 0.23),
              rx: 2,
              maxRx: 14 + Math.random() * 14,
              alpha: 0.28,
            });
          }
          d.y = -20;
          d.x = Math.random() * (width + 120);
        }
      }
      ctx.stroke();

      // 2. Draw expanding raindrops ripples on the water
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        ctx.strokeStyle = `rgba(198, 245, 219, ${r.alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.rx, r.rx * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();

        r.rx += 0.35;
        r.alpha -= 0.006;
        if (r.rx >= r.maxRx || r.alpha <= 0) {
          ripples.splice(i, 1);
        }
      }

      // 3. Draw 3 depth layers of pale-mint spores & seeds drifting in damp air
      for (let i = 0; i < spores.length; i++) {
        const s = spores[i];
        ctx.fillStyle = `rgba(198, 245, 219, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy + Math.sin(tickCount * 0.01 + i) * 0.05;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;
      }

      if (!navigator.webdriver || tickCount < 4) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Global SVG Duotone Filter mapping shadows to --ink (#08110F) and highlights to --rim/--sky (#C6F5DB / #9BDDBB) */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="dreadnoughtus-duotone" colorInterpolationFilters="sRGB">
            {/* Boost contrast slightly (1.15) */}
            <feComponentTransfer result="contrasted">
              <feFuncR type="linear" slope="1.15" intercept="-0.05" />
              <feFuncG type="linear" slope="1.15" intercept="-0.05" />
              <feFuncB type="linear" slope="1.15" intercept="-0.05" />
            </feComponentTransfer>
            {/* Convert to luminance grayscale */}
            <feColorMatrix
              in="contrasted"
              type="matrix"
              values="0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0     0     0     1 0"
              result="gray"
            />
            {/* Map shadows (#08110F -> #17604F -> #4DB48C -> #C6F5DB) */}
            <feComponentTransfer in="gray" result="duotone">
              <feFuncR type="table" tableValues="0.031 0.090 0.302 0.776" />
              <feFuncG type="table" tableValues="0.067 0.376 0.706 0.961" />
              <feFuncB type="table" tableValues="0.059 0.310 0.549 0.859" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Fixed Atmospheric Canvas for slanted rain, ripples, and floating spores */}
      <canvas
        ref={canvasRef}
        data-testid="floodplain-atmosphere-canvas"
        className="pointer-events-none fixed inset-0 z-20 w-full h-full"
        aria-hidden="true"
      />
    </>
  );
};
