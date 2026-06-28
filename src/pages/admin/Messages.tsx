import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, Eye, CheckCheck, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { getContacts, updateContactStatus, deleteContact } from '@/services/contact.service';
import { formatDateShort } from '@/lib/utils';
import type { Contact } from '@/types';

export default function Messages() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: () => getContacts(1, 100),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateContactStatus(id, status),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-contacts'] }); qc.invalidateQueries({ queryKey: ['admin-stats'] }); },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => { toast.success('Deleted'); qc.invalidateQueries({ queryKey: ['admin-contacts'] }); qc.invalidateQueries({ queryKey: ['admin-stats'] }); },
  });

  const contacts = data?.data ?? [];
  const filtered = contacts.filter(c => {
    const matchFilter = filter === 'all' || c.status === filter;
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Contact Messages</h1>
        <p className="text-neutral-400 text-sm">{data?.count ?? 0} total submissions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="input-field pl-10 text-sm py-2.5"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'unread', 'read', 'replied'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                filter === f ? 'bg-accent-500 text-white' : 'glass text-neutral-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare size={40} className="text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-500">No messages found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-800/50 text-xs text-neutral-500 uppercase tracking-wider">
                  <th className="text-left px-4 py-3">Sender</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Service</th>
                  <th className="text-left px-4 py-3 hidden lg:table-cell">Budget</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/30">
                {filtered.map(contact => (
                  <ContactRow
                    key={contact.id}
                    contact={contact}
                    onUpdateStatus={(id, status) => updateMutation.mutate({ id, status })}
                    onDelete={id => {
                      if (window.confirm('Delete this message?')) deleteMutation.mutate(id);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactRow({
  contact,
  onUpdateStatus,
  onDelete,
}: {
  contact: Contact;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className="hover:bg-white/2 transition-colors cursor-pointer"
        onClick={() => { setExpanded(e => !e); if (contact.status === 'unread') onUpdateStatus(contact.id, 'read'); }}
      >
        <td className="px-4 py-3">
          <div>
            <p className="font-medium text-white">{contact.name}</p>
            <p className="text-xs text-neutral-500">{contact.email}</p>
            {contact.company && <p className="text-xs text-neutral-600">{contact.company}</p>}
          </div>
        </td>
        <td className="px-4 py-3 hidden md:table-cell text-neutral-400">{contact.service ?? '—'}</td>
        <td className="px-4 py-3 hidden lg:table-cell text-neutral-400">{contact.budget ?? '—'}</td>
        <td className="px-4 py-3 hidden sm:table-cell text-neutral-500 text-xs">{formatDateShort(contact.created_at)}</td>
        <td className="px-4 py-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            contact.status === 'unread' ? 'bg-accent-500/10 text-accent-400' :
            contact.status === 'replied' ? 'bg-success-500/10 text-success-400' :
            'bg-neutral-500/10 text-neutral-400'
          }`}>
            {contact.status}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => onUpdateStatus(contact.id, 'replied')}
              className="p-1.5 hover:bg-success-500/10 rounded-lg text-neutral-500 hover:text-success-400 transition-all"
              title="Mark as replied"
            >
              <CheckCheck size={14} />
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="p-1.5 hover:bg-error-500/10 rounded-lg text-neutral-500 hover:text-error-400 transition-all"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6} className="px-4 pb-4 bg-navy-900/30">
            <div className="glass rounded-xl p-4 mt-1">
              <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Message</p>
              <p className="text-sm text-neutral-300 leading-relaxed">{contact.message}</p>
              {contact.phone && <p className="text-xs text-neutral-500 mt-2">Phone: {contact.phone}</p>}
              {contact.country && <p className="text-xs text-neutral-500">Country: {contact.country}</p>}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
