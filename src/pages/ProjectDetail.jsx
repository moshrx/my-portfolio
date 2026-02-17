import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../constants";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useRef, useMemo } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  // Memoize project lookup so it doesn't run on every scroll tick
  const project = useMemo(() => 
    PROJECTS.find(p => p.id === parseInt(id)) || PROJECTS[0], 
  [id]);
  
  const containerRef = useRef(null);
  const appleEasing = [0.22, 1, 0.36, 1];

  // 1. Smooth out the scroll progress to prevent "stepper" jitter
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // 2. Hardware-accelerated transforms
  const imageScale = useTransform(smoothProgress, [0, 1], [1.1, 1]);
  const imageY = useTransform(smoothProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-black"
    >
      {/* 3. OPTIMIZED GLOW: Using transform instead of fixed positioning for smoother painting */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] opacity-10 blur-[120px] pointer-events-none z-0 will-change-transform"
        style={{ 
          background: `radial-gradient(circle, ${project.color || '#0071e3'} 0%, transparent 70%)`,
          transform: 'translate3d(-50%, 0, 0)' // Force 3D layer
        }}
      />

      <div className="relative z-10 pt-40 px-6 md:px-12 pb-32 max-w-[1800px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-4 mb-20 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">
          <Link to="/" className="hover:text-white transition-colors">Work</Link>
          <ChevronRight size={10} />
          <span className="text-white">{project.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: appleEasing }}
            >
              <h1 className="text-[13vw] md:text-[9vw] font-bold tracking-tighter leading-[0.8] uppercase mb-12">
                {project.title}<span style={{ color: project.color }}>.</span>
              </h1>
              <p className="text-2xl md:text-4xl text-secondary max-w-3xl leading-[1.1] tracking-tight antialiased">
                {project.description}
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end gap-16">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <motion.a 
              href={project.link} target="_blank"
              whileHover={{ scale: 1.02, backgroundColor: project.color || '#fff', color: '#000' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-8 bg-white text-black rounded-3xl font-bold text-xl group transition-all duration-500"
            >
              Visit Project <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-500" />
            </motion.a>
          </div>
        </div>

        {/* 4. OPTIMIZED IMAGE CONTAINER */}
        <div 
          ref={containerRef}
          className="relative aspect-[21/9] w-full rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5"
        >
          <motion.div 
            style={{ 
              scale: imageScale, 
              y: imageY,
              willChange: "transform" // Critical for parallax smoothness
            }}
            className="w-full h-full"
          >
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                loading="eager" // Hero images should load immediately
                decoding="async"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center italic text-zinc-800 text-4xl font-bold uppercase">
                Case Study
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;