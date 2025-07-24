import Terminal from "@/components/Terminal";

export default function About() {
  const paradoxData = [
    { label: "Friends with 10% of my knowledge:", status: "EMPLOYED", color: "text-cyber-green" },
    { label: "Me with published research & production systems:", status: "SEARCHING...", color: "text-cyber-amber animate-blink" }
  ];

  const capabilities = {
    active: [
      "Ship production code daily",
      "Solve complex algorithmic problems", 
      "Build scalable architectures",
      "Publish academic research"
    ],
    warning: [
      "Debug enterprise systems",
      "Optimize performance bottlenecks",
      "Design distributed systems", 
      "Mentor other developers"
    ]
  };

  return (
    <section id="about" className="py-20 bg-cyber-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cyber-green animate-flicker holographic-text">
              <span className="text-cyber-pink">$</span> ./about.sh
            </h2>
            <p className="text-cyber-cyan mt-4">cat about-vinay.txt</p>
          </div>

          <Terminal>
            <div className="space-y-6 text-cyber-cyan">
              <div className="text-cyber-green text-lg">
                <span className="animate-blink">{'>'}</span> Just a failed programmer trying to beat the system.
              </div>
              
              <div className="text-cyber-cyan leading-relaxed">
                <span className="animate-blink">{'>'}</span> I build real-time APIs in Rust, production-grade AI systems in Python,
                <br /><span className="ml-4">and web apps that scale.</span>
              </div>

              <div className="text-cyber-pink font-semibold">
                <span className="animate-blink">{'>'}</span> Companies didn't hire me. So I built things they couldn't.
              </div>

              <div className="border-t border-cyber-cyan border-opacity-30 pt-6 mt-8">
                <h3 className="text-cyber-pink font-bold text-xl mb-4">The Paradox:</h3>
                <div className="space-y-3 text-cyber-cyan">
                  {paradoxData.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <span className="mb-1 md:mb-0">• {item.label}</span>
                      <span className={item.color}>[{item.status}]</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-cyber-cyan border-opacity-30 pt-6 mt-8">
                <h3 className="text-cyber-pink font-bold text-xl mb-4">What I Actually Do:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    {capabilities.active.map((capability, index) => (
                      <div key={index} className="text-cyber-green">✓ {capability}</div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {capabilities.warning.map((capability, index) => (
                      <div key={index} className="text-cyber-amber">⚠ {capability}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-cyber-cyan border-opacity-30 pt-6 mt-8">
                <div className="text-center">
                  <p className="text-cyber-cyan text-lg mb-4">
                    "The system is broken, but the code isn't."
                  </p>
                  <p className="text-cyber-green text-sm">
                    — A Failed Programmer Who Refuses to Stop Building
                  </p>
                </div>
              </div>
            </div>
          </Terminal>
        </div>
      </div>
    </section>
  );
}
