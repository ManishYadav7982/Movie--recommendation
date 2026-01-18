import React from "react";
import { PlayCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="space-y-6 text-center animate-fade-in relative z-10">
      {/* AI Badge */}
      <div className="inline-flex items-center justify-center p-2 px-4 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
        <PlayCircle className="w-4 h-4 text-yellow-400 mr-2" />
        <span className="text-yellow-400 font-bold uppercase text-[10px] tracking-widest">
          AI-Powered Discovery
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          MovieFinder
        </span>
      </h1>

      {/* Description */}
      <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium">
        Discover your next cinematic obsession.
      </p>
    </header>
  );
}