import { useState, useEffect, useCallback } from "react";
import BottomNav from "@/components/BottomNav";
import { RotateCcw, Minus, Plus, Settings, Volume2, VolumeX } from "lucide-react";
import { storage } from "@/lib/storage";
import { cn } from "@/lib/utils";

const TASBIH_TARGETS = [33, 99, 100, 500, 1000];
const DHIKR_OPTIONS = [
  { arabic: "سُبْحَانَ اللهِ", transliteration: "SubhanAllah", meaning: "Glory be to Allah" },
  { arabic: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", meaning: "Praise be to Allah" },
  { arabic: "اللهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest" },
  { arabic: "لَا إِلٰهَ إِلَّا اللهُ", transliteration: "La ilaha illallah", meaning: "There is no god but Allah" },
  { arabic: "أَسْتَغْفِرُ اللهَ", transliteration: "Astaghfirullah", meaning: "I seek forgiveness from Allah" },
];

export default function Tasbih() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedDhikr, setSelectedDhikr] = useState(0);
  const [vibrate, setVibrate] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedCount = storage.getTasbihCount();
    setCount(savedCount);
  }, []);

  const handleCount = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);
    storage.setTasbihCount(newCount);
    
    if (vibrate && navigator.vibrate) {
      navigator.vibrate(30);
    }
  }, [count, vibrate]);

  const handleReset = () => {
    setCount(0);
    storage.setTasbihCount(0);
  };

  const progress = Math.min((count / target) * 100, 100);
  const currentDhikr = DHIKR_OPTIONS[selectedDhikr];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Tasbih</h1>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            data-testid="button-tasbih-settings"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>

        {showSettings && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 space-y-4">
            <div>
              <label className="text-white/70 text-xs uppercase tracking-wider mb-2 block">Select Dhikr</label>
              <div className="space-y-2">
                {DHIKR_OPTIONS.map((dhikr, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDhikr(idx)}
                    className={cn(
                      "w-full p-3 rounded-xl text-left transition-all",
                      selectedDhikr === idx 
                        ? "bg-white/20 border border-white/30" 
                        : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <span className="text-white font-medium">{dhikr.transliteration}</span>
                    <span className="text-white/60 text-sm ml-2">- {dhikr.meaning}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white/70 text-xs uppercase tracking-wider mb-2 block">Target Count</label>
              <div className="flex gap-2 flex-wrap">
                {TASBIH_TARGETS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTarget(t)}
                    className={cn(
                      "px-4 py-2 rounded-xl transition-all",
                      target === t 
                        ? "bg-white text-[#0d4a3a] font-bold" 
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setVibrate(!vibrate)}
              className="flex items-center gap-3 text-white"
            >
              {vibrate ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              <span>Vibration {vibrate ? "On" : "Off"}</span>
            </button>
          </div>
        )}

        <div className="text-center mb-8">
          <p className="text-5xl font-arabic text-white mb-2" style={{ fontFamily: "'Amiri', serif" }}>
            {currentDhikr.arabic}
          </p>
          <p className="text-white/70">{currentDhikr.transliteration}</p>
        </div>

        <div className="relative flex items-center justify-center mb-8">
          <div className="relative w-64 h-64">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} 283`}
                className="transition-all duration-300"
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span 
                className="text-7xl font-bold text-white tabular-nums"
                data-testid="tasbih-count"
              >
                {count}
              </span>
              <span className="text-white/50 text-sm mt-1">of {target}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handleReset}
            className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
            data-testid="button-reset-tasbih"
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleCount}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8962E] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
            data-testid="button-increment-tasbih"
          >
            <Plus className="w-12 h-12 text-white" strokeWidth={3} />
          </button>

          <button
            onClick={() => {
              if (count > 0) {
                setCount(count - 1);
                storage.setTasbihCount(count - 1);
              }
            }}
            className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
            data-testid="button-decrement-tasbih"
          >
            <Minus className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[33, 66, 99].map((milestone) => (
            <div 
              key={milestone}
              className={cn(
                "text-center p-3 rounded-xl transition-all",
                count >= milestone ? "bg-[#D4AF37]/20" : "bg-white/5"
              )}
            >
              <span className={cn(
                "text-lg font-bold",
                count >= milestone ? "text-[#D4AF37]" : "text-white/40"
              )}>
                {milestone}
              </span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
