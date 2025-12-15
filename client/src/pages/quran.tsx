import BottomNav from "@/components/BottomNav";
import { getAllSurahs, AVAILABLE_TRANSLATIONS, type Surah } from "@/lib/quranApi";
import { useQuery } from "@tanstack/react-query";
import { Search, PlayCircle, BookOpen, ChevronRight, Globe, RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Quran() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("quran_translation") || "en.sahih";
  });

  const { data: surahs = [], isLoading, error, refetch } = useQuery<Surah[]>({
    queryKey: ["/api/quran/surahs"],
    queryFn: getAllSurahs,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    localStorage.setItem("quran_translation", selectedLanguage);
  }, [selectedLanguage]);

  const filteredSurahs = surahs.filter(surah => 
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.number.toString().includes(searchQuery)
  );

  const currentTranslation = AVAILABLE_TRANSLATIONS.find(t => t.identifier === selectedLanguage);

  const lastRead = localStorage.getItem("quran_last_read");
  const lastReadData = lastRead ? JSON.parse(lastRead) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] pb-24">
      <div className="max-w-lg mx-auto h-full flex flex-col">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Holy Quran</h1>
                <p className="text-white/60 text-xs">114 Surahs | Multiple Languages</p>
              </div>
            </div>
            
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger 
                className="w-[130px] bg-white/10 border-0 text-white text-xs"
                data-testid="select-language"
              >
                <Globe className="w-3 h-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_TRANSLATIONS.map((translation) => (
                  <SelectItem 
                    key={translation.identifier} 
                    value={translation.identifier}
                    data-testid={`lang-${translation.identifier}`}
                  >
                    {translation.englishName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
            
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search by name or number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border-0 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all text-sm text-white placeholder:text-white/40"
              data-testid="input-search-quran"
            />
          </div>
        </div>

        {lastReadData && (
          <div className="px-4 mb-4">
            <Link href={`/surah/${lastReadData.surahNumber}`}>
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8962E] rounded-2xl p-5 relative overflow-hidden cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-white/80 text-[10px] font-semibold uppercase tracking-widest">
                      <BookOpen className="w-3 h-3" />
                      Last Read
                    </div>
                    <h3 className="text-xl font-bold text-white mb-0.5">{lastReadData.surahName}</h3>
                    <p className="text-white/80 text-sm">Continue reading</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="px-4 mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white/80 uppercase tracking-wider">
            All Surahs ({isLoading ? "..." : surahs.length})
          </h2>
          {currentTranslation && (
            <span className="text-xs text-[#D4AF37]">{currentTranslation.name}</span>
          )}
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 pb-4">
            {error ? (
              <div className="text-center py-8">
                <p className="text-white/70 mb-4">Failed to load surahs. Please try again.</p>
                <Button onClick={() => refetch()} variant="outline" className="text-white border-white/30">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            ) : isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-lg bg-white/10" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-2 bg-white/10" />
                      <Skeleton className="h-3 w-16 bg-white/10" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-20 bg-white/10" />
                </div>
              ))
            ) : filteredSurahs.length === 0 ? (
              <div className="text-center py-8 text-white/50">
                <p>No surahs found matching "{searchQuery}"</p>
              </div>
            ) : (
              filteredSurahs.map((surah) => (
                <Link key={surah.number} href={`/surah/${surah.number}`}>
                  <div 
                    className="group bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/15 transition-all cursor-pointer flex items-center justify-between"
                    data-testid={`surah-${surah.number}`}
                    onClick={() => {
                      localStorage.setItem("quran_last_read", JSON.stringify({
                        surahNumber: surah.number,
                        surahName: surah.englishName
                      }));
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                        <span className="text-[#D4AF37] font-bold text-sm">{surah.number}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          {surah.englishName}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] text-white/50">
                          <span className="uppercase font-medium">{surah.revelationType}</span>
                          <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                          <span>{surah.numberOfAyahs} Ayahs</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-[#D4AF37]/80 font-arabic">
                        {surah.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] transition-colors" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
      <BottomNav />
    </div>
  );
}
