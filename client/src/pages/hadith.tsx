import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Hadith {
  id: number;
  text: string;
  source: string;
  narrator?: string;
  collection?: string;
}

const hadiths: Hadith[] = [
  {
    id: 1,
    text: "The best of you are those who are best to their families, and I am the best among you to my family.",
    source: "Tirmidhi",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Family & Rights"
  },
  {
    id: 2,
    text: "Seek knowledge from the cradle to the grave.",
    source: "Islamic Teaching",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Knowledge"
  },
  {
    id: 3,
    text: "The best charity is that given when one is in need yet gives.",
    source: "Various Collections",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Charity"
  },
  {
    id: 4,
    text: "Whoever is merciful, even to the creatures on earth, Allah will be merciful to him on the Day of Judgment.",
    source: "Bukhari",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Mercy & Compassion"
  },
  {
    id: 5,
    text: "The strong believer is better and more beloved to Allah than the weak believer.",
    source: "Muslim",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Faith & Strength"
  },
  {
    id: 6,
    text: "Do not let your hatred of a people incite you to aggression.",
    source: "Quran 5:2",
    narrator: "Allah",
    collection: "Justice & Fairness"
  },
  {
    id: 7,
    text: "A believer is the mirror of a believer.",
    source: "Abu Dawood",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Brotherhood"
  },
  {
    id: 8,
    text: "Patience is not endurance of the most grievous, but it is the most noble character.",
    source: "Tirmidhi",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Virtue"
  },
  {
    id: 9,
    text: "The best of deeds are those that bring you closer to Allah, and the worst deeds are those that distance you from Him.",
    source: "Islamic Teaching",
    narrator: "Prophet Muhammad (Peace be upon him)",
    collection: "Spirituality"
  },
  {
    id: 10,
    text: "Every soul shall taste death, and you will only be given your full reward on the Day of Resurrection.",
    source: "Quran 3:185",
    narrator: "Allah",
    collection: "Afterlife"
  }
];

export default function HadithPage() {
  const [currentHadith, setCurrentHadith] = useState<Hadith>(hadiths[0]);

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

            <p className="text-lg md:text-xl font-serif text-slate-900 dark:text-white text-center leading-relaxed italic">
              "{currentHadith.text}"
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
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                      "{hadith.text}"
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
