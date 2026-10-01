import { createClient } from '../supabase/client';
import { getGalleryItems } from './api';

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: 'clinic' | 'doctor' | 'gallery' | 'upload';
  source?: string;
}

export const BUILTIN_CLINIC_MEDIA: MediaItem[] = [
  {
    id: 'media-logo',
    title: 'Care Point Official Brand Logo',
    url: '/images/logo.jpeg',
    category: 'clinic',
    source: 'Official Assets',
  },
  {
    id: 'media-logo-clean',
    title: 'Care Point Transparent Emblem Logo',
    url: '/images/logo-clean.png',
    category: 'clinic',
    source: 'Official Assets',
  },
  {
    id: 'media-doctor-ony',
    title: 'Dr. Aktar Zahan Ony (Dental Surgeon Portrait)',
    url: '/images/doctor-ony.jpg',
    category: 'doctor',
    source: 'Doctor Profile',
  },
  {
    id: 'media-operatory-bg',
    title: 'Modern Clinic Operatory & Dental Chair',
    url: '/images/clinic_operatory_bg.jpg',
    category: 'clinic',
    source: 'Chamber Photos',
  },
  {
    id: 'media-services-bg',
    title: 'Advanced Dental Procedures & Technology Banner',
    url: '/images/services-hero-bg.jpg',
    category: 'clinic',
    source: 'Procedures',
  },
  {
    id: 'media-rx-pad',
    title: 'Official Clinic Prescription Pad & BMDC Reg',
    url: '/images/prescription-pad.jpeg',
    category: 'clinic',
    source: 'Prescription',
  },
  {
    id: 'media-visiting-card',
    title: 'Doctor Visiting Card & Chamber Address',
    url: '/images/visiting-card.png',
    category: 'clinic',
    source: 'Chamber Cards',
  },
];

const STORAGE_KEY_UPLOADED_MEDIA = 'cpdc_uploaded_media';

/**
 * Get all available media items (built-in + gallery + user uploads)
 */
export async function getAllMediaItems(): Promise<MediaItem[]> {
  const all: MediaItem[] = [...BUILTIN_CLINIC_MEDIA];

  // 1. Get gallery items from DB/localStorage
  try {
    const galleryItems = await getGalleryItems();
    if (galleryItems && galleryItems.length > 0) {
      galleryItems.forEach((item) => {
        if (!all.some((m) => m.url === item.image_url)) {
          all.push({
            id: `gal-${item.id}`,
            title: item.title_en || item.title_bn || 'Gallery Photo',
            url: item.image_url,
            category: 'gallery',
            source: 'Photo Gallery',
          });
        }
      });
    }
  } catch (err) {
    console.warn('Failed to load gallery items for media picker:', err);
  }

  // 2. Get local uploads
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_UPLOADED_MEDIA);
      if (stored) {
        const parsed: MediaItem[] = JSON.parse(stored);
        parsed.forEach((item) => {
          if (!all.some((m) => m.url === item.url)) {
            all.push(item);
          }
        });
      }
    } catch {
      // safe fallback
    }
  }

  return all;
}

/**
 * Remember an uploaded image in local media library
 */
export function recordUploadedMedia(title: string, url: string): void {
  if (typeof window === 'undefined') return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_UPLOADED_MEDIA);
    const existing: MediaItem[] = stored ? JSON.parse(stored) : [];
    if (!existing.some((item) => item.url === url)) {
      const newItem: MediaItem = {
        id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: title || 'Device Upload',
        url,
        category: 'upload',
        source: 'Uploaded from Device',
      };
      existing.unshift(newItem);
      localStorage.setItem(STORAGE_KEY_UPLOADED_MEDIA, JSON.stringify(existing.slice(0, 50)));
    }
  } catch (err) {
    console.error('Failed to record uploaded media:', err);
  }
}

/**
 * Process and optimize local image file (with canvas compression for fast loading)
 */
export async function processLocalImageFile(file: File): Promise<string> {
  // If Supabase storage is available, try to upload to Supabase storage bucket
  const supabase = createClient();
  if (supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `articles/${cleanFileName}`;

      const { data, error } = await supabase.storage.from('media').upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (!error && data) {
        const { data: pubData } = supabase.storage.from('media').getPublicUrl(filePath);
        if (pubData?.publicUrl) {
          recordUploadedMedia(file.name, pubData.publicUrl);
          return pubData.publicUrl;
        }
      }
    } catch {
      // fallback to client-side compressed base64
    }
  }

  // Client-side image compression via canvas
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const maxDim = 1600;
        let { width, height } = img;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const rawUrl = e.target?.result as string;
          recordUploadedMedia(file.name, rawUrl);
          resolve(rawUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Output compressed JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        recordUploadedMedia(file.name, compressedDataUrl);
        resolve(compressedDataUrl);
      };

      img.onerror = () => {
        const rawUrl = e.target?.result as string;
        recordUploadedMedia(file.name, rawUrl);
        resolve(rawUrl);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
