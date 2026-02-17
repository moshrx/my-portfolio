import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-surface border border-white/5 rounded-3xl overflow-hidden"
    >
      <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-110 transition-transform duration-700 ease-out flex items-center justify-center text-zinc-800 font-bold">
           {/* Placeholder for when you add images to public/projects/ */}
           [ {project.title} Screenshot ]
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors italic uppercase tracking-tighter">
            {project.title}
          </h3>
          <a href={project.link} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
            <ExternalLink size={18} className="text-zinc-400 group-hover:text-white" />
          </a>
        </div>
        
        <p className="text-secondary text-sm leading-relaxed mb-6 h-12 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-zinc-500 border border-white/5">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;