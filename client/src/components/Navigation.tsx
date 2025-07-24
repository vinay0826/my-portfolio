import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "publications", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "home", label: "./home.sh" },
    { id: "skills", label: "./skills.sh" },
    { id: "projects", label: "./projects.sh" },
    { id: "publications", label: "./logs.sh" },
    { id: "about", label: "./about.sh" },
    { id: "contact", label: "./hire.sh" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-terminal-bg bg-opacity-90 backdrop-blur-sm border-b border-cyber-cyan border-opacity-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-cyber-green font-bold text-lg animate-flicker">
            <span className="text-cyber-pink">~/</span>afailedprogrammer<span className="animate-blink">_</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-300 ${
                  activeSection === item.id
                    ? "text-cyber-pink"
                    : "text-cyber-cyan hover:text-cyber-pink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyber-cyan hover:text-cyber-pink transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cyber-cyan border-opacity-30">
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-cyber-pink"
                      : "text-cyber-cyan hover:text-cyber-pink"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
