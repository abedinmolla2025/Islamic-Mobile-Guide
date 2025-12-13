export interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

// Simplified prayer time calculation based on approximate sun position
export function calculatePrayerTimes(latitude: number, longitude: number, date: Date = new Date()): PrayerTime[] {
  // Get timezone offset
  const timezoneOffset = date.getTimezoneOffset() / 60;
  const lng = longitude / 15;
  
  // Approximate prayer times for the location (simplified calculation)
  const baseHours = {
    fajr: 5,
    sunrise: 6,
    dhuhr: 12,
    asr: 15.5,
    maghrib: 18,
    isha: 19.5
  };

  // Adjust based on longitude (rough approximation)
  const adjustment = lng - (-timezoneOffset);

  const formatTime = (hour: number): string => {
    const adjustedHour = (hour - adjustment + 24) % 24;
    const h = Math.floor(adjustedHour);
    const m = Math.floor((adjustedHour - h) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const prayers = [
    { name: 'Fajr', hour: baseHours.fajr },
    { name: 'Sunrise', hour: baseHours.sunrise },
    { name: 'Dhuhr', hour: baseHours.dhuhr },
    { name: 'Asr', hour: baseHours.asr },
    { name: 'Maghrib', hour: baseHours.maghrib },
    { name: 'Isha', hour: baseHours.isha },
  ];

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  let nextPrayerFound = false;

  return prayers.map((prayer) => {
    const prayerHour = (prayer.hour - adjustment + 24) % 24;
    const isNext = !nextPrayerFound && prayerHour > currentHour;
    if (isNext) nextPrayerFound = true;

    return {
      name: prayer.name,
      time: formatTime(prayer.hour),
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
