import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const OG_EMAILS = [
  "BreezyCartel@gmail.com",
  "troglen_hope@yahoo.com",
  "ohsnapitsmimi@gmail.com",
  "Rolita.teague@gmail.com",
  "Allie6798@hotmail.com",
  "missmullenger20@gmail.com",
  "Kalisweets@gmail.com",
  "Jatoi.moore@gmail.com",
  "matt@matthewtims.com",
  "lwinbush@gmail.com",
  "sasharaywoods@gmail.com",
  "SydneeRayshel@gmail.com",
  "Adrian@thevicesolution.com",
  "kenh007@gmail.com",
  "harveysusan155@gmail.com",
  "rberry0822@gmail.com",
  "Kingsley.Cartwright@gmail.com",
  "Wealthydigitalco@gmail.com",
  "Debdeb19@gmail.com",
  "digitalbygrace@gmail.com",
  "Julieawheeler88@gmail.com"
];

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  console.log('Creating OG users...');

  for (const email of OG_EMAILS) {
    const referralCode = email.split('@')[0];

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: 'KYLEESCAMS2025',
      email_confirm: true,
      user_metadata: {
        tier: 'og',
        beta: true,
        unlimited_tokens: true,
        max_video_seconds: 25,
        password_reset_required: true,
        referral_code: referralCode,
        referral_tier: 'og',
      },
    });

    if (error) {
      console.error(`❌ Error creating ${email}:`, error.message);
      continue;
    }

    console.log(`✅ Created OG user: ${email} (id=${data.user?.id})`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
