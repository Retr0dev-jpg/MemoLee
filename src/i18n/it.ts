import type { Dictionary } from "./en";

const it: Dictionary = {
  meta: {
    title: "Memolee | Portfolio Musicale",
    description:
      "Portfolio musicale di Memolee: chitarra, pianoforte, cover e contenuti per appassionati di musica.",
  },
  header: {
    nav: {
      home: "Home",
      about: "Chi sono",
      music: "Musica",
      gallery: "Galleria",
      contact: "Contatti",
    },
    logoHome: "Memolee home",
    primaryNav: "Navigazione principale",
    mobileNav: "Navigazione mobile",
    openMenu: "Apri menu",
    language: "Lingua",
  },
  hero: {
    eyebrow: "Chitarrista • Pianista • Content Creator",
    title1: "Suona.",
    title2: "Crea.",
    title3: "Ispira.",
    description:
      "Suono chitarra classica, elettrica e pianoforte e condivido cover, consigli e contenuti per altri appassionati di musica.",
    cta: "Scopri di più",
    followKicker: "Seguimi",
    portrait: "Ritratto artista",
    guitar: "Chitarra",
    piano: "Piano",
    chooseProfile: (label: string) => `${label}: scegli profilo`,
  },
  about: {
    title: "Chi sono",
    bio: "Ciao! Sono un musicista e content creator. Suono chitarra classica, elettrica e pianoforte e condivido cover, consigli e contenuti per altri appassionati di musica.",
    portrait: "Ritratto in bianco e nero",
    categories: "Categorie contenuti",
    skills: {
      guitar: "Chitarra",
      piano: "Piano",
      tips: "Consigli e trucchi",
      videos: "Video e cover",
    },
  },
  latest: {
    heading: "Ultimi contenuti",
    viewAll: "Vedi tutto",
    youtube: "YouTube",
    videoBadge: "Video",
    cover: (channel: string) => `Cover di ${channel}`,
  },
  gallery: {
    dialog: "Galleria contenuti",
    kicker: "Galleria",
    playing: "Riproduzione",
    all: "Tutti i contenuti",
    close: "Chiudi galleria",
    back: "Torna ai contenuti",
    watchOnYouTube: "Guarda su YouTube",
    searchPlaceholder: "Cerca un brano...",
    searchLabel: "Cerca tra i contenuti",
    filterLabel: "Filtra per canale",
    filterAll: "Tutti",
    loading: "Caricamento contenuti…",
    error:
      "Impossibile caricare i contenuti in questo momento. Riprova più tardi.",
    empty: "Nessun risultato per la ricerca.",
    videoBadge: "Video",
    cover: (channel: string) => `Cover di ${channel}`,
  },
  footer: {
    quote1: "La musica è il mio linguaggio.",
    quote2: "Ogni nota, la mia storia.",
    credit: "Sito progettato e creato da",
    creditFor: "per",
  },
  common: {
    untitled: "Senza titolo",
  },
  instruments: {
    Piano: "Piano",
    Guitar: "Chitarra",
  },
};

export default it;
