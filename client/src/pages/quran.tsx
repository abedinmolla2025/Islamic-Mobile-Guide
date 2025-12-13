import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { quranSurahs } from "@/lib/mockData";
import { Search, PlayCircle, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Quran() {
  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <div className="max-w-md mx-auto h-full flex flex-col">
        <div className="px-6 pt-6 pb-2">
            <h1 className="text-2xl font-bold font-serif text-foreground mb-6">Holy Quran</h1>
            
            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                    type="text" 
                    placeholder="Search Surah..." 
                    className="w-full bg-white border border-border/60 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                />
            </div>

            {/* Last Read Card */}
            <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1F4037] to-[#0F2027] rounded-2xl p-5 text-white shadow-lg mb-8 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                 <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-emerald-100/70 text-xs font-medium uppercase tracking-wider">
                            <BookIcon className="w-3 h-3" />
                            Last Read
                        </div>
                        <h3 className="text-xl font-bold mb-1">Al-Mulk</h3>
                        <p className="text-emerald-100/80 text-sm">Ayah 12</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-all">
                        <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                 </div>
            </div>
        </div>

        <ScrollArea className="flex-1 px-6">
            <div className="space-y-3 pb-4">
                {quranSurahs.map((surah) => (
                    <div key={surah.number} className="group bg-white p-4 rounded-2xl border border-border/40 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary font-bold text-sm rotated-square relative">
                                <span className="relative z-10">{surah.number}</span>
                                <div className="absolute inset-0 border border-primary/20 rounded-lg rotate-45 scale-75"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{surah.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="uppercase">{surah.type}</span>
                                    <span className="w-1 h-1 bg-muted-foreground/30 rounded-full"></span>
                                    <span>{surah.verses} Verses</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="font-serif text-xl text-primary/80" style={{ fontFamily: "'Amiri', serif" }}>{surah.name}</span>
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

function BookIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    )
}
