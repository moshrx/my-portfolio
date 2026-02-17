import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence} from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

// The "Apple Keynote" Easing
export const appleEasing = [0.22, 1, 0.36, 1];

function App() {
  const location = useLocation();

  return (
    <div className="relative bg-[#050505] text-white selection:bg-primary/30 antialiased overflow-x-hidden">
      {/* 1. Cinematic Grain Overlay (Subtle depth) */}
      <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 2. Ambient Spatial Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <Navbar />

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;