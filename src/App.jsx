import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Skills from "./components/Skills";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import Projects from "./components/ProjectIndex";
import Hackathons from "./components/Hackathons";
import Services from "./components/Services";
import Contact from "./components/Contact";
import CustomCursor from "./utils/CursorAnimation";

function PortfolioPage() {
  return (
    <div className="font-sora scroll-smooth overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Home />
      <Skills />
      <About />
      <Services />
      <Projects />
      <Hackathons />
      <Contact />
      <Footer />
    </div>
  );
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth" }));
  }, [hash, pathname]);

  return null;
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#101211] px-5 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <Link className="mt-5 inline-block text-sm font-semibold text-[#9fe3c1]" to="/#projects">Back to projects</Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
