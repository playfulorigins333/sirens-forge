// app/api/stripe/create-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'No priceId' }, { status: 400 });
    }

    // AUTO DETECT TEST MODE BY PRICE ID
    const isTest = priceId.includes('price_1SSIU') || priceId.includes('price_1SSIV');
    const stripeKey = isTest 
      ? process.env.STRIPE_SECRET_KEY_TEST 
      : process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      console.error('Stripe key missing for mode:', isTest ? 'test' : 'live');
      return NextResponse.json({ error: 'Stripe configuration error' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2025-10-29.clover',
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/muses`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}