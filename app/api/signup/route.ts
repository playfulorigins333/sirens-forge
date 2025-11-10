import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import shortid from 'shortid';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const refFromCookie = req.cookies.get('ref')?.value;

  const refCode = shortid.generate().toLowerCase();

  const user = await prisma.user.create({
    data: {
      email,
      refCode,
      referredBy: refFromCookie || null,
    },
  });

  const response = NextResponse.json({ success: true, refCode });
  response.cookies.set('session', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 90 * 24 * 60 * 60,
    path: '/',
  });

  return response;
}