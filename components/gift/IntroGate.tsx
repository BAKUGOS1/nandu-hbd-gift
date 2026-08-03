"use client";

import React from "react";
import { giftConfig } from "@/data/gift-config";
import { Sparkles, Heart } from "lucide-react";

interface IntroGateProps {
  onBegin: () => void;
}

export const IntroGate: React.FC<IntroGateProps> = ({ onBegin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100svh] px-4 text-center select-none bg-gradient-to-b from-wine-950 via-wine-900 to-wine-950 text-roseGold-100 relative overflow-hidden">
      {/* Background glow & subtle floating circles */}
      <div className="absolute w-72 h-72 rounded-full bg-rose-500/10 blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse-slow pointer-events-none delay-1000" />

      {/* Decorative top icon */}
      <div className="mb-6 flex items-center justify-center text-roseGold-300 animate-float">
        <Heart className="w-6 h-6 text-rose-400 fill-rose-400/30" />
      </div>

      {/* Eyebrow */}
      <p className="text-xs uppercase tracking-[0.3em] text-roseGold-300/80 mb-3 font-medium">
        {giftConfig.entry.eyebrow}
      </p>

      {/* Main Title */}
      <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal text-roseGold-100 mb-8 max-w-xl leading-tight tracking-wide">
        {giftConfig.entry.title}
      </h1>

      {/* Begin CTA Button */}
      <button
        onClick={onBegin}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-medium text-wine-950 bg-gradient-to-r from-amber-200 via-roseGold-200 to-roseGold-300 rounded-full shadow-lg shadow-rose-950/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-roseGold-300 focus:ring-offset-2 focus:ring-offset-wine-950"
      >
        <span>{giftConfig.entry.button}</span>
        <Sparkles className="w-5 h-5 ml-2 text-wine-950 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Subtle Hint */}
      <p className="mt-8 text-xs text-roseGold-300/50 font-light">
        🔊 Turn on sound for the best experience
      </p>
    </div>
  );
};
