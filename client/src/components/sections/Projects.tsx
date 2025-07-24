import { useState } from "react";
import { ExternalLink, Github, Code, Zap, Brain, Globe } from "lucide-react";
import HolographicCard from "@/components/HolographicCard";
import DataVisualization from "@/components/DataVisualization";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      icon: <Brain className="text-cyber-green" size={24} />,
      title: "Violence Detection in Crowd",
      stack: "Python, CNN + LSTM, OpenCV",
      description: "Real-time detection using hybrid DL models",
      achievement: "Published research paper in 2024",
      status: "Production Ready",
      glowColor: "green" as const,
      metrics: { accuracy: 94, speed: 88, innovation: 96 },
      techDetails: "Hybrid CNN-LSTM architecture with transfer learning"
    },
    {
      id: 2,
      icon: <Zap className="text-cyber-cyan" size={24} />,
      title: "AI Agents & ChatGPT Wrappers",
      stack: "Node.js, OpenAI API, Langchain",
      description: "Intelligent conversational agents",
      achievement: "Context awareness, memory systems",  
      status: "Actively Deployed",
      glowColor: "cyan" as const,
      metrics: { performance: 92, scalability: 89, usability: 95 },
      techDetails: "Multi-agent orchestration with persistent memory"
    },
    {
      id: 3,
      icon: <Code className="text-cyber-pink" size={24} />,
      title: "Rust Backend Services",
      stack: "Actix Web, Tokio, SQLx, Diesel",
      description: "QUIC streaming, Wasm plugins, eBPF routing",
      achievement: "High-throughput, low-latency APIs",
      status: "Scalable & Fast",
      glowColor: "pink" as const,
      metrics: { performance: 98, reliability: 96, efficiency: 94 },
      techDetails: "Zero-copy networking with async runtime optimization"
    },
    {
      id: 4,
      icon: <Globe className="text-cyber-amber" size={24} />,
      title: "MERN Stack Projects",
      stack: "MongoDB, Express, React, Node.js",
      description: "Auth systems, dashboards, product trackers",
      achievement: "Full-stack web applications",
      status: "Multi-tenant Ready",
      glowColor: "amber" as const,
      metrics: { functionality: 91, design: 93, scalability: 87 },
      techDetails: "Microservices architecture with real-time updates"
    }
  ];

  // Generate data visualization for each project
  const generateProjectData = (project: typeof projects[0]) => {
    return Object.entries(project.metrics).map(([key, value], index) => ({
      x: (index - 1) * 40,
      y: Math.sin(index) * 30,
      z: Math.cos(index) * 20,
      value: value,
      label: key
    }));
  };

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

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <HolographicCard
                key={project.id}
                glowColor={project.glowColor}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-500"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="space-y-6">
                  {/* Project Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="animate-pulse-glow">
                        {project.icon}
                      </div>
                      <h3 className={`text-cyber-pink font-bold text-xl ${hoveredProject === project.id ? 'animate-glitch holographic-text' : ''}`}>
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="text-cyber-cyan hover:text-cyber-pink transition-colors p-2 rounded border border-cyber-cyan border-opacity-30 hover:border-opacity-100">
                        <Github size={16} />
                      </button>
                      <button className="text-cyber-cyan hover:text-cyber-pink transition-colors p-2 rounded border border-cyber-cyan border-opacity-30 hover:border-opacity-100">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Tech Details */}
                  <div className="space-y-3 text-cyber-cyan">
                    <p><span className="text-cyber-amber font-semibold">Stack:</span> {project.stack}</p>
                    <p><span className="text-cyber-amber font-semibold">Innovation:</span> {project.description}</p>
                    <p><span className="text-cyber-amber font-semibold">Technical:</span> {project.techDetails}</p>
                    <p><span className="text-cyber-amber font-semibold">Achievement:</span> {project.achievement}</p>
                  </div>

                  {/* 3D Data Visualization */}
                  <div className="h-32 bg-black bg-opacity-30 rounded border border-cyber-cyan border-opacity-20 overflow-hidden">
                    <DataVisualization 
                      data={generateProjectData(project)}
                      className="opacity-80"
                    />
                  </div>

                  {/* Status and Metrics */}
                  <div className="flex items-center justify-between">
                    <div className="text-cyber-green text-sm font-mono">
                      <span className="animate-blink">{'>'}</span> Status: {project.status}
                    </div>
                    <div className="flex space-x-4 text-xs">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-cyber-cyan text-opacity-70 uppercase">{key}</div>
                          <div className="text-cyber-green font-bold">{value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </HolographicCard>
            ))}
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
