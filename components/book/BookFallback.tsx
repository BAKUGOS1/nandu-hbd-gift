"use client";

import React from "react";
import { BookPageData } from "@/types/gift";
import { ScrapbookPage } from "./ScrapbookPage";

interface BookFallbackProps {
  pages: BookPageData[];
}

export const BookFallback: React.FC<BookFallbackProps> = ({ pages }) => {
  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-md mx-auto w-full">
      <p className="text-xs text-roseGold-300/60 font-light text-center">
        📖 Scrapbook View
      </p>
      {pages.map((page) => (
        <div key={page.id} className="w-full h-[480px] shadow-2xl rounded-lg overflow-hidden">
          <ScrapbookPage page={page} />
        </div>
      ))}
    </div>
  );
};
