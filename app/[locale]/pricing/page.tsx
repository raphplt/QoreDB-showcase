import PricingPageClient from "@/components/pricing/pricing-page-client";
import { getStripePricing } from "@/lib/stripe/pricing";

export default async function PricingPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const normalizedLocale = locale === "en" ? "en" : "fr";

	let initialProStripePrice: string | null = null;
	let initialProOriginalPrice: string | null = null;
	try {
		const pricing = await getStripePricing(normalizedLocale);
		initialProStripePrice = pricing.formattedPrice;
		const doubled = new Intl.NumberFormat(
			normalizedLocale === "en" ? "en-US" : "fr-FR",
			{ style: "currency", currency: pricing.currency },
		).format((pricing.unitAmount * 2) / 100);
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
