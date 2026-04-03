import type { Metadata } from "next";
import { useTranslation as getTranslation } from "@/app/[locale]/i18n";
import PricingPageClient from "@/components/pricing/pricing-page-client";
import { getIntlLocale, normalizeLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import { getStripePricing } from "@/lib/stripe/pricing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "common");

  return buildPageMetadata({
    locale,
    pathname: "/pricing",
    title: t("pricing_page.title"),
    description: t("pricing_page.subtitle"),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  let initialProStripePrice: string | null = null;
  let initialProOriginalPrice: string | null = null;
  try {
    const pricing = await getStripePricing(normalizedLocale);
    initialProStripePrice = pricing.formattedPrice;
    const doubled = new Intl.NumberFormat(getIntlLocale(normalizedLocale), {
      style: "currency",
      currency: pricing.currency,
    }).format((pricing.unitAmount * 2) / 100);
    initialProOriginalPrice = doubled;
  } catch (error) {
    console.error("Failed to load Stripe price on pricing page", error);
  }

  return (
    <PricingPageClient
      locale={normalizedLocale}
      initialProStripePrice={initialProStripePrice}
      initialProOriginalPrice={initialProOriginalPrice}
    />
  );
}
