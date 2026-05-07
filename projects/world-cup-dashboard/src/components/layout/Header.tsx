"use client";

import React from "react";
import { Search, Bell, UserCircle } from "lucide-react";

export function Header() {
  return (
    <header className="h-20 border-bottom border-white/5 bg-background/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-4 py-2 rounded-xl w-96">
        <Search className="w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Rechercher une édition, un joueur..." 
          className="bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500 w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors group">
          <Bell className="w-5 h-5 text-slate-400 group-hover:text-white" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-fifa-gold rounded-full border-2 border-background" />
        </button>
        
        <div className="h-8 w-[1px] bg-white/10" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-white">Analyste FIFA</p>
            <p className="text-[10px] text-fifa-gold font-medium uppercase tracking-wider">Compte Certifié</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <UserCircle className="w-8 h-8 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
