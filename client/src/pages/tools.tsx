import BottomNav from "@/components/BottomNav";
import { useState, useEffect } from "react";
import { Compass, RotateCcw, Calculator, Grid, Navigation } from "lucide-react";
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
    // Load saved tasbih count
    const savedCount = storage.getTasbihCount();
    setCount(savedCount);

    // Calculate Qibla direction
    initializeQibla();

    // Listen to device orientation for compass
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

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const alpha = event.alpha || 0; // Compass heading
    setDeviceHeading(alpha);
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
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        <h1 className="text-2xl font-bold font-serif text-foreground">Tools</h1>

        <div className="grid grid-cols-2 gap-4">
            {/* Tasbih Card */}
            <div className="col-span-2 bg-primary text-primary-foreground rounded-3xl p-6 shadow-xl shadow-primary/20 relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-sm font-medium opacity-80 mb-4">Digital Tasbih</h2>
                    <span 
                      className="text-5xl font-bold font-mono tracking-tighter mb-4"
                      data-testid="tasbih-count"
                    >
                      {count.toString().padStart(3, '0')}
                    </span>
                    <div className="flex gap-4">
                        <button 
                          onClick={handleCountReset} 
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          data-testid="button-reset-tasbih"
                          aria-label="Reset"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={handleCountIncrement}
                          className="px-6 py-2 bg-white text-primary rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform"
                          data-testid="button-increment-tasbih"
                        >
                          Tap
                        </button>
                    </div>
                </div>
            </div>

            {/* Qibla Compass Card */}
            <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-border/40">
                <h3 className="font-bold text-center mb-4 flex items-center justify-center gap-2">
                  <Compass className="w-5 h-5 text-primary" />
                  Qibla Direction
                </h3>
                <div className="relative w-40 h-40 mx-auto">
                  {/* Compass Circle */}
                  <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                  
                  {/* Cardinal Directions */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">N</div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">S</div>
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">W</div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">E</div>
                  
                  {/* Qibla Pointer */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-1 h-16 bg-gradient-to-t from-primary to-transparent rounded-full origin-bottom transition-transform duration-300 ease-out"
                      style={{ 
                        transform: `translateX(-50%) rotate(${compassRotation}deg)`,
                        position: 'absolute',
                        bottom: '50%',
                        left: '50%'
                      }}
                    >
                      <Navigation className="w-4 h-4 text-primary absolute -top-2 left-1/2 -translate-x-1/2 fill-current" />
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-foreground rounded-full border-2 border-white"></div>
                  </div>
                </div>
                {qiblaDirection !== null && (
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    {Math.round(qiblaDirection)}° from North
                  </p>
                )}
            </div>

            {/* Zakat Calculator (Placeholder) */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-border/40 flex flex-col items-center justify-center gap-2 aspect-square">
                <Calculator className="w-8 h-8 text-primary" />
                <span className="font-bold text-sm text-center">Zakat Calculator</span>
                <span className="text-xs text-muted-foreground">Coming Soon</span>
            </div>

            {/* 99 Names of Allah */}
            <Dialog>
                <DialogTrigger asChild>
                    <div 
                      className="bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity aspect-square"
                      data-testid="button-99-names"
                    >
                        <Grid className="w-8 h-8" />
                        <span className="font-bold text-sm text-center">99 Names</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] flex flex-col p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle>Asmaul Husna - 99 Names of Allah</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="flex-1 p-6 pt-0">
                        <div className="grid grid-cols-2 gap-3 pb-6">
                            {namesOfAllah.map((item, idx) => (
                                <div 
                                  key={idx} 
                                  className="bg-muted/30 p-3 rounded-xl border border-border/50 text-center"
                                  data-testid={`name-allah-${idx}`}
                                >
                                    <span className="block font-serif text-2xl text-primary mb-1" style={{ fontFamily: "'Amiri', serif" }}>{item.arabic}</span>
                                    <span className="block text-sm font-bold">{item.name}</span>
                                    <span className="block text-xs text-muted-foreground">{item.meaning}</span>
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
