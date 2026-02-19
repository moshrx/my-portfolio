import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
const Intent = () => {
  const appleEasing = [0.22, 1, 0.36, 1];
  const sectionRef = useRef(null);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -150]);

  const philosophies = useMemo(
  () => [
    {
      number: "01",
      title: "Clarity First",
      desc: "I focus on building interfaces that are simple, readable, and easy to navigate. Good design should feel obvious, not overwhelming.",
      align: "start",
    },
    {
      number: "02",
      title: "Smooth Interactions",
      desc: "I care about how things move. Subtle animations and transitions make digital products feel more alive and enjoyable to use.",
      align: "end",
    },
    {
      number: "03",
      title: "Always Improving",
      desc: "I’m constantly learning and refining my craft. Every project is an opportunity to build something better than the last.",
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
className="relative py-32 md:py-56 px-6 md:px-12 max-w-[1400px] mx-auto"    >
      {/* Subtle Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-zinc-800/20 hidden md:block pointer-events-none" />

      {/* Grain Overlay */}
<div
  className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay noise-overlay"
/>
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-40 gap-8 relative z-10">
        <motion.h2
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: appleEasing }}
          className="text-[14vw] md:text-[8vw] font-bold tracking-tighter uppercase leading-[0.8] mix-blend-difference"
        >
          Philosophy<span className="text-primary">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: appleEasing }}
          className="max-w-xs text-zinc-500 text-sm md:text-base uppercase tracking-widest leading-relaxed"
        >
          Moving beyond technical execution to find the visual soul of a product.
        </motion.p>
      </div>

      {/* Philosophy List */}
      <div className="flex flex-col gap-32 md:gap-56 relative z-10">
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

              <h3 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-6 md:mb-8 transition-all duration-700 group-hover:italic">
                {item.title}
              </h3>

              <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed font-light antialiased">
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
        className="mt-40 text-center text-zinc-500 uppercase tracking-[0.3em] text-xs relative z-10"
      >
        Built with intention. Reduced with discipline.
      </motion.p>

      {/* Parallax Background Text */}
      <motion.div
  style={{ y: parallaxY }}
  className="absolute inset-0 flex items-end justify-center pointer-events-none select-none"
>
  <h2 className="text-[30vw] font-black uppercase tracking-tighter opacity-[0.03] whitespace-nowrap">
    Intent
  </h2>
</motion.div>
    </motion.section>
  );
};

export default Intent;