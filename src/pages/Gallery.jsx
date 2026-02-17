import { motion } from "framer-motion";

const Gallery = () => {
  // These should be saved in /public/assets/gallery/
  const items = [1, 2, 3, 4, 5, 6]; 

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-40 px-6 md:px-12 pb-32"
    >
      <div className="mb-24">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter italic uppercase">Moments.</h1>
        <p className="text-xl text-secondary mt-4">A visual diary of sunsets, coffee, and the island.</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((id) => (
          <motion.div 
            key={id} 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[30px] overflow-hidden bg-surface group"
          >
            {/* Replace "src" with your actual image paths */}
            <img 
              src={`/assets/gallery/photo-${id}.jpg`} 
              alt="Gallery" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              onError={(e) => e.target.style.display = 'none'} // Hides if image missing
            />
            <div className="aspect-[4/5] bg-zinc-900 flex items-center justify-center text-zinc-700 italic">
               Image {id}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Gallery;