import Terminal from "@/components/Terminal";
import NeuralSkillsGrid from "@/components/NeuralSkillsGrid";

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

          {/* Neural Network Skills Grid */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple via-cyber-black to-cyber-purple opacity-20 rounded-lg"></div>
            <div className="relative border-2 border-cyber-cyan border-opacity-30 rounded-lg overflow-hidden backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <h3 className="text-cyber-pink font-bold text-xl sm:text-2xl holographic-text mb-2">
                    NEURAL NETWORK INTERFACE
                  </h3>
                  <p className="text-cyber-cyan text-sm opacity-80">
                    Interactive skill nodes with real-time neural connections
                  </p>
                </div>
                
                <div className="min-h-[400px] sm:min-h-[500px] relative">
                  <NeuralSkillsGrid skills={neuralSkills} />
                </div>

                {/* Performance Dashboard */}
                <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-black bg-opacity-40 p-3 sm:p-4 rounded border border-cyber-green border-opacity-30 text-center">
                    <div className="text-cyber-green text-lg sm:text-xl font-bold">{performanceMetrics.totalSkills}</div>
                    <div className="text-cyber-cyan text-xs sm:text-sm">Total Skills</div>
                  </div>
                  <div className="bg-black bg-opacity-40 p-3 sm:p-4 rounded border border-cyber-pink border-opacity-30 text-center">
                    <div className="text-cyber-pink text-lg sm:text-xl font-bold">{performanceMetrics.avgProficiency}%</div>
                    <div className="text-cyber-cyan text-xs sm:text-sm">Avg Proficiency</div>
                  </div>
                  <div className="bg-black bg-opacity-40 p-3 sm:p-4 rounded border border-cyber-amber border-opacity-30 text-center">
                    <div className="text-cyber-amber text-lg sm:text-xl font-bold">{performanceMetrics.expertLevel}</div>
                    <div className="text-cyber-cyan text-xs sm:text-sm">Expert Level</div>
                  </div>
                  <div className="bg-black bg-opacity-40 p-3 sm:p-4 rounded border border-cyber-cyan border-opacity-30 text-center">
                    <div className="text-cyber-cyan text-lg sm:text-xl font-bold">{performanceMetrics.categories}</div>
                    <div className="text-cyber-cyan text-xs sm:text-sm">Categories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Status Bar */}
          <div className="mt-8 sm:mt-12">
            <Terminal>
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm space-y-2 sm:space-y-0">
                <div className="text-cyber-green font-mono">
                  <span className="animate-blink">{'>'}</span> Neural Network: ACTIVE
                </div>
                <div className="text-cyber-amber font-mono">
                  <span className="animate-blink">{'>'}</span> Skills: MAXIMUM LEVEL
                </div>
                <div className="text-cyber-cyan font-mono">
                  <span className="animate-blink">{'>'}</span> Job Offers: STILL_WAITING
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-cyber-pink text-xs sm:text-sm animate-flicker">
                  {'// Neural network fully trained, waiting for human recognition...'}
                </div>
              </div>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
}
