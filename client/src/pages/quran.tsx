import BottomNav from "@/components/BottomNav";
import { quranSurahs } from "@/lib/mockData";
import { Search, PlayCircle, BookOpen, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Quran() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = quranSurahs.filter(surah => 
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] pb-24">
      <div className="max-w-lg mx-auto h-full flex flex-col">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Holy Quran</h1>
              <p className="text-white/60 text-xs">Read & Explore</p>
            </div>
          </div>
            
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search Surah..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border-0 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all text-sm text-white placeholder:text-white/40"
              data-testid="input-search-quran"
            />
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8962E] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-2 text-white/80 text-[10px] font-semibold uppercase tracking-widest">
                  <BookOpen className="w-3 h-3" />
                  Last Read
                </div>
                <h3 className="text-xl font-bold text-white mb-0.5">Al-Mulk</h3>
                <p className="text-white/80 text-sm">Ayah 12 of 30</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mb-3">
          <h2 className="text-sm font-bold text-white/80 uppercase tracking-wider">All Surahs</h2>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 pb-4">
            {filteredSurahs.map((surah) => (
              <div 
                key={surah.number} 
                className="group bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/15 transition-all cursor-pointer flex items-center justify-between"
                data-testid={`surah-${surah.number}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#D4AF37] font-bold text-sm">{surah.number}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">{surah.englishName}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/50">
                      <span className="uppercase font-medium">{surah.type}</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                      <span>{surah.verses} Ayahs</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl text-[#D4AF37]/70" style={{ fontFamily: "'Amiri', serif" }}>{surah.name}</span>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <BottomNav />
    </div>
  );
}
