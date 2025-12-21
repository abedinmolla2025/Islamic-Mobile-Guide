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
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Family & Rights"
  },
  {
    id: 2,
    text: {
      en: "The best wealth is a good tongue and a thankful heart.",
      ar: "خير المال لسان ذاكر وقلب شاكر",
      bn: "সেরা সম্পদ হল ভালো জিহ্বা এবং কৃতজ্ঞ হৃদয়।",
      ur: "بہترین دولت ایک اچھی زبان اور شکری دل ہے۔",
      tr: "En iyi servet, iyi bir dil ve şükreden bir kalptir."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Wealth & Gratitude"
  },
  {
    id: 3,
    text: {
      en: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
      ar: "من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت",
      bn: "যে আল্লাহ এবং শেষ দিনে বিশ্বাস করে তার ভালো কথা বলা উচিত অথবা চুপ থাকা উচিত।",
      ur: "جو اللہ اور آخری دن پر ایمان رکھتا ہے وہ اچھی بات کہے یا خاموش رہے۔",
      tr: "Kim Allah'a ve Son Güne iman ediyorsa, iyi söylemeli veya sessiz kalmalıdır."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Speech & Wisdom"
  },
  {
    id: 4,
    text: {
      en: "The greatest jihad is struggling against your own desires and ego.",
      ar: "أعظم الجهاد جهاد النفس",
      bn: "সবচেয়ে বড় জিহাদ হল আপনার নিজের প্রবৃত্তির বিরুদ্ধে সংগ্রাম।",
      ur: "سب سے بڑا جہاد اپنے نفس کے خلاف جہاد ہے۔",
      tr: "En büyük cihad, kendi nefsine karşı verilen cihadtır."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Spirituality"
  },
  {
    id: 5,
    text: {
      en: "Whoever builds a masjid, Allah will build for him a house in Paradise.",
      ar: "من بنى مسجدا بنى الله له مثله في الجنة",
      bn: "যে মসজিদ নির্মাণ করে, আল্লাহ তার জন্য জান্নায় একটি ঘর নির্মাণ করবেন।",
      ur: "جو مسجد بنائے، اللہ اس کے لیے جنت میں ایک گھر بنائے گا۔",
      tr: "Kim bir camii inşa ederse, Allah ona cennette bir ev inşa edecektir."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Good Deeds"
  },
  {
    id: 6,
    text: {
      en: "Do not envy one another; do not artificially inflate prices to one another; do not hate one another; do not turn away from one another.",
      ar: "لا تحاسدوا ولا تناجشوا ولا تباغضوا ولا تدابروا",
      bn: "একে অপরের প্রতি ঈর্ষা করবেন না; একে অপরের দাম কৃত্রিমভাবে বাড়াবেন না; একে অপরকে ঘৃণা করবেন না।",
      ur: "ایک دوسرے سے حسد نہ کریں، دام میں تبدیلی نہ کریں، ایک دوسرے سے نفرت نہ کریں۔",
      tr: "Birbirinize hased etmeyin, birbirinize karşı nefret etmeyin, birbirinizden yüz çevirmeyiniz."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Brotherhood"
  },
  {
    id: 7,
    text: {
      en: "The best time to do good deeds is when you are in good health and have abundance of wealth.",
      ar: "أحسن الناس إسلاما من ترك ما لا يعنيه",
      bn: "সবচেয়ে ভালো সময় ভালো কাজ করার জন্য হল যখন আপনি সুস্বাস্থ্য এবং সমৃদ্ধিতে আছেন।",
      ur: "بہترین وقت نیک اعمال کے لیے وہ ہے جب آپ صحت مند اور خوشحال ہوں۔",
      tr: "En iyi zamanı iyilik yapmak için, sağlıklı ve zengin olduğunuz zamandır."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Wisdom"
  },
  {
    id: 8,
    text: {
      en: "There is no charity like smiling at your brother's face.",
      ar: "لا صدقة أعظم من طول أناة",
      bn: "আপনার ভাইয়ের মুখে হাসির মতো দান নেই।",
      ur: "اپنے بھائی کے چہرے پر مسکراہٹ سے بہتر کوئی صدقہ نہیں۔",
      tr: "Kardeşinin yüzüne gülümsemekten daha büyük bir sadaka yoktur."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Kindness"
  },
  {
    id: 9,
    text: {
      en: "The Prophet said: Verily, Allah does not look at your appearances and wealth, but he looks at your hearts and deeds.",
      ar: "إن الله لا ينظر إلى أجسادكم ولا إلى صوركم ولكن ينظر إلى قلوبكم",
      bn: "প্রকৃতপক্ষে, আল্লাহ আপনার দেহ এবং পণ্য দেখেন না, কিন্তু আপনার হৃদয় এবং কর্ম দেখেন।",
      ur: "اللہ تمہاری شکل و صورت کی طرف نہیں دیکھتے بلکہ تمہاری دلوں کی طرف دیکھتے ہیں۔",
      tr: "Allah hiç de sizin yüzlerinize ve malınıza bakmaz, fakat yüreklerinize ve amellerinize bakar."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Inner Purity"
  },
  {
    id: 10,
    text: {
      en: "The best of you are those who have the best manners and character.",
      ar: "خيركم خيركم لأهله وأنا خيركم لأهلي",
      bn: "সবচেয়ে ভালো আচরণ এবং চরিত্রের মানুষরা সবচেয়ে উত্তম।",
      ur: "بہترین اخلاق والے لوگ سب سے بہتر ہیں۔",
      tr: "En iyi ahlak ve karakter sahip olanlar en iyileridir."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Character"
  },
  {
    id: 11,
    text: {
      en: "Whoever removes a worldly hardship from a believer, Allah will remove from him one of the hardships of the Day of Judgment.",
      ar: "من فرج عن مؤمن كربة من كرب الدنيا فرج الله عنه كربة من كرب يوم القيامة",
      bn: "যে কেউ একজন মুমিনের দুনিয়ার একটি কষ্ট দূর করে, আল্লাহ তার থেকে কিয়ামতের দিনের একটি কষ্ট দূর করবেন।",
      ur: "جو کسی مومن کی دنیا کی مشکل حل کرے، اللہ قیامت کے دن اس کی ایک مشکل حل کرے گا۔",
      tr: "Kim bir mümin'in dünyevi sıkıntısını giderirse, Allah onun Kıyamet Günü sıkıntılarından birini giderecektir."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Helping Others"
  },
  {
    id: 12,
    text: {
      en: "The strong believer is better and more beloved to Allah than the weak believer.",
      ar: "المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف",
      bn: "শক্তিশালী মুমিন দুর্বল মুমিনের চেয়ে আল্লাহর কাছে উত্তম এবং অধিক প্রিয়।",
      ur: "مضبوط مومن کمزور مومن سے اللہ کے نزدیک بہتر اور زیادہ محبوب ہے۔",
      tr: "Güçlü mümin, zayıf mümin'den Allah'a daha iyidir ve daha sevimliydir."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Faith & Strength"
  },
  {
    id: 13,
    text: {
      en: "Whoever is merciful, even to the creatures on earth, Allah will be merciful to him on the Day of Judgment.",
      ar: "من رحم ولو ذبيحة رحمه الله يوم القيامة",
      bn: "যে ব্যক্তি পৃথিবীর প্রাণীদের প্রতি রহমদিল, আল্লাহ তাকে কিয়ামতের দিন রহম করবেন।",
      ur: "جو رحم کرے، خواہ کسی جانور پر، اللہ اسے قیامت کے دن رحم کرے گا۔",
      tr: "Kimsede merhamet gösteren, Allah onu kıyamet günü merhamet gösterecek."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Mercy & Compassion"
  },
  {
    id: 14,
    text: {
      en: "A believer is the mirror of a believer, and Muslims are brothers to one another.",
      ar: "المؤمن مرآة أخيه المؤمن والمسلمون إخوة",
      bn: "একজন মুমিন তার ভাইয়ের আয়না এবং মুসলিমরা একে অপরের ভাই।",
      ur: "ایک مومن اپنے بھائی کا آئینہ ہے، اور مسلمان ایک دوسرے کے بھائی ہیں۔",
      tr: "Mümin, mümin kardeşinin aynasıdır ve Müslümanlar birbirinin kardeşleridir."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Brotherhood"
  },
  {
    id: 15,
    text: {
      en: "Paradise is forbidden to the arrogant and the show-off.",
      ar: "لا يدخل الجنة من في قلبه مثقال ذرة من كبر",
      bn: "জান্নত গর্বিত এবং দম্ভী লোকদের জন্য নিষিদ্ধ।",
      ur: "جنت متکبروں اور دکھاویوں کے لیے حرام ہے۔",
      tr: "Cennet, kibirli ve gösteriş yapanlar için yasaktır."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Virtue & Humility"
  },
  {
    id: 16,
    text: {
      en: "The best of deeds are those performed with sincerity and for the sake of Allah alone.",
      ar: "أفضل الأعمال ما أخلص فيه العبد لله",
      bn: "সেরা কাজ হল যা খাঁটি নিয়তে আল্লাহর জন্য করা হয়।",
      ur: "بہترین اعمال وہ ہیں جو خلوص کے ساتھ اللہ کے لیے کیے جائیں۔",
      tr: "En iyi amel, sadece Allah rızası için yapılan ameldir."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Intentions"
  },
  {
    id: 17,
    text: {
      en: "Whoever goes out in search of knowledge, he is on the path of Allah.",
      ar: "من خرج في طلب العلم فهو في سبيل الله",
      bn: "যে জ্ঞানের সন্ধানে বের হয় সে আল্লাহর পথে রয়েছে।",
      ur: "جو علم کی تلاش میں نکلے وہ اللہ کی راہ میں ہے۔",
      tr: "Kim ilim arayışında çıkarsa, Allah'ın yolundadır."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Knowledge"
  },
  {
    id: 18,
    text: {
      en: "The greatest sin is to associate partners with Allah and to disobey parents.",
      ar: "إن أكبر الكبائر الإشراك بالله وعقوق الوالدين",
      bn: "সবচেয়ে বড় পাপ হল আল্লাহর সাথে শরিক করা এবং পিতামাতার অবাধ্যতা করা।",
      ur: "سب سے بڑا گناہ اللہ کے ساتھ شرک اور والدین کی نافرمانی ہے۔",
      tr: "En büyük günah, Allah'a ortak koşmak ve ebeveynlere isyan etmektir."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Major Sins"
  },
  {
    id: 19,
    text: {
      en: "The most perfect of the believers in faith are those with the best character and best to their wives.",
      ar: "خيركم خيركم لأهله وأنا خيركم لأهلي",
      bn: "বিশ্বাসে সবচেয়ে নিখুঁত লোকরা হল সেরা চরিত্র এবং তাদের স্ত্রীদের প্রতি সর্বোত্তম।",
      ur: "ایمان میں سب سے مکمل لوگ وہ ہیں جن کے اخلاق بہترین ہیں اور وہ اپنی بیویوں کے ساتھ بہترین ہیں۔",
      tr: "İmanda en mükemmel olanlar, en iyi ahlak ve karısına en iyi davrananlardır."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Marriage & Family"
  },
  {
    id: 20,
    text: {
      en: "The best wealth is a good tongue and a thankful heart. Bad wealth is that which distracts you from remembrance of Allah.",
      ar: "خير المال لسان ذاكر وقلب شاكر",
      bn: "সেরা সম্পদ হল ভালো জিহ্বা এবং কৃতজ্ঞ হৃদয়।",
      ur: "بہترین دولت اچھی زبان اور شکری دل ہے۔",
      tr: "En iyi servet, iyi bir dil ve şükreden bir kalptir."
    },
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Wealth & Gratitude"
  }
];

export default function HadithPage() {
  const [currentHadith, setCurrentHadith] = useState<Hadith>(hadiths[0]);
  const [language, setLanguage] = useState<Language>("bn");

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
