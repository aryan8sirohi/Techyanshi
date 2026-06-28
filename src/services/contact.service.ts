import { supabase } from '@/lib/supabase';
import type { ContactFormData, Contact } from '@/types';

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const { error } = await supabase.from('contacts').insert({
    name: data.name,
    company: data.company || null,
    email: data.email,
    phone: data.phone || null,
    country: data.country || null,
    service: data.service || null,
    budget: data.budget || null,
    message: data.message,
    status: 'unread',
  });

  if (error) throw new Error(error.message);
}

export async function getContacts(page = 1, pageSize = 20): Promise<{ data: Contact[]; count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('contacts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { data: (data as Contact[]) || [], count: count || 0 };
}

export async function updateContactStatus(id: string, status: string): Promise<void> {
  const { error } = await supabase.from('contacts').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase.from('contacts').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
