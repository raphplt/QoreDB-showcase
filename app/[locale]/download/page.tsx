import { useTranslation as getTranslation } from "@/app/[locale]/i18n";
import { DownloadSection } from "@/components/download/download-section";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["common"];

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources } = await getTranslation(locale, "common");

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        <Header />
        <DownloadSection />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
