// LocalStorage utilities for persisting user data

export const storage = {
  // Tasbih counter
  getTasbihCount: (): number => {
    const count = localStorage.getItem('tasbih_count');
    return count ? parseInt(count, 10) : 0;
  },
  
  setTasbihCount: (count: number): void => {
    localStorage.setItem('tasbih_count', count.toString());
  },

  // User location
  getUserLocation: (): { latitude: number; longitude: number; city: string } | null => {
    const location = localStorage.getItem('user_location');
    return location ? JSON.parse(location) : null;
  },

  setUserLocation: (location: { latitude: number; longitude: number; city: string }): void => {
    localStorage.setItem('user_location', JSON.stringify(location));
  },

  // Last read Quran position
  getLastRead: (): { surahNumber: number; ayahNumber: number } | null => {
    const lastRead = localStorage.getItem('last_read');
    return lastRead ? JSON.parse(lastRead) : null;
  },

  setLastRead: (surahNumber: number, ayahNumber: number): void => {
    localStorage.setItem('last_read', JSON.stringify({ surahNumber, ayahNumber }));
  },

  // Qibla direction (cached)
  getQiblaDirection: (): number | null => {
    const direction = localStorage.getItem('qibla_direction');
    return direction ? parseFloat(direction) : null;
  },

  setQiblaDirection: (degrees: number): void => {
    localStorage.setItem('qibla_direction', degrees.toString());
  },
};
