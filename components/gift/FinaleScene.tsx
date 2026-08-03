"use client";

import React from "react";
import { giftConfig } from "@/data/gift-config";
import { FloatingHearts } from "./FloatingHearts";
import { RotateCcw, Heart } from "lucide-react";

interface FinaleSceneProps {
  onReplay: () => void;
}

export const FinaleScene: React.FC<FinaleSceneProps> = ({ onReplay }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100svh] px-4 text-center select-none bg-gradient-to-b from-wine-950 via-wine-900 to-wine-950 text-roseGold-100 relative overflow-hidden animate-fade-in z-20">
      <FloatingHearts />

      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 rounded-full bg-rose-500/20 blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Decorative top icon */}
      <div className="mb-6 flex items-center justify-center text-roseGold-300">
        <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
      </div>

      {/* Finale Title */}
      <h1 className="font-serif text-4xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-roseGold-100 to-roseGold-300 mb-6 max-w-2xl leading-tight">
        {giftConfig.finale.title}
      </h1>

      {/* Finale Message */}
      <p className="font-serif italic text-lg md:text-xl text-roseGold-200/95 max-w-md mb-10 leading-relaxed font-light">
        "{giftConfig.finale.message}"
      </p>

      {/* Replay Button */}
      <button
        onClick={onReplay}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-medium text-wine-950 bg-gradient-to-r from-amber-200 via-roseGold-200 to-roseGold-300 rounded-full shadow-xl shadow-rose-950/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-roseGold-300 focus:ring-offset-2 focus:ring-offset-wine-950 z-40"
      >
        <RotateCcw className="w-5 h-5 mr-3 text-wine-950 group-hover:-rotate-180 transition-transform duration-500" />
        <span>{giftConfig.finale.replayLabel}</span>
      </button>

      {/* Footer credit */}
      <p className="mt-12 text-xs text-roseGold-300/40 font-light">
        Made with ❤️ for Nandani
      </p>
    </div>
  );
};
