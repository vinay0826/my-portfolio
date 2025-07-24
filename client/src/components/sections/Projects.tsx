import { useState } from "react";
import { ExternalLink, Github, Code, Zap, Brain, Globe } from "lucide-react";
import ProjectShowcase from "@/components/ProjectShowcase";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Violence Detection in Crowd",
      description: "Real-time detection using hybrid DL models",
      tech: ["Python", "CNN+LSTM", "OpenCV", "TensorFlow"],
      achievement: "Published research paper in 2024",
      metrics: { accuracy: 94, speed: 88, innovation: 96 },
      icon: <Brain size={20} />,
      color: "cyan"
    },
    {
      id: 2,
      title: "AI Agents & ChatGPT Wrappers",
      description: "Intelligent conversational agents with memory",
      tech: ["Node.js", "OpenAI", "Langchain", "Vector DB"],
      achievement: "Context awareness, memory systems",
      metrics: { performance: 92, scalability: 89, innovation: 95 },
      icon: <Zap size={20} />,
      color: "pink"
    },
    {
      id: 3,
      title: "Rust Backend Services",
      description: "QUIC streaming, Wasm plugins, eBPF routing",
      tech: ["Actix Web", "Tokio", "SQLx", "Diesel"],
      achievement: "High-throughput, low-latency APIs",
      metrics: { performance: 98, reliability: 96, innovation: 94 },
      icon: <Code size={20} />,
      color: "green"
    },
    {
      id: 4,
      title: "MERN Stack Projects",
      description: "Auth systems, dashboards, product trackers",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      achievement: "Full-stack web applications",
      metrics: { performance: 91, scalability: 93, innovation: 87 },
      icon: <Globe size={20} />,
      color: "amber"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-cyber-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cyber-green animate-flicker holographic-text">
              <span className="text-cyber-pink">$</span> ./projects.sh
            </h2>
            <p className="text-cyber-cyan mt-4">ls -la /home/vinay/projects/</p>
          </div>

          {/* Revolutionary 3D Project Carousel */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple via-cyber-black to-cyber-purple opacity-20 rounded-lg"></div>
            <div className="relative border-2 border-cyber-pink border-opacity-30 rounded-lg overflow-hidden backdrop-blur-sm">
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-cyber-pink font-bold text-2xl holographic-text mb-2">
                    PROJECT DIMENSION
                  </h3>
                  <p className="text-cyber-cyan text-sm opacity-80">
                    Interactive 3D showcase of revolutionary code that changed everything
                  </p>
                </div>
                
                <ProjectShowcase projects={projects} />
                
                {/* Achievement banners */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-black bg-opacity-40 rounded border border-cyber-green border-opacity-30">
                    <div className="text-cyber-green text-xl font-bold">4</div>
                    <div className="text-cyber-cyan text-xs">Major Projects</div>
                  </div>
                  <div className="text-center p-3 bg-black bg-opacity-40 rounded border border-cyber-pink border-opacity-30">
                    <div className="text-cyber-pink text-xl font-bold">1</div>
                    <div className="text-cyber-cyan text-xs">Research Paper</div>
                  </div>
                  <div className="text-center p-3 bg-black bg-opacity-40 rounded border border-cyber-amber border-opacity-30">
                    <div className="text-cyber-amber text-xl font-bold">95%</div>
                    <div className="text-cyber-cyan text-xs">Avg Performance</div>
                  </div>
                  <div className="text-center p-3 bg-black bg-opacity-40 rounded border border-cyber-cyan border-opacity-30">
                    <div className="text-cyber-cyan text-xl font-bold">0</div>
                    <div className="text-cyber-cyan text-xs">Job Offers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="mt-12">
            <div className="bg-terminal-bg border border-cyber-cyan border-opacity-30 rounded-lg p-4">
              <div className="text-cyber-cyan text-sm">
                <span className="text-cyber-pink">$</span> find . -name "*.job" -type f
              </div>
              <div className="text-cyber-amber text-sm mt-2 pl-4">
                find: '*.job': No such file or directory
              </div>
              <div className="text-cyber-green text-sm mt-2 pl-4">
                But found plenty of working code instead! 🚀
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
