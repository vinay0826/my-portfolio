import { useEffect, useRef } from "react";

export function useQuantumEffects() {
  const effectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = effectsRef.current;
    if (!container) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 1000 + 500,
        maxLife: Math.random() * 1000 + 500
      };
    };

    const updateParticles = () => {
      // Add new particles
      if (particles.length < 50 && Math.random() < 0.1) {
        particles.push(createParticle());
      }

      // Update existing particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        if (particle.life <= 0 || particle.x < 0 || particle.x > window.innerWidth || 
            particle.y < 0 || particle.y > window.innerHeight) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(updateParticles);
    };

    updateParticles();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return effectsRef;
}
