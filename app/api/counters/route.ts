// app/api/counters/route.ts
import { NextResponse } from 'next/server';

// TEMP: Bypass Supabase for launch
export async function GET() {
  return NextResponse.json({
    og: 120,
    lifetime: 35,
    early: 50,
    thrones: 10,
  });
}