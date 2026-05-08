"use client";

import React, { useMemo } from "react";
import { teams } from "@/data/db";
import { Users, MapPin, Trophy } from "lucide-react";

export default function GroupesPage() {
  const groups = useMemo(() => {
    const grouped = teams.reduce((acc, team) => {
      const g = team.group;
      if (!acc[g]) acc[g] = [];
      acc[g].push(team);
      return acc;
    }, {} as Record<string, typeof teams>);

    // Sort by group letter
    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([group, teamList]) => ({
        name: `Groupe ${group}`,
        teams: teamList.sort((a, b) => a.rankFIFA - b.rankFIFA),
      }));
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-10 animate-in fade-in duration-700 px-6">
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
          <Trophy className="w-3 h-3" /> Format Inédit 48 Équipes
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Phase de <span className="text-blue-600 italic">Groupes.</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Découvrez la répartition officielle des 48 équipes qualifiées pour la Coupe du Monde 2026, réparties en 12 groupes de 4.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map((group) => (
          <div key={group.name} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between group-hover:bg-blue-600 transition-colors duration-300">
              <h2 className="text-lg font-black text-slate-900 group-hover:text-white transition-colors">{group.name}</h2>
            </div>
            <div className="p-2">
              {group.teams.map((team, idx) => (
                <div key={team.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-sm font-bold text-slate-300">{idx + 1}</span>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800 leading-none">{team.name}</p>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{team.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rank</p>
                    <p className="text-xs font-black text-blue-600 tabular-nums">#{team.rankFIFA}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
