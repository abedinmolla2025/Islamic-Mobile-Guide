import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";
import { MapPin, Loader2, BookOpen, Compass, Heart, Grid, ChevronRight, Moon, ArrowRight, Clock, Sun, Sunrise, Sunset, CloudSun } from "lucide-react";
import { Link } from "wouter";
import { calculatePrayerTimes, getUserLocation, type PrayerTime } from "@/lib/prayerTimes";
import { getHijriDate, type HijriDate } from "@/lib/hijri";
import { storage } from "@/lib/storage";
import prayingManImg from "@assets/praying_man.png";

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

    // Parse time like "05:30 AM" or "10:58 PM"
    const timeParts = nextPrayer.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeParts) return;

    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const period = timeParts[3].toUpperCase();

    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    const now = new Date();
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0, 0);

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
  
  // Extract time and period from the prayer time string
  const getFormattedTime = () => {
    if (!nextPrayer) return { time: '--:--', period: 'AM' };
    
    const timeParts = nextPrayer.time.match(/(\d+:\d+)\s*(AM|PM)/i);
    if (!timeParts) return { time: nextPrayer.time, period: '' };
    
    return { time: timeParts[1], period: timeParts[2] };
  };

  const formattedTime = getFormattedTime();

  // Get prayer icon
  const getPrayerIcon = (name: string) => {
    switch (name) {
      case 'Fajr': return <Moon className="w-5 h-5" />;
      case 'Sunrise': return <Sunrise className="w-5 h-5" />;
      case 'Dhuhr': return <Sun className="w-5 h-5" />;
      case 'Asr': return <CloudSun className="w-5 h-5" />;
      case 'Maghrib': return <Sunset className="w-5 h-5" />;
      case 'Isha': return <Moon className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

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
              {/* Enhanced Prayer Card */}
              <div className="relative bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-3xl overflow-hidden shadow-xl">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                  <div className="absolute right-0 top-0 w-64 h-64 opacity-10">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <path d="M100 10 L120 70 L185 70 L135 110 L155 175 L100 140 L45 175 L65 110 L15 70 L80 70 Z" fill="currentColor" className="text-white"/>
                    </svg>
                  </div>
                  <div className="absolute left-0 bottom-0 w-48 h-48 opacity-5">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-white"/>
                      <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-white"/>
                      <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-white"/>
                    </svg>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="relative z-10 p-5">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white/80" />
                      <span className="text-white/90 text-sm font-medium">{location?.city || 'Unknown'}</span>
                    </div>
                    <div className="bg-white rounded-full px-4 py-1.5 shadow-lg">
                      <span className="text-emerald-600 font-bold text-sm tracking-wide">Wemu</span>
                    </div>
                  </div>

                  {/* Hijri Date */}
                  <p className="text-white/80 text-sm mb-3 font-medium">
                    {hijriDate?.day} {hijriDate?.month}, {hijriDate?.year} AH
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Left Content */}
                    <div className="flex-1">
                      {/* Prayer Name with Icon */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Moon className="w-5 h-5 text-amber-300" />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">{nextPrayer?.name || 'Fajr'}</h2>
                      </div>
                      
                      {/* Time Display */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-5xl font-bold text-white tracking-tight">{formattedTime.time}</span>
                        <span className="text-xl text-white/90 font-semibold">{formattedTime.period}</span>
                      </div>

                      {/* Countdown */}
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-white/70" />
                        <p className="text-white/80 text-sm font-medium">
                          Next prayer in{' '}
                          <span className="text-white font-bold tabular-nums">
                            {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                          </span>
                        </p>
                      </div>

                      {/* CTA */}
                      <Link href="/tools">
                        <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group">
                          <span className="text-sm font-medium">View all prayer times</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </div>

                    {/* Right Image */}
                    <div className="flex-shrink-0 relative">
                      <div className="absolute inset-0 bg-emerald-600/30 rounded-2xl blur-xl"></div>
                      <img 
                        src={prayingManImg} 
                        alt="Praying man" 
                        className="w-32 h-32 object-cover rounded-2xl relative z-10" 
                        style={{ clipPath: 'inset(3% 3% 3% 3% round 12px)' }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Icons */}
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

            {/* Prayer Times List */}
            <div className="px-4 mb-4">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Today's Prayer Times</h3>
                  <span className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {prayerTimes.map((prayer, idx) => (
                    <div 
                      key={idx}
                      data-testid={`prayer-${prayer.name.toLowerCase()}`}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5 transition-colors",
                        prayer.isNext && "bg-emerald-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center",
                          prayer.isNext ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
                        )}>
                          {getPrayerIcon(prayer.name)}
                        </div>
                        <span className={cn(
                          "font-medium",
                          prayer.isNext ? "text-emerald-700" : "text-gray-700"
                        )}>
                          {prayer.name}
                        </span>
                        {prayer.isNext && (
                          <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                            Next
                          </span>
                        )}
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

            {/* Location Footer */}
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
