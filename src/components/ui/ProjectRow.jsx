import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProjectArtwork from "./ProjectArtwork";

/**
 * ProjectRow — cinematic list row.
 * Mobile: image preview + title stacked on top of each other (image is the entry hook).
 * Desktop: text row + arrow button; large floating preview slides in from the right on hover.
 */
const ProjectRow = memo(({ project, index }) => {
  return (
    <Link to={`/work/${project.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.04 }}
        className="relative py-7 md:py-10 border-b border-white/10 overflow-visible"
      >
        {/* MOBILE — typographic card stacks above title */}
        <div className="md:hidden mb-4 rounded-2xl overflow-hidden aspect-[16/10] border border-white/5 relative">
          <ProjectArtwork project={project} size="sm" showTitle={false} />
        </div>

        <div className="flex flex-row items-center justify-between gap-4 md:gap-6">
          {/* Title block */}
          <div className="relative z-10 flex items-center gap-4 md:gap-8 min-w-0 flex-1">
            <span className="font-mono text-zinc-700 text-[10px] md:text-sm font-black group-hover:text-primary transition-colors shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none transition-all duration-700 group-hover:italic break-words min-w-0">
              {project.title}
            </h3>
          </div>

          {/* Right cluster */}
          <div className="relative z-10 flex items-center gap-4 md:gap-6 shrink-0">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-1">
                {project.tag}
              </span>
              <span className="text-[10px] font-mono text-zinc-700 uppercase">{project.year}</span>
            </div>

            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 group-hover:scale-110 shrink-0">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
            </div>
          </div>
        </div>

        {/* DESKTOP — floating typographic preview, anchored right, no overlap with title */}
        <div className="hidden md:block absolute right-[120px] top-1/2 -translate-y-1/2 w-72 lg:w-80 aspect-[16/10] z-0 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-[-10px] transition-all duration-700 ease-[0.22,1,0.36,1]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden scale-90 group-hover:scale-100 transition-transform duration-700">
            <ProjectArtwork project={project} size="sm" />
          </div>
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none shadow-2xl"
            style={{
              boxShadow: `0 30px 80px -20px ${project.color}55`,
            }}
          />
        </div>
      </motion.div>
    </Link>
  );
});

ProjectRow.displayName = "ProjectRow";

export default ProjectRow;
