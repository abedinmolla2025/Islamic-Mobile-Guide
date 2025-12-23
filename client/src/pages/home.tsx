import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { AdBanner } from "@/components/AdBanner";
import { cn } from "@/lib/utils";
import { MapPin, Loader2, Moon, Clock, Sun, Sunrise, Sunset, CloudSun, ChevronDown, ChevronUp, Play, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { calculatePrayerTimes, fetchPrayerTimesFromAPI, getUserLocation, type PrayerTime } from "@/lib/prayerTimes";
import { type HijriDate } from "@/lib/hijri";
import { storage } from "@/lib/storage";
import { initAdMob } from "@/lib/admob";
import { getIslamicCelebration, type Celebration } from "@/lib/islamicCelebrations";
import prayingManImg from "@assets/praying_muslim_man.png";

type Language = "en" | "ar" | "bn" | "ur" | "tr";

interface HadithData {
  id: number;
  text: { en: string; ar: string; bn: string; ur: string; tr: string };
  source: string;
  narrator: string;
  collection: string;
}

const hadiths: HadithData[] = [
  { id: 1, text: { en: "The best of you are those who are best to their families, and I am the best among you to my family.", ar: "خيركم خيركم لأهله وأنا خيركم لأهلي", bn: "তোমাদের মধ্যে সেরা হল তারা যারা তাদের পরিবারের প্রতি সেরা।", ur: "تم میں سے بہترین وہ ہیں جو اپنے خاندان کے لیے بہترین ہیں۔", tr: "Sizin en iyileriniz ailelerine iyi davrananlarıdır." }, source: "Sahih Bukhari", narrator: "Prophet Muhammad", collection: "Family & Rights" },
  { id: 2, text: { en: "The best wealth is a good tongue and a thankful heart.", ar: "خير المال لسان ذاكر وقلب شاكر", bn: "সেরা সম্পদ হল ভালো জিহ্বা এবং কৃতজ্ঞ হৃদয়।", ur: "بہترین دولت ایک اچھی زبان اور شکری دل ہے۔", tr: "En iyi servet, iyi bir dil ve şükreden bir kalptir." }, source: "Sahih Bukhari", narrator: "Prophet Muhammad", collection: "Wealth & Gratitude" },
  { id: 3, text: { en: "Whoever believes in Allah and the Last Day should speak good or remain silent.", ar: "من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت", bn: "যে আল্লাহ এবং শেষ দিনে বিশ্বাস করে তার ভালো কথা বলা উচিত অথবা চুপ থাকা উচিত।", ur: "جو اللہ اور آخری دن پر ایمان رکھتا ہے وہ اچھی بات کہے یا خاموش رہے۔", tr: "Kim Allah'a ve Son Güne iman ediyorsa, iyi söylemeli veya sessiz kalmalıdır." }, source: "Sahih Bukhari", narrator: "Prophet Muhammad", collection: "Speech & Wisdom" },
  { id: 4, text: { en: "The greatest jihad is struggling against your own desires and ego.", ar: "أعظم الجهاد جهاد النفس", bn: "সবচেয়ে বড় জিহাদ হল আপনার নিজের প্রবৃত্তির বিরুদ্ধে সংগ্রাম।", ur: "سب سے بڑا جہاد اپنے نفس کے خلاف جہاد ہے۔", tr: "En büyük cihad, kendi nefsine karşı verilen cihadtır." }, source: "Sahih Bukhari", narrator: "Prophet Muhammad", collection: "Spirituality" },
  { id: 5, text: { en: "Whoever builds a masjid, Allah will build for him a house in Paradise.", ar: "من بنى مسجدا بنى الله له مثله في الجنة", bn: "যে মসজিদ নির্মাণ করে, আল্লাহ তার জন্য জান্নায় একটি ঘর নির্মাণ করবেন।", ur: "جو مسجد بنائے، اللہ اس کے لیے جنت میں ایک گھر بنائے گا۔", tr: "Kim bir camii inşa ederse, Allah ona cennette bir ev inşa edecektir." }, source: "Sahih Bukhari", narrator: "Prophet Muhammad", collection: "Good Deeds" },
  { id: 6, text: { en: "Do not envy one another; do not hate one another; do not turn away from one another.", ar: "لا تحاسدوا ولا تباغضوا ولا تدابروا", bn: "একে অপরের প্রতি ঈর্ষা করবেন না; একে অপরকে ঘৃণা করবেন না।", ur: "ایک دوسرے سے حسد نہ کریں، ایک دوسرے سے نفرت نہ کریں۔", tr: "Birbirinize hased etmeyin, birbirinize karşı nefret etmeyin." }, source: "Sahih Bukhari", narrator: "Prophet Muhammad", collection: "Brotherhood" },
  { id: 7, text: { en: "Cleanliness is half of faith.", ar: "الطهور شطر الإيمان", bn: "পবিত্রতা হল ঈমানের অর্ধেক।", ur: "صفائی ایمان کا آدھا حصہ ہے۔", tr: "Temizlik imanın yarısıdır." }, source: "Sahih Muslim", narrator: "Prophet Muhammad", collection: "Purity" },
  { id: 8, text: { en: "The best among you are those who have the best manners and character.", ar: "خيركم أحسنكم أخلاقا", bn: "তোমাদের মধ্যে সেরা হল যাদের সেরা চরিত্র এবং আচরণ আছে।", ur: "تم میں سے بہترین وہ ہیں جن کا کردار سب سے اچھا ہے۔", tr: "Sizin en iyileriniz, ahlak ve davranışı en güzelerinizdir." }, source: "Tirmidhi", narrator: "Prophet Muhammad", collection: "Character" },
  { id: 9, text: { en: "Seeking knowledge is obligatory for every Muslim.", ar: "طلب العلم فريضة على كل مسلم", bn: "জ্ঞান অনুসন্ধান করা প্রতিটি মুসলিমের জন্য বাধ্যতামূলক।", ur: "علم کی تلاش ہر مسلمان کے لیے لازمی ہے۔", tr: "Bilgi arayışı her Müslüman için zorunludur." }, source: "Ibn Majah", narrator: "Prophet Muhammad", collection: "Knowledge" },
  { id: 10, text: { en: "Patience is the key to relief and success.", ar: "الصبر مفتاح الفرج", bn: "ধৈর্য হল মুক্তি এবং সাফল্যের চাবিকাঠি।", ur: "صبر کامیابی کی کلید ہے۔", tr: "Sabır başarının anahtarıdır." }, source: "Baihaqi", narrator: "Prophet Muhammad", collection: "Patience" },
];

const features = [
  { emoji: "📖", label: "Quran", path: "/quran", animation: "animate-page-flip" },
  { emoji: "🤲", label: "Dua", path: "/duas", animation: "animate-hand-wave" },
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

  // Get daily hadith based on date
  const getDailyHadith = (): HadithData => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return hadiths[dayOfYear % hadiths.length];
  };

  const dailyHadith = getDailyHadith();

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
                <div className="relative z-20 p-5">
                  {/* Location & Date / Celebration Header */}
                  {celebration ? (
                    <div className="mb-4 animate-celebration">
                      <div className="inline-flex items-start gap-1.5 bg-amber-300/25 backdrop-blur-md rounded-full px-3 py-1.5 border border-amber-200/40 animate-pulse">
                        <div className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-bounce mt-0.5 flex-shrink-0"></div>
                        <div className="flex flex-col gap-0">
                          <span className="text-amber-50 text-[11px] font-semibold opacity-90 leading-tight">
                            {celebration.name}
                          </span>
                          <span className="text-amber-100 text-xs font-bold leading-tight">
                            {celebration.bengaliName}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-white/70" />
                      <span className="text-white/90 text-sm font-medium">{location?.city || 'Unknown'}</span>
                      <span className="text-white/40 mx-1">·</span>
                      <span className="text-white/70 text-sm">{hijriDate?.day} {hijriDate?.month}, {hijriDate?.year}</span>
                    </div>
                  )}

                  {/* Prayer Name - Large & Bold */}
                  <h2 className="text-4xl font-bold text-white mb-1 tracking-tight">
                    {nextPrayer?.name || 'Fajr'}
                  </h2>
                  
                  {/* Time Display - Clean */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-5xl font-bold text-white tracking-tight">{formattedTime.time}</span>
                    <span className="text-xl text-white/80 font-medium">{formattedTime.period}</span>
                  </div>

                  {/* Countdown - Subtle */}
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <Clock className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 text-xs font-medium">
                      Next in{' '}
                      <span className="text-white font-bold tabular-nums">
                        {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Icons - Scrollable */}
            <div className="px-4 mb-6">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 pb-2 min-w-min">
                  {features.map((feature, idx) => (
                    <Link key={idx} href={feature.path}>
                      <div 
                        className="flex flex-col items-center cursor-pointer group animate-fade-in flex-shrink-0"
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
                        <span className="text-xs text-gray-600 font-medium group-hover:text-emerald-600 transition-colors duration-200 text-center whitespace-nowrap">{feature.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
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
                  {(showAllPrayers ? prayerTimes : prayerTimes.filter(prayer => prayer.isNext)).map((prayer, idx) => (
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
                {prayerTimes.length > 1 && (
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

            {/* Today's Hadith Card */}
            <div className="px-4 mb-4">
              <Link href="/hadith">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-amber-100/50">
                  {/* Header */}
                  <div className="p-4 border-b border-amber-100/50 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-900">Today's Hadith</h3>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {/* English Text */}
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {dailyHadith.text.en}
                    </p>
                    
                    {/* Arabic Text */}
                    <p className="text-amber-900 text-sm leading-relaxed text-right font-medium" style={{ direction: 'rtl' }}>
                      {dailyHadith.text.ar}
                    </p>
                    
                    {/* Source Info */}
                    <div className="flex items-center justify-between pt-2 border-t border-amber-100/50">
                      <span className="text-xs text-amber-700 font-medium">{dailyHadith.source}</span>
                      <span className="text-xs text-amber-600">{dailyHadith.collection}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
