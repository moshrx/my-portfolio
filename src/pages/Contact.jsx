import { motion } from "framer-motion";
import { Instagram, Github, Linkedin, MessageCircle } from "lucide-react";
import { PERSONAL } from "../constants";
import EmailMe from "../components/ui/EmailMe";

const appleEasing = [0.22, 1, 0.36, 1];

const XIcon = ({ size = 16, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2H21.5l-7.12 8.137L22 22h-5.95l-4.66-6.093L6.06 22H2.8l7.61-8.693L2 2h6.1l4.21 5.555L18.244 2Zm-1.14 18h1.8L7.12 3.895H5.2L17.104 20Z" />
  </svg>
);

const Contact = () => {
  const socialLinks = [
    { label: "Instagram", href: `https://instagram.com/${PERSONAL.instagram}`, icon: Instagram, handle: `@${PERSONAL.instagram}` },
    { label: "GitHub", href: `https://github.com/${PERSONAL.github}`, icon: Github, handle: PERSONAL.github },
    { label: "LinkedIn", href: PERSONAL.linkedin, icon: Linkedin, handle: PERSONAL.github },
    { label: "X", href: `https://x.com/${PERSONAL.x}`, icon: XIcon, handle: `@${PERSONAL.x}` },
    { label: "Discord", href: null, icon: MessageCircle, handle: PERSONAL.discord },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: appleEasing }}
      className="pt-28 md:pt-36 px-5 md:px-12 pb-20 md:pb-28 max-w-3xl mx-auto"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: appleEasing }}
      >
        <span className="text-primary font-mono uppercase text-[10px] tracking-[0.4em] mb-6 block font-black">
          Contact · 003
        </span>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] uppercase mb-8">
          Say hi<span className="text-primary">.</span>
        </h1>

        <p className="text-base md:text-xl text-zinc-400 mb-12 max-w-md leading-relaxed font-light">
          Email is the surest way to reach me.
        </p>

        <div className="max-w-md">
          <EmailMe
            variant="hero"
            label="Email me"
            subject="Hey Mohammed"
            ariaLabel="Open email draft to Mohammed"
          />
        </div>

        {/* Elsewhere */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-black mb-6">
            Elsewhere
          </h2>
          <div className="flex flex-col">
            {socialLinks.map((s) => {
              const inner = (
                <>
                  <span className="flex items-center gap-4">
                    <s.icon size={16} className="text-zinc-500" />
                    <span className="text-sm uppercase tracking-[0.2em] font-bold">{s.label}</span>
                  </span>
                  <span className="text-[11px] tracking-widest text-zinc-600 font-mono">
                    {s.handle}
                  </span>
                </>
              );

              return s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-6 border-b border-white/5 py-5 text-zinc-300 hover:text-white transition-colors min-h-[44px]"
                >
                  {inner}
                </a>
              ) : (
                <span
                  key={s.label}
                  className="flex items-center justify-between gap-6 border-b border-white/5 py-5 text-zinc-500 min-h-[44px]"
                >
                  {inner}
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
