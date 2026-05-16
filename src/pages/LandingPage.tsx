import { ArrowRight, Zap, Lock, Smile } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
          Free Online <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">File Tools</span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Convert, compress, and manage your files instantly. No signup required, no limits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
            Get Started <ArrowRight size={20} />
          </button>
          <button className="px-8 py-3 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:border-purple-500 hover:text-purple-400 transition-all">
            Learn More
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { number: '500K+', label: 'Files Processed' },
            { number: '99.9%', label: 'Uptime' },
            { number: '100%', label: 'Privacy Guaranteed' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text mb-2">
                {stat.number}
              </div>
              <p className="text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🖼️', title: 'Image Tools', desc: 'Compress, resize, convert images' },
            { icon: '🎵', title: 'Audio Tools', desc: 'Trim, merge, convert audio files' },
            { icon: '📄', title: 'PDF Tools', desc: 'Merge, split, compress PDFs' },
            { icon: '⬇️', title: 'Downloader', desc: 'Download files from URLs' },
            { icon: '🔄', title: 'File Converter', desc: 'Convert between formats' },
            { icon: '📦', title: 'Batch Processing', desc: 'Process multiple files' },
          ].map((tool, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-all">
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
              <p className="text-slate-400">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose SaveWave?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'Lightning Fast', desc: 'Process files in seconds with our optimized servers' },
            { icon: Lock, title: 'Secure & Private', desc: 'Your files are deleted after processing. No tracking.' },
            { icon: Smile, title: 'Easy to Use', desc: 'Simple, intuitive interface anyone can use' },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg inline-block mb-4">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-purple-500/50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Start processing your files now. It's free, easy, and takes just a few clicks.</p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2">
            Try Now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
          <p>&copy; 2024 SaveWave. All rights reserved. | Built with React + Tailwind</p>
        </div>
      </footer>
    </div>
  );
}