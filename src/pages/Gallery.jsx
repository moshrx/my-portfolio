import { motion, AnimatePresence } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { GALLERY_IMAGES } from "../constants";

const appleEasing = [0.22, 1, 0.36, 1];

/**
 * GalleryImage — single tile, click-to-open in lightbox.
 * Mobile staggering uses CSS only (no JS layout cost).
 */
const GalleryImage = memo(({ img, i, onOpen }) => {
  const stagger = i % 3;
  const offsetClass =
    stagger === 1
      ? "md:translate-y-12"
      : stagger === 2
      ? "md:translate-y-24"
      : "";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(i)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 1,
        delay: stagger * 0.08,
        ease: appleEasing,
      }}
      whileHover={{ y: -6 }}
      className={`relative group overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/5 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${offsetClass}`}
      aria-label={`Open ${img.alt} in viewer`}
    >
      <div className="overflow-hidden">
        <img
          src={img.src}
          alt={img.alt}
          loading={i < 3 ? "eager" : "lazy"}
          fetchPriority={i < 3 ? "high" : "low"}
          decoding="async"
          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 30vw"
          className="w-full h-full object-cover aspect-[4/5] sm:aspect-square md:aspect-[3/4] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>

      {/* Hover overlay: REF + expand hint */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-5 md:p-6">
        <span className="self-end text-[10px] font-mono text-white/60 uppercase tracking-widest">
          REF: {String(img.id).padStart(3, "0")}
        </span>
        <div className="self-start inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white font-bold">
          <Expand size={12} />
          <span>View</span>
        </div>
      </div>
    </motion.button>
  );
});

GalleryImage.displayName = "GalleryImage";

/**
 * Lightbox — modal viewer with arrow + keyboard nav.
 */
const Lightbox = ({ images, openIndex, onClose, onPrev, onNext }) => {
  const open = openIndex !== null;
  const current = open ? images[openIndex] : null;

  // Keyboard handlers
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, onPrev, onNext]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer · ${current.alt}`}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-12 h-12 rounded-full border border-white/15 bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <span className="absolute top-7 left-5 md:top-10 md:left-10 z-10 text-[10px] uppercase tracking-[0.4em] text-white/60 font-bold">
            {String(openIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-8 z-10 w-12 h-12 rounded-full border border-white/15 bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-8 z-10 w-12 h-12 rounded-full border border-white/15 bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <ChevronRight size={22} />
          </button>

          {/* Image */}
          <motion.img
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: appleEasing }}
            src={current.src}
            alt={current.alt}
            className="max-h-[88svh] max-w-[92vw] object-contain rounded-xl shadow-[0_30px_120px_-20px_rgba(0,113,227,0.35)]"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50 font-bold">
            REF: {String(current.id).padStart(3, "0")} · Tap outside to close
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const Gallery = () => {
  const images = useMemo(() => GALLERY_IMAGES, []);
  const [openIndex, setOpenIndex] = useState(null);

  const handleOpen = useCallback((i) => setOpenIndex(i), []);
  const handleClose = useCallback(() => setOpenIndex(null), []);
  const handlePrev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const handleNext = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-28 md:pt-36 pb-24 md:pb-28 px-5 md:px-12"
    >
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary font-mono text-[10px] uppercase tracking-[0.35em] font-black mb-5"
          >
            Visual Log · 001
          </motion.p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase leading-[0.95]">
            The <br />
            <span className="italic font-light tracking-tight text-zinc-400">
              Archives<span className="text-primary">.</span>
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-8 border-l border-white/10 pl-8">
          <div>
            <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest mb-1">
              Quantity
            </p>
            <span className="text-3xl font-light tracking-tight text-white">
              {images.length}
            </span>
          </div>
          <div>
            <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest mb-1">
              Tap a frame
            </p>
            <span className="text-sm font-bold tracking-tighter text-white uppercase">
              Open viewer
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {images.map((img, i) => (
          <GalleryImage key={img.id} img={img} i={i} onOpen={handleOpen} />
        ))}
      </div>

      {/* Bottom Marquee */}
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

      <Lightbox
        images={images}
        openIndex={openIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </motion.div>
  );
};

export default Gallery;
