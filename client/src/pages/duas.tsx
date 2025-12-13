import BottomNav from "@/components/BottomNav";
import { duas } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

export default function Duas() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] pb-24">
      <div className="max-w-lg mx-auto h-full flex flex-col">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Duas & Azkar</h1>
              <p className="text-white/60 text-xs">Supplications for daily life</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search Dua..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border-0 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all text-sm text-white placeholder:text-white/40"
              data-testid="input-search-dua"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <Accordion type="multiple" className="space-y-4 pb-4">
            {duas.map((category, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="bg-[#D4AF37]/20 px-4 py-3 border-b border-white/10">
                  <h3 className="font-bold text-[#D4AF37] text-sm">{category.category}</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {category.items.map((dua, dIdx) => (
                    <AccordionItem value={`${idx}-${dIdx}`} key={dIdx} className="border-none">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5 transition-colors [&>svg]:text-white/40 text-white">
                        <span className="text-sm font-medium text-left">{dua.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2 bg-white/5">
                        <div className="space-y-4 text-center">
                          <p className="text-2xl text-[#D4AF37] leading-loose py-2" style={{ fontFamily: "'Amiri', serif" }}>{dua.arabic}</p>
                          <p className="text-sm text-white/70 italic leading-relaxed">{dua.translation}</p>
                          <p className="text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-[0.15em]">{dua.reference}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              </div>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
      <BottomNav />
    </div>
  );
}
