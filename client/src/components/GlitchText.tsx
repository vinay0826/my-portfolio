import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export default function GlitchText({ text, className = "", intensity = "medium" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchedText, setGlitchedText] = useState(text);

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  const glitchIntervals = {
    low: 8000,
    medium: 5000,
    high: 2000
  };

  const glitchDurations = {
    low: 200,
    medium: 300,
    high: 500
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      
      // Create glitched version
      const glitched = text.split("").map(char => {
        if (Math.random() < 0.3) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return char;
      }).join("");
      
      setGlitchedText(glitched);

      // Restore original after glitch duration
      setTimeout(() => {
        setGlitchedText(text);
        setIsGlitching(false);
      }, glitchDurations[intensity]);

    }, glitchIntervals[intensity]);

    return () => clearInterval(interval);
  }, [text, intensity]);

  return (
    <span className={`${className} ${isGlitching ? "animate-glitch" : ""}`}>
      {glitchedText}
    </span>
  );
}
