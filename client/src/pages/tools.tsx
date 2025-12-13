import BottomNav from "@/components/BottomNav";
import { useState, useEffect } from "react";
import { Compass, RotateCcw, Calculator, Grid, Navigation, Wrench, Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { namesOfAllah } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { storage } from "@/lib/storage";
import { calculateQiblaDirection } from "@/lib/qibla";
import { getUserLocation } from "@/lib/prayerTimes";
import { cn } from "@/lib/utils";

export default function Tools() {
  const [count, setCount] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);

  useEffect(() => {
    const savedCount = storage.getTasbihCount();
    setCount(savedCount);
    initializeQibla();

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const alpha = event.alpha || 0;
      setDeviceHeading(alpha);
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  const initializeQibla = async () => {
    let savedQibla = storage.getQiblaDirection();
    
    if (!savedQibla) {
      const location = storage.getUserLocation() || await getUserLocation();
      if (location) {
        savedQibla = calculateQiblaDirection(location.latitude, location.longitude);
        storage.setQiblaDirection(savedQibla);
      }
    }

    setQiblaDirection(savedQibla);
  };

  const handleCountIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    storage.setTasbihCount(newCount);
  };

  const handleCountReset = () => {
    setCount(0);
    storage.setTasbihCount(0);
  };

  const compassRotation = qiblaDirection !== null ? qiblaDirection - deviceHeading : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-28">
      <div className="max-w-lg mx-auto px-5 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tools</h1>
            <p className="text-xs text-muted-foreground">Islamic utilities</p>
          </div>
        </div>

        {/* Tasbih Counter */}
        <div className="relative rounded-[1.75rem] overflow-hidden shadow-premium">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f4c3a] via-[#1a5f4a] to-[#0d3d2f]"></div>
          <div className="relative z-10 p-8 text-white text-center">
            <h2 className="text-xs font-semibold opacity-60 uppercase tracking-widest mb-6">Digital Tasbih</h2>
            <span 
              className="text-7xl font-bold font-mono tracking-tighter block mb-8"
              data-testid="tasbih-count"
            >
              {count.toString().padStart(3, '0')}
            </span>
            <div className="flex justify-center items-center gap-6">
              <button 
                onClick={handleCountReset} 
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
                data-testid="button-reset-tasbih"
                aria-label="Reset"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={handleCountIncrement}
                className="w-20 h-20 rounded-full bg-white text-primary flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
                data-testid="button-increment-tasbih"
              >
                <Plus className="w-8 h-8" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Qibla Compass */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-premium">
            <h3 className="font-bold text-center mb-4 flex items-center justify-center gap-2 text-sm">
              <Compass className="w-4 h-4 text-primary" />
              Qibla Direction
            </h3>
            <div className="relative w-36 h-36 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-muted/50"></div>
              <div className="absolute inset-2 rounded-full border border-muted/30"></div>
              
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary">N</div>
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-muted-foreground">S</div>
              <div className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">W</div>
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">E</div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="transition-transform duration-300 ease-out"
                  style={{ transform: `rotate(${compassRotation}deg)` }}
                >
                  <div className="w-1 h-14 bg-gradient-to-t from-primary/20 to-primary rounded-full relative">
                    <Navigation className="w-5 h-5 text-primary absolute -top-3 left-1/2 -translate-x-1/2 fill-current" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-foreground rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>
            {qiblaDirection !== null && (
              <p className="text-center text-xs text-muted-foreground mt-4">
                {Math.round(qiblaDirection)}° from North
              </p>
            )}
          </div>

          {/* Zakat Calculator */}
          <div className="bg-white p-5 rounded-2xl shadow-premium flex flex-col items-center justify-center gap-2 aspect-square cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-sm text-center">Zakat</span>
            <span className="text-[10px] text-muted-foreground">Coming Soon</span>
          </div>

          {/* 99 Names */}
          <Dialog>
            <DialogTrigger asChild>
              <div 
                className="relative rounded-2xl overflow-hidden shadow-premium flex flex-col items-center justify-center gap-2 aspect-square cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5"
                data-testid="button-99-names"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#B8962E]"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                    <Grid className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm">99 Names</span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl">
              <DialogHeader className="p-6 pb-3 border-b border-border/50">
                <DialogTitle className="text-lg">Asmaul Husna</DialogTitle>
                <p className="text-xs text-muted-foreground">The Beautiful Names of Allah</p>
              </DialogHeader>
              <ScrollArea className="flex-1 p-5">
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {namesOfAllah.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-br from-muted/30 to-muted/10 p-4 rounded-xl border border-border/30 text-center hover:shadow-md transition-all"
                      data-testid={`name-allah-${idx}`}
                    >
                      <span className="block font-serif text-2xl text-primary mb-1" style={{ fontFamily: "'Amiri', serif" }}>{item.arabic}</span>
                      <span className="block text-sm font-bold text-foreground">{item.name}</span>
                      <span className="block text-[10px] text-muted-foreground mt-0.5">{item.meaning}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
