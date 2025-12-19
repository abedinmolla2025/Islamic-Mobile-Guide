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
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-center transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Animated Logo */}
        <div className="animate-logo-rise">
          {/* Logo Circle Background */}
          <div className="relative w-24 h-24">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-xl opacity-60 animate-pulse"></div>
            
            {/* Main Logo Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 shadow-2xl flex items-center justify-center">
              {/* Crescent Moon Icon */}
              <div className="text-5xl animate-spin-slow-logo">☪️</div>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
          </div>
        </div>

        {/* App Name */}
        <div className="animate-text-fade mt-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Noor
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
            Islamic Companion
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex gap-1 mt-6">
          <div className="animate-bounce-dot w-2 h-2 bg-emerald-500 rounded-full" style={{ animationDelay: "0s" }}></div>
          <div className="animate-bounce-dot w-2 h-2 bg-emerald-500 rounded-full" style={{ animationDelay: "0.2s" }}></div>
          <div className="animate-bounce-dot w-2 h-2 bg-emerald-500 rounded-full" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
}
