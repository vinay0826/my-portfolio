import { useState, useEffect } from "react";
import Terminal from "@/components/Terminal";
import TypingAnimation from "@/components/TypingAnimation";
import GlitchText from "@/components/GlitchText";

export default function Hero() {
  const [currentStep, setCurrentStep] = useState(0);

  const terminalCommands = [
    { command: "whoami", response: "Vinay Nalagatla" },
    { command: "skills --level=god --luck=0", response: "Libraries: Node.js, React.js, Rust, Actix, Express..." },
    { command: "cat status.txt", response: ["Still jobless... despite building scalable AI agents,", "Rust backends, and cloud systems.", "But hey, the code works perfectly."] },
    { command: "echo \"Welcome to the terminal of someone who wrote code\"", response: "that changed everything — just not his job status... yet." }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-20 relative quantum-field code-background">
      {/* Revolutionary Quantum Field Background */}
      <div className="absolute inset-0 neural-network opacity-30"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-cyber-purple via-quantum-void to-cyber-purple"></div>
      </div>
      
      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-cyber-green opacity-30 animate-code-flow">
          {'const developer = { status: "failed", potential: Infinity };'}
        </div>
        <div className="absolute top-40 right-20 text-cyber-cyan opacity-20 animate-pulse-glow delay-1000">
          {'while(jobOffers === 0) { buildAwesomeStuff(); }'}
        </div>
        <div className="absolute bottom-32 left-32 text-cyber-pink opacity-25 animate-neural-wave">
          {'function hireMeNow() { return "please"; }'}
        </div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <Terminal className="mb-8">
          <div className="space-y-6">
            {terminalCommands.map((cmd, index) => (
              <div key={index} className={`${index > currentStep ? "opacity-0" : ""}`}>
                <div className="text-cyber-green">
                  <span className="text-cyber-pink">$</span> {cmd.command}
                </div>
                {index <= currentStep && (
                  <div className="text-cyber-cyan pl-4 mt-2">
                    {Array.isArray(cmd.response) ? (
                      cmd.response.map((line, i) => (
                        <div key={i} className="mb-2">
                          <span className="animate-flicker">{'>'}</span> 
                          {index === currentStep ? (
                            <TypingAnimation 
                              text={line}
                              speed={30}
                              delay={i * 1000}
                              onComplete={() => {
                                if (i === cmd.response.length - 1 && index < terminalCommands.length - 1) {
                                  setTimeout(() => setCurrentStep(prev => prev + 1), 1000);
                                }
                              }}
                            />
                          ) : (
                            line
                          )}
                        </div>
                      ))
                    ) : (
                      <div>
                        <span className="animate-flicker">{'>'}</span> 
                        {index === currentStep ? (
                          <TypingAnimation 
                            text={cmd.response}
                            speed={30}
                            onComplete={() => {
                              if (index < terminalCommands.length - 1) {
                                setTimeout(() => setCurrentStep(prev => prev + 1), 1000);
                              }
                            }}
                          />
                        ) : (
                          cmd.response
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Animated Cursor */}
            <div className="flex items-center mt-6">
              <span className="text-cyber-pink">$</span>
              <span className="ml-2 w-3 h-5 bg-cyber-cyan animate-blink"></span>
            </div>
          </div>
        </Terminal>

        {/* Revolutionary Title Display */}
        <div className="text-center relative">
          {/* Quantum Glow Background */}
          <div className="absolute -inset-8 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-10 blur-xl animate-pulse-glow"></div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 relative">
            <div className="holographic-text animate-quantum-spin">
              <GlitchText text="A FAILED" intensity="high" />
            </div>
            <div className="holographic-text text-cyber-pink animate-neural-wave delay-500">
              <GlitchText text="PROGRAMMER" intensity="high" />
            </div>
          </h1>
          
          <div className="space-y-4">
            <p className="text-cyber-cyan text-lg md:text-xl animate-flicker font-bold">
              def failed_programmer(): return "undefined behavior in career.exe"
            </p>
            <p className="text-cyber-green text-sm md:text-base animate-pulse-glow opacity-80">
              // TODO: Fix hiring algorithms in the matrix
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="text-cyber-amber animate-blink">{'>'}</div>
              <div className="text-cyber-cyan animate-typing">
                Status: Ready for deployment...
              </div>
              <div className="text-cyber-amber animate-blink">{'<'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
