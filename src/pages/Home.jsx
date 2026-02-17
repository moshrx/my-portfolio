import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS, PERSONAL, INTERESTS } from "../constants";
import ProjectRow from "../components/ui/ProjectRow";
import BentoCard from "../components/ui/BentoCard";

const Home = () => {
  const { scrollY } = useScroll();
  
  // Spatial Parallax: Elements move and fade as you descend
  const textY = useTransform(scrollY, [0, 500], [0, -150]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.9]);
  const blurValue = useTransform(scrollY, [0, 300], [0, 10]);

  const appleEasing = [0.22, 1, 0.36, 1];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 1.2, ease: appleEasing }}
      className="bg-black"
    >
      {/* 1. HERO SECTION: Cinematic Scale */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <motion.div 
          style={{ y: textY, opacity: textOpacity, scale: heroScale, filter: `blur(${blurValue}px)` }} 
          className="text-center z-10"
        >
          <motion.span 
            initial={{ opacity: 0, tracking: "0.1em" }}
            animate={{ opacity: 1, tracking: "0.4em" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-primary font-mono uppercase text-[10px] mb-8 block font-black"
          >
            {PERSONAL.location} — {new Date().getFullYear()}
          </motion.span>
          
          <h1 className="text-[14vw] md:text-[11vw] font-bold tracking-tighter leading-[0.8] uppercase select-none">
            CRAFTING <br /> 
            <span className="text-secondary italic font-light tracking-tight">MOMENTS.</span>
          </h1>
        </motion.div>

        {/* Ambient background hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* 2. INTERESTS BENTO GRID: Image-First Design */}
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
    <motion.div className="absolute inset-0 z-0">
      <img 
        src={`/assets/interests/${item.id}.jpg`} 
        alt={item.title}
        className={`w-full h-full object-cover opacity-40 transition-all duration-1000 ease-[0.22, 1, 0.36, 1] group-hover:scale-110 
          ${item.id === 'coffee' 
            ? 'grayscale-[100%] contrast-125 group-hover:opacity-60' // Coffee stays B&W
            : 'group-hover:grayscale-0 group-hover:opacity-50' // Others fade to color
          }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
    </motion.div>
  </BentoCard>
))}
        </div>
      </section>

      {/* 3. PROJECT LIST: Editorial Work Section */}
      <section id="work" className="px-6 md:px-12 pt-40 pb-60">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-12">
          <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-500">Selected Works (26)</h2>
          <p className="hidden md:block text-zinc-600 text-xs font-mono max-w-[200px] text-right">
            Pushing boundaries of web performance and cinematic motion.
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