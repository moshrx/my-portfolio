import { motion } from "framer-motion";
import { PERSONAL } from "../constants";

const Contact = () => {
  const appleEasing = [0.22, 1, 0.36, 1];

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
        <h1 className="text-[22vw] md:text-[10vw] font-bold tracking-tighter leading-none mb-8 md:mb-12">
          TALK<span className="text-primary">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 md:text-secondary mb-12 md:mb-20 max-w-md leading-relaxed">
          Currently based in {PERSONAL.location}. <br className="hidden md:block" /> 
          Open for collaborations that value motion and design.
        </p>
        
        <div className="space-y-2">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold">Direct Email</p>
          <a 
            href={`mailto:${PERSONAL.email}`} 
            className="text-2xl md:text-3xl font-bold hover:text-primary transition-colors underline underline-offset-8 decoration-1 break-all"
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
        className="space-y-8 md:space-y-12 bg-white/[0.02] p-8 md:p-12 rounded-[32px] md:rounded-[40px] border border-white/5 backdrop-blur-3xl"
      >
        <div className="space-y-2 group">
          <label className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Name</label>
          <input 
            type="text" 
            placeholder="Your Name"
            className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-primary transition-colors text-xl md:text-2xl font-light placeholder:text-zinc-800" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Inquiry Type</label>
          <div className="relative">
            <select className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-primary transition-colors text-xl md:text-2xl font-light appearance-none text-zinc-400">
              <option className="bg-black">Web Development</option>
              <option className="bg-black">Video Editing</option>
              <option className="bg-black">Color Grading</option>
            </select>
            {/* Custom arrow for the select dropdown */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
              ↓
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Message</label>
          <textarea 
            rows="3"
            placeholder="Tell me about your project"
            className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-primary transition-colors text-xl md:text-2xl font-light placeholder:text-zinc-800 resize-none" 
          />
        </div>

        <button className="w-full py-6 md:py-8 bg-white text-black rounded-full font-bold text-lg md:text-xl hover:bg-primary hover:text-white transition-all transform active:scale-95">
          Send Message
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Contact;