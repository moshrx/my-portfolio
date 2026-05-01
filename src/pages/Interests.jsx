import { motion } from "framer-motion";
import { INTERESTS } from "../constants";
import BentoCard from "../components/ui/BentoCard";

const appleEasing = [0.22, 1, 0.36, 1];

const Interests = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: appleEasing }}
      className="min-h-screen bg-black pt-28 md:pt-36 pb-24 md:pb-28 px-5 md:px-12"
    >
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: appleEasing }}
            className="text-primary font-mono text-[10px] uppercase tracking-[0.35em] font-black mb-5"
          >
            Personal — 002
          </motion.p>
          <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl font-bold tracking-tight uppercase leading-none mix-blend-difference">
            Things I <br />
            <span className="italic font-light tracking-tight text-zinc-400">
              care about
             <span className="text-primary">.</span>
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-8 border-l border-white/10 pl-8">
          
          
        </div>
      </div>

      {/* Bento Grid */}
      <section className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {INTERESTS.map((item, index) => (
            <BentoCard
              key={item.id}
              className={`${item.span} min-h-[260px] ${item.height} relative group overflow-hidden border-none bg-zinc-900 rounded-3xl`}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={item.image || `/assets/interests/${item.id}.avif`}
                  alt={item.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding="async"
                  sizes="(max-width: 767px) 92vw, (max-width: 1279px) 48vw, 33vw"
                  className="w-full h-full object-cover opacity-50 md:opacity-40 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
            </BentoCard>
          ))}
        </div>
      </section>

      {/* Bottom Marquee */}
      <div className="mt-24 md:mt-32 border-t border-white/10 pt-8 overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 text-5xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 opacity-50 select-none"
        >
          <span>Interests</span>
          <span>Passions</span>
          <span>Interests</span>
          <span>Passions</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Interests;
