import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL, PROJECTS } from "../constants";
import IntroSection from "../components/ui/IntroSection";
import Marquee from "../components/ui/Marquee";
import ProjectArtwork from "../components/ui/ProjectArtwork";

const HeroScene = lazy(() => import("../components/animations/HeroScene"));

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

  // Pick the 3 latest projects (assuming list order = recency)
  const featured = PROJECTS.slice(0, 3);

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
            CRAFTING <br />
            <span className="text-secondary italic font-light tracking-tight">
              MOMENTS<span className="text-primary">.</span>
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

      {/* FEATURED WORK BAND */}
      <section className="px-5 md:px-12 py-16 md:py-24 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-12 border-b border-white/5 pb-5 gap-6">
          <div>
            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.35em] font-black mb-3 block">
              Featured · 002
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight uppercase leading-[0.95]">
              Recent <span className="italic font-light text-zinc-400">drops<span className="text-primary">.</span></span>
            </h2>
          </div>
          <Link
            to="/work"
            className="hidden md:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-zinc-400 hover:text-white font-black transition-colors"
          >
            All work
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((p, idx) => (
            <Link
              key={p.id}
              to={`/work/${p.id}`}
              className="group relative block rounded-3xl overflow-hidden border border-white/5 aspect-[4/5] md:aspect-[3/4] transition-transform duration-700 hover:-translate-y-1"
              aria-label={`Open ${p.title}`}
            >
              <ProjectArtwork project={p} size="sm" />
              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/30 backdrop-blur border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-black z-10">
                <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile-only "All work" link */}
        <div className="md:hidden mt-8 flex justify-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-zinc-400 hover:text-white font-black"
          >
            See all work
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* CTA */}
      <section className="px-4 md:px-12 py-16 md:py-28 flex justify-center">
        <Link to="/work" className="group relative flex flex-col items-center">
          <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
            Tap in
          </span>
          <div className="font-display flex items-center gap-3 text-3xl md:text-5xl font-bold tracking-tight uppercase transition-all duration-500 group-hover:italic">
            See the work{" "}
            <ArrowUpRight className="w-7 h-7 md:w-10 md:h-10 text-primary transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
          </div>
          <div className="w-0 h-px bg-primary mt-2 transition-all duration-700 group-hover:w-full" />
        </Link>
      </section>
    </motion.div>
  );
};

export default Home;
