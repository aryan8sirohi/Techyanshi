import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, Trash2, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { getSubscribers, deleteSubscriber } from '@/services/newsletter.service';
import { formatDateShort } from '@/lib/utils';

export default function Newsletter() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-newsletter'],
    queryFn: () => getSubscribers(1, 100),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubscriber,
    onSuccess: () => {
      toast.success('Subscriber removed');
      qc.invalidateQueries({ queryKey: ['admin-newsletter'] });
      qc.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });

  const subscribers = data?.data ?? [];
  const active = subscribers.filter(s => s.status === 'active').length;

  const handleExport = () => {
    const csv = ['Email,Status,Subscribed At', ...subscribers.map(s => `${s.email},${s.status},${s.created_at}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Newsletter Subscribers</h1>
          <p className="text-neutral-400 text-sm">{active} active out of {subscribers.length} total</p>
        </div>
        <button onClick={handleExport} className="btn-secondary text-sm">
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <p className="text-3xl font-bold stat-number">{active}</p>
          <p className="text-sm text-neutral-400">Active Subscribers</p>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-3xl font-bold text-white">{subscribers.filter(s => s.status === 'unsubscribed').length}</p>
          <p className="text-sm text-neutral-400">Unsubscribed</p>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin mx-auto" /></div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 text-center">
            <Mail size={40} className="text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-500">No subscribers yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-800/50 text-xs text-neutral-500 uppercase tracking-wider">
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Subscribed</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/30">
                {subscribers.map(sub => (
                  <tr key={sub.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center">
                          <Mail size={13} className="text-accent-400" />
                        </div>
                        <span className="font-medium text-white">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        sub.status === 'active'
                          ? 'bg-success-500/10 text-success-400 border border-success-500/20'
                          : 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-neutral-500 text-xs">
                      {formatDateShort(sub.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm('Remove this subscriber?')) deleteMutation.mutate(sub.id);
                        }}
                        className="p-1.5 hover:bg-error-500/10 rounded-lg text-neutral-500 hover:text-error-400 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
