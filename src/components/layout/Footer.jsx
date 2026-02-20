import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL, NAV_LINKS } from "../../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black pt-24 md:pt-40 pb-12 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          <div className="lg:col-span-7">
            <motion.h2 
              className="text-[12.5vw] md:text-[7vw] font-bold tracking-tighter leading-[0.85] uppercase mb-10"
            >
              Start a <br />
              <span className="text-secondary italic font-light tracking-tight">Conversation<span className="text-primary">.</span></span>
            </motion.h2>
            
            <a href={`mailto:${PERSONAL.email}`} className="group inline-flex items-center gap-4 text-lg md:text-4xl font-medium tracking-tight break-all">
              {PERSONAL.email}
              <div className="p-3 rounded-full border border-white/10 group-hover:bg-primary transition-all">
                <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7" />
              </div>
            </a>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Navigation</h3>
              <div className="flex flex-col gap-3 text-xs font-bold uppercase tracking-widest">
                {NAV_LINKS.map(link => <Link key={link.name} to={link.href} className="text-zinc-400">{link.name}</Link>)}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Socials</h3>
              <div className="flex flex-col gap-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                <a href={`https://github.com/${PERSONAL.github}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Github</a>
                <a href={`https://instagram.com/${PERSONAL.instagram}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href={`https://x.com/${PERSONAL.x}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X / Twitter</a>
                <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                <span className="text-zinc-500">Discord: {PERSONAL.discord}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6 text-[9px] uppercase tracking-widest text-zinc-600 font-bold">
          <p>© {currentYear} MOSHR — BASED IN PEI</p>
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
             <span>DESIGNED WITH INTENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
