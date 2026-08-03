"use client";

import React, { useState, useCallback } from "react";
import { GiftPhase } from "@/types/gift";
import { giftConfig } from "@/data/gift-config";
import { bookPages } from "@/data/book-pages";
import { useGiftAudio } from "@/hooks/useGiftAudio";

import { IntroGate } from "./IntroGate";
import { CountdownScene } from "./CountdownScene";
import { MessageRevealScene } from "./MessageRevealScene";
import { NameRainCanvas } from "./NameRainCanvas";
import { HeroRevealScene } from "./HeroRevealScene";
import { ScrapbookBook } from "../book/ScrapbookBook";
import { FinaleScene } from "./FinaleScene";
import { AudioController } from "./AudioController";
import { SkipIntroButton } from "./SkipIntroButton";

export const GiftExperience: React.FC = () => {
  const [phase, setPhase] = useState<GiftPhase>("gate");

  const { isMuted, hasStarted, audioError, startAudio, toggleMute } = useGiftAudio({
    src: giftConfig.audio.src,
    loop: giftConfig.audio.loop,
    fadeInDuration: giftConfig.audio.fadeInDuration,
  });

  const handleBegin = useCallback(() => {
    startAudio();
    setPhase("countdown");
  }, [startAudio]);

  const handleSkipIntro = useCallback(() => {
    setPhase("hero");
  }, []);

  const handleReplay = useCallback(() => {
    setPhase("gate");
  }, []);

  const showSkip = phase === "countdown" || phase === "messages" || phase === "rain";

  return (
    <main className="relative min-h-[100svh] w-full bg-wine-950 text-roseGold-100 overflow-x-hidden font-sans">
      {/* Persistent Audio Controls */}
      <AudioController
        isMuted={isMuted}
        onToggleMute={toggleMute}
        hasStarted={hasStarted}
        audioError={audioError}
      />

      {/* Skip Intro button */}
      {showSkip && <SkipIntroButton onSkip={handleSkipIntro} />}

      {/* Phase Views */}
      {phase === "gate" && <IntroGate onBegin={handleBegin} />}

      {phase === "countdown" && (
        <CountdownScene onComplete={() => setPhase("messages")} />
      )}

      {phase === "messages" && (
        <MessageRevealScene onComplete={() => setPhase("rain")} />
      )}

      {phase === "rain" && (
        <NameRainCanvas onComplete={() => setPhase("hero")} />
      )}

      {phase === "hero" && (
        <HeroRevealScene onOpenBook={() => setPhase("book")} />
      )}

      {phase === "book" && (
        <ScrapbookBook
          pages={bookPages}
          onReachBackCover={() => {
            // Give 2.5 seconds to appreciate back cover before showing finale
            setTimeout(() => setPhase("finale"), 2500);
          }}
        />
      )}

      {phase === "finale" && <FinaleScene onReplay={handleReplay} />}
    </main>
  );
};
