import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useParallax } from '../hooks/useParallax';
import { ExternalLink, AlertTriangle } from 'lucide-react';

interface AIProduct {
  title: string;
  description: string;
  url: string;
  isWorking: boolean;
}

const aiProducts: AIProduct[] = [
  {
    title: "CPB AI",
    description: "AI-powered Cloth, Person & Background analysis and insights",
    url: "https://cpb.isum.online/",
    isWorking: true
  },
  {
    title: "Animal Mondo",
    description: "Explore the animal kingdom with AI",
    url: "https://animalmondo.isum.online/",
    isWorking: true
  },
  {
    title: "Movie Cast Age Explorer",
    description: "Discover actor ages in movies",
    url: "https://movie-cast-age-explorer.isum.online/",
    isWorking: true
  },
  {
    title: "Trailer Analyser",
    description: "AI-powered movie trailer analysis",
    url: "https://traileranalyser.isum.online/",
    isWorking: false
  }
];

export function AIProductsSection() {
  const sectionRef = useScrollAnimation('animate-fadeIn');
  const bgRef = useParallax(0.2);

  return (
    <div ref={sectionRef} className="w-full py-16 relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-4">
            AI Experiments
          </h2>
          <p className="text-white/70 text-lg">Learning and exploring AI through fun projects</p>
          <p className="text-yellow-500/70 text-sm mt-2 flex items-center justify-center gap-2">
            <AlertTriangle size={16} />
            Some projects are currently under maintenance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiProducts.map((product) => (
            <a
              key={product.title}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              {/* Card glass effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-2xl backdrop-blur-xl border border-white/10 transition-all duration-500 group-hover:border-purple-500/50" />

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-2xl blur-xl" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {!product.isWorking && (
                      <span className="text-yellow-500 text-sm flex items-center gap-1">
                        <AlertTriangle size={14} />
                        Maintenance
                      </span>
                    )}
                    <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
                  {product.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
