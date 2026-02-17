import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PROJECTS, PERSONAL, INTERESTS } from "../constants";
import ProjectRow from "../components/ui/ProjectRow";
import BentoCard from "../components/ui/BentoCard";
import { useMemo } from "react";

const Home = () => {
  const { scrollY } = useScroll();
  
  // 1. Smooth out the scroll values using useSpring
  // This prevents "jittery" movement if the mouse wheel is notched
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 2. Hardware-Accelerated Transforms
  const textY = useTransform(smoothY, [0, 500], [0, -100]);
  const textOpacity = useTransform(smoothY, [0, 400], [1, 0]);
  const heroScale = useTransform(smoothY, [0, 600], [1, 0.95]);

  const appleEasing = [0.22, 1, 0.36, 1];

  // 3. Pre-calculate date to avoid re-renders during scroll
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: appleEasing }}
      className="bg-black"
    >
      {/* HERO SECTION */}
      <section className="relative h-[100svh] flex items-center justify-center px-6 overflow-hidden">
        <motion.div 
          style={{ 
            y: textY, 
            opacity: textOpacity, 
            scale: heroScale,
            willChange: "transform, opacity" // Force GPU acceleration
          }} 
          className="text-center z-10"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ delay: 0.5, duration: 1, ease: appleEasing }}
            className="text-primary font-mono uppercase text-[10px] mb-8 block font-black"
          >
            {PERSONAL.location} — {currentYear}
          </motion.span>
          
          <h1 className="text-[14vw] md:text-[11vw] font-bold tracking-tighter leading-[0.8] uppercase select-none pointer-events-none">
            CRAFTING <br /> 
            <span className="text-secondary italic font-light tracking-tight">MOMENTS.</span>
          </h1>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" 
          />
        </div>
      </section>

      {/* INTERESTS BENTO GRID */}
      <section className="px-6 md:px-12 py-20 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {INTERESTS.map((item) => (
            <BentoCard 
              key={item.id}
              className={`${item.span} ${item.height} ${item.aspect} relative group overflow-hidden border-none bg-zinc-900`}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={`/assets/interests/${item.id}.jpg`} 
                  alt={item.title}
                  loading="lazy"
                  className={`w-full h-full object-cover opacity-40 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-110 
                    ${item.id === 'coffee' ? 'grayscale contrast-125' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              </div>
            </BentoCard>
          ))}
        </div>
      </section>

      {/* PROJECT LIST */}
      <section id="work" className="px-6 md:px-12 pt-40 pb-60">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-12">
          <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-500">Selected Works ({PROJECTS.length})</h2>
          <p className="hidden md:block text-zinc-600 text-xs font-mono max-w-[200px] text-right italic">
            Visual Storytelling & Interaction.
          </p>
        </div>
        
        <div className="divide-y divide-white/5">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;