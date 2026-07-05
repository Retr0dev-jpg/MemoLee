const en = {
  meta: {
    title: "Memolee | Music Portfolio",
    description:
      "Memolee's music portfolio: guitar, piano, covers and content for music lovers.",
  },
  header: {
    nav: {
      home: "Home",
      about: "About",
      music: "Music",
      gallery: "Gallery",
      contact: "Contact",
    },
    logoHome: "Memolee home",
    primaryNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    language: "Language",
  },
  hero: {
    eyebrow: "Guitarist • Pianist • Content Creator",
    title1: "Play.",
    title2: "Create.",
    title3: "Inspire.",
    description:
      "I play classical and electric guitar and piano, and I share covers, tips and content for fellow music lovers.",
    cta: "Discover more",
    followKicker: "Follow me",
    portrait: "Artist portrait",
    guitar: "Guitar",
    piano: "Piano",
    chooseProfile: (label: string) => `${label}: choose profile`,
  },
  about: {
    title: "About me",
    bio: "Hi! I'm a musician and content creator. I play classical and electric guitar and piano, and I share covers, tips and content for fellow music lovers.",
    portrait: "Black and white portrait",
    categories: "Content categories",
    skills: {
      guitar: "Guitar",
      piano: "Piano",
      tips: "Tips & Tricks",
      videos: "Videos & Covers",
    },
  },
  latest: {
    heading: "Latest content",
    viewAll: "See all",
    youtube: "YouTube",
    videoBadge: "Video",
    cover: (channel: string) => `${channel} Cover`,
  },
  gallery: {
    dialog: "Content gallery",
    kicker: "Gallery",
    playing: "Now playing",
    all: "All content",
    close: "Close gallery",
    back: "Back to content",
    watchOnYouTube: "Watch on YouTube",
    searchPlaceholder: "Search a track...",
    searchLabel: "Search content",
    filterLabel: "Filter by channel",
    filterAll: "All",
    loading: "Loading content…",
    error: "Unable to load content right now. Please try again later.",
    empty: "No results for your search.",
    videoBadge: "Video",
    cover: (channel: string) => `${channel} Cover`,
  },
  footer: {
    quote1: "Music is my language.",
    quote2: "Every note, my story.",
    credit: "Site designed and built by",
    creditFor: "for",
  },
  common: {
    untitled: "Untitled",
  },
  instruments: {
    Piano: "Piano",
    Guitar: "Guitar",
  },
};

export type Dictionary = typeof en;

export default en;
