"use client";

import React from "react";
import Image from "next/image";
import { BookPageData } from "@/types/gift";

interface ScrapbookPageProps {
  page: BookPageData;
}

export const ScrapbookPage: React.FC<ScrapbookPageProps> = ({ page }) => {
  // Hard Front Cover
  if (page.type === "cover") {
    return (
      <div
        className="book-page nandu-book-page relative w-full h-full bg-[#3d0c1e] text-roseGold-100 p-6 flex flex-col items-center justify-between border-4 border-[#5a142e] shadow-2xl select-none overflow-hidden"
        data-density="hard"
      >
        <div className="absolute inset-0 opacity-40 bg-[url('/book/pages/front.png')] bg-cover bg-center pointer-events-none" />

        {/* Decorative corner borders */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-300/60" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-300/60" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-300/60" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-300/60" />

        <div className="relative z-10 text-center mt-6">
          <p className="text-xs uppercase tracking-[0.35em] text-roseGold-300/80 mb-2">
            Special Birthday Edition
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-amber-200 tracking-wide drop-shadow">
            {page.title}
          </h1>
          <p className="font-handwriting text-2xl text-roseGold-200 mt-1">
            {page.subtitle}
          </p>
        </div>

        {/* Cover Photo */}
        {page.photos.length > 0 && (
          <div className="relative z-10 w-40 h-40 my-auto rounded-lg overflow-hidden border-4 border-amber-200/60 shadow-2xl transform -rotate-2 bg-white p-1">
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image
                src={page.photos[0].src}
                alt={page.photos[0].alt}
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[url('/book/elements/tape.png')] bg-contain bg-no-repeat opacity-90 z-20 pointer-events-none" />
          </div>
        )}

        <div className="relative z-10 text-center mb-6">
          <p className="font-handwriting text-lg text-roseGold-300/90">
            {page.note}
          </p>
        </div>
      </div>
    );
  }

  // Hard Back Cover
  if (page.type === "backCover") {
    return (
      <div
        className="book-page nandu-book-page relative w-full h-full bg-[#3d0c1e] text-roseGold-100 p-6 flex flex-col items-center justify-center border-4 border-[#5a142e] shadow-2xl select-none overflow-hidden"
        data-density="hard"
      >
        <div className="absolute inset-0 opacity-40 bg-[url('/book/pages/back.png')] bg-cover bg-center pointer-events-none" />

        <div className="relative z-10 text-center p-6 bg-wine-950/60 rounded-xl backdrop-blur-sm border border-roseGold-300/20 shadow-xl">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-amber-200 mb-3 whitespace-pre-line leading-relaxed">
            {page.title}
          </h2>
          <p className="font-handwriting text-xl text-roseGold-200">
            {page.subtitle}
          </p>
        </div>
      </div>
    );
  }

  // Inner Scrapbook Pages
  const variant = page.layoutVariant || "centered-polaroid";

  return (
    <div className="book-page nandu-book-page relative w-full h-full bg-[#fdfaf3] text-gray-800 p-4 md:p-5 flex flex-col justify-between shadow-inner select-none overflow-hidden border border-amber-200/60">
      {/* Paper Texture Background */}
      <div className="absolute inset-0 opacity-35 bg-[url('/book/pages/left.jpg')] bg-cover bg-center pointer-events-none" />

      {/* Top Corner Decorative Tape */}
      <div className="absolute -top-1 right-4 w-16 h-6 bg-[url('/book/elements/tape.png')] bg-contain bg-no-repeat opacity-85 z-20 pointer-events-none" />

      {/* Page Title */}
      {page.title && (
        <div className="relative z-10 mb-2">
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-wine-950 border-b border-rose-300/40 pb-1">
            {page.title}
          </h3>
        </div>
      )}

      {/* Photos Layout Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-1 w-full">
        {/* Single Photo Layout */}
        {page.photos.length === 1 && (
          <div className="relative w-11/12 h-44 md:h-52 rounded-md shadow-xl bg-white p-2 transform -rotate-1 border border-gray-200">
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image
                src={page.photos[0].src}
                alt={page.photos[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ objectPosition: page.photos[0].objectPosition || "center" }}
              />
            </div>
            {/* Top Tape Overlay */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[url('/book/elements/lovetape.png')] bg-contain bg-no-repeat opacity-90 z-20 pointer-events-none" />
          </div>
        )}

        {/* Multi Photo Staggered Layout */}
        {page.photos.length >= 2 && (
          <div className="grid grid-cols-2 gap-3 w-full items-center">
            {page.photos.slice(0, 2).map((photo, i) => {
              const isFirst = i === 0;
              const tiltClass =
                variant === "staggered-up"
                  ? isFirst
                    ? "transform -rotate-4 -translate-y-1"
                    : "transform rotate-3 translate-y-2"
                  : variant === "staggered-down"
                  ? isFirst
                    ? "transform rotate-3 translate-y-2"
                    : "transform -rotate-4 -translate-y-1"
                  : isFirst
                  ? "transform -rotate-2"
                  : "transform rotate-2";

              return (
                <div
                  key={photo.id}
                  className={`relative h-32 md:h-40 rounded-md shadow-lg bg-white p-1.5 border border-gray-200 ${tiltClass}`}
                >
                  <div className="relative w-full h-full rounded overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 220px"
                      style={{ objectPosition: photo.objectPosition || "center" }}
                    />
                  </div>
                  {/* Photo Corner Tape */}
                  <div className="absolute -top-2.5 left-2 w-12 h-5 bg-[url('/book/elements/tape.png')] bg-contain bg-no-repeat opacity-85 z-20 pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Handwritten Message Box */}
      {page.message && (
        <div className="relative z-10 my-2 bg-amber-50/95 p-2.5 rounded-lg border border-amber-200/90 shadow-sm w-full mx-auto">
          <p className="font-handwriting text-base md:text-lg text-wine-900 leading-snug text-center">
            "{page.message}"
          </p>
        </div>
      )}

      {/* Rich Bottom Scrapbook Sticker Cluster (Fills up the empty bottom space!) */}
      <div className="relative z-10 w-full min-h-[85px] md:min-h-[105px] flex items-center justify-around px-2 py-1 bg-amber-100/40 rounded-xl border border-amber-200/40 shadow-inner mt-auto">
        {page.decorations &&
          page.decorations.map((deco, idx) => (
            <div key={idx} className={`relative flex items-center justify-center ${deco.className}`}>
              <Image
                src={deco.src}
                alt="scrapbook sticker"
                width={80}
                height={80}
                className="object-contain max-h-full max-w-full drop-shadow-md pointer-events-none"
              />
            </div>
          ))}
      </div>
    </div>
  );
};
