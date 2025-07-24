import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import MatrixRain from "@/components/MatrixRain";
import QuantumEffects from "@/components/QuantumEffects";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="text-cyber-green font-mono text-xl animate-blink">
          Initializing quantum consciousness...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-cyan relative overflow-x-hidden">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-30 animate-scan"></div>
      </div>

      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Quantum Effects */}
      <QuantumEffects />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Publications />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-terminal-bg border-t border-cyber-cyan border-opacity-30 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center text-cyber-cyan text-opacity-70">
            <div className="mb-4">
              <span className="text-cyber-pink">$</span> echo "© 2024 A Failed Programmer. All rights reserved."
            </div>
            <div className="text-sm">
              <span className="animate-flicker">{'>'}</span> Built with ❤️, frustration, and way too much caffeine
            </div>
            <div className="text-xs mt-2 text-cyber-cyan text-opacity-50">
              exit status: still_looking_for_job.exe
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
