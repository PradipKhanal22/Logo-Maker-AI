import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/30 rounded-full animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full border-t-4 border-indigo-500 rounded-full animate-spin"></div>
    </div>
    <div className="text-center">
      <p className="text-white text-lg font-medium animate-pulse">Designing your brand identity...</p>
      <p className="text-slate-400 text-sm mt-1">Generating 4 unique variations</p>
    </div>
  </div>
);