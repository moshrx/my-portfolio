import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../constants";
import { ArrowUpRight, ArrowLeft, ChevronRight, Globe } from "lucide-react";
import { useRef, useMemo, useEffect } from "react";

const appleEasing = [0.22, 1, 0.36, 1];

const ProjectDetail = () => {
  const { id } = useParams();

  const projectIndex = useMemo(
    () => PROJECTS.findIndex((p) => p.id === parseInt(id, 10)),
    [id]
  );
  const project = PROJECTS[projectIndex] || PROJECTS[0];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  const containerRef = useRef(null);

  // Scroll to top on project change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
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
      {/* Dynamic background glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[200%] h-[60svh] opacity-[0.12] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at center, ${project.color || "#0071e3"} 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 pt-28 md:pt-36 px-5 md:px-12 max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 mb-8 md:mb-14 text-[10px] uppercase tracking-[0.35em] font-black text-zinc-500">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Work</span>
          </Link>
          <ChevronRight size={10} className="text-zinc-800" />
          <span className="text-white truncate max-w-[55vw] md:max-w-none">{project.title}</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-24">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: appleEasing }}
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border text-[10px] uppercase tracking-[0.3em] font-bold"
                style={{
                  color: project.color,
                  borderColor: `${project.color}55`,
                  backgroundColor: `${project.color}14`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                {project.tag}
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.92] uppercase mb-6 md:mb-8 break-words">
                {project.title}
                <span style={{ color: project.color }}>.</span>
              </h1>

              <p className="text-lg md:text-2xl text-zinc-300 font-light leading-snug tracking-normal max-w-3xl">
                {project.description}
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-end gap-8 lg:gap-12">
            {/* Meta grid — works better on mobile than the original column layout */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-600 font-black mb-2">
                  Year
                </p>
                <p className="text-base font-bold text-white tracking-tight">{project.year}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-600 font-black mb-2">
                  Role
                </p>
                <p className="text-base font-bold text-white tracking-tight">Design + Build</p>
              </div>
              <div className="col-span-2">
                <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-600 font-black mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-full text-[10px] uppercase tracking-widest font-black text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-5 md:p-6 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-[0.18em] group transition-all duration-500 min-h-[64px]"
            >
              <span className="inline-flex items-center gap-3">
                <Globe size={18} />
                Launch site
              </span>
              <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform duration-500" />
            </motion.a>
          </div>
        </div>

        {/* Parallax image */}
        <div
          ref={containerRef}
          className="relative aspect-[4/5] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl"
        >
          <motion.div style={{ scale: imageScale, y: imageY }} className="w-full h-full">
            <img
              src={project.image}
              alt={project.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="100vw"
              className="w-full h-full object-cover grayscale-[15%] transition-all duration-1000"
            />
          </motion.div>
        </div>
      </div>

      {/* Up next */}
      <section className="mt-24 md:mt-32 border-t border-white/5">
        <Link
          to={`/work/${nextProject.id}`}
          className="group block py-20 md:py-28 px-5 md:px-12 hover:bg-zinc-900/30 transition-colors"
        >
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-black mb-4 md:mb-6 block">
                Up Next · {String(((projectIndex + 1) % PROJECTS.length) + 1).padStart(2, "0")} of{" "}
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.95] group-hover:italic transition-all duration-700">
                {nextProject.title}
              </h2>
            </div>
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500"
              style={{ borderColor: `${nextProject.color}55` }}
            >
              <ArrowUpRight className="w-7 h-7 md:w-10 md:h-10 text-white group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
        </Link>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;
