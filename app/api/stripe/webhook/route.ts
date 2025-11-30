import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs"; // required for Stripe signature

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new Response(`Webhook signature error: ${err.message}`, { status: 400 });
  }

  // Handle completed checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const userId = session.metadata?.userId;
    const museId = session.metadata?.museId;
    const pkg = session.metadata?.package;

    if (!userId || !museId || !pkg) {
      return NextResponse.json({ status: "missing_metadata" });
    }

    // Insert the unlock row
    await supabaseAdmin.from("muse_unlocks").upsert({
      user_id: userId,
      muse_id: museId,
      package: pkg,
      purchase_id: session.id,
      unlocked_at: new Date().toISOString(),
    });

    return NextResponse.json({ status: "unlocked" });
  }

  return NextResponse.json({ received: true });
}
