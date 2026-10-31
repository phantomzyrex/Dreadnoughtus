import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AnatomyHotspots } from './components/AnatomyHotspots';
import { CustomCursor } from './components/CustomCursor';
import { DietLifeHistory } from './components/DietLifeHistory';
import { EvolutionExtinction } from './components/EvolutionExtinction';
import { FloodplainAtmosphere } from './components/FloodplainAtmosphere';
import { FloodplainMap } from './components/FloodplainMap';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { Loader } from './components/Loader';
import { MenuOverlay } from './components/MenuOverlay';
import { MythReality } from './components/MythReality';
import { Overview } from './components/Overview';
import { SizeCompare } from './components/SizeCompare';
import { Taxonomy } from './components/Taxonomy';
import { Timeline } from './components/Timeline';
import { WaterLevelGauge } from './components/WaterLevelGauge';
import { getWaterLevelStage, WaterLevelState } from './utils/floodplainLogic';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const isAutostart =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('autostart') === '1';

  const [isLoaded, setIsLoaded] = useState(isAutostart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [waterState, setWaterState] = useState<WaterLevelState>(() => getWaterLevelStage(0));
  const lenisRef = useRef<Lenis | null>(null);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!prefersReducedMotion && !navigator.webdriver) {
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const updateScrollProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setWaterState(getWaterLevelStage(progress));
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setWaterState(getWaterLevelStage(0));
      return;
    }

    const el = document.getElementById(sectionId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      data-state={isLoaded ? 'ready' : 'loading'}
      className="relative min-h-screen bg-[#06221F] text-[#F4FFF8] selection:bg-[#4DB48C]/35 selection:text-[#F4FFF8]"
    >
      {/* Initial River-Network Loader */}
      {!isLoaded && (
        <Loader onComplete={handleLoaderComplete} skipImmediately={isAutostart} />
      )}

      {/* Custom Pale-Mint Ring Cursor (desktop only) */}
      <CustomCursor />

      {/* Global SVG Duotone Filter + Rain & Spores Canvas */}
      <FloodplainAtmosphere rainIntensity={waterState.rainIntensity} />

      {/* Fine Film Grain Overlay (~4% opacity) */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(244,255,248,0.8) 0.6px, transparent 0.6px), radial-gradient(rgba(155,221,187,0.8) 0.6px, #06221F 0.6px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
        aria-hidden="true"
      />

      {/* Decorative Right-Edge Water-Level Gauge */}
      <WaterLevelGauge waterState={waterState} />

      {/* Full-Screen Levee-Break Menu Overlay */}
      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectSection={scrollToSection}
      />

      {/* Main Content Stream: Upstream Overcast Celadon to Downstream Deep Spruce */}
      <main
        style={{
          background:
            'linear-gradient(180deg, #08110F 0%, #0C3E38 18%, #06221F 45%, #0C3E38 72%, #06221F 100%)',
        }}
      >
        {/* 01 HERO */}
        <Hero
          isLoaded={isLoaded}
          onOpenMenu={() => setMenuOpen(true)}
          onNavigateSection={scrollToSection}
        />

        {/* 02 OVERVIEW */}
        <Overview />

        {/* 03 DISCOVERY AND HISTORY */}
        <Timeline />

        {/* 04 ANATOMY */}
        <AnatomyHotspots />

        {/* 05 SIZE COMPARISON & MASS DEBATE */}
        <SizeCompare />

        {/* 06 DIET AND LIFE HISTORY */}
        <DietLifeHistory />

        {/* 07 HABITAT AND DISTRIBUTION */}
        <FloodplainMap />

        {/* 08 CLASSIFICATION AND SPECIES */}
        <Taxonomy />

        {/* 09 EVOLUTION AND EXTINCTION */}
        <EvolutionExtinction />

        {/* 10 MYTH VS REALITY */}
        <MythReality />

        {/* 11 GALLERY */}
        <Gallery />

        {/* 12 FAST FACTS & SOURCES + 13 CONTACT & FOOTER */}
        <Footer onBackToRiverbank={() => scrollToSection('hero')} />
      </main>
    </div>
  );
}
