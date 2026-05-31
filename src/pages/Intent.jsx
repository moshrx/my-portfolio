import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const Intent = () => {
  const appleEasing = [0.22, 1, 0.36, 1];
  const sectionRef = useRef(null);

  // Track viewport size so parallax stays calm on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -25 : -120]);

  const philosophies = useMemo(
  () => [
    {
      number: "01",
      title: "Clarity First",
      desc: "Interfaces should feel obvious, not loud. I build for the version that's simple to read, simple to navigate, and gets out of the way.",
      align: "start",
    },
    {
      number: "02",
      title: "Motion with Intent",
      desc: "How things move matters as much as how they look. Small, considered transitions turn a flat product into something that actually feels alive.",
      align: "end",
    },
    {
      number: "03",
      title: "Always Iterating",
      desc: "Every project is a chance to top the last one. I keep learning, keep refining. There's always a sharper version waiting.",
      align: "start",
    },
  ],
  []
);

  return (
    <motion.section
      ref={sectionRef}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: appleEasing }}
className="relative py-28 md:py-36 px-5 md:px-12 max-w-[1200px] mx-auto"    >
      {/* Subtle Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-zinc-800/20 hidden md:block pointer-events-none" />

      {/* Grain Overlay */}
<div
  className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay noise-overlay"
/>
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-24 gap-8 relative z-10">
        <motion.h2
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: appleEasing }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase leading-[0.95] text-white"
        >
          Philosophy<span className="text-primary">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: appleEasing }}
          className="max-w-sm text-zinc-500 text-sm md:text-base uppercase tracking-widest leading-relaxed"
        >
          Past the code. Chasing the feel that makes a product click.
        </motion.p>
      </div>

      {/* Philosophy List */}
      <div className="flex flex-col gap-20 md:gap-28 relative z-10">
        {philosophies.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: appleEasing }}
            className={`flex flex-col ${
              item.align === "end"
                ? "md:items-end text-left md:text-right"
                : "items-start text-left"
            } w-full`}
          >
            <div className="max-w-2xl group cursor-default">
              <span className="text-primary font-mono text-sm md:text-base mb-4 block tracking-widest opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                [{item.number}]
              </span>

              <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight uppercase mb-5 md:mb-6 transition-all duration-700 group-hover:italic">
                {item.title}
              </h3>

              <p className="text-base md:text-xl text-zinc-300 leading-relaxed font-light antialiased">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing Statement */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="mt-24 md:mt-32 text-center text-zinc-500 uppercase tracking-[0.3em] text-xs relative z-10"
      >
        Built on purpose. Cut down to what matters.
      </motion.p>

      {/* Parallax Background Text */}
      <motion.div
  style={{ y: parallaxY }}
  className="absolute inset-0 flex items-end justify-center pointer-events-none select-none"
>
  <h2 className="font-display text-[18rem] font-black uppercase tracking-tight opacity-[0.03] whitespace-nowrap">
    Intent
  </h2>
</motion.div>
    </motion.section>
  );
};

export default Intent;
