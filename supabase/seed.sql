-- Care Point Dental Clinic (কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক)
-- Seed Data for Supabase

-- 1. Global Site Settings
INSERT INTO public.site_settings (
  id, clinic_name_en, clinic_name_bn, tagline_en, tagline_bn,
  phone, whatsapp, email, address_en, address_bn, hours_en, hours_bn,
  google_maps_url, facebook_url, hero_badge_en, hero_badge_bn,
  hero_headline_en, hero_headline_bn, hero_subheadline_en, hero_subheadline_bn,
  hero_cta_text_en, hero_cta_text_bn, hero_image_url
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Care Point Dental Clinic',
  'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক',
  'Modern, Hygienic & Pain-Free Dental Care in Ashulia, Savar',
  'আধুনিক, জীবাণুমুক্ত ও ব্যথামুক্ত বিশ্বস্ত ডেন্টাল চিকিৎসা',
  '+880 1324-558811',
  '+880 1324-558811',
  'carepointoraldental@gmail.com',
  '2nd Floor, Mofizuddin Tower, Beside UCB Bank Building, Pollibidyut, Ashulia, Savar, Dhaka 1344',
  'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক, মোস্তফা হোটেলের উত্তর পাশে স''মিলের সাথে মফিজ উদ্দিন টাওয়ার (হাংরি টাউন রেস্টুরেন্ট বিল্ডিং), দ্বিতীয় তলা, পল্লীবিদ্যুৎ কবরস্থান রোড বাস স্ট্যান্ড, আশুলিয়া, সাভার',
  'Daily: 4:00 PM – 9:00 PM (Call 30 minutes prior for morning appointments)',
  'প্রতিদিন: বিকাল ৪:০০ টা – রাত ৯:০০ টা (সকালের সিরিয়ালের জন্য ৩০ মিনিট আগে কল করুন)',
  'https://maps.app.goo.gl/tTvNAHkod8TfRVPz9?g_st=ac',
  'https://www.facebook.com/carepointdentalclinic',
  'Ashulia & Savar’s Trusted Dental Care',
  'আশুলিয়া ও সাভারের বিশ্বস্ত আধুনিক ডেন্টাল ক্লিনিক',
  'Gentle, Advanced & Pain-Free Dentistry For Your Entire Family',
  'আপনার সুন্দর ও আত্মবিশ্বাসী হাসির পূর্ণাঙ্গ আধুনিক চিকিৎসা',
  'Equipped with digital RVG X-ray, hospital-grade autoclave sterilization, and experienced oral surgery by Dr. Aktar Zahan Ony.',
  'ডিজিটাল RVG এক্স-রে, হাসপাতাল গ্রেড অটোক্লেভ জীবাণুমুক্তকরণ এবং অভিজ্ঞ ডেন্টাল সার্জনের নিখুঁত তত্ত্বাবধান।',
  'Book an Appointment',
  'সিরিয়াল / অ্যাপয়েন্টমেন্ট নিন',
  '/images/logo.jpeg'
) ON CONFLICT (id) DO NOTHING;

-- 2. Doctor Info
INSERT INTO public.doctors (
  id, name_en, name_bn, title_en, title_bn, qualifications_en, qualifications_bn,
  bmdc_reg, bio_en, bio_bn, consulting_hours_en, consulting_hours_bn, photo_url, is_active
) VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'Dr. Aktar Zahan Ony',
  'ডা. আক্তার জাহান অনি',
  'Oral & Dental Surgeon',
  'ওরাল এন্ড ডেন্টাল সার্জন',
  'BDS, MPH, JU',
  'বিডিএস, এমপিএইচ, জেইউ',
  '12990',
  'Dedicated Oral & Dental Surgeon with expertise in advanced endodontics, pain-free tooth extraction, and cosmetic smile restorations. Trained in strict hospital-grade sterilization protocols.',
  'অভিজ্ঞ ওরাল এন্ড ডেন্টাল সার্জন। রুট ক্যানেল, আঁকাবাঁকা দাঁত সোজা করা, কসমেটিক ফিলিং ও ব্যথামুক্ত সার্জিক্যাল চিকিৎসায় বিশেষ পারদর্শী। শতভাগ জীবাণুমুক্ত পরিবেশে সর্বোচ্চ যত্নে চিকিৎসা সেবা প্রদান করেন।',
  '04:00 PM to 09:00 PM Daily',
  'প্রতিদিন বিকাল ৪:০০ টা – রাত ৯:০০ টা',
  '/images/logo.jpeg',
  true
) ON CONFLICT (id) DO NOTHING;

-- 3. 17 Features (Why Choose Us)
INSERT INTO public.features (title_en, title_bn, description_en, description_bn, icon_name, sort_order, is_active) VALUES
('Modern Equipment & Technology', 'আধুনিক যন্ত্রপাতি ও প্রযুক্তি', 'Equipped with the latest dental technology for precision diagnostics and treatment.', 'সঠিক ও নিখুঁত চিকিৎসার জন্য অত্যাধুনিক আন্তর্জাতিক মানের ইকুইপমেন্ট।', 'Cpu', 1, true),
('Premium Treatment Materials', 'উন্নত মানের চিকিৎসা সামগ্রী', 'We strictly use imported, certified, biocompatible dental materials.', 'আন্তর্জাতিক মানের সার্টিফায়েড ও টেকসই চিকিৎসা সামগ্রী ব্যবহার করা হয়।', 'Sparkles', 2, true),
('Experienced Dental Surgeon', 'অভিজ্ঞ ও দক্ষ ডেন্টাল সার্জন', 'Direct care by Dr. Aktar Zahan Ony (BDS, MPH, JU, BMDC 12990).', 'দক্ষ ও অভিজ্ঞ বিএমডিসি নিবন্ধিত ডেন্টাল সার্জন দ্বারা সরাসরি চিকিৎসা।', 'UserCheck', 3, true),
('Clean & Hygienic Environment', 'পরিষ্কার-পরিচ্ছন্ন ও স্বাস্থ্যসম্মত পরিবেশ', 'Spotless clinical spaces ensuring ultimate comfort for patients and families.', 'রোগী ও স্বজনদের জন্য সর্বদা পরিচ্ছন্ন, নিরাপদ ও আরামদায়ক পরিবেশ।', 'Smile', 4, true),
('100% Sterile Treatment Arena', 'সম্পূর্ণ জীবাণুমুক্ত (Sterile) পরিবেশ', 'Hospital-standard infection control for complete cross-contamination prevention.', 'ক্রস-সংক্রমণ রোধে শতভাগ আন্তর্জাতিক স্ট্যান্ডার্ড জীবাণুমুক্ত পরিবেশ।', 'ShieldCheck', 5, true),
('Autoclave & UV Sterilization', 'Autoclave, UV Sterilizer ও ডিসপোজেবল সামগ্রী', 'All tools undergo rigorous multi-stage autoclave and ultraviolet sterilization.', 'প্রতিটি মেটাল ইন্সট্রুমেন্ট স্বয়ংক্রিয় অটোক্লেভ ও ইউভি মেশিনে জীবাণুমুক্ত হয়।', 'Flame', 6, true),
('Individual Disposable Kits', 'প্রত্যেক রোগীর জন্য আলাদা ডিসপোজেবল সেট', 'New gloves, needles, cups, and suction tips opened right in front of you.', 'নতুন গ্লাভস, নিডল, গ্লাস ও সাকশন টিপস প্রতি রোগীর সামনে খোলা হয়।', 'PackageCheck', 7, true),
('Instant Digital RVG X-Ray', 'ডিজিটাল RVG এক্স-রে সুবিধা', 'Ultra-low radiation digital radiography for immediate on-screen diagnosis.', 'কম রেডিয়েশনের তাৎক্ষণিক ও নির্ভুল ডিজিটাল এক্স-রে ডায়াগনোসিস।', 'ScanLine', 8, true),
('Fast & Accurate Diagnosis', 'দ্রুত ও সঠিক ডায়াগনোসিস', 'Pinpoint diagnosis saving your valuable time and preventing complications.', 'সঠিক সমস্যা দ্রুত শনাক্ত করে অপ্রয়োজনীয় চিকিৎসার ঝুঁকি এড়ানো হয়।', 'CheckCircle2', 9, true),
('Uninterrupted Power Backup', 'সার্বক্ষণিক বিদ্যুৎ ব্যবস্থা (Power Backup)', 'Generator backup ensures seamless, undisturbed dental procedures.', 'চিকিৎসাধীন অবস্থায় বিদ্যুৎ বিভ্রাট এড়াতে সার্বক্ষণিক ব্যাকআপ ব্যবস্থা।', 'Zap', 10, true),
('Full Air-Conditioned Comfort', 'শীতাতপ নিয়ন্ত্রিত (AC) পরিবেশ', 'Relaxing, climate-controlled clinical suites for maximum patient ease.', 'চেম্বারে অপেক্ষার সময় এবং চিকিৎসা চলাকালীন আরামদায়ক পরিবেশ।', 'Wind', 11, true),
('24/7 CCTV Security', 'সার্বক্ষণিক সিসি ক্যামেরা নিরাপত্তা', 'Round-the-clock surveillance for patient and asset protection.', 'নিরাপত্তা নিশ্চিত করতে পুরো ক্লিনিক সার্বক্ষণিক নজরদারিতে থাকে।', 'Video', 12, true),
('Pain-Free Treatment Approach', 'ব্যথামুক্ত (Pain-free) চিকিৎসা পদ্ধতি', 'Modern gentle anesthesia techniques for comfortable, anxiety-free visits.', 'আধুনিক লোকাল এনেস্থেসিয়া ও দক্ষ হাতের স্পর্শে ব্যথামুক্ত চিকিৎসা।', 'HeartPulse', 13, true),
('Emergency Dental Facility', 'জরুরি ডেন্টাল চিকিৎসা সুবিধা', 'Prompt relief for severe toothache, fractures, and accidental dental trauma.', 'তীব্র দাঁত ব্যথা বা সড়ক দুর্ঘটনায় দাঁতের আঘাতজনিত দ্রুত জরুরি সেবা।', 'AlertCircle', 14, true),
('Caring & Sincere Patient Support', 'রোগীর প্রতি আন্তরিক ও যত্নশীল সেবা', 'We listen patiently, explain procedures clearly, and provide thoughtful aftercare.', 'রোগীর মনের ভয় দূর করে আন্তরিক ও আন্তরিকতাপূর্ণ পারিবারিক যত্ন।', 'HeartHandshake', 15, true),
('Easy Serial & Online Booking', 'সহজ সিরিয়াল ও অনলাইন অ্যাপয়েন্টমেন্ট', 'Book via phone, WhatsApp, or instant website reservation.', 'ফোনে, হোয়াটসঅ্যাপে বা ওয়েবসাইট থেকে ঘরে বসেই সহজ সিরিয়াল বুকিং।', 'CalendarCheck', 16, true),
('Flexible Scheduling', 'সুবিধাজনক সময়ে চিকিৎসা ব্যবস্থা', 'Daily evening slots with advance morning booking options.', 'ব্যস্ত পেশাজীবী ও স্থানীয়দের জন্য সান্ধ্যকালীন ও পূর্বনির্ধারিত সকালের স্লট।', 'Clock', 17, true);

-- 4. Service Categories
INSERT INTO public.service_categories (id, slug, name_en, name_bn, description_en, description_bn, icon_name, sort_order) VALUES
('c0000000-0000-0000-0000-000000000001', 'general-diagnostic', 'General & Diagnostic', 'সাধারণ ও রোগ নির্ণয়', 'Comprehensive oral consultations, digital RVG x-rays, and routine ultrasonic cleaning.', 'প্রাথমিক চেকআপ, আধুনিক ডিজিটাল এক্স-রে ও দাঁতের সার্বিক রোগ নির্ণয়।', 'Stethoscope', 1),
('c0000000-0000-0000-0000-000000000002', 'cosmetic-dentistry', 'Cosmetic Dentistry', 'কসমেটিক ডেন্টিস্ট্রি ও স্মাইল ডিজাইন', 'Advanced teeth whitening, front teeth aesthetic gap closure, and personalized smile designing.', 'দাঁতের স্বাভাবিক শুভ্রতা ফেরানো ও হাসির সৌন্দর্য বৃদ্ধি।', 'Sparkles', 2),
('c0000000-0000-0000-0000-000000000003', 'restorative', 'Restorative Dentistry', 'দাঁতের ফিলিং, ক্যাপ ও ব্রিজ', 'Tooth-colored composite fillings, durable PFM and high-strength Zirconia ceramic crowns and bridges.', 'ক্ষয়প্রাপ্ত দাঁত মেরামত এবং ক্যাপ ও ব্রিজের মাধ্যমে দাঁত সংরক্ষণ।', 'Shield', 3),
('c0000000-0000-0000-0000-000000000004', 'root-canal', 'Root Canal Treatment', 'রুট ক্যানেল চিকিৎসা (RCT)', 'Single or multi-visit painless root canal therapy for anterior and posterior teeth.', 'প্রদাহ বা ইনফেকশনে আক্রান্ত প্রাকৃতিক দাঁত রক্ষা করার ব্যথামুক্ত চিকিৎসা।', 'Activity', 4),
('c0000000-0000-0000-0000-000000000005', 'oral-surgery', 'Oral & Dental Surgery', 'ওরাল ও ডেন্টাল সার্জারি', 'Simple and surgical tooth extractions, impacted wisdom tooth removal, and periapical surgery.', 'আক্কেল দাঁতের জটিল অপারেশন ও সার্জিক্যাল পদ্ধতিতে ব্যথামুক্ত দাঁত অপসারণ।', 'Scissors', 5),
('c0000000-0000-0000-0000-000000000006', 'dentures', 'Dentures & Prosthodontics', 'কৃত্রিম দাঁত ও ডেনচার', 'Flexible dentures, acrylic partials, cast partials, and full complete denture solutions.', 'হারিয়ে যাওয়া দাঁতের বদলে সহজে ব্যবহারযোগ্য আরামদায়ক কৃত্রিম দাঁত।', 'Layers', 6),
('c0000000-0000-0000-0000-000000000007', 'pediatric', 'Pediatric Dentistry', 'শিশুদের দাঁতের চিকিৎসা', 'Child-friendly dental fillings, painless primary extractions, and preventive sealants.', 'শিশুদের দাঁতের যত্ন ও ক্ষয়রোধে বিশেষায়িত ও মমতাময়ী চিকিৎসা সেবা।', 'Baby', 7),
('c0000000-0000-0000-0000-000000000008', 'orthodontics', 'Orthodontics', 'আঁকাবাঁকা দাঁত সোজা করা', 'Removable and fixed orthodontic appliances to straighten crooked, crowded, or spaced teeth.', 'আঁকাবাঁকা, ফাঁকা বা অসমান দাঁত সুন্দর বিন্যাসে সোজা করার চিকিৎসা।', 'SmilePlus', 8),
('c0000000-0000-0000-0000-000000000009', 'implants', 'Dental Implants', 'স্থায়ী ডেন্টাল ইমপ্ল্যান্ট', 'Modern titanium implants restoring permanent functional and aesthetic teeth.', 'প্রাকৃতিক দাঁতের মতো স্থায়ীভাবে টাইটানিয়াম পোস্ট বসিয়ে নতুন দাঁত প্রতিস্থাপন।', 'Anchor', 9),
('c0000000-0000-0000-0000-000000000010', 'preventive', 'Preventive Care', 'দাঁত ও মাড়ির প্রতিরোধমূলক যত্ন', 'Fluoride varnish, SDF pit and fissure sealants, and pulp vitality management.', 'দাঁতের ক্ষয় ও সেনসিটিভিটি থেকে আগে থেকেই সুরক্ষা নিশ্চিতকরণ।', 'ShieldCheck', 10);

-- 5. All 31+ Services & Pricing (Draft Price List)
INSERT INTO public.services (
  category_id, slug, name_en, name_bn, short_desc_en, short_desc_bn,
  price_min, price_max, price_unit_en, price_unit_bn, price_note_en, price_note_bn,
  is_consultation_only, is_featured, sort_order
) VALUES
-- General & Diagnostic
('c0000000-0000-0000-0000-000000000001', 'consultation', 'Doctor Consultation', 'ডেন্টাল কনসালটেশন / পরামর্শ', 'Detailed clinical examination, diagnosis, and personalized treatment planning.', 'মুখ ও দাঁতের পূর্ণাঙ্গ পর্যবেক্ষণ ও সুনির্দিষ্ট চিকিৎসা পরিকল্পনা।', 200, 200, 'per visit', 'প্রতি ভিজিট', 'Fixed Fee', 'নির্ধারিত ফি', false, true, 1),
('c0000000-0000-0000-0000-000000000001', 'rvg-xray', 'Dental X-ray (RVG)', 'ডিজিটাল ডেন্টাল এক্স-রে (RVG)', 'Instant high-resolution digital radiograph with ultra-low radiation exposure.', 'কম রেডিয়েশনে তাৎক্ষণিক ডিজিটাল এক্স-রে ছবি ও সঠিক ডায়াগনোসিস।', 200, 200, 'per film', 'প্রতি এক্স-রে', 'Fixed Fee', 'নির্ধারিত ফি', false, true, 2),
('c0000000-0000-0000-0000-000000000001', 'scaling-polishing', 'Scaling & Polishing', 'স্কেলিং ও পলিশিং', 'Ultrasonic tartar, calculus, and tobacco stain removal with enamel polishing.', 'আল্ট্রাসনিক স্কেলারে দাঁতের পাথর ও দাগ দূর করে উজ্জ্বল পলিশ।', 1500, 3000, 'full mouth', 'সম্পূর্ণ মুখ', 'Depending on tartar buildup', 'দাঁতে জমে থাকা পাথরের তীব্রতার ওপর নির্ভরশীল', false, true, 3),

-- Cosmetic Dentistry
('c0000000-0000-0000-0000-000000000002', 'tooth-whitening', 'Tooth Whitening (Bleaching)', 'টুথ হোয়াইটনিং / দাঁত সাদা করা', 'In-clinic professional whitening removing deep stains for shades-brighter smiles.', 'ক্লিনিক্যাল ব্লিচিংয়ের মাধ্যমে হলুদ দাগ দূর করে দাঁত উজ্জ্বল সাদা করা।', 6000, 12000, 'full arch', 'সম্পূর্ণ দাঁত', 'Depending on staining severity', 'দাগের মাত্রা অনুযায়ী খরচ নির্ধারিত হয়', false, true, 4),
('c0000000-0000-0000-0000-000000000002', 'smile-designing', 'Smile Designing', 'স্মাইল ডিজাইনিং', 'Custom aesthetic smile makeover combining contouring, bonding, and veneers.', 'আপনার মুখের গড়ন ও হাসির সাথে সামঞ্জস্য রেখে পূর্ণাঙ্গ স্মাইল মেকওভার।', 15000, 30000, 'per case', 'প্রতি কেস', 'Customized treatment plan', 'ব্যক্তিগত প্ল্যানের ওপর ভিত্তি করে', false, true, 5),
('c0000000-0000-0000-0000-000000000002', 'gap-closure', 'Front Teeth Gap Closure', 'সামনের দাঁতের ফাঁকা বন্ধ করা (Diastema)', 'Direct aesthetic composite resin closure of unsightly spacing in single sitting.', 'দাঁতের কোনো ক্ষতি ছাড়া একই দিনে সামনের দাঁতের দৃষ্টিকটু ফাঁকা বন্ধ।', 5000, 10000, 'per area', 'প্রতিটি ফাঁকা', 'Based on width of gap', 'ফাঁকা অংশের বিস্তৃতির ওপর নির্ভর করে', false, true, 6),

-- Restorative
('c0000000-0000-0000-0000-000000000003', 'composite-filling', 'Tooth-Colored Filling (Composite)', 'দাঁতের রঙের কসমেটিক ফিলিং', 'Natural-shade composite filling that blends seamlessly with your tooth enamel.', 'দাঁতের রঙের সাথে মিলিয়ে তৈরি দীর্ঘস্থায়ী ও মজবুত লাইট-কিউরড ফিলিং।', 1500, 4000, 'per tooth', 'প্রতি দাঁত', 'Based on cavity depth', 'দাঁতের গহ্বর বা ক্ষতের পরিমাণের ওপর নির্ভর করে', false, true, 7),
('c0000000-0000-0000-0000-000000000003', 'crown-pfm', 'Cap / Crown – PFM (Porcelain Fused to Metal)', 'দাঁতের ক্যাপ – পিএফএম (মেটাল-সিরামিক)', 'Time-tested strong porcelain-fused-to-metal dental crown.', 'ভেতরে মেটাল ও বাইরে দাঁতের রঙের সিরামিক ক্যাপ।', 4000, 5000, 'per unit', 'প্রতিটি ক্যাপ', 'Durable aesthetic crown', 'মজবুত ও স্থায়ী ক্যাপ', false, true, 8),
('c0000000-0000-0000-0000-000000000003', 'crown-zirconia', 'Cap / Crown – Zirconia', 'দাঁতের ক্যাপ – জার্কোনিয়া (প্রিমিয়াম)', 'Metal-free, biocompatible, ultra-aesthetic monolithic zirconia ceramic crown.', '১০০% মেটাল-মুক্ত, অত্যন্ত নিখুঁত ও প্রাকৃতিক দাঁতের মতো উজ্জ্বল ক্যাপ।', 11000, 15000, 'per unit', 'প্রতিটি ক্যাপ', 'Premium metal-free ceramic', 'প্রিমিয়াম কোয়ালিটি জার্কোনিয়া', false, true, 9),
('c0000000-0000-0000-0000-000000000003', 'bridge-per-unit', 'Dental Bridge', 'দাঁতের ব্রিজ (Bridge)', 'Fixed replacement for one or more missing teeth anchored to adjacent natural teeth.', 'হারানো দাঁতের জায়গায় পাশের দাঁতের সহায়তায় স্থায়ী ব্রিজ স্থাপন।', 5000, 6000, 'per unit', 'প্রতি ইউনিট', 'Multiplied by units required', 'প্রয়োজনীয় ইউনিটের সংখ্যা অনুযায়ী খরচ', false, false, 10),

-- Root Canal Treatment
('c0000000-0000-0000-0000-000000000004', 'root-canal-anterior', 'Root Canal – Anterior (Front Teeth)', 'রুট ক্যানেল – সামনের দাঁত', 'Painless extirpation of infected nerve tissues in incisors or canines.', 'সামনের দাঁতের ইনফেকশন দূর করে প্রাকৃতিক দাঁত অক্ষত রাখার ব্যথামুক্ত চিকিৎসা।', 3000, 5000, 'per tooth', 'প্রতি দাঁত', 'Single or dual visits', 'ইনফেকশনের মাত্রার ওপর নির্ভর করে', false, true, 11),
('c0000000-0000-0000-0000-000000000004', 'root-canal-posterior', 'Root Canal – Posterior (Molar/Premolar)', 'রুট ক্যানেল – পেছনের দাঁত (মাড়ির দাঁত)', 'Complex multi-rooted nerve therapy saving severe molar decay from extraction.', 'মাড়ির বহু শিকড়বিশিষ্ট দাঁতের জটিল ইনফেকশন সারিয়ে দাঁত সংরক্ষণ।', 4000, 6000, 'per tooth', 'প্রতি দাঁত', 'Based on root canal anatomy', 'দাঁতের ক্যানেল সংখ্যা ও জটিলতার ওপর নির্ভর করে', false, true, 12),
('c0000000-0000-0000-0000-000000000004', 'pulp-capping', 'Pulp Capping', 'পাল্প ক্যাপিং', 'Direct/indirect protective medicament placed over exposed nerve to prevent root canal.', 'গভীর ক্যাভিটিতে স্নায়ু সুরক্ষিত করে রুট ক্যানেলের প্রয়োজনীয়তা এড়ানোর চেষ্টা।', 2000, 3500, 'per tooth', 'প্রতি দাঁত', 'Protective nerve therapy', 'স্নায়ু রক্ষাকারী চিকিৎসা', false, false, 13),
('c0000000-0000-0000-0000-000000000004', 'pulpectomy', 'Pulpectomy', 'পালপেকটমি', 'Complete nerve removal in pediatric or emergency acute pulpitis cases.', 'তীব্র ব্যথায় স্নায়ু অপসারণ করে দাঁতের ব্যথা দ্রুত নিরাময়।', 3000, 4000, 'per tooth', 'প্রতি দাঁত', 'Acute pain relief procedure', 'জরুরি ব্যথা উপশমে', false, false, 14),

-- Oral Surgery
('c0000000-0000-0000-0000-000000000005', 'extraction-normal', 'Tooth Extraction (Normal)', 'দাঁত তোলা – সাধারণ', 'Gentle, atraumatic removal of non-restorable teeth under local anesthesia.', 'লোকাল অ্যানেস্থেসিয়া দিয়ে অত্যন্ত সতর্কতায় ব্যথাহীনভাবে দাঁত তোলা।', 700, 2000, 'per tooth', 'প্রতি দাঁত', 'Based on tooth mobility and roots', 'দাঁতের শিকড় ও অবস্থার ওপর ভিত্তি করে', false, true, 15),
('c0000000-0000-0000-0000-000000000005', 'extraction-surgical', 'Tooth Extraction (Surgical)', 'দাঁত তোলা – সার্জিক্যাল', 'Surgical elevation and sectioning of broken roots or difficult impactions.', 'ভেঙে যাওয়া শিকড় বা জটিল দাঁত বিশেষ সার্জিক্যাল পদ্ধতিতে অপসারণ।', 3000, 4000, 'per tooth', 'প্রতি দাঁত', 'For retained roots and ankylosis', 'মাড়িতে আটকে থাকা ভাঙা শিকড়ের ক্ষেত্রে', false, false, 16),
('c0000000-0000-0000-0000-000000000005', 'wisdom-tooth-surgery', 'Wisdom Tooth Surgery (Impaction)', 'আক্কেল দাঁত সার্জারি (ইম্প্যাকশন)', 'Microsurgical removal of painful impacted or horizontally lying 3rd molars.', 'হাড় বা মাড়ির নিচে আটকে থাকা যন্ত্রণাদায়ক আক্কেল দাঁতের সফল অপারেশন।', 4000, 8000, 'per tooth', 'প্রতি দাঁত', 'Based on bone impaction depth', 'হাড়ের গভীরতা ও পজিশনের ওপর নির্ভরশীল', false, true, 17),
('c0000000-0000-0000-0000-000000000005', 'periapical-surgery', 'Periapical Surgery (Apicoectomy)', 'পেরি-এপিক্যাল সার্জারি (এপিকোয়েকটমি)', 'Surgical excision of chronic root apex cysts or unresolved periapical lesions.', 'দাঁতের গোড়ায় সৃষ্ট সিস্ট বা দীর্ঘস্থায়ী ইনফেকশন সার্জারির মাধ্যমে অপসারণ।', 8000, 13000, 'per tooth', 'প্রতি দাঁত', 'Includes microsurgical curettage', 'মাইক্রোসার্জিক্যাল কিউরেটেজ সহ', false, false, 18),
('c0000000-0000-0000-0000-000000000005', 'biopsy-surgery', 'Biopsy Surgery', 'ওরাল বায়োপসি সার্জারি', 'Diagnostic tissue specimen harvesting for histopathological evaluation.', 'মুখের যেকোনো সন্দেহজনক ঘা বা মাংসপিণ্ডের ডায়াগনস্টিক টিস্যু পরীক্ষা।', 3000, 3000, 'per procedure', 'প্রতি টেস্ট', 'Fixed biopsy surgical fee', 'সার্জিক্যাল স্যাম্পল কালেকশন ফি', false, false, 19),
('c0000000-0000-0000-0000-000000000005', 'tooth-avulsion', 'Tooth Avulsion Management', 'দুর্ঘটনায় খুলে যাওয়া দাঁত পুনঃস্থাপন', 'Immediate emergency reimplantation and splinting of knocked-out natural tooth.', 'আঘাতজনিত কারণে উপড়ে আসা দাঁত দ্রুত পুনঃস্থাপন ও স্প্লিন্টিং।', 15000, 15000, 'per procedure', 'প্রতি চিকিৎসা', 'Emergency splinting and care', 'জরুরি ট্রমা ম্যানেজমেন্ট', false, false, 20),
('c0000000-0000-0000-0000-000000000005', 'fracture-management', 'Jaw & Tooth Fracture Management', 'চোয়াল ও দাঁতের ফ্র্যাকচার চিকিৎসা', 'Fixation and stabilization of alveolar and facial trauma injuries.', 'চোয়াল ও দাঁতের আঘাতপ্রাপ্ত ফ্র্যাকচারের জরুরি ফিক্সেশন।', NULL, NULL, 'custom', 'পরামর্শ সাপেক্ষে', 'Requires immediate clinical exam', 'চোটের জটিলতা দেখে পরামর্শ সাপেক্ষে', true, false, 21),
('c0000000-0000-0000-0000-000000000005', 'dental-gingival-surgery', 'Dental & Gingival Surgery', 'ডেন্টাল ও মাড়ির সার্জারি', 'Gingivectomy, flap debridement, and periodontal recontouring surgery.', 'মাড়ির সংক্রমণ, ফোলা বা রক্ত পড়ার নিরাময়ে গাম সার্জারি।', NULL, NULL, 'custom', 'পরামর্শ সাপেক্ষে', 'Evaluated upon periodontal charting', 'মাড়ির গভীরতার ওপর ভিত্তি করে', true, false, 22),

-- Dentures & Prosthodontics
('c0000000-0000-0000-0000-000000000006', 'partial-denture-acrylic', 'Partial Denture – Acrylic', 'আংশিক কৃত্রিম দাঁত – অ্যাক্রিলিক', 'Affordable removable acrylic replacement for lost teeth.', 'স্বল্প খরচে সহজে খোলা-পড়া যায় এমন আংশিক কৃত্রিম দাঁত।', 1000, 1000, 'starting per tooth', 'প্রতি দাঁত', 'Cost increases with number of teeth', 'দাঁতের সংখ্যার ওপর ভিত্তি করে নির্ধারিত', false, false, 23),
('c0000000-0000-0000-0000-000000000006', 'fibre-partial-denture', 'Fibre Partial Denture', 'ফাইবার পার্টিয়াল ডেনচার', 'Fibre-reinforced aesthetic denture providing higher fracture resistance.', 'ফাইবার রিইনফোর্সড উন্নত ও টেকসই আংশিক কৃত্রিম দাঁত।', 2500, 2500, 'per unit', 'প্রতি ইউনিট', 'Standard aesthetic replacement', 'উন্নত মানের ফাইবার ম্যাটেরিয়াল', false, false, 24),
('c0000000-0000-0000-0000-000000000006', 'partial-denture', 'Partial Denture (Standard)', 'পার্টিয়াল ডেনচার (স্ট্যান্ডার্ড)', 'Comfortable standard partial denture restoring chewing capacity.', 'চাবানোর ক্ষমতা ও চেহারার স্বাভাবিক ভাব ফিরিয়ে আনে।', 4000, 4000, 'per unit', 'প্রতি সেট', 'Standard custom fit', 'কাস্টম ফিটিং সেট', false, false, 25),
('c0000000-0000-0000-0000-000000000006', 'flexible-denture', 'Flexible Denture (Valplast)', 'ফ্লেক্সিবল ডেনচার (নরম ও আরামদায়ক)', 'Unbreakable, ultra-comfortable, gum-shaded flexible nylon prosthesis.', 'ভেঙে যাওয়ার ভয় নেই, মাড়ির রঙের সাথে মানানসই ও অত্যন্ত আরামদায়ক।', 4000, 4000, 'per unit', 'প্রতি ইউনিট', 'Lightweight and biocompatible', 'হালকা ও দীর্ঘস্থায়ী ফ্লেক্সিবল ম্যাটেরিয়াল', false, true, 26),
('c0000000-0000-0000-0000-000000000006', 'cast-partial-denture', 'Cast Partial Denture (Metal Framework)', 'কাস্ট পার্টিয়াল ডেনচার (মেটাল ফ্রেম)', 'Precision metal framework denture with optimum retention and stability.', 'ক্ল্যাম্প ও মেটাল ফ্রেমের সমন্বয়ে মজবুতভাবে আটকে থাকা উন্নত ডেনচার।', 4000, 60000, 'per arch', 'প্রতি চোয়াল', 'Depending on metal alloy used', 'ব্যবহৃত মেটাল অ্যালয় ও দাঁতের সংখ্যার ওপর নির্ভর করে', false, false, 27),
('c0000000-0000-0000-0000-000000000006', 'complete-denture', 'Complete Denture (Full Set)', 'সম্পূর্ণ কৃত্রিম দাঁতের সেট (ফুল ডেনচার)', 'Full arch rehabilitation for completely edentulous upper or lower jaw.', 'সব দাঁত হারানো রোগীদের জন্য পুরো মুখের নতুন আরামদায়ক দাঁতের সেট।', 30000, 50000, 'full set', 'সম্পূর্ণ সেট', 'Starting from ৳30,000 upon consultation', 'পরামর্শ সাপেক্ষে ৳৩০,০০০ থেকে শুরু', false, true, 28),

-- Pediatric Dentistry
('c0000000-0000-0000-0000-000000000007', 'pediatric-filling', 'Pediatric Dental Filling', 'শিশুদের দাঁতের ফিলিং', 'Gentle caries removal and fluoride-releasing glass ionomer filling for children.', 'শিশুদের দুধ দাঁতের ক্যাভিটি পরিষ্কার করে ব্যথাহীন ফ্রেন্ডলি ফিলিং।', 600, 1000, 'per tooth', 'প্রতি দাঁত', 'Gentle child-friendly approach', 'শিশুর সহযোগিতার ওপর ভিত্তি করে', false, true, 29),

-- Orthodontics
('c0000000-0000-0000-0000-000000000008', 'orthodontic-appliance', 'Orthodontic Appliance (Braces)', 'অর্থোডন্টিক ব্রেসেস ও অ্যাপ্লায়েন্স', 'Fixed braces and functional aligners to correct crowded, spaced or misaligned teeth.', 'দাঁতের অনিয়মিত বিন্যাস, ফাঁকা বা সামনের দিকে এগিয়ে থাকা দাঁত সোজা করা।', 40000, 80000, 'full treatment', 'সম্পূর্ণ কোর্স', 'Starting from ৳40,000 with easy installment plans', 'পদ্ধতির ওপর ভিত্তি করে ৳৪০,০০০ থেকে শুরু (কিস্তি সুবিধা)', false, true, 30),

-- Implants
('c0000000-0000-0000-0000-000000000009', 'dental-implant', 'Dental Implant', 'স্থায়ী ডেন্টাল ইমপ্ল্যান্ট', 'State-of-the-art titanium fixture fused into the jawbone for a permanent natural tooth.', 'প্রাকৃতিক দাঁতের স্থায়ী বিকল্প—হাড়ের সাথে স্থায়ীভাবে যুক্ত টাইটানিয়াম ইমপ্ল্যান্ট।', 40000, 50000, 'per tooth', 'প্রতিটি ইমপ্ল্যান্ট', 'Includes titanium implant body and abutment', 'টাইটানিয়াম ফিক্সচার ও অ্যাবাটমেন্ট সহ', false, true, 31),

-- Preventive Care
('c0000000-0000-0000-0000-000000000010', 'sdf-pit-fissure-sealant', 'SDF with Pit & Fissure Sealant', 'এসডিএফ ও পিট এন্ড ফিশার সিল্যান্ট', 'Silver diamine fluoride application halting tooth decay in deep molar grooves.', 'দাঁতের গভীর খাঁজে খাদ্যকণা জমে ব্যাকটেরিয়া আক্রমণ প্রতিরোধে সিল্যান্ট কোটিং।', 500, 500, 'per tooth', 'প্রতি দাঁত', 'Fixed preventive fee', 'নির্ধারিত প্রতিরোধমূলক ফি', false, false, 32),
('c0000000-0000-0000-0000-000000000010', 'fluoride-application', 'Professional Fluoride Application', 'প্রফেশনাল ফ্লোরাইড অ্যাপ্লিকেশন', 'High-concentration fluoride varnish strengthening enamel against acid attacks.', 'দাঁতের এনামেল মজবুত করে ক্ষয় ও সংবেদনশীলতা রোধে বিশেষ জেল অ্যাপ্লিকেশন।', 2000, 4000, 'full mouth', 'সম্পূর্ণ মুখ', 'Protective therapy for children & adults', 'দাঁত শিরশিরানি ও ক্ষয়রোধে বিশেষ থেরাপি', false, false, 33);

-- 6. Facebook Video Reels (8 Unique Reels from Notes)
INSERT INTO public.video_reels (title_en, title_bn, reel_url, thumbnail_url, duration, sort_order, is_featured) VALUES
('Root Canal Quality: Low-Cost Half-Baked vs Complete Treatment', 'কম খরচে হাফ-বেকড রুট ক্যানেল বনাম পারফেক্ট আধুনিক চিকিৎসা', 'https://www.facebook.com/reel/1857864901861958', '/images/reels/reel-1.jpg', '1:05', 1, true),
('Emergency Dental Trauma: Saving Knocked-Out Teeth in 1 Hour', 'দুর্ঘটনায় দাঁত উপড়ে বা ভেঙে গেলে গোল্ডেন আওয়ারে দাঁত বাঁচানোর উপায়', 'https://www.facebook.com/reel/1706318750448810', '/images/reels/reel-2.jpg', '0:55', 2, true),
('Fear of Dental Needles? Pain-Free Local Anesthesia & Safe Care', 'সিরিঞ্জ বা ইনজেকশনের ভয়? আধুনিক ব্যথামুক্ত অ্যানাস্থেশিয়া পদ্ধতি', 'https://www.facebook.com/reel/1778058163550814', '/images/reels/reel-3.jpg', '1:12', 3, true),
('Diastema Closure: Fixing Gaps Between Teeth for Confident Smile', 'দাঁতের ফাঁকা জায়গা বন্ধ করে আকর্ষণীয় কনফিডেন্ট স্মাইল ফিরিয়ে আনা', 'https://www.facebook.com/reel/1839137160830022', '/images/reels/reel-4.jpg', '0:48', 4, true),
('Severe Tooth Infection & Advanced Tooth Preservation', 'মারাত্মক ইনফেকশন ও ক্ষয়ে যাওয়া দাঁত সংরক্ষণে সঠিক চিকিৎসা পদ্ধতি', 'https://www.facebook.com/reel/2426901334500612', '/images/reels/reel-5.jpg', '1:00', 5, true),
('Post-Root Canal Protection & Long-Lasting Dental Crown Cap', 'রুট ক্যানেলের পর ক্রাউন বা ক্যাপ কেন জরুরি? দাঁতের স্থায়ী সুরক্ষা', 'https://www.facebook.com/reel/1572476604521557', '/images/reels/reel-6.jpg', '0:45', 6, true),
('Gum Health, Fresh Breath & Comprehensive Oral Hygiene Guide', 'মুখের দুর্গন্ধ দূর ও মাড়ির সুস্বাস্থ্য বজায় রাখার কার্যকরী উপায়', 'https://www.facebook.com/reel/2263470164424621', '/images/reels/reel-7.jpg', '1:18', 7, true),
('High-Precision Dental Loupes & Microscopic Root Canal Care', 'ডেন্টাল লুপস ও মাইক্রো-প্রিসিশন প্রযুক্তিতে আধুনিক দাঁতের চিকিৎসা', 'https://www.facebook.com/reel/3061772634024747', '/images/reels/reel-8.jpg', '1:10', 8, true);

-- 7. FAQs (Bilingual)
INSERT INTO public.faqs (question_en, question_bn, answer_en, answer_bn, category, sort_order) VALUES
('Where is Care Point Dental Clinic located?', 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক কোথায় অবস্থিত?', 'We are located on the 2nd Floor of Mofizuddin Tower (Hungry Town Restaurant building), beside UCB Bank, Pollibidyut, Ashulia, Savar, Dhaka 1344.', 'আমাদের ঠিকানা: মোস্তফা হোটেলের উত্তর পাশে স''মিলের সাথে মফিজ উদ্দিন টাওয়ার (হাংরি টাউন রেস্টুরেন্ট বিল্ডিং), ২য় তলা, পল্লীবিদ্যুৎ কবরস্থান রোড বাস স্ট্যান্ড, আশুলিয়া, সাভার।', 'general', 1),
('What are the consulting hours of Dr. Aktar Zahan Ony?', 'ডা. আক্তার জাহান অনি-এর রোগী দেখার সময়সূচী কী?', 'Dr. Aktar Zahan Ony sees patients daily from 4:00 PM to 9:00 PM. For morning appointments, patients are kindly requested to call 30 minutes in advance.', 'প্রতিদিন বিকাল ৪:০০ টা হতে রাত ৯:০০ টা পর্যন্ত। তবে সকালের সিরিয়ালের জন্য আসার ৩০ মিনিট আগে ফোনে জানানোর অনুরোধ রইল।', 'general', 2),
('Is dental treatment at Care Point Dental painful?', 'চিকিৎসা চলাকালীন কি কোনো ব্যথা অনুভূত হয়?', 'No. We strictly prioritize pain-free dentistry using the finest local anesthetics, gentle techniques, and calming patient care to ensure total comfort.', 'না। আমাদের চেম্বারে সম্পূর্ণ ব্যথামুক্ত (Pain-free) আধুনিক পদ্ধতিতে লোকাল এনেস্থেসিয়া ও আন্তরিক পরিবেশে চিকিৎসা দেওয়া হয়, ফলে ভয়ের কোনো কারণ নেই।', 'treatment', 3),
('How do you ensure sterilization and hygiene?', 'জীবাণুমুক্তকরণ ও হাইজিন কীভাবে বজায় রাখা হয়?', 'We use hospital-grade multi-stage Autoclave, UV Sterilization, and 100% individual disposable items (gloves, needles, cups, suction tips) for every single patient.', 'আমরা প্রতিটি মেটাল ইন্সট্রুমেন্ট অটোক্লেভ ও ইউভি মেশিনে জীবাণুমুক্ত করি এবং প্রতি রোগীর জন্য সম্পূর্ণ নতুন ডিসপোজেবল সামগ্রী ব্যবহার করি।', 'hygiene', 4),
('How much does a dental consultation and RVG X-ray cost?', 'কনসালটেশন ও ডিজিটাল এক্স-রের খরচ কত?', 'Doctor consultation fee is ৳200 and digital RVG dental X-ray is ৳200 per film.', 'ডাক্তার কনসালটেশন ফি মাত্র ৳২০০ এবং ডিজিটাল RVG এক্স-রে ফি মাত্র ৳২০০।', 'pricing', 5),
('How does the Cost Calculator work?', 'কস্ট ক্যালকুলেটর কীভাবে কাজ করে?', 'Our interactive Cost Calculator lets you pick the treatments you need and provides a transparent estimated low-to-high price range in BDT (৳).', 'কস্ট ক্যালকুলেটরে আপনার প্রয়োজনীয় চিকিৎসাগুলো সিলেক্ট করলেই মোট আনুমানিক খরচের রেঞ্জ (৳) সাথে সাথে দেখতে পারবেন।', 'pricing', 6),
('Can I book an appointment online?', 'আমি কি অনলাইনে বা ফোনে অ্যাপয়েন্টমেন্ট নিতে পারি?', 'Yes! You can book via our website form, or directly message/call our WhatsApp hotline at +880 1324-558811.', 'হ্যাঁ! আমাদের ওয়েবসাইটের বুকিং ফর্মের মাধ্যমে অথবা হোয়াটসঅ্যাপে সরাসরি মেসেজ বা কল করে (+880 1324-558811) সহজে সিরিয়াল নিতে পারবেন।', 'appointment', 7),
('Why choose Zirconia crown over regular PFM?', 'মেটাল ক্যাপের তুলনায় জার্কোনিয়া ক্যাপ কেন বেশি ভালো?', 'Zirconia crowns are 100% metal-free, match natural tooth translucency, never cause dark gum borders, and offer unmatched biocompatibility and strength.', 'জার্কোনিয়া ক্যাপ ১০০% মেটাল-মুক্ত, মাড়িতে কালো দাগ ফেলে না, দেখতে অবিকল প্রাকৃতিক দাঁতের মতো সুন্দর এবং অত্যন্ত দীর্ঘস্থায়ী।', 'treatment', 8),
('How long does a Root Canal Treatment take?', 'রুট ক্যানেল করতে কত সময় বা কয়টি ভিজিট লাগে?', 'Depending on root anatomy and infection severity, anterior teeth are often completed in 1 to 2 visits, taking roughly 30–45 minutes per session.', 'ইনফেকশনের ওপর নির্ভর করে সাধারণত ১ থেকে ২ টি ভিজিটে রুট ক্যানেল শেষ করা সম্ভব হয়। প্রতি ভিজিটে ৩০-৪০ মিনিট সময় লাগে।', 'treatment', 9),
('Do you treat pediatric (children) dental problems?', 'আপনারা কি শিশুদের দাঁতের চিকিৎসা করেন?', 'Yes, we provide gentle, friendly pediatric fillings, primary tooth extractions, and cavity-preventing fluoride sealants in a reassuring atmosphere.', 'হ্যাঁ, শিশুদের দাঁতের ক্যাভিটি ফিলিং, দুধ দাঁত তোলা ও ক্ষয়রোধক ফ্লোরাইড চিকিৎসা অত্যন্ত মমতাময়ী ও আনন্দদায়ক পরিবেশে করা হয়।', 'treatment', 10);

-- 8. SEO Blog Posts (Bilingual)
INSERT INTO public.blog_posts (
  slug, title_en, title_bn, excerpt_en, excerpt_bn,
  content_en, content_bn, target_keywords_en, target_keywords_bn,
  read_time_en, read_time_bn, is_published
) VALUES
(
  'root-canal-treatment-cost-savar-ashulia',
  'Root Canal Treatment Cost in Savar & Ashulia: What Patients Need to Know',
  'রুট ক্যানেল চিকিৎসার খরচ সাভার ও আশুলিয়ায়: কেন ও কখন এটি জরুরি?',
  'Explore how modern root canal therapy saves your natural teeth from extraction, what to expect during the painless procedure, and transparent pricing in Savar.',
  'দাঁতের অসহ্য ব্যথা থেকে মুক্তি পেতে এবং আসল দাঁত তুলে ফেলা থেকে রক্ষা করতে রুট ক্যানেল কেন সেরা চিকিৎসা? জেনে নিন বিস্তারিত খরচ ও পরামর্শ।',
  '## Understanding Root Canal Treatment\n\nWhen dental decay penetrates through enamel and dentin into the pulp chamber, bacteria inflame the nerve and blood vessels. Left untreated, this causes agonizing throbbing toothache and dangerous jaw abscesses.\n\n### Why Save Your Natural Tooth?\nNo artificial tooth completely replicates the chewing efficiency and sensory feedback of a natural tooth root. Root canal therapy meticulously cleans out infection, seals the root canals, and restores the crown.\n\n### Pricing at Care Point Dental Clinic\n- Anterior (Front) Root Canal: ৳3,000 – ৳5,000\n- Posterior (Molar) Root Canal: ৳4,000 – ৳6,000\n\nAll procedures are performed under gentle local anesthesia by Dr. Aktar Zahan Ony.',
  '## রুট ক্যানেল চিকিৎসা কী?\n\nদাঁতের পোকা বা ক্যাভিটি যখন গভীরে গিয়ে স্নায়ু বা পাল্প আক্রান্ত করে, তখন তীব্র ব্যথার সৃষ্টি হয়। অনেকেই ভয়ে দাঁত তুলে ফেলতে চান, কিন্তু আসল দাঁত বাঁচিয়ে রাখাই আধুনিক ডেন্টিস্ট্রির প্রধান লক্ষ্য।\n\n### রুট ক্যানেল কেন করবেন?\nকৃত্রিম দাঁত কখনো আসল দাঁতের মতো স্বাভাবিক অনুভূতি দিতে পারে না। রুট ক্যানেলের মাধ্যমে ভেতরের ইনফেকশন দূর করে ক্যানেল সিল করে দেওয়া হয়, যাতে দাঁতটি আজীবন টিকে থাকে।\n\n### কেয়ার পয়েন্ট ডেন্টাল ক্লিনিকে খরচ\n- সামনের দাঁতের রুট ক্যানেল: ৩,০০০ – ৫,০০০ টাকা\n- মাড়ির পেছনের দাঁতের রুট ক্যানেল: ৪,০০০ – ৬,০০০ টাকা\n\nঅভিজ্ঞ ডেন্টাল সার্জনের নিখুঁত চিকিৎসায় এটি এখন সম্পূর্ণ ব্যথামুক্ত।',
  'root canal cost Savar, dental clinic Ashulia, painless root canal Dhaka',
  'রুট ক্যানেল খরচ সাভার, আশুলিয়া ডেন্টাল ক্লিনিক, দাঁতের ব্যথামুক্ত চিকিৎসা',
  '5 min read',
  '৫ মিনিট পড়ার সময়',
  true
),
(
  'why-scaling-and-polishing-is-essential',
  'Why Regular Scaling & Polishing is Crucial for Healthy Gums & Fresh Breath',
  'দাঁতের স্কেলিং ও পলিশিং কেন জরুরি? সাধারণ ভুল ধারণা ও সঠিক তথ্য',
  'Debunking the myth that scaling damages enamel. Discover how ultrasonic cleaning prevents gum disease, loose teeth, and bad breath.',
  'অনেকেই মনে করেন স্কেলিং করলে দাঁত পাতলা বা ফাঁকা হয়ে যায়—এটি কি সত্যি? জানুন কীভাবে নিয়মিত স্কেলিং মাড়ির রোগ ও দুর্গন্ধ দূর করে।',
  '## Debunking the Scaling Myth\n\nA persistent misconception is that ultrasonic scaling shaves away healthy tooth enamel. In truth, dental calculus (hardened tartar) cannot be removed by brushing alone. As tartar builds up along the gumline, it harbors anaerobic bacteria that destroy the supporting bone.\n\n### Benefits of Professional Scaling\n1. Eliminates persistent halitosis (bad breath)\n2. Stops gum bleeding during brushing\n3. Prevents premature tooth mobility and loss\n4. Restores natural tooth smoothness\n\nOur scaling and polishing packages range from ৳1,500 to ৳3,000 depending on calculus severity.',
  '## স্কেলিং নিয়ে ভুল ধারণা\n\nঅনেকের ধারণা স্কেলিং করলে দাঁত ক্ষতিগ্রস্ত হয় বা ফাঁকা হয়ে যায়। এটি সম্পূর্ণ ভুল! প্রকৃতপক্ষে দাঁতের গোড়ায় শক্ত হয়ে যাওয়া প্লাক ও টারটার (পাথর) সাধারণ ব্রাশে দূর হয় না। এই পাথর মাড়িকে নিচে নামিয়ে হাড় ক্ষয় করে দাঁত নড়বড়ে করে দেয়।\n\n### স্কেলিংয়ের মূল উপকারিতা\n১. মুখের দীর্ঘদিনের দুর্গন্ধ দূর করে\n২. ব্রাশ করার সময় মাড়ি থেকে রক্ত পড়া বন্ধ করে\n৩. দাঁত পড়ে যাওয়া প্রতিরোধ করে\n৪. দাগ দূর করে দাঁত ঝকঝকে করে\n\nকেয়ার পয়েন্টে আল্ট্রাসনিক স্কেলারের সাহায্যে মাত্র ১,৫০০ থেকে ৩,০০০ টাকায় সম্পূর্ণ মুখের স্কেলিং ও পলিশিং করা হয়।',
  'teeth scaling cost Savar, dental cleaning Ashulia, gum bleeding treatment',
  'দাঁতের স্কেলিং খরচ, দাঁতের পাথর পরিষ্কার, মাড়ি দিয়ে রক্ত পড়া চিকিৎসা আশুলিয়া',
  '4 min read',
  '৪ মিনিট পড়ার সময়',
  true
),
(
  'zirconia-vs-pfm-crowns-which-is-better',
  'Zirconia vs PFM Dental Crowns: Which One Should You Choose?',
  'জার্কোনিয়া নাকি মেটাল ক্যাপ (PFM): আপনার দাঁতের জন্য কোনটি সেরা?',
  'A clear comparison between Porcelain-Fused-to-Metal (PFM) and premium Monolithic Zirconia crowns regarding strength, aesthetics, and longevity.',
  'দাঁতে ক্যাপ করানোর আগে জেনে নিন পিএফএম এবং জার্কোনিয়া ক্যাপের পার্থক্য, স্থায়িত্ব এবং সঠিক নির্বাচন পদ্ধতি।',
  '## Choosing the Right Dental Crown\n\nAfter a root canal or for heavily restored teeth, a protective crown is vital to prevent catastrophic fractures.\n\n### Porcelain Fused to Metal (PFM)\n- **Pros**: Highly durable, economical (৳4,000 – ৳5,000).\n- **Cons**: Metal substructure may cast a gray shadow near the gumline over time.\n\n### Monolithic Zirconia\n- **Pros**: 100% metal-free, exceptional biocompatibility, translucent natural tooth appearance, virtually chip-proof (৳11,000 – ৳15,000).\n- **Best for**: Front aesthetic zone and patients demanding maximum longevity.',
  '## দাঁতের ক্যাপের সঠিক নির্বাচন\n\nরুট ক্যানেল করার পর দাঁত ভঙ্গুর হয়ে যায়। তাই দাঁতটি যাতে ভেঙে না যায় সেজন্য ক্যাপ পরানো আবশ্যক।\n\n### পিএফএম (মেটাল সিরামিক ক্যাপ)\n- **সুবিধা**: অত্যন্ত মজবুত এবং সাশ্রয়ী (৳৪,০০০ – ৳৫,০০০)।\n- **সীমাবদ্ধতা**: ভেতরে কালো মেটাল থাকায় মাড়ির কাছে হালকা ছায়া পড়তে পারে।\n\n### জার্কোনিয়া ক্যাপ (প্রিমিয়াম)\n- **সুবিধা**: সম্পূর্ণ মেটাল-মুক্ত, দেখতে একদম আসল দাঁতের মতো উজ্জ্বল ও প্রাকৃতিক (৳১১,০০০ – ৳১৫,০০০)। মাড়িতে কোনো কালো দাগ পড়ে না।\n- **উপযুক্ত**: সামনের দাঁতের সৌন্দর্য ও দীর্ঘস্থায়ী নিরাপত্তার জন্য এটিই শ্রেষ্ঠ পছন্দ।',
  'zirconia crown cost Savar, PFM cap price Dhaka, dental cap comparison',
  'জার্কোনিয়া ক্যাপের দাম, দাঁতের ক্যাপ সাভার, ডেন্টাল ক্রাউন আশুলিয়া',
  '5 min read',
  '৫ মিনিট পড়ার সময়',
  true
);

-- 9. Patient Reviews
INSERT INTO public.reviews (patient_name_en, patient_name_bn, treatment_en, treatment_bn, rating, comment_en, comment_bn, date, is_verified, is_featured, sort_order) VALUES
('Tariqul Islam', 'তরিকুল ইসলাম', 'Root Canal & Zirconia Crown', 'রুট ক্যানেল ও জার্কোনিয়া ক্যাপ', 5, 'Completely pain-free root canal treatment. Dr. Aktar Zahan Ony explained everything politely. The clinic is spotless and modern.', 'অসাধারণ অভিজ্ঞতা! একটুও ব্যথা পাইনি। ডাক্তার আপা অত্যন্ত আন্তরিক ও যত্নশীল। চেম্বারটি একদম পরিষ্কার এবং যন্ত্রপাতিগুলো সম্পূর্ণ নতুন ও জীবাণুমুক্ত।', '2 weeks ago', true, true, 1),
('Shamsun Nahar', 'শামসুন নাহার', 'Scaling & Polishing', 'দাঁতের স্কেলিং ও পলিশিং', 5, 'Got scaling done here. Teeth look clean and bright now. Very reasonable price and no gum irritation at all.', 'আশুলিয়ায় এত চমৎকার ডেন্টাল ক্লিনিক সত্যিই প্রশংসনীয়। স্কেলিং করার পর দাঁতের সব দাগ দূর হয়ে গেছে। ডাক্তার ও স্টাফদের ব্যবহার খুব ভালো।', '1 month ago', true, true, 2),
('Md. Rafiqul Hasan', 'মো. রফিকুল হাসান', 'Wisdom Tooth Surgery', 'আক্কেল দাঁতের সার্জারি', 5, 'Had severe wisdom tooth pain for weeks. Dr. Ony performed the surgery quickly and smoothly without any agony. Highly recommended!', 'কয়েক সপ্তাহ ধরে আক্কেল দাঁতের তীব্র যন্ত্রণায় ভুগছিলাম। মাত্র আধা ঘণ্টায় কোনো ঝামেলা ছাড়াই অপারেশন সম্পন্ন হলো। সাভার-আশুলিয়ার সেরা ডেন্টাল ক্লিনিক।', '3 weeks ago', true, true, 3),
('Farzana Akter', 'ফারজানা আক্তার', 'Front Gap Closure', 'সামনের দাঁতের ফাঁকা বন্ধ', 5, 'My front teeth gap was closed in a single sitting with composite bonding. My smile looks completely natural now!', 'এক বসাতেই আমার সামনের দাঁতের ফাঁকা বন্ধ হয়ে গেল। এখন হাসতে কোনো দ্বিধা হয় না। সবাইকে এই ক্লিনিকে আসার পরামর্শ দিচ্ছি।', 'Last month', true, true, 4);
