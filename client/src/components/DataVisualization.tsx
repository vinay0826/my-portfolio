import { useEffect, useRef } from "react";

interface DataVisualizationProps {
  data: Array<{ x: number; y: number; z: number; value: number; label: string }>;
  className?: string;
}

export default function DataVisualization({ data, className = "" }: DataVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rotation = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create 3D-like projection
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      
      // Draw neural network connections
      ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          const point1 = data[i];
          const point2 = data[j];
          
          // 3D rotation projection
          const x1 = point1.x * cos - point1.z * sin + centerX;
          const y1 = point1.y + point1.z * 0.5 + centerY;
          const x2 = point2.x * cos - point2.z * sin + centerX;
          const y2 = point2.y + point2.z * 0.5 + centerY;
          
          const distance = Math.sqrt(
            Math.pow(point1.x - point2.x, 2) +
            Math.pow(point1.y - point2.y, 2) +
            Math.pow(point1.z - point2.z, 2)
          );
          
          if (distance < 100) {
            ctx.globalAlpha = (100 - distance) / 100 * 0.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
      
      // Draw data points
      data.forEach((point, index) => {
        const x = point.x * cos - point.z * sin + centerX;
        const y = point.y + point.z * 0.5 + centerY;
        
        // Quantum glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, point.value);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${point.value / 100})`);
        gradient.addColorStop(0.5, `rgba(255, 0, 255, ${point.value / 200})`);
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(x, y, point.value / 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Core point
        ctx.fillStyle = point.value > 50 ? "#00ffff" : "#ff00ff";
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Label
        if (point.value > 30) {
          ctx.fillStyle = "#00ffff";
          ctx.font = "10px JetBrains Mono";
          ctx.globalAlpha = 0.7;
          ctx.fillText(point.label, x + 8, y - 8);
        }
      });
      
      rotation += 0.005;
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
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ minHeight: "300px" }}
    />
  );
}