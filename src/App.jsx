import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Intent from "./pages/Intent";
import ScrollToTop from "./components/animations/ScrollToTop";

function App() {
  const location = useLocation();

  return (
    <div className="relative bg-[#050505] text-white selection:bg-primary/30 antialiased overflow-x-hidden">
      <ScrollToTop />
      
      {/* Performance Optimization: Disable blurs on low-power mobile devices if needed */}
      <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[50%] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <Navbar />

      <main className="min-h-[100svh]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/Intent" element={<Intent />} />
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