import { useState, useEffect } from "react";

export function useVisibilityPause(): boolean {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isPaused;
}
