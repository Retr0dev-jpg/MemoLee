import type { Dictionary } from "./en";

const tr: Dictionary = {
  meta: {
    title: "Memolee | Müzik Portfolyosu",
    description:
      "Memolee'nin müzik portfolyosu: gitar, piyano, cover'lar ve müzikseverler için içerikler.",
  },
  header: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkında",
      music: "Müzik",
      gallery: "Galeri",
      contact: "İletişim",
    },
    logoHome: "Memolee ana sayfa",
    primaryNav: "Ana gezinme",
    mobileNav: "Mobil gezinme",
    openMenu: "Menüyü aç",
    language: "Dil",
  },
  hero: {
    eyebrow: "Gitarist • Piyanist • İçerik Üreticisi",
    title1: "Çal.",
    title2: "Yarat.",
    title3: "İlham ver.",
    description:
      "Klasik ve elektro gitar ile piyano çalıyorum; müzikseverler için cover'lar, ipuçları ve içerikler paylaşıyorum.",
    cta: "Daha fazlasını keşfet",
    followKicker: "Beni takip et",
    portrait: "Sanatçı portresi",
    guitar: "Gitar",
    piano: "Piyano",
    chooseProfile: (label: string) => `${label}: profil seç`,
  },
  about: {
    title: "Hakkımda",
    bio: "Merhaba! Bir müzisyen ve içerik üreticisiyim. Klasik ve elektro gitar ile piyano çalıyorum; müzikseverler için cover'lar, ipuçları ve içerikler paylaşıyorum.",
    portrait: "Siyah beyaz portre",
    categories: "İçerik kategorileri",
    skills: {
      guitar: "Gitar",
      piano: "Piyano",
      tips: "İpuçları ve Püf Noktaları",
      videos: "Videolar ve Cover'lar",
    },
  },
  latest: {
    heading: "Son içerikler",
    viewAll: "Tümünü gör",
    youtube: "YouTube",
    videoBadge: "Video",
    cover: (channel: string) => `${channel} Cover`,
  },
  gallery: {
    dialog: "İçerik galerisi",
    kicker: "Galeri",
    playing: "Şimdi oynatılıyor",
    all: "Tüm içerikler",
    close: "Galeriyi kapat",
    back: "İçeriklere dön",
    watchOnYouTube: "YouTube'da izle",
    searchPlaceholder: "Bir parça ara...",
    searchLabel: "İçeriklerde ara",
    filterLabel: "Kanala göre filtrele",
    filterAll: "Tümü",
    loading: "İçerikler yükleniyor…",
    error:
      "İçerikler şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.",
    empty: "Aramanız için sonuç bulunamadı.",
    videoBadge: "Video",
    cover: (channel: string) => `${channel} Cover`,
  },
  footer: {
    quote1: "Müzik benim dilim.",
    quote2: "Her nota, benim hikâyem.",
    credit: "Tasarlayan ve geliştiren:",
    creditFor: "·",
  },
  common: {
    untitled: "Başlıksız",
  },
  instruments: {
    Piano: "Piyano",
    Guitar: "Gitar",
  },
};

export default tr;
