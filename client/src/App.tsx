import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Quran from "@/pages/quran";
import SurahPage from "@/pages/surah";
import Tools from "@/pages/tools";
import Duas from "@/pages/duas";
import Tasbih from "@/pages/tasbih";
import Qibla from "@/pages/qibla";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quran" component={Quran} />
      <Route path="/surah/:number" component={SurahPage} />
      <Route path="/duas" component={Duas} />
      <Route path="/tools" component={Tools} />
      <Route path="/tasbih" component={Tasbih} />
      <Route path="/qibla" component={Qibla} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
