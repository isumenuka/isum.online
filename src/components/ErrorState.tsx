import React from 'react';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
}