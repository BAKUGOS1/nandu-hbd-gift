import { GiftConfig } from "@/types/gift";

export const giftConfig: GiftConfig = {
  recipient: {
    fullName: "Nandani",
    nickname: "Nandu",
    relation: "sister",
  },

  entry: {
    eyebrow: "Made with extra love & care",
    title: "A little surprise for my Nandu 🎂",
    button: "Tap to begin",
  },

  introMessages: [
    "Hey Nandu... 💛",
    "Your bhai made a little corner of the internet, just for you.",
    "For every laugh, every fight, every hug, and every 'pagal hai kya' moment.",
    "Because some sisters deserve more than just a normal birthday wish.",
  ],

  hero: {
    title: "NANDANI",
    subtitle: "My Nandu",
    cta: "Open your little book 📖",
  },

  book: {
    coverTitle: "For Nandani",
    coverSubtitle: "My Nandu",
    coverNote: "A little book made with love by your bhai 🎂",
    pageMessages: [
      "From every silly moment we shared to all the memories we built together...",
      "You turned ordinary days into unforgettable stories.",
      "Through all the drama, the gossip, and the secret code words...",
      "You've always been my favorite partner in crime.",
      "I hope you always know how proud I am of the amazing person you're becoming.",
      "Keep smiling, keep shining, and stay wonderfully you, Nandu!",
      "No matter where life takes us, your bhai will always be cheering for you.",
      "Happy Birthday to the world's best sister! 🎉✨",
    ],
    backCover: "Happy Birthday Nandu! 🎂\nAlways keep smiling ♥",
  },

  finale: {
    title: "Happy Birthday Nandu! 🎂",
    message: "You make life brighter, louder, and infinitely happier. Here's to another fantastic year ahead!",
    replayLabel: "Watch it again ✨",
  },

  audio: {
    src: "/audio/nandu-theme.mp3",
    loop: true,
    fadeInDuration: 2000,
  },

  timing: {
    countdown: 3600,
    messageDelay: 5000, // 5 seconds per intro message!
    rainDuration: 7500, // 7.5 seconds name rain!
  },
};
