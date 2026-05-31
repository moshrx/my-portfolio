import { motion } from "framer-motion";
import { useState } from "react";
import { Instagram, Github, Linkedin, MessageCircle } from "lucide-react";
import { PERSONAL } from "../constants";
import EmailMe from "../components/ui/EmailMe";

const appleEasing = [0.22, 1, 0.36, 1];
const MAX_MESSAGE = 600;

const XIcon = ({ size = 16, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2H21.5l-7.12 8.137L22 22h-5.95l-4.66-6.093L6.06 22H2.8l7.61-8.693L2 2h6.1l4.21 5.555L18.244 2Zm-1.14 18h1.8L7.12 3.895H5.2L17.104 20Z" />
  </svg>
);

const FloatingField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = true,
  multiline = false,
  rows = 4,
  maxLength,
  helper,
  error,
}) => {
  const filled = value.length > 0;
  const InputTag = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      <InputTag
        id={id}
        name={id}
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
        className={`peer block w-full bg-white/[0.02] border rounded-2xl px-4 pt-7 pb-3 text-base md:text-lg font-light text-white outline-none transition-colors duration-300
          ${error ? "border-red-400/60" : "border-white/10 focus:border-primary"}
          ${multiline ? "resize-none min-h-[140px]" : ""}`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-300
          ${filled ? "top-2 text-[10px] tracking-[0.3em] uppercase text-primary font-bold" : "top-5 text-zinc-500 text-base md:text-lg"}
          peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-[0.3em] peer-focus:uppercase peer-focus:text-primary peer-focus:font-bold`}
      >
        {label}
      </label>
      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest">
        <span id={`${id}-helper`} className="text-zinc-600">
          {helper}
        </span>
        {maxLength ? (
          <span className={value.length > maxLength * 0.9 ? "text-amber-400" : "text-zinc-700"}>
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-[11px] text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Tell me who you are.";
    if (!form.email.trim()) {
      next.email = "I need an email to reply.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "That email looks off.";
    }
    if (!form.message.trim()) next.message = "Add a quick note.";
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ type: "", message: "" });

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setSubmitState({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint =
        process.env.REACT_APP_CONTACT_ENDPOINT ||
        `https://formsubmit.co/ajax/${PERSONAL.email}`;
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("message", form.message);
      payload.append("_subject", `Portfolio inquiry from ${form.name}`);
      payload.append("_captcha", "false");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Unable to send message right now.");
      }

      setSubmitState({
        type: "success",
        message: "Sent. Talk soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitState({
        type: "error",
        message: "Couldn't send that. Give it another go in a sec.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { label: "Instagram", href: `https://instagram.com/${PERSONAL.instagram}`, icon: Instagram },
    { label: "GitHub", href: `https://github.com/${PERSONAL.github}`, icon: Github },
    { label: "LinkedIn", href: PERSONAL.linkedin, icon: Linkedin },
    { label: "X", href: `https://x.com/${PERSONAL.x}`, icon: XIcon },
    { label: "Discord", href: null, icon: MessageCircle, handle: PERSONAL.discord },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: appleEasing }}
      className="pt-28 md:pt-36 px-5 md:px-12 pb-20 md:pb-28 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        {/* LEFT — pitch + email button + socials */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: appleEasing }}
        >
          <span className="text-primary font-mono uppercase text-[10px] tracking-[0.4em] mb-6 block font-black">
            Direct Channel · 003
          </span>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] uppercase mb-8">
            Say hi<span className="text-primary">.</span>
          </h1>

          <p className="text-base md:text-xl text-zinc-400 mb-8 max-w-md leading-relaxed font-light">
            Based in {PERSONAL.location}. Down to collaborate on stuff that actually cares about motion and design.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-300">
              Online · Usually replies in a day
            </span>
          </div>

          {/* Hero EmailMe — replaces the visible address entirely */}
          <div className="max-w-md">
            <EmailMe
              variant="hero"
              label="Email me"
              subject="Hey Mohammed, let's talk"
              ariaLabel="Open email draft to Mohammed"
            />
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              Pops open a fresh draft in your mail app.
            </p>
          </div>

          {/* Other ways to reach */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-black mb-5">
              Or find me on
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) =>
                s.href ? (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-300 hover:text-white hover:border-white/30 transition-colors min-h-[44px]"
                    aria-label={s.label}
                  >
                    <s.icon size={14} />
                    <span>{s.label}</span>
                  </a>
                ) : (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-500 min-h-[44px]"
                  >
                    <s.icon size={14} />
                    <span>{s.label} · {s.handle}</span>
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: appleEasing }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 bg-white/[0.02] p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-xl"
        >
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight uppercase mb-1">
              Drop a line<span className="text-primary">.</span>
            </h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
              Name · Email · Message
            </p>
          </div>

          <FloatingField
            id="name"
            label="Your name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            helper="So I know who you are"
          />

          <FloatingField
            id="email"
            label="Reply-to email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            helper="Won't be shared anywhere"
          />

          <FloatingField
            id="message"
            label="What's on your mind"
            value={form.message}
            onChange={handleChange}
            error={errors.message}
            multiline
            rows={5}
            maxLength={MAX_MESSAGE}
            helper="A few sentences is plenty"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 md:py-5 bg-white text-black rounded-full font-bold text-base md:text-lg hover:bg-primary hover:text-white transition-all transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed min-h-[52px]"
          >
            {isSubmitting ? "Sending…" : "Send message"}
          </button>

          {submitState.message ? (
            <p
              className={`text-sm ${submitState.type === "error" ? "text-red-400" : "text-emerald-400"}`}
              role="status"
              aria-live="polite"
            >
              {submitState.message}
            </p>
          ) : null}

          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700 pt-2 border-t border-white/5">
            Prefer email? Hit the button on the left.
          </p>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
