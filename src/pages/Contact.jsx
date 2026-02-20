import { motion } from "framer-motion";
import { useState } from "react";
import { PERSONAL } from "../constants";

const Contact = () => {
  const appleEasing = [0.22, 1, 0.36, 1];
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ type: "", message: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setSubmitState({
        type: "error",
        message: "Please complete all fields before sending.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint =
        process.env.REACT_APP_CONTACT_ENDPOINT ||
        "https://formsubmit.co/ajax/shareef3533@gmail.com";
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("message", form.message);
      payload.append("_subject", `Portfolio inquiry from ${form.name}`);
      payload.append("_captcha", "false");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Unable to send message right now.");
      }

      setSubmitState({
        type: "success",
        message: "Message sent successfully. I will reply soon.",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitState({
        type: "error",
        message: "Something went wrong. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Responsive grid: cols-1 on mobile, lg:cols-2 for desktop
      className="pt-32 md:pt-40 px-4 md:px-12 pb-20 md:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: appleEasing }}
      >
        <h1 className="text-[16vw] md:text-[10vw] font-bold tracking-tighter leading-none mb-8 md:mb-12">
          TALK<span className="text-primary">.</span>
        </h1>
        <p className="text-lg md:text-2xl text-zinc-400 md:text-secondary mb-12 md:mb-20 max-w-md leading-relaxed">
          Currently based in {PERSONAL.location}. <br className="hidden md:block" />
          Open for collaborations that value motion and design.
        </p>
        
        <div className="space-y-2">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold">Direct Email</p>
          <a 
            href={`mailto:${PERSONAL.email}`} 
            className="text-xl md:text-3xl font-bold hover:text-primary transition-colors underline underline-offset-8 decoration-1 break-words"
          >
            {PERSONAL.email}
          </a>
        </div>
      </motion.div>

      {/* Form Container: Optimized padding and animations for mobile */}
      <motion.form 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: appleEasing }}
        onSubmit={handleSubmit}
        className="space-y-8 md:space-y-12 bg-white/[0.02] p-6 md:p-12 rounded-[24px] md:rounded-[40px] border border-white/5 backdrop-blur-xl"
      >
        <div className="space-y-2 group">
          <label className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold" htmlFor="contact-name">
            Name
          </label>
          <input 
            id="contact-name"
            name="name"
            type="text" 
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-primary transition-colors text-xl md:text-2xl font-light placeholder:text-zinc-800" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-primary transition-colors text-xl md:text-2xl font-light placeholder:text-zinc-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold" htmlFor="contact-message">
            Message
          </label>
          <textarea 
            id="contact-message"
            name="message"
            rows="3"
            placeholder="Tell me about your project"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-primary transition-colors text-xl md:text-2xl font-light placeholder:text-zinc-800 resize-none" 
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 md:py-8 bg-white text-black rounded-full font-bold text-lg md:text-xl hover:bg-primary hover:text-white transition-all transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {submitState.message ? (
          <p
            className={`text-sm ${
              submitState.type === "error" ? "text-red-400" : "text-green-400"
            }`}
            role="status"
          >
            {submitState.message}
          </p>
        ) : null}
      </motion.form>
    </motion.div>
  );
};

export default Contact;
