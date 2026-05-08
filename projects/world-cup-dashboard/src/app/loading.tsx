import { Trophy } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center mb-6 animate-pulse shadow-lg shadow-blue-100/50">
        <Trophy className="w-8 h-8 text-blue-600 animate-bounce" />
      </div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-[4px] animate-pulse">Chargement des données...</p>
    </div>
  );
}
