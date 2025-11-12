import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const input = message.toLowerCase().trim();

    let reply = '';
    let ready = false;

    if (input.includes('vault') && input.match(/\d+/)) {
      const id = parseInt(input.match(/\d+/)![0]);
      reply = `VAULT ${id} — PETPLAY & DISCIPLINE
Ultra Mode

TAGS
• tail plug wagging
• leash tug
• kennel training
• good pet praise

SCENE PREVIEW
She kneels in the steel crate, tail plug twitching with every breath...

READY TO GENERATE`;
      ready = true;
    } else {
      reply = `SIREN MUSE ORACLE
Try:
• What is in vault 13?
• Build me with vault 5-10-25
• Use only bondage
• Surprise me with 3 NSFW vaults`;
    }

    // FORCE NO &quot; — EVER
    reply = reply.replace(/"/g, '"');

    return NextResponse.json({ reply, ready });
  } catch {
    return NextResponse.json({ error: 'Oracle error' }, { status: 500 });
  }
}