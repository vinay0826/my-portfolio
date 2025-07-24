import { useEffect, useRef } from "react";

export default function QuantumEffects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createQuantumParticle = () => {
      const particle = document.createElement("div");
      particle.className = "quantum-particle";
      particle.style.position = "absolute";
      particle.style.width = "2px";
      particle.style.height = "2px";
      particle.style.backgroundColor = "#00ffff";
      particle.style.borderRadius = "50%";
      particle.style.boxShadow = "0 0 6px #00ffff";
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = Math.random() * window.innerHeight + "px";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "1";
      
      // Random movement
      const duration = 10000 + Math.random() * 20000;
      const endX = Math.random() * window.innerWidth;
      const endY = Math.random() * window.innerHeight;
      
      particle.animate([
        { transform: "translate(0, 0) scale(1)", opacity: "0" },
        { transform: `translate(${endX - parseInt(particle.style.left)}px, ${endY - parseInt(particle.style.top)}px) scale(1.5)`, opacity: "1", offset: 0.1 },
        { transform: `translate(${endX - parseInt(particle.style.left)}px, ${endY - parseInt(particle.style.top)}px) scale(0.5)`, opacity: "0" }
      ], {
        duration,
        easing: "ease-in-out"
      }).onfinish = () => {
        particle.remove();
      };

      container.appendChild(particle);
    };

    const createNeuralConnection = () => {
      const connection = document.createElement("div");
      connection.className = "neural-connection";
      connection.style.position = "absolute";
      connection.style.height = "1px";
      connection.style.background = "linear-gradient(90deg, transparent, #00ffff, transparent)";
      connection.style.opacity = "0.3";
      connection.style.left = "0";
      connection.style.top = Math.random() * window.innerHeight + "px";
      connection.style.width = "100%";
      connection.style.pointerEvents = "none";
      connection.style.zIndex = "1";

      connection.animate([
        { opacity: "0", transform: "scaleX(0)" },
        { opacity: "0.6", transform: "scaleX(1)", offset: 0.5 },
        { opacity: "0", transform: "scaleX(0)" }
      ], {
        duration: 3000,
        easing: "ease-in-out"
      }).onfinish = () => {
        connection.remove();
      };

      container.appendChild(connection);
    };

    // Create particles and connections at intervals
    const particleInterval = setInterval(createQuantumParticle, 1000);
    const connectionInterval = setInterval(createNeuralConnection, 5000);

    // Initial burst
    for (let i = 0; i < 10; i++) {
      setTimeout(createQuantumParticle, i * 200);
    }

    return () => {
      clearInterval(particleInterval);
      clearInterval(connectionInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-1"
      style={{ zIndex: 1 }}
    />
  );
}
