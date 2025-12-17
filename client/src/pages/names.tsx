import { useState, useMemo } from "react";
import { Search, User, Heart, ArrowLeft, Baby, Globe } from "lucide-react";
import { Link } from "wouter";
import { boyNames, girlNames, searchNames, getMeaning, languages, type IslamicName, type Language } from "@/lib/islamicNames";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNav from "@/components/BottomNav";

function NameCard({ name, gender, language }: { name: IslamicName; gender: 'boy' | 'girl'; language: Language }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const meaning = getMeaning(name, language);
  
  return (
    <Card 
      className="p-4 hover-elevate transition-all"
      data-testid={`name-card-${name.name.toLowerCase()}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-gray-800">{name.name}</h3>
            <span className="text-lg text-emerald-600 font-arabic">{name.arabic}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{meaning}</p>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          data-testid={`button-favorite-${name.name.toLowerCase()}`}
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
    </Card>
  );
}

export default function Names() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'boys' | 'girls'>("boys");
  const [language, setLanguage] = useState<Language>("en");

  const filteredNames = useMemo(() => {
    const gender = activeTab === 'boys' ? 'boy' : 'girl';
    return searchNames(searchQuery, gender, language);
  }, [searchQuery, activeTab, language]);

  const currentLanguage = languages.find(l => l.code === language);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 pb-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <button 
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  data-testid="button-back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Islamic Names</h1>
                <p className="text-white/80 text-sm">Find beautiful names for your baby</p>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="mb-4">
            <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
              <SelectTrigger 
                className="w-full bg-white/20 border-white/30 text-white rounded-xl"
                data-testid="select-language"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <SelectValue placeholder="Select language" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} data-testid={`language-${lang.code}`}>
                    <span className="flex items-center gap-2">
                      {lang.name} <span className="text-muted-foreground">({lang.nativeName})</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search names or meanings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-white border-0 rounded-xl shadow-lg"
              data-testid="input-search-names"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 -mt-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'boys' | 'girls')}>
            <TabsList className="w-full bg-white shadow-sm rounded-xl p-1 h-auto">
              <TabsTrigger 
                value="boys" 
                className="flex-1 py-3 rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                data-testid="tab-boys"
              >
                <Baby className="w-4 h-4 mr-2" />
                Boys ({boyNames.length})
              </TabsTrigger>
              <TabsTrigger 
                value="girls" 
                className="flex-1 py-3 rounded-lg data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                data-testid="tab-girls"
              >
                <Baby className="w-4 h-4 mr-2" />
                Girls ({girlNames.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="boys" className="mt-4">
              <div className="space-y-3">
                {filteredNames.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No names found matching "{searchQuery}"</p>
                  </div>
                ) : (
                  filteredNames.map((name, idx) => (
                    <NameCard key={idx} name={name} gender="boy" language={language} />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="girls" className="mt-4">
              <div className="space-y-3">
                {filteredNames.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No names found matching "{searchQuery}"</p>
                  </div>
                ) : (
                  filteredNames.map((name, idx) => (
                    <NameCard key={idx} name={name} gender="girl" language={language} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Stats */}
        <div className="px-4 mt-6 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2 text-sm flex-wrap">
              <span className="text-gray-600">
                Showing {filteredNames.length} {activeTab === 'boys' ? 'boy' : 'girl'} names in {currentLanguage?.name}
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-emerald-600 font-medium"
                  data-testid="button-clear-search"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
