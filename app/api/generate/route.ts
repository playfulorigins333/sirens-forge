// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';

const MOCK_BASE_URL = process.env.R2_MOCK_BASE_URL ?? 'https://r2.sirensforge.vip';
const PROCESSING_DELAY_MS = 2000;

function normalizePrompt(prompt: unknown): string {
  if (typeof prompt !== 'string') return '';
  return prompt.trim();
}

function buildMockUrl(prompt: string) {
  const sanitizedPrompt = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/(^-|-$)/g, '') || 'siren';

  return `${MOCK_BASE_URL}/${sanitizedPrompt}-mock.jpg`;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const normalizedPrompt = normalizePrompt(prompt);

    if (!normalizedPrompt) {
      return NextResponse.json(
        { error: 'Please include a prompt describing the siren you want to forge.' },
        { status: 400 },
      );
    }

    await new Promise(resolve => setTimeout(resolve, PROCESSING_DELAY_MS));

    return NextResponse.json({
      url: buildMockUrl(normalizedPrompt),
      prompt: normalizedPrompt,
      status: 'queued',
      etaMs: PROCESSING_DELAY_MS,
    });
  } catch (error) {
    console.error('Failed to generate siren mock:', error);
    return NextResponse.json(
      { error: 'Something went wrong while preparing your siren. Please try again.' },
      { status: 500 },
    );
  }
}
