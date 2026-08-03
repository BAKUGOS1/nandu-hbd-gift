"use client";

import React, { useState, useEffect } from "react";

interface CountdownSceneProps {
  onComplete: () => void;
}

export const CountdownScene: React.FC<CountdownSceneProps> = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100svh] bg-wine-950 text-roseGold-100 select-none cursor-pointer">
      <div key={count} className="animate-scale-up text-center">
        <span className="font-serif text-8xl md:text-9xl font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-roseGold-200 to-rose-300 drop-shadow-lg">
          {count > 0 ? count : "✨"}
        </span>
      </div>
    </div>
  );
};
