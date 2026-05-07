"use client";

import React, { useState, useMemo } from "react";
import data from "@/data/world_cup_starting_11s_1998_2026.json";
import { CardPremium } from "@/components/ui/CardPremium";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Scale, TrendingUp, Trophy, HelpCircle } from "lucide-react";

const PL_CLUBS = ["Manchester City", "Manchester United", "Liverpool", "Chelsea", "Arsenal", "Tottenham", "Newcastle United", "Everton", "Aston Villa", "West Ham", "Leicester City", "Wolves", "Brighton", "Southampton", "Newcastle"];
const LL_CLUBS = ["Real Madrid", "Barcelona", "FC Barcelone", "Atletico Madrid", "Sevilla", "Siviglia", "Villarreal", "Valencia", "Real Sociedad", "Athletic Bilbao", "Real Betis", "Celta Vigo", "Espanyol", "Malaga", "Real Zaragoza", "Deportivo La Coruña"];

const COLORS = ["#0047AB", "#E30613", "#009639", "#FFD700", "#FF8C00", "#8B008B", "#20B2AA", "#FF1493"];

export default function ComparaisonPage() {
  const [yearA, setYearA] = useState<string>("1998");
  const [yearB, setYearB] = useState<string>("2022");

  const years = useMemo(() => data.world_cup_editions.map((e) => e.year.toString()), []);

  const getStats = (year: string) => {
    const edition = data.world_cup_editions.find((e) => e.year.toString() === year);
    if (!edition) return { clubData: [], plCount: 0, llCount: 0 };
    const allPlayers = edition.teams.flatMap((t) => t.starting_11);
    const clubCounts: Record<string, number> = {};
    let plCount = 0;
    let llCount = 0;
    allPlayers.forEach((p) => {
      clubCounts[p.club] = (clubCounts[p.club] || 0) + 1;
      if (PL_CLUBS.some(c => p.club.includes(c))) plCount++;
      if (LL_CLUBS.some(c => p.club.includes(c))) llCount++;
    });
    const clubData = Object.entries(clubCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
    return { clubData, plCount, llCount };
  };

  const statsA = useMemo(() => getStats(yearA), [yearA]);
  const statsB = useMemo(() => getStats(yearB), [yearB]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Analyse Comparative</h2>
          <p className="text-slate-500 font-medium">Comparez l'évolution tactique et l'influence des clubs entre deux éditions.</p>
        </div>

        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <Select value={yearA} onValueChange={(val) => val && setYearA(val)}>
            <SelectTrigger className="w-[110px] border-none focus:ring-0 font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <Scale className="w-4 h-4 text-slate-400" />
          </div>
          <Select value={yearB} onValueChange={(val) => val && setYearB(val)}>
            <SelectTrigger className="w-[110px] border-none focus:ring-0 font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-wc-green/5 border border-wc-green/10 p-4 rounded-xl flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-wc-green text-white flex items-center justify-center shrink-0">
          <HelpCircle className="w-4 h-4" />
        </div>
        <p className="text-sm text-slate-600">
          <strong>Comment comparer ?</strong> Sélectionnez deux années différentes. Les graphiques montrent quels clubs fournissaient le plus de titulaires, révélant les cycles de domination des championnats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Edition A */}
        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <CardPremium title="Premier League" subtitle={yearA} className="border-t-4 border-t-wc-blue">
                <span className="text-4xl font-black text-slate-900">{statsA.plCount}</span>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Titulaires</p>
              </CardPremium>
              <CardPremium title="La Liga" subtitle={yearA} className="border-t-4 border-t-wc-red">
                <span className="text-4xl font-black text-slate-900">{statsA.llCount}</span>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Titulaires</p>
              </CardPremium>
           </div>
           <CardPremium title={`Clubs Dominants (${yearA})`} className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statsA.clubData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {statsA.clubData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
           </CardPremium>
        </div>

        {/* Edition B */}
        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <CardPremium title="Premier League" subtitle={yearB} className="border-t-4 border-t-wc-blue">
                <span className="text-4xl font-black text-slate-900">{statsB.plCount}</span>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Titulaires</p>
              </CardPremium>
              <CardPremium title="La Liga" subtitle={yearB} className="border-t-4 border-t-wc-red">
                <span className="text-4xl font-black text-slate-900">{statsB.llCount}</span>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Titulaires</p>
              </CardPremium>
           </div>
           <CardPremium title={`Clubs Dominants (${yearB})`} className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statsB.clubData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {statsB.clubData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
           </CardPremium>
        </div>
      </div>
    </div>
  );
}
