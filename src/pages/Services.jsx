import { motion } from "framer-motion";
import { Code, Video, Palette, Sparkles } from "lucide-react";
import { useMemo } from "react";

const Services = () => {
  const appleEasing = [0.22, 1, 0.36, 1];

  // Memoizing the list to prevent unnecessary re-calculations
  const list = useMemo(() => [
    { title: "Digital Architecture", icon: Code, color: "text-blue-500", desc: "Crafting scalable React ecosystems with physics-based motion." },
    { title: "Cinematic Motion", icon: Video, color: "text-orange-500", desc: "Post-production and color grading that turns data into story." },
    { title: "Experience Design", icon: Palette, color: "text-purple-500", desc: "Minimalist UI that prioritizes emotional impact and spatial depth." },
    { title: "Brand Narrative", icon: Sparkles, color: "text-emerald-500", desc: "Defining the visual soul of a product through intentionality." }
  ], []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 px-6 md:px-12 pb-32 max-w-[1400px] mx-auto"
    >
      <motion.h2 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: appleEasing }}
        className="text-[10vw] font-bold tracking-tighter uppercase mb-32 leading-none"
      >
        Capabilities<span className="text-secondary italic">.</span>
      </motion.h2>

      {/* Grid Container Optimized for Paint Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[40px] overflow-hidden">
        {list.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: appleEasing }}
            // Use hardware acceleration for the background color shift
            whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
            className="p-12 md:p-16 bg-black flex flex-col justify-between min-h-[400px] md:min-h-[450px] group will-change-colors"
          >
            <div className="overflow-hidden w-fit">
              <s.icon 
                size={40} 
                className={`${s.color} transform-gpu group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-[0.22,1,0.36,1]`} 
              />
            </div>

            <div>
              <motion.h3 
                className="text-3xl md:text-4xl font-bold mb-6 tracking-tight uppercase"
              >
                {s.title}
              </motion.h3>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-sm antialiased">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;