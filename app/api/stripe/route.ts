// app/api/create-checkout/route.ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(req: Request) {
  const { priceId, tier } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: priceId.includes('sub_') ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: 'https://sirensforge.vip/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://sirensforge.vip',
    metadata: { tier },
  });

  return NextResponse.json({ url: session.url });
}
