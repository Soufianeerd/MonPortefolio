"use client";

import React from "react";
import { CardPremium } from "@/components/ui/CardPremium";
import { Trophy, Users, Columns, ArrowRight, PlayCircle, Info } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-20 py-20 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="space-y-8 text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-[3px]">
          <PlayCircle className="w-3.5 h-3.5" /> Guide d&apos;Exploration
        </div>
        <h1 className="text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
          FIFA <br />
          <span className="text-slate-300">ARCHIVES.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Une plateforme épurée dédiée à l&apos;analyse des grandes épopées de la Coupe du Monde. Comprenez chaque édition à travers ses parcours, ses effectifs et ses statistiques.
        </p>
      </section>

      {/* Modules Explanation */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: "Parcours",
            desc: "Visualisez le chemin critique des nations depuis les 8èmes de finale jusqu'à la consécration.",
            href: "/parcours",
            icon: Trophy,
            color: "bg-wc-blue"
          },
          {
            title: "Effectifs",
            desc: "Plongez dans les compositions officielles et identifiez l'influence des clubs mondiaux.",
            href: "/equipes",
            icon: Users,
            color: "bg-wc-red"
          },
          {
            title: "Analyse",
            desc: "Comparez les cycles historiques et l'évolution de la domination des championnats.",
            href: "/comparaison",
            icon: Columns,
            color: "bg-wc-green"
          }
        ].map((module) => (
          <div key={module.title} className="group relative">
            <div className={cn("absolute -top-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12", module.color)}>
              <module.icon className="w-6 h-6" />
            </div>
            <CardPremium title={module.title} subtitle="Module">
              <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">{module.desc}</p>
              <Link href={module.href} className="inline-flex items-center gap-3 text-slate-900 font-black text-xs group/btn">
                OUVRIR LE MODULE <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
              </Link>
            </CardPremium>
          </div>
        ))}
      </section>

      {/* Interactivity Intuition */}
      <section className="bg-slate-900 text-white rounded-[3rem] p-16 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-2 multicolor-strip" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-5xl font-black tracking-tight leading-tight">
              Une expérience <br />
              <span className="text-slate-500">interactive.</span>
            </h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "SÉLECTION", text: "Choisissez une édition via le menu déroulant." },
                { step: "02", title: "EXPLORATION", text: "Le contenu s'adapte instantanément à l'année choisie." },
                { step: "03", title: "DÉTAILS", text: "Cliquez sur les éléments pour révéler les statistiques précises." }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <span className="text-wc-yellow font-black text-xl italic">{item.step}</span>
                  <div className="space-y-1">
                    <h4 className="font-black text-sm tracking-widest">{item.title}</h4>
                    <p className="text-sm text-slate-400 font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-wc-blue/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative border border-white/10 rounded-3xl p-10 bg-white/5 backdrop-blur-xl">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-2 h-2 rounded-full bg-wc-red animate-ping" />
                 <span className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">Système Interactif</span>
               </div>
               <div className="space-y-4">
                 <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                 <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                 <div className="h-24 w-full bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center">
                   <Trophy className="w-10 h-10 text-white/20" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="pt-20 border-t border-slate-100 flex flex-col items-center gap-6 text-center">
        <Info className="w-8 h-8 text-slate-200" />
        <p className="text-sm text-slate-400 max-w-lg leading-relaxed font-medium">
          Ce dashboard est conçu pour offrir une lecture claire et impartiale des données sportives historiques. Chaque module est conçu pour être autosuffisant et intuitif.
        </p>
      </footer>
    </div>
  );
}

function cn(...inputs: (string | boolean | undefined | null | number)[]) {
  return inputs.filter(Boolean).join(" ");
}
