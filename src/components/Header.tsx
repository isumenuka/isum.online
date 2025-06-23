import React from 'react';
import { Heart, Github, RefreshCw, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onRefresh?: () => void;
  lastSynced?: Date | null;
  onToggleTheme?: () => void;
  theme?: 'light' | 'dark';
}

export function Header({ onRefresh, lastSynced, onToggleTheme, theme }: HeaderProps) {
  return (
    <header className="glass-header py-6">
      <div className="max-w-[2000px] mx-auto px-8">
        <div className="flex items-center justify-between">
          <div className="w-24">
            <a
              href="https://github.com/isumenuka/isum.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-transform duration-300 ease-out hover:scale-110"
            >
              <Github size={24} />
            </a>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="EZ Sum Logo" 
                className="h-12 w-auto relative transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="w-24 flex justify-end gap-4">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="relative group cursor-pointer"
                title={lastSynced ? `Last synced: ${lastSynced.toLocaleString()}` : 'Sync videos'}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
                <RefreshCw className="text-white relative" size={24} />
              </button>
            )}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
              <Heart className="text-white relative" size={24} />
            </div>
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="relative group cursor-pointer"
                title="Toggle theme"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
                {theme === 'light' ? (
                  <Sun className="text-white relative" size={24} />
                ) : (
                  <Moon className="text-white relative" size={24} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
