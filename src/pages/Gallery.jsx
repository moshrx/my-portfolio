import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "../constants";

const Gallery = () => {
  const appleEasing = [0.22, 1, 0.36, 1];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Adjusted padding for mobile (pt-32 instead of pt-44)
      className="min-h-screen bg-black pt-32 md:pt-44 pb-20 px-4 md:px-12"
    >
      {/* Header Section */}
      <div className="max-w-[1800px] mx-auto mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black mb-4 md:mb-6"
          >
            Spatial Perspectives — 001
          </motion.p>
          <h1 className="text-[18vw] md:text-[9vw] font-bold tracking-tighter uppercase leading-[0.8] md:leading-[0.75]">
            Visual <br />
            <span className="text-secondary italic font-light tracking-tight">Archives.</span>
          </h1>
        </div>
        
        {/* Collection counter hidden or simplified on small mobile to reduce clutter */}
        <div className="hidden sm:block md:text-right">
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-2">Collection Size</p>
          <span className="text-5xl font-light tracking-tighter text-white/20">
            {GALLERY_IMAGES.length < 10 ? `0${GALLERY_IMAGES.length}` : GALLERY_IMAGES.length}
          </span>
        </div>
      </div>

      {/* Optimized Masonry Grid */}
      {/* columns-1 for mobile, columns-2 for tablet, columns-3 for desktop */}
      <div className="max-w-[1800px] mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ 
              duration: 0.8, 
              delay: (i % 3) * 0.05, 
              ease: appleEasing 
            }}
            style={{ willChange: "transform, opacity" }}
            // Smaller border radius for mobile (rounded-3xl)
            className="relative group overflow-hidden rounded-[32px] md:rounded-[40px] bg-zinc-900 border border-white/5"
          >
            {/* Overlay: Slightly more visible on mobile by default */}
            <div className="absolute inset-0 z-10 bg-black/10 md:group-hover:bg-transparent transition-colors duration-500" />
            
            <motion.img 
              src={img.src} 
              alt={img.alt}
              loading="lazy"
              decoding="async"
              // Disable hover scale on mobile to prevent accidental zoom-jitter while scrolling
              whileHover={{ scale: window.innerWidth > 768 ? 1.03 : 1 }}
              transition={{ duration: 0.6, ease: appleEasing }}
              className="w-full h-auto object-cover"
            />

            {/* Caption Logic: Always visible on mobile, Hover-only on Desktop */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
               <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 md:mb-3">
                  {img.location}
               </span>
               <p className="text-xl md:text-3xl font-bold tracking-tighter text-white italic leading-none">
                  {img.caption}
               </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Gallery;