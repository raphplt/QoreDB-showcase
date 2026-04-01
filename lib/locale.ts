import type { NextRequest } from "next/server";

export const SUPPORTED_LOCALES = [
  "fr",
  "en",
  "es",
  "it",
  "de",
  "zh",
  "ja",
] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "fr";

export const LOCALE_LABELS: Record<AppLocale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  it: "Italiano",
  de: "Deutsch",
  zh: "中文",
  ja: "日本語",
};

const INTL_LOCALE_MAP: Record<AppLocale, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
  it: "it-IT",
  de: "de-DE",
  zh: "zh-CN",
  ja: "ja-JP",
};

export function isSupportedLocale(locale: string): locale is AppLocale {
  return SUPPORTED_LOCALES.includes(locale as AppLocale);
}

export function normalizeLocale(locale?: string | null): AppLocale {
  if (!locale) return DEFAULT_LOCALE;

  const normalized = locale.toLowerCase();
  if (isSupportedLocale(normalized)) {
    return normalized;
  }

  if (normalized.startsWith("zh")) {
    return "zh";
  }

  const baseLocale = normalized.split("-")[0];
  if (isSupportedLocale(baseLocale)) {
    return baseLocale;
  }

  return DEFAULT_LOCALE;
}

export function getIntlLocale(locale?: string | null) {
  return INTL_LOCALE_MAP[normalizeLocale(locale)];
}

export function detectLocale(request: NextRequest): AppLocale {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const preferredLocales = acceptLanguage
    .split(",")
    .map((entry) => {
      const [rawLocale, ...params] = entry.trim().split(";");
      const quality = params.find((param) => param.trim().startsWith("q="));
      return {
        locale: rawLocale.trim(),
        quality: quality ? Number.parseFloat(quality.split("=")[1] ?? "1") : 1,
      };
    })
    .filter((entry) => entry.locale)
    .sort((a, b) => b.quality - a.quality);

  for (const entry of preferredLocales) {
    const locale = normalizeLocale(entry.locale);
    if (locale) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

export function localizePathname(
  pathname: string,
  currentLocale: string,
  nextLocale: AppLocale,
) {
  const normalizedCurrentLocale = normalizeLocale(currentLocale);

  if (pathname === `/${normalizedCurrentLocale}`) {
    return `/${nextLocale}`;
  }

  if (pathname.startsWith(`/${normalizedCurrentLocale}/`)) {
    return pathname.replace(`/${normalizedCurrentLocale}`, `/${nextLocale}`);
  }

  return pathname === "/" ? `/${nextLocale}` : `/${nextLocale}${pathname}`;
}
