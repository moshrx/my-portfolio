import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PERSONAL, SOCIALS } from "../../constants";

const QUICK_REPLIES = [
  { label: "Get email", key: "email" },
  { label: "Socials", key: "socials" },
  { label: "View work", key: "work" },
  { label: "Contact page", key: "contact" },
  { label: "Gallery", key: "gallery" },
];

function getBotReply(input) {
  const lower = input.toLowerCase().trim();

  // Email
  if (lower.includes("email") || lower.includes("mail") || lower.includes("reach")) {
    return {
      text: `You can reach Mohammed at:`,
      link: { label: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
    };
  }

  // Socials
  if (lower.includes("social") || lower.includes("instagram") || lower.includes("github") || lower.includes("linkedin") || lower.includes("discord") || lower.includes("twitter") || /\bx\b/.test(lower)) {
    return {
      text: "Here are Mohammed's socials:",
      socials: SOCIALS,
      extras: [
        { label: `LinkedIn`, href: PERSONAL.linkedin },
        { label: `Discord — ${PERSONAL.discord}`, href: null },
        { label: `X — @${PERSONAL.x}`, href: `https://x.com/${PERSONAL.x}` },
      ],
    };
  }

  // Work / Projects
  if (lower.includes("work") || lower.includes("project") || lower.includes("portfolio")) {
    return { text: "Let me take you to the work page.", navigate: "/work" };
  }

  // Contact
  if (lower.includes("contact") || lower.includes("hire") || lower.includes("message")) {
    return { text: "Let me take you to the contact page.", navigate: "/contact" };
  }

  // Gallery
  if (lower.includes("gallery") || lower.includes("photo") || lower.includes("picture")) {
    return { text: "Let me take you to the gallery.", navigate: "/gallery" };
  }

  // Interests
  if (lower.includes("interest") || lower.includes("hobby") || lower.includes("about")) {
    return { text: "Let me take you to the interests page.", navigate: "/interests" };
  }

  // Home
  if (lower.includes("home")) {
    return { text: "Taking you home.", navigate: "/" };
  }

  // Greeting
  if (/\b(hi|hello|hey|yo|sup)\b/.test(lower)) {
    return { text: "Hey! I'm Mohammed's assistant. Ask me for his email, socials, or I can take you to any page." };
  }

  // Default
  return {
    text: "I can help you with Mohammed's email, social links, or navigate you to any page. Try the quick options below!",
  };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey! Need Mohammed's email, socials, or want to see his work? Ask away.", ts: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSend = (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { from: "user", text: msg, ts: Date.now() }]);
    setInput("");

    // Simulate tiny delay for natural feel
    setTimeout(() => {
      const reply = getBotReply(msg);
      setMessages((prev) => [...prev, { from: "bot", ...reply, ts: Date.now() }]);

      if (reply.navigate) {
        setTimeout(() => {
          navigate(reply.navigate);
          setOpen(false);
        }, 800);
      }
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform"
        whileTap={{ scale: 0.9 }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 sm:w-[340px] max-h-[480px] rounded-3xl bg-surface border border-white/10 shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5">
              <p className="text-sm font-semibold text-white">Mohammed's Assistant</p>
              <p className="text-xs text-white/40 mt-0.5">Ask me anything — I'll point you the right way.</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px] max-h-[300px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                      msg.from === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-white/5 text-white/80 rounded-bl-md"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Email link */}
                    {msg.link && (
                      <a
                        href={msg.link.href}
                        className="mt-2 flex items-center gap-1.5 text-primary hover:underline text-sm font-medium"
                      >
                        {msg.link.label}
                        <ArrowRight size={14} />
                      </a>
                    )}

                    {/* Social links */}
                    {msg.socials && (
                      <div className="mt-2 flex flex-col gap-1.5">
                        {msg.socials.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                          >
                            <s.icon size={14} />
                            {s.handle}
                          </a>
                        ))}
                        {msg.extras?.map((e) =>
                          e.href ? (
                            <a
                              key={e.label}
                              href={e.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                            >
                              {e.label}
                            </a>
                          ) : (
                            <span key={e.label} className="text-white/50 text-sm">{e.label}</span>
                          )
                        )}
                      </div>
                    )}

                    {/* Navigate indicator */}
                    {msg.navigate && (
                      <p className="mt-1.5 text-xs text-white/30">Redirecting...</p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr.key}
                  onClick={() => handleSend(qr.label)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5 focus-within:border-primary/40 transition-colors">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="text-primary disabled:text-white/20 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
