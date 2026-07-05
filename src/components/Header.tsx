import { useState } from "react";
import { LogoMark } from "./Icons";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../i18n";

type NavKey = "home" | "about" | "music" | "gallery" | "contact";

type NavItem = {
  key: NavKey;
  href: string;
  gallery?: boolean;
};

const navItems: NavItem[] = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "music", href: "#music" },
  { key: "gallery", href: "#gallery", gallery: true },
  { key: "contact", href: "mailto:memoleecontact@gmail.com" },
];

type HeaderProps = {
  onOpenGallery: () => void;
};

export default function Header({ onOpenGallery }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="site-header">
      <a className="logo-link" href="#home" aria-label={t.header.logoHome}>
        <LogoMark className="logo-mark" />
      </a>

      <nav className="desktop-nav" aria-label={t.header.primaryNav}>
        {navItems.map(({ key, href, gallery }) => (
          <a
            className={key === "home" ? "nav-link nav-link--active" : "nav-link"}
            href={href}
            key={key}
            onClick={
              gallery
                ? (event) => {
                    event.preventDefault();
                    onOpenGallery();
                  }
                : undefined
            }
          >
            {t.header.nav[key]}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <LanguageSwitcher className="lang-switcher--desktop" />

        <button
          className={menuOpen ? "menu-toggle menu-toggle--open" : "menu-toggle"}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={t.header.openMenu}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={menuOpen ? "mobile-menu mobile-menu--open" : "mobile-menu"} id="mobile-menu">
        <nav aria-label={t.header.mobileNav}>
          {navItems.map(({ key, href, gallery }) => (
            <a
              className={key === "home" ? "mobile-nav-link mobile-nav-link--active" : "mobile-nav-link"}
              href={href}
              key={key}
              onClick={(event) => {
                if (gallery) {
                  event.preventDefault();
                  onOpenGallery();
                }
                setMenuOpen(false);
              }}
            >
              {t.header.nav[key]}
            </a>
          ))}
        </nav>
        <LanguageSwitcher className="lang-switcher--mobile" />
      </div>
    </header>
  );
}
