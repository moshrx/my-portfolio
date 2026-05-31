import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../constants";
import ProjectRow from "../components/ui/ProjectRow";
import EmailMe from "../components/ui/EmailMe";

const appleEasing = [0.22, 1, 0.36, 1];

// Group projects into broad buckets driven by `tag`
const CATEGORY_RULES = [
  { id: "all", label: "All", match: () => true },
  { id: "ai", label: "AI", match: (t) => /ai/i.test(t) },
  { id: "local", label: "Local", match: (t) => /local|community|federation|sport/i.test(t) },
  { id: "ecom", label: "E-commerce", match: (t) => /commerce|retail|shop/i.test(t) },
  { id: "food", label: "Food & Café", match: (t) => /caf|bakery|restaurant|food/i.test(t) },
  { id: "tool", label: "Tools", match: (t) => /tool|pdf|product/i.test(t) },
];

const Work = () => {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    const rule = CATEGORY_RULES.find((r) => r.id === active) || CATEGORY_RULES[0];
    if (active === "all") return PROJECTS;
    return PROJECTS.filter((p) => rule.match(p.tag || ""));
  }, [active]);

  // Pre-compute counts for each category chip
  const counts = useMemo(() => {
    const out = {};
    CATEGORY_RULES.forEach((rule) => {
      if (rule.id === "all") {
        out[rule.id] = PROJECTS.length;
      } else {
        out[rule.id] = PROJECTS.filter((p) => rule.match(p.tag || "")).length;
      }
    });
    return out;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black min-h-screen"
    >
      <section className="px-5 md:px-12 pt-28 md:pt-36 pb-24 md:pb-28 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: appleEasing }}
          >
            <span className="text-primary font-mono uppercase text-[10px] tracking-[0.4em] mb-6 block font-black">
              Index · 2026
            </span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] uppercase">
              Recent <br />
              <span className="text-secondary italic font-light">builds<span className="text-primary">.</span></span>
            </h1>
          </motion.div>
        </div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: appleEasing }}
          className="mb-8 md:mb-12 flex flex-wrap gap-2 md:gap-3"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORY_RULES.map((rule) => {
            const isActive = active === rule.id;
            const count = counts[rule.id] || 0;
            const disabled = count === 0;
            return (
              <button
                key={rule.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                disabled={disabled}
                onClick={() => setActive(rule.id)}
                className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.25em] font-black transition-all duration-300 min-h-[40px]
                  ${isActive
                    ? "bg-white text-black border border-white"
                    : "bg-white/[0.03] text-zinc-400 border border-white/10 hover:text-white hover:border-white/30"}
                  ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                <span>{rule.label}</span>
                <span
                  className={`text-[9px] font-mono ${
                    isActive ? "text-zinc-500" : "text-zinc-600 group-hover:text-zinc-400"
                  }`}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Sub-header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 border-b border-white/10 pb-5 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">
              Project Directory
            </h2>
            <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[9px] font-bold border border-white/5">
              {filtered.length} / {PROJECTS.length}
            </span>
          </div>
          <p className="text-zinc-600 text-[10px] md:text-xs font-mono max-w-[260px] md:text-right italic">
            Stuff I've shipped, built for speed and feel.
          </p>
        </div>

        {/* Project rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="divide-y divide-white/5"
          >
            {filtered.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
            {filtered.length === 0 && (
              <p className="py-16 text-center text-sm text-zinc-500">
                Nothing in this category yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-24 text-center"
        >
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-6">
            Got something in mind?
          </p>
          <div className="flex justify-center">
            <EmailMe variant="solid" label="Let's get into it" subject="Project inquiry" />
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Work;
