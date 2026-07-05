import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <p>
        {t.footer.quote1}
        <br />
        {t.footer.quote2}
      </p>
      <p className="site-footer__credit">
        {t.footer.credit}{" "}
        <a href="https://retr0hub.dev/" target="_blank" rel="noopener noreferrer">
          Retr0_
        </a>{" "}
        {t.footer.creditFor} Memolee
      </p>
    </footer>
  );
}
