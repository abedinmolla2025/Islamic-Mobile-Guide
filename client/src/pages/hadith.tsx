import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Language = "en" | "ar" | "bn" | "ur" | "tr";

interface HadithTranslations {
  en: string;
  ar: string;
  bn: string;
  ur: string;
  tr: string;
}

interface Hadith {
  id: number;
  text: HadithTranslations;
  source: string;
  narrator: string;
  collection: string;
}

const languages: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "bn", name: "বাংলা" },
  { code: "ur", name: "اردو" },
  { code: "tr", name: "Türkçe" },
];

const hadiths: Hadith[] = [
  {
    id: 1,
    text: {
      en: "The best of you are those who are best to their families, and I am the best among you to my family.",
      ar: "خيركم خيركم لأهله وأنا خيركم لأهلي",
      bn: "তোমাদের মধ্যে সেরা হল তারা যারা তাদের পরিবারের প্রতি সেরা, এবং আমি আমার পরিবারের প্রতি তোমাদের মধ্যে সেরা।",
      ur: "تم میں سے بہترین وہ ہیں جو اپنے خاندان کے لیے بہترین ہیں، اور میں اپنے خاندان کے لیے تم میں سے بہترین ہوں۔",
      tr: "Sizin en iyileriniz ailelerine iyi davrananlarıdır, ve ben aileme size en iyi davranandır."
    },
    source: "Tirmidhi",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Family & Rights"
  },
  {
    id: 2,
    text: {
      en: "Seek knowledge from the cradle to the grave.",
      ar: "طلب العلم من المهد إلى اللحد",
      bn: "জন্ম থেকে মৃত্যু পর্যন্ত জ্ঞান অন্বেষণ করুন।",
      ur: "پالنے سے قبر تک علم حاصل کریں۔",
      tr: "Beşikten mezara kadar ilim talep edin."
    },
    source: "Islamic Teaching",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Knowledge"
  },
  {
    id: 3,
    text: {
      en: "The best charity is that given when one is in need yet gives.",
      ar: "أفضل الصدقة ما أعطاه الفقير",
      bn: "সবচেয়ে ভালো দান হল যখন দাতা নিজেই প্রয়োজনে থাকে কিন্তু তবুও দান করে।",
      ur: "بہترین صدقہ وہ ہے جو ضرورت میں ہوتے ہوئے دیا جائے۔",
      tr: "En iyi sadaka, fakir olduğu halde verilen sadakadır."
    },
    source: "Various Collections",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Charity"
  },
  {
    id: 4,
    text: {
      en: "Whoever is merciful, even to the creatures on earth, Allah will be merciful to him on the Day of Judgment.",
      ar: "من رحم ولو ذبيحة رحمه الله يوم القيامة",
      bn: "যে ব্যক্তি পৃথিবীর প্রাণীদের প্রতি রহমদিল, আল্লাহ তাকে কিয়ামতের দিন রহম করবেন।",
      ur: "جو رحم کرے، خواہ کسی جانور پر، اللہ اسے قیامت کے دن رحم کرے گا۔",
      tr: "Kimsede merhamet gösteren, Allah onu kıyamet günü merhamet gösterecek."
    },
    source: "Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Mercy & Compassion"
  },
  {
    id: 5,
    text: {
      en: "The strong believer is better and more beloved to Allah than the weak believer.",
      ar: "المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف",
      bn: "শক্তিশালী মুমিন দুর্বল মুমিনের চেয়ে আল্লাহর কাছে উত্তম এবং অধিক প্রিয়।",
      ur: "مضبوط مومن کمزور مومن سے اللہ کے نزدیک بہتر اور زیادہ محبوب ہے۔",
      tr: "Güçlü mümin, zayıf mümin'den Allah'a daha iyidir ve daha sevimliydi."
    },
    source: "Muslim",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Faith & Strength"
  },
  {
    id: 6,
    text: {
      en: "Do not let your hatred of a people incite you to aggression.",
      ar: "لا يجرمنكم شنآن قوم على ألا تعدلوا اعدلوا هو أقرب للتقوى",
      bn: "কোনো জাতির প্রতি আপনার ক্রোধ আপনাকে অন্যায়ে চালিত করবে না। ন্যায়বিচার করুন, এটি তাকওয়ার কাছাকাছি।",
      ur: "کسی قوم کی بغض تمہیں ظلم پر نہ اکسائے۔ انصاف کریں، یہ تقویٰ کے قریب ہے۔",
      tr: "Bir millete karşı nefretiniz sizi adaleti ertelemeye sevk etmesin."
    },
    source: "Quran 5:2",
    narrator: "Allah",
    collection: "Justice & Fairness"
  },
  {
    id: 7,
    text: {
      en: "A believer is the mirror of a believer.",
      ar: "المؤمن مرآة أخيه المؤمن",
      bn: "একজন মুমিন তার ভাইয়ের আয়না।",
      ur: "ایک مومن اپنے بھائی کا آئینہ ہے۔",
      tr: "Mümin, mümin kardeşinin aynasıdır."
    },
    source: "Abu Dawood",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Brotherhood"
  },
  {
    id: 8,
    text: {
      en: "Patience is not endurance of the most grievous, but it is the most noble character.",
      ar: "الصبر حسن الخلق",
      bn: "ধৈর্য হল সবচেয়ে মহান সৎ চরিত্র।",
      ur: "صبر بہترین اخلاق ہے۔",
      tr: "Sabır en güzel ahlaktır."
    },
    source: "Tirmidhi",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Virtue"
  },
  {
    id: 9,
    text: {
      en: "The best of deeds are those that bring you closer to Allah, and the worst deeds are those that distance you from Him.",
      ar: "أفضل الأعمال ما قرب من الله وأبعد عن الهوى",
      bn: "সেরা কাজ যা আপনাকে আল্লাহর কাছাকাছি নিয়ে আসে, এবং সবচেয়ে খারাপ কাজ যা আপনাকে তাঁর থেকে দূরে নিয়ে যায়।",
      ur: "سب سے بہترین عمل وہ ہے جو تمہیں اللہ کے قریب لائے، اور سب سے برا عمل وہ ہے جو تمہیں اس سے دور لے جائے۔",
      tr: "En iyi amel seni Allah'a yaklaştıran, en kötü amel seni Ondan uzaklaştıran ameldir."
    },
    source: "Islamic Teaching",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Spirituality"
  },
  {
    id: 10,
    text: {
      en: "Every soul shall taste death, and you will only be given your full reward on the Day of Resurrection.",
      ar: "كل نفس ذائقة الموت وإنما توفون أجوركم يوم القيامة",
      bn: "প্রতিটি প্রাণ মৃত্যুর স্বাদ গ্রহণ করবে, এবং আপনি কিয়ামতের দিন পূর্ণ পুরস্কার পাবেন।",
      ur: "ہر جان موت کا مزہ چکھے گی، اور تمہیں قیامت کے دن مکمل اجر دیا جائے گا۔",
      tr: "Her can ölümü tadacak ve siz kıyamet günü tam mükafatınızı verileceksiniz."
    },
    source: "Quran 3:185",
    narrator: "Allah",
    collection: "Afterlife"
  }
];

export default function HadithPage() {
  const [currentHadith, setCurrentHadith] = useState<Hadith>(hadiths[0]);
  const [language, setLanguage] = useState<Language>("en");

  const getRandomHadith = () => {
    const random = hadiths[Math.floor(Math.random() * hadiths.length)];
    setCurrentHadith(random);
  };

  useEffect(() => {
    // Load today's hadith based on date
    const today = new Date().getDate();
    const hadithIndex = today % hadiths.length;
    setCurrentHadith(hadiths[hadithIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Daily Hadith</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-2xl mx-auto space-y-6 pt-6">
        {/* Language Selector Cards */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Select Language</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-lg font-medium transition-all ${
                  language === lang.code
                    ? "bg-amber-600 text-white shadow-lg scale-105"
                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-amber-300 dark:border-amber-700 hover-elevate"
                }`}
                data-testid={`button-language-${lang.code}`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Hadith Card */}
        <Card className="p-8 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-block w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                Today's Hadith
              </p>
            </div>

            <p className={`text-lg md:text-xl font-serif text-slate-900 dark:text-white text-center leading-relaxed italic ${
              language === "ar" ? "font-arabic text-right" : ""
            } ${
              language === "bn" ? "font-bengali" : ""
            } ${
              language === "ur" ? "font-urdu text-right" : ""
            }`}>
              "{currentHadith.text[language]}"
            </p>

            <div className="border-t-2 border-amber-300 dark:border-amber-700 pt-4 space-y-2 text-center text-sm">
              <p className="text-amber-800 dark:text-amber-200 font-semibold">
                {currentHadith.narrator}
              </p>
              <p className="text-amber-700 dark:text-amber-300">
                Source: <span className="font-semibold">{currentHadith.source}</span>
              </p>
              <p className="text-amber-600 dark:text-amber-400 text-xs">
                {currentHadith.collection}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={getRandomHadith}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white"
            data-testid="button-next-hadith"
          >
            <RefreshCw className="w-4 h-4" />
            Next Hadith
          </Button>
        </div>

        {/* All Hadiths Preview */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">More Hadiths</h2>
          <div className="space-y-3">
            {hadiths.map((hadith) => (
              <Card
                key={hadith.id}
                onClick={() => setCurrentHadith(hadith)}
                className="p-4 bg-white dark:bg-slate-800 cursor-pointer hover-elevate transition-all"
                data-testid={`hadith-card-${hadith.id}`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-sm font-bold text-amber-600 dark:text-amber-400">
                    {hadith.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm text-slate-700 dark:text-slate-300 line-clamp-2 ${
                      language === "ar" ? "font-arabic text-right" : ""
                    } ${
                      language === "bn" ? "font-bengali" : ""
                    } ${
                      language === "ur" ? "font-urdu text-right" : ""
                    }`}>
                      "{hadith.text[language]}"
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-2 py-1 rounded">
                        {hadith.source}
                      </span>
                      <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
                        {hadith.collection}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
