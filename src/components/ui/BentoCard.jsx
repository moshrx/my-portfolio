import { motion } from "framer-motion";

const BentoCard = ({ title, subtitle, className, icon: Icon, children }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative p-10 rounded-[40px] border border-white/5 flex flex-col justify-between min-h-[380px] overflow-hidden group ${className}`}
    >
      {/* Background Image Layer (Rendered via children in Home.jsx) */}
      {children}

      {/* Content Layer - Forced to Foreground */}
      <div className="relative z-10 pointer-events-none">
        {Icon && <Icon size={32} className="text-white opacity-80 mb-4 group-hover:scale-110 transition-transform duration-700" />}
      </div>

      <div className="relative z-10 pointer-events-none">
        <h2 className="text-4xl font-bold tracking-tighter uppercase leading-none">{title}</h2>
        <p className="text-sm font-mono uppercase tracking-[0.2em] opacity-60 mt-4 text-primary">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export default BentoCard;