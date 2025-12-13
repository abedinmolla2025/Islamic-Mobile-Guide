import BottomNav from "@/components/BottomNav";
import { duas } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Duas() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto h-full flex flex-col">
        <div className="px-6 pt-6 pb-2">
            <h1 className="text-2xl font-bold font-serif text-foreground mb-2">Duas & Azkar</h1>
            <p className="text-muted-foreground text-sm mb-6">Supplications for daily life</p>
            
            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                    type="text" 
                    placeholder="Search Dua..." 
                    className="w-full bg-white border border-border/60 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                />
            </div>
        </div>

        <ScrollArea className="flex-1 px-6">
            <Accordion type="multiple" className="space-y-4 pb-4">
                {duas.map((category, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-border/40 overflow-hidden shadow-sm">
                        <div className="bg-primary/5 px-4 py-3 border-b border-border/40">
                             <h3 className="font-bold text-primary">{category.category}</h3>
                        </div>
                        <div className="divide-y divide-border/40">
                            {category.items.map((dua, dIdx) => (
                                <AccordionItem value={`${idx}-${dIdx}`} key={dIdx} className="border-none">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors">
                                        <span className="text-sm font-medium text-left">{dua.title}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4 pt-2 bg-muted/10">
                                        <div className="space-y-3 text-center">
                                            <p className="font-serif text-2xl text-foreground leading-loose py-2" style={{ fontFamily: "'Amiri', serif" }}>{dua.arabic}</p>
                                            <p className="text-sm text-muted-foreground italic">{dua.translation}</p>
                                            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{dua.reference}</p>
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
