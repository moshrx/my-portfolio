import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { PERSONAL } from "../../constants";

/**
 * EmailMe — single source of truth for "open mailto" CTAs.
 * The address itself is never rendered as text. Subject + body are prefilled
 * so the user lands in a clean draft.
 *
 * Variants:
 *  - hero: oversized button (Contact page primary CTA)
 *  - solid: filled white pill (Footer)
 *  - ghost: outlined pill (Navbar / inline)
 *  - inline: compact text + arrow (ChatBot replies)
 */

const SUBJECT = "Hey Mohammed";
const BODY = "Hi Mohammed,\n\n";

const buildHref = (subject = SUBJECT, body = BODY) =>
  `mailto:${PERSONAL.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

const EmailMe = memo(
  ({
    variant = "solid",
    label = "Email me",
    subject,
    body,
    className = "",
    icon = true,
    ariaLabel = "Send Mohammed an email",
  }) => {
    const href = buildHref(subject, body);

    if (variant === "hero") {
      return (
        <motion.a
          href={href}
          aria-label={ariaLabel}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`group relative inline-flex w-full items-center justify-between gap-6 overflow-hidden rounded-3xl bg-white px-6 py-6 md:px-9 md:py-8 text-black shadow-[0_30px_80px_-30px_rgba(0,113,227,0.45)] transition-colors duration-500 hover:bg-primary hover:text-white ${className}`}
        >
          <span className="flex flex-col items-start text-left">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black opacity-60">
              Direct
            </span>
            <span className="mt-2 text-2xl md:text-4xl font-bold tracking-tight uppercase leading-none">
              {label}
            </span>
          </span>
          <span className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 transition-all duration-500 group-hover:bg-white group-hover:text-primary group-hover:rotate-45">
            <ArrowUpRight className="w-6 h-6" />
          </span>
        </motion.a>
      );
    }

    if (variant === "solid") {
      return (
        <motion.a
          href={href}
          aria-label={ariaLabel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 md:px-7 md:py-4 text-black font-bold text-sm md:text-base tracking-tight transition-colors duration-500 hover:bg-primary hover:text-white ${className}`}
        >
          {icon && <Mail size={16} className="opacity-70" />}
          <span>{label}</span>
          <ArrowUpRight
            size={16}
            className="transition-transform duration-500 group-hover:rotate-45"
          />
        </motion.a>
      );
    }

    if (variant === "ghost") {
      return (
        <motion.a
          href={href}
          aria-label={ariaLabel}
          whileTap={{ scale: 0.97 }}
          className={`group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.25em] font-black text-white/80 hover:text-white hover:border-white/40 transition-colors ${className}`}
        >
          {icon && <Mail size={13} />}
          <span>{label}</span>
        </motion.a>
      );
    }

    // inline — used inside chatbot bubbles, etc.
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={`inline-flex items-center gap-1.5 text-primary hover:underline text-sm font-medium ${className}`}
      >
        {icon && <Mail size={14} />}
        <span>{label}</span>
        <ArrowUpRight size={14} />
      </a>
    );
  }
);

EmailMe.displayName = "EmailMe";

export default EmailMe;
