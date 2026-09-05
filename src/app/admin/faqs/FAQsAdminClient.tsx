'use client';

import React, { useState } from 'react';
import { FAQ } from '@/lib/types';
import { saveFAQ, deleteFAQ } from '@/lib/data/api';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';

interface FAQsAdminClientProps {
  initialFAQs: FAQ[];
}

export function FAQsAdminClient({ initialFAQs }: FAQsAdminClientProps) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<Partial<FAQ> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const openCreateModal = () => {
    setEditingFAQ({
      question_en: '',
      question_bn: '',
      answer_en: '',
      answer_bn: '',
      category: 'General',
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (f: FAQ) => {
    setEditingFAQ({ ...f });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFAQ) return;
    setSaving(true);
    try {
      const saved = await saveFAQ(editingFAQ);
      setFaqs((prev) => {
        const exists = prev.some((f) => f.id === saved.id);
        if (exists) {
          return prev.map((f) => (f.id === saved.id ? saved : f));
        }
        return [...prev, saved];
      });
      setIsModalOpen(false);
      setEditingFAQ(null);
      setSuccessMsg('FAQ saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await deleteFAQ(id);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      setSuccessMsg('FAQ deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Patient FAQ Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Edit common patient questions and answers regarding treatments, pain relief, and clinic policies.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* FAQ Cards */}
      <div className="space-y-4">
        {faqs.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                  {f.category}
                </span>
                <h3 className="text-sm font-bold text-navy-primary">{f.question_en}</h3>
                <p className="text-xs font-bold text-slate-700">{f.question_bn}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openEditModal(f)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-navy-primary hover:bg-slate-100 cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
              <p>{f.answer_en}</p>
              <p className="text-slate-500">{f.answer_bn}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-navy-primary">
                {editingFAQ.id ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Question (English) *
                </label>
                <input
                  type="text"
                  required
                  value={editingFAQ.question_en || ''}
                  onChange={(e) =>
                    setEditingFAQ({ ...editingFAQ, question_en: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  প্রশ্ন (বাংলা) *
                </label>
                <input
                  type="text"
                  required
                  value={editingFAQ.question_bn || ''}
                  onChange={(e) =>
                    setEditingFAQ({ ...editingFAQ, question_bn: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Answer (English) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingFAQ.answer_en || ''}
                  onChange={(e) =>
                    setEditingFAQ({ ...editingFAQ, answer_en: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  উত্তর (বাংলা) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingFAQ.answer_bn || ''}
                  onChange={(e) =>
                    setEditingFAQ({ ...editingFAQ, answer_bn: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editingFAQ.category || ''}
                  onChange={(e) =>
                    setEditingFAQ({ ...editingFAQ, category: e.target.value })
                  }
                  placeholder="General / Root Canal / Safety"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-navy-primary hover:bg-navy-light text-white rounded-xl font-bold cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
