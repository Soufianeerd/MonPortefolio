"use client";

import React, { useState } from "react";
import { 
  History, 
  Trophy, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  Star,
  Info
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const historicalEditions = [
  {
    year: 2022,
    host: "Qatar",
    winner: "Argentine",
    runnerUp: "France",
    score: "3-3 (4-2 tab)",
    highlights: ["Finale légendaire", "Sacre de Messi", "Triplé de Mbappé"],
    bracket: {
      final: { team1: "Argentine", team2: "France", score: "3-3" },
      semi1: { team1: "Argentine", team2: "Croatie", score: "3-0" },
      semi2: { team1: "France", team2: "Maroc", score: "2-0" }
    }
  },
  {
    year: 2018,
    host: "Russie",
    winner: "France",
    runnerUp: "Croatie",
    score: "4-2",
    highlights: ["Deuxième étoile française", "Parcours croate héroïque", "Révélation Mbappé"],
    bracket: {
      final: { team1: "France", team2: "Croatie", score: "4-2" },
      semi1: { team1: "France", team2: "Belgique", score: "1-0" },
      semi2: { team1: "Croatie", team2: "Angleterre", score: "2-1" }
    }
  },
  {
    year: 2014,
    host: "Brésil",
    winner: "Allemagne",
    runnerUp: "Argentine",
    score: "1-0 (ap)",
    highlights: ["Le 7-1 historique", "But de Götze", "Domination allemande"],
    bracket: {
      final: { team1: "Allemagne", team2: "Argentine", score: "1-0" },
      semi1: { team1: "Allemagne", team2: "Brésil", score: "7-1" },
      semi2: { team1: "Argentine", team2: "Pays-Bas", score: "0-0 (4-2 tab)" }
    }
  },
  {
    year: 2010,
    host: "Afrique du Sud",
    winner: "Espagne",
    runnerUp: "Pays-Bas",
    score: "1-0 (ap)",
    highlights: ["Tiki-Taka espagnol", "Première en Afrique", "But d'Iniesta"],
    bracket: {
      final: { team1: "Espagne", team2: "Pays-Bas", score: "1-0" },
      semi1: { team1: "Espagne", team2: "Allemagne", score: "1-0" },
      semi2: { team1: "Pays-Bas", team2: "Uruguay", score: "3-2" }
    }
  },
  {
    year: 2006,
    host: "Allemagne",
    winner: "Italie",
    runnerUp: "France",
    score: "1-1 (5-3 tab)",
    highlights: ["Coup de tête de Zidane", "Défense italienne de fer", "Sortie de la génération dorée"],
    bracket: {
      final: { team1: "Italie", team2: "France", score: "1-1" },
      semi1: { team1: "Italie", team2: "Allemagne", score: "2-0" },
      semi2: { team1: "France", team2: "Portugal", score: "1-0" }
    }
  }
];

export default function HistoriquePage() {
  const [selectedEdition, setSelectedEdition] = useState(historicalEditions[0]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
            Archives & Épopées
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-[0.9]">
            Historique & <span className="text-blue-600 italic">Arbre.</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-xl">
            Revivez les moments forts et analysez les parcours qui ont mené au sacre suprême lors des 5 dernières éditions.
          </p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {historicalEditions.map((ed) => (
            <button
              key={ed.year}
              onClick={() => setSelectedEdition(ed)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black transition-all",
                selectedEdition.year === ed.year 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              {ed.year}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Info Card */}
        <Card className="p-8 border-none shadow-xl shadow-blue-100 bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Trophy className="w-32 h-32" />
          </div>
          
          <div className="space-y-8 relative">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Édition {selectedEdition.year}</p>
                <h2 className="text-3xl font-black text-slate-900">{selectedEdition.host}</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
                </div>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[2px] mb-2">Champion du Monde</p>
                <p className="text-4xl font-black text-blue-600 mb-1">{selectedEdition.winner}</p>
                <p className="text-sm font-bold text-blue-400/80">Face à {selectedEdition.runnerUp} ({selectedEdition.score})</p>
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Points Forts</p>
                {selectedEdition.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Bracket Visualization */}
        <Card className="xl:col-span-2 p-10 border-slate-200/60 shadow-sm bg-white/50 backdrop-blur-sm flex flex-col justify-center">
          <div className="relative">
            {/* Connection Lines (Desktop) */}
            <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
              <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M200 100 H300 V180 H400" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M200 300 H300 V220 H400" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M400 200 H600" stroke="#2563EB" strokeWidth="3" />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
              {/* Semi Finals */}
              <div className="space-y-24">
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-4">Demi-Finale 1</p>
                  <TeamNode name={selectedEdition.bracket.semi1.team1} score={selectedEdition.bracket.semi1.score.split('-')[0]} winner={selectedEdition.bracket.semi1.team1 === selectedEdition.bracket.final.team1} />
                  <TeamNode name={selectedEdition.bracket.semi1.team2} score={selectedEdition.bracket.semi1.score.split('-')[1]} />
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-4">Demi-Finale 2</p>
                  <TeamNode name={selectedEdition.bracket.semi2.team1} score={selectedEdition.bracket.semi2.score.split('-')[0]} winner={selectedEdition.bracket.semi2.team1 === selectedEdition.bracket.final.team2} />
                  <TeamNode name={selectedEdition.bracket.semi2.team2} score={selectedEdition.bracket.semi2.score.split('-')[1]} />
                </div>
              </div>

              {/* Final */}
              <div className="flex flex-col items-center">
                <div className="mb-6 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-200 animate-bounce">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-4 w-full">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[3px] text-center mb-6">Grande Finale</p>
                  <TeamNode name={selectedEdition.bracket.final.team1} score={selectedEdition.score} large winner={true} />
                  <TeamNode name={selectedEdition.bracket.final.team2} score="" large />
                </div>
              </div>

              {/* Analysis Sidebar */}
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl">
                  <Info className="w-5 h-5 text-blue-400 mb-4" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Analyse du Score</p>
                  <p className="text-sm font-medium leading-relaxed">
                    La finale de {selectedEdition.year} s&apos;est soldée par un score de {selectedEdition.score}. 
                    Cela illustre la tendance de {selectedEdition.year === 2022 ? "l'explosivité offensive" : "la rigueur tactique"} de cette période.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 p-6 rounded-3xl border border-slate-100 bg-white">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spectateurs</p>
                  <p className="text-xl font-black text-slate-900">88,966</p>
                  <p className="text-[10px] font-medium text-slate-400">Capacité record</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TeamNode({ name, score, winner = false, large = false }: { name: string, score: string, winner?: boolean, large?: boolean }) {
  return (
    <div className={cn(
      "flex items-center justify-between px-5 py-4 rounded-2xl border transition-all",
      winner ? "bg-white border-blue-600 shadow-lg shadow-blue-50 ring-2 ring-blue-500/10" : "bg-slate-50 border-slate-100",
      large ? "py-6" : "py-4"
    )}>
      <div className="flex items-center gap-3">
        {winner && <div className="w-2 h-2 rounded-full bg-blue-600" />}
        <span className={cn("font-bold text-slate-900", large ? "text-lg" : "text-sm")}>{name}</span>
      </div>
      <span className={cn("font-black text-blue-600 tabular-nums", large ? "text-xl" : "text-sm")}>{score}</span>
    </div>
  );
}
