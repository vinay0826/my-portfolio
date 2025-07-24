import Terminal from "@/components/Terminal";
import HolographicSkills from "@/components/HolographicSkills";

export default function Skills() {
  const neuralSkills = [
    { name: "JavaScript", level: 95, category: "Languages", icon: null, color: "cyan" },
    { name: "TypeScript", level: 90, category: "Languages", icon: null, color: "cyan" },
    { name: "Rust", level: 85, category: "Languages", icon: null, color: "pink" },
    { name: "Python", level: 88, category: "Languages", icon: null, color: "green" },
    { name: "React.js", level: 92, category: "Frameworks", icon: null, color: "cyan" },
    { name: "Node.js", level: 89, category: "Frameworks", icon: null, color: "green" },
    { name: "Express.js", level: 87, category: "Frameworks", icon: null, color: "amber" },
    { name: "Actix Web", level: 83, category: "Frameworks", icon: null, color: "pink" },
    { name: "TensorFlow", level: 85, category: "AI/ML", icon: null, color: "green" },
    { name: "OpenCV", level: 81, category: "AI/ML", icon: null, color: "amber" },
    { name: "PostgreSQL", level: 88, category: "Databases", icon: null, color: "cyan" },
    { name: "MongoDB", level: 82, category: "Databases", icon: null, color: "green" },
    { name: "Redis", level: 79, category: "Databases", icon: null, color: "pink" },
    { name: "AWS S3", level: 79, category: "Cloud", icon: null, color: "amber" },
    { name: "Cloudflare", level: 82, category: "Cloud", icon: null, color: "cyan" },
    { name: "Vercel", level: 84, category: "Cloud", icon: null, color: "pink" },
    { name: "Docker", level: 76, category: "Cloud", icon: null, color: "green" },
    { name: "Git", level: 93, category: "Tools", icon: null, color: "amber" }
  ];

  const performanceMetrics = {
    totalSkills: neuralSkills.length,
    avgProficiency: Math.round(neuralSkills.reduce((sum, skill) => sum + skill.level, 0) / neuralSkills.length),
    expertLevel: neuralSkills.filter(skill => skill.level >= 85).length,
    categories: [...new Set(neuralSkills.map(skill => skill.category))].length
  };



  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-cyber-black to-cyber-purple to-opacity-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cyber-green animate-flicker holographic-text">
              <span className="text-cyber-pink">$</span> ./skills.sh
            </h2>
            <p className="text-cyber-cyan mt-4">cat skills.txt | grep -v "job_offers"</p>
          </div>

          {/* 3D HOLOGRAPHIC SKILLS UNIVERSE */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple via-cyber-black to-cyber-purple opacity-30 rounded-lg blur-sm"></div>
            <div className="relative border-2 border-cyber-cyan border-opacity-50 rounded-lg overflow-hidden backdrop-blur-lg shadow-2xl">
              <div className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <h3 className="text-cyber-pink font-bold text-2xl sm:text-3xl holographic-text mb-2 animate-pulse-glow">
                    3D SKILLS DIMENSION
                  </h3>
                  <p className="text-cyber-cyan text-sm sm:text-base opacity-90 animate-flicker">
                    Interactive 3D holographic skill nodes floating in digital space
                  </p>
                  <div className="mt-2 text-cyber-green text-xs sm:text-sm font-mono">
                    <span className="animate-blink">{'>'}</span> Real-time 3D rendering with particle effects
                  </div>
                </div>
                
                <div className="relative border border-cyber-cyan border-opacity-20 rounded-lg overflow-hidden">
                  <div className="min-h-[600px] sm:min-h-[700px] relative bg-gradient-to-b from-transparent via-cyber-black via-opacity-10 to-cyber-purple to-opacity-20 p-6">
                    <HolographicSkills skills={neuralSkills} />
                    
                    {/* Holographic scan lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-30 animate-scan"></div>
                    </div>
                  </div>
                </div>

                {/* Advanced Performance Matrix */}
                <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-cyber-green from-opacity-20 to-black p-3 sm:p-4 rounded-lg border border-cyber-green border-opacity-30 text-center backdrop-blur-sm">
                    <div className="text-cyber-green text-xl sm:text-2xl font-bold animate-pulse-glow">{performanceMetrics.totalSkills}</div>
                    <div className="text-cyber-cyan text-xs sm:text-sm">Skill Nodes</div>
                    <div className="text-cyber-green text-xs opacity-70 font-mono">ACTIVE</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyber-pink from-opacity-20 to-black p-3 sm:p-4 rounded-lg border border-cyber-pink border-opacity-30 text-center backdrop-blur-sm">
                    <div className="text-cyber-pink text-xl sm:text-2xl font-bold animate-pulse-glow">{performanceMetrics.avgProficiency}%</div>
                    <div className="text-cyber-cyan text-xs sm:text-sm">Neural Efficiency</div>
                    <div className="text-cyber-pink text-xs opacity-70 font-mono">OPTIMAL</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyber-amber from-opacity-20 to-black p-3 sm:p-4 rounded-lg border border-cyber-amber border-opacity-30 text-center backdrop-blur-sm">
                    <div className="text-cyber-amber text-xl sm:text-2xl font-bold animate-pulse-glow">{performanceMetrics.expertLevel}</div>
                    <div className="text-cyber-cyan text-xs sm:text-sm">Expert Systems</div>
                    <div className="text-cyber-amber text-xs opacity-70 font-mono">MASTERED</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyber-cyan from-opacity-20 to-black p-3 sm:p-4 rounded-lg border border-cyber-cyan border-opacity-30 text-center backdrop-blur-sm">
                    <div className="text-cyber-cyan text-xl sm:text-2xl font-bold animate-pulse-glow">{performanceMetrics.categories}</div>
                    <div className="text-cyber-cyan text-xs sm:text-sm">Tech Domains</div>
                    <div className="text-cyber-cyan text-xs opacity-70 font-mono">ONLINE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quantum Terminal Status */}
          <div className="mt-8 sm:mt-12">
            <Terminal>
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm space-y-2 sm:space-y-0">
                <div className="text-cyber-green font-mono">
                  <span className="animate-blink">{'>'}</span> 3D_ENGINE: RUNNING
                </div>
                <div className="text-cyber-amber font-mono">
                  <span className="animate-blink">{'>'}</span> PARTICLES: {200} ACTIVE
                </div>
                <div className="text-cyber-cyan font-mono">
                  <span className="animate-blink">{'>'}</span> RENDER_MODE: HOLOGRAPHIC
                </div>
                <div className="text-cyber-pink font-mono">
                  <span className="animate-blink">{'>'}</span> STATUS: LEGENDARY
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-cyber-pink text-xs sm:text-sm animate-flicker">
                  {'// Quantum skill rendering at maximum fidelity - The future is now...'}
                </div>
              </div>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
}
