import type { Metadata } from "next";
import { useTranslation as getTranslation } from "@/app/[locale]/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { LicensePageClient } from "./license-page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "common");

  return buildPageMetadata({
    locale,
    pathname: "/license",
    title: t("license_management.title"),
    description: t("license_management.subtitle"),
    noIndex: true,
  });
}

export default function LicensePage() {
  return <LicensePageClient />;
}
