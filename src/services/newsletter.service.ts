import { supabase } from '@/lib/supabase';

export async function subscribeNewsletter(email: string): Promise<void> {
  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('id, status')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    if (existing.status === 'active') {
      throw new Error('This email is already subscribed.');
    }
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ status: 'active' })
      .eq('id', existing.id);
    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email,
    status: 'active',
  });

  if (error) throw new Error(error.message);
}

export async function getSubscribers(
  page = 1,
  pageSize = 20
): Promise<{ data: Array<{ id: string; email: string; status: string; created_at: string }>; count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { data: data || [], count: count || 0 };
}

export async function deleteSubscriber(id: string): Promise<void> {
  const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
