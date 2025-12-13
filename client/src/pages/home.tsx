import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";
import { MapPin, Loader2, BookOpen, Compass, Heart, Grid, ChevronRight, Moon, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { calculatePrayerTimes, getUserLocation, type PrayerTime } from "@/lib/prayerTimes";
import { getHijriDate, type HijriDate } from "@/lib/hijri";
import { storage } from "@/lib/storage";

const features = [
  { icon: "📖", label: "Quran", path: "/quran", color: "bg-emerald-500" },
  { icon: "🤲", label: "Azkar", path: "/duas", color: "bg-amber-500" },
  { icon: "📍", label: "Nearby", path: "/tools", color: "bg-red-500" },
  { icon: "🧭", label: "Qibla", path: "/qibla", color: "bg-emerald-500" },
  { icon: "📿", label: "Tasbih", path: "/tasbih", color: "bg-emerald-400" },
  { icon: "📅", label: "Hijri", path: "/tools", color: "bg-cyan-500" },
  { icon: "🕌", label: "Hajj", path: "/tools", color: "bg-purple-500" },
];

export default function Home() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [location, setLocation] = useState<{ city: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    initializePrayerTimes();
    setHijriDate(getHijriDate());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      updateCountdown();
    }, 1000);
    return () => clearInterval(timer);
  }, [prayerTimes]);

  const updateCountdown = () => {
    const nextPrayer = prayerTimes.find(p => p.isNext);
    if (!nextPrayer) return;

    const now = new Date();
    const [hours, minutes] = nextPrayer.time.split(':');
    const prayerTime = new Date();
    prayerTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    if (prayerTime <= now) {
      prayerTime.setDate(prayerTime.getDate() + 1);
    }

    const diff = prayerTime.getTime() - now.getTime();
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    setCountdown({ hours: h, minutes: m, seconds: s });
  };

  const initializePrayerTimes = async () => {
    setLoading(true);
    
    // Use default location immediately, then try to get user's location
    const defaultLocation = { latitude: 23.8103, longitude: 90.4125, city: 'Dhaka' };
    let savedLocation = storage.getUserLocation() || defaultLocation;
    
    setLocation({ city: savedLocation.city });
    const times = calculatePrayerTimes(savedLocation.latitude, savedLocation.longitude);
    setPrayerTimes(times);
    setLoading(false);
    
    // Try to get actual user location in background
    if (!storage.getUserLocation()) {
      getUserLocation().then(userLocation => {
        if (userLocation) {
          storage.setUserLocation(userLocation);
          setLocation({ city: userLocation.city });
          const newTimes = calculatePrayerTimes(userLocation.latitude, userLocation.longitude);
          setPrayerTimes(newTimes);
        }
      });
    }
  };

  const nextPrayer = prayerTimes.find(p => p.isNext);
  const formatTime = (time: string) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return { time: `${hour12}:${m}`, period: ampm };
  };

  const formattedTime = nextPrayer ? formatTime(nextPrayer.time) : { time: '--:--', period: '' };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-lg mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : (
          <>
            <div className="p-4">
              <div className="relative bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-3xl p-5 overflow-hidden shadow-lg">
                <div className="absolute inset-0 opacity-20">
                  <svg className="absolute right-0 bottom-0 h-48 w-48" viewBox="0 0 100 100">
                    <path d="M50 5 L60 35 L95 35 L65 55 L75 90 L50 70 L25 90 L35 55 L5 35 L40 35 Z" fill="currentColor" className="text-emerald-800"/>
                  </svg>
                </div>
                
                <div className="absolute right-4 top-4">
                  <div className="bg-white rounded-full px-3 py-1">
                    <span className="text-emerald-600 font-bold text-sm">Wemu</span>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-white/90 text-sm mb-4">
                    {hijriDate?.month} {hijriDate?.day}, {hijriDate?.year} AH
                  </p>

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-3xl font-bold text-white">{nextPrayer?.name || 'Fajr'}</h2>
                        <span className="text-2xl">🌙</span>
                      </div>
                      
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-5xl font-bold text-white">{formattedTime.time}</span>
                        <span className="text-xl text-white/90 ml-1">{formattedTime.period}</span>
                      </div>

                      <p className="text-white/80 text-sm mb-4">
                        Next prayer in {String(countdown.hours).padStart(2, '0')} : {String(countdown.minutes).padStart(2, '0')} : {String(countdown.seconds).padStart(2, '0')}
                      </p>

                      <div className="flex items-center gap-2 text-white/70 text-sm border-t border-white/20 pt-3">
                        <span>Tap to view more prayer times</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="text-6xl">🧎</div>
                    </div>
                  </div>
                </div>

                <Link href="/tools">
                  <div className="absolute right-4 bottom-4 w-10 h-10 bg-emerald-700/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-700/70 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="px-4 mb-4">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {features.map((feature, idx) => (
                  <Link key={idx} href={feature.path}>
                    <div 
                      className="flex flex-col items-center min-w-[70px] cursor-pointer"
                      data-testid={`feature-${feature.label.toLowerCase()}`}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-2 hover:shadow-lg transition-shadow">
                        <span className="text-3xl">{feature.icon}</span>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{feature.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-4 mb-4">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Today's Prayer Times</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {prayerTimes.map((prayer, idx) => (
                    <div 
                      key={idx}
                      data-testid={`prayer-${prayer.name.toLowerCase()}`}
                      className={cn(
                        "flex items-center justify-between px-4 py-3",
                        prayer.isNext && "bg-emerald-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                          prayer.isNext ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
                        )}>
                          {prayer.name === 'Fajr' && '🌙'}
                          {prayer.name === 'Sunrise' && '🌅'}
                          {prayer.name === 'Dhuhr' && '☀️'}
                          {prayer.name === 'Asr' && '🌤️'}
                          {prayer.name === 'Maghrib' && '🌇'}
                          {prayer.name === 'Isha' && '🌙'}
                        </div>
                        <span className={cn(
                          "font-medium",
                          prayer.isNext ? "text-emerald-700" : "text-gray-700"
                        )}>
                          {prayer.name}
                        </span>
                      </div>
                      <span className={cn(
                        "font-semibold tabular-nums",
                        prayer.isNext ? "text-emerald-600" : "text-gray-600"
                      )}>
                        {prayer.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm justify-center">
                <MapPin className="w-4 h-4" />
                <span>{location?.city || 'Unknown Location'}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
