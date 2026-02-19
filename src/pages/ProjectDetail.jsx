import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../constants";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useRef, useMemo, useEffect } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  
  // Find project and calculate the "Next" project for the bottom loop
  const projectIndex = useMemo(() => PROJECTS.findIndex(p => p.id === parseInt(id)), [id]);
  const project = PROJECTS[projectIndex] || PROJECTS[0];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  const containerRef = useRef(null);
  const appleEasing = [0.22, 1, 0.36, 1];

  // Scroll to top on project change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
      className="relative bg-black min-h-screen"
    >
      {/* Dynamic Background Glow: Uses radial gradient instead of blur for GPU performance */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[200%] h-[60svh] opacity-[0.12] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at center, ${project.color || '#0071e3'} 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 pt-32 md:pt-48 px-6 md:px-12 max-w-[1800px] mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-4 mb-12 md:mb-24 text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">
          <Link to="/work" className="hover:text-white transition-colors">Work</Link>
          <ChevronRight size={10} className="text-zinc-800" />
          <span className="text-white">{project.title}</span>
        </nav>

        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 mb-24 md:mb-48">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: appleEasing }}
            >
              <h1 className="text-[15vw] md:text-[9vw] font-bold tracking-tighter leading-[0.8] uppercase mb-10 md:mb-16">
                {project.title}<span style={{ color: project.color }}>.</span>
              </h1>
              <p className="text-xl md:text-5xl text-zinc-400 font-medium leading-[1.1] tracking-tight max-w-4xl">
                {project.description}
              </p>
            </motion.div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 flex flex-col justify-end gap-12">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-black">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map(t => (
                  <span key={t} className="px-5 py-2.5 bg-zinc-900 border border-white/5 rounded-full text-[10px] uppercase tracking-widest font-black text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <motion.a 
              href={project.link} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-8 bg-white text-black rounded-[32px] font-black uppercase text-xs tracking-[0.2em] group transition-all duration-500"
            >
              Launch Site <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform duration-500" />
            </motion.a>
          </div>
        </div>

        {/* Parallax Image Section */}
        <div 
          ref={containerRef}
          className="relative aspect-[4/5] md:aspect-[21/9] w-full rounded-[40px] md:rounded-[60px] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl"
        >
          <motion.div style={{ scale: imageScale, y: imageY }} className="w-full h-full">
            <img 
              src={project.image} 
              alt={project.title} 
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
        </div>
      </div>

      {/* Infinite Loop: Next Project Section */}
      <section className="mt-32 md:mt-60 border-t border-white/5">
        <Link 
          to={`/work/${nextProject.id}`}
          className="group block py-24 md:py-40 px-6 md:px-12 hover:bg-zinc-900/30 transition-colors"
        >
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-black mb-6 block">
                Up Next
              </span>
              <h2 className="text-[12vw] md:text-[7vw] font-bold tracking-tighter uppercase leading-none group-hover:italic transition-all duration-700">
                {nextProject.title}
              </h2>
            </div>
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
              <ArrowUpRight className="w-8 h-8 md:w-14 md:h-14 text-white group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
        </Link>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;
