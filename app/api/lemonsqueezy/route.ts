import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(req: Request) {
  const rawBody = await req.text();
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;
  const signature = req.headers.get('x-signature');

  if (!signature) return new Response('No signature', { status: 400 });

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(rawBody);
  const expected = hmac.digest('hex');

  if (signature !== expected) {
    return new Response('Invalid signature', { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const productName = payload.data.attributes.product_name;

  // MAP TIERS — 333 BLEED EDITION
  const tierMap: Record<string, string> = {
    "Early Bird – $29.99/mo": "early_monthly",
    "EARLY BIRD LIFETIME — $299": "early_lifetime",
    "OG Eternal Throne – LAST 10/35": "og_throne"
  };

  const tier = tierMap[productName] || "other";

  // SAVE TO SUPABASE — COUNTER BLEEDS LIVE
  await supabase.from('purchases').insert({
    user_email: payload.data.attributes.user_email,
    amount: payload.data.attributes.total,
    product: productName,
    tier: tier,
    created_at: new Date()
  });

  return NextResponse.json({ received: true });
}
