import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PROJECTS, PERSONAL, INTERESTS } from "../constants";
import ProjectRow from "../components/ui/ProjectRow";
import BentoCard from "../components/ui/BentoCard";
import { useMemo } from "react";

const Home = () => {
  const { scrollY } = useScroll();
  
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const textY = useTransform(smoothY, [0, 500], [0, -80]); // Reduced movement for mobile
  const textOpacity = useTransform(smoothY, [0, 400], [1, 0]);
  const heroScale = useTransform(smoothY, [0, 600], [1, 0.98]);

  const appleEasing = [0.22, 1, 0.36, 1];
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: appleEasing }}
      className="bg-black"
    >
      {/* HERO SECTION: svh units prevent "mobile jump" */}
      <section className="relative h-[100svh] flex items-center justify-center px-4 md:px-6 overflow-hidden">
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
            {PERSONAL.location} — {currentYear}
          </motion.span>
          
          <h1 className="text-[17vw] md:text-[11vw] font-bold tracking-tighter leading-[0.85] md:leading-[0.8] uppercase select-none pointer-events-none">
            CRAFTING <br /> 
            <span className="text-secondary italic font-light tracking-tight">MOMENTS.</span>
          </h1>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" 
          />
        </div>
      </section>

      {/* INTERESTS BENTO GRID: Responsive columns and height */}
      <section className="px-4 md:px-12 py-10 md:py-20 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {INTERESTS.map((item) => (
            <BentoCard 
              key={item.id}
              // items will stack 1-per-row on mobile, then follow their span on desktop
              className={`${item.span} min-h-[320px] md:${item.height} relative group overflow-hidden border-none bg-zinc-900 rounded-[32px] md:rounded-[48px]`}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={`/assets/interests/${item.id}.jpg`} 
                  alt={item.title}
                  loading="lazy"
                  className={`w-full h-full object-cover opacity-50 md:opacity-40 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] md:group-hover:scale-110 
                    ${item.id === 'coffee' ? 'grayscale contrast-125' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
            </BentoCard>
          ))}
        </div>
      </section>

      {/* PROJECT LIST: Editorial headers */}
      <section id="work" className="px-4 md:px-12 pt-20 md:pt-40 pb-32 md:pb-60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 border-b border-white/10 pb-8 md:pb-12 gap-4">
          <h2 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">
            Selected Works ({PROJECTS.length})
          </h2>
          <p className="text-zinc-600 text-[10px] md:text-xs font-mono max-w-[200px] md:text-right italic">
            Pushing the limits of spatial web design.
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