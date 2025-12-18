export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  style?: string;
  bitrate: string;
}

export const AVAILABLE_RECITERS: Reciter[] = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy", arabicName: "مشاري راشد العفاسي", bitrate: "128kbps" },
  { id: "ar.abdulbasitmurattal", name: "Abdul Basit (Murattal)", arabicName: "عبد الباسط عبد الصمد", style: "Murattal", bitrate: "192kbps" },
  { id: "ar.abdulsamad", name: "Abdul Samad", arabicName: "عبد الباسط عبد الصمد", bitrate: "64kbps" },
  { id: "ar.hudhaify", name: "Ali Al-Hudhaify", arabicName: "علي الحذيفي", bitrate: "128kbps" },
  { id: "ar.husary", name: "Mahmoud Khalil Al-Husary", arabicName: "محمود خليل الحصري", bitrate: "128kbps" },
  { id: "ar.husarymujawwad", name: "Al-Husary (Mujawwad)", arabicName: "محمود خليل الحصري", style: "Mujawwad", bitrate: "128kbps" },
  { id: "ar.maabordalshuraym", name: "Saud Al-Shuraim", arabicName: "سعود الشريم", bitrate: "64kbps" },
  { id: "ar.minshawi", name: "Mohamed Siddiq Al-Minshawi", arabicName: "محمد صديق المنشاوي", bitrate: "128kbps" },
  { id: "ar.minshawimujawwad", name: "Al-Minshawi (Mujawwad)", arabicName: "محمد صديق المنشاوي", style: "Mujawwad", bitrate: "64kbps" },
  { id: "ar.muhammadayyoub", name: "Muhammad Ayyoub", arabicName: "محمد أيوب", bitrate: "128kbps" },
  { id: "ar.muhammadjibreel", name: "Muhammad Jibreel", arabicName: "محمد جبريل", bitrate: "128kbps" },
  { id: "ar.parhizgar", name: "Shahriar Parhizgar", arabicName: "شهريار بارھيزگار", bitrate: "128kbps" },
  { id: "ar.saaboromobarak", name: "Saad Al-Ghamdi", arabicName: "سعد الغامدي", bitrate: "128kbps" },
];

export type PlaybackMode = "continuous" | "single" | "repeat-one" | "repeat-surah";

export interface AudioState {
  isPlaying: boolean;
  currentSurah: number | null;
  currentAyah: number | null;
  currentReciter: string;
  playbackMode: PlaybackMode;
  volume: number;
  playbackSpeed: number;
  duration: number;
  currentTime: number;
  isLoading: boolean;
}

export const DEFAULT_AUDIO_STATE: AudioState = {
  isPlaying: false,
  currentSurah: null,
  currentAyah: null,
  currentReciter: "ar.alafasy",
  playbackMode: "continuous",
  volume: 1,
  playbackSpeed: 1,
  duration: 0,
  currentTime: 0,
  isLoading: false,
};

export const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const API_BASE = "https://api.alquran.cloud/v1";

export async function getAudioForSurah(surahNumber: number, reciterId: string = "ar.alafasy"): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/surah/${surahNumber}/${reciterId}`, {
      mode: 'cors',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    
    if (data.code === 200 && data.data?.ayahs) {
      return data.data.ayahs
        .map((ayah: { audio: string }) => {
          let url = ayah.audio;
          if (url && url.startsWith('http://')) {
            url = url.replace('http://', 'https://');
          }
          return url;
        })
        .filter(url => url);
    }
    console.warn("Unexpected API response:", data);
    return [];
  } catch (error) {
    console.error("Error fetching audio for surah:", error);
    return [];
  }
}

export async function getAudioForAyah(
  surahNumber: number, 
  ayahNumber: number, 
  reciterId: string = "ar.alafasy"
): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE}/ayah/${surahNumber}:${ayahNumber}/${reciterId}`, {
      mode: 'cors',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    
    if (data.code === 200 && data.data?.audio) {
      let url = data.data.audio;
      if (url && url.startsWith('http://')) {
        url = url.replace('http://', 'https://');
      }
      return url;
    }
    return null;
  } catch (error) {
    console.error("Error fetching ayah audio:", error);
    return null;
  }
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getStoredAudioPreferences(): Partial<AudioState> {
  try {
    const stored = localStorage.getItem("quran_audio_preferences");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error("Failed to parse audio preferences");
  }
  return {};
}

export function saveAudioPreferences(prefs: Partial<AudioState>): void {
  try {
    const existing = getStoredAudioPreferences();
    localStorage.setItem("quran_audio_preferences", JSON.stringify({
      ...existing,
      currentReciter: prefs.currentReciter ?? existing.currentReciter,
      playbackMode: prefs.playbackMode ?? existing.playbackMode,
      volume: prefs.volume ?? existing.volume,
      playbackSpeed: prefs.playbackSpeed ?? existing.playbackSpeed,
    }));
  } catch {
    console.error("Failed to save audio preferences");
  }
}
