import { motion } from "framer-motion";
import { PERSONAL } from "../../constants";

const appleEasing = [0.22, 1, 0.36, 1];

const IntroSection = () => {
  return (
    <section className="px-6 md:px-12 py-24 md:py-44 max-w-[1800px] mx-auto">
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: appleEasing }}
        className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-10 md:mb-16"
      >
        About — 001
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: appleEasing }}
        className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.9] mb-10 md:mb-14 max-w-4xl"
      >
        {PERSONAL.tagline}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, delay: 0.15, ease: appleEasing }}
        className="text-lg md:text-2xl text-zinc-400 leading-relaxed font-light max-w-2xl"
      >
        {PERSONAL.bio}
      </motion.p>
    </section>
  );
};

export default IntroSection;
