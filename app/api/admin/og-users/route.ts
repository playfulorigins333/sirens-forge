import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const users = (data?.users || []).filter((user) => {
    const metadata = user.user_metadata || {};
    return metadata.tier === 'og' || metadata.beta === true;
  }).map((user) => ({
    id: user.id,
    email: user.email,
    created_at: user.created_at,
    first_login: user.user_metadata?.first_login || null,
    password_reset_required: user.user_metadata?.password_reset_required ?? false,
    referral_code: user.user_metadata?.referral_code || null,
    tier: user.user_metadata?.tier || null,
  }));

  return NextResponse.json({ users });
}
