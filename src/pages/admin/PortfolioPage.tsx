import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, X, Upload, ExternalLink } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useProjects } from '../../hooks/useData';
import type { Project, ProjectFormData } from '../../types';
import { supabase, STORAGE_BUCKET } from '../../lib/supabase';

const categories = [
  { value: 'web', label: 'Web Development' },
  { value: 'ai', label: 'AI Projects' },
  { value: 'data', label: 'Data Engineering' },
];

const techOptions = [
  'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB',
  'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch', 'Next.js',
  'Vue.js', 'Angular', 'Django', 'FastAPI', 'GraphQL', 'REST API',
];

export function PortfolioPage() {
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenModal = (project?: Project) => {
    setEditingProject(project || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      const projectData = {
        ...data,
        slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      };

      if (editingProject) {
        await updateProject(editingProject.id, projectData);
        showToast('Project updated successfully!', 'success');
      } else {
        await createProject(projectData);
        showToast('Project created successfully!', 'success');
      }
      handleCloseModal();
    } catch {
      showToast('Failed to save project. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        showToast('Project deleted successfully!', 'success');
      } catch {
        showToast('Failed to delete project.', 'error');
      }
    }
  };

  const handleToggleVisibility = async (project: Project) => {
    try {
      await updateProject(project.id, {
        status: project.status === 'published' ? 'draft' : 'published',
      });
      showToast(
        `Project ${project.status === 'published' ? 'unpublished' : 'published'} successfully!`,
        'success'
      );
    } catch {
      showToast('Failed to update project status.', 'error');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Toast */}
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            }`}
          >
            {toast.type === 'success' ? (
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <X size={12} className="text-white" />
              </div>
            )}
            {toast.message}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
            <p className="text-slate-400">Manage your project showcase</p>
          </div>
          <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Add Project
          </button>
        </div>

        {/* Projects Table */}
        <div className="glass-card overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-codecraft-accent-indigo/30 border-t-codecraft-accent-indigo rounded-full animate-spin mx-auto" />
            </div>
          ) : projects.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-slate-500 mb-4">No projects yet. Create your first one!</p>
              <button onClick={() => handleOpenModal()} className="btn-primary">
                <Plus size={18} className="inline mr-2" />
                Add Project
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Date</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-codecraft-dark-2 overflow-hidden flex-shrink-0">
                            {project.thumbnail_url ? (
                              <img src={project.thumbnail_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-linear opacity-20" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">{project.title}</p>
                            <p className="text-sm text-slate-500 truncate max-w-xs">{project.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-codecraft-dark-2 text-slate-400 capitalize">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            project.status === 'published'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(project.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleVisibility(project)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-codecraft-dark-2 rounded-lg transition-colors"
                            title={project.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {project.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <button
                            onClick={() => handleOpenModal(project)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-codecraft-dark-2 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProjectModal
          project={editingProject}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </AdminLayout>
  );
}

function ProjectModal({
  project,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  project: Project | null;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isSubmitting: boolean;
}) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || '',
    description: project?.description || '',
    content: project?.content || '',
    category: project?.category || 'web',
    tech_stack: project?.tech_stack || [],
    thumbnail_url: project?.thumbnail_url || '',
    project_url: project?.project_url || '',
    featured: project?.featured || false,
    status: project?.status || 'draft',
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (field: keyof ProjectFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTechToggle = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter((t) => t !== tech)
        : [...prev.tech_stack, tech],
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);
      setFormData((prev) => ({ ...prev, thumbnail_url: urlData.publicUrl }));
    } catch {
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-codecraft-dark-1 border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="input-field"
              placeholder="Project Title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="input-field resize-none"
              rows={2}
              placeholder="Brief project description"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="input-field resize-none"
              rows={4}
              placeholder="Detailed project description..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="input-field"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-codecraft-dark">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tech Stack</label>
            <div className="flex flex-wrap gap-2">
              {techOptions.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechToggle(tech)}
                  className={`px-3 py-1 text-sm rounded-full transition-all ${
                    formData.tech_stack.includes(tech)
                      ? 'bg-gradient-linear text-white'
                      : 'bg-codecraft-dark-2 text-slate-400 hover:text-white'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Thumbnail</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-codecraft-dark-2 rounded-lg text-sm text-slate-300 hover:text-white cursor-pointer transition-colors">
                <Upload size={16} />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              {isUploading && (
                <span className="text-sm text-slate-400">Uploading...</span>
              )}
              {formData.thumbnail_url && (
                <img src={formData.thumbnail_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
              )}
            </div>
          </div>

          {/* Project URL */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Project URL</label>
            <div className="relative">
              <ExternalLink size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="url"
                value={formData.project_url}
                onChange={(e) => handleChange('project_url', e.target.value)}
                className="input-field pl-10"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Featured & Status */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-codecraft-dark-2 text-codecraft-accent-indigo focus:ring-codecraft-accent-indigo"
              />
              <span className="text-sm text-slate-300">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status === 'published'}
                onChange={(e) => handleChange('status', e.target.checked ? 'published' : 'draft')}
                className="w-4 h-4 rounded border-slate-600 bg-codecraft-dark-2 text-codecraft-accent-indigo focus:ring-codecraft-accent-indigo"
              />
              <span className="text-sm text-slate-300">Published</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Plus size={18} className="inline mr-2" />
                  {project ? 'Update' : 'Create'} Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}