import { useEffect, useRef, useState } from "react";
import { Cpu, Zap, Database, Cloud, Code, Brain } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
  color: string;
}

interface NeuralSkillsGridProps {
  skills: Skill[];
  className?: string;
}

export default function NeuralSkillsGrid({ skills, className = "" }: NeuralSkillsGridProps) {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [connections, setConnections] = useState<Array<{x1: number, y1: number, x2: number, y2: number, opacity: number}>>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateConnections = () => {
      if (!gridRef.current) return;
      
      const newConnections = [];
      const skillElements = gridRef.current.querySelectorAll('[data-skill]');
      
      for (let i = 0; i < skillElements.length; i++) {
        for (let j = i + 1; j < skillElements.length; j++) {
          const skill1 = skillElements[i].getBoundingClientRect();
          const skill2 = skillElements[j].getBoundingClientRect();
          const containerRect = gridRef.current.getBoundingClientRect();
          
          const x1 = skill1.left - containerRect.left + skill1.width / 2;
          const y1 = skill1.top - containerRect.top + skill1.height / 2;
          const x2 = skill2.left - containerRect.left + skill2.width / 2;  
          const y2 = skill2.top - containerRect.top + skill2.height / 2;
          
          const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const opacity = Math.max(0, 1 - distance / 300);
          
          if (opacity > 0.1) {
            newConnections.push({ x1, y1, x2, y2, opacity });
          }
        }
      }
      
      setConnections(newConnections);
    };

    updateConnections();
    window.addEventListener('resize', updateConnections);
    
    return () => window.removeEventListener('resize', updateConnections);
  }, [skills]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages': return <Code size={16} />;
      case 'Frameworks': return <Zap size={16} />;
      case 'Databases': return <Database size={16} />;
      case 'Cloud': return <Cloud size={16} />;
      case 'AI/ML': return <Brain size={16} />;
      default: return <Cpu size={16} />;
    }
  };

  return (
    <div className={`relative ${className}`} ref={gridRef}>
      {/* Neural connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {connections.map((conn, index) => (
          <line
            key={index}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="rgba(0, 255, 255, 0.3)"
            strokeWidth="1"
            opacity={conn.opacity}
            className="animate-pulse"
          />
        ))}
      </svg>

      {/* Skills grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            data-skill={index}
            className={`relative group cursor-pointer transition-all duration-500 ${
              activeSkill === index ? 'scale-110 z-20' : 'scale-100'
            }`}
            onMouseEnter={() => setActiveSkill(index)}
            onMouseLeave={() => setActiveSkill(null)}
          >
            {/* Skill node */}
            <div className={`
              relative bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 
              border border-opacity-30 transition-all duration-300
              ${skill.color === 'cyan' ? 'border-cyber-cyan hover:border-cyber-cyan' : 
                skill.color === 'pink' ? 'border-cyber-pink hover:border-cyber-pink' :
                skill.color === 'green' ? 'border-cyber-green hover:border-cyber-green' :
                skill.color === 'amber' ? 'border-cyber-amber hover:border-cyber-amber' : 
                'border-cyber-cyan hover:border-cyber-cyan'}
              hover:bg-opacity-80 hover:scale-105
            `}
            style={{
              boxShadow: activeSkill === index 
                ? `0 0 20px ${skill.color === 'cyan' ? '#00ffff' : 
                             skill.color === 'pink' ? '#ff00ff' :
                             skill.color === 'green' ? '#00ff00' :
                             skill.color === 'amber' ? '#ffbf00' : '#00ffff'}`
                : 'none'
            }}>
              {/* Category icon */}
              <div className={`flex items-center justify-center mb-2 text-${skill.color}`}>
                {getCategoryIcon(skill.category)}
              </div>
              
              {/* Skill name */}
              <h4 className={`text-${skill.color} font-semibold text-xs sm:text-sm text-center mb-2`}>
                {skill.name}
              </h4>
              
              {/* Level indicator */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-cyber-cyan text-xs opacity-70">Level</span>
                  <span className={`text-${skill.color} text-xs font-mono`}>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1">
                  <div 
                    className={`bg-${skill.color} h-1 rounded-full transition-all duration-1000 animate-pulse`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Pulse effect when active */}
              {activeSkill === index && (
                <div className={`absolute inset-0 rounded-lg animate-ping border-2 border-${skill.color} opacity-75`} />
              )}
            </div>

            {/* Floating level indicator */}
            {activeSkill === index && (
              <div className={`
                absolute -top-8 left-1/2 transform -translate-x-1/2 
                bg-black bg-opacity-90 px-2 py-1 rounded text-${skill.color} 
                text-xs font-mono border border-${skill.color} border-opacity-50
                animate-bounce
              `}>
                {skill.level}% mastery
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-cyan rounded-full animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}