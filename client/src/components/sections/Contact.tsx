import { Mail, Linkedin, Github, Download } from "lucide-react";
import Terminal from "@/components/Terminal";

export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="text-cyber-green mr-2" size={20} />,
      label: "vinaynalagatla@protonmail.com",
      href: "mailto:vinaynalagatla@protonmail.com"
    },
    {
      icon: <Linkedin className="text-cyber-green mr-2" size={20} />,
      label: "linkedin.com/in/vinaynalagatla", 
      href: "https://linkedin.com/in/vinaynalagatla"
    },
    {
      icon: <Github className="text-cyber-green mr-2" size={20} />,
      label: "github.com/vinaynalagatla",
      href: "https://github.com/vinaynalagatla"
    }
  ];

  const statusItems = [
    { label: "🟢 Available for hire:", value: "TRUE", color: "text-cyber-green animate-blink" },
    { label: "🔥 Open to remote work:", value: "TRUE", color: "text-cyber-green animate-blink" },
    { label: "⚡ Available immediately:", value: "TRUE", color: "text-cyber-green animate-blink" },
    { label: "💰 Salary expectations:", value: "NEGOTIABLE", color: "text-cyber-amber" }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-cyber-black to-cyber-purple to-opacity-30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cyber-green animate-flicker holographic-text">
              <span className="text-cyber-pink">$</span> ./hire.sh
            </h2>
            <p className="text-cyber-cyan mt-4">curl -X POST https://vinay.dev/hire-me</p>
          </div>

          <Terminal>
            {/* API Response Simulation */}
            <div className="space-y-4 mb-8">
              <div className="text-cyber-green">
                <span className="text-cyber-pink">$</span> curl -X POST https://vinay.dev/hire-me --data '{"{"}"looking_for": "senior_developer"{"}"}'
              </div>
              <div className="text-cyber-cyan pl-4">
                <div className="animate-flicker">{'>'}</div> HTTP/1.1 200 OK
              </div>
              <div className="text-cyber-cyan pl-4">
                <div className="animate-flicker">{'>'}</div> Content-Type: application/json
              </div>
              <div className="text-cyber-cyan pl-4">
                <div className="animate-flicker">{'>'}</div> X-Rate-Limit: ∞
              </div>
              <div className="text-cyber-green pl-4 mt-4">
                <div className="animate-flicker">{'>'}</div> Response 200 OK
              </div>
              <div className="text-cyber-cyan pl-4">
                <div className="animate-flicker">{'>'}</div> Resume.pdf downloaded.
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-cyber-cyan border-opacity-30 pt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-cyber-pink font-bold text-xl"># Contact Info</h3>
                  <div className="space-y-3 text-cyber-cyan">
                    {contactInfo.map((contact, index) => (
                      <div key={index} className="flex items-center">
                        {contact.icon}
                        <a 
                          href={contact.href}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-cyber-pink transition-colors"
                        >
                          {contact.label}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-cyber-pink font-bold text-xl"># Current Status</h3>
                  <div className="space-y-2 text-cyber-cyan">
                    {statusItems.map((item, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <span className="mb-1 md:mb-0">{item.label}</span>
                        <span className={item.color}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="border-t border-cyber-cyan border-opacity-30 pt-8 mt-8">
              <div className="text-center space-y-4">
                <h3 className="text-cyber-pink font-bold text-xl"># Ready to Deploy?</h3>
                <p className="text-cyber-cyan">
                  Let's talk about turning my "failed programmer" status into your next hire.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <a 
                    href="mailto:vinaynalagatla@protonmail.com"
                    className="bg-cyber-green text-cyber-black px-6 py-3 rounded font-bold hover:bg-cyber-pink hover:text-white transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                  >
                    <Mail className="mr-2" size={18} />
                    ./contact_me.sh
                  </a>
                  <button className="border border-cyber-cyan text-cyber-cyan px-6 py-3 rounded font-bold hover:bg-cyber-cyan hover:text-cyber-black transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center">
                    <Download className="mr-2" size={18} />
                    ./download_resume.sh
                  </button>
                </div>
              </div>
            </div>

            {/* Terminal Prompt */}
            <div className="mt-8 flex items-center">
              <span className="text-cyber-pink">$</span>
              <span className="ml-2 text-cyber-cyan">Waiting for your response...</span>
              <span className="ml-2 w-3 h-5 bg-cyber-cyan animate-blink"></span>
            </div>
          </Terminal>
        </div>
      </div>
    </section>
  );
}
