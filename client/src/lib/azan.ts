// Islamic Azan (Call to Prayer) Audio Service

export const AZAN_AUDIO_URL = "https://cdn.islamic.network/quran/audio/64/ar.alafasy/1.mp3";

// Professional Azan URLs from different sources
export const AZAN_URLS = {
  traditional: "https://cdn.islamic.network/quran/audio/64/ar.alafasy/1.mp3",
  classic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

export interface AzanNotificationSettings {
  enabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  volume: number;
}

export const getStoredAzanSettings = (): AzanNotificationSettings => {
  if (typeof window === 'undefined') return {
    enabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    volume: 0.8,
  };

  const stored = localStorage.getItem('azanSettings');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    enabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    volume: 0.8,
  };
};

export const saveAzanSettings = (settings: AzanNotificationSettings) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('azanSettings', JSON.stringify(settings));
};

export const playAzanSound = async (settings?: AzanNotificationSettings) => {
  const settings_to_use = settings || getStoredAzanSettings();
  
  if (!settings_to_use.soundEnabled) return;

  try {
    const audio = new Audio(AZAN_AUDIO_URL);
    audio.volume = settings_to_use.volume;
    audio.play().catch(err => {
      console.log('Azan playback failed:', err);
    });
  } catch (error) {
    console.log('Error playing Azan:', error);
  }
};

export const triggerVibration = (pattern: number[] = [500, 300, 500]) => {
  if (typeof navigator === 'undefined') return;
  
  try {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  } catch (error) {
    console.log('Vibration not supported:', error);
  }
};

export const notifyAzanTime = async (prayerName: string, settings?: AzanNotificationSettings) => {
  const settings_to_use = settings || getStoredAzanSettings();
  
  if (!settings_to_use.enabled) return;

  // Play sound
  if (settings_to_use.soundEnabled) {
    await playAzanSound(settings_to_use);
  }

  // Trigger vibration
  if (settings_to_use.vibrationEnabled) {
    triggerVibration();
  }

  // Show browser notification
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(`${prayerName} Prayer Time`, {
      body: `It's time for ${prayerName} prayer`,
      icon: '/icon.png',
      tag: `azan-${prayerName}`,
      requireInteraction: true,
    });
  }
};

export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      return true;
    }
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
  }
  return false;
};

// Check if it's prayer time (within 1 minute window)
export const isPrayerTime = (prayerTimeStr: string): boolean => {
  try {
    const now = new Date();
    const timeParts = prayerTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeParts) return false;

    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const period = timeParts[3].toUpperCase();

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0, 0);

    // Check if within 1 minute window
    const diffMs = Math.abs(now.getTime() - prayerTime.getTime());
    const diffMinutes = diffMs / 1000 / 60;

    return diffMinutes <= 1;
  } catch (error) {
    return false;
  }
};
