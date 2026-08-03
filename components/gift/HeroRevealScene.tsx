"use client";

import React from "react";
import { giftConfig } from "@/data/gift-config";
import { BookOpen, Sparkles, Heart } from "lucide-react";

interface HeroRevealSceneProps {
  onOpenBook: () => void;
}

export const HeroRevealScene: React.FC<HeroRevealSceneProps> = ({ onOpenBook }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100svh] px-4 text-center select-none bg-luminous-gradient text-roseGold-100 relative overflow-hidden animate-fade-in">
      {/* Ambient background glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-rose-500/20 blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-400/15 blur-3xl animate-pulse-slow pointer-events-none delay-1000" />

      {/* Decorative top icon */}
      <div className="mb-4 flex items-center justify-center text-roseGold-300">
        <Heart className="w-6 h-6 text-rose-400 fill-rose-400/40" />
      </div>

      {/* Subtitle / Relation */}
      <p className="text-sm md:text-base uppercase tracking-[0.35em] text-roseGold-300/90 mb-3 font-medium">
        {giftConfig.hero.subtitle}
      </p>

      {/* Main Hero Name */}
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-roseGold-100 to-roseGold-300 mb-8 drop-shadow-lg">
        {giftConfig.hero.title}
      </h1>

      {/* Hero Quote / Message */}
      <p className="font-serif italic text-lg md:text-xl text-roseGold-200/90 max-w-md mb-10 leading-relaxed font-light">
        "Every smile, every silly moment, and every memory deserves a place to stay."
      </p>

      {/* CTA Button to Open Scrapbook */}
      <button
        onClick={onOpenBook}
        className="group relative inline-flex items-center justify-center px-9 py-4 text-base md:text-lg font-medium text-wine-950 bg-gradient-to-r from-amber-200 via-roseGold-200 to-roseGold-300 rounded-full shadow-xl shadow-rose-950/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-roseGold-300 focus:ring-offset-2 focus:ring-offset-wine-950"
      >
        <BookOpen className="w-5 h-5 mr-3 text-wine-950 group-hover:scale-110 transition-transform" />
        <span>{giftConfig.hero.cta}</span>
      </button>
    </div>
  );
};
