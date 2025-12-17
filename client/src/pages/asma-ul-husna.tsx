import { useState } from "react";
import { Search, ArrowLeft, Star, Volume2 } from "lucide-react";
import { Link } from "wouter";
import { asmaUlHusna, type AllahName } from "@/lib/asmaUlHusna";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";

function NameOfAllahCard({ name }: { name: AllahName }) {
  return (
    <Card 
      className="p-4 hover-elevate transition-all"
      data-testid={`allah-name-${name.number}`}
    >
      <div className="flex items-start gap-4">
        {/* Number Badge */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-sm">{name.number}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="text-2xl font-arabic text-emerald-700">{name.name}</h3>
          </div>
          <p className="font-medium text-gray-800">{name.transliteration}</p>
          <p className="text-sm text-gray-600 mt-1">{name.meaning}</p>
        </div>
      </div>
    </Card>
  );
}

export default function AsmaUlHusna() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNames = asmaUlHusna.filter(name => 
    name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.name.includes(searchQuery) ||
    name.number.toString() === searchQuery
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 p-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <button 
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">99 Names of Allah</h1>
              <p className="text-white/80 text-sm">Asma ul Husna - The Beautiful Names</p>
            </div>
          </div>

          {/* Decorative Icon */}
          <div className="flex justify-center my-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Star className="w-10 h-10 text-white" />
            </div>
          </div>

          <p className="text-center text-white/90 text-sm mb-4">
            "Allah has ninety-nine names. Whoever memorizes them will enter Paradise."
          </p>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, number, or meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-white border-0 rounded-xl shadow-lg"
              data-testid="input-search-allah-names"
            />
          </div>
        </div>

        {/* Names List */}
        <div className="px-4 -mt-4">
          <div className="space-y-3">
            {filteredNames.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-white rounded-xl">
                <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No names found matching "{searchQuery}"</p>
              </div>
            ) : (
              filteredNames.map((name) => (
                <NameOfAllahCard key={name.number} name={name} />
              ))
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 mt-6 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Showing {filteredNames.length} of 99 names
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-amber-600 font-medium"
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
