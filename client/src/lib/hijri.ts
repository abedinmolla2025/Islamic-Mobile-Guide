// Simple Hijri date conversion
// Using Umm al-Qura calendar approximation

export interface HijriDate {
  day: string;
  month: string;
  year: string;
  gregorian: string;
}

const hijriMonths = [
  'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
  'Ramadan', 'Shawwal', 'Dhul-Qadah', 'Dhul-Hijjah'
];

export function getHijriDate(gregorianDate: Date = new Date()): HijriDate {
  // Approximate conversion (Umm al-Qura calendar starts around July 16, 622 CE)
  const hijriEpoch = new Date('July 16, 622');
  const daysSinceEpoch = Math.floor((gregorianDate.getTime() - hijriEpoch.getTime()) / (1000 * 60 * 60 * 24));
  
  // Islamic year is approximately 354.37 days
  const islamicYear = Math.floor(daysSinceEpoch / 354.37) + 1;
  const dayOfYear = Math.floor(daysSinceEpoch % 354.37);
  
  // Each month is approximately 29.53 days
  const monthIndex = Math.floor(dayOfYear / 29.53);
  const dayOfMonth = Math.floor(dayOfYear % 29.53) + 1;
  
  const monthName = hijriMonths[Math.min(monthIndex, 11)];
  
  const gregorianFormatted = gregorianDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return {
    day: dayOfMonth.toString(),
    month: monthName,
    year: `${islamicYear} AH`,
    gregorian: gregorianFormatted
  };
}
