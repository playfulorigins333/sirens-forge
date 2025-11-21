import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

type CheckoutBody = {
  museId: string;
  priceId: string;        // Stripe price_xxx id
  mode?: "payment" | "subscription";
  packageId?: string;     // optional internal id like "vault_starter" etc
  successUrl?: string;
  cancelUrl?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutBody;

    const { museId, priceId, mode = "payment", packageId, successUrl, cancelUrl } = body;

    if (!museId || !priceId) {
      return NextResponse.json(
        { error: "museId and priceId are required." },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured on the server." },
        { status: 500 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url:
        successUrl ||
        `${siteUrl}/forge/success?museId=${encodeURIComponent(
          museId
        )}&package=${encodeURIComponent(packageId || "")}`,
      cancel_url:
        cancelUrl ||
        `${siteUrl}/forge/cancel?museId=${encodeURIComponent(museId)}`,
      metadata: {
        museId,
        packageId: packageId || "",
        type: "muse_checkout",
      },
    });

    return NextResponse.json(
      { id: session.id, url: session.url },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Muse checkout error:", err);
    return NextResponse.json(
      {
        error: "Failed to create checkout session.",
        detail: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
