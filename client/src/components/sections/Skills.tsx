import Terminal from "@/components/Terminal";
import HolographicCard from "@/components/HolographicCard";
import SkillsRadar from "@/components/SkillsRadar";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      color: "cyan" as const,
      skills: [
        { name: "JavaScript", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Rust", level: 85 },
        { name: "Python", level: 88 },
        { name: "Java", level: 75 },
        { name: "C++", level: 70 }
      ]
    },
    {
      title: "Frameworks & Libraries",
      color: "green" as const,
      skills: [
        { name: "React.js", level: 92 },
        { name: "Node.js", level: 89 },
        { name: "Express.js", level: 87 },
        { name: "Actix Web", level: 83 },
        { name: "TensorFlow", level: 85 },
        { name: "OpenCV", level: 81 }
      ]
    },
    {
      title: "Databases & ORM",
      color: "pink" as const,
      skills: [
        { name: "PostgreSQL", level: 88 },
        { name: "MongoDB", level: 82 },
        { name: "Prisma", level: 85 },
        { name: "Diesel", level: 80 }
      ]
    },
    {
      title: "Cloud & DevOps",
      color: "amber" as const,
      skills: [
        { name: "AWS S3", level: 79 },
        { name: "Cloudflare", level: 82 },
        { name: "Vercel", level: 84 },
        { name: "Git", level: 93 }
      ]
    }
  ];

  // Combine all skills for radar visualization
  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      category: category.title
    }))
  );

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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 3D Skills Radar */}
            <div className="lg:col-span-2">
              <HolographicCard glowColor="cyan" className="h-full">
                <div className="space-y-4">
                  <h3 className="text-cyber-pink font-bold text-xl text-center">
                    Skills Quantum Radar
                  </h3>
                  <p className="text-cyber-cyan text-sm text-center opacity-80">
                    Real-time skill level visualization with neural network mapping
                  </p>
                  <SkillsRadar skills={allSkills} />
                </div>
              </HolographicCard>
            </div>

            {/* Skill Categories */}
            <div className="space-y-6">
              {skillCategories.map((category, index) => (
                <HolographicCard key={index} glowColor={category.color} className="h-full">
                  <div className="space-y-4">
                    <h3 className="text-cyber-pink font-semibold text-lg border-b border-cyber-cyan border-opacity-30 pb-2">
                      {category.title}
                    </h3>
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-cyber-cyan text-sm">{skill.name}</span>
                            <span className="text-cyber-green font-mono text-xs">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-cyber-black bg-opacity-50 rounded-full h-1">
                            <div 
                              className="bg-gradient-to-r from-cyber-cyan to-cyber-pink h-1 rounded-full animate-pulse-glow"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </HolographicCard>
              ))}
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
