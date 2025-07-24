import Terminal from "@/components/Terminal";

export default function Publications() {
  const publications = [
    {
      title: "Violence Detection in Crowd Using Deep Learning Techniques",
      year: "2024",
      abstract: "Designed and implemented a hybrid deep learning model combining CNNs and LSTM networks to analyze video frames for detecting violent behavior in crowded environments.",
      stack: "Python, TensorFlow, Keras, OpenCV, NumPy, Matplotlib",
      innovation: "Leveraged transfer learning techniques for feature extraction and fine-tuned the model to improve detection accuracy and efficiency, achieving real-time processing capabilities with high precision.",
      features: ["Peer Reviewed", "Real-time Processing", "High Precision"]
    }
  ];

  const blogPosts = [
    {
      title: "How I Built an LSTM-CNN Hybrid for Violence Detection",
      description: "Deep dive into neural network architecture",
      status: "PUBLISHED"
    },
    {
      title: "How I Built My Own ChatGPT Wrapper in Rust + Node.js",
      description: "Cross-language AI integration patterns",
      status: "PUBLISHED"
    },
    {
      title: "Still No Job. Here's What I Deployed Instead.",
      description: "A developer's journey through the job market",
      status: "DRAFT"
    }
  ];

  const stats = [
    { value: "∞", label: "Lines of Code" },
    { value: "0", label: "Recognition Received" }
  ];

  return (
    <section id="publications" className="py-20 bg-gradient-to-b from-cyber-purple from-opacity-20 to-cyber-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cyber-green animate-flicker holographic-text">
              <span className="text-cyber-pink">$</span> ./logs.sh
            </h2>
            <p className="text-cyber-cyan mt-4">cat publications.md && cat blog_posts.md</p>
          </div>

          <Terminal>
            {/* Publications Header */}
            <div className="border-b border-cyber-cyan border-opacity-30 pb-4 mb-8">
              <h3 className="text-cyber-pink font-bold text-xl"># Publications & Research</h3>
              <p className="text-cyber-cyan text-opacity-70 text-sm mt-2">Academic contributions that actually matter</p>
            </div>

            {/* 2024 Publication */}
            {publications.map((pub, index) => (
              <article key={index} className="mb-8 p-6 bg-cyber-black bg-opacity-50 border-l-4 border-cyber-green rounded">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <h4 className="text-cyber-pink font-semibold text-lg mb-2 md:mb-0">
                    {pub.title}
                  </h4>
                  <span className="text-cyber-amber text-sm bg-cyber-purple bg-opacity-30 px-2 py-1 rounded self-start">
                    {pub.year}
                  </span>
                </div>
                <div className="space-y-3 text-cyber-cyan">
                  <p><span className="text-cyber-green">Abstract:</span> {pub.abstract}</p>
                  <p><span className="text-cyber-green">Technology Stack:</span> {pub.stack}</p>
                  <p><span className="text-cyber-green">Innovation:</span> {pub.innovation}</p>
                  <div className="flex flex-wrap items-center mt-4 space-x-4">
                    {pub.features.map((feature, i) => (
                      <span key={i} className="text-cyber-green text-sm">✓ {feature}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* Blog Posts */}
            <div className="border-t border-cyber-cyan border-opacity-30 pt-8">
              <h3 className="text-cyber-pink font-bold text-xl mb-6"># Development Logs</h3>
              
              <div className="space-y-4">
                {blogPosts.map((post, index) => (
                  <div key={index} className={`flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-cyber-black bg-opacity-30 rounded border-l-2 ${post.status === 'DRAFT' ? 'border-cyber-amber' : 'border-cyber-cyan'}`}>
                    <div className="mb-2 md:mb-0">
                      <h5 className="text-cyber-cyan font-semibold">{post.title}</h5>
                      <p className="text-cyber-cyan text-opacity-70 text-sm">{post.description}</p>
                    </div>
                    <span className={`text-sm ${post.status === 'DRAFT' ? 'text-cyber-amber animate-blink' : 'text-cyber-green'}`}>
                      [{post.status}]
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-cyber-cyan border-opacity-30">
              <div className="grid grid-cols-2 gap-4 text-center">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className={`text-2xl font-bold ${index === 0 ? 'text-cyber-green' : 'text-cyber-pink'}`}>
                      {stat.value}
                    </div>
                    <div className="text-cyber-cyan text-opacity-70 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Terminal>
        </div>
      </div>
    </section>
  );
}
