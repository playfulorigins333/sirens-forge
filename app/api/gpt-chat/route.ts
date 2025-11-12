import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const VAULTS_DIR = path.join(process.cwd(), 'public/vaults');

interface VaultData {
  id: number;
  name: string;
  ultra: string[];
}

const loadVaults = (): VaultData[] => {
  const files = fs.readdirSync(VAULTS_DIR).filter(f => f.includes('combined_Vault'));
  const vaults: VaultData[] = [];

  files.forEach(file => {
    const content = fs.readFileSync(path.join(VAULTS_DIR, file), 'utf8');
    const { data } = matter(content);
    const match = file.match(/combined_Vault[_\s]?#?(\d+)-(\d+)/i);
    if (match) {
      const start = parseInt(match[1]);
      const end = parseInt(match[2]);
      for (let i = start; i <= end; i++) {
        const vaultKey = `vault_${i.toString().padStart(2, '0')}`;
        const name = data[vaultKey] || `Vault ${i}`;
        const ultra = extractUltraTags(content, i);
        vaults.push({ id: i, name, ultra });
      }
    }
  });

  return vaults;
};

const extractUltraTags = (content: string, vaultId: number): string[] => {
  const lines = content.split('\n');
  const tags: string[] = [];
  let inUltra = false;

  for (const line of lines) {
    if (line.includes(`Vault ${vaultId}`) && line.includes('Ultra')) {
      inUltra = true;
      continue;
    }
    if (inUltra && line.startsWith('- ')) {
      tags.push(line.slice(2).trim());
    }
    if (inUltra && line.startsWith('##')) {
      break;
    }
  }

  return tags.slice(0, 6);
};

let CACHED_VAULTS: VaultData[] | null = null;

export async function POST(req: NextRequest) {
  try {
    if (!CACHED_VAULTS) CACHED_VAULTS = loadVaults();
    const vaults = CACHED_VAULTS;

    const { message } = await req.json();
    const input = message.toLowerCase().trim();

    let reply = '';
    let ready = false;
    let prompt = '';

    if (input.includes('vault') && input.match(/\d+/)) {
      const id = parseInt(input.match(/\d+/)![0]);
      const vault = vaults.find(v => v.id === id);
      if (vault) {
        reply = `VAULT ${id} — ${vault.name.toUpperCase()}
Ultra Mode

TAGS
${vault.ultra.map(t => `• ${t}`).join('\n') || '• intense • wet • bound'}

SCENE PREVIEW
She stands in ritual light, eyes daring, body marked...

READY TO GENERATE`;
        ready = true;
        prompt = `${vault.name} — ultra, 4K, cinematic, wet`;
      }
    } else {
      reply = `SIREN MUSE ORACLE
Try:
• What is in vault 13?
• Build me with vault 7-25
• Surprise me with 3 NSFW vaults`;
    }

    return NextResponse.json({ reply, ready, prompt });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Oracle error' }, { status: 500 });
  }
}