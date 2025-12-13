import BottomNav from "@/components/BottomNav";
import { useState, useEffect } from "react";
import { Compass, Calculator, Grid, Navigation, Wrench, Clock, BookOpen, Heart, Moon, Settings, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { namesOfAllah } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const toolsMenu = [
  { icon: Grid, label: "Digital Tasbih", description: "Prayer counter", path: "/tasbih", color: "from-purple-500 to-violet-600" },
  { icon: Compass, label: "Qibla Direction", description: "Find Kaaba direction", path: "/qibla", color: "from-amber-500 to-orange-600" },
  { icon: BookOpen, label: "Holy Quran", description: "Read & Listen", path: "/quran", color: "from-blue-500 to-indigo-600" },
  { icon: Heart, label: "Duas & Azkar", description: "Daily supplications", path: "/duas", color: "from-rose-500 to-pink-600" },
];

export default function Tools() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">More</h1>
            <p className="text-white/60 text-xs">Islamic utilities & tools</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {toolsMenu.map((tool, idx) => (
            <Link key={idx} href={tool.path}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 hover:bg-white/15 transition-all cursor-pointer">
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                  tool.color
                )}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{tool.label}</h3>
                  <p className="text-white/60 text-sm">{tool.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </div>
            </Link>
          ))}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <div 
              className="bg-gradient-to-br from-[#D4AF37] to-[#B8962E] rounded-2xl p-4 flex items-center gap-4 hover:opacity-90 transition-all cursor-pointer"
              data-testid="button-99-names"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">99 Names of Allah</h3>
                <p className="text-white/80 text-sm">Asmaul Husna</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/60" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl bg-[#0d4a3a] border-white/10">
            <DialogHeader className="p-6 pb-3 border-b border-white/10">
              <DialogTitle className="text-lg text-white">Asmaul Husna</DialogTitle>
              <p className="text-xs text-white/60">The Beautiful Names of Allah</p>
            </DialogHeader>
            <ScrollArea className="flex-1 p-5">
              <div className="grid grid-cols-2 gap-3 pb-4">
                {namesOfAllah.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/10 p-4 rounded-xl text-center hover:bg-white/15 transition-all"
                    data-testid={`name-allah-${idx}`}
                  >
                    <span className="block text-2xl text-[#D4AF37] mb-1" style={{ fontFamily: "'Amiri', serif" }}>{item.arabic}</span>
                    <span className="block text-sm font-bold text-white">{item.name}</span>
                    <span className="block text-[10px] text-white/60 mt-0.5">{item.meaning}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Calculator className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-white font-semibold">Zakat Calculator</h3>
          </div>
          <p className="text-white/60 text-sm">Coming Soon - Calculate your annual zakat obligation</p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">WeMuslim v1.0</p>
          <p className="text-white/30 text-xs mt-1">Made with ❤️ for the Ummah</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
