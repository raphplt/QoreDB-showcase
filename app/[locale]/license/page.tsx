"use client";

import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation } from "react-i18next";

export default function LicensePage() {
  const { t } = useTranslation();
  
  const sections = [
    "definitions",
    "grant_copyright",
    "grant_patent",
    "redistribution",
    "submission",
    "trademarks",
    "warranties",
    "liability",
    "additional_liability",
    "appendix"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-(--q-bg-0) text-(--q-text-0)">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-(--q-accent) opacity-5 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="relative text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-br from-(--q-text-0) to-(--q-text-1)">
            {t("license_page.title")}
          </h1>
          <p className="text-(--q-text-2) relative">
            {t("license_page.last_updated")}
          </p>
          <div className="mt-8 text-(--q-text-1) max-w-2xl mx-auto font-mono text-sm bg-(--q-bg-1) p-4 rounded-lg border border-(--q-border)">
             {t("license_page.intro")}
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
          {sections.map((section) => (
            <section key={section} className="space-y-4">
              <h2 className="text-2xl font-semibold text-(--q-text-0)">
                {t(`license_page.sections.${section}.title`)}
              </h2>
              <div 
                className="text-(--q-text-1) leading-relaxed whitespace-pre-line font-serif"
                dangerouslySetInnerHTML={{
                  __html: t(`license_page.sections.${section}.content`)
                     .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-(--q-accent) hover:underline'>$1</a>")
                }}
              />
            </section>
          ))}
          
          <div className="pt-12 border-t border-(--q-border) text-center text-(--q-text-2) text-sm font-mono">
             http://www.apache.org/licenses/LICENSE-2.0
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
