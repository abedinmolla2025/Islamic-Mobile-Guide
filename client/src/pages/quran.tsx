import BottomNav from "@/components/BottomNav";
import { quranSurahs } from "@/lib/mockData";
import { Search, PlayCircle, BookOpen, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Quran() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = quranSurahs.filter(surah => 
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-28 relative">
      <div className="max-w-lg mx-auto h-full flex flex-col">
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Holy Quran</h1>
              <p className="text-xs text-muted-foreground">Read & Explore</p>
            </div>
          </div>
            
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search Surah..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-0 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-premium text-sm placeholder:text-muted-foreground/60"
              data-testid="input-search-quran"
            />
          </div>
        </div>

        {/* Last Read Card */}
        <div className="px-5 mb-4">
          <div className="relative rounded-2xl overflow-hidden shadow-premium group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f4c3a] via-[#1a5f4a] to-[#0d3d2f]"></div>
            <div className="relative z-10 p-5 flex justify-between items-center text-white">
              <div>
                <div className="flex items-center gap-2 mb-2 text-white/60 text-[10px] font-semibold uppercase tracking-widest">
                  <BookOpen className="w-3 h-3" />
                  Last Read
                </div>
                <h3 className="text-xl font-bold mb-0.5">Al-Mulk</h3>
                <p className="text-white/70 text-sm">Ayah 12 of 30</p>
              </div>
              <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/25 transition-all group-hover:scale-105">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 mb-3">
          <h2 className="text-sm font-bold text-foreground">All Surahs</h2>
        </div>

        <ScrollArea className="flex-1 px-5">
          <div className="space-y-2.5 pb-4">
            {filteredSurahs.map((surah) => (
              <div 
                key={surah.number} 
                className="group bg-white p-4 rounded-2xl shadow-premium hover:shadow-lg transition-all cursor-pointer flex items-center justify-between hover:-translate-y-0.5 duration-200"
                data-testid={`surah-${surah.number}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center relative">
                    <span className="text-primary font-bold text-sm">{surah.number}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{surah.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="uppercase font-medium">{surah.type}</span>
                      <span className="w-1 h-1 bg-muted-foreground/40 rounded-full"></span>
                      <span>{surah.verses} Ayahs</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-serif text-xl text-primary/70" style={{ fontFamily: "'Amiri', serif" }}>{surah.name}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
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
