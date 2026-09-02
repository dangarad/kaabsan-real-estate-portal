import React, { useState } from 'react';
import { Star, Plus, Trash2, Edit3, CheckCircle2, MessageSquare, MapPin, Building2 } from 'lucide-react';
import { TestimonialItem } from '../../types';
import { LaptopImageUploader } from '../LaptopImageUploader';

interface TestimonialsTabProps {
  testimonials: TestimonialItem[];
  onUpdateTestimonials: (updated: TestimonialItem[]) => void;
  onSave?: () => void;
}

export const TestimonialsTab: React.FC<TestimonialsTabProps> = ({
  testimonials,
  onUpdateTestimonials,
  onSave
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<TestimonialItem>>({
    clientName: '',
    clientLocation: 'London, United Kingdom',
    propertyPurchased: 'Rugsan Gardens Townhouse',
    quote: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    year: '2024'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.quote) return;

    if (editingId) {
      const updated = testimonials.map((t) =>
        t.id === editingId ? ({ ...t, ...form } as TestimonialItem) : t
      );
      onUpdateTestimonials(updated);
      setEditingId(null);
    } else {
      const newTestimonial: TestimonialItem = {
        id: `test-${Date.now()}`,
        clientName: form.clientName || 'Valued Homeowner',
        clientLocation: form.clientLocation || 'Hargeisa, Somaliland',
        propertyPurchased: form.propertyPurchased || 'Kaabsan Real Estate Property',
        quote: form.quote || '',
        rating: form.rating || 5,
        avatar: form.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        year: form.year || new Date().getFullYear().toString()
      };
      onUpdateTestimonials([...testimonials, newTestimonial]);
      setIsAdding(false);
    }

    setForm({
      clientName: '',
      clientLocation: 'London, United Kingdom',
      propertyPurchased: 'Rugsan Gardens Townhouse',
      quote: '',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      year: '2024'
    });

    if (onSave) onSave();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this homeowner review?')) {
      const updated = testimonials.filter((t) => t.id !== id);
      onUpdateTestimonials(updated);
      if (onSave) onSave();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            Homeowner Testimonials & Diaspora Reviews
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage verified client testimonials, buyer reviews from the diaspora, and satisfaction quotes across master projects.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setForm({
              clientName: '',
              clientLocation: 'London, United Kingdom',
              propertyPurchased: 'Rugsan Gardens Townhouse',
              quote: '',
              rating: 5,
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
              year: '2024'
            });
          }}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="p-6 bg-amber-50/40 rounded-2xl border-2 border-amber-500 shadow-md space-y-4">
          <h3 className="font-bold text-sm text-gray-900">
            {editingId ? 'Edit Homeowner Review' : 'Add New Homeowner Review'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Client Full Name</label>
              <input
                type="text"
                required
                value={form.clientName || ''}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                placeholder="e.g. Dr. Jama Ali"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">City & Country (Location)</label>
              <input
                type="text"
                required
                value={form.clientLocation || ''}
                onChange={(e) => setForm({ ...form, clientLocation: e.target.value })}
                placeholder="e.g. London, United Kingdom"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Property Purchased</label>
              <input
                type="text"
                required
                value={form.propertyPurchased || ''}
                onChange={(e) => setForm({ ...form, propertyPurchased: e.target.value })}
                placeholder="e.g. Rugsan Gardens Villa"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Rating</label>
              <select
                value={form.rating || 5}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              >
                <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                <option value={4}>★★★★☆ (4 Stars - Highly Satisfied)</option>
                <option value={3}>★★★☆☆ (3 Stars - Good)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Handover Year</label>
              <input
                type="text"
                value={form.year || '2024'}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none font-mono"
              />
            </div>
          </div>

          {/* Laptop Image Uploader for Avatar */}
          <LaptopImageUploader
            currentValue={form.avatar}
            onImageSelected={(img) => setForm({ ...form, avatar: img })}
            label="Client Portrait / Avatar (Upload from Laptop or Web URL)"
            helperText="Directly select photo from your computer or provide a URL"
            aspectRatio="square"
          />

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Review Narrative / Quote</label>
            <textarea
              rows={3}
              required
              value={form.quote || ''}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              placeholder="Write the client's verified statement regarding build quality, 60-month financing terms, or title deeds..."
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none leading-relaxed"
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
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Save Review
            </button>
          </div>
        </form>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-500">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{t.year}</span>
              </div>

              <p className="text-xs text-gray-700 italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={t.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
                  alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-gray-900 truncate">{t.clientName}</h4>
                  <div className="text-[11px] text-gray-500 truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600 flex-shrink-0" />
                    <span>{t.clientLocation}</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold truncate flex items-center gap-1">
                    <Building2 className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>{t.propertyPurchased}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(t.id);
                    setIsAdding(false);
                    setForm(t);
                  }}
                  className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                  title="Edit Review"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  title="Delete Review"
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
