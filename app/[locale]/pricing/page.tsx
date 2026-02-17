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
	try {
		const pricing = await getStripePricing(normalizedLocale);
		initialProStripePrice = pricing.formattedPrice;
	} catch (error) {
		console.error("Failed to load Stripe price on pricing page", error);
	}

	return (
		<PricingPageClient
			locale={normalizedLocale}
			initialProStripePrice={initialProStripePrice}
		/>
	);
}
