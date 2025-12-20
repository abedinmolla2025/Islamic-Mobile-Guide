import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SplashScreen } from "@/components/SplashScreen";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Quran from "@/pages/quran";
import SurahPage from "@/pages/surah";
import Tools from "@/pages/tools";
import Duas from "@/pages/duas";
import Tasbih from "@/pages/tasbih";
import Qibla from "@/pages/qibla";
import Names from "@/pages/names";
import AsmaUlHusna from "@/pages/asma-ul-husna";

function Router() {
  return (
    <div className="pb-24">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quran" component={Quran} />
        <Route path="/surah/:number" component={SurahPage} />
        <Route path="/duas" component={Duas} />
        <Route path="/tools" component={Tools} />
        <Route path="/tasbih" component={Tasbih} />
        <Route path="/qibla" component={Qibla} />
        <Route path="/names" component={Names} />
        <Route path="/asma-ul-husna" component={AsmaUlHusna} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("hasSeenSplash", "true");
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
