import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data } = await supabase
    .from('sale_counters')
    .select('*')
    .single();

  return Response.json(data || {
    early_monthly_sold: 0,
    early_lifetime_sold: 0,
    og_throne_sold: 0
  });
}
