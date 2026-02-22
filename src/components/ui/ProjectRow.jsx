import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ProjectRow = memo(({ project, index }) => {
  return (
    <Link to={`/work/${project.id}`} className="block group">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.05 }}
        className="relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-b border-white/10 overflow-visible"
      >
        {/* Floating Image Preview (Desktop Only) */}
        <div className="hidden md:block absolute left-[40%] top-1/2 -translate-y-1/2 w-64 aspect-[16/10] z-0 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-12 transition-all duration-700 ease-[0.22,1,0.36,1]">
            <img 
              src={project.image} 
              alt="" 
              loading="lazy"
              decoding="async"
              sizes="256px"
              className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl scale-75 group-hover:scale-100"
            />
        </div>

        <div className="relative z-10 flex items-center gap-8 md:gap-16">
          {/* Index: Minimalist style */}
          <span className="font-mono text-zinc-800 text-[10px] md:text-sm font-black group-hover:text-primary transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
          
          {/* Title: Mixed weight on hover */}
          <h3 className="text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase leading-[0.8] transition-all duration-700 group-hover:italic">
            {project.title}
          </h3>
        </div>

        <div className="relative z-10 flex items-end justify-between w-full md:w-auto gap-12 mt-8 md:mt-0">
          {/* Meta Info */}
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-1">
              {project.tag}
            </span>
            <span className="text-[9px] font-mono text-zinc-700 uppercase">
              {project.year}
            </span>
          </div>
          
          {/* Subtle Action Icon */}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:scale-110">
            <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 transition-transform duration-500 group-hover:rotate-45" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

export default ProjectRow;
