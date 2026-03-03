import React, { useState, useEffect, useCallback } from 'react';
import { UtensilsCrossed, ChefHat } from 'lucide-react';

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
    <div className="fixed inset-0 bg-secondary/50 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className={`${sizeClasses[size]} animate-spin`}>
            <UtensilsCrossed className={`${sizeClasses[size]} text-primary`} />
          </div>
          <div className={`absolute inset-0 ${sizeClasses[size]} animate-ping opacity-20`}>
            <UtensilsCrossed className={`${sizeClasses[size]} text-primary`} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample images for the carousel
const CAROUSEL_IMAGES = [
  { id: 1, icon: ChefHat, alt: 'Chef', IconClass: 'w-24 h-24' },
  { id: 2, icon: UtensilsCrossed, alt: 'Restaurant', IconClass: 'w-24 h-24' },
  { id: 3, icon: ChefHat, alt: 'Cuisine', IconClass: 'w-24 h-24' },
];

// Full screen loader for initial page load
export const PageLoader: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Smart loading: detect when page is fully loaded
  useEffect(() => {
    const checkPageReady = () => {
      // Check if all resources are loaded
      if (document.readyState === 'complete') {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setIsReady(true);
        }, 500);
      }
    };

    // Listen for page load
    if (document.readyState === 'complete') {
      checkPageReady();
    } else {
      window.addEventListener('load', checkPageReady);
    }

    return () => {
      window.removeEventListener('load', checkPageReady);
    };
  }, []);

  // Carousel animation - images pass one after another
  useEffect(() => {
    if (isReady) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 800);

    return () => clearInterval(interval);
  }, [isReady]);

  // Fade out when ready
  useEffect(() => {
    if (isReady) {
      const fadeOutTimer = setTimeout(() => {
        // Force unmount by setting a class or state in parent
        document.body.classList.remove('loader-active');
      }, 300);
      return () => clearTimeout(fadeOutTimer);
    }
  }, [isReady]);

  // Prevent scroll while loading
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (isReady) {
    return (
      <div className="fixed inset-0 bg-secondary/50 flex flex-col items-center justify-center z-[9999] transition-opacity duration-500 opacity-0 pointer-events-none">
        <PageLoaderContent currentImageIndex={currentImageIndex} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-secondary/50 flex flex-col items-center justify-center z-[9999]">
      <PageLoaderContent currentImageIndex={currentImageIndex} />
    </div>
  );
};

// Separate component for content
const PageLoaderContent: React.FC<{ currentImageIndex: number }> = ({ currentImageIndex }) => {
  return (
    <div className="flex flex-col items-center justify-between h-full py-12 w-full max-w-md">
      {/* Animated Images Carousel - Middle */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-32 h-32">
          {CAROUSEL_IMAGES.map((item, index) => {
            const isActive = index === currentImageIndex;
            
            return (
              <div
                key={item.id}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  isActive 
                    ? 'opacity-100 scale-100 translate-x-0' 
                    : 'opacity-0 scale-75 translate-x-full'
                }`}
              >
                <item.icon className={`${item.IconClass} text-primary`} />
              </div>
            );
          })}
          
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse blur-xl" />
        </div>
      </div>

      {/* Brand Name and Slogan - Above Middle */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground tracking-wider">
          WADOU Tasty
        </h1>
        <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Saveurs du Benin
        </span>
      </div>

      {/* Loading Text - Bottom */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-foreground">
            En cours de chargement
          </p>
          <p className="text-xs text-muted-foreground">
            Veillez patienter...
          </p>
        </div>
      </div>
    </div>
  );
};

// Smart loading manager hook
export const useSmartLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setProgress(100);
  }, []);

  const updateProgress = useCallback((value: number) => {
    setProgress(Math.min(100, Math.max(0, value)));
  }, []);

  useEffect(() => {
    // Auto-stop when resources are loaded
    const handleLoad = () => {
      stopLoading();
    };

    if (document.readyState === 'complete') {
      stopLoading();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [stopLoading]);

  return { isLoading, progress, startLoading, stopLoading, updateProgress };
};
