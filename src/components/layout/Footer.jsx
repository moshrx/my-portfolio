import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL, NAV_LINKS } from "../../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const appleEasing = [0.22, 1, 0.36, 1];

  return (
    <footer className="relative bg-black pt-40 pb-12 px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/4" />

      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          
          {/* Left Side: Call to Action */}
          <div className="lg:col-span-7">
            <motion.h2 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: appleEasing }}
  className="text-[10vw] md:text-[7vw] font-bold tracking-tighter leading-[0.8] uppercase mb-12"
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
              className="group inline-flex items-center gap-6 text-2xl md:text-4xl font-medium tracking-tight hover:text-primary transition-all duration-500"
            >
              {PERSONAL.email}
              <div className="p-4 rounded-full border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.a>
          </div>

          {/* Right Side: Sitemap & Socials */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-12 pt-10 lg:pt-0">
            <div className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Navigation</h3>
              <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest">
                {NAV_LINKS.map((link) => (
                  <Link key={link.name} to={link.href} className="text-zinc-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Socials</h3>
              <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest">
                <a href={`https://instagram.com/${PERSONAL.instagram}`} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">Instagram</a>
                <a href={`https://github.com/${PERSONAL.github}`} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">Github</a>
                <a href={`mailto:${PERSONAL.email}`} className="text-zinc-400 hover:text-white transition-colors">Email</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="flex items-center gap-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">© {currentYear} Moshr.</span>
            <span className="hidden md:block h-3 w-[1px] bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">Based in PEI, Canada</span>
          </div>

          <div className="flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] text-zinc-700 font-black">
            <span>Designed with Intent</span>
            <div className="flex gap-4">
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