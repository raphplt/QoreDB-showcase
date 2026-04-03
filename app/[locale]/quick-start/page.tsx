import type { Metadata } from "next";
import { useTranslation as getTranslation } from "@/app/[locale]/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { QuickStartPageClient } from "./quick-start-page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "common");

  return buildPageMetadata({
    locale,
    pathname: "/quick-start",
    title: t("quick_start_page.title"),
    description: t("quick_start_page.description"),
  });
}

export default function QuickStartPage() {
  return <QuickStartPageClient />;
}
