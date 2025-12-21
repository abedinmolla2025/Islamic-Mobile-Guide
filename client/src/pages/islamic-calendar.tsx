import { useState, useEffect } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IslamicDate {
  hijriDay: number;
  hijriMonth: string;
  hijriYear: number;
  gregorianDate: string;
  dayName: string;
  monthName: string;
  significance?: string;
}

const islamicMonths = [
  { name: "Muharram", significance: "Month of mourning, Islamic New Year" },
  { name: "Safar", significance: "Month of emptiness" },
  { name: "Rabi' al-awwal", significance: "Birth month of Prophet Muhammad" },
  { name: "Rabi' al-thani", significance: "Second spring month" },
  { name: "Jumada al-awwal", significance: "First month of parched lands" },
  { name: "Jumada al-thani", significance: "Second month of parched lands" },
  { name: "Rajab", significance: "Month of respect, Night of Isra and Mi'raj (27th)" },
  { name: "Sha'ban", significance: "Month of scattered scattered, preparation for Ramadan" },
  { name: "Ramadan", significance: "Holy month of fasting and Quran revelation" },
  { name: "Shawwal", significance: "Month of Eid al-Fitr (1st)" },
  { name: "Dhu al-Qi'dah", significance: "Month of sitting" },
  { name: "Dhu al-Hijjah", significance: "Month of pilgrimage, Eid al-Adha (10th)" }
];

const ImportantDates = [
  { hijriDate: "1 Muharram", event: "Islamic New Year" },
  { hijriDate: "10 Muharram", event: "Day of Ashura" },
  { hijriDate: "12 Rabi' al-awwal", event: "Birth of Prophet Muhammad" },
  { hijriDate: "27 Rajab", event: "Isra and Mi'raj Night" },
  { hijriDate: "1 Ramadan", event: "First day of Ramadan" },
  { hijriDate: "27 Ramadan", event: "Laylat al-Qadr (Night of Power)" },
  { hijriDate: "1 Shawwal", event: "Eid al-Fitr" },
  { hijriDate: "10 Dhu al-Hijjah", event: "Eid al-Adha" }
];

export default function IslamicCalendar() {
  const [currentHijriDate, setCurrentHijriDate] = useState<IslamicDate | null>(null);

  useEffect(() => {
    // Simplified Hijri calculation (approximate)
    const today = new Date();
    const hijriYear = Math.floor((today.getFullYear() - 622) * 365.2422 / 354.3667);
    const hijriMonth = Math.floor((today.getMonth() + (today.getDate() / 30)) % 12);
    const hijriDay = Math.floor((today.getDate() % 30) + 1);

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    setCurrentHijriDate({
      hijriDay,
      hijriMonth: islamicMonths[hijriMonth]?.name || "Unknown",
      hijriYear: 1446 + (today.getFullYear() - 2024),
      gregorianDate: today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      dayName: dayNames[today.getDay()],
      monthName: monthNames[today.getMonth()],
      significance: islamicMonths[hijriMonth]?.significance
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Islamic Calendar</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-2xl mx-auto space-y-6 pt-6">
        {/* Current Date Card */}
        {currentHijriDate && (
          <Card className="p-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 border-2 border-indigo-300 dark:border-indigo-700">
            <div className="grid grid-cols-2 gap-6">
              {/* Hijri Date */}
              <div className="text-center">
                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-2">
                  Islamic Date
                </p>
                <p className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
                  {currentHijriDate.hijriDay}
                </p>
                <p className="text-sm text-indigo-800 dark:text-indigo-200 mt-1">
                  {currentHijriDate.hijriMonth}
                </p>
                <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold mt-2">
                  {currentHijriDate.hijriYear} AH
                </p>
              </div>

              {/* Gregorian Date */}
              <div className="text-center border-l border-indigo-300 dark:border-indigo-700">
                <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2">
                  Gregorian Date
                </p>
                <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
                  {currentHijriDate.dayName}
                </p>
                <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">
                  {currentHijriDate.gregorianDate}
                </p>
              </div>
            </div>

            {/* Significance */}
            {currentHijriDate.significance && (
              <div className="mt-4 pt-4 border-t border-indigo-300 dark:border-indigo-700">
                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-2">
                  Month Significance
                </p>
                <p className="text-sm text-indigo-900 dark:text-indigo-100">
                  {currentHijriDate.significance}
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Important Dates */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Important Islamic Dates</h2>
          <div className="space-y-3">
            {ImportantDates.map((date, index) => (
              <Card key={index} className="p-4 bg-white dark:bg-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">{date.event}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{date.hijriDate}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Islamic Months Overview */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Islamic Months</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {islamicMonths.map((month, index) => (
              <Card key={index} className="p-3 bg-white dark:bg-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white text-sm">
                  {index + 1}. {month.name}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {month.significance}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
