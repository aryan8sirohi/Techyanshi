import { useQuery } from '@tanstack/react-query';
import { Users, MessageSquare, Mail, FileText, Star, Briefcase, TrendingUp, Activity } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import { formatDateShort } from '@/lib/utils';

async function fetchStats() {
  const [contacts, newsletter, blog, testimonials, projects] = await Promise.all([
    supabase.from('contacts').select('id, name, email, service, status, created_at').order('created_at', { ascending: false }),
    supabase.from('newsletter_subscribers').select('id, status'),
    supabase.from('blog_posts').select('id, published'),
    supabase.from('testimonials').select('id, published'),
    supabase.from('projects').select('id, published'),
  ]);

  return {
    contacts: contacts.data ?? [],
    newsletter: newsletter.data ?? [],
    blog: blog.data ?? [],
    testimonials: testimonials.data ?? [],
    projects: projects.data ?? [],
  };
}

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchStats,
  });

  const stats = [
    {
      label: 'Total Contacts',
      value: data?.contacts.length ?? 0,
      sub: `${data?.contacts.filter((c: { status: string }) => c.status === 'unread').length ?? 0} unread`,
      icon: <MessageSquare size={20} className="text-accent-400" />,
      color: 'from-accent-500/10 to-accent-600/5 border-accent-500/20',
    },
    {
      label: 'Newsletter Subscribers',
      value: data?.newsletter.filter((n: { status: string }) => n.status === 'active').length ?? 0,
      sub: `${data?.newsletter.length ?? 0} total`,
      icon: <Mail size={20} className="text-success-400" />,
      color: 'from-success-500/10 to-success-600/5 border-success-500/20',
    },
    {
      label: 'Blog Posts',
      value: data?.blog.filter((b: { published: boolean }) => b.published).length ?? 0,
      sub: `${data?.blog.filter((b: { published: boolean }) => !b.published).length ?? 0} drafts`,
      icon: <FileText size={20} className="text-warning-400" />,
      color: 'from-warning-500/10 to-warning-600/5 border-warning-500/20',
    },
    {
      label: 'Testimonials',
      value: data?.testimonials.filter((t: { published: boolean }) => t.published).length ?? 0,
      sub: `${data?.testimonials.length ?? 0} total`,
      icon: <Star size={20} className="text-primary-400" />,
      color: 'from-primary-500/10 to-primary-600/5 border-primary-500/20',
    },
    {
      label: 'Projects',
      value: data?.projects.filter((p: { published: boolean }) => p.published).length ?? 0,
      sub: `${data?.projects.length ?? 0} total`,
      icon: <Briefcase size={20} className="text-accent-300" />,
      color: 'from-accent-300/10 to-accent-400/5 border-accent-300/20',
    },
    {
      label: 'Active Users',
      value: data?.newsletter.filter((n: { status: string }) => n.status === 'active').length ?? 0,
      sub: 'Newsletter subscribers',
      icon: <Users size={20} className="text-success-300" />,
      color: 'from-success-300/10 to-success-400/5 border-success-300/20',
    },
  ];

  const recentContacts = data?.contacts.slice(0, 5) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Dashboard</h1>
        <p className="text-neutral-400 text-sm">Overview of your TechYanshi website metrics.</p>
      </div>

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <StaggerItem key={i}>
            <div className={`glass rounded-2xl p-5 bg-gradient-to-br ${stat.color} border`}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center">
                  {stat.icon}
                </div>
                <TrendingUp size={14} className="text-neutral-600" />
              </div>
              <p className="text-3xl font-bold text-white mb-0.5">
                {isLoading ? '–' : stat.value}
              </p>
              <p className="text-sm font-medium text-neutral-300">{stat.label}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{stat.sub}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Recent contacts */}
      <AnimatedSection>
        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-navy-800/50">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-accent-400" />
              <h2 className="font-semibold text-white">Recent Contact Submissions</h2>
            </div>
            <span className="text-xs text-neutral-500">{data?.contacts.length ?? 0} total</span>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin mx-auto" />
            </div>
          ) : recentContacts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-neutral-500 text-sm">No contact submissions yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-navy-800/50">
              {recentContacts.map((contact: { id: string; status: string; created_at: string; name?: string; email?: string; service?: string }) => (
                <div key={contact.id} className="flex items-center gap-4 px-6 py-3 hover:bg-white/2 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {(contact.name ?? 'U')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{contact.name ?? 'Unknown'}</p>
                    <p className="text-xs text-neutral-500 truncate">{contact.email} · {contact.service}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      contact.status === 'unread'
                        ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
                        : contact.status === 'replied'
                        ? 'bg-success-500/10 text-success-400 border border-success-500/20'
                        : 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20'
                    }`}>
                      {contact.status}
                    </span>
                    <span className="text-xs text-neutral-600">{formatDateShort(contact.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
