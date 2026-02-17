import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ProjectRow = ({ project, index }) => {
  // Check for mobile to adjust animation behavior
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Link to={`/project/${project.id}`} className="block group">
      <motion.div 
        className="relative flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-12 border-b border-white/5 overflow-hidden"
      >
        {/* Background Hover Flash - Disabled on mobile to prevent paint lag during scroll */}
        {!isMobile && (
          <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]" />
        )}

        <div className="relative z-10 flex items-center gap-6 md:gap-12">
          {/* Index: Smaller on mobile */}
          <span className="font-mono text-zinc-600 text-[10px] md:text-xs">0{index + 1}</span>
          
          {/* Title: Fluid scale from 9vw on mobile to 7xl on desktop */}
          <h3 className="text-[10vw] md:text-7xl font-bold tracking-tighter uppercase transition-all duration-700 md:group-hover:translate-x-4 leading-none">
            {project.title}
          </h3>
        </div>

        <div className="relative z-10 flex items-center justify-between w-full md:w-auto gap-8 mt-6 md:mt-0">
          {/* Tag: Always visible on mobile for context, hover-only on desktop */}
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            {project.tag}
          </span>
          
          {/* Action Icon: Adjusted size and behavior for touch */}
          <div className="p-3 md:p-4 rounded-full border border-white/10 md:group-hover:bg-white md:group-hover:text-black transition-all duration-500 active:scale-90">
            <ArrowUpRight size={isMobile ? 18 : 24} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectRow;