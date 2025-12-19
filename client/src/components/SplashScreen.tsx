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
          {/* Professional Logo with Glow */}
          <div className="relative w-40 h-40 md:w-52 md:h-52">
            {/* Golden Glow Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 blur-3xl opacity-60 animate-pulse"></div>
            
            {/* Logo Image */}
            <img
              src="/noor-logo.png"
              alt="Noor Logo"
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl drop-shadow-lg animate-bounce-logo"
              style={{ 
                filter: "drop-shadow(0 0 30px rgba(217, 119, 6, 0.5))",
                animation: "logo-rise 0.8s ease-out"
              }}
            />
          </div>
        </div>

        {/* App Name - Simplified since logo has text */}
        <div className="animate-text-fade text-center">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center font-medium">
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
