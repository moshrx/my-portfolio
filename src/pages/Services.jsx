import { motion } from "framer-motion";
import { Code, Video, Palette, Sparkles } from "lucide-react";

const Services = () => {
  const list = [
    { title: "Digital Architecture", icon: Code, color: "text-blue-500", desc: "Crafting scalable React ecosystems with physics-based motion." },
    { title: "Cinematic Motion", icon: Video, color: "text-orange-500", desc: "Post-production and color grading that turns data into story." },
    { title: "Experience Design", icon: Palette, color: "text-purple-500", desc: "Minimalist UI that prioritizes emotional impact and spatial depth." },
    { title: "Brand Narrative", icon: Sparkles, color: "text-emerald-500", desc: "Defining the visual soul of a product through intentionality." }
  ];

  return (
    <motion.div className="pt-40 px-6 md:px-12 pb-32 max-w-[1400px] mx-auto">
      <h2 className="text-[10vw] font-bold tracking-tighter uppercase mb-32 leading-none">
        Capabilities<span className="text-secondary italic">.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        {list.map((s, i) => (
          <motion.div 
            key={i}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            className="p-16 bg-black flex flex-col justify-between min-h-[450px] group transition-all"
          >
            <s.icon size={40} className={`${s.color} group-hover:scale-110 transition-transform`} />
            <div>
              <h3 className="text-4xl font-bold mb-6 tracking-tight uppercase">{s.title}</h3>
              <p className="text-xl text-secondary leading-relaxed max-w-sm">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;