import { ReactNode } from "react";

interface TerminalProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function Terminal({ children, title = "terminal@afailedprogrammer:~", className = "" }: TerminalProps) {
  return (
    <div className={`bg-terminal-bg border border-cyber-cyan border-opacity-50 rounded-lg shadow-2xl backdrop-blur-sm terminal-glow ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center border-b border-cyber-cyan border-opacity-30 p-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-cyber-cyan text-opacity-70 text-sm">
          {title}
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 relative scanline-overlay">
        {children}
      </div>
    </div>
  );
}
