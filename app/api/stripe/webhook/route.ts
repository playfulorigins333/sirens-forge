import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs"; 
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const sig = headers().get("stripe-signature");

    if (!sig) {
      return new NextResponse("Missing signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const museId = session.metadata?.museId;
      const userEmail = session.customer_details?.email;

      if (userEmail && museId) {
        await supabaseAdmin
          .from("user_muses")
          .insert({
            email: userEmail,
            muse_id: museId,
            package_tier: session.metadata?.tier,
            created_at: new Date().toISOString(),
          })
          .select();
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }
}
