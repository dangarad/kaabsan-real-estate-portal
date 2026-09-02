import React, { useState } from 'react';
import { Newspaper, Plus, Trash2, Edit3, CheckCircle2, ArrowUpRight, Calendar, Globe } from 'lucide-react';
import { PressArticle } from '../../types';
import { LaptopImageUploader } from '../LaptopImageUploader';

interface BlogPostsTabProps {
  articles: PressArticle[];
  onUpdateArticles: (updated: PressArticle[]) => void;
  onSave?: () => void;
}

export const BlogPostsTab: React.FC<BlogPostsTabProps> = ({
  articles,
  onUpdateArticles,
  onSave
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<PressArticle>>({
    title: '',
    publication: 'Kaabsan Real Estate News',
    category: 'Development Spotlight',
    date: '2026',
    snippet: '',
    link: '#',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  });

  const categories = [
    'Development Spotlight',
    'Market Intelligence',
    'Engineering & Quality',
    'Finance & Growth',
    'Community News'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.snippet) return;

    if (editingId) {
      const updated = articles.map((a) =>
        a.id === editingId ? ({ ...a, ...form } as PressArticle) : a
      );
      onUpdateArticles(updated);
      setEditingId(null);
    } else {
      const newArticle: PressArticle = {
        id: `press-${Date.now()}`,
        title: form.title || '',
        publication: form.publication || 'Kaabsan News',
        category: form.category || 'Development Spotlight',
        date: form.date || new Date().getFullYear().toString(),
        snippet: form.snippet || '',
        link: form.link || '#',
        image: form.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      };
      onUpdateArticles([newArticle, ...articles]);
      setIsAdding(false);
    }

    setForm({
      title: '',
      publication: 'Kaabsan Real Estate News',
      category: 'Development Spotlight',
      date: '2026',
      snippet: '',
      link: '#',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    });

    if (onSave) onSave();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this press article or blog post?')) {
      const updated = articles.filter((a) => a.id !== id);
      onUpdateArticles(updated);
      if (onSave) onSave();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-600" />
            Blog Articles & Press Publications
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Publish market insights, construction milestones, batching plant engineering updates, and Telesom corporate releases.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setForm({
              title: '',
              publication: 'Kaabsan Real Estate News',
              category: 'Development Spotlight',
              date: '2026',
              snippet: '',
              link: '#',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
            });
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Article
        </button>
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="p-6 bg-blue-50/40 rounded-2xl border-2 border-blue-500 shadow-md space-y-4">
          <h3 className="font-bold text-sm text-gray-900">
            {editingId ? 'Edit Article / Press Release' : 'Publish New Article / Press Release'}
          </h3>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Article Headline / Title</label>
            <input
              type="text"
              required
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Kaabsan Real Estate Unveils Masallaha Luxury Residences"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Source / Publication</label>
              <input
                type="text"
                required
                value={form.publication || ''}
                onChange={(e) => setForm({ ...form, publication: e.target.value })}
                placeholder="Horn Business / SLNTV"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                value={form.category || 'Development Spotlight'}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Publish Date / Year</label>
              <input
                type="text"
                value={form.date || '2026'}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none font-mono"
              />
            </div>
          </div>

          {/* Laptop Image Uploader for Blog Post */}
          <LaptopImageUploader
            currentValue={form.image}
            onImageSelected={(img) => setForm({ ...form, image: img })}
            label="Featured Image (Upload from Laptop or Web URL)"
            helperText="Main header photograph for this article"
            aspectRatio="video"
          />

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Executive Summary / Snippet</label>
            <textarea
              rows={3}
              required
              value={form.snippet || ''}
              onChange={(e) => setForm({ ...form, snippet: e.target.value })}
              placeholder="Provide a concise editorial overview..."
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">External Link URL (Optional)</label>
            <input
              type="text"
              value={form.link || '#'}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Publish Article
            </button>
          </div>
        </form>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors"
          >
            <div>
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 text-white text-[11px] font-semibold rounded-lg backdrop-blur-xs">
                  {article.publication}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#C2A55D] font-bold">
                  <span>{article.category}</span>
                  <span className="text-gray-400 font-mono">{article.date}</span>
                </div>
                <h4 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {article.snippet}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-3">
              <a
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                View Article <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(article.id);
                    setIsAdding(false);
                    setForm(article);
                  }}
                  className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                  title="Edit Article"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(article.id)}
                  className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
