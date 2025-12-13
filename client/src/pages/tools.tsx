import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { Compass, RotateCcw, Calculator, Grid } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { namesOfAllah } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Tools() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        <h1 className="text-2xl font-bold font-serif text-foreground">Tools</h1>

        <div className="grid grid-cols-2 gap-4">
            {/* Tasbih Card */}
            <div className="col-span-2 bg-primary text-primary-foreground rounded-3xl p-6 shadow-xl shadow-primary/20 relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-sm font-medium opacity-80 mb-4">Digital Tasbih</h2>
                    <span className="text-5xl font-bold font-mono tracking-tighter mb-4">{count.toString().padStart(3, '0')}</span>
                    <div className="flex gap-4">
                        <button onClick={() => setCount(0)} className="p-2 rounded-full bg-white/10 hover:bg-white/20"><RotateCcw className="w-4 h-4" /></button>
                        <button onClick={() => setCount(c => c + 1)} className="px-6 py-2 bg-white text-primary rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform">Tap</button>
                    </div>
                </div>
            </div>

            {/* Qibla Compass Card (Simplified) */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-border/40 flex flex-col items-center justify-center gap-2 aspect-square">
                <Compass className="w-8 h-8 text-primary" />
                <span className="font-bold text-sm">Qibla Compass</span>
            </div>

            {/* Zakat Calculator (Mock) */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-border/40 flex flex-col items-center justify-center gap-2 aspect-square">
                <Calculator className="w-8 h-8 text-primary" />
                <span className="font-bold text-sm">Zakat Calc</span>
            </div>

            {/* 99 Names of Allah */}
            <Dialog>
                <DialogTrigger asChild>
                    <div className="col-span-2 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white p-4 rounded-2xl shadow-lg flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity">
                        <div className="flex items-center gap-3">
                            <Grid className="w-6 h-6" />
                            <span className="font-bold">99 Names of Allah</span>
                        </div>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">View All</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] flex flex-col p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle>Asmaul Husna</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="flex-1 p-6 pt-0">
                        <div className="grid grid-cols-2 gap-3 pb-6">
                            {namesOfAllah.map((item, idx) => (
                                <div key={idx} className="bg-muted/30 p-3 rounded-xl border border-border/50 text-center">
                                    <span className="block font-serif text-2xl text-primary mb-1" style={{ fontFamily: "'Amiri', serif" }}>{item.arabic}</span>
                                    <span className="block text-sm font-bold">{item.name}</span>
                                    <span className="block text-xs text-muted-foreground">{item.meaning}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
