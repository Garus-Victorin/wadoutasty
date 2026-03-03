import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="fixed inset-0 bg-foreground flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className={`${sizeClasses[size]} animate-spin`}>
            <UtensilsCrossed className={`${sizeClasses[size]} text-primary`} />
          </div>
          <div className={`absolute inset-0 ${sizeClasses[size]} animate-ping opacity-20`}>
            <UtensilsCrossed className={`${sizeClasses[size]} text-primary`} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-display font-bold text-white tracking-wider">
            WADOU Tasty
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Chargement...
          </p>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

// Full screen loader for initial page load
export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-foreground flex flex-col items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="p-4 bg-primary rounded-2xl animate-pulse">
            <UtensilsCrossed className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" />
        </div>
        
        {/* Brand Name */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-display font-bold text-white tracking-wider">
            WADOU Tasty
          </h1>
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">
            Saveurs du Benin
          </span>
        </div>
        
        {/* Loading Dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
