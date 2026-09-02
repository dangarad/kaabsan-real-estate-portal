import React, { useState } from 'react';
import { HelpCircle, Plus, Trash2, Edit3, CheckCircle2, Search, Sparkles } from 'lucide-react';
import { FAQItem, SiteConfig } from '../../types';

interface FAQsTabProps {
  config: SiteConfig;
  onChangeConfig: (updated: SiteConfig) => void;
  onSave: () => void;
}

export const FAQsTab: React.FC<FAQsTabProps> = ({
  config,
  onChangeConfig,
  onSave
}) => {
  const faqs = config.faqs || [];
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const [form, setForm] = useState<Partial<FAQItem>>({
    question: '',
    answer: '',
    category: 'Financing'
  });

  const categories = ['Financing', 'Projects', 'Legal', 'Diaspora', 'Construction', 'General'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = selectedCat === 'All' || faq.category === selectedCat;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) return;

    if (editingId) {
      const updated = faqs.map((f) =>
        f.id === editingId ? ({ ...f, ...form } as FAQItem) : f
      );
      onChangeConfig({ ...config, faqs: updated });
      setEditingId(null);
    } else {
      const newFaq: FAQItem = {
        id: `faq-${Date.now()}`,
        question: form.question || form.question_en || '',
        answer: form.answer || form.answer_en || '',
        category: form.category || 'General',
        question_en: form.question_en || form.question,
        answer_en: form.answer_en || form.answer,
        category_en: form.category_en || form.category,
        question_so: form.question_so,
        answer_so: form.answer_so,
        category_so: form.category_so,
        question_ar: form.question_ar,
        answer_ar: form.answer_ar,
        category_ar: form.category_ar,
      };
      onChangeConfig({ ...config, faqs: [...faqs, newFaq] });
      setIsAdding(false);
    }

    setForm({ question: '', answer: '', category: 'Financing' });
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ entry?')) {
      const updated = faqs.filter((f) => f.id !== id);
      onChangeConfig({ ...config, faqs: updated });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-rose-600" />
            Frequently Asked Questions (FAQs Management)
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Add, update, or remove answers regarding 60-month financing terms, Rugsan/Aragsan projects, title deeds, and diaspora services.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
              setForm({ question: '', answer: '', category: 'Financing' });
            }}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Question
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" /> Save FAQs
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCat('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              selectedCat === 'All'
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Questions ({faqs.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                selectedCat === cat
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 outline-none"
          />
        </div>
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSaveFaq} className="p-6 bg-rose-50/50 rounded-2xl border-2 border-rose-500 shadow-md space-y-4">
          <h3 className="font-bold text-sm text-gray-900">
            {editingId ? 'Edit FAQ Entry' : 'Add New FAQ Entry'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Question (English)</label>
              <input
                type="text"
                required
                value={form.question || form.question_en || ''}
                onChange={(e) => setForm({ ...form, question: e.target.value, question_en: e.target.value })}
                placeholder="e.g. How does the 60-month Islamic financing plan work?"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                value={form.category || 'Financing'}
                onChange={(e) => setForm({ ...form, category: e.target.value, category_en: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Comprehensive Answer (English)</label>
            <textarea
              rows={3}
              required
              value={form.answer || form.answer_en || ''}
              onChange={(e) => setForm({ ...form, answer: e.target.value, answer_en: e.target.value })}
              placeholder="Write the full authoritative answer here in English..."
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-rose-200">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Su'aasha (Somali)</label>
              <input
                type="text"
                value={form.question_so || ''}
                onChange={(e) => setForm({ ...form, question_so: e.target.value })}
                placeholder="Su'aasha af Soomaaliga..."
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              />
              <textarea
                rows={2}
                value={form.answer_so || ''}
                onChange={(e) => setForm({ ...form, answer_so: e.target.value })}
                placeholder="Jawaabta oo faahfaahsan (Af-Soomaali)..."
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">السؤال (العربية)</label>
              <input
                type="text"
                value={form.question_ar || ''}
                onChange={(e) => setForm({ ...form, question_ar: e.target.value })}
                placeholder="السؤال باللغة العربية..."
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none text-right"
                dir="rtl"
              />
              <textarea
                rows={2}
                value={form.answer_ar || ''}
                onChange={(e) => setForm({ ...form, answer_ar: e.target.value })}
                placeholder="الإجابة الشاملة باللغة العربية..."
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none text-right"
                dir="rtl"
              />
            </div>
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
              className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Save Question
            </button>
          </div>
        </form>
      )}

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
            <p className="text-xs text-gray-500">No questions found matching your filter criteria.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start justify-between gap-4 hover:border-rose-200 transition-colors"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold">
                    {faq.category}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900">{faq.question}</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(faq.id);
                    setIsAdding(false);
                    setForm(faq);
                  }}
                  className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                  title="Edit Entry"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
