-- Care Point Dental Clinic (কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক)
-- Supabase Schema with Row Level Security (RLS)

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Site Settings Table (Global branding, contact, hero)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_name_en TEXT NOT NULL DEFAULT 'Care Point Dental Clinic',
  clinic_name_bn TEXT NOT NULL DEFAULT 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক',
  tagline_en TEXT DEFAULT 'Modern, Hygienic & Pain-Free Dental Care in Ashulia, Savar',
  tagline_bn TEXT DEFAULT 'আধুনিক, জীবাণুমুক্ত ও ব্যথামুক্ত বিশ্বস্ত ডেন্টাল চিকিৎসা',
  phone TEXT NOT NULL DEFAULT '+880 1324-558811',
  whatsapp TEXT NOT NULL DEFAULT '+880 1324-558811',
  email TEXT NOT NULL DEFAULT 'carepointoraldental@gmail.com',
  address_en TEXT NOT NULL DEFAULT '2nd Floor, Mofizuddin Tower, Beside UCB Bank Building, Pollibidyut, Ashulia, Savar, Dhaka 1344',
  address_bn TEXT NOT NULL DEFAULT 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক, মোস্তফা হোটেলের উত্তর পাশে স''মিলের সাথে মফিজ উদ্দিন টাওয়ার (হাংরি টাউন রেস্টুরেন্ট বিল্ডিং), দ্বিতীয় তলা, পল্লীবিদ্যুৎ কবরস্থান রোড বাস স্ট্যান্ড, আশুলিয়া, সাভার',
  hours_en TEXT NOT NULL DEFAULT 'Daily: 4:00 PM – 9:00 PM (Call 30 mins prior for morning appointments)',
  hours_bn TEXT NOT NULL DEFAULT 'প্রতিদিন: বিকাল ৪:০০ টা – রাত ৯:০০ টা (সকালের সিরিয়ালের জন্য ৩০ মিনিট আগে যোগাযোগ করুন)',
  google_maps_url TEXT NOT NULL DEFAULT 'https://maps.app.goo.gl/tTvNAHkod8TfRVPz9?g_st=ac',
  google_maps_embed TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.781844237597!2d90.278912!3d23.900456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDU0JzAxLjYiTiA5MMKwMTYnNDQuMSJF!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd',
  facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com/carepointdentalclinic',
  hero_badge_en TEXT DEFAULT 'Ashulia & Savar’s Trusted Dental Care',
  hero_badge_bn TEXT DEFAULT 'আশুলিয়া ও সাভারের বিশ্বস্ত আধুনিক ডেন্টাল ক্লিনিক',
  hero_headline_en TEXT DEFAULT 'Gentle, Advanced & Pain-Free Dentistry For Your Entire Family',
  hero_headline_bn TEXT DEFAULT 'আপনার সুন্দর ও আত্মবিশ্বাসী হাসির পূর্ণাঙ্গ আধুনিক চিকিৎসা',
  hero_subheadline_en TEXT DEFAULT 'Equipped with digital RVG X-ray, hospital-grade autoclave sterilization, and experienced oral surgery by Dr. Aktar Zahan Ony.',
  hero_subheadline_bn TEXT DEFAULT 'ডিজিটাল RVG এক্স-রে, হাসপাতাল গ্রেড অটোক্লেভ জীবাণুমুক্তকরণ এবং অভিজ্ঞ ডেন্টাল সার্জনের নিখুঁত তত্ত্বাবধান।',
  hero_cta_text_en TEXT DEFAULT 'Book an Appointment',
  hero_cta_text_bn TEXT DEFAULT 'সিরিয়াল / অ্যাপয়েন্টমেন্ট নিন',
  hero_image_url TEXT DEFAULT '/images/hero-dentist.jpg',
  google_review_url TEXT DEFAULT 'https://search.google.com/local/writereview?placeid=carepointdentalclinic',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Doctors Table
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en TEXT NOT NULL DEFAULT 'Dr. Aktar Zahan Ony',
  name_bn TEXT NOT NULL DEFAULT 'ডা. আক্তার জাহান অনি',
  title_en TEXT NOT NULL DEFAULT 'Oral & Dental Surgeon',
  title_bn TEXT NOT NULL DEFAULT 'ওরাল এন্ড ডেন্টাল সার্জন',
  qualifications_en TEXT NOT NULL DEFAULT 'BDS, MPH, JU',
  qualifications_bn TEXT NOT NULL DEFAULT 'বিডিএস, এমপিএইচ, জেইউ',
  bmdc_reg TEXT NOT NULL DEFAULT '12990',
  bio_en TEXT DEFAULT 'Dedicated Oral & Dental Surgeon with specialized expertise in advanced endodontics, cosmetic smile design, and pain-free surgical tooth extractions. Committed to 100% sterile and patient-centered clinical care.',
  bio_bn TEXT DEFAULT 'অভিজ্ঞ ওরাল এন্ড ডেন্টাল সার্জন। রুট ক্যানেল, কসমেটিক স্মাইল ডিজাইন, আঁকাবাঁকা দাঁতের চিকিৎসা ও ব্যথামুক্ত সার্জারিতে বিশেষভাবে প্রশিক্ষিত। রোগীর সর্বোচ্চ নিরাপত্তা ও আন্তরিক সেবায় নিবেদিত।',
  consulting_hours_en TEXT DEFAULT '04:00 PM to 09:00 PM Daily',
  consulting_hours_bn TEXT DEFAULT 'প্রতিদিন বিকাল ৪:০০ টা হতে রাত ৯:০০ টা পর্যন্ত',
  photo_url TEXT DEFAULT '/images/doctor-placeholder.jpg',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Clinic Features (Why Choose Us - 17 Highlights)
CREATE TABLE IF NOT EXISTS public.features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  description_en TEXT,
  description_bn TEXT,
  icon_name TEXT DEFAULT 'ShieldCheck',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- 5. Service Categories
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  description_en TEXT,
  description_bn TEXT,
  icon_name TEXT DEFAULT 'Activity',
  sort_order INT DEFAULT 0
);

-- 6. Services & Treatments Table (31+ Services with low/high BDT ranges)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  short_desc_en TEXT,
  short_desc_bn TEXT,
  full_desc_en TEXT,
  full_desc_bn TEXT,
  price_min NUMERIC,
  price_max NUMERIC,
  price_unit_en TEXT DEFAULT 'per procedure',
  price_unit_bn TEXT DEFAULT 'প্রতি দাঁত/চিকিৎসা',
  price_note_en TEXT,
  price_note_bn TEXT,
  is_consultation_only BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Facebook Video Reels Table
CREATE TABLE IF NOT EXISTS public.video_reels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  reel_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT,
  sort_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. Photo Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  category TEXT DEFAULT 'clinic', -- clinic, equipment, treatment, smile-makeover
  image_url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. Patient Reviews & Testimonials
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_name_en TEXT NOT NULL,
  patient_name_bn TEXT NOT NULL,
  treatment_en TEXT,
  treatment_bn TEXT,
  rating INT DEFAULT 5,
  comment_en TEXT NOT NULL,
  comment_bn TEXT NOT NULL,
  date TEXT DEFAULT 'Recent Patient',
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0
);

-- 10. Frequently Asked Questions (FAQ)
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_en TEXT NOT NULL,
  question_bn TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_bn TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE
);

-- 11. SEO Blog Articles
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  excerpt_bn TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_bn TEXT NOT NULL,
  cover_image TEXT,
  target_keywords_en TEXT,
  target_keywords_bn TEXT,
  meta_title_en TEXT,
  meta_title_bn TEXT,
  meta_description_en TEXT,
  meta_description_bn TEXT,
  read_time_en TEXT DEFAULT '4 min read',
  read_time_bn TEXT DEFAULT '৪ মিনিট পড়ার সময়',
  is_published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 12. Online Patient Appointments
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  preferred_date DATE NOT NULL,
  preferred_time_slot TEXT NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS (Published Content)
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read doctors" ON public.doctors FOR SELECT USING (is_active = true);
CREATE POLICY "Public read features" ON public.features FOR SELECT USING (is_active = true);
CREATE POLICY "Public read service_categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read video_reels" ON public.video_reels FOR SELECT USING (true);
CREATE POLICY "Public read gallery_items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public read blog_posts" ON public.blog_posts FOR SELECT USING (is_published = true);

-- PUBLIC APPOINTMENT SUBMISSION
CREATE POLICY "Public insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES (Authenticated Users)
CREATE POLICY "Admin all site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all doctors" ON public.doctors FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all features" ON public.features FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all service_categories" ON public.service_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all video_reels" ON public.video_reels FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all gallery_items" ON public.gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all reviews" ON public.reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all faqs" ON public.faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all blog_posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all appointments" ON public.appointments FOR ALL TO authenticated USING (true) WITH CHECK (true);
