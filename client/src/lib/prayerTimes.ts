import { Coordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes, Prayer } from 'adhan';

export interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

export function calculatePrayerTimes(latitude: number, longitude: number, date: Date = new Date()): PrayerTime[] {
  const coordinates = new Coordinates(latitude, longitude);
  const params = CalculationMethod.Karachi();
  const prayerTimes = new AdhanPrayerTimes(coordinates, date, params);

  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Sunrise', time: prayerTimes.sunrise },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ];

  const now = new Date();
  let nextPrayerFound = false;

  return prayers.map((prayer) => {
    const isNext = !nextPrayerFound && prayer.time > now;
    if (isNext) nextPrayerFound = true;

    return {
      name: prayer.name,
      time: prayer.time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      isNext,
    };
  });
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
        
        // Try to get city name using reverse geocoding
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
