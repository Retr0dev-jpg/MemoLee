import { useEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowRight,
  GuitarIcon,
  InstagramIcon,
  PianoIcon,
  SpotifyIcon,
  TikTokIcon,
  YouTubeIcon,
} from "./Icons";
import { focusSocials } from "../lib/focusSocials";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type SocialLink = {
  label: string;
  Icon: IconType;
  href?: string;
  guitar?: string;
  piano?: string;
};

const socialLinks: SocialLink[] = [
  {
    label: "YouTube",
    Icon: YouTubeIcon,
    guitar: "https://www.youtube.com/@memoleeguitar",
    piano: "https://www.youtube.com/channel/UCmncKPi1va_EZjZn7jxTkww",
  },
  {
    label: "Instagram",
    Icon: InstagramIcon,
    guitar: "https://www.instagram.com/memoleeguitar",
    piano: "https://www.instagram.com/memoleepiano/",
  },
  {
    label: "TikTok",
    Icon: TikTokIcon,
    guitar: "https://www.tiktok.com/@memoleeguitar",
    piano: "https://www.tiktok.com/@memoleepiano",
  },
  {
    label: "Spotify",
    Icon: SpotifyIcon,
    href: "https://open.spotify.com/user/317aluqrs4q75xn36j7au6txh4zi",
  },
];

export default function Hero() {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openCard) return;

    const handlePointer = (event: MouseEvent) => {
      if (!gridRef.current?.contains(event.target as Node)) {
        setOpenCard(null);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenCard(null);
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openCard]);

  return (
    <section className="hero section-frame" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Guitarist • Pianist • Content Creator</p>
        <h1 className="hero-title">
          <span>Play.</span>
          <span>Create.</span>
          <span>Inspire.</span>
        </h1>
        <span className="short-rule" aria-hidden="true" />
        <p className="hero-description">
          Suono chitarra classica, elettrica e pianoforte e condivido cover,
          consigli e contenuti per altri appassionati di musica.
        </p>
        <a
          className="outline-button"
          href="#follow"
          onClick={(event) => {
            event.preventDefault();
            focusSocials();
          }}
        >
          Scopri di più
          <ArrowRight className="button-arrow" />
        </a>

        <div className="follow-block" id="follow">
          <p className="section-kicker">Follow me</p>
          <div className="social-grid" ref={gridRef}>
            {socialLinks.map(({ label, Icon, href, guitar, piano }) => {
              if (href) {
                return (
                  <a
                    className="social-card"
                    href={href}
                    key={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="social-icon" />
                    <span>{label}</span>
                  </a>
                );
              }

              const isOpen = openCard === label;
              return (
                <div
                  className={isOpen ? "social-cell social-cell--open" : "social-cell"}
                  key={label}
                >
                  <button
                    type="button"
                    className="social-card"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => setOpenCard(isOpen ? null : label)}
                  >
                    <Icon className="social-icon" />
                    <span>{label}</span>
                  </button>

                  <div className="social-choice" role="menu" aria-label={`${label}: scegli profilo`}>
                    <a
                      className="social-choice__btn"
                      href={guitar}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setOpenCard(null)}
                    >
                      <GuitarIcon className="social-choice__icon" />
                      <span>Chitarra</span>
                    </a>
                    <a
                      className="social-choice__btn"
                      href={piano}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setOpenCard(null)}
                    >
                      <PianoIcon className="social-choice__icon" />
                      <span>Piano</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hero-media" aria-label="Ritratto artista">
        <div className="brush-layer" />
        <div className="portrait-layer" />
      </div>
    </section>
  );
}
