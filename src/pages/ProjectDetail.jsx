import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../constants";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useRef, useMemo } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = useMemo(() => 
    PROJECTS.find(p => p.id === parseInt(id)) || PROJECTS[0], 
  [id]);
  
  const containerRef = useRef(null);
  const appleEasing = [0.22, 1, 0.36, 1];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const imageScale = useTransform(smoothProgress, [0, 1], [1.1, 1]);
  const imageY = useTransform(smoothProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-black"
    >
      {/* GLOW: Adjusted opacity for mobile to save battery/performance */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[50svh] opacity-[0.08] md:opacity-10 blur-[80px] md:blur-[120px] pointer-events-none z-0"
        style={{ 
          background: `radial-gradient(circle, ${project.color || '#0071e3'} 0%, transparent 70%)`,
          transform: 'translate3d(-50%, 0, 0)'
        }}
      />

      <div className="relative z-10 pt-32 md:pt-40 px-4 md:px-12 pb-20 md:pb-32 max-w-[1800px] mx-auto">
        {/* Breadcrumb: Tighter spacing for mobile */}
        <nav className="flex items-center gap-3 mb-12 md:mb-20 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">
          <Link to="/" className="hover:text-white transition-colors">Work</Link>
          <ChevronRight size={8} />
          <span className="text-white truncate max-w-[150px]">{project.title}</span>
        </nav>

        {/* Hero Section: Switch grid flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-24 md:mb-40">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: appleEasing }}
            >
              <h1 className="text-[16vw] md:text-[9vw] font-bold tracking-tighter leading-[0.85] md:leading-[0.8] uppercase mb-8 md:mb-12">
                {project.title}<span style={{ color: project.color }}>.</span>
              </h1>
              <p className="text-xl md:text-4xl text-zinc-400 md:text-secondary max-w-3xl leading-[1.2] md:leading-[1.1] tracking-tight antialiased">
                {project.description}
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end gap-10 md:gap-16">
            <div className="space-y-6">
              <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-4 md:px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[10px] uppercase tracking-widest font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <motion.a 
              href={project.link} target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-6 md:p-8 bg-white text-black rounded-2xl md:rounded-3xl font-bold text-lg md:text-xl group transition-all duration-500"
            >
              Visit Project <ArrowUpRight size={20} className="md:group-hover:rotate-45 transition-transform duration-500" />
            </motion.a>
          </div>
        </div>

        {/* Cinematic Image: Ratio change for mobile (Aspect 4/3 or 16/9 is better for vertical) */}
        <div 
          ref={containerRef}
          className="relative aspect-[4/3] md:aspect-[21/9] w-full rounded-[32px] md:rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5"
        >
          <motion.div 
            style={{ 
              scale: imageScale, 
              y: imageY,
              willChange: "transform"
            }}
            className="w-full h-full"
          >
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center italic text-zinc-800 text-2xl md:text-4xl font-bold uppercase">
                {project.title}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;