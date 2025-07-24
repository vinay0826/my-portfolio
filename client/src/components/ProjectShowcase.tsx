import { useState, useRef, useEffect } from "react";
import { Github, ExternalLink, Zap, TrendingUp } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  achievement: string;
  metrics: { [key: string]: number };
  icon: React.ReactNode;
  color: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
  className?: string;
}

export default function ProjectShowcase({ projects, className = "" }: ProjectShowcaseProps) {
  const [activeProject, setActiveProject] = useState(0);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getProjectPosition = (index: number, total: number) => {
    const angle = ((index - activeProject) * (360 / total)) + rotation;
    const radius = 200;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius * 0.5;
    const z = Math.sin((angle * Math.PI) / 180) * 100;
    
    return {
      x,
      y,
      z,
      scale: 0.8 + (z + 100) / 400,
      opacity: 0.4 + (z + 100) / 300
    };
  };

  return (
    <div className={`relative h-96 overflow-hidden ${className}`} ref={containerRef}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple via-cyber-black to-cyber-purple opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          animation: 'matrix-scroll 10s linear infinite'
        }} />
      </div>

      {/* Project cards in 3D carousel */}
      <div className="absolute inset-0 flex items-center justify-center">
        {projects.map((project, index) => {
          const pos = getProjectPosition(index, projects.length);
          const isActive = index === activeProject;

          return (
            <div
              key={project.id}
              className={`absolute transition-all duration-1000 cursor-pointer ${
                isActive ? 'z-20' : 'z-10'
              }`}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
                opacity: pos.opacity,
                filter: isActive ? 'brightness(1.2)' : 'brightness(0.8)'
              }}
              onClick={() => setActiveProject(index)}
            >
              <div className={`w-64 h-48 p-6 rounded-lg backdrop-blur-lg border-2 transition-all duration-500 ${
                isActive 
                  ? `border-${project.color} shadow-2xl shadow-${project.color}` 
                  : 'border-gray-600 border-opacity-30'
              }`}
              style={{
                background: isActive 
                  ? `linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.7))`
                  : 'rgba(0,0,0,0.5)',
                boxShadow: isActive 
                  ? `0 0 30px ${project.color === 'cyan' ? '#00ffff' : project.color === 'pink' ? '#ff00ff' : '#00ff00'}`
                  : 'none'
              }}>
                {/* Project header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-${project.color} animate-pulse`}>
                    {project.icon}
                  </div>
                  <h3 className={`text-${project.color} font-bold text-sm truncate`}>
                    {project.title}
                  </h3>
                </div>

                {/* Tech stack */}
                <div className="space-y-2 mb-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-cyber-black bg-opacity-50 rounded border border-cyber-cyan border-opacity-30 text-cyber-cyan">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-cyber-cyan text-xs opacity-80 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Metrics visualization */}
                {isActive && (
                  <div className="space-y-2">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className="text-cyber-amber">{key}:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1 bg-cyber-black rounded">
                            <div 
                              className={`h-1 bg-${project.color} rounded animate-pulse`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className={`text-${project.color} font-mono`}>{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                {isActive && (
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <button className={`text-${project.color} hover:scale-110 transition-transform`}>
                      <Github size={14} />
                    </button>
                    <button className={`text-${project.color} hover:scale-110 transition-transform`}>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Project navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeProject ? 'bg-cyber-cyan' : 'bg-gray-600'
            }`}
            onClick={() => setActiveProject(index)}
          />
        ))}
      </div>

      {/* Performance stats overlay */}
      <div className="absolute top-4 right-4 space-y-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyber-green">
          <TrendingUp size={12} />
          <span>Performance: 98.7%</span>
        </div>
        <div className="flex items-center gap-2 text-cyber-cyan">
          <Zap size={12} />
          <span>Innovation Index: MAX</span>
        </div>
      </div>
    </div>
  );
}