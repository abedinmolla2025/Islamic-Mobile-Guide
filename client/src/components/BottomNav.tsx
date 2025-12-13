import { Home, BookOpen, Compass, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Quran", path: "/quran" },
    { icon: Compass, label: "Tools", path: "/tools" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border/40 pb-safe pt-2 px-6 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-16",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
              )}>
                <div className={cn(
                  "p-1.5 rounded-full transition-all duration-300",
                  isActive && "bg-primary/10"
                )}>
                  <item.icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
