import { motion } from "framer-motion";
import { memo } from "react";
import { GALLERY_IMAGES } from "../constants";

const appleEasing = [0.22, 1, 0.36, 1];

const GalleryImage = memo(({ img, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{
      duration: 1,
      delay: (i % 3) * 0.1,
      ease: appleEasing,
    }}
    className={`relative group overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/5
      ${i % 3 === 1 ? "md:translate-y-12" : ""}
      ${i % 3 === 2 ? "md:translate-y-24" : ""}
    `}
  >
    <div className="overflow-hidden">
      <img
        src={img.src}
        alt={img.alt}
        loading={i < 3 ? "eager" : "lazy"}
        fetchPriority={i < 3 ? "high" : "low"}
        decoding="async"
        sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 30vw"
        className="w-full h-full object-cover aspect-[4/5] sm:aspect-square md:aspect-[3/4] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
    </div>

    {/* Simple Clean Overlay: Only shows ID on hover */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-start justify-end p-8">
      <span className="text-xs font-mono text-white/50">
        REF: {String(img.id).padStart(3, '0')}
      </span>
    </div>
  </motion.div>
));

const Gallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-28 md:pt-36 pb-24 md:pb-28 px-5 md:px-12"
    >
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary font-mono text-[10px] uppercase tracking-[0.35em] font-black mb-5"
          >
            Visual Log — 001
          </motion.p>
          <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl font-bold tracking-tight uppercase leading-none mix-blend-difference">
            The <br />
            <span className="italic font-light tracking-tight text-zinc-400">Archives<span className="text-primary">.</span></span>
          </h1>
        </div>

        <div className="flex items-center gap-8 border-l border-white/10 pl-8">
          <div>
            <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest mb-1">
              Quantity
            </p>
            <span className="text-3xl font-light tracking-tight text-white">
              {GALLERY_IMAGES.length}
            </span>
          </div>
          <div>
            <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest mb-1">
              Location
            </p>
            <span className="text-sm font-bold tracking-tighter text-white uppercase">
              Global
            </span>
          </div>
        </div>
      </div>

      {/* Modern Offset Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {GALLERY_IMAGES.map((img, i) => (
          <GalleryImage key={img.id} img={img} i={i} />
        ))}
      </div>

      {/* Horizontal Scroll Banner */}
      <div className="mt-24 md:mt-32 border-t border-white/10 pt-8 overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 text-5xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 opacity-50 select-none"
        >
          <span>Visual Journal</span>
          <span>Perspective</span>
          <span>Visual Journal</span>
          <span>Perspective</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Gallery;
