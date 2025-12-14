export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  juz: number;
  page: number;
}

export interface TranslatedAyah extends Ayah {
  translation?: string;
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: TranslatedAyah[];
}

export interface TranslationEdition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  direction: string;
}

export const AVAILABLE_TRANSLATIONS: TranslationEdition[] = [
  { identifier: "en.sahih", language: "en", name: "Sahih International", englishName: "English", direction: "ltr" },
  { identifier: "bn.bengali", language: "bn", name: "মুহিউদ্দীন খান", englishName: "Bengali", direction: "ltr" },
  { identifier: "bn.hoque", language: "bn", name: "জহুরুল হক", englishName: "Bengali (Zohurul Hoque)", direction: "ltr" },
  { identifier: "ur.ahmedali", language: "ur", name: "احمد علی", englishName: "Urdu", direction: "rtl" },
  { identifier: "id.indonesian", language: "id", name: "Bahasa Indonesia", englishName: "Indonesian", direction: "ltr" },
  { identifier: "tr.diyanet", language: "tr", name: "Diyanet İşleri", englishName: "Turkish", direction: "ltr" },
  { identifier: "ru.kuliev", language: "ru", name: "Эльмир Кулиев", englishName: "Russian", direction: "ltr" },
  { identifier: "fr.hamidullah", language: "fr", name: "Muhammad Hamidullah", englishName: "French", direction: "ltr" },
  { identifier: "de.bubenheim", language: "de", name: "Bubenheim & Elyas", englishName: "German", direction: "ltr" },
  { identifier: "es.cortes", language: "es", name: "Julio Cortes", englishName: "Spanish", direction: "ltr" },
  { identifier: "hi.hindi", language: "hi", name: "फ़ारूक़ ख़ान & नदवी", englishName: "Hindi", direction: "ltr" },
  { identifier: "ml.karakunnu", language: "ml", name: "അബ്ദുല്‍ ഹമീദ്", englishName: "Malayalam", direction: "ltr" },
  { identifier: "ta.tamil", language: "ta", name: "ஜான் ட்ரஸ்ட்", englishName: "Tamil", direction: "ltr" },
];

const API_BASE = "https://api.alquran.cloud/v1";

export async function getAllSurahs(): Promise<Surah[]> {
  const response = await fetch(`${API_BASE}/surah`);
  const data = await response.json();
  if (data.code === 200) {
    return data.data;
  }
  throw new Error("Failed to fetch surahs");
}

export async function getSurahWithTranslation(
  surahNumber: number,
  translationId: string = "en.sahih"
): Promise<SurahDetail> {
  const [arabicRes, translationRes] = await Promise.all([
    fetch(`${API_BASE}/surah/${surahNumber}/ar.alafasy`),
    fetch(`${API_BASE}/surah/${surahNumber}/${translationId}`)
  ]);

  const arabicData = await arabicRes.json();
  const translationData = await translationRes.json();

  if (arabicData.code !== 200 || translationData.code !== 200) {
    throw new Error("Failed to fetch surah details");
  }

  const arabicAyahs = arabicData.data.ayahs;
  const translationAyahs = translationData.data.ayahs;

  const mergedAyahs: TranslatedAyah[] = arabicAyahs.map((ayah: Ayah, index: number) => ({
    ...ayah,
    translation: translationAyahs[index]?.text || ""
  }));

  return {
    number: arabicData.data.number,
    name: arabicData.data.name,
    englishName: arabicData.data.englishName,
    englishNameTranslation: arabicData.data.englishNameTranslation,
    numberOfAyahs: arabicData.data.numberOfAyahs,
    revelationType: arabicData.data.revelationType,
    ayahs: mergedAyahs
  };
}

export async function searchQuran(query: string, translationId: string = "en.sahih"): Promise<TranslatedAyah[]> {
  const response = await fetch(`${API_BASE}/search/${encodeURIComponent(query)}/all/${translationId}`);
  const data = await response.json();
  if (data.code === 200) {
    return data.data.matches || [];
  }
  return [];
}
