import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
// Layout components (Loaded immediately)
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/animations/ScrollToTop";
import ChatBot from "./components/ui/ChatBot";

// Page components (Lazy loaded for performance)
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Gallery = lazy(() => import("./pages/Gallery"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Intent = lazy(() => import("./pages/Intent"));
const Interests = lazy(() => import("./pages/Interests"));

// Simple loading state to prevent layout shift
const PageLoader = () => (
  <div className="h-[100svh] w-full bg-black flex items-center justify-center">
    <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
  </div>
);

function App() {
  const location = useLocation();

  return (
    <div className="relative bg-[#050505] text-white selection:bg-primary/30 antialiased overflow-x-hidden">
      <ScrollToTop />
      
      {/* Texture & Ambient Light: Global elements */}
      <div
        className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] noise-overlay"
      />
      <div
        className="fixed top-[-10%] left-[-10%] w-[120%] h-[60%] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(0,113,227,0.05) 0%, transparent 60%)" }}
      />

      <Navbar />

      <main className="min-h-[100svh] relative z-10">
        <AnimatePresence mode="wait">
          {/* Wrap routes in Suspense for lazy loading */}
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:id" element={<ProjectDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/interests" element={<Interests />} />
              <Route path="/intent" element={<Intent />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Fallback for 404/wrong URLs */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
