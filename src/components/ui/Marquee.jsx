import { motion } from "framer-motion";
import { MARQUEE_TAGS } from "../../constants";

const Marquee = () => {
  const tags = MARQUEE_TAGS;

  return (
    <div className="border-y border-white/5 py-8 md:py-10 overflow-hidden whitespace-nowrap select-none">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-6 md:gap-10 w-max"
      >
        {[...tags, ...tags].map((tag, i) => (
          <span key={i} className="flex items-center gap-6 md:gap-10">
            <span className="text-[5vw] md:text-[3vw] font-black uppercase tracking-tighter text-zinc-800">
              {tag}
            </span>
            <span className="text-zinc-800 text-xl">+</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
