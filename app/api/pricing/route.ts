import { NextResponse } from "next/server";
import { normalizeLocale } from "@/lib/locale";
import {
  getStripePricing,
  type StripePricingPayload,
} from "@/lib/stripe/pricing";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = normalizeLocale(searchParams.get("locale"));
    const payload: StripePricingPayload = await getStripePricing(locale);

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to fetch Stripe price", error);
    return NextResponse.json(
      { error: "Unable to fetch Stripe price" },
      { status: 500 },
    );
  }
}
