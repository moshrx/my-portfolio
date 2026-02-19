import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Instagram, Github, Menu, X } from "lucide-react";
import { PERSONAL, NAV_LINKS } from "../../constants";

/**
 * Magnetic Component: Optimized for Desktop only
 */
const MagneticElement = memo(({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e) => {
    if (window.innerWidth < 768) return; 
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 30;
    setScrolled(prev => prev !== isScrolled ? isScrolled : prev);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [location]);

  return (
    // Ensure the main nav container has a slightly lower z-index than the menu overlay
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled && !isOpen
          ? "py-4 bg-black/60 backdrop-blur-xl border-b border-white/5" 
          : "py-8 md:py-10 bg-transparent"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-12 flex justify-between items-center">
        
        {/* LOGO: High z-index to stay visible above the menu if needed */}
        <MagneticElement strength={0.2}>
          <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter uppercase z-[120] relative">
            Moshr<span className="text-primary">.</span>
          </Link>
        </MagneticElement>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">
            {NAV_LINKS.map((link) => (
              <MagneticElement key={link.name} strength={0.4}>
                <Link 
                  to={link.href} 
                  className={`hover:text-white transition-colors duration-500 ${
                    location.pathname === link.href ? "text-white italic" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </MagneticElement>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-white/10 mx-2" />

          <div className="flex gap-6 text-zinc-400">
            <MagneticElement strength={0.5}>
              <a href={`https://instagram.com/${PERSONAL.instagram}`} target="_blank" rel="noreferrer" className="hover:text-white transition-all">
                <Instagram size={18} />
              </a>
            </MagneticElement>
            <MagneticElement strength={0.5}>
              <a href={`https://github.com/${PERSONAL.github}`} target="_blank" rel="noreferrer" className="hover:text-white transition-all">
                <Github size={18} />
              </a>
            </MagneticElement>
          </div>
        </div>

        {/* MOBILE TOGGLE: Highest z-index to stay clickable */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          className="md:hidden z-[120] relative w-10 h-10 flex items-center justify-center text-white focus:outline-none"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            // FIX: Set z-[110] (between nav and toggle) and use bg-black (Opaque)
            className="fixed inset-0 bg-black z-[110] flex flex-col px-8 pt-40"
          >
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none noise-overlay"
            />
            
            <div className="flex flex-col gap-6 md:gap-8">
              <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold mb-2">Sitemap</p>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <Link 
                    to={link.href} 
                    className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase flex items-center gap-4 group"
                  >
                    <span className="text-zinc-800 font-mono text-xs sm:text-sm">0{i+1}</span>
                    <span className={location.pathname === link.href ? "text-primary italic" : "text-white"}>
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-12 flex justify-between items-end border-t border-white/5 pt-8">
              <div className="flex gap-8">
                <a href={`https://instagram.com/${PERSONAL.instagram}`} className="text-xs font-bold uppercase tracking-widest text-zinc-400">Ig</a>
                <a href={`https://github.com/${PERSONAL.github}`} className="text-xs font-bold uppercase tracking-widest text-zinc-400">Gh</a>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-zinc-600">PEI, Canada</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
