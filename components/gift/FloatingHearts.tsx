"use client";

import React, { useRef, useEffect } from "react";

export const FloatingHearts: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.innerWidth < 768;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      // Set font ONCE to prevent 2,000 font parsing calls per second inside RAF loop
      ctx.font = isMobile ? "18px sans-serif" : "22px sans-serif";
    };

    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number;
      y: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      symbol: string;
    }

    const symbols = ["♥", "🎂", "✨", "💖", "🌸"];
    const colors = ["#f4acb7", "#ffd1dc", "#f5ebd6", "#e07a5f", "#d4a373"];
    const particleCount = isMobile ? 15 : 28;

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 200,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.7 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillText(p.symbol, p.x, p.y);

        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -40) {
          p.y = window.innerHeight + 40;
          p.x = Math.random() * window.innerWidth;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30 transform-gpu"
    />
  );
};
