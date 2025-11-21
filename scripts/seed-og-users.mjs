import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// IMPORTANT: fill this with your 25 OG emails (email strings only).
const OG_EMAILS = [
  // "breezycartel@gmail.com",
  // "troglen_hope@yahoo.com",
  // ...
];

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  console.log("Seeding OG users…");

  for (const email of OG_EMAILS) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: "KYLEESCAMS2025",
      email_confirm: true,
      user_metadata: {
        og: true,
        og_tier: "founder",
      },
    });

    if (error) {
      console.error(`❌ Error creating ${email}:`, error.message);
    } else {
      console.log(`✅ Created OG user: ${email} (id=${data.user?.id})`);
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
