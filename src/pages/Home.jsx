import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL } from "../constants";
import IntroSection from "../components/ui/IntroSection";
import Marquee from "../components/ui/Marquee";

const HeroScene = lazy(() => import("../components/animations/HeroScene"));

const PAGES = [
  { index: "01", name: "Interests", href: "/interests", note: "What I'm into" },
  { index: "02", name: "Gallery", href: "/gallery", note: "Photos" },
  { index: "03", name: "Contact", href: "/contact", note: "Say hi" },
];

const Home = () => {
  const { scrollY } = useScroll();
  const [shouldRenderHeroScene, setShouldRenderHeroScene] = useState(false);

  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const textY = useTransform(smoothY, [0, 500], [0, -80]);
  const textOpacity = useTransform(smoothY, [0, 400], [1, 0]);
  const heroScale = useTransform(smoothY, [0, 600], [1, 0.98]);

  const appleEasing = [0.22, 1, 0.36, 1];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isDesktop = window.innerWidth >= 1024;
    setShouldRenderHeroScene(!mediaQuery.matches && isDesktop);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: appleEasing }}
      className="bg-black"
    >
      {/* HERO */}
      <section className="relative min-h-[92svh] flex items-center justify-center px-4 md:px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 767px)" srcSet="/assets/background-img/bg-img-mobile.jpg" />
            <img
              src="/assets/background-img/bg-img.jpg"
              alt=""
              fetchPriority="high"
              decoding="async"
              width="1920"
              height="1440"
              className="w-full h-full object-cover object-center scale-105"
            />
          </picture>
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        {shouldRenderHeroScene ? (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        ) : null}

        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
            scale: heroScale,
            willChange: "transform, opacity",
          }}
          className="text-center z-10 w-full"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            className="text-primary font-mono uppercase text-[9px] md:text-[10px] mb-5 md:mb-6 block font-black"
          >
            {PERSONAL.location}
          </motion.span>

          <h1 className="font-display text-[3.75rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9rem] xl:text-[10rem] font-bold tracking-tight leading-[0.88] uppercase select-none pointer-events-none">
            I'M <br />
            <span className="text-secondary italic font-light tracking-tight">
              MOHAMMED<span className="text-primary">.</span>
            </span>
          </h1>
        </motion.div>

        {/* Scroll cue with text label (mobile + desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/50 font-bold">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block w-[1px] h-10 bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* INTRO */}
      <IntroSection />

      {/* INDEX — the two other places on this site */}
      <section className="px-5 md:px-12 py-16 md:py-24 max-w-[1400px] mx-auto">
        <span className="text-primary font-mono text-[10px] uppercase tracking-[0.35em] font-black mb-8 md:mb-10 block">
          Index · 002
        </span>

        <div className="border-t border-white/5">
          {PAGES.map((page) => (
            <Link
              key={page.href}
              to={page.href}
              className="group flex items-center justify-between gap-6 border-b border-white/5 py-8 md:py-10"
            >
              <div className="flex items-baseline gap-5 md:gap-8">
                <span className="font-mono text-[10px] text-zinc-700 tracking-widest">
                  {page.index}
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight uppercase leading-none transition-colors duration-500 text-zinc-300 group-hover:text-white">
                  {page.name}
                </h2>
              </div>
              <div className="flex items-center gap-5 md:gap-8">
                <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                  {page.note}
                </span>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-zinc-600 transition-all duration-500 group-hover:text-primary group-hover:rotate-45"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />
    </motion.div>
  );
};

export default Home;
