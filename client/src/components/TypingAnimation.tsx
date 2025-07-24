import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypingAnimation({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = ""
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsStarted(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsStarted(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, isStarted, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-blink">|</span>}
    </span>
  );
}
