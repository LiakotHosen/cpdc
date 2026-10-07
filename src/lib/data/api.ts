import {
  INITIAL_SITE_SETTINGS,
  INITIAL_DOCTOR,
  INITIAL_FEATURES,
  INITIAL_CATEGORIES,
  INITIAL_SERVICES,
  INITIAL_REELS,
  INITIAL_GALLERY,
  INITIAL_REVIEWS,
  INITIAL_FAQS,
  INITIAL_BLOGS,
  INITIAL_APPOINTMENTS,
  INITIAL_ANNOUNCEMENTS
} from './initial-data';
import {
  SiteSettings,
  Doctor,
  Feature,
  ServiceCategory,
  Service,
  VideoReel,
  GalleryItem,
  Review,
  FAQ,
  BlogPost,
  Appointment,
  TopAnnouncement
} from '../types';
import { createClient } from '../supabase/client';

const STORAGE_KEYS = {
  SETTINGS: 'cpdc_settings',
  DOCTOR: 'cpdc_doctor',
  FEATURES: 'cpdc_features',
  CATEGORIES: 'cpdc_categories',
  SERVICES: 'cpdc_services',
  REELS: 'cpdc_reels',
  GALLERY: 'cpdc_gallery',
  REVIEWS: 'cpdc_reviews',
  FAQS: 'cpdc_faqs',
  BLOGS: 'cpdc_blogs',
  APPOINTMENTS: 'cpdc_appointments',
  ANNOUNCEMENTS: 'cpdc_announcements'
};

function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save ${key} to localStorage:`, err);
  }
}

// 1. Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
      if (!error && data) return data;
    } catch {
      // fallback
    }
  }
  return getLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated = { ...current, ...settings, updated_at: new Date().toISOString() };
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('site_settings').upsert(updated);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

// 2. Doctor
export async function getDoctor(): Promise<Doctor> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('doctors').select('*').eq('is_active', true).limit(1).maybeSingle();
      if (!error && data) {
        return {
          ...INITIAL_DOCTOR,
          ...data,
          cover_url: data.cover_url || INITIAL_DOCTOR.cover_url,
          timeline: data.timeline && data.timeline.length > 0 ? data.timeline : INITIAL_DOCTOR.timeline
        };
      }
    } catch {
      // fallback
    }
  }
  const local = getLocal<Doctor>(STORAGE_KEYS.DOCTOR, INITIAL_DOCTOR);
  const isOldLocal = !local.timeline || local.timeline.length <= 6 || local.title_en === 'Oral & Dental Surgeon';
  if (isOldLocal && typeof window !== 'undefined') {
    setLocal(STORAGE_KEYS.DOCTOR, INITIAL_DOCTOR);
  }
  return {
    ...INITIAL_DOCTOR,
    ...(isOldLocal ? {} : local),
    cover_url: local.cover_url || INITIAL_DOCTOR.cover_url,
    timeline: !isOldLocal && local.timeline && local.timeline.length > 6 ? local.timeline : INITIAL_DOCTOR.timeline,
    trainings: INITIAL_DOCTOR.trainings,
    languages_en: INITIAL_DOCTOR.languages_en,
    languages_bn: INITIAL_DOCTOR.languages_bn,
  };
}

export async function updateDoctor(doctor: Partial<Doctor>): Promise<Doctor> {
  const current = await getDoctor();
  const updated = { ...current, ...doctor };
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('doctors').upsert(updated);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.DOCTOR, updated);
  return updated;
}

// 3. Features
export async function getFeatures(): Promise<Feature[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('features').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal<Feature[]>(STORAGE_KEYS.FEATURES, INITIAL_FEATURES);
}

export async function saveFeatures(features: Feature[]): Promise<Feature[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('features').upsert(features);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.FEATURES, features);
  return features;
}

// 4. Categories & Services
export async function getCategories(): Promise<ServiceCategory[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('service_categories').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal<ServiceCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
}

export async function saveCategory(category: Partial<ServiceCategory> & { id: string }): Promise<ServiceCategory> {
  const categories = await getCategories();
  const existing = categories.find((c) => c.id === category.id);
  if (!existing) throw new Error('Category not found');
  const updated: ServiceCategory = { ...existing, ...category };
  const updatedList = categories.map((c) => (c.id === category.id ? updated : c));
  setLocal(STORAGE_KEYS.CATEGORIES, updatedList);

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('service_categories').upsert(updated);
    } catch {
      // fallback
    }
  }

  return updated;
}

export async function getServices(): Promise<Service[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find(s => s.slug === slug);
}

export async function saveService(service: Partial<Service>): Promise<Service> {
  const services = await getServices();
  let updatedList: Service[];
  let savedService: Service;

  if (service.id) {
    savedService = { ...services.find(s => s.id === service.id), ...service } as Service;
    updatedList = services.map(s => (s.id === service.id ? savedService : s));
  } else {
    savedService = {
      ...service,
      id: 'srv-' + Date.now(),
      sort_order: services.length + 1,
      is_featured: service.is_featured ?? false,
      is_consultation_only: service.is_consultation_only ?? false,
      price_unit_en: service.price_unit_en || 'per procedure',
      price_unit_bn: service.price_unit_bn || 'প্রতি চিকিৎসা'
    } as Service;
    updatedList = [...services, savedService];
  }

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('services').upsert(savedService);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.SERVICES, updatedList);
  return savedService;
}

export async function deleteService(id: string): Promise<void> {
  const services = await getServices();
  const updatedList = services.filter(s => s.id !== id);
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('services').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.SERVICES, updatedList);
}

// 5. Video Reels
export async function getVideoReels(): Promise<VideoReel[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('video_reels').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  const cached = getLocal<VideoReel[]>(STORAGE_KEYS.REELS, INITIAL_REELS);
  return cached.map((r, index) => {
    const init = INITIAL_REELS.find(i => i.id === r.id) || INITIAL_REELS[index];
    const rawUrl = r.reel_url || r.video_url || init?.reel_url || '';
    const cleanUrl = rawUrl.replace('web.facebook.com', 'www.facebook.com').replace('m.facebook.com', 'www.facebook.com');
    return {
      ...r,
      reel_url: cleanUrl,
      video_url: cleanUrl,
      thumbnail_url: r.thumbnail_url || init?.thumbnail_url || `/images/reels/${r.id}.jpg`,
      title_en: (r.title_en && !r.title_en.includes('Comprehensive Clinical Tour')) ? r.title_en : (init?.title_en || r.title_en),
      title_bn: (r.title_bn && !r.title_bn.includes('সম্পূর্ণ জীবাণুমুক্ত')) ? r.title_bn : (init?.title_bn || r.title_bn)
    };
  });
}

export async function saveVideoReel(reel: Partial<VideoReel>): Promise<VideoReel> {
  const reels = await getVideoReels();
  let saved: VideoReel;
  let updatedList: VideoReel[];

  if (reel.id) {
    saved = { ...reels.find(r => r.id === reel.id), ...reel } as VideoReel;
    updatedList = reels.map(r => (r.id === reel.id ? saved : r));
  } else {
    saved = {
      ...reel,
      id: 'reel-' + Date.now(),
      sort_order: reels.length + 1,
      is_featured: true
    } as VideoReel;
    updatedList = [...reels, saved];
  }

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('video_reels').upsert(saved);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.REELS, updatedList);
  return saved;
}

export async function deleteVideoReel(id: string): Promise<void> {
  const reels = await getVideoReels();
  const updated = reels.filter(r => r.id !== id);
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('video_reels').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.REELS, updated);
}

// 6. Photo Gallery
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('gallery_items').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
}

export async function saveGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
  const items = await getGalleryItems();
  const saved: GalleryItem = {
    ...item,
    id: item.id || 'gal-' + Date.now(),
    sort_order: item.sort_order || items.length + 1,
    category: item.category || 'clinic',
    title_en: item.title_en || 'Clinic Photo',
    title_bn: item.title_bn || 'ক্লিনিকের ছবি',
    image_url: item.image_url || '/images/logo.jpeg'
  };
  const updatedList = item.id ? items.map(i => (i.id === item.id ? saved : i)) : [...items, saved];
  setLocal(STORAGE_KEYS.GALLERY, updatedList);
  return saved;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const items = await getGalleryItems();
  setLocal(STORAGE_KEYS.GALLERY, items.filter(i => i.id !== id));
}

// 7. Reviews
export async function getReviews(): Promise<Review[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('reviews').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
}

export async function saveReview(review: Partial<Review>): Promise<Review> {
  const reviews = await getReviews();
  let saved: Review;
  let updatedList: Review[];

  if (review.id) {
    saved = { ...reviews.find(r => r.id === review.id), ...review } as Review;
    updatedList = reviews.map(r => (r.id === review.id ? saved : r));
  } else {
    saved = {
      ...review,
      id: 'rev-' + Date.now(),
      sort_order: reviews.length + 1,
      rating: review.rating || 5,
      date: review.date || 'Recent Patient',
      is_verified: review.is_verified ?? true,
      is_featured: review.is_featured ?? true,
      patient_name_en: review.patient_name_en || 'Satisfied Patient',
      patient_name_bn: review.patient_name_bn || 'সন্তুষ্ট রোগী',
      comment_en: review.comment_en || '',
      comment_bn: review.comment_bn || '',
      treatment_en: review.treatment_en || '',
      treatment_bn: review.treatment_bn || '',
      google_review_url: review.google_review_url || 'https://maps.app.goo.gl/tTvNAHkod8TfRVPz9?g_st=ac'
    } as Review;
    updatedList = [...reviews, saved];
  }

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('reviews').upsert(saved);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.REVIEWS, updatedList);
  return saved;
}

export async function deleteReview(id: string): Promise<void> {
  const reviews = await getReviews();
  const updated = reviews.filter(r => r.id !== id);
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('reviews').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.REVIEWS, updated);
}

// 8. FAQs
export async function getFAQs(): Promise<FAQ[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal<FAQ[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
}

export async function saveFAQ(faq: Partial<FAQ>): Promise<FAQ> {
  const faqs = await getFAQs();
  let saved: FAQ;
  let updatedList: FAQ[];

  if (faq.id) {
    saved = { ...faqs.find(f => f.id === faq.id), ...faq } as FAQ;
    updatedList = faqs.map(f => (f.id === faq.id ? saved : f));
  } else {
    saved = {
      ...faq,
      id: 'faq-' + Date.now(),
      sort_order: faqs.length + 1,
      is_published: true,
      category: faq.category || 'general'
    } as FAQ;
    updatedList = [...faqs, saved];
  }

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('faqs').upsert(saved);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.FAQS, updatedList);
  return saved;
}

export async function deleteFAQ(id: string): Promise<void> {
  const faqs = await getFAQs();
  setLocal(STORAGE_KEYS.FAQS, faqs.filter(f => f.id !== id));
}

// 9. Blogs
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  const local = getLocal<BlogPost[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
  if (Array.isArray(local) && local.length < INITIAL_BLOGS.length) {
    setLocal(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
    return INITIAL_BLOGS;
  }
  return local;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find(p => p.slug === slug);
}

export async function saveBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
  const posts = await getBlogPosts();
  let saved: BlogPost;
  let updatedList: BlogPost[];

  if (post.id) {
    saved = { ...posts.find(p => p.id === post.id), ...post } as BlogPost;
    updatedList = posts.map(p => (p.id === post.id ? saved : p));
  } else {
    // Generate valid UUID for Supabase UUID primary key compatibility
    const newId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });

    saved = {
      ...post,
      id: newId,
      is_published: post.is_published ?? true,
      published_at: post.published_at || new Date().toISOString(),
      read_time_en: post.read_time_en || '4 min read',
      read_time_bn: post.read_time_bn || '৪ মিনিট পড়ার সময়',
      cover_image: post.cover_image || '/images/logo.jpeg'
    } as BlogPost;
    updatedList = [saved, ...posts];
  }

  const supabase = createClient();
  if (supabase) {
    try {
      const { error } = await supabase.from('blog_posts').upsert(saved);
      if (error) {
        console.warn('Supabase upsert blog post warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase blog post error:', err);
    }
  }
  setLocal(STORAGE_KEYS.BLOGS, updatedList);
  return saved;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const posts = await getBlogPosts();
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('blog_posts').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete blog post error:', err);
    }
  }
  setLocal(STORAGE_KEYS.BLOGS, posts.filter(p => p.id !== id));
}

// 10. Appointments
export async function getAppointments(): Promise<Appointment[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
}

export async function createAppointment(apt: Omit<Appointment, 'id' | 'created_at' | 'status'>): Promise<Appointment> {
  const newApt: Appointment = {
    ...apt,
    id: 'apt-' + Date.now(),
    status: 'pending',
    created_at: new Date().toISOString()
  };

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('appointments').insert(newApt);
    } catch {
      // fallback
    }
  }

  const current = getLocal<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  const updated = [newApt, ...current];
  setLocal(STORAGE_KEYS.APPOINTMENTS, updated);
  return newApt;
}

export async function updateAppointmentStatus(id: string, status: Appointment['status'], admin_notes?: string): Promise<void> {
  const list = await getAppointments();
  const updated = list.map(a => (a.id === id ? { ...a, status, admin_notes: admin_notes ?? a.admin_notes, updated_at: new Date().toISOString() } : a));
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('appointments').update({ status, admin_notes }).eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.APPOINTMENTS, updated);
}

export async function deleteAppointment(id: string): Promise<void> {
  const list = await getAppointments();
  const updated = list.filter(a => a.id !== id);
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('appointments').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.APPOINTMENTS, updated);
}

// 12. Top Bar Announcements & Offers
export async function getAnnouncements(): Promise<TopAnnouncement[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal<TopAnnouncement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
}

export async function saveAnnouncement(announcement: Partial<TopAnnouncement>): Promise<TopAnnouncement> {
  const list = await getAnnouncements();
  let saved: TopAnnouncement;
  let updatedList: TopAnnouncement[];

  if (announcement.id) {
    saved = {
      ...list.find(a => a.id === announcement.id),
      ...announcement,
      updated_at: new Date().toISOString()
    } as TopAnnouncement;
    updatedList = list.map(a => (a.id === announcement.id ? saved : a));
  } else {
    saved = {
      id: 'ann-' + Date.now(),
      occasion_en: announcement.occasion_en || 'Special Offer',
      occasion_bn: announcement.occasion_bn || 'বিশেষ অফার',
      benefit_en: announcement.benefit_en || '',
      benefit_bn: announcement.benefit_bn || '',
      badge_text_en: announcement.badge_text_en || 'OFFER',
      badge_text_bn: announcement.badge_text_bn || 'অফার',
      badge_color: announcement.badge_color || 'emerald',
      action_type: announcement.action_type || 'booking',
      action_text_en: announcement.action_text_en || 'Book Now',
      action_text_bn: announcement.action_text_bn || 'সিরিয়াল নিন',
      action_url: announcement.action_url || '',
      is_active: announcement.is_active ?? true,
      sort_order: list.length + 1,
      duration_seconds: announcement.duration_seconds || 15,
      created_at: new Date().toISOString()
    } as TopAnnouncement;
    updatedList = [...list, saved];
  }

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('announcements').upsert(saved);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.ANNOUNCEMENTS, updatedList);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cpdc_announcements_updated', { detail: updatedList }));
  }
  return saved;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const list = await getAnnouncements();
  const updated = list.filter(a => a.id !== id);
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('announcements').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.ANNOUNCEMENTS, updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cpdc_announcements_updated', { detail: updated }));
  }
}

export async function toggleAnnouncementActive(id: string, is_active: boolean): Promise<void> {
  const list = await getAnnouncements();
  const updated = list.map(a => (a.id === id ? { ...a, is_active, updated_at: new Date().toISOString() } : a));
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('announcements').update({ is_active }).eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.ANNOUNCEMENTS, updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cpdc_announcements_updated', { detail: updated }));
  }
}

export async function reorderAnnouncements(reordered: TopAnnouncement[]): Promise<void> {
  const updated = reordered.map((a, index) => ({ ...a, sort_order: index + 1 }));
  const supabase = createClient();
  if (supabase) {
    try {
      for (const item of updated) {
        await supabase.from('announcements').update({ sort_order: item.sort_order }).eq('id', item.id);
      }
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.ANNOUNCEMENTS, updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cpdc_announcements_updated', { detail: updated }));
  }
}

