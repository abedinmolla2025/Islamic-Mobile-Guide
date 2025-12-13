import { Home, BookOpen, Compass, HeartHandshake } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Quran", path: "/quran" },
    { icon: HeartHandshake, label: "Dua", path: "/duas" },
    { icon: Compass, label: "Tools", path: "/tools" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe">
      <div className="max-w-md mx-auto">
        <div className="glass rounded-2xl shadow-premium border border-white/50 px-2 py-2 mb-2">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div className={cn(
                    "flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300 cursor-pointer relative",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
                  )}>
                    {isActive && (
                      <div className="absolute inset-0 bg-primary/10 rounded-xl" />
                    )}
                    <item.icon 
                      className={cn(
                        "w-5 h-5 relative z-10 transition-transform duration-200",
                        isActive && "scale-110"
                      )} 
                      strokeWidth={isActive ? 2.5 : 2} 
                    />
                    <span className={cn(
                      "text-[10px] font-semibold tracking-wide relative z-10",
                      isActive && "text-primary"
                    )}>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
