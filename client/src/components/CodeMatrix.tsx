import { useEffect, useRef } from "react";

interface CodeInfo {
  text: string;
  language: string;
  level: number;
}

interface CodeMatrixProps {
  skills: CodeInfo[];
  className?: string;
}

export default function CodeMatrix({ skills, className = "" }: CodeMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\";
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    let frameCount = 0;

    const draw = () => {
      // Create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px JetBrains Mono`;

      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomly reset drop to top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Draw skill overlays
      if (frameCount % 120 === 0) { // Update every 2 seconds
        skills.forEach((skill, index) => {
          const x = (index % 4) * (canvas.width / 4) + 20;
          const y = Math.floor(index / 4) * 100 + 50;

          // Background glow
          ctx.save();
          ctx.shadowColor = "#00ffff";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
          ctx.fillRect(x - 10, y - 20, 120, 40);
          ctx.restore();

          // Skill text
          ctx.fillStyle = "#00ffff";
          ctx.font = "10px JetBrains Mono";
          ctx.fillText(skill.text, x, y);
          ctx.fillStyle = "#ff00ff";
          ctx.fillText(`${skill.level}%`, x + 80, y);
        });
      }

      frameCount++;
      animationRef.current = requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [skills]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ minHeight: "400px", background: "#000" }}
    />
  );
}