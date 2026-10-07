export type Language = 'en' | 'bn';

export interface SiteSettings {
  id: string;
  clinic_name_en: string;
  clinic_name_bn: string;
  tagline_en: string;
  tagline_bn: string;
  phone: string;
  phone_emergency?: string;
  whatsapp: string;
  email: string;
  address_en: string;
  address_bn: string;
  hours_en: string;
  hours_bn: string;
  google_maps_url: string;
  google_maps_embed?: string;
  facebook_url: string;
  hero_badge_en: string;
  hero_badge_bn: string;
  hero_headline_en: string;
  hero_headline_bn: string;
  hero_subheadline_en: string;
  hero_subheadline_bn: string;
  hero_cta_text_en: string;
  hero_cta_text_bn: string;
  hero_image_url: string;
  google_review_url: string;
  updated_at?: string;
}

export interface DoctorTimelineItem {
  id: string;
  year: string;
  degree_en: string;
  degree_bn: string;
  institution_en: string;
  institution_bn: string;
  description_en: string;
  description_bn: string;
  badge_en?: string;
  badge_bn?: string;
  type?: 'education' | 'experience' | 'certification';
}

export interface Doctor {
  id: string;
  name_en: string;
  name_bn: string;
  title_en: string;
  title_bn: string;
  qualifications_en: string;
  qualifications_bn: string;
  degrees?: string;
  bmdc_reg: string;
  bio_en: string;
  bio_bn: string;
  consulting_hours_en: string;
  consulting_hours_bn: string;
  photo_url: string;
  cover_url?: string;
  timeline?: DoctorTimelineItem[];
  is_active: boolean;
  experience_years?: string;
  patients_treated?: string;
  specialties_en?: string[];
  specialties_bn?: string[];
  phone?: string;
  languages_en?: string[];
  languages_bn?: string[];
  trainings?: {
    id: string;
    title_en: string;
    title_bn: string;
    year: string;
    focus_en: string;
    focus_bn: string;
  }[];
}

export interface Feature {
  id: string;
  title_en: string;
  title_bn: string;
  description_en: string;
  description_bn: string;
  desc_en?: string;
  desc_bn?: string;
  icon_name: string;
  sort_order: number;
  is_active: boolean;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name_en: string;
  name_bn: string;
  description_en: string;
  description_bn: string;
  icon_name: string;
  sort_order: number;
  image_url?: string;
  images?: string[];
}

export interface Service {
  id: string;
  category_id?: string;
  slug: string;
  name_en: string;
  name_bn: string;
  short_desc_en: string;
  short_desc_bn: string;
  full_desc_en?: string;
  full_desc_bn?: string;
  price_min: number | null;
  price_max: number | null;
  price_unit_en: string;
  price_unit_bn: string;
  price_note_en?: string;
  price_note_bn?: string;
  is_consultation_only: boolean;
  is_featured: boolean;
  image_url?: string;
  sort_order: number;
}

export interface VideoReel {
  id: string;
  title_en: string;
  title_bn: string;
  reel_url: string;
  video_url?: string;
  thumbnail_url?: string;
  duration?: string;
  category?: string;
  description_en?: string;
  description_bn?: string;
  sort_order: number;
  is_featured: boolean;
}

export interface GalleryItem {
  id: string;
  title_en: string;
  title_bn: string;
  category: 'clinic' | 'equipment' | 'treatment' | 'smiles' | 'sterilization' | 'chamber' | string;
  image_url: string;
  sort_order: number;
}

export interface Review {
  id: string;
  patient_name_en: string;
  patient_name_bn: string;
  treatment_en?: string;
  treatment_bn?: string;
  rating: number;
  comment_en: string;
  comment_bn: string;
  date: string;
  avatar_url?: string;
  is_verified: boolean;
  is_featured: boolean;
  sort_order: number;
  google_review_url?: string;
}

export interface FAQ {
  id: string;
  question_en: string;
  question_bn: string;
  answer_en: string;
  answer_bn: string;
  category: string;
  sort_order: number;
  is_published: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title_en: string;
  title_bn: string;
  excerpt_en: string;
  excerpt_bn: string;
  content_en: string;
  content_bn: string;
  cover_image?: string;
  target_keywords_en?: string;
  target_keywords_bn?: string;
  read_time_en: string;
  read_time_bn: string;
  is_published: boolean;
  published_at: string;
}

export interface Appointment {
  id: string;
  patient_name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  preferred_date: string;
  preferred_time_slot: string;
  preferred_time?: string;
  service_id?: string;
  service_name?: string;
  estimated_cost?: number | string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface TopAnnouncement {
  id: string;
  occasion_en: string;
  occasion_bn: string;
  benefit_en: string;
  benefit_bn: string;
  badge_text_en?: string;
  badge_text_bn?: string;
  badge_color?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple' | 'teal';
  action_type: 'booking' | 'whatsapp' | 'link' | 'none';
  action_text_en?: string;
  action_text_bn?: string;
  action_url?: string;
  is_active: boolean;
  sort_order: number;
  duration_seconds: number;
  created_at?: string;
  updated_at?: string;
}
