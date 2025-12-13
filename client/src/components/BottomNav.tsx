import { Home, BookOpen, Compass, Heart, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Quran", path: "/quran" },
    { icon: Compass, label: "Qibla", path: "/qibla" },
    { icon: Heart, label: "Dua", path: "/duas" },
    { icon: Settings, label: "More", path: "/tools" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d4a3a] border-t border-white/10">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around items-center py-2 px-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer min-w-[60px]",
                  isActive ? "text-[#D4AF37]" : "text-white/60 hover:text-white/80"
                )}>
                  <item.icon 
                    className={cn(
                      "w-6 h-6 transition-transform duration-200",
                      isActive && "scale-110"
                    )} 
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                  <span className={cn(
                    "text-[10px] font-medium tracking-wide",
                    isActive && "text-[#D4AF37]"
                  )}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="h-safe bg-[#0d4a3a]" />
      </div>
    </div>
  );
}
