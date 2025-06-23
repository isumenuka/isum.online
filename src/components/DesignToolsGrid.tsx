import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function DesignToolsGrid() {
  const sectionRef = useScrollAnimation('animate-slideUp');
  const tools = [
    {
      name: 'Adobe Photoshop',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/2101px-Adobe_Photoshop_CC_icon.svg.png',
      description: 'Professional photo editing and manipulation',
      glowColor: 'from-blue-500/30 to-cyan-500/30'
    },
    {
      name: 'Midjourney',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
      description: 'AI-powered image generation',
      glowColor: 'from-purple-500/30 to-pink-500/30'
    },
    {
      name: 'Adobe Lightroom',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg/2101px-Adobe_Photoshop_Lightroom_CC_logo.svg.png',
      description: 'Professional photo processing and organization',
      glowColor: 'from-blue-600/30 to-sky-400/30'
    },
    {
      name: 'flux',
      icon: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/flux.png',
      description: 'text-to-image models that use artificial intelligence (AI) to generate images from written descriptions',
      glowColor: 'from-orange-500/30 to-yellow-500/30'
    },
    {
      name: 'LoRA',
      icon: 'https://github.com/ostris.png',
      description: 'Low-Rank Adaptation for AI image generation',
      glowColor: 'from-green-500/30 to-emerald-500/30'
    }
  ];

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-4">
          Our Design Tools
        </h2>
        <p className="text-white/70 text-lg">Crafting excellence with cutting-edge tools</p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="group relative bg-black/20 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10 hover:border-white/30 transition-transform duration-300 ease-out hover:scale-105"
          >
            {/* Neon Glow Effect */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tool.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
            
            {/* Neon Border Effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/50 to-white/50 blur-[2px]" />
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tool.glowColor} blur-[4px]`} />
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 relative">
                {/* Icon Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.glowColor} rounded-full blur-xl group-hover:opacity-100 transition-opacity duration-300 ease-out animate-pulse`} />
                <img 
                  src={tool.icon} 
                  alt={tool.name}
                  className="w-full h-full object-contain relative z-10 group-hover:animate-pulse"
                />
              </div>
              <h3 className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors duration-300 ease-out">
                {tool.name}
              </h3>
              <p className="text-white/70 text-center text-xs sm:text-sm group-hover:text-white/90 transition-colors duration-300 line-clamp-3">
                {tool.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
