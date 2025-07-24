import { useEffect, useRef, useState } from "react";
import { Cpu, Zap, Database, Cloud, Code, Brain } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

interface HolographicSkillsProps {
  skills: Skill[];
  className?: string;
}

export default function HolographicSkills({ skills, className = "" }: HolographicSkillsProps) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages': return <Code size={18} />;
      case 'Frameworks': return <Zap size={18} />;
      case 'Databases': return <Database size={18} />;
      case 'Cloud': return <Cloud size={18} />;
      case 'AI/ML': return <Brain size={18} />;
      default: return <Cpu size={18} />;
    }
  };

  const getColorClasses = (color: string, isActive: boolean = false) => {
    const intensity = isActive ? 'opacity-100' : 'opacity-80';
    switch (color) {
      case 'cyan': return `text-cyber-cyan border-cyber-cyan ${intensity}`;
      case 'pink': return `text-cyber-pink border-cyber-pink ${intensity}`;
      case 'green': return `text-cyber-green border-cyber-green ${intensity}`;
      case 'amber': return `text-cyber-amber border-cyber-amber ${intensity}`;
      default: return `text-cyber-cyan border-cyber-cyan ${intensity}`;
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className={`relative ${className}`}>
      {/* 3D Floating Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-cyber-cyan"
              style={{
                left: `${(i * 4)}%`,
                transform: `rotateY(${i * 7.2}deg) translateZ(${Math.sin(i) * 20}px)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Holographic Skills Grid */}
      <div className="relative z-10 space-y-8">
        {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
          <div key={category} className="space-y-4">
            {/* Category Header with 3D Effect */}
            <div className="text-center">
              <h4 className="text-cyber-pink text-lg font-bold holographic-text mb-2 transform perspective-1000 rotateX-12">
                {category.toUpperCase()}
              </h4>
              <div className="h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50"></div>
            </div>

            {/* Skills in this category */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categorySkills.map((skill, skillIndex) => {
                const isActive = activeSkill === skill.name;
                const isHovered = hoveredSkill === skill.name;
                const delay = (categoryIndex * 100) + (skillIndex * 50);

                return (
                  <div
                    key={skill.name}
                    className={`
                      relative group cursor-pointer transform transition-all duration-500 ease-out
                      ${isActive ? 'scale-110 z-20' : isHovered ? 'scale-105 z-10' : 'scale-100'}
                      hover:translate-y-2
                    `}
                    style={{
                      animationDelay: `${delay}ms`,
                      transform: `
                        perspective(1000px) 
                        rotateX(${isHovered ? '-10deg' : '0deg'}) 
                        rotateY(${isHovered ? '5deg' : '0deg'})
                        translateZ(${isActive ? '20px' : '0px'})
                      `
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => setActiveSkill(isActive ? null : skill.name)}
                  >
                    {/* Holographic Container */}
                    <div className={`
                      relative bg-gradient-to-br from-black via-gray-900 to-black
                      rounded-lg p-4 border-2 backdrop-blur-lg
                      transition-all duration-300 hover:shadow-2xl
                      ${getColorClasses(skill.color, isActive)}
                      ${isActive ? 'shadow-lg' : 'shadow-md'}
                    `}
                    style={{
                      boxShadow: isActive 
                        ? `0 0 30px ${skill.color === 'cyan' ? '#00ffff' : 
                                      skill.color === 'pink' ? '#ff00ff' :
                                      skill.color === 'green' ? '#00ff00' :
                                      skill.color === 'amber' ? '#ffbf00' : '#00ffff'}40`
                        : isHovered ? `0 0 20px ${skill.color === 'cyan' ? '#00ffff' : 
                                                  skill.color === 'pink' ? '#ff00ff' :
                                                  skill.color === 'green' ? '#00ff00' :
                                                  skill.color === 'amber' ? '#ffbf00' : '#00ffff'}20`
                        : 'none'
                    }}>
                      
                      {/* Category Icon */}
                      <div className={`flex items-center justify-center mb-3 ${getColorClasses(skill.color).split(' ')[0]}`}>
                        {getCategoryIcon(skill.category)}
                      </div>
                      
                      {/* Skill Name */}
                      <h5 className={`text-center font-semibold text-sm mb-3 ${getColorClasses(skill.color).split(' ')[0]}`}>
                        {skill.name}
                      </h5>
                      
                      {/* 3D Progress Ring */}
                      <div className="relative flex items-center justify-center mb-2">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                          {/* Background circle */}
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-gray-700 opacity-30"
                          />
                          {/* Progress circle */}
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke={`${skill.color === 'cyan' ? '#00ffff' : 
                                     skill.color === 'pink' ? '#ff00ff' :
                                     skill.color === 'green' ? '#00ff00' :
                                     skill.color === 'amber' ? '#ffbf00' : '#00ffff'}`}
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${176 * (skill.level / 100)} 176`}
                            className={`transition-all duration-1000 ${isActive ? 'animate-pulse' : ''}`}
                            style={{
                              filter: isActive ? 'drop-shadow(0 0 10px currentColor)' : 'none'
                            }}
                          />
                        </svg>
                        
                        {/* Level percentage in center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-lg font-bold font-mono ${getColorClasses(skill.color).split(' ')[0]}`}>
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      {/* Mastery Label */}
                      <div className="text-center">
                        <span className={`text-xs font-mono px-2 py-1 rounded border ${getColorClasses(skill.color)} bg-opacity-20`}>
                          {skill.level >= 90 ? 'EXPERT' : skill.level >= 75 ? 'ADVANCED' : skill.level >= 60 ? 'PROFICIENT' : 'LEARNING'}
                        </span>
                      </div>

                      {/* Holographic scanning effect */}
                      {isHovered && (
                        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                          <div className={`absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-70 animate-scan ${getColorClasses(skill.color).split(' ')[0]}`} />
                        </div>
                      )}

                      {/* Active skill data stream */}
                      {isActive && (
                        <div className="absolute -right-2 -top-2 bg-black bg-opacity-90 border border-current rounded px-2 py-1 text-xs font-mono whitespace-nowrap animate-bounce">
                          ACCESSING_DATA...
                        </div>
                      )}
                    </div>

                    {/* Floating skill details */}
                    {isActive && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-95 border border-current rounded px-3 py-2 text-xs font-mono whitespace-nowrap z-30 animate-fade-in">
                        <div className={getColorClasses(skill.color).split(' ')[0]}>
                          Category: {skill.category} | Level: {skill.level}% | Status: ACTIVE
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Quantum particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              ['bg-cyber-cyan', 'bg-cyber-pink', 'bg-cyber-green', 'bg-cyber-amber'][i % 4]
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}