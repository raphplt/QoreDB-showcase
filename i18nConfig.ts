import type { Config } from "next-i18n-router/dist/types";
import { DEFAULT_LOCALE, detectLocale, SUPPORTED_LOCALES } from "@/lib/locale";

export const i18nConfig: Config = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  prefixDefault: true,
  localeDetector: (request) => detectLocale(request),
};
