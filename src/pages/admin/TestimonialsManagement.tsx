import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Star, StarOff, Quote, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { formatDateShort } from '@/lib/utils';
import type { Testimonial } from '@/types';

async function fetchTestimonials() {
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Testimonial[];
}

interface FormState {
  author_name: string;
  author_title: string;
  company: string;
  avatar_url: string;
  quote: string;
  rating: number;
  service: string;
  featured: boolean;
  published: boolean;
}

const defaultForm: FormState = {
  author_name: '',
  author_title: '',
  company: '',
  avatar_url: '',
  quote: '',
  rating: 5,
  service: '',
  featured: false,
  published: false,
};

export default function TestimonialsManagement() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: fetchTestimonials,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: FormState) => {
      const payload = {
        ...data,
        rating: Math.min(5, Math.max(1, data.rating)),
      };
      if (editing) {
        const { error } = await supabase.from('testimonials').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('testimonials').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? 'Testimonial updated!' : 'Testimonial created!');
      qc.invalidateQueries({ queryKey: ['admin-testimonials'] });
      qc.invalidateQueries({ queryKey: ['admin-stats'] });
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const togglePublish = async (testimonial: Testimonial) => {
    await supabase.from('testimonials').update({ published: !testimonial.published }).eq('id', testimonial.id);
    qc.invalidateQueries({ queryKey: ['admin-testimonials'] });
    qc.invalidateQueries({ queryKey: ['admin-stats'] });
  };

  const toggleFeatured = async (testimonial: Testimonial) => {
    await supabase.from('testimonials').update({ featured: !testimonial.featured }).eq('id', testimonial.id);
    qc.invalidateQueries({ queryKey: ['admin-testimonials'] });
  };

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    toast.success('Deleted');
    qc.invalidateQueries({ queryKey: ['admin-testimonials'] });
    qc.invalidateQueries({ queryKey: ['admin-stats'] });
  };

  const openEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    setForm({
      author_name: testimonial.author_name,
      author_title: testimonial.author_title ?? '',
      company: testimonial.company ?? '',
      avatar_url: testimonial.avatar_url ?? '',
      quote: testimonial.quote,
      rating: testimonial.rating,
      service: testimonial.service ?? '',
      featured: testimonial.featured,
      published: testimonial.published,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Testimonials</h1>
          <p className="text-neutral-400 text-sm">{testimonials.length} testimonials</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
          className="btn-primary text-sm"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="glass rounded-2xl w-full max-w-2xl my-8 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Author Name *</label>
                  <input
                    type="text"
                    value={form.author_name}
                    onChange={e => setForm(f => ({ ...f, author_name: e.target.value }))}
                    placeholder="Jane Doe"
                    className="input-field text-sm py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={form.author_title}
                    onChange={e => setForm(f => ({ ...f, author_title: e.target.value }))}
                    placeholder="CEO, Founder, etc."
                    className="input-field text-sm py-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="Company name"
                    className="input-field text-sm py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Service</label>
                  <input
                    type="text"
                    value={form.service}
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    placeholder="Data Analytics, Dashboard..."
                    className="input-field text-sm py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Avatar URL</label>
                <input
                  type="url"
                  value={form.avatar_url}
                  onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))}
                  placeholder="https://..."
                  className="input-field text-sm py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Quote *</label>
                <textarea
                  rows={4}
                  value={form.quote}
                  onChange={e => setForm(f => ({ ...f, quote: e.target.value }))}
                  placeholder="What did the client say about their experience..."
                  className="input-field text-sm resize-y"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-2">Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                      className={`p-1.5 rounded-lg transition-all ${form.rating >= star ? 'text-warning-400 hover:bg-warning-500/10' : 'text-neutral-600 hover:bg-neutral-500/10'}`}
                    >
                      <Star size={20} fill={form.rating >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-neutral-300">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-neutral-300">Featured</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => saveMutation.mutate(form)}
                disabled={!form.author_name || !form.quote || saveMutation.isPending}
                className="btn-primary text-sm flex-1 justify-center disabled:opacity-50"
              >
                <Save size={14} />
                {saveMutation.isPending ? 'Saving...' : 'Save Testimonial'}
              </button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-secondary text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials list */}
      <div className="glass rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin mx-auto" /></div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <Quote size={40} className="text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-500">No testimonials yet. Add your first client review!</p>
          </div>
        ) : (
          <div className="divide-y divide-navy-800/30">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="flex items-start gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                {testimonial.avatar_url ? (
                  <img src={testimonial.avatar_url} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accent-gradient flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {testimonial.author_name[0].toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-white">{testimonial.author_name}</p>
                      {testimonial.author_title && (
                        <p className="text-xs text-neutral-500">{testimonial.author_title}{testimonial.company ? `, ${testimonial.company}` : ''}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={12}
                          className={testimonial.rating >= star ? 'text-warning-400' : 'text-neutral-700'}
                          fill={testimonial.rating >= star ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400 mt-1 line-clamp-2">{testimonial.quote}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {testimonial.service && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-300 border border-accent-500/20">
                        {testimonial.service}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${testimonial.published ? 'bg-success-500/10 text-success-400' : 'bg-neutral-500/10 text-neutral-500'}`}>
                      {testimonial.published ? 'Published' : 'Draft'}
                    </span>
                    {testimonial.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleFeatured(testimonial)}
                    className={`p-1.5 rounded-lg transition-all ${testimonial.featured ? 'bg-primary-500/10 text-primary-400' : 'text-neutral-500 hover:bg-primary-500/10 hover:text-primary-400'}`}
                    title={testimonial.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <StarOff size={14} />
                  </button>
                  <button
                    onClick={() => togglePublish(testimonial)}
                    className={`p-1.5 rounded-lg transition-all ${testimonial.published ? 'text-success-400 hover:bg-success-500/10' : 'text-neutral-500 hover:bg-success-500/10 hover:text-success-400'}`}
                    title={testimonial.published ? 'Unpublish' : 'Publish'}
                  >
                    <Star size={14} />
                  </button>
                  <button onClick={() => openEdit(testimonial)} className="p-1.5 hover:bg-accent-500/10 rounded-lg text-neutral-500 hover:text-accent-400 transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => deleteTestimonial(testimonial.id)} className="p-1.5 hover:bg-error-500/10 rounded-lg text-neutral-500 hover:text-error-400 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
