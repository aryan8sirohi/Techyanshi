import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Eye, EyeOff, Briefcase, X, Save, Star, StarOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { formatDateShort, slugify } from '@/lib/utils';
import type { Project } from '@/types';

async function fetchProjects() {
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Project[];
}

interface FormState {
  title: string;
  category: string;
  description: string;
  cover_image: string;
  tags: string;
  tech_stack: string;
  outcome: string;
  featured: boolean;
  published: boolean;
}

const defaultForm: FormState = {
  title: '',
  category: '',
  description: '',
  cover_image: '',
  tags: '',
  tech_stack: '',
  outcome: '',
  featured: false,
  published: false,
};

export default function ProjectsManagement() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: fetchProjects,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: FormState) => {
      const payload = {
        slug: slugify(data.title),
        title: data.title,
        category: data.category,
        description: data.description,
        cover_image: data.cover_image || null,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
        tech_stack: data.tech_stack ? data.tech_stack.split(',').map(t => t.trim()) : [],
        outcome: data.outcome || null,
        featured: data.featured,
        published: data.published,
      };
      if (editing) {
        const { error } = await supabase.from('projects').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? 'Project updated!' : 'Project created!');
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      qc.invalidateQueries({ queryKey: ['admin-stats'] });
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const togglePublish = async (project: Project) => {
    await supabase.from('projects').update({ published: !project.published }).eq('id', project.id);
    qc.invalidateQueries({ queryKey: ['admin-projects'] });
    qc.invalidateQueries({ queryKey: ['admin-stats'] });
  };

  const toggleFeatured = async (project: Project) => {
    await supabase.from('projects').update({ featured: !project.featured }).eq('id', project.id);
    qc.invalidateQueries({ queryKey: ['admin-projects'] });
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    toast.success('Deleted');
    qc.invalidateQueries({ queryKey: ['admin-projects'] });
    qc.invalidateQueries({ queryKey: ['admin-stats'] });
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      cover_image: project.cover_image ?? '',
      tags: project.tags?.join(', ') ?? '',
      tech_stack: project.tech_stack?.join(', ') ?? '',
      outcome: project.outcome ?? '',
      featured: project.featured,
      published: project.published,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Projects</h1>
          <p className="text-neutral-400 text-sm">{projects.length} portfolio projects</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
          className="btn-primary text-sm"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="glass rounded-2xl w-full max-w-2xl my-8 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editing ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Project title..."
                    className="input-field text-sm py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Category *</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    placeholder="Dashboard, Analytics, Mobile App..."
                    className="input-field text-sm py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Description *</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the project and what was built..."
                  className="input-field text-sm resize-y"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={form.cover_image}
                  onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))}
                  placeholder="https://..."
                  className="input-field text-sm py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                  placeholder="Power BI, Analytics, Dashboard"
                  className="input-field text-sm py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={form.tech_stack}
                  onChange={e => setForm(f => ({ ...f, tech_stack: e.target.value }))}
                  placeholder="React, Python, PostgreSQL, AWS"
                  className="input-field text-sm py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Outcome / Results</label>
                <textarea
                  rows={2}
                  value={form.outcome}
                  onChange={e => setForm(f => ({ ...f, outcome: e.target.value }))}
                  placeholder="What were the results? Increased efficiency, cost savings, etc."
                  className="input-field text-sm resize-y"
                />
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
                disabled={!form.title || !form.category || !form.description || saveMutation.isPending}
                className="btn-primary text-sm flex-1 justify-center disabled:opacity-50"
              >
                <Save size={14} />
                {saveMutation.isPending ? 'Saving...' : 'Save Project'}
              </button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-secondary text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Projects list */}
      <div className="glass rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin mx-auto" /></div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center">
            <Briefcase size={40} className="text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-500">No projects yet. Add your first portfolio project!</p>
          </div>
        ) : (
          <div className="divide-y divide-navy-800/30">
            {projects.map(project => (
              <div key={project.id} className="flex items-start gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                {project.cover_image ? (
                  <img src={project.cover_image} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-accent-gradient flex items-center justify-center text-white flex-shrink-0 hidden sm:flex">
                    <Briefcase size={24} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-white">{project.title}</p>
                    <span className="text-xs text-neutral-500 flex-shrink-0">{formatDateShort(project.created_at)}</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-0.5">{project.category}</p>
                  <p className="text-sm text-neutral-400 mt-1 line-clamp-2">{project.description}</p>
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tech_stack.slice(0, 4).map(tech => (
                        <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-navy-800 text-neutral-400">
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-navy-800 text-neutral-500">
                          +{project.tech_stack.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${project.published ? 'bg-success-500/10 text-success-400' : 'bg-neutral-500/10 text-neutral-500'}`}>
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                    {project.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleFeatured(project)}
                    className={`p-1.5 rounded-lg transition-all ${project.featured ? 'bg-primary-500/10 text-primary-400' : 'text-neutral-500 hover:bg-primary-500/10 hover:text-primary-400'}`}
                    title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    {project.featured ? <StarOff size={14} /> : <Star size={14} />}
                  </button>
                  <button
                    onClick={() => togglePublish(project)}
                    className="p-1.5 hover:bg-success-500/10 rounded-lg text-neutral-500 hover:text-success-400 transition-all"
                    title={project.published ? 'Unpublish' : 'Publish'}
                  >
                    {project.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => openEdit(project)} className="p-1.5 hover:bg-accent-500/10 rounded-lg text-neutral-500 hover:text-accent-400 transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => deleteProject(project.id)} className="p-1.5 hover:bg-error-500/10 rounded-lg text-neutral-500 hover:text-error-400 transition-all">
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
