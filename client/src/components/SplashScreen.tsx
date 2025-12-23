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
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 z-50 overflow-hidden ${
        isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        background: "linear-gradient(135deg, #0f3d2d 0%, #1a5c47 25%, #2d7a5e 50%, #1a5c47 75%, #0f3d2d 100%)",
      }}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400 to-transparent opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-emerald-300 to-transparent opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s", animationDelay: "0.5s" }}></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-0">
        {/* Decorative Top Element */}
        <div className="mb-4 opacity-0 animate-[fade-in_0.8s_ease-out_0.3s_forwards]">
          <div className="text-amber-300 text-4xl tracking-widest font-light">✦</div>
        </div>

        {/* Animated Logo Container - Premium Style */}
        <div className="relative mb-6 opacity-0 animate-[fade-in_0.8s_ease-out_0.5s_forwards]">
          <div className="relative w-36 h-36 md:w-48 md:h-48">
            {/* Multiple Glow Layers for Premium Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 blur-2xl opacity-40 animate-pulse" style={{ animationDuration: "3s" }}></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-200 to-amber-500 blur-xl opacity-20 animate-pulse" style={{ animationDuration: "3.5s", animationDelay: "0.2s" }}></div>
            
            {/* Inner Ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-amber-300/30 shadow-2xl"></div>
            
            {/* Logo Image with Enhanced Shadow */}
            <img
              src="/noor-logo.png"
              alt="Noor Logo"
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
              style={{ 
                filter: "drop-shadow(0 0 40px rgba(251, 191, 36, 0.6)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
              }}
            />
          </div>
        </div>

        {/* Premium Typography */}
        <div className="text-center mt-8 mb-8 opacity-0 animate-[fade-in_0.8s_ease-out_0.8s_forwards]">
          {/* Main Title */}
          <h1 className="text-2xl md:text-4xl font-light tracking-wide text-white mb-2">
            Islamic Companion
          </h1>
          
          {/* Subtitle Line */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300/50"></div>
            <p className="text-amber-300/80 text-xs md:text-sm font-light tracking-widest uppercase">
              Your Daily Islamic Guide
            </p>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300/50"></div>
          </div>
          
          {/* Description */}
          <p className="text-gray-300 text-xs md:text-sm font-light mt-2">
            Qur'an • Duas • Islamic Names • Prayer Times
          </p>
        </div>

        {/* Premium Loading Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-4 opacity-0 animate-[fade-in_0.8s_ease-out_1s_forwards]">
          {/* Animated Line */}
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-amber-400 to-amber-300 rounded-full"
                style={{
                  height: `${8 + i * 2}px`,
                  animation: `loading-bar 0.8s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-12 opacity-0 animate-[fade-in_0.8s_ease-out_1.2s_forwards]">
          <div className="text-amber-300/30 text-sm tracking-widest font-light">✦</div>
        </div>
      </div>

      {/* Inline Styles for Custom Animations */}
      <style>{`
        @keyframes loading-bar {
          0%, 100% {
            opacity: 0.3;
            transform: scaleY(1);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.2);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
