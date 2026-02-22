import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { PERSONAL } from "../constants";
import IntroSection from "../components/ui/IntroSection";
import Marquee from "../components/ui/Marquee";
import { ArrowUpRight } from "lucide-react";

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: appleEasing }}
      className="bg-black"
    >
      {/* HERO SECTION */}
      <section className="relative h-[100svh] flex items-center justify-center px-4 md:px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/assets/background-img/bg-img-mobile.jpg"
            />
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
          {/* Dark overlays for text readability and cinematic mood */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        {/* Floating particle dust overlay */}
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
            willChange: "transform, opacity"
          }}
          className="text-center z-10 w-full"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            className="text-primary font-mono uppercase text-[9px] md:text-[10px] mb-6 md:mb-8 block font-black"
          >
            {PERSONAL.location}
          </motion.span>

          <h1 className="text-[17vw] md:text-[11vw] font-bold tracking-tighter leading-[0.85] md:leading-[0.8] uppercase select-none pointer-events-none">
            CRAFTING <br />
            <span className="text-secondary italic font-light tracking-tight">MOMENTS<span className="text-primary">.</span></span>
          </h1>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
          />
        </div>
      </section>

      {/* INTRO */}
      <IntroSection />

      {/* MARQUEE */}
      <Marquee />

      {/* CTA */}
      <section className="px-4 md:px-12 py-20 md:py-40 flex justify-center">
        <Link to="/work" className="group relative flex flex-col items-center">
            <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Click to enter</span>
            <div className="flex items-center gap-4 text-4xl md:text-7xl font-bold tracking-tighter uppercase transition-all duration-500 group-hover:italic">
                My Works <ArrowUpRight className="w-8 h-8 md:w-16 md:h-16 text-primary transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
            </div>
            {/* Aesthetic Underline */}
            <div className="w-0 h-px bg-primary mt-2 transition-all duration-700 group-hover:w-full" />
        </Link>
      </section>
    </motion.div>
  );
};

export default Home;
