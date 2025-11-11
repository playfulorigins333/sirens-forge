// app/api/stripe/create-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// CRITICAL: Log key load
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'LOADED' : 'MISSING');

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing!');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
});

export async function POST(req: NextRequest) {
  console.log('STRIPE ROUTE HIT');
  try {
    const body = await req.json();
    console.log('Request body:', body);

    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'No priceId' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: priceId.startsWith('price_1SRxiN') ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/pricing`,
    });

    console.log('Stripe session created:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}