import { memo } from "react";
import GenerativeMark from "./GenerativeMark";

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const luminance = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

const SIZE = {
  sm: {
    title: "text-2xl md:text-3xl",
    meta: "text-[9px]",
    padding: "p-5 md:p-7",
  },
  md: {
    title: "text-4xl md:text-5xl",
    meta: "text-[10px]",
    padding: "p-6 md:p-8",
  },
  lg: {
    title: "text-5xl sm:text-6xl md:text-7xl",
    meta: "text-[11px]",
    padding: "p-8 md:p-12",
  },
};

const ProjectArtwork = memo(({ project, size = "md", showMeta = true, showTitle = true, className = "" }) => {
  const sizeCfg = SIZE[size] || SIZE.md;
  const isLight = luminance(project.color) > 0.65;
  const fg = isLight ? "text-black" : "text-white";
  const metaColor = isLight ? "text-black/65" : "text-white/65";

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${fg} ${className}`}
      style={{ backgroundColor: project.color }}
      aria-hidden="true"
    >
      {/* Generative composition (per-project, seeded) */}
      <GenerativeMark project={project} />

      {/* Soft directional light — adds depth on top of the composition */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.14), transparent 55%)",
        }}
      />
      {/* Bottom darken for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Foreground content */}
      <div className={`relative h-full flex flex-col justify-between ${sizeCfg.padding}`}>
        {showMeta ? (
          <div className={`flex items-center justify-between ${sizeCfg.meta} uppercase tracking-[0.3em] font-bold ${metaColor}`}>
            <span>{project.tag}</span>
            <span className="font-mono">{project.year}</span>
          </div>
        ) : (
          <span />
        )}

        {showTitle ? (
          <h3 className={`${sizeCfg.title} font-black tracking-tight uppercase leading-[0.92]`}>
            {project.title}
          </h3>
        ) : null}
      </div>

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay noise-overlay pointer-events-none" />
    </div>
  );
});

ProjectArtwork.displayName = "ProjectArtwork";

export default ProjectArtwork;
