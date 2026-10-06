'use client';

import React, { useState } from 'react';
import { Review } from '@/lib/types';
import { saveReview, deleteReview } from '@/lib/data/api';
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Search,
  X,
  Sparkles
} from 'lucide-react';

interface ReviewsAdminClientProps {
  initialReviews: Review[];
}

export function ReviewsAdminClient({ initialReviews }: ReviewsAdminClientProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const openCreateModal = () => {
    setEditingReview({
      patient_name_en: '',
      patient_name_bn: '',
      treatment_en: '',
      treatment_bn: '',
      rating: 5,
      comment_en: '',
      comment_bn: '',
      date: 'Recent Patient',
      is_verified: true,
      is_featured: true,
      google_review_url: 'https://maps.app.goo.gl/tTvNAHkod8TfRVPz9?g_st=ac',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (rev: Review) => {
    setEditingReview({ ...rev });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    setSaving(true);
    try {
      const saved = await saveReview(editingReview);
      setReviews((prev) => {
        const exists = prev.some((r) => r.id === saved.id);
        if (exists) {
          return prev.map((r) => (r.id === saved.id ? saved : r));
        }
        return [...prev, saved];
      });
      setIsModalOpen(false);
      setEditingReview(null);
      setSuccessMsg('Review saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) {
      console.error('Error saving review:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this review?')) return;
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setSuccessMsg('Review deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.patient_name_en.toLowerCase().includes(q) ||
      r.patient_name_bn.toLowerCase().includes(q) ||
      (r.treatment_en && r.treatment_en.toLowerCase().includes(q)) ||
      (r.treatment_bn && r.treatment_bn.toLowerCase().includes(q)) ||
      r.comment_en.toLowerCase().includes(q) ||
      r.comment_bn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-navy-primary tracking-tight">
              Patient Reviews Management
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add, update, or remove authentic patient testimonials displayed on the homepage 3D slider and Google Review links.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by patient name, treatment, comment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-navy-primary"
          />
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </span>
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1">({rev.rating}.0)</span>
                  </div>

                  <h3 className="text-sm font-black text-navy-primary">
                    {rev.patient_name_en} / {rev.patient_name_bn}
                  </h3>

                  {rev.treatment_en && (
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-blue-50 text-navy-primary text-[11px] font-bold border border-blue-100">
                      {rev.treatment_en} • {rev.treatment_bn}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {rev.is_verified && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                  {rev.is_featured && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Review Comments */}
              <div className="space-y-1.5 pt-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="italic">"{rev.comment_bn}"</p>
                <p className="text-[11px] text-slate-500 italic">"{rev.comment_en}"</p>
              </div>

              {/* Google Link Status */}
              {rev.google_review_url && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <a
                    href={rev.google_review_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate max-w-sm"
                  >
                    Google Review URL Linked
                  </a>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(rev)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(rev.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-base sm:text-lg font-black text-navy-primary">
                {editingReview.id ? 'Edit Patient Review' : 'Add New Patient Review'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Patient Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingReview.patient_name_en || ''}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, patient_name_en: e.target.value }))
                    }
                    placeholder="e.g. Tariqul Islam"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-navy-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Name (Bangla) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingReview.patient_name_bn || ''}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, patient_name_bn: e.target.value }))
                    }
                    placeholder="e.g. তরিকুল ইসলাম"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-navy-primary"
                  />
                </div>
              </div>

              {/* Treatment Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Treatment (English)
                  </label>
                  <input
                    type="text"
                    value={editingReview.treatment_en || ''}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, treatment_en: e.target.value }))
                    }
                    placeholder="e.g. Root Canal & Crown"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-navy-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Treatment (Bangla)
                  </label>
                  <input
                    type="text"
                    value={editingReview.treatment_bn || ''}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, treatment_bn: e.target.value }))
                    }
                    placeholder="e.g. রুট ক্যানেল ও ক্যাপ"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-navy-primary"
                  />
                </div>
              </div>

              {/* Rating & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Star Rating (1 to 5) *
                  </label>
                  <select
                    value={editingReview.rating || 5}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, rating: Number(e.target.value) }))
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-navy-primary"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                    <option value={3}>⭐⭐⭐ 3 Stars</option>
                    <option value={2}>⭐⭐ 2 Stars</option>
                    <option value={1}>⭐ 1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Date / Relative Time
                  </label>
                  <input
                    type="text"
                    value={editingReview.date || ''}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, date: e.target.value }))
                    }
                    placeholder="e.g. 2 weeks ago / Recent Patient"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-navy-primary"
                  />
                </div>
              </div>

              {/* Review Comment Bangla */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Comment (Bangla) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingReview.comment_bn || ''}
                  onChange={(e) =>
                    setEditingReview((prev) => ({ ...prev, comment_bn: e.target.value }))
                  }
                  placeholder="রোগীর আসল রিভিউ বাংলায় লিখুন..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-navy-primary leading-relaxed"
                />
              </div>

              {/* Review Comment English */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Comment (English) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingReview.comment_en || ''}
                  onChange={(e) =>
                    setEditingReview((prev) => ({ ...prev, comment_en: e.target.value }))
                  }
                  placeholder="Write the English review text..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-navy-primary leading-relaxed"
                />
              </div>

              {/* Google Review Direct URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Direct Google Review URL (Optional)
                </label>
                <input
                  type="url"
                  value={editingReview.google_review_url || ''}
                  onChange={(e) =>
                    setEditingReview((prev) => ({ ...prev, google_review_url: e.target.value }))
                  }
                  placeholder="https://maps.app.goo.gl/... or leave blank for default"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-navy-primary font-mono text-[11px]"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Clicking "See on Google" will open this exact URL for visitors to verify.
                </p>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingReview.is_verified ?? true}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, is_verified: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-navy-primary focus:ring-navy-primary"
                  />
                  <span>Mark as Verified Patient</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingReview.is_featured ?? true}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, is_featured: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-navy-primary focus:ring-navy-primary"
                  />
                  <span>Featured in Slider</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
