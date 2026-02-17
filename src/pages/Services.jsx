import { motion } from "framer-motion";
import { Code, Video, Palette, Sparkles } from "lucide-react";
import { useMemo } from "react";

const Services = () => {
  const appleEasing = [0.22, 1, 0.36, 1];

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
      className="pt-32 md:pt-44 px-4 md:px-12 pb-20 md:pb-32 max-w-[1400px] mx-auto overflow-hidden"
    >
      <motion.h2 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: appleEasing }}
        // FIX: Added 'clamp' to ensure text doesn't overflow small screens
        className="text-[14vw] sm:text-[12vw] md:text-[9vw] font-bold tracking-tighter uppercase mb-16 md:mb-32 leading-[0.8] md:leading-none break-words"
      >
        Capabilities<span className="text-secondary italic">.</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[32px] md:rounded-[40px] overflow-hidden">
        {list.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: appleEasing }}
            className="p-10 md:p-16 bg-black flex flex-col justify-between min-h-[300px] md:min-h-[450px] group"
          >
            {/* FIX: Use Tailwind classes for icon sizing instead of JS logic */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <s.icon 
                className={`${s.color} w-full h-full transform-gpu group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`} 
              />
            </div>

            <div className="mt-12">
              <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight uppercase leading-none">
                {s.title}
              </h3>
              <p className="text-sm md:text-lg text-zinc-400 leading-relaxed max-w-sm">
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