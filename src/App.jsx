import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ScrollToTop from "./components/animations/ScrollToTop";

export const appleEasing = [0.22, 1, 0.36, 1];

function App() {
  const location = useLocation();

  return (
    <div className="relative bg-[#050505] text-white selection:bg-primary/30 antialiased overflow-x-hidden">
      {/* Scroll Logic - Must be outside Routes to work correctly */}
      <ScrollToTop />

      {/* Cinematic Overlays */}
      <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <Navbar />

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {/* Providing location and key to Routes is what allows 
            AnimatePresence to detect a page change and trigger the exit animation 
          */}
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