"use client";

import React from "react";
import { FastForward } from "lucide-react";

interface SkipIntroButtonProps {
  onSkip: () => void;
}

export const SkipIntroButton: React.FC<SkipIntroButtonProps> = ({ onSkip }) => {
  return (
    <button
      onClick={onSkip}
      aria-label="Skip introduction"
      className="fixed top-5 right-5 z-50 flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-medium text-roseGold-200/80 bg-wine-900/60 backdrop-blur-md border border-roseGold-300/20 rounded-full hover:bg-wine-800/80 hover:text-roseGold-100 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-roseGold-300"
    >
      <span>Skip intro</span>
      <FastForward className="w-3.5 h-3.5" />
    </button>
  );
};
