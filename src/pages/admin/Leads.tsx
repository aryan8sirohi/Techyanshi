import { useQuery } from '@tanstack/react-query';
import { Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatDateShort } from '@/lib/utils';
import type { Contact } from '@/types';

export default function Leads() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: async () => {
      const { data, count } = await supabase
        .from('contacts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      return { data: (data ?? []) as Contact[], count: count ?? 0 };
    },
  });

  const contacts = data?.data ?? [];

  const statuses = ['unread', 'read', 'replied'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Lead Management</h1>
        <p className="text-neutral-400 text-sm">{data?.count ?? 0} total leads from contact form</p>
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-3 gap-3">
        {statuses.map(status => {
          const count = contacts.filter(c => c.status === status).length;
          const colors: Record<string, string> = {
            unread: 'from-accent-500/10 to-accent-600/5 border-accent-500/20 text-accent-400',
            read: 'from-neutral-500/10 to-neutral-600/5 border-neutral-500/20 text-neutral-400',
            replied: 'from-success-500/10 to-success-600/5 border-success-500/20 text-success-400',
          };
          return (
            <div key={status} className={`glass rounded-xl p-4 bg-gradient-to-br border ${colors[status]}`}>
              <p className="text-2xl font-bold text-white">{count}</p>
              <p className={`text-xs font-semibold capitalize ${colors[status].split(' ')[3]}`}>{status}</p>
            </div>
          );
        })}
      </div>

      {/* Lead cards */}
      <div className="glass rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin mx-auto" /></div>
        ) : contacts.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={40} className="text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-500">No leads yet</p>
          </div>
        ) : (
          <div className="divide-y divide-navy-800/30">
            {contacts.map(contact => (
              <div key={contact.id} className="px-5 py-4 hover:bg-white/2 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {contact.name[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-white">{contact.name}</p>
                      <p className="text-xs text-neutral-500">{contact.email}{contact.company ? ` — ${contact.company}` : ''}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {contact.service && (
                      <span className="px-2.5 py-1 glass rounded-full text-accent-300 border border-accent-500/20">{contact.service}</span>
                    )}
                    {contact.budget && (
                      <span className="px-2.5 py-1 glass rounded-full text-success-300 border border-success-500/20">{contact.budget}</span>
                    )}
                    <span className={`px-2.5 py-1 rounded-full font-medium ${
                      contact.status === 'unread' ? 'bg-accent-500/10 text-accent-400' :
                      contact.status === 'replied' ? 'bg-success-500/10 text-success-400' :
                      'bg-neutral-500/10 text-neutral-400'
                    }`}>
                      {contact.status}
                    </span>
                    <span className="text-neutral-600">{formatDateShort(contact.created_at)}</span>
                  </div>
                </div>
                {contact.message && (
                  <p className="mt-2 text-xs text-neutral-500 line-clamp-2 ml-13">{contact.message}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
