import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  if (!session) return Response.json({ total: 0 });

  const commissions = await prisma.commission.findMany({
    where: { userId: session, paid: false },
  });

  const total = commissions.reduce((sum, c) => sum + c.amount, 0);

  return Response.json({ total });
}