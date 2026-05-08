"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_FIXTURES = [
  { id: 1, date: "2026-06-11", time: "15:00", teamA: "Mexique", teamB: "Pologne", venue: "Estadio Azteca, Mexico City", status: "scheduled", group: "A" },
  { id: 2, date: "2026-06-12", time: "18:00", teamA: "États-Unis", teamB: "Pays de Galles", venue: "SoFi Stadium, Los Angeles", status: "scheduled", group: "B" },
  { id: 3, date: "2026-06-12", time: "21:00", teamA: "Canada", teamB: "Japon", venue: "BMO Field, Toronto", status: "scheduled", group: "C" },
  { id: 4, date: "2026-06-13", time: "14:00", teamA: "Argentine", teamB: "Arabie Saoudite", venue: "MetLife Stadium, New York/NJ", status: "scheduled", group: "D" },
  { id: 5, date: "2026-06-13", time: "17:00", teamA: "France", teamB: "Australie", venue: "Mercedes-Benz Stadium, Atlanta", status: "scheduled", group: "E" },
  { id: 6, date: "2026-06-14", time: "16:00", teamA: "Brésil", teamB: "Serbie", venue: "Hard Rock Stadium, Miami", status: "scheduled", group: "G" },
];

export default function CalendrierPage() {
  const [activeTab, setActiveTab] = useState<"groupes" | "elimination">("groupes");

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-10 animate-in fade-in duration-700 px-6">
      <header className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
          <Calendar className="w-3 h-3" /> Programme Officiel
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Calendrier des <span className="text-blue-600 italic">Matchs.</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Retrouvez l&apos;agenda complet des rencontres de la Coupe du Monde 2026 (Heure Locale estimée).
        </p>
      </header>

      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("groupes")}
          className={cn(
            "pb-4 px-2 text-sm font-bold transition-all border-b-2",
            activeTab === "groupes" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
          )}
        >
          Phase de Groupes
        </button>
        <button
          onClick={() => setActiveTab("elimination")}
          className={cn(
            "pb-4 px-2 text-sm font-bold transition-all border-b-2",
            activeTab === "elimination" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
          )}
        >
          Phase Éliminatoire
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === "groupes" ? (
          MOCK_FIXTURES.map((fixture) => (
            <div key={fixture.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all group">
              <div className="flex items-center gap-8 min-w-[200px]">
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase">{new Date(fixture.date).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  <p className="text-2xl font-black text-slate-900">{fixture.time}</p>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Grp {fixture.group}</p>
              </div>

              <div className="flex-1 flex items-center justify-center gap-6 w-full">
                <span className="flex-1 text-right text-xl font-bold text-slate-800">{fixture.teamA}</span>
                <span className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-black text-slate-400">VS</span>
                <span className="flex-1 text-left text-xl font-bold text-slate-800">{fixture.teamB}</span>
              </div>

              <div className="min-w-[200px] text-right space-y-1 hidden md:block">
                <p className="text-xs font-bold text-slate-500 flex items-center justify-end gap-1"><MapPin className="w-3 h-3" /> {fixture.venue.split(",")[0]}</p>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{fixture.venue.split(",")[1]}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-3xl border-dashed border-2 border-slate-200">
             <Clock className="w-12 h-12 text-slate-300 mb-4 mx-auto" />
             <p className="text-slate-500 font-bold text-lg">Calendrier non défini</p>
             <p className="text-slate-400 text-sm mt-2">Les affiches de la phase à élimination directe seront connues à l&apos;issue des groupes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
