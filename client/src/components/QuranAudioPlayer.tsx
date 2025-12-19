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
    const handleError = () => {
      setIsLoading(false);
      console.error("Audio error");
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
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
  }, [playbackMode, currentAyah, totalAyahs, playAyah]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => handleTrackEnd();
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleTrackEnd]);

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
    <div className={`bg-gradient-to-br from-[#1F4037] via-[#2d6a64] to-[#1F4037] rounded-3xl p-6 shadow-2xl border border-[#D4AF37]/20 ${className}`}>
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <Mic2 className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-white text-lg font-semibold" data-testid="text-current-ayah">
                Ayah {currentAyah}
              </p>
              <p className="text-white/70 text-sm">{currentReciterInfo?.name || "Select Reciter"}</p>
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline"
                size="sm"
                className="text-[#D4AF37] border-[#D4AF37]/50 hover:bg-[#D4AF37]/10"
                data-testid="button-select-reciter"
              >
                Change Reciter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3 backdrop-blur-md" align="end">
              <p className="text-sm font-semibold mb-3 text-white">Select Reciter</p>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {AVAILABLE_RECITERS.map((reciter) => (
                  <button
                    key={reciter.id}
                    onClick={() => onReciterChange(reciter.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                      selectedReciter === reciter.id
                        ? "bg-[#D4AF37] text-[#1F4037] font-medium"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                    data-testid={`reciter-${reciter.id}`}
                  >
                    <p className="font-medium">{reciter.name}</p>
                    <p className="text-xs opacity-70">
                      {reciter.arabicName} {reciter.style && `• ${reciter.style}`}
                    </p>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 space-y-2">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
          data-testid="slider-progress"
        />
        <div className="flex justify-between text-xs text-white/60 font-medium">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={previousAyah}
          disabled={currentAyah <= 1}
          className="text-white/70 hover:text-white disabled:opacity-30 hover:bg-white/10 h-10 w-10"
          data-testid="button-previous-ayah"
        >
          <SkipBack className="w-5 h-5" />
        </Button>

        <Button
          variant="default"
          onClick={togglePlay}
          disabled={isLoading || audioUrls.length === 0}
          className="bg-gradient-to-r from-[#D4AF37] to-[#e5c158] text-[#1F4037] hover:shadow-lg hover:shadow-[#D4AF37]/50 w-16 h-16 rounded-full flex-shrink-0 font-semibold text-lg"
          data-testid="button-play-pause"
        >
          {isLoading ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextAyah}
          disabled={currentAyah >= totalAyahs}
          className="text-white/70 hover:text-white disabled:opacity-30 hover:bg-white/10 h-10 w-10"
          data-testid="button-next-ayah"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      {/* Secondary Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {/* Volume Control */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-white/70 hover:text-white flex-shrink-0 h-8 w-8"
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
            className="flex-1 cursor-pointer"
            data-testid="slider-volume"
          />
        </div>

        {/* Speed Control */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg h-auto py-3"
              data-testid="button-playback-speed"
            >
              <Gauge className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">{playbackSpeed}x</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2 backdrop-blur-md" align="center">
            <p className="text-xs font-semibold mb-2 px-2 text-white">Playback Speed</p>
            <div className="space-y-1">
              {PLAYBACK_SPEEDS.map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                    playbackSpeed === speed
                      ? "bg-[#D4AF37] text-[#1F4037] font-medium"
                      : "text-white hover:bg-white/10"
                  }`}
                  data-testid={`speed-${speed}`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Playback Mode */}
        <Button
          variant="ghost"
          onClick={cyclePlaybackMode}
          className="text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg h-auto py-3"
          title={getPlaybackModeLabel()}
          data-testid="button-playback-mode"
        >
          {getPlaybackModeIcon()}
          <span className="text-sm font-medium ml-2 hidden sm:inline">{getPlaybackModeLabel()}</span>
        </Button>
      </div>

      {/* Status Bar */}
      <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
        <div className="flex items-center justify-between text-xs text-white/70 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span className="font-medium">{isPlaying ? "Playing" : "Paused"}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Gauge className="w-3 h-3" />
              {playbackSpeed}x
            </span>
            <div className="w-px h-4 bg-white/20"></div>
            <span className="flex items-center gap-1">
              {getPlaybackModeIcon()}
              <span className="hidden sm:inline">{getPlaybackModeLabel()}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
