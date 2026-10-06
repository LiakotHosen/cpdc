'use client';

import React, { useState, useMemo } from 'react';
import { Service, ServiceCategory } from '@/lib/types';
import { saveService, deleteService, saveCategory } from '@/lib/data/api';
import {
  Stethoscope,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  X,
  AlertCircle,
  DollarSign,
  Tag,
  HelpCircle,
  Image as ImageIcon,
  Layers,
} from 'lucide-react';

interface ServicesAdminClientProps {
  initialServices: Service[];
  categories: ServiceCategory[];
}

export function ServicesAdminClient({
  initialServices,
  categories,
}: ServicesAdminClientProps) {
  const [categoriesState, setCategoriesState] = useState<ServiceCategory[]>(categories);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Category Images Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string>(categories[0]?.id || '');
  const [editingCatImages, setEditingCatImages] = useState<string[]>([]);
  const [savingCat, setSavingCat] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchCat = selectedCat === 'all' || s.category_id === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.name_en.toLowerCase().includes(q) ||
        s.name_bn.toLowerCase().includes(q) ||
        s.short_desc_en.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [services, selectedCat, searchQuery]);

  const openCreateModal = () => {
    setEditingService({
      name_en: '',
      name_bn: '',
      slug: '',
      category_id: categories[0]?.id || '',
      price_min: 500,
      price_max: 1000,
      price_unit_en: 'per procedure',
      price_unit_bn: 'প্রতি চিকিৎসা',
      price_note_en: '',
      price_note_bn: '',
      short_desc_en: '',
      short_desc_bn: '',
      is_consultation_only: false,
      is_featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);

    try {
      // Auto-generate slug if empty
      const slug =
        editingService.slug ||
        editingService.name_en?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
        'service-' + Date.now();

      const payload: Partial<Service> = {
        ...editingService,
        slug,
        price_min: editingService.price_min ? Number(editingService.price_min) : null,
        price_max: editingService.price_max ? Number(editingService.price_max) : null,
      };

      const saved = await saveService(payload);

      setServices((prev) => {
        const exists = prev.some((s) => s.id === saved.id);
        if (exists) {
          return prev.map((s) => (s.id === saved.id ? saved : s));
        }
        return [...prev, saved];
      });

      setIsModalOpen(false);
      setEditingService(null);
      setSuccessMsg('Service saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this service?')) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      setSuccessMsg('Service deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const openCategoryModal = (catId?: string) => {
    const targetId = catId || categoriesState[0]?.id || '';
    setEditingCatId(targetId);
    const cat = categoriesState.find((c) => c.id === targetId);
    if (cat) {
      const imgs =
        cat.images && cat.images.length > 0
          ? [...cat.images]
          : cat.image_url
          ? [cat.image_url]
          : ['/images/services/cat-diagnostic-3d.jpg'];
      setEditingCatImages(imgs.slice(0, 3));
    }
    setIsCatModalOpen(true);
  };

  const selectCatToEdit = (catId: string) => {
    setEditingCatId(catId);
    const cat = categoriesState.find((c) => c.id === catId);
    if (cat) {
      const imgs =
        cat.images && cat.images.length > 0
          ? [...cat.images]
          : cat.image_url
          ? [cat.image_url]
          : ['/images/services/cat-diagnostic-3d.jpg'];
      setEditingCatImages(imgs.slice(0, 3));
    }
  };

  const handleSaveCatImages = async () => {
    if (!editingCatId) return;
    setSavingCat(true);
    try {
      const cleaned = editingCatImages.map((s) => s.trim()).filter(Boolean).slice(0, 3);
      if (cleaned.length === 0) {
        alert('Please provide at least 1 image.');
        setSavingCat(false);
        return;
      }
      const updated = await saveCategory({
        id: editingCatId,
        images: cleaned,
        image_url: cleaned[0]
      });
      setCategoriesState((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setSuccessMsg('Category images saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      setIsCatModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save category images');
    } finally {
      setSavingCat(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Treatments & Pricing Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Control BDT price ranges, descriptions in English/Bengali, and 1-3 images per category.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => openCategoryModal()}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-navy-primary border border-slate-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>Category Images (1-3)</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-navy-primary text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All Categories ({services.length})
          </button>
          {categoriesState.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCat === c.id
                  ? 'bg-navy-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {c.name_en}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search treatments..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Treatment Name (EN / BN)</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price Range (BDT)</th>
                <th className="px-5 py-3.5">Unit</th>
                <th className="px-5 py-3.5">Flags</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((s) => {
                const parentCat = categoriesState.find((c) => c.id === s.category_id);
                let priceText = '';
                if (s.is_consultation_only || (s.price_min === null && s.price_max === null)) {
                  priceText = 'On Consultation';
                } else if (s.price_min && s.price_max && s.price_min !== s.price_max) {
                  priceText = `৳${s.price_min.toLocaleString()} - ৳${s.price_max.toLocaleString()}`;
                } else {
                  priceText = `৳${(s.price_min || s.price_max || 0).toLocaleString()}`;
                }

                return (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 max-w-xs">
                      <div className="font-bold text-navy-primary text-sm">{s.name_en}</div>
                      <div className="text-slate-500">{s.name_bn}</div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {parentCat?.name_en || 'General'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="font-bold text-navy-primary text-sm">
                        {priceText}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-slate-500">
                      {s.price_unit_en}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap space-x-1">
                      {s.is_consultation_only && (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Consult Only
                        </span>
                      )}
                      {s.is_featured && (
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-navy-primary cursor-pointer transition-colors"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-navy-primary">
                {editingService.id ? 'Edit Treatment & Pricing' : 'Add New Dental Service'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Treatment Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.name_en || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, name_en: e.target.value })
                    }
                    placeholder="e.g. Scaling & Polishing"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-navy-primary/30"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    চিকিৎসার নাম (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.name_bn || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, name_bn: e.target.value })
                    }
                    placeholder="যেমন: স্কেলিং ও পলিশিং"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-navy-primary/30"
                  />
                </div>
              </div>

              {/* Category & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Dental Category *
                  </label>
                  <select
                    value={editingService.category_id || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, category_id: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-navy-primary/30"
                  >
                    {categoriesState.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_en}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingService.slug || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, slug: e.target.value })
                    }
                    placeholder="scaling-and-polishing"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-navy-primary/30"
                  />
                </div>
              </div>

              {/* Prices (BDT) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Min Price (৳ BDT)
                  </label>
                  <input
                    type="number"
                    value={editingService.price_min ?? ''}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price_min: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    placeholder="1000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Max Price (৳ BDT)
                  </label>
                  <input
                    type="number"
                    value={editingService.price_max ?? ''}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price_max: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    placeholder="2500"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Price Unit
                  </label>
                  <input
                    type="text"
                    value={editingService.price_unit_en || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, price_unit_en: e.target.value })
                    }
                    placeholder="per tooth / per arch"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
                  />
                </div>
              </div>

              {/* Short Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Short Description (English)
                  </label>
                  <textarea
                    rows={2}
                    value={editingService.short_desc_en || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, short_desc_en: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-navy-primary/30"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    সংক্ষিপ্ত বিবরণ (বাংলা)
                  </label>
                  <textarea
                    rows={2}
                    value={editingService.short_desc_bn || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, short_desc_bn: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-navy-primary/30"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.is_consultation_only || false}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        is_consultation_only: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-navy-primary focus:ring-navy-primary"
                  />
                  <span className="font-semibold text-slate-700">
                    On Consultation Only (No fixed price)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.is_featured || false}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        is_featured: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-navy-primary focus:ring-navy-primary"
                  />
                  <span className="font-semibold text-slate-700">
                    Feature on Home Page
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-navy-primary hover:bg-navy-light text-white rounded-xl font-bold cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Images (1 to 3) Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-navy-primary text-base">
                  Manage Category Images (Min 1, Max 3)
                </h3>
              </div>
              <button
                onClick={() => setIsCatModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                <strong>Homepage Rules:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                  <li><strong>1 Image:</strong> Displays as a static image without cycling animation.</li>
                  <li><strong>2 or 3 Images:</strong> Automatically slides smoothly inside the card with dots indicator.</li>
                  <li>Limitation: Minimum 1 image, Maximum 3 images per category.</li>
                </ul>
              </div>

              {/* Select Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Category to Configure
                </label>
                <select
                  value={editingCatId}
                  onChange={(e) => selectCatToEdit(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
                >
                  {categoriesState.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name_en} ({c.name_bn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Images Inputs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Category Images ({editingCatImages.length} / 3)
                  </label>
                  {editingCatImages.length < 3 && (
                    <button
                      type="button"
                      onClick={() => setEditingCatImages([...editingCatImages, ''])}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Image Slot
                    </button>
                  )}
                </div>

                {editingCatImages.map((imgUrl, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-16 shrink-0">
                      Image {i + 1}:
                    </span>
                    <input
                      type="text"
                      value={imgUrl}
                      onChange={(e) => {
                        const updated = [...editingCatImages];
                        updated[i] = e.target.value;
                        setEditingCatImages(updated);
                      }}
                      placeholder={`/images/services/example.jpg or https://...`}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
                    />
                    {editingCatImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingCatImages.filter((_, idx) => idx !== i);
                          setEditingCatImages(updated);
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Live Thumbnails Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Image Previews
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {editingCatImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs"
                    >
                      {src ? (
                        <img
                          src={src}
                          alt={`Preview ${i + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span>No image</span>
                      )}
                      <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCatImages}
                  disabled={savingCat}
                  className="px-6 py-2 bg-navy-primary hover:bg-navy-light text-white rounded-xl font-bold text-xs cursor-pointer transition-all disabled:opacity-50"
                >
                  {savingCat ? 'Saving...' : 'Save Category Images'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
