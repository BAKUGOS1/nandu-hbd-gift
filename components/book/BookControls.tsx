"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookControlsProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const BookControls: React.FC<BookControlsProps> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-6 select-none z-30">
      <button
        onClick={onPrev}
        disabled={currentPage <= 0}
        aria-label="Previous page"
        className="p-3 text-roseGold-100 bg-wine-900/80 backdrop-blur-md border border-roseGold-300/30 rounded-full hover:bg-wine-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-roseGold-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="text-sm font-medium text-roseGold-200 tracking-wider font-serif">
        Page {currentPage + 1} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages - 1}
        aria-label="Next page"
        className="p-3 text-roseGold-100 bg-wine-900/80 backdrop-blur-md border border-roseGold-300/30 rounded-full hover:bg-wine-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-roseGold-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
