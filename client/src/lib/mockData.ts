export const prayerTimes = [
  { name: "Fajr", time: "05:23 AM", isNext: false },
  { name: "Sunrise", time: "06:45 AM", isNext: false },
  { name: "Dhuhr", time: "12:30 PM", isNext: true },
  { name: "Asr", time: "03:45 PM", isNext: false },
  { name: "Maghrib", time: "06:15 PM", isNext: false },
  { name: "Isha", time: "07:45 PM", isNext: false },
];

export const quranSurahs = [
  { number: 1, name: "Al-Fatihah", englishName: "The Opening", verses: 7, type: "Meccan" },
  { number: 2, name: "Al-Baqarah", englishName: "The Cow", verses: 286, type: "Medinan" },
  { number: 3, name: "Ali 'Imran", englishName: "Family of Imran", verses: 200, type: "Medinan" },
  { number: 4, name: "An-Nisa", englishName: "The Women", verses: 176, type: "Medinan" },
  { number: 5, name: "Al-Ma'idah", englishName: "The Table Spread", verses: 120, type: "Medinan" },
  { number: 6, name: "Al-An'am", englishName: "The Cattle", verses: 165, type: "Meccan" },
  { number: 36, name: "Ya-Sin", englishName: "Ya Sin", verses: 83, type: "Meccan" },
  { number: 55, name: "Ar-Rahman", englishName: "The Beneficent", verses: 78, type: "Medinan" },
  { number: 67, name: "Al-Mulk", englishName: "The Sovereignty", verses: 30, type: "Meccan" },
];

export const dailyVerse = {
  text: "Indeed, with hardship [will be] ease.",
  arabic: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
  ref: "Surah Ash-Sharh 94:6"
};

export const hijriDate = {
  day: "14",
  month: "Ramadan",
  year: "1446 AH",
  gregorian: "Friday, 14 March 2025"
};

export const duas = [
  {
    category: "Morning & Evening",
    items: [
      { title: "Morning Dua", arabic: "اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا", translation: "O Allah, by You we enter the morning and by You we enter the evening.", reference: "Tirmidhi" },
      { title: "Evening Dua", arabic: "اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا", translation: "O Allah, by You we enter the evening and by You we enter the morning.", reference: "Tirmidhi" }
    ]
  },
  {
    category: "Daily Life",
    items: [
      { title: "Before Eating", arabic: "بِسْمِ اللَّهِ", translation: "In the name of Allah.", reference: "Bukhari" },
      { title: "After Eating", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", translation: "All praise is due to Allah who fed us, gave us drink, and made us Muslims.", reference: "Tirmidhi" },
      { title: "Leaving Home", arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ", translation: "In the name of Allah, I place my trust in Allah.", reference: "Abu Dawud" }
    ]
  },
  {
    category: "Travel",
    items: [
      { title: "For Travel", arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ", translation: "Glory be to Him Who has subjected this to us, and we could not have otherwise subdued it.", reference: "Quran 43:13" }
    ]
  }
];

export const namesOfAllah = [
  { name: "Allah", meaning: "The God", arabic: "الله" },
  { name: "Ar-Rahman", meaning: "The Most Gracious", arabic: "الرحمن" },
  { name: "Ar-Rahim", meaning: "The Most Merciful", arabic: "الرحيم" },
  { name: "Al-Malik", meaning: "The King", arabic: "الملك" },
  { name: "Al-Quddus", meaning: "The Most Holy", arabic: "القدوس" },
  { name: "As-Salam", meaning: "The Source of Peace", arabic: "السلام" },
  { name: "Al-Mu'min", meaning: "The Granter of Security", arabic: "المؤمن" },
  { name: "Al-Muhaimin", meaning: "The Guardian", arabic: "المهيمن" },
  { name: "Al-Aziz", meaning: "The Almighty", arabic: "العزيز" },
  { name: "Al-Jabbar", meaning: "The Compeller", arabic: "الجبار" },
];
