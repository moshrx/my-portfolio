import { motion } from "framer-motion";
import { PERSONAL } from "../constants";

const Contact = () => {
  return (
    <motion.div className="pt-40 px-6 md:px-12 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-24 max-w-7xl mx-auto">
      <div>
        <h1 className="text-8xl md:text-[10vw] font-bold tracking-tighter leading-none mb-12">TALK<span className="text-primary">.</span></h1>
        <p className="text-2xl text-secondary mb-20 max-w-md">Currently based in {PERSONAL.location}. Open for collaborations that value motion and design.</p>
        
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold">Email</p>
          <a href={`mailto:${PERSONAL.email}`} className="text-3xl font-bold hover:text-primary transition-colors underline underline-offset-8 decoration-1">{PERSONAL.email}</a>
        </div>
      </div>

      <motion.form 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-12 bg-surface/30 p-12 rounded-[40px] border border-white/5 backdrop-blur-3xl"
      >
        <div className="space-y-2 group">
          <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Name</label>
          <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-primary transition-colors text-2xl font-light" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Inquiry Type</label>
          <select className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-primary transition-colors text-2xl font-light appearance-none text-zinc-400">
            <option>Web Development</option>
            <option>Video Editing</option>
            <option>Color Grading</option>
          </select>
        </div>
        <button className="w-full py-8 bg-white text-black rounded-full font-bold text-xl hover:bg-primary hover:text-white transition-all transform hover:scale-[1.01]">
          Send Message
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Contact;