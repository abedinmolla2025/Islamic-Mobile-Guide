import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { AdBanner } from "@/components/AdBanner";
import { cn } from "@/lib/utils";
import { MapPin, Loader2, Moon, Clock, Sun, Sunrise, Sunset, CloudSun, ChevronDown, ChevronUp, Play } from "lucide-react";
import { Link } from "wouter";
import { calculatePrayerTimes, fetchPrayerTimesFromAPI, getUserLocation, type PrayerTime } from "@/lib/prayerTimes";
import { type HijriDate } from "@/lib/hijri";
import { storage } from "@/lib/storage";
import { initAdMob } from "@/lib/admob";
import { getIslamicCelebration, type Celebration } from "@/lib/islamicCelebrations";
import prayingManImg from "@assets/praying_muslim_man.png";

const features = [
  { emoji: "📖", label: "Quran", path: "/quran", animation: "animate-page-flip" },
  { emoji: "🤲", label: "Azkar", path: "/duas", animation: "animate-hand-wave" },
  { emoji: "👶", label: "Names", path: "/names", animation: "animate-smile" },
  { emoji: "🧭", label: "Qibla", path: "/qibla", animation: "animate-spin-slow" },
  { emoji: "📿", label: "Tasbih", path: "/tasbih", animation: "animate-bead-roll" },
  { emoji: "✨", label: "99 Names", path: "/asma-ul-husna", animation: "animate-sparkle" },
];

export default function Home() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [location, setLocation] = useState<{ city: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [showAllPrayers, setShowAllPrayers] = useState(false);
  const [celebration, setCelebration] = useState<Celebration | null>(null);

  useEffect(() => {
    initAdMob();
    initializePrayerTimes();
    setCelebration(getIslamicCelebration());
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
    
    // Try to fetch from Aladhan API first
    const apiResult = await fetchPrayerTimesFromAPI(savedLocation.latitude, savedLocation.longitude);
    
    if (apiResult) {
      setPrayerTimes(apiResult.prayers);
      setHijriDate(apiResult.hijri);
    } else {
      // Fallback to local calculation
      const times = calculatePrayerTimes(savedLocation.latitude, savedLocation.longitude);
      setPrayerTimes(times);
    }
    
    setLoading(false);
    
    // Try to get actual user location in background
    if (!storage.getUserLocation()) {
      getUserLocation().then(async (userLocation) => {
        if (userLocation) {
          storage.setUserLocation(userLocation);
          setLocation({ city: userLocation.city });
          
          // Fetch from API for new location
          const newApiResult = await fetchPrayerTimesFromAPI(userLocation.latitude, userLocation.longitude);
          if (newApiResult) {
            setPrayerTimes(newApiResult.prayers);
            setHijriDate(newApiResult.hijri);
          } else {
            const newTimes = calculatePrayerTimes(userLocation.latitude, userLocation.longitude);
            setPrayerTimes(newTimes);
          }
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
            <div className="p-4 pt-6">
              {/* Premium Prayer Card - WeMuslim Style */}
              <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-3xl overflow-hidden shadow-xl">
                {/* Golden Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent animate-shimmer-glow rounded-3xl pointer-events-none"></div>

                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.08]">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1.5" fill="white"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#dots)"/>
                  </svg>
                </div>

                {/* Praying Man Illustration - Positioned Right */}
                <div className="absolute right-2 bottom-0 z-10">
                  <img 
                    src={prayingManImg} 
                    alt="" 
                    loading="lazy"
                    className="w-28 h-28 object-contain drop-shadow-2xl scale-x-[-1]" 
                    style={{
                      mixBlendMode: 'lighten',
                      opacity: 0.85,
                      filter: 'brightness(1.1) contrast(1.1)',
                    }}
                  />
                </div>
                
                {/* Card Content */}
                <div className="relative z-20 p-6">
                  {/* Location & Date / Celebration Header */}
                  {celebration ? (
                    <div className="mb-6 inline-flex items-center gap-2 bg-amber-300/25 backdrop-blur-md rounded-full px-4 py-2 border border-amber-200/40 animate-pulse">
                      <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce"></div>
                      <span className="text-amber-50 text-sm font-bold">
                        {celebration.bengaliName}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mb-6">
                      <MapPin className="w-4 h-4 text-white/70" />
                      <span className="text-white/90 text-sm font-medium">{location?.city || 'Unknown'}</span>
                      <span className="text-white/40 mx-1">·</span>
                      <span className="text-white/70 text-sm">{hijriDate?.day} {hijriDate?.month}, {hijriDate?.year}</span>
                    </div>
                  )}

                  {/* Prayer Name - Large & Bold */}
                  <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                    {nextPrayer?.name || 'Fajr'}
                  </h2>
                  
                  {/* Time Display - Clean */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-white tracking-tight">{formattedTime.time}</span>
                    <span className="text-xl text-white/80 font-medium">{formattedTime.period}</span>
                  </div>

                  {/* Countdown - Subtle */}
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                    <Clock className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 text-sm font-medium">
                      Next in{' '}
                      <span className="text-white font-bold tabular-nums">
                        {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Icons */}
            <div className="px-4 mb-6">
              <div className="flex justify-between gap-2">
                {features.map((feature, idx) => (
                  <Link key={idx} href={feature.path}>
                    <div 
                      className="flex flex-col items-center cursor-pointer group animate-fade-in"
                      style={{
                        animationDelay: `${idx * 0.1}s`,
                        opacity: 0,
                        animation: `fadeIn 0.6s ease-out ${idx * 0.1}s forwards`
                      }}
                      data-testid={`feature-${feature.label.toLowerCase()}`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-2 group-hover:shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                        <span className={`text-2xl ${feature.animation}`} style={{ animationDelay: `${idx * 0.1}s` }}>{feature.emoji}</span>
                      </div>
                      <span className="text-xs text-gray-600 font-medium group-hover:text-emerald-600 transition-colors duration-200">{feature.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Animated Audio Player Button */}
            <div className="px-4 mb-6">
              <Link href="/quran">
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 shadow-lg overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-2 right-2 w-20 h-20 bg-white/30 rounded-full blur-lg animate-pulse" />
                    </div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-white/90 text-sm font-medium mb-1">Listen to Quran</p>
                        <h3 className="text-white font-bold text-lg">Audio Recitation</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                        </div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                          <div className="w-1 h-6 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                          <div className="w-1 h-8 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-1 h-5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Prayer Times List */}
            <div className="px-4 mb-4">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Today's Prayer Times</h3>
                  <span className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {(showAllPrayers ? prayerTimes : prayerTimes.slice(0, 3)).map((prayer, idx) => (
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
                {prayerTimes.length > 3 && (
                  <button
                    onClick={() => setShowAllPrayers(!showAllPrayers)}
                    data-testid="button-show-more-prayers"
                    className="w-full py-3 flex items-center justify-center gap-2 text-emerald-600 font-medium text-sm border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {showAllPrayers ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Show More</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
