import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature") || "";

    // TODO: In a later step, verify signature with Stripe and process events.
    // For now, we just log and return 200 so Stripe sees this as "received".

    console.log("[Stripe webhook] received payload length:", rawBody.length);
    console.log("[Stripe webhook] signature present:", !!sig);

    // Very light parse attempt (non-fatal if fails)
    try {
      const json = JSON.parse(rawBody);
      const type = json?.type;
      const session = json?.data?.object;

      if (type === "checkout.session.completed") {
        console.log("[Stripe webhook] checkout.session.completed", {
          id: session?.id,
          museId: session?.metadata?.museId,
          packageId: session?.metadata?.packageId,
        });

        // TODO (D6.3+):
        // - Mark muse as unlocked for user in DB
        // - Kick off R2 package delivery job
        // - Notify "My Muses" dashboard
      }
    } catch (e) {
      console.warn("[Stripe webhook] Failed to JSON-parse payload:", e);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("[Stripe webhook] error:", err);
    return NextResponse.json(
      { error: "Webhook handler error", detail: err?.message },
      { status: 500 }
    );
  }
}
