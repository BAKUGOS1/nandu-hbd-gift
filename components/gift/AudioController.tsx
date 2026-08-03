"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioControllerProps {
  isMuted: boolean;
  onToggleMute: () => void;
  hasStarted: boolean;
  audioError?: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isMuted,
  onToggleMute,
  hasStarted,
  audioError,
}) => {
  if (!hasStarted || audioError) return null;

  return (
    <button
      onClick={onToggleMute}
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      title={isMuted ? "Unmute" : "Mute"}
      className="fixed top-5 left-5 z-50 p-2.5 text-roseGold-200/90 bg-wine-900/60 backdrop-blur-md border border-roseGold-300/20 rounded-full hover:bg-wine-800/80 hover:text-roseGold-100 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-roseGold-300"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-rose-400" />
      ) : (
        <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
      )}
    </button>
  );
};
