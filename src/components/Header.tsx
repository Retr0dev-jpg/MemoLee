import { useState } from "react";
import { LogoMark } from "./Icons";

type NavItem = {
  label: string;
  href: string;
  gallery?: boolean;
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Music", href: "#music" },
  { label: "Gallery", href: "#gallery", gallery: true },
  { label: "Contact", href: "mailto:memoleecontact@gmail.com" },
];

type HeaderProps = {
  onOpenGallery: () => void;
};

export default function Header({ onOpenGallery }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="logo-link" href="#home" aria-label="Memolee home">
        <LogoMark className="logo-mark" />
      </a>

      <nav className="desktop-nav" aria-label="Navigazione principale">
        {navItems.map(({ label, href, gallery }) => (
          <a
            className={label === "Home" ? "nav-link nav-link--active" : "nav-link"}
            href={href}
            key={label}
            onClick={
              gallery
                ? (event) => {
                    event.preventDefault();
                    onOpenGallery();
                  }
                : undefined
            }
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        className={menuOpen ? "menu-toggle menu-toggle--open" : "menu-toggle"}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label="Apri menu"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div className={menuOpen ? "mobile-menu mobile-menu--open" : "mobile-menu"} id="mobile-menu">
        <nav aria-label="Navigazione mobile">
          {navItems.map(({ label, href, gallery }) => (
            <a
              className={label === "Home" ? "mobile-nav-link mobile-nav-link--active" : "mobile-nav-link"}
              href={href}
              key={label}
              onClick={(event) => {
                if (gallery) {
                  event.preventDefault();
                  onOpenGallery();
                }
                setMenuOpen(false);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
