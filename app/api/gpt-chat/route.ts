import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const reply = `I understand vault commands. Try:
• What is in vault 13?
• Build me with vault 5-10-25
• Use only bondage
• Surprise me with 3 NSFW vaults`;

    return NextResponse.json({ reply, ready: false });
  } catch {
    return NextResponse.json({ error: 'Oracle error' }, { status: 500 });
  }
}