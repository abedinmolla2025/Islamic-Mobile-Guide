import { Home, BookOpen, Compass, Heart, Grid } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: "🏠", label: "Home", path: "/" },
    { icon: "📖", label: "Quran", path: "/quran" },
    { icon: "🧭", label: "Qibla", path: "/qibla" },
    { icon: "🤲", label: "Dua", path: "/duas" },
    { icon: "📿", label: "Tasbih", path: "/tasbih" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg pb-safe">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div className={cn(
                  "flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all duration-200 cursor-pointer min-w-[60px]",
                  isActive ? "text-emerald-600" : "text-gray-400"
                )}>
                  <span className={cn(
                    "text-2xl transition-transform duration-200",
                    isActive && "scale-110"
                  )}>
                    {item.icon}
                  </span>
                  <span className={cn(
                    "text-[10px] font-medium",
                    isActive ? "text-emerald-600" : "text-gray-500"
                  )}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
