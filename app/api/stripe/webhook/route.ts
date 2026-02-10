import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new NextResponse("Missing signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const email = session.customer_details?.email;
      const museId = session.metadata?.museId;
      const tier = session.metadata?.tier;

      if (email && museId) {
        await supabaseAdmin.from("user_muses").insert({
          email,
          muse_id: museId,
          package_tier: tier,
          created_at: new Date().toISOString()
        });
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
