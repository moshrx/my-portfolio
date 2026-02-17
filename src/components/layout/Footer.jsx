import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL, NAV_LINKS } from "../../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const appleEasing = [0.22, 1, 0.36, 1];
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <footer className="relative bg-black pt-24 md:pt-40 pb-8 md:pb-12 px-4 md:px-12 overflow-hidden border-t border-white/5">
      {/* Background Decorative Element: Scaled down for mobile performance */}
      <div className="absolute bottom-0 right-0 w-[80%] md:w-[60%] h-[40%] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/4 will-change-transform" />

      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-24 md:mb-40">
          
          {/* Left Side: Call to Action */}
          <div className="lg:col-span-7">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: appleEasing }}
              className="text-[16vw] md:text-[7vw] font-bold tracking-tighter leading-[0.8] uppercase mb-10 md:mb-12"
            >
              Start a <br />
              <span className="text-secondary italic font-light tracking-tight">Conversation.</span>
            </motion.h2>
            
            <motion.a 
              href={`mailto:${PERSONAL.email}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group inline-flex items-center gap-4 md:gap-6 text-xl md:text-4xl font-medium tracking-tight hover:text-primary transition-all duration-500 active:scale-95"
            >
              <span className="break-all">{PERSONAL.email}</span>
              <div className="p-3 md:p-4 rounded-full border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shrink-0">
                <ArrowUpRight size={isMobile ? 20 : 28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.a>
          </div>

          {/* Right Side: Sitemap & Socials */}
          {/* Changed gap for mobile, kept 2 cols unless screen is extremely narrow */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 md:gap-12 pt-12 lg:pt-0">
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Navigation</h3>
              <div className="flex flex-col gap-3 md:gap-4 text-[11px] md:text-sm font-bold uppercase tracking-widest">
                {NAV_LINKS.map((link) => (
                  <Link key={link.name} to={link.href} className="text-zinc-400 hover:text-white transition-colors py-1">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Socials</h3>
              <div className="flex flex-col gap-3 md:gap-4 text-[11px] md:text-sm font-bold uppercase tracking-widest">
                <a href={`https://instagram.com/${PERSONAL.instagram}`} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors py-1">Instagram</a>
                <a href={`https://github.com/${PERSONAL.github}`} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors py-1">Github</a>
                <a href={`mailto:${PERSONAL.email}`} className="text-zinc-400 hover:text-white transition-colors py-1">Email</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-600">© {currentYear} Moshr.</span>
            <span className="hidden md:block h-3 w-[1px] bg-white/10" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-600">Based in PEI, Canada</span>
          </div>

          <div className="flex items-center gap-8 md:gap-12 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-700 font-black">
            <span className="hidden sm:inline">Designed with Intent</span>
            <div className="flex gap-3 md:gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;