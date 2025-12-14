import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import { getSurahWithTranslation, AVAILABLE_TRANSLATIONS, type SurahDetail } from "@/lib/quranApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, BookOpen, Globe, ChevronUp } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function SurahPage() {
  const params = useParams();
  const surahNumber = parseInt(params.number || "1", 10);
  
  const [selectedTranslation, setSelectedTranslation] = useState(() => {
    return localStorage.getItem("quran_translation") || "en.sahih";
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    localStorage.setItem("quran_translation", selectedTranslation);
  }, [selectedTranslation]);

  const { data: surah, isLoading, error, refetch } = useQuery<SurahDetail>({
    queryKey: ["/api/quran/surah", surahNumber, selectedTranslation],
    queryFn: () => getSurahWithTranslation(surahNumber, selectedTranslation),
    staleTime: 1000 * 60 * 30,
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setShowScrollTop(scrollTop > 500);
  };

  const scrollToTop = () => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea) {
      scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentTranslation = AVAILABLE_TRANSLATIONS.find(t => t.identifier === selectedTranslation);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] flex items-center justify-center">
        <div className="text-center text-white p-8">
          <p className="mb-4">Failed to load surah. Please try again.</p>
          <Button onClick={() => refetch()} variant="outline" className="text-white border-white/30">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] pb-24">
      <div className="max-w-lg mx-auto h-full flex flex-col">
        <div className="px-4 pt-4 pb-3 sticky top-0 z-20 bg-gradient-to-b from-[#0d4a3a] to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <Link href="/quran">
              <Button variant="ghost" size="icon" className="text-white" data-testid="button-back-quran">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            
            <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
              <SelectTrigger 
                className="w-[180px] bg-white/10 border-0 text-white text-sm"
                data-testid="select-translation"
              >
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Translation" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_TRANSLATIONS.map((translation) => (
                  <SelectItem 
                    key={translation.identifier} 
                    value={translation.identifier}
                    data-testid={`translation-${translation.identifier}`}
                  >
                    {translation.englishName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-4">
              <Skeleton className="h-8 w-48 mx-auto mb-2 bg-white/10" />
              <Skeleton className="h-4 w-32 mx-auto bg-white/10" />
            </div>
          ) : surah && (
            <div className="text-center">
              <h1 
                className="text-3xl text-[#D4AF37] mb-1" 
                style={{ fontFamily: "'Amiri', serif" }}
                data-testid="text-surah-name-arabic"
              >
                {surah.name}
              </h1>
              <h2 className="text-xl font-bold text-white" data-testid="text-surah-name-english">
                {surah.englishName}
              </h2>
              <p className="text-white/60 text-sm">
                {surah.englishNameTranslation} | {surah.numberOfAyahs} Verses | {surah.revelationType}
              </p>
            </div>
          )}
        </div>

        {surahNumber !== 9 && surahNumber !== 1 && (
          <div className="text-center py-4 px-4">
            <p 
              className="text-2xl text-[#D4AF37]" 
              style={{ fontFamily: "'Amiri', serif" }}
              data-testid="text-bismillah"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-white/60 text-sm mt-1">In the name of Allah, the Most Gracious, the Most Merciful</p>
          </div>
        )}

        <ScrollArea className="flex-1" onScrollCapture={handleScroll}>
          <div className="px-4 pb-8 space-y-6">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4">
                  <Skeleton className="h-8 w-full mb-3 bg-white/10" />
                  <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                  <Skeleton className="h-4 w-3/4 bg-white/10" />
                </div>
              ))
            ) : surah?.ayahs.map((ayah) => (
              <div 
                key={ayah.numberInSurah} 
                className="bg-white/5 rounded-xl p-4"
                data-testid={`ayah-${ayah.numberInSurah}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF37] font-bold text-xs">{ayah.numberInSurah}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <span>Juz {ayah.juz}</span>
                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                    <span>Page {ayah.page}</span>
                  </div>
                </div>
                
                <p 
                  className="text-2xl leading-loose text-white text-right mb-4" 
                  style={{ fontFamily: "'Amiri', serif" }}
                  dir="rtl"
                  data-testid={`ayah-arabic-${ayah.numberInSurah}`}
                >
                  {ayah.text}
                </p>
                
                {ayah.translation && (
                  <p 
                    className="text-white/70 text-sm leading-relaxed"
                    dir={currentTranslation?.direction || "ltr"}
                    data-testid={`ayah-translation-${ayah.numberInSurah}`}
                  >
                    {ayah.translation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {showScrollTop && (
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-28 right-4 z-30 rounded-full bg-[#D4AF37] text-white shadow-lg"
            onClick={scrollToTop}
            data-testid="button-scroll-top"
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
        )}

        <div className="px-4 py-3 flex justify-between sticky bottom-20 z-10 bg-gradient-to-t from-[#0a3d30] to-transparent">
          {surahNumber > 1 && (
            <Link href={`/surah/${surahNumber - 1}`}>
              <Button variant="outline" className="text-white border-white/30" data-testid="button-prev-surah">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            </Link>
          )}
          <div className="flex-1" />
          {surahNumber < 114 && (
            <Link href={`/surah/${surahNumber + 1}`}>
              <Button variant="outline" className="text-white border-white/30" data-testid="button-next-surah">
                Next
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
