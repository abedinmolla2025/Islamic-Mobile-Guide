export interface Celebration {
  name: string;
  bengaliName: string;
  date: { month: number; day: number };
}

const celebrations: Celebration[] = [
  { name: "Eid al-Fitr", bengaliName: "ঈদুল ফিৎর মোবারক", date: { month: 10, day: 1 } },
  { name: "Eid al-Adha", bengaliName: "ঈদুল আজহা মোবারক", date: { month: 12, day: 10 } },
  { name: "Islamic New Year", bengaliName: "ইসলামিক নববর্ষ", date: { month: 1, day: 1 } },
  { name: "Prophet's Birthday", bengaliName: "মহানবী মোহাম্মদ (সা:) এর জন্মদিন", date: { month: 3, day: 12 } },
  { name: "Shab-e-Barat", bengaliName: "শবে বরাত মোবারক", date: { month: 8, day: 15 } },
  { name: "Shab-e-Miraj", bengaliName: "শবে মিরাজ মোবারক", date: { month: 7, day: 27 } },
  { name: "Shab-e-Qadr", bengaliName: "লাইলাতুল কদর মোবারক", date: { month: 9, day: 27 } },
];

// Islamic months to Gregorian (approximate)
const hijriToGregorian: { [key: number]: number[] } = {
  1: [7, 27],  // 1st Muharram (Ashura) - around July 27
  3: [9, 16],  // 12th Rabi al-Awwal (Mawlid) - around September 16
  7: [2, 16],  // 27th Rajab (Shab-e-Miraj) - around February 16
  8: [3, 8],   // 15th Sha'ban (Shab-e-Barat) - around March 8
  9: [3, 30],  // 27th Ramadan (Shab-e-Qadr) - around March 30
  10: [4, 10], // 1st Shawwal (Eid al-Fitr) - around April 10
  12: [6, 16], // 10th Dhul-Hijjah (Eid al-Adha) - around June 16
};

export function getIslamicCelebration(): Celebration | null {
  const today = new Date();
  const month = today.getMonth() + 1; // 1-12
  const day = today.getDate(); // 1-31

  // Check Friday (Jummah)
  if (today.getDay() === 5) {
    return {
      name: "Jummah",
      bengaliName: "জুম্মা মোবারক",
      date: { month, day }
    };
  }

  // Check for Islamic celebrations (approximate Gregorian dates)
  const celebrationDates = [
    { month: 1, day: 1, name: "Islamic New Year", bengaliName: "ইসলামিক নববর্ষ" },
    { month: 2, day: 16, name: "Shab-e-Miraj", bengaliName: "শবে মিরাজ মোবারক" },
    { month: 3, day: 8, name: "Shab-e-Barat", bengaliName: "শবে বরাত মোবারক" },
    { month: 3, day: 30, name: "Shab-e-Qadr", bengaliName: "লাইলাতুল কদর মোবারক" },
    { month: 3, day: 12, name: "Prophet's Birthday", bengaliName: "মহানবী মোহাম্মদ (সা:) এর জন্মদিন" },
    { month: 4, day: 10, name: "Eid al-Fitr", bengaliName: "ঈদুল ফিৎর মোবারক" },
    { month: 6, day: 16, name: "Eid al-Adha", bengaliName: "ঈদুল আজহা মোবারক" },
  ];

  // Check with 3-day buffer (±3 days from actual date)
  for (const celebration of celebrationDates) {
    if (
      celebration.month === month &&
      Math.abs(celebration.day - day) <= 3
    ) {
      return {
        name: celebration.name,
        bengaliName: celebration.bengaliName,
        date: { month, day }
      };
    }
  }

  return null;
}
