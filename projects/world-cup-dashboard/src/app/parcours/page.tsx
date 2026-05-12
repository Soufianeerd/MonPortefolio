"use client";

import React, { useState, useMemo } from "react";
import { CardPremium } from "@/components/ui/CardPremium";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Swords, Calendar, Clock, Info, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Scorer {
  name: string;
  min: number;
}

interface Match {
  id: string;
  teamA: string;
  scoreA: number;
  teamB: string;
  scoreB: number;
  scorers?: Scorer[];
  penA?: number;
  penB?: number;
}

interface KnockoutEdition {
  round_16: Match[];
  quarter: Match[];
  semi: Match[];
  final: Match[];
}

const knockoutData: Record<string, KnockoutEdition> = {
  "2022": {
    "round_16": [
      { id: "22-r16-1", teamA: "Pays-Bas", scoreA: 3, teamB: "USA", scoreB: 1, scorers: [{ name: "Depay", min: 10 }, { name: "Blind", min: 45 }, { name: "Dumfries", min: 81 }, { name: "Wright", min: 76 }] },
      { id: "22-r16-2", teamA: "Argentine", scoreA: 2, teamB: "Australie", scoreB: 1, scorers: [{ name: "Messi", min: 35 }, { name: "Alvarez", min: 57 }, { name: "Goodwin", min: 77 }] },
      { id: "22-r16-3", teamA: "France", scoreA: 3, teamB: "Pologne", scoreB: 1, scorers: [{ name: "Giroud", min: 44 }, { name: "Mbappe", min: 74 }, { name: "Mbappe", min: 90 }, { name: "Lewandowski", min: 90 }] },
      { id: "22-r16-4", teamA: "Angleterre", scoreA: 3, teamB: "Sénégal", scoreB: 0, scorers: [{ name: "Henderson", min: 38 }, { name: "Kane", min: 45 }, { name: "Saka", min: 57 }] },
      { id: "22-r16-5", teamA: "Japon", scoreA: 1, teamB: "Croatie", scoreB: 1, penA: 1, penB: 3, scorers: [{ name: "Maeda", min: 43 }, { name: "Perisic", min: 55 }] },
      { id: "22-r16-6", teamA: "Brésil", scoreA: 4, teamB: "Corée du Sud", scoreB: 1, scorers: [{ name: "Vinicius", min: 7 }, { name: "Neymar", min: 13 }, { name: "Richarlison", min: 29 }, { name: "Paqueta", min: 36 }, { name: "Paik", min: 76 }] },
      { id: "22-r16-7", teamA: "Maroc", scoreA: 0, teamB: "Espagne", scoreB: 0, penA: 3, penB: 0, scorers: [] },
      { id: "22-r16-8", teamA: "Portugal", scoreA: 6, teamB: "Suisse", scoreB: 1, scorers: [{ name: "Ramos", min: 17 }, { name: "Pepe", min: 33 }, { name: "Ramos", min: 51 }, { name: "Guerreiro", min: 55 }, { name: "Ramos", min: 67 }, { name: "Leao", min: 90 }, { name: "Akanji", min: 58 }] },
    ],
    "quarter": [
      { id: "22-q1", teamA: "Pays-Bas", scoreA: 2, teamB: "Argentine", scoreB: 2, penA: 3, penB: 4, scorers: [{ name: "Weghorst", min: 83 }, { name: "Weghorst", min: 90 }, { name: "Molina", min: 35 }, { name: "Messi", min: 73 }] },
      { id: "22-q2", teamA: "Croatie", scoreA: 1, teamB: "Brésil", scoreB: 1, penA: 4, penB: 2, scorers: [{ name: "Petkovic", min: 117 }, { name: "Neymar", min: 105 }] },
      { id: "22-q3", teamA: "Angleterre", scoreA: 1, teamB: "France", scoreB: 2, scorers: [{ name: "Kane", min: 54 }, { name: "Tchouameni", min: 17 }, { name: "Giroud", min: 78 }] },
      { id: "22-q4", teamA: "Maroc", scoreA: 1, teamB: "Portugal", scoreB: 0, scorers: [{ name: "En-Nesyri", min: 42 }] },
    ],
    "semi": [
      { id: "22-s1", teamA: "Argentine", scoreA: 3, teamB: "Croatie", scoreB: 0, scorers: [{ name: "Messi", min: 34 }, { name: "Alvarez", min: 39 }, { name: "Alvarez", min: 69 }] },
      { id: "22-s2", teamA: "France", scoreA: 2, teamB: "Maroc", scoreB: 0, scorers: [{ name: "Hernandez", min: 5 }, { name: "Kolo Muani", min: 79 }] },
    ],
    "final": [
      { id: "22-f1", teamA: "Argentine", scoreA: 3, teamB: "France", scoreB: 3, penA: 4, penB: 2, scorers: [{ name: "Messi", min: 23 }, { name: "Di Maria", min: 36 }, { name: "Messi", min: 108 }, { name: "Mbappe", min: 80 }, { name: "Mbappe", min: 81 }, { name: "Mbappe", min: 118 }] },
    ]
  },
  "2018": {
    "round_16": [
      { id: "18-r16-1", teamA: "France", scoreA: 4, teamB: "Argentine", scoreB: 3, scorers: [{ name: "Griezmann", min: 13 }, { name: "Pavard", min: 57 }, { name: "Mbappe", min: 64 }, { name: "Mbappe", min: 68 }, { name: "Di Maria", min: 41 }, { name: "Mercado", min: 48 }, { name: "Aguero", min: 90 }] },
      { id: "18-r16-2", teamA: "Uruguay", scoreA: 2, teamB: "Portugal", scoreB: 1, scorers: [{ name: "Cavani", min: 7 }, { name: "Cavani", min: 62 }, { name: "Pepe", min: 55 }] },
      { id: "18-r16-3", teamA: "Espagne", scoreA: 1, teamB: "Russie", scoreB: 1, penA: 3, penB: 4, scorers: [{ name: "Ignashevich (csc)", min: 12 }, { name: "Dzyuba", min: 41 }] },
      { id: "18-r16-4", teamA: "Croatie", scoreA: 1, teamB: "Danemark", scoreB: 1, penA: 3, penB: 2, scorers: [{ name: "Mandzukic", min: 4 }, { name: "Jorgensen", min: 1 }] },
      { id: "18-r16-5", teamA: "Brésil", scoreA: 2, teamB: "Mexique", scoreB: 0, scorers: [{ name: "Neymar", min: 51 }, { name: "Firmino", min: 88 }] },
      { id: "18-r16-6", teamA: "Belgique", scoreA: 3, teamB: "Japon", scoreB: 2, scorers: [{ name: "Vertonghen", min: 69 }, { name: "Fellaini", min: 74 }, { name: "Chadli", min: 90 }, { name: "Haraguchi", min: 48 }, { name: "Inui", min: 52 }] },
      { id: "18-r16-7", teamA: "Suède", scoreA: 1, teamB: "Suisse", scoreB: 0, scorers: [{ name: "Forsberg", min: 66 }] },
      { id: "18-r16-8", teamA: "Colombie", scoreA: 1, teamB: "Angleterre", scoreB: 1, penA: 3, penB: 4, scorers: [{ name: "Mina", min: 90 }, { name: "Kane", min: 57 }] },
    ],
    "quarter": [
      { id: "18-q1", teamA: "Uruguay", scoreA: 0, teamB: "France", scoreB: 2, scorers: [{ name: "Varane", min: 40 }, { name: "Griezmann", min: 61 }] },
      { id: "18-q2", teamA: "Brésil", scoreA: 1, teamB: "Belgique", scoreB: 2, scorers: [{ name: "Renato Augusto", min: 76 }, { name: "Fernandinho (csc)", min: 13 }, { name: "De Bruyne", min: 31 }] },
      { id: "18-q3", teamA: "Suède", scoreA: 0, teamB: "Angleterre", scoreB: 2, scorers: [{ name: "Maguire", min: 30 }, { name: "Alli", min: 58 }] },
      { id: "18-q4", teamA: "Russie", scoreA: 2, teamB: "Croatie", scoreB: 2, penA: 3, penB: 4, scorers: [{ name: "Cheryshev", min: 31 }, { name: "Fernandes", min: 115 }, { name: "Kramaric", min: 39 }, { name: "Vida", min: 101 }] },
    ],
    "semi": [
      { id: "18-s1", teamA: "France", scoreA: 1, teamB: "Belgique", scoreB: 0, scorers: [{ name: "Umtiti", min: 51 }] },
      { id: "18-s2", teamA: "Croatie", scoreA: 2, teamB: "Angleterre", scoreB: 1, scorers: [{ name: "Perisic", min: 68 }, { name: "Mandzukic", min: 109 }, { name: "Trippier", min: 5 }] },
    ],
    "final": [
      { id: "18-f1", teamA: "France", scoreA: 4, teamB: "Croatie", scoreB: 2, scorers: [{ name: "Mandzukic (csc)", min: 18 }, { name: "Griezmann", min: 38 }, { name: "Pogba", min: 59 }, { name: "Mbappe", min: 65 }, { name: "Perisic", min: 28 }, { name: "Mandzukic", min: 69 }] },
    ]
  }
};

export default function ParcoursPage() {
  const [selectedYear, setSelectedYear] = useState("2022");

  const currentKnockout = useMemo(() => {
    return knockoutData[selectedYear] || knockoutData["2022"];
  }, [selectedYear]);

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-16 animate-in fade-in duration-700 px-6 bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-wc-red animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[5px] text-slate-400">Phase Éliminatoire</span>
           </div>
           <h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
             Tableau <br/><span className="text-slate-200">Final.</span>
           </h2>
        </div>
        
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">ÉDITION HISTORIQUE</span>
          <div className="bg-white px-8 py-4 rounded-full border border-slate-100 shadow-2xl shadow-slate-200/50 flex items-center gap-4 transition-all hover:border-slate-200">
            <Calendar className="w-4 h-4 text-wc-blue" />
            <Select value={selectedYear} onValueChange={(val) => val && setSelectedYear(val)}>
              <SelectTrigger className="w-[120px] border-none focus:ring-0 font-black text-lg p-0 h-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-100 rounded-2xl">
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Bracket View */}
      <div className="relative overflow-x-auto pb-20 custom-scrollbar">
        <div className="flex gap-20 min-w-[1300px] p-4 relative">
          {/* R16 */}
          <div className="flex-1 space-y-12">
            <StageHeader title="8èmes" />
              <div className="space-y-8">
                {currentKnockout.round_16.map((m: Match) => <MatchItem key={m.id} match={m} />)}
              </div>
            </div>
  
            {/* Quarters */}
            <div className="flex-1 space-y-12 pt-32">
              <StageHeader title="Quarts" />
              <div className="space-y-40">
                 {currentKnockout.quarter.map((m: Match) => <MatchItem key={m.id} match={m} />)}
              </div>
            </div>
  
            {/* Semis */}
            <div className="flex-1 space-y-12 pt-64">
              <StageHeader title="Demis" />
              <div className="space-y-[320px]">
                 {currentKnockout.semi.map((m: Match) => <MatchItem key={m.id} match={m} />)}
              </div>
            </div>
  
            {/* Final */}
            <div className="flex-1 space-y-12 pt-[400px]">
              <StageHeader title="Finale" highlight />
              <div className="scale-150 origin-top">
                 {currentKnockout.final.map((m: Match) => <MatchItem key={m.id} match={m} highlight />)}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function StageHeader({ title, highlight }: { title: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div className={cn("h-1.5 w-10 rounded-full", highlight ? "bg-wc-red" : "bg-slate-900")} />
      <span className="text-[12px] font-black uppercase tracking-[6px] text-slate-900">{title}</span>
    </div>
  );
}

function MatchItem({ match, highlight }: { match: Match; highlight?: boolean }) {
  const { teamA, scoreA, teamB, scoreB, scorers, penA, penB } = match;

  return (
    <Dialog>
      <DialogTrigger 
        className={cn(
          "w-full text-left bg-white p-6 rounded-[1.5rem] border transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 group relative cursor-pointer outline-none",
          highlight ? "border-wc-blue border-2 shadow-2xl shadow-wc-blue/10" : "border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        )}
      >
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span className={cn("font-black text-sm tracking-tighter uppercase italic", scoreA >= scoreB ? "text-slate-900" : "text-slate-300")}>{teamA}</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tabular-nums">{scoreA}</span>
              {penA !== undefined && <span className="text-[9px] text-slate-400 font-bold">({penA})</span>}
            </div>
          </div>
          <div className="h-[1px] bg-slate-50 group-hover:bg-slate-100" />
          <div className="flex justify-between items-center">
            <span className={cn("font-black text-sm tracking-tighter uppercase italic", scoreB >= scoreA ? "text-slate-900" : "text-slate-300")}>{teamB}</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tabular-nums">{scoreB}</span>
              {penB !== undefined && <span className="text-[9px] text-slate-400 font-bold">({penB})</span>}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl rotate-12 group-hover:rotate-0">
           <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[450px] border-none rounded-[2.5rem] p-0 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] bg-white">
        <DialogHeader className="bg-slate-900 p-12 text-white text-center space-y-8 relative">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
           <p className="text-[10px] font-black uppercase tracking-[8px] text-slate-500 relative z-10">RÉSULTAT OFFICIEL</p>
           <DialogTitle className="flex justify-between items-center px-2 relative z-10">
              <div className="flex-1"><span className="font-black text-2xl italic tracking-tighter">{teamA}</span></div>
              <div className="px-8 py-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10">
                <span className="text-4xl font-black tabular-nums">{scoreA} - {scoreB}</span>
              </div>
              <div className="flex-1"><span className="font-black text-2xl italic tracking-tighter">{teamB}</span></div>
           </DialogTitle>
        </DialogHeader>
        <div className="p-12 space-y-10 bg-white">
           <div className="space-y-6">
              <h5 className="text-[11px] font-black uppercase tracking-[4px] text-slate-900 flex items-center gap-3">
                <Clock className="w-4 h-4 text-wc-red" /> Chronologie des Buts
              </h5>
              <div className="space-y-4">
                 {scorers && scorers.map((s: Scorer, i: number) => (
                   <div key={i} className="flex justify-between items-center text-sm font-black text-slate-700 p-4 rounded-2xl bg-slate-50 border border-slate-50 hover:border-slate-200 transition-all">
                     <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-wc-green" />
                       <span>{s.name}</span>
                     </div>
                     <span className="text-wc-red italic">{s.min}&apos;</span>
                   </div>
                 ))}
                 {(!scorers || scorers.length === 0) && <p className="text-sm text-slate-400 italic text-center py-6">Pas de buts dans le temps réglementaire.</p>}
              </div>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}