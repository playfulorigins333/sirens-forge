import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, museId } = await req.json();

    if (!userId || !museId) {
      return NextResponse.json(
        { error: "Missing userId or museId" },
        { status: 400 }
      );
    }

    // Prevent duplicates
    const existing = await prisma.unlockedMuse.findFirst({
      where: { userId, museId }
    });

    if (existing) {
      return NextResponse.json({ ok: true, message: "Already unlocked" });
    }

    await prisma.unlockedMuse.create({
      data: { userId, museId }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unlock Muse error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
