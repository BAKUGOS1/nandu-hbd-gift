export type GiftPhase = 
  | "gate"
  | "countdown"
  | "messages"
  | "rain"
  | "hero"
  | "book"
  | "finale";

export interface GiftConfig {
  recipient: {
    fullName: string;
    nickname: string;
    relation: string;
  };
  entry: {
    eyebrow: string;
    title: string;
    button: string;
  };
  introMessages: string[];
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  book: {
    coverTitle: string;
    coverSubtitle: string;
    coverNote: string;
    pageMessages: string[];
    backCover: string;
  };
  finale: {
    title: string;
    message: string;
    replayLabel: string;
  };
  audio: {
    src: string;
    loop: boolean;
    fadeInDuration: number;
  };
  timing: {
    countdown: number;
    messageDelay: number;
    rainDuration: number;
  };
}

export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface DecorationItem {
  src: string;
  className: string;
}

export interface BookPageData {
  id: number;
  type: "cover" | "letter" | "collage" | "portrait" | "moments" | "note" | "closing" | "backCover";
  title?: string;
  subtitle?: string;
  note?: string;
  message?: string;
  photos: PhotoItem[];
  frameSrc?: string;
  layoutVariant?: "staggered-up" | "staggered-down" | "centered-polaroid" | "side-by-side";
  decorations?: DecorationItem[];
}
