import React, { useState, useEffect } from 'react';

export function LoadingState() {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const initialTimer = setTimeout(() => setProgress(30), 200);
    const midTimer = setTimeout(() => setProgress(70), 800);
    const finalTimer = setTimeout(() => setProgress(100), 1500);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(midTimer);
      clearTimeout(finalTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-purple-500/20 blur-2xl animate-pulse delay-75" />
        </div>

        {/* Main Content */}
        <div className="space-y-12 backdrop-blur-lg bg-black/20 rounded-2xl p-8 border border-white/10">
          {/* Logo Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl animate-pulse" />
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="relative w-20 h-20 animate-float"
              />
            </div>
            <h1 className="text-white/90 text-2xl font-light tracking-wider animate-slideDown">
              Loading Experience
            </h1>
          </div>

          {/* Progress Section */}
          <div className="space-y-4">
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-300 ease-out animate-shimmer"
                style={{ 
                  width: `${progress}%`,
                  backgroundSize: '200% 100%'
                }}
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50 animate-fadeIn">Preparing your experience...</span>
              <span className="text-white/70 font-medium animate-fadeIn delay-100">
                {progress}%
              </span>
            </div>
          </div>

          {/* Loading Messages */}
          <div className="flex justify-center">
            <div className="flex gap-1 items-center text-white/40 text-sm animate-fadeIn delay-200">
              <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}