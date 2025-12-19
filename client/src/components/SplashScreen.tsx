import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 300);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950 flex items-center justify-center transition-opacity duration-300 z-50 ${
        isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Animated Logo Container */}
        <div className="animate-logo-rise">
          {/* Logo Circle Background */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Outer Glow Ring - Enhanced */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-emerald-400 to-teal-500 blur-2xl opacity-70 animate-pulse"></div>
            
            {/* Second Ring - Rotating */}
            <div className="absolute inset-2 rounded-full border-4 border-emerald-300 dark:border-emerald-600 opacity-40 animate-spin-slow"></div>
            
            {/* Main Logo Circle - Enhanced Gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 dark:from-emerald-600 dark:via-green-600 dark:to-teal-700 shadow-2xl flex items-center justify-center border-2 border-amber-300 dark:border-amber-400">
              {/* Crescent Moon Icon - Larger */}
              <div className="text-7xl md:text-8xl animate-bounce-logo drop-shadow-lg">☪️</div>
            </div>

            {/* Shimmer Effect - Enhanced */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white dark:via-gray-100 to-transparent opacity-30 animate-shimmer"></div>
          </div>
        </div>

        {/* App Name - Enhanced */}
        <div className="animate-text-fade text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent drop-shadow-sm">
            Noor
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center mt-3 font-medium">
            Islamic Companion
          </p>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            Your Daily Islamic Guide
          </p>
        </div>

        {/* Loading Dots - Enhanced */}
        <div className="flex gap-2 mt-8">
          <div className="animate-bounce-dot w-3 h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full shadow-lg" style={{ animationDelay: "0s" }}></div>
          <div className="animate-bounce-dot w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full shadow-lg" style={{ animationDelay: "0.2s" }}></div>
          <div className="animate-bounce-dot w-3 h-3 bg-teal-500 dark:bg-teal-400 rounded-full shadow-lg" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
}
