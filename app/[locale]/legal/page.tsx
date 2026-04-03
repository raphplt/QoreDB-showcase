import type { Metadata } from "next";
import { useTranslation as getTranslation } from "@/app/[locale]/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { LegalPageClient } from "./legal-page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "common");

  return buildPageMetadata({
    locale,
    pathname: "/legal",
    title: t("legal_page.title"),
    description: t("metadata.site_description"),
  });
}

export default function LegalPage() {
  return <LegalPageClient />;
}
