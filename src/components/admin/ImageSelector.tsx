'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { MediaLibraryModal } from './MediaLibraryModal';
import { processLocalImageFile } from '@/lib/data/media';
import {
  Upload,
  Image as ImageIcon,
  FolderOpen,
  X,
  Sparkles,
  Check,
  ExternalLink,
} from 'lucide-react';

interface ImageSelectorProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export function ImageSelector({
  value,
  onChange,
  label,
  placeholder = '/images/... or https://...',
  helperText,
  required = false,
  className = '',
}: ImageSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const processedUrl = await processLocalImageFile(file);
      onChange(processedUrl);
    } catch (err) {
      console.error('Failed to read image:', err);
      alert('Could not read image from local device.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 text-xs ${className}`}>
      {/* Hidden native file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleDeviceUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Label and Actions */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="block font-bold text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
      </div>

      {/* Input Group with Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-navy-primary/20 focus:outline-none text-xs"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              title="Clear image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Upload from Local Device button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-2xs cursor-pointer shrink-0 disabled:opacity-50"
          title="Select and upload image from your computer or phone"
        >
          {uploading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>Upload from Device</span>
            </>
          )}
        </button>

        {/* Choose from Gallery button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-navy-primary hover:bg-navy-light text-white font-bold transition-all shadow-2xs cursor-pointer shrink-0"
          title="Browse existing clinic photos and gallery images"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>From Gallery</span>
        </button>
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-400 leading-tight">{helperText}</p>
      )}

      {/* Visual Image Preview Card */}
      {value && (
        <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200/90 rounded-2xl animate-in fade-in">
          <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
            <Image
              src={value}
              alt="Selected Preview"
              fill
              className="object-cover"
              unoptimized={value.startsWith('http') || value.startsWith('data:')}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-700 truncate text-[11px]">
              {value.startsWith('data:') ? 'Image from Local Device (Embedded)' : value}
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> Image selected & ready
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[11px] font-bold text-navy-primary hover:underline px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            Change
          </button>
        </div>
      )}

      {/* Media Library Modal */}
      <MediaLibraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(url) => onChange(url)}
        selectedUrl={value}
      />
    </div>
  );
}
