import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PERSONAL, NAV_LINKS } from "../../constants";
import EmailMe from "../ui/EmailMe";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black pt-20 md:pt-28 pb-12 px-5 md:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-20">

          <div className="lg:col-span-7">
            <motion.h2
              className="text-5xl sm:text-6xl md:text-6xl font-bold tracking-tight leading-none uppercase mb-8"
            >
              Start a <br />
              <span className="text-secondary italic font-light tracking-tight">Conversation<span className="text-primary">.</span></span>
            </motion.h2>

            <div className="flex flex-col gap-5">
              <EmailMe
                variant="solid"
                label="Email me directly"
                subject="Hey Mohammed — saw your work"
              />
              <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-600 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for work · Replies within ~24h
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Navigation</h3>
              <div className="flex flex-col gap-3 text-xs font-bold uppercase tracking-widest">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-zinc-400 hover:text-white transition-colors w-fit min-h-[24px]"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Socials</h3>
              <div className="flex flex-col gap-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                <a href={`https://github.com/${PERSONAL.github}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">Github</a>
                <a href={`https://instagram.com/${PERSONAL.instagram}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">Instagram</a>
                <a href={`https://x.com/${PERSONAL.x}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">X / Twitter</a>
                <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">LinkedIn</a>
                <span className="text-zinc-500">Discord · {PERSONAL.discord}</span>
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
