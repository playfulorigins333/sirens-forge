import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const OG_EMAILS = [
  "gag.mule.9353846@inboxify.me",
  "gavin.townsend1999@gmail.com",
  "krisrockson@gmail.com",
  "joshezell7@gmail.com",
  "anthonydonnelljrphotos@gmail.com",
  "kyle@onlysocialai.com",
  "officialbeachbarbie@gmail.com",
  "noritaromero93@gmail.com",
  "joefierlin@gmail.com",
  "suspence1224@gmail.com",
  "michael.gatt77@gmail.com",
  "coingspot07@gmail.com",
  "yamoahfrancis49@gmail.com",
  "jerrymememe123@gmail.com",
  "chrisandalexiapro@gmail.com",
  "nxowa@gmail.com",
  "jacobrushing@gmail.com",
  "alonso.erik1694@gmail.com",
  "adamabbott714@gmail.com",
  "roycedanielson99@gmail.com"
];

export async function GET() {
  const results = [];

  for (const email of OG_EMAILS) {
    // Try to create account
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: "KYLEESCAMS2025",
      email_confirm: true
    });

    if (error && !error.message.includes("already registered")) {
      results.push({ email, status: "error", error: error.message });
      continue;
    }

    // Update profile to set OG flag
    await supabaseAdmin.from("profiles").upsert({
      id: data?.user?.id,
      email,
      og: true,
      created_at: new Date().toISOString()
    });

    results.push({ email, status: "ok" });
  }

  return NextResponse.json({ results });
}
