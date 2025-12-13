import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { dailyVerse } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin, Moon, Loader2 } from "lucide-react";
import patternBg from "@assets/generated_images/subtle_islamic_geometric_pattern_background.png";
import { calculatePrayerTimes, getUserLocation, type PrayerTime } from "@/lib/prayerTimes";
import { getHijriDate, type HijriDate } from "@/lib/hijri";
import { storage } from "@/lib/storage";

export default function Home() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [location, setLocation] = useState<{ city: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializePrayerTimes();
    setHijriDate(getHijriDate());
  }, []);

  const initializePrayerTimes = async () => {
    setLoading(true);
    
    // Try to get saved location first
    let savedLocation = storage.getUserLocation();
    
    if (!savedLocation) {
      // Request user's current location
      const userLocation = await getUserLocation();
      if (userLocation) {
        savedLocation = userLocation;
        storage.setUserLocation(userLocation);
      } else {
        // Default to Dhaka, Bangladesh if location access denied
        savedLocation = { latitude: 23.8103, longitude: 90.4125, city: 'Dhaka' };
      }
    }

    setLocation({ city: savedLocation.city });
    
    // Calculate prayer times
    const times = calculatePrayerTimes(savedLocation.latitude, savedLocation.longitude);
    setPrayerTimes(times);
    setLoading(false);
  };

  const nextPrayer = prayerTimes.find(p => p.isNext);

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '400px' }}
      />

      <div className="relative z-10 max-w-md mx-auto">
        <Header />

        <div className="px-6 space-y-6">
          {/* Hero Card - Next Prayer */}
          <div className="bg-primary rounded-3xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
             <div 
              className="absolute inset-0 opacity-10 z-0 mix-blend-overlay"
              style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '300px' }}
            />
            <div className="relative z-10">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-primary-foreground/80 text-sm font-medium mb-1">Next Prayer</p>
                      <h2 className="text-3xl font-bold tracking-tight">{nextPrayer?.name || 'Fajr'}</h2>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-2xl font-bold">{nextPrayer?.time || '--:--'}</span>
                      <div className="flex items-center gap-1 text-primary-foreground/70 text-xs mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{location?.city || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center border border-white/10">
                    <div>
                      <span className="block text-xs text-primary-foreground/60 uppercase tracking-wider mb-0.5">Hijri Date</span>
                      <span className="font-serif text-lg">{hijriDate?.day} {hijriDate?.month}</span>
                    </div>
                    <div className="h-8 w-px bg-white/20"></div>
                    <div className="text-right">
                       <span className="block text-xs text-primary-foreground/60 uppercase tracking-wider mb-0.5">Today</span>
                       <span className="font-medium text-xs">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Prayer Times List */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" />
              Prayer Times
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-3">
                {prayerTimes.map((prayer, idx) => (
                  <div 
                    key={idx}
                    data-testid={`prayer-${prayer.name.toLowerCase()}`}
                    className={cn(
                      "flex justify-between items-center p-4 rounded-2xl transition-all",
                      prayer.isNext 
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20 scale-[1.02] font-semibold" 
                        : "bg-white border border-border/50 hover:border-primary/30"
                    )}
                  >
                    <span className="text-base">{prayer.name}</span>
                    <span className="text-base font-medium font-sans">{prayer.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Daily Verse */}
          <div className="bg-[#F8F5F1] rounded-3xl p-6 border border-[#E8E0D5] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Moon className="w-32 h-32" />
            </div>
            <div className="relative z-10 text-center space-y-4">
              <span className="inline-block px-3 py-1 bg-[#E8E0D5] text-[#8A7E6D] text-xs font-bold rounded-full uppercase tracking-wider">Daily Verse</span>
              <p className="font-serif text-3xl text-primary leading-relaxed py-2" style={{ fontFamily: "'Amiri', serif" }}>{dailyVerse.arabic}</p>
              <p className="text-muted-foreground italic text-sm">"{dailyVerse.text}"</p>
              <p className="text-xs font-bold text-primary/80 uppercase tracking-widest">— {dailyVerse.ref}</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
