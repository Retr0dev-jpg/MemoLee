import { useI18n } from "../i18n";
import { LOCALES, LOCALE_LABELS } from "../i18n/types";

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={className ? `lang-switcher ${className}` : "lang-switcher"}
      role="group"
      aria-label={t.header.language}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className={code === locale ? "lang-option lang-option--active" : "lang-option"}
          aria-pressed={code === locale}
          onClick={() => setLocale(code)}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
