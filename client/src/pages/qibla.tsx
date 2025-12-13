import { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import { MapPin, RefreshCw, Navigation } from "lucide-react";
import { storage } from "@/lib/storage";
import { calculateQiblaDirection } from "@/lib/qibla";
import { getUserLocation } from "@/lib/prayerTimes";
import { cn } from "@/lib/utils";

export default function Qibla() {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [location, setLocation] = useState<{ city: string; latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    initializeQibla();
    setupCompass();
  }, []);

  const initializeQibla = async () => {
    setLoading(true);
    let savedLocation = storage.getUserLocation();
    
    if (!savedLocation) {
      const userLocation = await getUserLocation();
      if (userLocation) {
        savedLocation = userLocation;
        storage.setUserLocation(userLocation);
      } else {
        savedLocation = { latitude: 23.8103, longitude: 90.4125, city: 'Dhaka' };
      }
    }

    setLocation(savedLocation);
    const direction = calculateQiblaDirection(savedLocation.latitude, savedLocation.longitude);
    setQiblaDirection(direction);
    storage.setQiblaDirection(direction);
    setLoading(false);
  };

  const setupCompass = () => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      let heading = 0;
      
      if ('webkitCompassHeading' in event) {
        heading = (event as any).webkitCompassHeading;
      } else if (event.alpha !== null) {
        heading = 360 - event.alpha;
      }
      
      setDeviceHeading(heading);
    };

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          } else {
            setPermissionDenied(true);
          }
        } catch (error) {
          setPermissionDenied(true);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  };

  const compassRotation = qiblaDirection !== null ? qiblaDirection - deviceHeading : 0;
  const isAligned = Math.abs(compassRotation % 360) < 10 || Math.abs(compassRotation % 360) > 350;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d4a3a] via-[#0f5245] to-[#0a3d30] pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Qibla Direction</h1>
          <button 
            onClick={initializeQibla}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            data-testid="button-refresh-qibla"
          >
            <RefreshCw className={cn("w-5 h-5 text-white", loading && "animate-spin")} />
          </button>
        </div>

        {location && (
          <div className="flex items-center justify-center gap-2 text-white/70 mb-8">
            <MapPin className="w-4 h-4" />
            <span>{location.city}</span>
          </div>
        )}

        <div className="relative flex items-center justify-center mb-8">
          <div className="relative w-72 h-72">
            <div 
              className={cn(
                "absolute inset-0 rounded-full border-4 transition-colors duration-300",
                isAligned ? "border-[#D4AF37]" : "border-white/20"
              )}
            />
            
            <div className="absolute inset-2 rounded-full border border-white/10" />
            <div className="absolute inset-6 rounded-full border border-white/5" />
            
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-bold">N</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50">S</div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">W</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50">E</div>
            
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
              style={{ transform: `rotate(${compassRotation}deg)` }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-8">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl mb-1">🕋</div>
                    <span className="text-[10px] text-white/70 uppercase tracking-wider">Kaaba</span>
                  </div>
                </div>
                
                <div className="w-1 h-24 bg-gradient-to-t from-transparent via-[#D4AF37]/50 to-[#D4AF37] rounded-full" />
              </div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#D4AF37] rounded-full shadow-lg" />
            </div>
          </div>
        </div>

        {isAligned && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-full">
              <Navigation className="w-4 h-4 fill-current" />
              <span className="font-medium">Facing Qibla</span>
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <div className="mb-4">
            <span className="text-white/60 text-sm uppercase tracking-wider">Qibla Direction</span>
          </div>
          <div className="text-5xl font-bold text-white mb-2">
            {qiblaDirection !== null ? `${Math.round(qiblaDirection)}°` : '--'}
          </div>
          <p className="text-white/60 text-sm">from North</p>
        </div>

        {permissionDenied && (
          <div className="mt-6 bg-red-500/20 text-red-200 p-4 rounded-xl text-center text-sm">
            Please enable compass/motion sensors in your device settings for accurate direction.
          </div>
        )}

        <div className="mt-6 text-center text-white/50 text-sm">
          <p>Point your phone towards the Qibla direction</p>
          <p className="mt-1">Hold your phone flat and rotate until aligned</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
