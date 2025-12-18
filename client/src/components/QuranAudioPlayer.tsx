import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Repeat1,
  ListMusic,
  Loader2,
  Mic2,
  Gauge,
} from "lucide-react";
import {
  AVAILABLE_RECITERS,
  PLAYBACK_SPEEDS,
  formatTime,
  getStoredAudioPreferences,
  saveAudioPreferences,
  type PlaybackMode,
  type Reciter,
} from "@/lib/quranAudio";

interface QuranAudioPlayerProps {
  audioUrls: string[];
  surahNumber: number;
  totalAyahs: number;
  selectedReciter: string;
  onReciterChange: (reciterId: string) => void;
  onAyahChange?: (ayahNumber: number) => void;
  className?: string;
}

export default function QuranAudioPlayer({
  audioUrls,
  surahNumber,
  totalAyahs,
  selectedReciter,
  onReciterChange,
  onAyahChange,
  className = "",
}: QuranAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(() => {
    const prefs = getStoredAudioPreferences();
    return prefs.volume ?? 1;
  });
  const [playbackSpeed, setPlaybackSpeed] = useState(() => {
    const prefs = getStoredAudioPreferences();
    return prefs.playbackSpeed ?? 1;
  });
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(() => {
    const prefs = getStoredAudioPreferences();
    return (prefs.playbackMode as PlaybackMode) ?? "continuous";
  });
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setIsPlaying(false);
    setCurrentAyah(1);
    setCurrentTime(0);
    setDuration(0);
  }, [audioUrls, selectedReciter]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => handleTrackEnd();
    const handleError = () => {
      setIsLoading(false);
      console.error("Audio error");
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    saveAudioPreferences({ volume, playbackSpeed, playbackMode, currentReciter: selectedReciter });
  }, [volume, playbackSpeed, playbackMode, selectedReciter]);

  const handleTrackEnd = useCallback(() => {
    if (playbackMode === "repeat-one") {
      audioRef.current?.play();
    } else if (playbackMode === "continuous" || playbackMode === "repeat-surah") {
      if (currentAyah < totalAyahs) {
        playAyah(currentAyah + 1);
      } else if (playbackMode === "repeat-surah") {
        playAyah(1);
      } else {
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  }, [playbackMode, currentAyah, totalAyahs]);

  const playAyah = useCallback((ayahNumber: number) => {
    if (!audioRef.current || !audioUrls[ayahNumber - 1]) return;
    
    setCurrentAyah(ayahNumber);
    audioRef.current.src = audioUrls[ayahNumber - 1];
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.volume = isMuted ? 0 : volume;
    audioRef.current.play();
    setIsPlaying(true);
    onAyahChange?.(ayahNumber);
  }, [audioUrls, playbackSpeed, volume, isMuted, onAyahChange]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src || audioRef.current.src === "") {
        playAyah(currentAyah);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const previousAyah = () => {
    if (currentAyah > 1) {
      playAyah(currentAyah - 1);
    }
  };

  const nextAyah = () => {
    if (currentAyah < totalAyahs) {
      playAyah(currentAyah + 1);
    }
  };

  const cyclePlaybackMode = () => {
    const modes: PlaybackMode[] = ["continuous", "repeat-surah", "repeat-one", "single"];
    const currentIndex = modes.indexOf(playbackMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setPlaybackMode(nextMode);
  };

  const getPlaybackModeIcon = () => {
    switch (playbackMode) {
      case "repeat-one":
        return <Repeat1 className="w-4 h-4" />;
      case "repeat-surah":
        return <Repeat className="w-4 h-4 text-[#D4AF37]" />;
      case "continuous":
        return <ListMusic className="w-4 h-4 text-[#D4AF37]" />;
      default:
        return <ListMusic className="w-4 h-4" />;
    }
  };

  const getPlaybackModeLabel = () => {
    switch (playbackMode) {
      case "repeat-one": return "Repeat Ayah";
      case "repeat-surah": return "Repeat Surah";
      case "continuous": return "Play All";
      default: return "Single";
    }
  };

  const currentReciterInfo = AVAILABLE_RECITERS.find(r => r.id === selectedReciter);

  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
            <Mic2 className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-white text-sm font-medium" data-testid="text-current-ayah">
              Ayah {currentAyah} of {totalAyahs}
            </p>
            <p className="text-white/50 text-xs">{currentReciterInfo?.name || "Select Reciter"}</p>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/70 text-xs"
              data-testid="button-select-reciter"
            >
              Change Reciter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-2" align="end">
            <p className="text-sm font-medium mb-2 px-2">Select Reciter</p>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {AVAILABLE_RECITERS.map((reciter) => (
                <button
                  key={reciter.id}
                  onClick={() => onReciterChange(reciter.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedReciter === reciter.id
                      ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                      : "hover:bg-muted"
                  }`}
                  data-testid={`reciter-${reciter.id}`}
                >
                  <p className="font-medium">{reciter.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {reciter.arabicName} {reciter.style && `• ${reciter.style}`}
                  </p>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-3">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
          data-testid="slider-progress"
        />
        <div className="flex justify-between text-xs text-white/50 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-white/70"
            data-testid="button-mute"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-16 cursor-pointer"
            data-testid="slider-volume"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={previousAyah}
            disabled={currentAyah <= 1}
            className="text-white disabled:opacity-30"
            data-testid="button-previous-ayah"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={togglePlay}
            disabled={isLoading || audioUrls.length === 0}
            className="bg-[#D4AF37] text-white w-12 h-12 rounded-full"
            data-testid="button-play-pause"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextAyah}
            disabled={currentAyah >= totalAyahs}
            className="text-white disabled:opacity-30"
            data-testid="button-next-ayah"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70"
                data-testid="button-playback-speed"
              >
                <Gauge className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32 p-2" align="end">
              <p className="text-xs font-medium mb-2 px-2">Speed</p>
              {PLAYBACK_SPEEDS.map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${
                    playbackSpeed === speed
                      ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                      : "hover:bg-muted"
                  }`}
                  data-testid={`speed-${speed}`}
                >
                  {speed}x
                </button>
              ))}
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            onClick={cyclePlaybackMode}
            className="text-white/70"
            title={getPlaybackModeLabel()}
            data-testid="button-playback-mode"
          >
            {getPlaybackModeIcon()}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-3 text-xs text-white/50">
        <span className="flex items-center gap-1">
          <Gauge className="w-3 h-3" />
          {playbackSpeed}x
        </span>
        <span className="flex items-center gap-1">
          {getPlaybackModeIcon()}
          {getPlaybackModeLabel()}
        </span>
      </div>
    </div>
  );
}
