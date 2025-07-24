import { ReactNode, useState } from "react";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "pink" | "green" | "amber";
  interactive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function HolographicCard({ 
  children, 
  className = "", 
  glowColor = "cyan",
  interactive = true,
  onMouseEnter,
  onMouseLeave
}: HolographicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const glowColors = {
    cyan: "rgba(0, 255, 255, 0.4)",
    pink: "rgba(255, 0, 255, 0.4)",
    green: "rgba(0, 255, 0, 0.4)",
    amber: "rgba(255, 191, 0, 0.4)"
  };

  const borderColors = {
    cyan: "rgba(0, 255, 255, 0.6)",
    pink: "rgba(255, 0, 255, 0.6)",
    green: "rgba(0, 255, 0, 0.6)",
    amber: "rgba(255, 191, 0, 0.6)"
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-terminal-bg backdrop-filter backdrop-blur-lg ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave?.();
      }}
      style={{
        border: `1px solid ${borderColors[glowColor]}`,
        boxShadow: isHovered
          ? `0 0 20px ${glowColors[glowColor]}, inset 0 0 20px rgba(0, 255, 255, 0.1)`
          : `0 0 10px ${glowColors[glowColor]}, inset 0 0 10px rgba(0, 255, 255, 0.05)`,
        transform: isHovered && interactive ? "translateY(-2px) scale(1.02)" : "none",
        transition: "all 0.3s ease"
      }}
    >
      {/* Holographic overlay effect */}
      {interactive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.3 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColors[glowColor]} 0%, transparent 70%)`
          }}
        />
      )}
      
      {/* Scanning line effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${glowColors[glowColor]} 50%, transparent 100%)`,
          height: "1px",
          animation: isHovered ? "scan 2s linear infinite" : "none",
          opacity: 0.6
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: borderColors[glowColor] }} />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: borderColors[glowColor] }} />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: borderColors[glowColor] }} />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: borderColors[glowColor] }} />
    </div>
  );
}