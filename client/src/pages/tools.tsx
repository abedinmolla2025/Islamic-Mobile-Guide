import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { Compass, RotateCcw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Tools() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        <h1 className="text-2xl font-bold font-serif text-foreground">Tools</h1>

        {/* Qibla Compass Mockup */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-border/40 text-center relative overflow-hidden">
            <h2 className="text-lg font-bold mb-6 flex items-center justify-center gap-2">
                <Compass className="w-5 h-5 text-primary" />
                Qibla Compass
            </h2>
            
            <div className="relative w-48 h-48 mx-auto mb-4">
                {/* Compass Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                
                {/* North Marker */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">N</div>
                
                {/* Kaaba Direction (Mock) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                        className="w-1 h-20 bg-gradient-to-t from-primary to-transparent rounded-full origin-bottom absolute bottom-1/2 left-1/2 -translate-x-1/2 rotate-45 transition-all duration-1000 ease-out"
                        style={{ transform: 'translateX(-50%) rotate(45deg)' }}
                    >
                        <div className="w-3 h-3 bg-primary rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow-lg shadow-primary/50"></div>
                    </div>
                </div>

                 {/* Center Dot */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-foreground rounded-full border-2 border-white"></div>
                 </div>
            </div>
            <p className="text-sm text-muted-foreground">Calibrate your device by rotating it in a figure 8.</p>
        </div>

        {/* Digital Tasbih */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-xl shadow-primary/20 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-lg font-medium opacity-80 mb-8">Digital Tasbih</h2>
                
                <div className="mb-8">
                    <span className="text-7xl font-bold font-mono tracking-tighter">{count.toString().padStart(3, '0')}</span>
                </div>

                <div className="flex justify-center gap-6 items-center">
                    <button 
                        onClick={() => setCount(0)}
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        aria-label="Reset"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                    
                    <button 
                        onClick={() => setCount(c => c + 1)}
                        className="w-24 h-24 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                        aria-label="Count"
                    >
                        <div className="w-20 h-20 rounded-full border-2 border-primary/10 flex items-center justify-center">
                            <span className="text-sm font-bold uppercase tracking-wider">Tap</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
