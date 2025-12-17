export interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

export interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
    date: {
      hijri: {
        day: string;
        month: { en: string; number: number };
        year: string;
      };
    };
  };
}

export async function fetchPrayerTimesFromAPI(
  latitude: number, 
  longitude: number,
  method: number = 1 // 1 = University of Islamic Sciences, Karachi (Hanafi default)
): Promise<{ prayers: PrayerTime[]; hijri: { day: string; month: string; year: string; gregorian: string } } | null> {
  try {
    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=1`
    );
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data: AladhanResponse = await response.json();
    
    if (data.code !== 200) {
      throw new Error('Invalid API response');
    }

    const timings = data.data.timings;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const parseTimeToMinutes = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const formatTo12Hour = (time: string): string => {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHour = hours % 12 || 12;
      return `${displayHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
    let nextPrayerFound = false;

    const prayers: PrayerTime[] = prayerNames.map((name) => {
      const time24 = timings[name];
      const prayerMinutes = parseTimeToMinutes(time24);
      const isNext = !nextPrayerFound && prayerMinutes > currentMinutes;
      if (isNext) nextPrayerFound = true;

      return {
        name,
        time: formatTo12Hour(time24),
        isNext,
      };
    });

    // If no next prayer found today, first prayer of tomorrow is next
    if (!nextPrayerFound && prayers.length > 0) {
      prayers[0].isNext = true;
    }

    const gregorianFormatted = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const hijri = {
      day: data.data.date.hijri.day,
      month: data.data.date.hijri.month.en,
      year: `${data.data.date.hijri.year} AH`,
      gregorian: gregorianFormatted,
    };

    return { prayers, hijri };
  } catch (error) {
    console.error('Failed to fetch prayer times from API:', error);
    return null;
  }
}

// Fallback: Local calculation based on sun position
export function calculatePrayerTimes(latitude: number, longitude: number, date: Date = new Date()): PrayerTime[] {
  const jd = getJulianDay(date);
  const sunDeclination = getSunDeclination(jd);
  const eqTime = getEquationOfTime(jd);
  const timezone = -date.getTimezoneOffset() / 60;
  
  const fajrAngle = -18;
  const ishaAngle = -17;
  
  const noon = 12 + timezone - longitude / 15 - eqTime / 60;
  const sunriseHour = noon - getHourAngle(latitude, sunDeclination, -0.833) / 15;
  const sunsetHour = noon + getHourAngle(latitude, sunDeclination, -0.833) / 15;
  const fajrHour = noon - getHourAngle(latitude, sunDeclination, fajrAngle) / 15;
  const ishaHour = noon + getHourAngle(latitude, sunDeclination, ishaAngle) / 15;
  
  const asrFactor = 2;
  const asrAngle = Math.atan(1 / (asrFactor + Math.tan(Math.abs(latitude - sunDeclination) * Math.PI / 180))) * 180 / Math.PI;
  const asrHour = noon + getHourAngle(latitude, sunDeclination, -asrAngle) / 15;

  const prayers = [
    { name: 'Fajr', hour: fajrHour },
    { name: 'Sunrise', hour: sunriseHour },
    { name: 'Dhuhr', hour: noon + 0.016667 },
    { name: 'Asr', hour: asrHour },
    { name: 'Maghrib', hour: sunsetHour },
    { name: 'Isha', hour: ishaHour },
  ];

  const formatTime = (hour: number): string => {
    const h = Math.floor((hour + 24) % 24);
    const m = Math.floor((hour - Math.floor(hour)) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  let nextPrayerFound = false;

  return prayers.map((prayer) => {
    const prayerHour = (prayer.hour + 24) % 24;
    const isNext = !nextPrayerFound && prayerHour > currentHour;
    if (isNext) nextPrayerFound = true;

    return {
      name: prayer.name,
      time: formatTime(prayer.hour),
      isNext,
    };
  });
}

function getJulianDay(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;
  
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function getSunDeclination(jd: number): number {
  const d = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const L = (q + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180)) % 360;
  const e = 23.439 - 0.00000036 * d;
  return Math.asin(Math.sin(e * Math.PI / 180) * Math.sin(L * Math.PI / 180)) * 180 / Math.PI;
}

function getEquationOfTime(jd: number): number {
  const d = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const L = (q + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180)) % 360;
  const e = 23.439 - 0.00000036 * d;
  const RA = Math.atan2(Math.cos(e * Math.PI / 180) * Math.sin(L * Math.PI / 180), Math.cos(L * Math.PI / 180)) * 180 / Math.PI;
  return (q - RA + (RA < 0 ? 360 : 0)) * 4;
}

function getHourAngle(lat: number, dec: number, angle: number): number {
  const latRad = lat * Math.PI / 180;
  const decRad = dec * Math.PI / 180;
  const angleRad = angle * Math.PI / 180;
  
  const cosHA = (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  
  if (cosHA > 1) return 0;
  if (cosHA < -1) return 180;
  
  return Math.acos(cosHA) * 180 / Math.PI;
}

export function getNextPrayer(prayers: PrayerTime[]): PrayerTime | null {
  return prayers.find(p => p.isNext) || prayers[0];
}

export async function getUserLocation(): Promise<{ latitude: number; longitude: number; city: string } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const city = data.address?.city || data.address?.town || data.address?.village || 'Unknown';
          
          resolve({ latitude, longitude, city });
        } catch {
          resolve({ latitude, longitude, city: 'Unknown' });
        }
      },
      () => {
        resolve(null);
      }
    );
  });
}
