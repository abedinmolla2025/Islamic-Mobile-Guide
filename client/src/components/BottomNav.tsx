import { Home, BookOpen, Compass, HandHeart, Circle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/", color: "text-amber-500" },
    { icon: BookOpen, label: "Quran", path: "/quran", color: "text-emerald-600" },
    { icon: Compass, label: "Qibla", path: "/qibla", color: "text-rose-500" },
    { icon: HandHeart, label: "Dua", path: "/duas", color: "text-amber-500" },
    { icon: Circle, label: "Tasbih", path: "/tasbih", color: "text-emerald-500" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const IconComponent = item.icon;
            return (
              <Link key={item.path} href={item.path}>
                <div className={cn(
                  "flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all duration-200 cursor-pointer min-w-[60px]",
                  isActive ? "text-emerald-600" : "text-gray-400"
                )}>
                  <div className={cn(
                    "w-7 h-7 flex items-center justify-center transition-transform duration-200",
                    isActive && "scale-110"
                  )}>
                    <IconComponent className={cn(
                      "w-6 h-6",
                      isActive ? "text-emerald-600" : item.color
                    )} />
                  </div>
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
