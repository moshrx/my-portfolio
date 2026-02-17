import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const ProjectCard = ({ project }) => {
  // Mobile check to adjust animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      // Optimization: Only lift on desktop. Scale slightly on tap for mobile.
      whileHover={!isMobile ? { y: -10 } : {}}
      whileTap={isMobile ? { scale: 0.98 } : {}}
      className="group relative bg-zinc-900/50 border border-white/5 rounded-[32px] md:rounded-[40px] overflow-hidden backdrop-blur-sm"
    >
      {/* 1. Image/Preview Container */}
      <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-zinc-900">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center text-zinc-700 font-mono text-[10px] uppercase tracking-widest">
           {/* If you add images, use: <img src={project.image} className="w-full h-full object-cover" /> */}
           [ View Case Study ]
        </div>
      </div>
      
      {/* 2. Content Container */}
      <div className="p-8 md:p-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors italic uppercase tracking-tighter leading-none">
            {project.title}
          </h3>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noreferrer" 
            className="p-3 md:p-4 bg-white/5 rounded-full hover:bg-primary transition-all active:scale-90"
          >
            <ExternalLink size={isMobile ? 20 : 22} className="text-zinc-400 group-hover:text-white" />
          </a>
        </div>
        
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 line-clamp-3 md:line-clamp-2 antialiased">
          {project.description}
        </p>
        
        {/* 3. Tech Stack: Larger touch-friendly chips */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {project.tech.map((t) => (
            <span 
              key={t} 
              className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-white/5 rounded-full text-zinc-500 border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;