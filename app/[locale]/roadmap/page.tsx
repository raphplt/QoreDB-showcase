import type { Metadata } from "next";
import { useTranslation as getTranslation } from "@/app/[locale]/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { RoadmapPageClient } from "./roadmap-page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "common");

  return buildPageMetadata({
    locale,
    pathname: "/roadmap",
    title: t("roadmap_page.title"),
    description: t("roadmap_page.subtitle"),
  });
}

export default function RoadmapPage() {
  return <RoadmapPageClient />;
}
