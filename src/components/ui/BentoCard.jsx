import { motion } from "framer-motion";

const BentoCard = ({ title, subtitle, className, icon: Icon, children }) => {
  // Check if we're on mobile to toggle certain animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div 
      // Only lift on desktop; on mobile, we use a subtle scale-down on tap (active)
      whileHover={!isMobile ? { y: -8 } : {}}
      whileTap={isMobile ? { scale: 0.98 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-white/5 flex flex-col justify-between min-h-[340px] md:min-h-[380px] overflow-hidden group ${className}`}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        {children}
      </div>

      {/* Content Layer - Top (Icon) */}
      <div className="relative z-10 pointer-events-none">
        {Icon && (
          <Icon 
            size={isMobile ? 28 : 32} 
            className="text-white opacity-80 mb-4 group-hover:scale-110 transition-transform duration-700 transform-gpu" 
          />
        )}
      </div>

      {/* Content Layer - Bottom (Text) */}
      <div className="relative z-10 pointer-events-none mt-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase leading-[0.9] md:leading-none">
          {title}
        </h2>
        <p className="text-[10px] md:text-sm font-mono uppercase tracking-[0.2em] opacity-70 mt-3 md:mt-4 text-primary antialiased">
          {subtitle}
        </p>
      </div>

      {/* Visual Polish: Subtle inner border for depth */}
      <div className="absolute inset-0 border border-white/5 rounded-[32px] md:rounded-[40px] pointer-events-none z-20" />
    </motion.div>
  );
};

export default BentoCard;