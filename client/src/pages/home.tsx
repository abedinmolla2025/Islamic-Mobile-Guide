import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";
import { MapPin, Loader2, BookOpen, Compass, Moon, Clock, Sun, Sunrise, Sunset, CloudSun, HandHeart, MapPinned, CircleDot, Calendar } from "lucide-react";
import { Link } from "wouter";
import { calculatePrayerTimes, getUserLocation, type PrayerTime } from "@/lib/prayerTimes";
import { getHijriDate, type HijriDate } from "@/lib/hijri";
import { storage } from "@/lib/storage";
import prayingManImg from "@assets/generated_images/muslim_man_praying_illustration.png";

const features = [
  { icon: BookOpen, label: "Quran", path: "/quran", color: "text-emerald-600" },
  { icon: HandHeart, label: "Azkar", path: "/duas", color: "text-amber-500" },
  { icon: MapPinned, label: "Nearby", path: "/tools", color: "text-red-500" },
  { icon: Compass, label: "Qibla", path: "/qibla", color: "text-emerald-500" },
  { icon: CircleDot, label: "Tasbih", path: "/tasbih", color: "text-emerald-400" },
  { icon: Calendar, label: "Hijri", path: "/tools", color: "text-cyan-500" },
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
              {/* Enhanced Prayer Card - Compact */}
              <div className="relative bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl overflow-hidden shadow-lg">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                  <div className="absolute right-0 top-0 w-40 h-40 opacity-10">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <path d="M100 10 L120 70 L185 70 L135 110 L155 175 L100 140 L45 175 L65 110 L15 70 L80 70 Z" fill="currentColor" className="text-white"/>
                    </svg>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="relative z-10 p-4">
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white/80" />
                      <span className="text-white/90 text-xs font-medium">{location?.city || 'Unknown'}</span>
                      <span className="text-white/60 text-xs">|</span>
                      <span className="text-white/70 text-xs">{hijriDate?.day} {hijriDate?.month}, {hijriDate?.year}</span>
                    </div>
                    <div className="bg-white rounded-full px-3 py-1 shadow-md">
                      <span className="text-emerald-600 font-bold text-xs">Noor</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Left Content */}
                    <div className="flex-1">
                      {/* Prayer Name with Icon */}
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Moon className="w-4 h-4 text-amber-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">{nextPrayer?.name || 'Fajr'}</h2>
                      </div>
                      
                      {/* Time Display */}
                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span className="text-4xl font-bold text-white tracking-tight">{formattedTime.time}</span>
                        <span className="text-lg text-white/90 font-semibold">{formattedTime.period}</span>
                      </div>

                      {/* Countdown */}
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-white/70" />
                        <p className="text-white/80 text-xs font-medium">
                          Next in{' '}
                          <span className="text-white font-bold tabular-nums">
                            {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={prayingManImg} 
                        alt="Praying man" 
                        className="w-24 h-24 object-contain rounded-xl" 
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
                        <feature.icon className={cn("w-8 h-8", feature.color)} />
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
