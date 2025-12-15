import { Home, BookOpen, Compass, HandHeart, CircleDot } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Quran", path: "/quran" },
    { icon: Compass, label: "Qibla", path: "/qibla" },
    { icon: HandHeart, label: "Dua", path: "/duas" },
    { icon: CircleDot, label: "Tasbih", path: "/tasbih" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-premium">
      <div className="max-w-lg mx-auto pb-safe">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const IconComponent = item.icon;
            return (
              <Link key={item.path} href={item.path}>
                <div 
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 cursor-pointer min-w-[60px]",
                    isActive && "bg-emerald-50"
                  )}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  <IconComponent 
                    className={cn(
                      "w-6 h-6 transition-all duration-200",
                      isActive ? "text-emerald-600" : "text-gray-400"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className={cn(
                    "text-[10px] font-semibold tracking-wide",
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
