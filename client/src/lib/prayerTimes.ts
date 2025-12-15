export interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

// More accurate prayer time calculation based on sun position
export function calculatePrayerTimes(latitude: number, longitude: number, date: Date = new Date()): PrayerTime[] {
  // Get the Julian Day Number
  const jd = getJulianDay(date);
  
  // Calculate sun position
  const sunDeclination = getSunDeclination(jd);
  const eqTime = getEquationOfTime(jd);
  
  // Get timezone offset in hours
  const timezone = -date.getTimezoneOffset() / 60;
  
  // Calculate prayer times
  const fajrAngle = -18; // Fajr: 18 degrees below horizon
  const ishaAngle = -17; // Isha: 17 degrees below horizon
  
  const noon = 12 + timezone - longitude / 15 - eqTime / 60;
  const sunriseHour = noon - getHourAngle(latitude, sunDeclination, -0.833) / 15;
  const sunsetHour = noon + getHourAngle(latitude, sunDeclination, -0.833) / 15;
  const fajrHour = noon - getHourAngle(latitude, sunDeclination, fajrAngle) / 15;
  const ishaHour = noon + getHourAngle(latitude, sunDeclination, ishaAngle) / 15;
  
  // Asr calculation (Hanafi method: shadow = 2 * object height)
  const asrFactor = 2; // Hanafi
  const asrAngle = Math.atan(1 / (asrFactor + Math.tan(Math.abs(latitude - sunDeclination) * Math.PI / 180))) * 180 / Math.PI;
  const asrHour = noon + getHourAngle(latitude, sunDeclination, -asrAngle) / 15;

  const prayers = [
    { name: 'Fajr', hour: fajrHour },
    { name: 'Sunrise', hour: sunriseHour },
    { name: 'Dhuhr', hour: noon + 0.016667 }, // Add 1 minute after solar noon
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

// Helper functions for astronomical calculations
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
