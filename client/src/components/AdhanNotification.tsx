import { useEffect, useState } from "react";
import { Bell, BellOff, Volume2, VolumeX, Vibrate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  notifyAzanTime, 
  getStoredAzanSettings, 
  saveAzanSettings, 
  requestNotificationPermission,
  type AzanNotificationSettings 
} from "@/lib/azan";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface AdhanNotificationProps {
  prayerTime?: string;
  prayerName?: string;
  enabled?: boolean;
}

export function AdhanNotification({ prayerTime, prayerName, enabled = true }: AdhanNotificationProps) {
  const [settings, setSettings] = useState<AzanNotificationSettings>(() => {
    try {
      return getStoredAzanSettings();
    } catch {
      return { enabled: true, soundEnabled: true, vibrationEnabled: true, volume: 0.8 };
    }
  });
  const [notificationGranted, setNotificationGranted] = useState(false);

  useEffect(() => {
    // Check notification permission
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        setNotificationGranted(Notification.permission === 'granted');
      }
    } catch (error) {
      console.error('Error checking notification permission:', error);
    }
  }, []);

  useEffect(() => {
    if (!enabled || !prayerTime || !prayerName) return;

    // Check every 10 seconds if it's prayer time
    const checkInterval = setInterval(async () => {
      try {
        const timeParts = prayerTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!timeParts) return;

        let hours = parseInt(timeParts[1]);
        const minutes = parseInt(timeParts[2]);
        const period = timeParts[3].toUpperCase();

        if (period === 'PM' && hours !== 12) {
          hours += 12;
        } else if (period === 'AM' && hours === 12) {
          hours = 0;
        }

        const now = new Date();
        const prayerDateTime = new Date();
        prayerDateTime.setHours(hours, minutes, 0, 0);

        // Check if within 1 minute window
        const diffMs = Math.abs(now.getTime() - prayerDateTime.getTime());
        const diffMinutes = diffMs / 1000 / 60;

        if (diffMinutes <= 1 && diffMinutes >= 0) {
          await notifyAzanTime(prayerName, settings);
          // Clear interval after notification
          clearInterval(checkInterval);
        }
      } catch (error) {
        console.error('Error checking prayer time:', error);
      }
    }, 10000);

    return () => clearInterval(checkInterval);
  }, [prayerTime, prayerName, settings, enabled]);

  const handleSettingChange = (key: keyof AzanNotificationSettings, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveAzanSettings(updated);
  };

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    setNotificationGranted(granted);
  };

  if (!enabled) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-[#D4AF37]"
          data-testid="button-azan-settings"
          title="Azan Notification Settings"
        >
          {settings.enabled ? (
            <Bell className="w-5 h-5" />
          ) : (
            <BellOff className="w-5 h-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 backdrop-blur-md" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Azan Notifications</h3>

          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80">Enable Azan</span>
            <button
              onClick={() => handleSettingChange('enabled', !settings.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enabled ? 'bg-[#D4AF37]' : 'bg-white/20'
              }`}
              data-testid="toggle-azan-enabled"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.enabled && (
            <>
              {/* Sound */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {settings.soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-white/70" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-white/70" />
                  )}
                  <span className="text-sm text-white/80">Sound</span>
                </div>
                <button
                  onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.soundEnabled ? 'bg-[#D4AF37]' : 'bg-white/20'
                  }`}
                  data-testid="toggle-azan-sound"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Volume Control */}
              {settings.soundEnabled && (
                <div className="space-y-2">
                  <label className="text-xs text-white/70">Volume: {Math.round(settings.volume * 100)}%</label>
                  <Slider
                    value={[settings.volume]}
                    max={1}
                    step={0.1}
                    onValueChange={(value) => handleSettingChange('volume', value[0])}
                    data-testid="slider-azan-volume"
                  />
                </div>
              )}

              {/* Vibration */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Vibrate className="w-4 h-4 text-white/70" />
                  <span className="text-sm text-white/80">Vibration</span>
                </div>
                <button
                  onClick={() => handleSettingChange('vibrationEnabled', !settings.vibrationEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.vibrationEnabled ? 'bg-[#D4AF37]' : 'bg-white/20'
                  }`}
                  data-testid="toggle-azan-vibration"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.vibrationEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Notification Permission */}
              {!notificationGranted && (
                <Button
                  onClick={handleRequestPermission}
                  variant="outline"
                  size="sm"
                  className="w-full text-[#D4AF37] border-[#D4AF37]/50"
                  data-testid="button-request-notification"
                >
                  Enable Notifications
                </Button>
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
