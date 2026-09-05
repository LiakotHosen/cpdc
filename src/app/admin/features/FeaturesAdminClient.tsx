'use client';

import React, { useState } from 'react';
import { Feature } from '@/lib/types';
import { saveFeatures } from '@/lib/data/api';
import {
  Sparkles,
  Save,
  CheckCircle,
  Eye,
  EyeOff,
  Edit2,
  Check,
  X,
} from 'lucide-react';

interface FeaturesAdminClientProps {
  initialFeatures: Feature[];
}

export function FeaturesAdminClient({ initialFeatures }: FeaturesAdminClientProps) {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Feature>>({});
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const toggleActive = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, is_active: !f.is_active } : f))
    );
  };

  const startEdit = (f: Feature) => {
    setEditingId(f.id);
    setEditForm({ ...f });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editingId) return;
    setFeatures((prev) =>
      prev.map((f) => (f.id === editingId ? ({ ...f, ...editForm } as Feature) : f))
    );
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await saveFeatures(features);
      setSuccessMsg('All 17 clinic features saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Clinic Highlights (17 Features)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sterilization guarantees, modern tech, patient safety protocols, and chamber comfort.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-6 py-2.5 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, index) => {
          const isEditing = editingId === f.id;

          return (
            <div
              key={f.id}
              className={`p-5 rounded-2xl border transition-all ${
                f.is_active
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-slate-50/80 border-slate-200 opacity-60'
              }`}
            >
              {isEditing ? (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-primary">
                      Feature #{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={saveEdit}
                        className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                        title="Apply"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      value={editForm.title_en || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title_en: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      শিরোনাম (বাংলা)
                    </label>
                    <input
                      type="text"
                      value={editForm.title_bn || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title_bn: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Description (English)
                    </label>
                    <textarea
                      rows={2}
                      value={editForm.description_en || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description_en: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      বিবরণ (বাংলা)
                    </label>
                    <textarea
                      rows={2}
                      value={editForm.description_bn || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description_bn: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-navy-tint text-navy-primary text-xs font-black flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="text-sm font-bold text-navy-primary">
                        {f.title_en}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => toggleActive(f.id)}
                        className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                          f.is_active
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-slate-400 hover:bg-slate-200'
                        }`}
                        title={f.is_active ? 'Feature is Active' : 'Feature is Hidden'}
                      >
                        {f.is_active ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => startEdit(f)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-navy-primary hover:bg-slate-100 cursor-pointer transition-colors"
                        title="Edit text"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-slate-700">{f.title_bn}</p>
                    <p className="text-slate-500 leading-relaxed text-[11px]">
                      {f.description_en}
                    </p>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      {f.description_bn}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
