import { useState, useEffect, useRef, useCallback } from "react";

interface UseGiftAudioProps {
  src: string;
  loop?: boolean;
  fadeInDuration?: number;
}

export function useGiftAudio({ src, loop = true, fadeInDuration = 2000 }: UseGiftAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = 0;
    audioRef.current = audio;

    const handleError = () => {
      console.warn("Audio file could not be loaded, continuing gracefully without audio.");
      setAudioError(true);
    };

    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [src, loop]);

  const startAudio = useCallback(() => {
    if (!audioRef.current || audioError) return;

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setHasStarted(true);

      // Fade in volume
      const startTime = performance.now();
      const targetVolume = 0.7;

      const fadeInterval = setInterval(() => {
        if (!audioRef.current) {
          clearInterval(fadeInterval);
          return;
        }
        const elapsed = performance.now() - startTime;
        const progress = Math.min(1, elapsed / fadeInDuration);
        audioRef.current.volume = progress * targetVolume;

        if (progress >= 1) {
          clearInterval(fadeInterval);
        }
      }, 50);
    }).catch(err => {
      console.warn("Audio autoplay prevented by browser or file missing:", err);
      setAudioError(true);
    });
  }, [audioError, fadeInDuration]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const newMute = !isMuted;
    audioRef.current.muted = newMute;
    setIsMuted(newMute);
  }, [isMuted]);

  return {
    isPlaying,
    isMuted,
    hasStarted,
    audioError,
    startAudio,
    toggleMute,
  };
}
