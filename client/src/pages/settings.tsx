import { useState } from "react";
import { ArrowLeft, Bell, Moon, Globe, Info } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UserSettings {
  notificationsEnabled: boolean;
  darkMode: boolean;
  language: string;
  prayerNotifications: boolean;
  volume: number;
}

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem("userSettings");
    return saved ? JSON.parse(saved) : {
      notificationsEnabled: true,
      darkMode: false,
      language: "en",
      prayerNotifications: true,
      volume: 70,
    };
  });

  const updateSetting = (key: keyof UserSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("userSettings", JSON.stringify(newSettings));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {/* Notifications */}
        <Card className="p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Notifications</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Prayer time alerts</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting("prayerNotifications", !settings.prayerNotifications)}
              className={cn(
                "relative inline-flex h-7 w-12 items-center rounded-full transition-colors",
                settings.prayerNotifications ? "bg-green-600" : "bg-slate-300 dark:bg-slate-600"
              )}
              data-testid="toggle-prayer-notifications"
            >
              <span
                className={cn(
                  "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
                  settings.prayerNotifications ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </Card>

        {/* Dark Mode */}
        <Card className="p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Easier on the eyes</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting("darkMode", !settings.darkMode)}
              className={cn(
                "relative inline-flex h-7 w-12 items-center rounded-full transition-colors",
                settings.darkMode ? "bg-green-600" : "bg-slate-300 dark:bg-slate-600"
              )}
              data-testid="toggle-dark-mode"
            >
              <span
                className={cn(
                  "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
                  settings.darkMode ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </Card>

        {/* Language */}
        <Card className="p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Language</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Choose your preferred language</p>
              </div>
            </div>
            <select
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 text-sm"
              data-testid="select-language"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="bn">বাংলা</option>
              <option value="ur">اردو</option>
            </select>
          </div>
        </Card>

        {/* Volume Control */}
        <Card className="p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur">
          <div className="space-y-3">
            <p className="font-semibold text-slate-900 dark:text-white">Audio Volume</p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.volume}
                onChange={(e) => updateSetting("volume", parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                data-testid="slider-volume"
              />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 w-12 text-right">
                {settings.volume}%
              </span>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800 border border-emerald-200 dark:border-slate-700">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-900 dark:text-white">Noor - Islamic Companion</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Version 1.0.0</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Your daily companion for Islamic knowledge, prayer times, and spiritual growth.
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                May Allah bless this application and guide us all. Ameen.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
