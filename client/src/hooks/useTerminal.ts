import { useState, useCallback } from "react";

interface TerminalCommand {
  command: string;
  output: string[];
  timestamp: Date;
}

export function useTerminal() {
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  const executeCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase().trim();
    let output: string[] = [];

    switch (cmd) {
      case "whoami":
        output = ["Vinay Nalagatla"];
        break;
      case "skills":
        output = [
          "JavaScript, TypeScript, Rust, Python, Java, C++",
          "React.js, Node.js, Express.js, Actix Web",
          "PostgreSQL, MongoDB, AWS, Cloudflare"
        ];
        break;
      case "projects":
        output = [
          "✅ Violence Detection in Crowd - AI/ML Research",
          "🤖 AI Agents & ChatGPT Wrappers - Node.js/Rust",
          "🛠️ Rust Backend Services - High Performance",
          "🌐 MERN Stack Projects - Full Stack Web Apps"
        ];
        break;
      case "status":
        output = [
          "Status: Available for hire",
          "Job offers: 0",
          "Projects completed: ∞",
          "Bugs fixed: Daily"
        ];
        break;
      case "help":
        output = [
          "Available commands:",
          "whoami - Display user information",
          "skills - List technical skills",
          "projects - Show project portfolio",
          "status - Current employment status",
          "clear - Clear terminal",
          "help - Show this help message"
        ];
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        output = [`Command not found: ${command}`, "Type 'help' for available commands"];
    }

    const newCommand: TerminalCommand = {
      command,
      output,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, newCommand]);
    setCurrentInput("");
  }, []);

  return {
    history,
    currentInput,
    setCurrentInput,
    executeCommand
  };
}
