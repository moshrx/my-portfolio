import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ProjectRow = ({ project, index }) => {
  return (
    <Link to={`/project/${project.id}`} className="block group">
      <motion.div 
        className="relative flex flex-col md:flex-row items-center justify-between py-12 border-b border-white/5 overflow-hidden"
      >
        {/* Background Hover Flash */}
        <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]" />

        <div className="relative z-10 flex items-center gap-12">
          <span className="font-mono text-zinc-600 text-xs">0{index + 1}</span>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase transition-all duration-700 group-hover:translate-x-4">
            {project.title}
          </h3>
        </div>

        <div className="relative z-10 flex items-center gap-8 mt-4 md:mt-0">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.tag}
          </span>
          <div className="p-4 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectRow;