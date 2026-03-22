"use client";

import { createInstance, type Resource } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { type ReactNode, useMemo } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { i18nConfig } from "@/i18nConfig";

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Resource;
}) {
  const i18n = useMemo(() => {
    const i18nInstance = createInstance();
    i18nInstance
      .use(initReactI18next)
      .use(
        resourcesToBackend(
          (language: string, namespace: string) =>
            import(`@/locales/${language}/${namespace}.json`),
        ),
      )
      .init({
        lng: locale,
        resources,
        fallbackLng: i18nConfig.defaultLocale,
        supportedLngs: i18nConfig.locales,
        defaultNS: namespaces[0],
        fallbackNS: namespaces[0],
        ns: namespaces,
        preload: resources ? [] : i18nConfig.locales,
      });
    return i18nInstance;
  }, [locale, namespaces, resources]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
