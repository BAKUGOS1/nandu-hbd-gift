import { BookPageData } from "@/types/gift";
import { photoManifest } from "./photo-manifest";
import { giftConfig } from "./gift-config";

export const bookPages: BookPageData[] = [
  // 1. Front Cover (hard)
  {
    id: 1,
    type: "cover",
    title: giftConfig.book.coverTitle,
    subtitle: giftConfig.book.coverSubtitle,
    note: giftConfig.book.coverNote,
    photos: [photoManifest[0]],
  },

  // 2. Page 1 — Opening Letter
  {
    id: 2,
    type: "letter",
    title: "Dear Nandu",
    message: giftConfig.book.pageMessages[0],
    photos: [photoManifest[1]],
    layoutVariant: "centered-polaroid",
    decorations: [
      { src: "/book/elements/billa.png", className: "w-16 h-16 md:w-20 md:h-20 transform -rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/lovey.png", className: "w-14 h-10 md:w-16 md:h-12 transform rotate-6 drop-shadow-md" },
      { src: "/book/elements/boqey.png", className: "w-16 h-16 md:w-20 md:h-20 transform rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/stamp.png", className: "w-10 h-10 md:w-12 md:h-12 transform -rotate-6 opacity-90 drop-shadow-md" },
    ],
  },

  // 3. Page 2 — Memories Collage
  {
    id: 3,
    type: "collage",
    title: "Little Memories",
    message: giftConfig.book.pageMessages[1],
    photos: [photoManifest[2], photoManifest[3]],
    layoutVariant: "staggered-up",
    decorations: [
      { src: "/book/elements/badge.png", className: "w-14 h-14 md:w-16 md:h-16 transform -rotate-6 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/cam.png", className: "w-12 h-12 md:w-14 md:h-14 transform rotate-12 drop-shadow-md" },
      { src: "/book/elements/billa2.png", className: "w-16 h-16 md:w-20 md:h-20 transform rotate-6 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/rosel.png", className: "w-16 h-16 md:w-18 md:h-18 transform -rotate-12 drop-shadow-md" },
    ],
  },

  // 4. Page 3 — Favorite Smile (Portrait)
  {
    id: 4,
    type: "portrait",
    title: "My Favorite Person",
    message: giftConfig.book.pageMessages[2],
    photos: [photoManifest[4]],
    layoutVariant: "centered-polaroid",
    decorations: [
      { src: "/book/elements/ted.png", className: "w-16 h-16 md:w-20 md:h-20 transform rotate-6 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/stamp.png", className: "w-11 h-11 md:w-13 md:h-13 transform -rotate-12 drop-shadow-md" },
      { src: "/book/elements/billa3.png", className: "w-16 h-16 md:w-20 md:h-20 transform -rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/twoStar.png", className: "w-10 h-10 md:w-12 md:h-12 transform rotate-12 drop-shadow-md" },
    ],
  },

  // 5. Page 4 — Partner in Crime (Moments)
  {
    id: 5,
    type: "moments",
    title: "Partner in Crime 🕵️‍♀️",
    message: giftConfig.book.pageMessages[3],
    photos: [photoManifest[5], photoManifest[6]],
    layoutVariant: "staggered-down",
    decorations: [
      { src: "/book/elements/billa4.png", className: "w-16 h-16 md:w-20 md:h-20 transform -rotate-6 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/cam.png", className: "w-12 h-12 md:w-14 md:h-14 transform -rotate-12 drop-shadow-md" },
      { src: "/book/elements/butter.png", className: "w-14 h-14 md:w-16 md:h-16 transform rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/badge.png", className: "w-13 h-13 md:w-15 md:h-15 transform rotate-6 drop-shadow-md" },
    ],
  },

  // 6. Page 5 — Proud Bhai Note
  {
    id: 6,
    type: "note",
    title: "So Proud of You",
    message: giftConfig.book.pageMessages[4],
    photos: [photoManifest[7], photoManifest[8]],
    layoutVariant: "side-by-side",
    decorations: [
      { src: "/book/elements/billa.png", className: "w-16 h-16 md:w-20 md:h-20 transform -rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/rosel.png", className: "w-15 h-15 md:w-18 md:h-18 transform rotate-6 drop-shadow-md" },
      { src: "/book/elements/ted.png", className: "w-16 h-16 md:w-20 md:h-20 transform rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/starem.png", className: "w-10 h-10 md:w-12 md:h-12 transform -rotate-6 drop-shadow-md" },
    ],
  },

  // 7. Page 6 — Always Shine
  {
    id: 7,
    type: "closing",
    title: "Keep Shining ✨",
    message: giftConfig.book.pageMessages[5],
    photos: [photoManifest[9], photoManifest[10]],
    layoutVariant: "staggered-up",
    decorations: [
      { src: "/book/elements/boqey.png", className: "w-16 h-16 md:w-20 md:h-20 transform -rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/moon.png", className: "w-13 h-13 md:w-15 md:h-15 transform rotate-6 drop-shadow-md" },
      { src: "/book/elements/billa2.png", className: "w-16 h-16 md:w-20 md:h-20 transform rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/butter.png", className: "w-12 h-12 md:w-14 md:h-14 transform -rotate-6 drop-shadow-md" },
    ],
  },

  // 8. Page 7 — Sister & Friend
  {
    id: 8,
    type: "moments",
    title: "Always by Your Side",
    message: giftConfig.book.pageMessages[6],
    photos: [photoManifest[11], photoManifest[12]],
    layoutVariant: "staggered-down",
    decorations: [
      { src: "/book/elements/billa3.png", className: "w-16 h-16 md:w-20 md:h-20 transform -rotate-6 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/cam.png", className: "w-12 h-12 md:w-14 md:h-14 transform rotate-6 drop-shadow-md" },
      { src: "/book/elements/rabbit.png", className: "w-16 h-16 md:w-20 md:h-20 transform rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/starB.png", className: "w-10 h-10 md:w-12 md:h-12 transform -rotate-12 drop-shadow-md" },
    ],
  },

  // 9. Page 8 — Best Sister Ever
  {
    id: 9,
    type: "closing",
    title: "Best Sister Ever 🏆",
    message: giftConfig.book.pageMessages[7],
    photos: [photoManifest[13]],
    layoutVariant: "centered-polaroid",
    decorations: [
      { src: "/book/elements/badge.png", className: "w-14 h-14 md:w-16 md:h-16 transform -rotate-6 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/boqey.png", className: "w-15 h-15 md:w-18 md:h-18 transform rotate-6 drop-shadow-md" },
      { src: "/book/elements/billa4.png", className: "w-16 h-16 md:w-20 md:h-20 transform rotate-12 hover:scale-110 transition-transform drop-shadow-md" },
      { src: "/book/elements/rabbit.png", className: "w-14 h-14 md:w-16 md:h-16 transform -rotate-12 drop-shadow-md" },
    ],
  },

  // 10. Back Cover (hard)
  {
    id: 10,
    type: "backCover",
    title: "Happy Birthday, Nandu! 🎂",
    subtitle: "Always keep smiling ♥",
    note: "Made with love by your bhai",
    photos: [],
  },
];
