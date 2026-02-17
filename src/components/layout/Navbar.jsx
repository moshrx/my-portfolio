import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Instagram, Github, Menu, X } from "lucide-react";
import { PERSONAL, NAV_LINKS } from "../../constants";

/**
 * Magnetic Component: Pulls elements toward the cursor
 */
const MagneticElement = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e) => {
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
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-[0.22, 1, 0.36, 1] ${
        scrolled ? "py-4 bg-black/40 backdrop-blur-2xl border-b border-white/5" : "py-10 bg-transparent"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* LOGO: Magnetic & High-Contrast */}
        <MagneticElement strength={0.2}>
          <Link to="/" className="text-2xl font-black tracking-tighter uppercase mix-blend-difference z-[110] block">
            Moshr<span className="text-primary">.</span>
          </Link>
        </MagneticElement>

        {/* DESKTOP LINKS */}
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

          {/* SOCIALS */}
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

        {/* MOBILE TOGGLE */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-[110] p-2 text-white">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 10%)" }}
            animate={{ clipPath: "circle(150% at 90% 10%)" }}
            exit={{ clipPath: "circle(0% at 90% 10%)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-primary z-[100] flex flex-col justify-center items-center gap-6"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Link to={link.href} className="text-6xl font-bold tracking-tighter uppercase hover:italic">
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;