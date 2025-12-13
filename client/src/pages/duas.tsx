import BottomNav from "@/components/BottomNav";
import { duas } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Heart, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

export default function Duas() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-28">
      <div className="max-w-lg mx-auto h-full flex flex-col">
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Duas & Azkar</h1>
              <p className="text-xs text-muted-foreground">Supplications for daily life</p>
            </div>
          </div>
        </div>

        <div className="px-5 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search Dua..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-0 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-premium text-sm placeholder:text-muted-foreground/60"
              data-testid="input-search-dua"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-5">
          <Accordion type="multiple" className="space-y-4 pb-4">
            {duas.map((category, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-premium overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-5 py-3.5 border-b border-border/30">
                  <h3 className="font-bold text-primary text-sm">{category.category}</h3>
                </div>
                <div className="divide-y divide-border/30">
                  {category.items.map((dua, dIdx) => (
                    <AccordionItem value={`${idx}-${dIdx}`} key={dIdx} className="border-none">
                      <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 transition-colors [&>svg]:text-muted-foreground">
                        <span className="text-sm font-medium text-left text-foreground">{dua.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5 pt-2 bg-gradient-to-b from-muted/20 to-transparent">
                        <div className="space-y-4 text-center">
                          <p className="font-serif text-2xl text-foreground leading-loose py-3" style={{ fontFamily: "'Amiri', serif" }}>{dua.arabic}</p>
                          <p className="text-sm text-muted-foreground italic leading-relaxed">{dua.translation}</p>
                          <p className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.15em]">{dua.reference}</p>
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
