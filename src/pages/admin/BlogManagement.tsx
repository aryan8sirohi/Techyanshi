import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Eye, EyeOff, FileText, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { formatDateShort, slugify } from '@/lib/utils';
import type { BlogPost } from '@/types';

async function fetchPosts() {
  const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

interface FormState {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string;
  tags: string;
  author: string;
  published: boolean;
}

const defaultForm: FormState = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  cover_image: '',
  tags: '',
  author: 'Priyanshi Gupta',
  published: false,
};

export default function BlogManagement() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);

  const { data: posts = [], isLoading } = useQuery({ queryKey: ['admin-blog'], queryFn: fetchPosts });

  const saveMutation = useMutation({
    mutationFn: async (data: FormState) => {
      const payload = {
        ...data,
        slug: slugify(data.title),
        tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
        published_at: data.published ? new Date().toISOString() : null,
      };
      if (editing) {
        const { error } = await supabase.from('blog_posts').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? 'Post updated!' : 'Post created!');
      qc.invalidateQueries({ queryKey: ['admin-blog'] });
      qc.invalidateQueries({ queryKey: ['admin-stats'] });
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const togglePublish = async (post: BlogPost) => {
    await supabase.from('blog_posts').update({ published: !post.published, published_at: !post.published ? new Date().toISOString() : null }).eq('id', post.id);
    qc.invalidateQueries({ queryKey: ['admin-blog'] });
    qc.invalidateQueries({ queryKey: ['admin-stats'] });
  };

  const deletePost = async (id: string) => {
    if (!window.confirm('Delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    toast.success('Deleted');
    qc.invalidateQueries({ queryKey: ['admin-blog'] });
    qc.invalidateQueries({ queryKey: ['admin-stats'] });
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      excerpt: post.excerpt ?? '',
      content: post.content,
      category: post.category ?? '',
      cover_image: post.cover_image ?? '',
      tags: post.tags?.join(', ') ?? '',
      author: post.author,
      published: post.published,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Blog Management</h1>
          <p className="text-neutral-400 text-sm">{posts.length} posts</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }} className="btn-primary text-sm">
          <Plus size={16} />
          New Post
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="glass rounded-2xl w-full max-w-2xl my-8 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editing ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { key: 'title', label: 'Title *', placeholder: 'Post title...' },
                { key: 'excerpt', label: 'Excerpt', placeholder: 'Short description...' },
                { key: 'category', label: 'Category', placeholder: 'Data Analytics, Dashboard Development...' },
                { key: 'cover_image', label: 'Cover Image URL', placeholder: 'https://...' },
                { key: 'tags', label: 'Tags (comma separated)', placeholder: 'Power BI, Analytics, Dashboard' },
                { key: 'author', label: 'Author', placeholder: 'Priyanshi Gupta' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">{field.label}</label>
                  <input
                    type="text"
                    value={form[field.key as keyof FormState] as string}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="input-field text-sm py-2"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Content (Markdown)</label>
                <textarea
                  rows={10}
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  placeholder="Write your blog post in Markdown..."
                  className="input-field text-sm resize-y font-mono text-xs"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 rounded" />
                <span className="text-sm text-neutral-300">Published</span>
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => saveMutation.mutate(form)} disabled={!form.title || saveMutation.isPending} className="btn-primary text-sm flex-1 justify-center disabled:opacity-50">
                <Save size={14} />
                {saveMutation.isPending ? 'Saving...' : 'Save Post'}
              </button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-secondary text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div className="glass rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin mx-auto" /></div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={40} className="text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-500">No blog posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="divide-y divide-navy-800/30">
            {posts.map(post => (
              <div key={post.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                {post.cover_image && (
                  <img src={post.cover_image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{post.title}</p>
                  <p className="text-xs text-neutral-500">{post.category} · {formatDateShort(post.created_at)}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-1 rounded-full ${post.published ? 'bg-success-500/10 text-success-400' : 'bg-neutral-500/10 text-neutral-500'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <button onClick={() => togglePublish(post)} className="p-1.5 hover:bg-white/5 rounded-lg text-neutral-500 hover:text-white transition-all" title="Toggle publish">
                    {post.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => openEdit(post)} className="p-1.5 hover:bg-accent-500/10 rounded-lg text-neutral-500 hover:text-accent-400 transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => deletePost(post.id)} className="p-1.5 hover:bg-error-500/10 rounded-lg text-neutral-500 hover:text-error-400 transition-all">
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
