'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/types';
import { saveGalleryItem, deleteGalleryItem } from '@/lib/data/api';
import { ImageSelector } from '@/components/admin/ImageSelector';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface GalleryAdminClientProps {
  initialItems: GalleryItem[];
}

export function GalleryAdminClient({ initialItems }: GalleryAdminClientProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title_en: '',
    title_bn: '',
    image_url: '',
    category: 'equipment',
  });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.image_url) return;
    setSaving(true);
    try {
      const saved = await saveGalleryItem(newItem);
      setItems((prev) => [...prev, saved]);
      setIsModalOpen(false);
      setNewItem({
        title_en: '',
        title_bn: '',
        image_url: '',
        category: 'equipment',
      });
      setSuccessMsg('Photo added to clinic gallery!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this image?')) return;
    try {
      await deleteGalleryItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSuccessMsg('Image removed from gallery.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Photo Gallery & Clinic Infrastructure
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage photos of the chamber, autoclave sterilization equipment, RVG sensor, and patient smiles.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Photo</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs space-y-2 group"
          >
            <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
              <Image
                src={item.image_url}
                alt={item.title_en}
                fill
                className="object-cover"
              />
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/80 text-white hover:bg-red-600 transition-colors shadow-xs"
                title="Delete image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-[10px] font-bold text-navy-primary uppercase tracking-wider block">
                {item.category}
              </span>
              <h3 className="text-xs font-bold text-slate-800">{item.title_en}</h3>
              <p className="text-[11px] text-slate-500">{item.title_bn}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-navy-primary">Add Gallery Photo</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <ImageSelector
                  label="Gallery Image"
                  required
                  value={newItem.image_url || ''}
                  onChange={(url) => setNewItem({ ...newItem, image_url: url })}
                  placeholder="/images/... or https://..."
                  helperText="Upload a photo from your computer/device or choose from clinic media"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newItem.title_en || ''}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title_en: e.target.value })
                  }
                  placeholder="Digital RVG X-Ray Equipment"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  শিরোনাম (বাংলা) *
                </label>
                <input
                  type="text"
                  required
                  value={newItem.title_bn || ''}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title_bn: e.target.value })
                  }
                  placeholder="ডিজিটাল আরভিজি এক্স-রে মেশিন"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newItem.category || 'equipment'}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value as GalleryItem['category'] })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                >
                  <option value="equipment">Equipment & Technology</option>
                  <option value="sterilization">Sterilization & Hygiene</option>
                  <option value="chamber">Chamber & Interior</option>
                  <option value="smiles">Patient Smiles & Results</option>
                </select>
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
                  {saving ? 'Adding...' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
