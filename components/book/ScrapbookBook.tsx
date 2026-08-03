"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { BookPageData } from "@/types/gift";
import { ScrapbookPage } from "./ScrapbookPage";
import { BookControls } from "./BookControls";
import { BookFallback } from "./BookFallback";

interface ScrapbookBookProps {
  pages: BookPageData[];
  onReachBackCover?: () => void;
}

export const ScrapbookBook: React.FC<ScrapbookBookProps> = ({
  pages,
  onReachBackCover,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bookInstanceRef = useRef<any>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [initError, setInitError] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Initialize PageFlip
  useEffect(() => {
    let isMounted = true;
    let pageFlipInstance: any = null;

    const initBook = async () => {
      if (!containerRef.current || typeof window === "undefined") return;

      try {
        const { PageFlip } = await import("page-flip");

        if (!isMounted || !containerRef.current) return;

        // Clean up prior instance if any
        if (bookInstanceRef.current) {
          try {
            bookInstanceRef.current.destroy();
          } catch {}
          bookInstanceRef.current = null;
        }

        const isMobile = window.innerWidth < 768;

        const pageFlip = new PageFlip(containerRef.current, {
          width: isMobile ? 320 : 420,
          height: isMobile ? 460 : 540,
          size: "stretch",
          minWidth: 280,
          maxWidth: 500,
          minHeight: 400,
          maxHeight: 650,
          drawShadow: true,
          maxShadowOpacity: 0.3,
          showCover: true,
          usePortrait: true,
          flippingTime: 550,
          mobileScrollSupport: true,
        });

        pageFlipInstance = pageFlip;
        bookInstanceRef.current = pageFlip;

        const pageElements = containerRef.current.querySelectorAll(".nandu-book-page");
        if (pageElements && pageElements.length > 0) {
          pageFlip.loadFromHTML(pageElements as any);
        }

        pageFlip.on("flip", (e: any) => {
          if (!isMounted) return;
          const pageIndex = e.data;
          setCurrentPage(pageIndex);

          // Check if reached back cover (last page)
          if (pageIndex >= pages.length - 1 && onReachBackCover) {
            onReachBackCover();
          }
        });
      } catch (err) {
        console.warn("PageFlip initialization error, switching to fallback:", err);
        if (isMounted) setInitError(true);
      }
    };

    initBook();

    return () => {
      isMounted = false;
      if (pageFlipInstance) {
        try {
          pageFlipInstance.destroy();
        } catch {}
      }
      bookInstanceRef.current = null;
    };
  }, [pages.length, onReachBackCover]);

  // Handle controls
  const handlePrev = useCallback(() => {
    if (bookInstanceRef.current) {
      try {
        bookInstanceRef.current.flipPrev();
      } catch {}
    }
  }, []);

  const handleNext = useCallback(() => {
    if (bookInstanceRef.current) {
      try {
        bookInstanceRef.current.flipNext();
      } catch {}
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Hide swipe hint after 4s
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (initError) {
    return <BookFallback pages={pages} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100svh] px-2 py-6 select-none bg-gradient-to-b from-wine-950 via-wine-900 to-wine-950 text-roseGold-100 overflow-hidden relative">
      {/* Mobile Swipe Hint */}
      {showSwipeHint && (
        <div className="absolute top-4 z-40 bg-wine-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-roseGold-300/30 text-xs text-roseGold-200 animate-pulse md:hidden">
          👉 Swipe or tap arrows to turn pages
        </div>
      )}

      {/* Book Container */}
      <div className="relative w-full max-w-4xl flex items-center justify-center min-h-[500px] my-auto">
        <div ref={containerRef} className="mx-auto shadow-2xl rounded-lg">
          {pages.map((page) => (
            <ScrapbookPage key={page.id} page={page} />
          ))}
        </div>
      </div>

      {/* Book Controls */}
      <BookControls
        currentPage={currentPage}
        totalPages={pages.length}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};
