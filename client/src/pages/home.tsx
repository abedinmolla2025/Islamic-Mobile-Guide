import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { dailyVerse } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { MapPin, Moon, Loader2, Sun, Sunset, CloudMoon, Sparkles } from "lucide-react";
import patternBg from "@assets/generated_images/subtle_islamic_geometric_pattern_background.png";
import { calculatePrayerTimes, getUserLocation, type PrayerTime } from "@/lib/prayerTimes";
import { getHijriDate, type HijriDate } from "@/lib/hijri";
import { storage } from "@/lib/storage";

const prayerIcons: Record<string, any> = {
  'Fajr': CloudMoon,
  'Sunrise': Sun,
  'Dhuhr': Sun,
  'Asr': Sunset,
  'Maghrib': Sunset,
  'Isha': Moon,
};

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
    let savedLocation = storage.getUserLocation();
    
    if (!savedLocation) {
      const userLocation = await getUserLocation();
      if (userLocation) {
        savedLocation = userLocation;
        storage.setUserLocation(userLocation);
      } else {
        savedLocation = { latitude: 23.8103, longitude: 90.4125, city: 'Dhaka' };
      }
    }

    setLocation({ city: savedLocation.city });
    const times = calculatePrayerTimes(savedLocation.latitude, savedLocation.longitude);
    setPrayerTimes(times);
    setLoading(false);
  };

  const nextPrayer = prayerTimes.find(p => p.isNext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-28 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none"
        style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '350px' }}
      />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center py-6 px-5">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-primary/70 uppercase tracking-[0.2em] mb-1">Islamic Companion</span>
            <h1 className="text-3xl font-bold text-gradient tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Noor</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
          </div>
        </header>

        <div className="px-5 space-y-5">
          {/* Hero Card - Next Prayer */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-premium">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f4c3a] via-[#1a5f4a] to-[#0d3d2f]"></div>
            <div 
              className="absolute inset-0 opacity-[0.08]"
              style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '250px' }}
            />
            <div className="relative z-10 p-6 text-white">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin opacity-60" />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Next Prayer</p>
                      <h2 className="text-4xl font-bold tracking-tight">{nextPrayer?.name || 'Fajr'}</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold tabular-nums">{nextPrayer?.time || '--:--'}</span>
                      <div className="flex items-center gap-1.5 text-white/50 text-xs mt-1 justify-end">
                        <MapPin className="w-3 h-3" />
                        <span>{location?.city || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <span className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">Hijri</span>
                      <span className="font-serif text-base font-medium">{hijriDate?.day} {hijriDate?.month}</span>
                    </div>
                    <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <span className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">Today</span>
                      <span className="font-medium text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Prayer Times Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Today's Prayers</h3>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {prayerTimes.map((prayer, idx) => {
                  const IconComponent = prayerIcons[prayer.name] || Moon;
                  return (
                    <div 
                      key={idx}
                      data-testid={`prayer-${prayer.name.toLowerCase()}`}
                      className={cn(
                        "relative p-4 rounded-2xl transition-all duration-300 text-center group",
                        prayer.isNext 
                          ? "bg-gradient-to-br from-accent to-amber-500 text-white shadow-lg shadow-accent/30 scale-[1.02]" 
                          : "bg-white shadow-premium hover:shadow-lg hover:-translate-y-0.5"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center",
                        prayer.isNext ? "bg-white/20" : "bg-primary/10"
                      )}>
                        <IconComponent className={cn("w-4 h-4", prayer.isNext ? "text-white" : "text-primary")} />
                      </div>
                      <span className={cn("block text-xs font-medium mb-0.5", prayer.isNext ? "text-white/80" : "text-muted-foreground")}>{prayer.name}</span>
                      <span className={cn("block text-sm font-bold tabular-nums", prayer.isNext ? "text-white" : "text-foreground")}>{prayer.time}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Daily Verse */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-premium relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Daily Verse</span>
              </div>
              <p className="font-serif text-3xl text-foreground leading-relaxed text-center py-3" style={{ fontFamily: "'Amiri', serif" }}>{dailyVerse.arabic}</p>
              <p className="text-muted-foreground italic text-sm text-center mt-4">"{dailyVerse.text}"</p>
              <p className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.15em] text-center mt-3">{dailyVerse.ref}</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
