import { useEffect, useRef } from "react";

interface SkillData {
  name: string;
  level: number;
  category: string;
}

interface SkillsRadarProps {
  skills: SkillData[];
  className?: string;
}

export default function SkillsRadar({ skills, className = "" }: SkillsRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const animationProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw radar grid
      ctx.strokeStyle = "rgba(0, 255, 255, 0.2)";
      ctx.lineWidth = 1;

      // Concentric circles
      for (let i = 1; i <= 5; i++) {
        const radius = (maxRadius / 5) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Level labels
        ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
        ctx.font = "10px JetBrains Mono";
        ctx.fillText(`${i * 20}%`, centerX + radius - 15, centerY - 5);
      }

      // Radar sweep animation
      const sweepAngle = (animationProgress.current * Math.PI * 2) % (Math.PI * 2);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, "rgba(0, 255, 255, 0.3)");
      gradient.addColorStop(0.5, "rgba(0, 255, 255, 0.1)");
      gradient.addColorStop(1, "transparent");

      ctx.save();
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, sweepAngle - 0.5, sweepAngle + 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw skills as points
      skills.forEach((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const progress = Math.min(animationProgress.current * 2, 1);
        const radius = (skill.level / 100) * maxRadius * progress;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Skill point glow
        const pointGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        pointGradient.addColorStop(0, "rgba(0, 255, 255, 0.8)");
        pointGradient.addColorStop(0.5, "rgba(255, 0, 255, 0.4)");
        pointGradient.addColorStop(1, "transparent");

        ctx.fillStyle = pointGradient;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Core point
        ctx.fillStyle = skill.level > 80 ? "#00ffff" : skill.level > 60 ? "#ff00ff" : "#00ff00";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Skill label
        if (progress > 0.5) {
          const labelX = centerX + Math.cos(angle) * (maxRadius + 20);
          const labelY = centerY + Math.sin(angle) * (maxRadius + 20);
          
          ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
          ctx.font = "12px JetBrains Mono";
          ctx.textAlign = labelX > centerX ? "left" : "right";
          ctx.fillText(skill.name, labelX, labelY);
          
          // Connection line
          ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(labelX - (labelX > centerX ? 5 : -5), labelY - 5);
          ctx.stroke();
        }
      });

      // Center hub
      ctx.fillStyle = "rgba(0, 255, 255, 0.6)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fill();

      animationProgress.current += 0.003;
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
      style={{ minHeight: "400px" }}
    />
  );
}