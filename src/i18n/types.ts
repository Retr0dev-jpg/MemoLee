import type { Dictionary } from "./en";

export type Locale = "it" | "en" | "tr";

export const LOCALES: Locale[] = ["it", "en", "tr"];

export const LOCALE_LABELS: Record<Locale, string> = {
  it: "IT",
  en: "EN",
  tr: "TR",
};

export type { Dictionary };
