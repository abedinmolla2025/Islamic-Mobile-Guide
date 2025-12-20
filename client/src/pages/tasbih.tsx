import { useState, useEffect, useCallback } from "react";
import BottomNav from "@/components/BottomNav";
import { RotateCcw, Settings, Edit2 } from "lucide-react";
import { storage } from "@/lib/storage";
import { cn } from "@/lib/utils";

const TASBIH_TARGETS = [33, 99, 100, 500, 1000];
const BEAD_COLORS = [
  { name: "Green", bg: "from-[#10b981] to-[#059669]", hex: "#10b981" },
  { name: "Teal", bg: "from-[#14b8a6] to-[#0d9488]", hex: "#14b8a6" },
  { name: "Brown", bg: "from-[#92400e] to-[#78350f]", hex: "#92400e" },
  { name: "Blue", bg: "from-[#3b82f6] to-[#1d4ed8]", hex: "#3b82f6" },
  { name: "Purple", bg: "from-[#a855f7] to-[#7e22ce]", hex: "#a855f7" },
];

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
  const [beadColorIdx, setBeadColorIdx] = useState(0);
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

  const rounds = Math.floor(count / target);
  const currentProgress = count % target;
  const currentDhikr = DHIKR_OPTIONS[selectedDhikr];
  const selectedColor = BEAD_COLORS[beadColorIdx];

  // Show 8 beads in the display
  const VISIBLE_BEADS = 8;
  const beads = [];
  const startBead = Math.max(0, currentProgress - 2);
  
  for (let i = 0; i < VISIBLE_BEADS; i++) {
    const beadNum = startBead + i;
    const isUsed = beadNum < currentProgress;
    beads.push({ id: beadNum, used: isUsed });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleReset}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              data-testid="button-back-tasbih"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-2xl font-bold text-white">Tasbih</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">{currentProgress}/{target}</span>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              data-testid="button-tasbih-settings"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Dhikr Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <p className="text-4xl font-arabic text-center text-white mb-4" style={{ fontFamily: "'Amiri', serif" }}>
            {currentDhikr.arabic}
          </p>
          <p className="text-white/90 text-center font-medium">{currentDhikr.transliteration}</p>
          <p className="text-white/60 text-center text-sm mt-2">{currentDhikr.meaning}</p>
        </div>

        {/* Count & Rounds Display */}
        <div className="text-center mb-12">
          <div className="text-6xl font-bold text-white tabular-nums" data-testid="tasbih-count">
            {currentProgress}/{target}
          </div>
          <div className="text-white/70 text-sm mt-2">Rounds: {rounds}</div>
        </div>

        {/* Beads Display */}
        <div className="flex justify-center mb-12 perspective">
          <div className="flex items-center gap-4" style={{ perspective: "1200px" }}>
            {/* String line */}
            <div className="absolute h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" 
                 style={{ width: beads.length * 64 + 60 }} />
            
            {/* Beads */}
            {beads.map((bead, idx) => (
              <div key={bead.id} className="flex flex-col items-center">
                {!bead.used ? (
                  <div className="relative w-14 h-14 flex-shrink-0 group">
                    {/* Main bead - 3D sphere effect */}
                    <div className={cn(
                      "absolute inset-0 rounded-full flex-shrink-0 transition-all duration-200",
                      `bg-gradient-to-br ${selectedColor.bg}`,
                      "group-hover:scale-110"
                    )} 
                    style={{
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3), inset -1px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 4px rgba(255, 255, 255, 0.3)",
                      transformStyle: "preserve-3d",
                      backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 50%), linear-gradient(135deg, ${selectedColor.hex} 0%, ${selectedColor.hex} 100%)`
                    }}>
                      {/* Top highlight - glossy shine */}
                      <div className="absolute w-3 h-3 bg-white/50 rounded-full" 
                           style={{ top: '3px', left: '4px', filter: 'blur(1px)' }} />
                      
                      {/* Secondary highlight */}
                      <div className="absolute w-2 h-2 bg-white/30 rounded-full" 
                           style={{ top: '5px', right: '6px' }} />
                    </div>
                  </div>
                ) : (
                  /* Used bead - fading animation */
                  <div className="w-14 h-14 rounded-full flex-shrink-0 animate-bead-move-away"
                       style={{
                         backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 50%), linear-gradient(135deg, ${selectedColor.hex} 0%, ${selectedColor.hex} 100%)`,
                         boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3), inset -1px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 4px rgba(255, 255, 255, 0.3)"
                       }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Click/Swipe hint and Main counter button */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <p className="text-white/60 text-center text-sm">Click or swipe to count</p>
          
          <button
            onClick={handleCount}
            className="w-40 h-40 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/30 flex items-center justify-center active:scale-95 transition-all duration-150 shadow-2xl hover:border-white/50"
            data-testid="button-increment-tasbih"
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-white">{currentProgress}</div>
              <div className="text-white/70 text-sm">Tap to count</div>
            </div>
          </button>
        </div>

        {/* Bead Color Selection */}
        <div className="flex justify-center gap-3 mb-8">
          {BEAD_COLORS.map((color, idx) => (
            <button
              key={color.name}
              onClick={() => setBeadColorIdx(idx)}
              className={cn(
                "w-12 h-12 rounded-full transition-all",
                `bg-gradient-to-br ${color.bg}`,
                beadColorIdx === idx ? "ring-2 ring-white scale-110" : "opacity-70 hover:opacity-100"
              )}
              data-testid={`button-color-${color.name}`}
            />
          ))}
        </div>

        {/* Edit Settings Button */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            data-testid="button-edit-tasbih"
          >
            <Edit2 className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Settings Panel */}
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
              className="flex items-center gap-3 text-white w-full p-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <input 
                type="checkbox" 
                checked={vibrate}
                onChange={() => {}}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span>Vibration Feedback</span>
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
