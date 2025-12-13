import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { dailyVerse } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { MapPin, Loader2, BookOpen, Compass, Heart, Grid, Moon, Sun, Sunset, CloudMoon, Clock } from "lucide-react";
import { Link } from "wouter";
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

const features = [
  { icon: Clock, label: "Prayer Times", path: "/", color: "from-emerald-500 to-teal-600" },
  { icon: BookOpen, label: "Quran", path: "/quran", color: "from-blue-500 to-indigo-600" },
  { icon: Compass, label: "Qibla", path: "/qibla", color: "from-amber-500 to-orange-600" },
  { icon: Heart, label: "Duas", path: "/duas", color: "from-rose-500 to-pink-600" },
  { icon: Grid, label: "Tasbih", path: "/tasbih", color: "from-purple-500 to-violet-600" },
  { icon: Moon, label: "99 Names", path: "/tools", color: "from-cyan-500 to-blue-600" },
];

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
    <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] pb-24">
      <div className="max-w-lg mx-auto">
        <div className="px-4 pt-6 pb-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/60 text-sm">Assalamu Alaikum</p>
              <h1 className="text-2xl font-bold text-white">WeMuslim</h1>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location?.city || 'Loading...'}</span>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-white/60" />
            </div>
          ) : (
            <>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Next Prayer</p>
                    <h2 className="text-3xl font-bold text-white">{nextPrayer?.name || 'Fajr'}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#D4AF37]">{nextPrayer?.time || '--:--'}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                    <span className="text-white/60 text-[10px] uppercase tracking-wider block mb-1">Hijri</span>
                    <span className="text-white font-medium text-sm">{hijriDate?.day} {hijriDate?.month}</span>
                  </div>
                  <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                    <span className="text-white/60 text-[10px] uppercase tracking-wider block mb-1">Today</span>
                    <span className="text-white font-medium text-sm">
                      {new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-white/80 font-semibold mb-3 text-sm uppercase tracking-wider">Today's Prayers</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl divide-y divide-white/10">
                  {prayerTimes.map((prayer, idx) => {
                    const IconComponent = prayerIcons[prayer.name] || Moon;
                    return (
                      <div 
                        key={idx}
                        data-testid={`prayer-${prayer.name.toLowerCase()}`}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 transition-colors",
                          prayer.isNext && "bg-[#D4AF37]/20"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            prayer.isNext ? "bg-[#D4AF37]" : "bg-white/10"
                          )}>
                            <IconComponent className={cn("w-4 h-4", prayer.isNext ? "text-white" : "text-white/70")} />
                          </div>
                          <span className={cn("font-medium", prayer.isNext ? "text-white" : "text-white/70")}>
                            {prayer.name}
                          </span>
                        </div>
                        <span className={cn(
                          "font-bold tabular-nums",
                          prayer.isNext ? "text-[#D4AF37]" : "text-white/70"
                        )}>
                          {prayer.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <div className="mb-6">
            <h3 className="text-white/80 font-semibold mb-3 text-sm uppercase tracking-wider">Features</h3>
            <div className="grid grid-cols-3 gap-3">
              {features.map((feature, idx) => (
                <Link key={idx} href={feature.path}>
                  <div 
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/15 transition-all cursor-pointer"
                    data-testid={`feature-${feature.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br mx-auto mb-2 flex items-center justify-center",
                      feature.color
                    )}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white/80 text-xs font-medium">{feature.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-[#D4AF37]" />
              </div>
              <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">Daily Verse</span>
            </div>
            <p className="text-2xl text-white text-center py-2 leading-relaxed" style={{ fontFamily: "'Amiri', serif" }}>
              {dailyVerse.arabic}
            </p>
            <p className="text-white/60 italic text-sm text-center mt-3">"{dailyVerse.text}"</p>
            <p className="text-[#D4AF37]/70 text-[10px] font-bold uppercase tracking-[0.15em] text-center mt-2">
              {dailyVerse.ref}
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
