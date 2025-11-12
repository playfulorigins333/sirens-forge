import { NextRequest, NextResponse } from 'next/server';
import bundle from '@/public/data/prompt_erotique_dev_bundle.json';

const VAULTS = bundle.vault_index;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const input = message.toLowerCase().trim();

    let reply = '';
    let ready = false;

    // Lookup
    if (input.includes('vault') && input.match(/\d+/)) {
      const id = parseInt(input.match(/\d+/)![0]);
      const name = VAULTS[`vault_${id.toString().padStart(2, '0')}`] || `Vault ${id}`;
      reply = `**VAULT ${id} — ${name.toUpperCase()}**
Ultra Mode

**Sample Tags**
• intense grip
• wet shine
• bound pose
• marked skin

**Scene Preview**
She stands in ritual light, eyes daring, body marked...

**READY TO GENERATE**`;
      ready = true;
    }
    // Default
    else {
      reply = `**SIREN MUSE ORACLE**
Try:
• What is in vault 13?
• Build me with vault 7-25
• Use only bondage
• Surprise me with 3 NSFW vaults`;
    }

    return NextResponse.json({ reply, ready });
  } catch {
    return NextResponse.json({ error: 'Oracle error' }, { status: 500 });
  }
}