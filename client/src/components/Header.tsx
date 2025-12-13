import { Bell, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-6 px-6">
      <div className="flex flex-col">
        <span className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Islamic Companion</span>
        <h1 className="text-2xl font-bold font-serif text-foreground">Noor</h1>
      </div>
      <div className="flex gap-4">
        <button className="p-2 rounded-full hover:bg-black/5 transition-colors">
          <Bell className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </header>
  );
}
