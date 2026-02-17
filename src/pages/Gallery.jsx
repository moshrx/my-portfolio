import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "../constants";

const Gallery = () => {
  // Pure cubic-bezier for hardware acceleration
  const appleEasing = [0.22, 1, 0.36, 1];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black pt-44 pb-32 px-6 md:px-12"
    >
      <div className="max-w-[1800px] mx-auto mb-32 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <motion.p className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] font-black mb-6">
            Spatial Perspectives — 001
          </motion.p>
          <h1 className="text-[14vw] md:text-[9vw] font-bold tracking-tighter uppercase leading-[0.75]">
            Visual <br />
            <span className="text-secondary italic font-light tracking-tight">Archives.</span>
          </h1>
        </div>
        <div className="md:text-right">
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-2">Collection Size</p>
          <span className="text-5xl font-light tracking-tighter text-white/20">
            {GALLERY_IMAGES.length < 10 ? `0${GALLERY_IMAGES.length}` : GALLERY_IMAGES.length}
          </span>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1800px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={img.id}
            // Optimization: Simplified initial states
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ 
              duration: 0.8, 
              delay: (i % 3) * 0.1, 
              ease: appleEasing 
            }}
            // Optimization: 'will-change' tells the GPU to prepare for movement
            style={{ willChange: "transform, opacity" }}
            className="relative group overflow-hidden rounded-[40px] bg-zinc-900 border border-white/5"
          >
            <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            
            <motion.img 
              src={img.src} 
              alt={img.alt}
              loading="lazy"
              decoding="async" // Optimization: Offloads image decoding from the main thread
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: appleEasing }}
              className="w-full h-auto object-cover"
            />

            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-12 flex flex-col justify-end pointer-events-none">
               <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">
                  {img.location}
               </span>
               <p className="text-3xl font-bold tracking-tighter text-white italic leading-none">
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