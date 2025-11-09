import { NextResponse } from 'next/server';
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
  console.log('LemonSqueezy webhook received:', payload.event_name, payload.data);

  // TODO: Add Supabase insert + R2 signed URL email here
  return NextResponse.json({ received: true });
}
