'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getAllMediaItems, processLocalImageFile, MediaItem } from '@/lib/data/media';
import {
  X,
  Search,
  Upload,
  Check,
  Image as ImageIcon,
  Sparkles,
  Camera,
  FolderOpen,
} from 'lucide-react';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
  selectedUrl?: string;
}

export function MediaLibraryModal({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Image from Clinic Media & Gallery',
  selectedUrl,
}: MediaLibraryModalProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'clinic' | 'gallery' | 'upload'>('all');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      getAllMediaItems().then((all) => setItems(all));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const processedUrl = await processLocalImageFile(file);
      onSelect(processedUrl);
      onClose();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to process image from local device.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.source?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'clinic') return item.category === 'clinic' || item.category === 'doctor';
    if (activeTab === 'gallery') return item.category === 'gallery';
    if (activeTab === 'upload') return item.category === 'upload';
    return true;
  });

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-navy-primary/10 text-navy-primary flex items-center justify-center">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-primary">{title}</h3>
              <p className="text-[11px] text-slate-500">
                Choose from clinic branding photos, existing gallery pictures, or upload from your device.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? 'Processing...' : 'Upload from Device'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar: Search and Filter Tabs */}
        <div className="p-3 sm:p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-navy-primary text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Images ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('clinic')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'clinic'
                  ? 'bg-navy-primary text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Clinic & Doctor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-navy-primary text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Gallery Items
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-navy-primary text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Uploaded from Device
            </button>
          </div>

          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-navy-primary/20 bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-500">No images match your search or filter.</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-primary text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload an Image from Device</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {filteredItems.map((item) => {
                const isSelected = selectedUrl === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelect(item.url);
                      onClose();
                    }}
                    className={`group relative bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden p-2 flex flex-col hover:shadow-md ${
                      isSelected
                        ? 'border-navy-primary ring-2 ring-navy-primary/30 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-100 mb-2">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized={item.url.startsWith('http') || item.url.startsWith('data:')}
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-navy-primary text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-navy-primary/0 group-hover:bg-navy-primary/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="px-2.5 py-1 rounded-lg bg-white/95 text-navy-primary font-bold text-[11px] shadow-sm">
                          Select Image
                        </span>
                      </div>
                    </div>

                    <div className="space-y-0.5 px-0.5">
                      <p className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-navy-primary transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {item.source || item.category}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredItems.length} images</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
