import React, { useState, useEffect } from 'react';
import { checkSupabaseConnection } from '../lib/supabase';

export function LoadingState() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    let progressTimer: NodeJS.Timeout;
    
    const startLoading = () => {
      // Reset state for retry
      if (mounted) {
        setStatus('checking');
        setProgress(0);
        setErrorMessage(null);
      }

      // Animated progress sequence
      const sequence = [
        { progress: 30, delay: 500 },
        { progress: 60, delay: 1000 },
        { progress: 80, delay: 1500 }
      ];

      sequence.forEach(({ progress, delay }) => {
        setTimeout(() => {
          if (mounted) {
            setProgress(progress);
          }
        }, delay);
      });
    };

    const checkConnection = async () => {
      startLoading();

      try {
        const isConnected = await checkSupabaseConnection();

        if (!mounted) return;

        if (isConnected) {
          setStatus('connected');
          setProgress(100);
        } else {
          throw new Error('Unable to establish connection');
        }
      } catch (err) {
        if (!mounted) return;
        
        console.error('Connection error:', err);
        setStatus('error');
        setErrorMessage(
          retryCount >= 2 
            ? 'Connection failed. Please check your internet connection and try again.'
            : 'Connection issue detected. Retrying...'
        );
      }
    };

    // Start initial check
    checkConnection();

    // Auto-retry logic
    if (status === 'error' && retryCount < 2) {
      progressTimer = setTimeout(() => {
        if (mounted) {
          setRetryCount(prev => prev + 1);
          checkConnection();
        }
      }, 3000);
    }

    return () => {
      mounted = false;
      clearTimeout(progressTimer);
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(0); // Reset retry count for manual retry
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4 z-50">
      <div className="loader-container space-y-8 w-full max-w-md">
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl animate-pulse opacity-50" />
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-16 h-16 relative z-10 animate-float"
            />
          </div>
          <h1 className="text-white/90 text-xl font-light tracking-wider text-center">
            {status === 'checking' ? 'Loading Experience' : 
             status === 'error' ? 'Connection Issue' : 
             'Almost Ready'}
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 w-full">
          <div className="loader-bar">
            <div 
              className="loader-progress transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                background: status === 'error' 
                  ? 'linear-gradient(to right, #ef4444, #dc2626)'
                  : undefined
              }}
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/50">
              {status === 'checking' 
                ? `Connecting to services${retryCount > 0 ? ` (Attempt ${retryCount + 1}/3)` : ''}...`
                : status === 'error' 
                ? errorMessage 
                : 'Preparing your experience...'}
            </span>
            <span className="text-white/70 font-medium">
              {progress}%
            </span>
          </div>
        </div>

        {/* Error State with Retry */}
        {status === 'error' && retryCount >= 2 && (
          <div className="text-center">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}