import { getStripeClient } from "@/lib/stripe/server";

export type StripePricingPayload = {
	formattedPrice: string;
	currency: string;
	unitAmount: number;
};

const getIntlLocale = (locale: string) =>
	locale === "en" ? "en-US" : "fr-FR";

export async function getStripePricing(locale: string): Promise<StripePricingPayload> {
	const stripePriceId = process.env.STRIPE_PRICE_ID;
	if (!stripePriceId) {
		throw new Error("STRIPE_PRICE_ID is missing");
	}

	const stripe = getStripeClient();
	const price = await stripe.prices.retrieve(stripePriceId);
	if (price.unit_amount == null) {
		throw new Error("Stripe price has no unit_amount");
	}

	const currency = price.currency.toUpperCase();
	const unitAmount = price.unit_amount;
	const formattedPrice = new Intl.NumberFormat(getIntlLocale(locale), {
		style: "currency",
		currency,
	}).format(unitAmount / 100);

	return {
		formattedPrice,
		currency,
		unitAmount,
	};
}
