import { Trophy } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] text-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-8 shadow-inner">
        <Trophy className="w-10 h-10 text-slate-300" />
      </div>
      <h1 className="text-9xl font-black text-slate-900 tracking-tighter leading-none mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-6 uppercase tracking-widest">Page Non Trouvée</h2>
      <p className="text-slate-500 font-medium max-w-md mb-10">
        Le stade est vide. La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/" className="px-8 py-4 bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
        Retour au Terrain
      </Link>
    </div>
  );
}
