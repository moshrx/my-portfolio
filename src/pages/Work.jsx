import { motion } from "framer-motion";
import { PROJECTS } from "../constants";
import ProjectRow from "../components/ui/ProjectRow";

const Work = () => {
  const appleEasing = [0.22, 1, 0.36, 1];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black min-h-screen"
    >
      <section className="px-6 md:px-12 pt-32 md:pt-48 pb-32 max-w-[1800px] mx-auto">
        
        {/* Header: Large but functional */}
        <div className="mb-16 md:mb-32">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: appleEasing }}
          >
            <span className="text-primary font-mono uppercase text-[10px] tracking-[0.4em] mb-6 block font-black">
              Index — 2026
            </span>
            <h1 className="text-[15vw] md:text-[10vw] font-bold tracking-tighter leading-[0.8] uppercase">
              Current <br />
              <span className="text-secondary italic font-light">Stacks<span className="text-primary">.</span></span>
            </h1>
          </motion.div>
        </div>

        {/* Project List Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-white/10 pb-8 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">
              Project Directory
            </h2>
            <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-500 text-[9px] font-bold border border-white/5">
              {PROJECTS.length}
            </span>
          </div>
          <p className="text-zinc-600 text-[10px] md:text-xs font-mono max-w-[250px] md:text-right italic">
            A collection of builds focused on performance and interaction.
          </p>
        </div>
        
        {/* Project Rows: Using your existing component */}
        <div className="divide-y divide-white/5">
          {PROJECTS.map((project, i) => (
            <ProjectRow 
              key={project.id} 
              project={project} 
              index={i} 
            />
          ))}
        </div>

        {/* Bottom CTA: Simple and direct */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-8">
            Looking for something specific?
          </p>
          <a 
            href="mailto:shareef3533@gmail.com" 
            className="text-xl md:text-2xl font-bold uppercase tracking-tighter hover:text-primary transition-colors border-b border-primary/20 pb-2"
          >
            Let's talk details
          </a>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Work;