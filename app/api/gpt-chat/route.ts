import { NextRequest, NextResponse } from 'next/server';
import { getVault, getVaultName } from '@/lib/vaults';

const ULTRA_TAGS: Record<number, string[]> = {
  25: ["tail plug wagging", "leash tug", "kennel training", "good pet praise"],
  13: ["beads yanked", "cum leaking", "marked owned", "tail twitching"],
  7: ["suspension", "breath play", "wax on ropes", "shibari knots"],
};

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const input = message.toLowerCase().trim();

    let reply = '';
    let ready = false;
    let stack: number[] = [];
    let prompt = '';

    if (input.includes('vault') && input.match(/\d+/)) {
      const id = parseInt(input.match(/\d+/)![0]);
      const name = getVaultName(id);
      const tags = ULTRA_TAGS[id] || ["intense", "wet", "bound", "exposed"];

      reply = `VAULT ${id} — ${name.toUpperCase()}
Ultra Mode

TAGS
${tags.map(t => `• ${t}`).join('\n')}

SCENE PREVIEW
She kneels in the steel crate, tail plug twitching with every breath...

READY TO GENERATE`;

      ready = true;
      prompt = `${name} — ultra detail, 4K, cinematic, wet, bound`;
    }

    else if (input.includes('+') || input.includes('stack') || input.includes('build me')) {
      const ids = (input.match(/\d+/g) || []).map(Number);
      stack = ids;
      const names = ids.map(getVaultName);

      reply = `STACK: ${names.map(n => n.toUpperCase()).join(' + ')}
Ultra Fusion

COMBINED TAGS
${ids.flatMap(id => ULTRA_TAGS[id] || []).slice(0, 6).map(t => `• ${t}`).join('\n')}

SCENE PREVIEW
Bound in shibari, tail plug pulsing, fluids drip as the crowd watches...

READY TO GENERATE`;

      ready = true;
      prompt = `${names.join(', ')} — ultra fusion, 4K, wet, cinematic`;
    }

    else {
      reply = `SIREN MUSE ORACLE
Try:
• Show me vault 25
• Build me with vault 7-25
• Use only bondage
• Surprise me with 3 NSFW vaults`;
    }

    return NextResponse.json({ reply, ready, stack, prompt });
  } catch {
    return NextResponse.json({ error: 'Oracle error' }, { status: 500 });
  }
}