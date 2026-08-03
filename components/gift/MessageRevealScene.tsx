"use client";

import React, { useState, useEffect, useCallback } from "react";
import { giftConfig } from "@/data/gift-config";
import { ChevronRight } from "lucide-react";

interface MessageRevealSceneProps {
  onComplete: () => void;
}

export const MessageRevealScene: React.FC<MessageRevealSceneProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const messages = giftConfig.introMessages;

  const handleNext = useCallback(() => {
    if (index >= messages.length - 1) {
      onComplete();
    } else {
      setIndex((prev) => prev + 1);
    }
  }, [index, messages.length, onComplete]);

  // Auto-advance timer (5 seconds per message)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, giftConfig.timing.messageDelay);

    return () => clearTimeout(timer);
  }, [index, handleNext]);

  const currentMessage = messages[Math.min(index, messages.length - 1)];

  return (
    <div
      onClick={handleNext}
      className="flex flex-col items-center justify-center min-h-[100svh] px-6 text-center bg-wine-950 text-roseGold-100 select-none cursor-pointer relative overflow-hidden"
    >
      <div key={index} className="animate-fade-in max-w-xl">
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed text-roseGold-100 drop-shadow">
          "{currentMessage}"
        </p>
      </div>

      {/* Message Progress Dots & Next Hint */}
      <div className="flex flex-col items-center gap-4 mt-14 z-10">
        <div className="flex space-x-2">
          {messages.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "bg-roseGold-300 w-7"
                  : i < index
                  ? "bg-roseGold-300/50"
                  : "bg-roseGold-300/20"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center space-x-1 text-xs text-roseGold-300/60 font-light tracking-wide animate-pulse mt-2">
          <span>Tap anywhere to continue</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
