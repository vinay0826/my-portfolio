import Terminal from "@/components/Terminal";
import CodeMatrix from "@/components/CodeMatrix";

export default function Skills() {
  const matrixSkills = [
    { text: "JavaScript", language: "js", level: 95 },
    { text: "TypeScript", language: "ts", level: 90 },
    { text: "Rust", language: "rs", level: 85 },
    { text: "Python", language: "py", level: 88 },
    { text: "React.js", language: "jsx", level: 92 },
    { text: "Node.js", language: "js", level: 89 },
    { text: "Express.js", language: "js", level: 87 },
    { text: "Actix Web", language: "rs", level: 83 },
    { text: "TensorFlow", language: "py", level: 85 },
    { text: "PostgreSQL", language: "sql", level: 88 },
    { text: "MongoDB", language: "db", level: 82 },
    { text: "AWS S3", language: "cloud", level: 79 },
    { text: "Cloudflare", language: "cdn", level: 82 },
    { text: "Git", language: "vcs", level: 93 }
  ];

  const skillStats = [
    { category: "Languages Mastered", count: 6, trend: "+2 this year" },
    { category: "Frameworks Built With", count: 12, trend: "Production Ready" },  
    { category: "Databases Optimized", count: 8, trend: "Zero Downtime" },
    { category: "Cloud Services Used", count: 15, trend: "Auto-Scaling" }
  ];

  const renderSkillBar = (level: number) => {
    const blocks = Math.floor(level / 8);
    return (
      <span className="text-cyber-green">
        [{"█".repeat(blocks)}{"░".repeat(12 - blocks)}] {level}%
      </span>
    );
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

          {/* Skills Matrix - Revolutionary Full-Width Display */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple via-cyber-black to-cyber-purple opacity-20 rounded-lg"></div>
            <div className="relative border-2 border-cyber-cyan border-opacity-30 rounded-lg overflow-hidden backdrop-blur-sm">
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-cyber-pink font-bold text-2xl holographic-text mb-2">
                    THE CODE MATRIX
                  </h3>
                  <p className="text-cyber-cyan text-sm opacity-80">
                    Where skills meet the digital void - Real-time capability visualization
                  </p>
                </div>
                
                <div className="h-96 relative">
                  <CodeMatrix skills={matrixSkills} />
                  
                  {/* Overlay stats */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {skillStats.map((stat, index) => (
                      <div key={index} className="bg-black bg-opacity-60 p-3 rounded border border-cyber-cyan border-opacity-30">
                        <div className="text-cyber-green text-sm font-bold">{stat.count}</div>
                        <div className="text-cyber-cyan text-xs">{stat.category}</div>
                        <div className="text-cyber-amber text-xs opacity-80">{stat.trend}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Performance indicators */}
                  <div className="absolute bottom-4 right-4 space-y-2 text-right">
                    <div className="text-cyber-green text-sm font-mono">
                      <span className="animate-blink">{'>'}</span> System Status: OPERATIONAL
                    </div>
                    <div className="text-cyber-cyan text-sm font-mono">
                      <span className="animate-blink">{'>'}</span> Skill Level: MAXIMUM
                    </div>
                    <div className="text-cyber-pink text-sm font-mono">
                      <span className="animate-blink">{'>'}</span> Hiring Status: WAITING...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Status Bar */}
          <div className="mt-12">
            <Terminal>
              <div className="flex flex-col md:flex-row items-center justify-between text-sm space-y-2 md:space-y-0">
                <div className="text-cyber-green font-mono">
                  <span className="animate-blink">{'>'}</span> Status: Ready for deployment
                </div>
                <div className="text-cyber-amber font-mono">
                  <span className="animate-blink">{'>'}</span> Job offers received: 0
                </div>
                <div className="text-cyber-cyan font-mono">
                  <span className="animate-blink">{'>'}</span> Bugs fixed: ∞
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-cyber-pink text-sm animate-flicker">
                  {'// While loop: while(hired === false) { improveSkills(); }'}
                </div>
              </div>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
}
