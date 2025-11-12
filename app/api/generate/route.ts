// app/api/generate/route.ts
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  // Mock R2 delivery — replace with real AI later
  const mockUrl = 'https://r2.sirensforge.vip/mock-siren.jpg';
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return Response.json({ url: mockUrl });
}