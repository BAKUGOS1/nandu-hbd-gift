"use client";

import React, { useRef, useEffect } from "react";
import { useVisibilityPause } from "@/hooks/useVisibilityPause";
import { giftConfig } from "@/data/gift-config";
import { ChevronRight } from "lucide-react";

interface NameRainCanvasProps {
  onComplete: () => void;
}

export const NameRainCanvas: React.FC<NameRainCanvasProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPaused = useVisibilityPause();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const text = "NANDU";
    const fontSize = 18;
    const columns = Math.floor(window.innerWidth / (fontSize * 2.2));
    const drops: number[] = Array(columns).fill(1).map(() => Math.random() * -50);

    const draw = () => {
      if (isPaused) return;

      ctx.fillStyle = "rgba(18, 3, 9, 0.12)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = "rgba(244, 172, 183, 0.65)";
      ctx.font = `${fontSize}px var(--font-cormorant), serif`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize * 2.4;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > window.innerHeight && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.5; // Slower falling speed!
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Auto complete scene after relaxed timer (7.5 seconds)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, giftConfig.timing.rainDuration);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(completeTimer);
    };
  }, [isPaused, onComplete]);

  return (
    <div
      onClick={onComplete}
      className="relative min-h-[100svh] w-full bg-wine-950 flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 text-center px-4 animate-fade-in pointer-events-none">
        <p className="text-xs uppercase tracking-[0.4em] text-roseGold-300/80 mb-3 font-medium">
          A special celebration
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-light text-roseGold-100 drop-shadow-lg">
          For NANDANI
        </h2>
      </div>

      <div className="absolute bottom-10 z-20 flex items-center space-x-1 text-xs text-roseGold-300/60 font-light tracking-wide animate-pulse">
        <span>Tap to continue</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};
