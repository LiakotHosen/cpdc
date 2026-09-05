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
  Appointment
} from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  id: 'a0000000-0000-0000-0000-000000000001',
  clinic_name_en: 'Care Point Dental Clinic',
  clinic_name_bn: 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক',
  tagline_en: 'Modern, Hygienic & Pain-Free Dental Care in Ashulia, Savar',
  tagline_bn: 'সাভার ও আশুলিয়ায় আধুনিক, সম্পূর্ণ জীবাণুমুক্ত ও ব্যথামুক্ত ডেন্টাল সেবা',
  phone: '+880 1324-558811',
  whatsapp: '+880 1324-558811',
  email: 'carepointoraldental@gmail.com',
  address_en: '2nd Floor, Mofizuddin Tower, Beside UCB Bank Building, Pollibidyut, Ashulia, Savar, Dhaka 1344',
  address_bn: 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক, মোস্তফা হোটেলের উত্তর পাশে স\'মিলের সাথে মফিজ উদ্দিন টাওয়ার (হাংরি টাউন রেস্টুরেন্ট বিল্ডিং), দ্বিতীয় তলা, পল্লীবিদ্যুৎ কবরস্থান রোড বাস স্ট্যান্ড, আশুলিয়া, সাভার',
  hours_en: 'Daily: 4:00 PM – 9:00 PM (Call 30 mins prior for morning appointments)',
  hours_bn: 'প্রতিদিন: বিকাল ৪:০০ টা – রাত ৯:০০ টা (সকালের সিরিয়ালের জন্য ৩০ মিনিট আগে যোগাযোগ করুন)',
  google_maps_url: 'https://maps.app.goo.gl/tTvNAHkod8TfRVPz9?g_st=ac',
  google_maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.781844237597!2d90.278912!3d23.900456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDU0JzAxLjYiTiA5MMKwMTYnNDQuMSJF!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd',
  facebook_url: 'https://www.facebook.com/carepointdentalclinic',
  hero_badge_en: 'Ashulia & Savar’s Trusted Dental Care',
  hero_badge_bn: 'আশুলিয়া ও সাভারবাসীর নির্ভরযোগ্য আধুনিক ডেন্টাল কেয়ার',
  hero_headline_en: 'Gentle, Advanced & Pain-Free Dentistry For Your Entire Family',
  hero_headline_bn: 'ব্যথামুক্ত আধুনিক চিকিৎসা, আপনার সুন্দর ও আত্মবিশ্বাসী হাসির পূর্ণ আস্থা',
  hero_subheadline_en: 'Equipped with digital RVG X-ray, hospital-grade autoclave sterilization, and experienced oral surgery by Dr. Aktar Zahan Ony.',
  hero_subheadline_bn: 'প্রতিটি রোগীর সুরক্ষায় ১০০% আন্তর্জাতিক স্ট্যান্ডার্ড ক্লাস-বি অটোক্লেভ জীবাণুমুক্ত পরিবেশ, মাত্র ২০০ টাকায় ডিজিটাল আরভিজি এক্স-রে এবং অভিজ্ঞ ডেন্টাল সার্জনের নিখুঁত যত্ন।',
  hero_cta_text_en: 'Book an Appointment',
  hero_cta_text_bn: 'সিরিয়াল নিশ্চিত করুন (পরামর্শ ফি ৳২০০)',
  hero_image_url: '/images/logo.jpeg',
  google_review_url: 'https://search.google.com/local/writereview?placeid=carepointdentalclinic'
};

export const INITIAL_DOCTOR: Doctor = {
  id: 'b0000000-0000-0000-0000-000000000001',
  name_en: 'Dr. Aktar Zahan Ony',
  name_bn: 'ডা. আক্তার জাহান অনি',
  title_en: 'Oral & Dental Surgeon',
  title_bn: 'ওরাল এন্ড ডেন্টাল সার্জন',
  qualifications_en: 'BDS, MPH, JU',
  qualifications_bn: 'বিডিএস (রাবি), এমপিএইচ (জেইউ)',
  bmdc_reg: '12990',
  bio_en: 'Dedicated Oral & Dental Surgeon with specialized expertise in advanced endodontics, cosmetic smile design, and pain-free surgical tooth extractions. Dr. Ony is devoted to 100% sterile protocols and empathetic patient care for adults and children.',
  bio_bn: 'অভিজ্ঞ ওরাল এন্ড ডেন্টাল সার্জন। রুট ক্যানেল, কসমেটিক স্মাইল ডিজাইন, আঁকাবাঁকা দাঁতের চিকিৎসা ও ব্যথামুক্ত সার্জারিতে বিশেষভাবে দক্ষ। রোগীর সর্বোচ্চ শারীরিক নিরাপত্তা, শতভাগ জীবাণুমুক্ত পরিবেশ ও পরিবারের মতো আন্তরিক সেবায় সর্বদা নিবেদিতপ্রাণ।',
  consulting_hours_en: '04:00 PM to 09:00 PM Daily',
  consulting_hours_bn: 'প্রতিদিন বিকাল ৪:০০ টা – রাত ৯:০০ টা',
  photo_url: '/images/doctor-ony.jpg',
  is_active: true
};

export const INITIAL_FEATURES: Feature[] = [
  {
    id: 'feat-1',
    title_en: 'Modern Equipment & Technology',
    title_bn: 'আধুনিক যন্ত্রপাতি ও প্রযুক্তি',
    description_en: 'Equipped with the latest dental technology for precision diagnostics and treatment.',
    description_bn: 'সঠিক ও নিখুঁত চিকিৎসার জন্য অত্যাধুনিক আন্তর্জাতিক মানের ইকুইপমেন্ট।',
    icon_name: 'Cpu',
    sort_order: 1,
    is_active: true
  },
  {
    id: 'feat-2',
    title_en: 'Premium Treatment Materials',
    title_bn: 'উন্নত মানের চিকিৎসা সামগ্রী',
    description_en: 'We strictly use imported, certified, biocompatible dental materials.',
    description_bn: 'আন্তর্জাতিক মানের সার্টিফায়েড ও টেকসই চিকিৎসা সামগ্রী ব্যবহার করা হয়।',
    icon_name: 'Sparkles',
    sort_order: 2,
    is_active: true
  },
  {
    id: 'feat-3',
    title_en: 'Experienced Dental Surgeon',
    title_bn: 'অভিজ্ঞ ও দক্ষ ডেন্টাল সার্জন',
    description_en: 'Direct personalized care by Dr. Aktar Zahan Ony (BDS, MPH, JU, BMDC 12990).',
    description_bn: 'দক্ষ ও অভিজ্ঞ বিএমডিসি নিবন্ধিত ডেন্টাল সার্জন দ্বারা সরাসরি চিকিৎসা।',
    icon_name: 'UserCheck',
    sort_order: 3,
    is_active: true
  },
  {
    id: 'feat-4',
    title_en: 'Clean & Hygienic Environment',
    title_bn: 'পরিষ্কার-পরিচ্ছন্ন ও স্বাস্থ্যসম্মত পরিবেশ',
    description_en: 'Spotless clinical spaces ensuring ultimate comfort for patients and families.',
    description_bn: 'রোগী ও স্বজনদের জন্য সর্বদা পরিচ্ছন্ন, নিরাপদ ও আরামদায়ক পরিবেশ।',
    icon_name: 'Smile',
    sort_order: 4,
    is_active: true
  },
  {
    id: 'feat-5',
    title_en: '100% Sterile Treatment Arena',
    title_bn: 'সম্পূর্ণ জীবাণুমুক্ত (Sterile) পরিবেশ',
    description_en: 'Hospital-standard infection control for complete cross-contamination prevention.',
    description_bn: 'ক্রস-সংক্রমণ রোধে শতভাগ আন্তর্জাতিক স্ট্যান্ডার্ড জীবাণুমুক্ত পরিবেশ।',
    icon_name: 'ShieldCheck',
    sort_order: 5,
    is_active: true
  },
  {
    id: 'feat-6',
    title_en: 'Autoclave & UV Sterilization',
    title_bn: 'Autoclave ও UV Sterilizer প্রযুক্তি',
    description_en: 'All tools undergo rigorous multi-stage autoclave and ultraviolet sterilization.',
    description_bn: 'প্রতিটি মেটাল ইন্সট্রুমেন্ট স্বয়ংক্রিয় অটোক্লেভ ও ইউভি মেশিনে জীবাণুমুক্ত হয়।',
    icon_name: 'Flame',
    sort_order: 6,
    is_active: true
  },
  {
    id: 'feat-7',
    title_en: 'Individual Disposable Kits',
    title_bn: 'আলাদা ডিসপোজেবল সামগ্রী সেট',
    description_en: 'New gloves, needles, cups, and suction tips opened right in front of you.',
    description_bn: 'নতুন গ্লাভস, নিডল, গ্লাস ও সাকশন টিপস প্রতি রোগীর সামনে খোলা হয়।',
    icon_name: 'PackageCheck',
    sort_order: 7,
    is_active: true
  },
  {
    id: 'feat-8',
    title_en: 'Instant Digital RVG X-Ray',
    title_bn: 'ডিজিটাল RVG এক্স-রে সুবিধা',
    description_en: 'Ultra-low radiation digital radiography for immediate on-screen diagnosis.',
    description_bn: 'কম রেডিয়েশনের তাৎক্ষণিক ও নির্ভুল ডিজিটাল এক্স-রে ডায়াগনোসিস।',
    icon_name: 'ScanLine',
    sort_order: 8,
    is_active: true
  },
  {
    id: 'feat-9',
    title_en: 'Fast & Accurate Diagnosis',
    title_bn: 'দ্রুত ও সঠিক ডায়াগনোসিস',
    description_en: 'Pinpoint diagnosis saving your valuable time and preventing complications.',
    description_bn: 'সঠিক সমস্যা দ্রুত শনাক্ত করে অপ্রয়োজনীয় চিকিৎসার ঝুঁকি এড়ানো হয়।',
    icon_name: 'CheckCircle2',
    sort_order: 9,
    is_active: true
  },
  {
    id: 'feat-10',
    title_en: 'Uninterrupted Power Backup',
    title_bn: 'সার্বক্ষণিক বিদ্যুৎ ব্যবস্থা (Power Backup)',
    description_en: 'Instant generator backup ensures uninterrupted dental procedures.',
    description_bn: 'চিকিৎসাধীন অবস্থায় বিদ্যুৎ বিভ্রাট এড়াতে সার্বক্ষণিক ব্যাকআপ ব্যবস্থা।',
    icon_name: 'Zap',
    sort_order: 10,
    is_active: true
  },
  {
    id: 'feat-11',
    title_en: 'Full Air-Conditioned Comfort',
    title_bn: 'শীতাতপ নিয়ন্ত্রিত (AC) পরিবেশ',
    description_en: 'Relaxing, climate-controlled clinical suites for maximum patient ease.',
    description_bn: 'চেম্বারে অপেক্ষার সময় এবং চিকিৎসা চলাকালীন আরামদায়ক পরিবেশ।',
    icon_name: 'Wind',
    sort_order: 11,
    is_active: true
  },
  {
    id: 'feat-12',
    title_en: '24/7 CCTV Security',
    title_bn: 'সার্বক্ষণিক সিসি ক্যামেরা নিরাপত্তা',
    description_en: 'Round-the-clock surveillance for patient and asset protection.',
    description_bn: 'নিরাপত্তা নিশ্চিত করতে পুরো ক্লিনিক সার্বক্ষণিক নজরদারিতে থাকে।',
    icon_name: 'Video',
    sort_order: 12,
    is_active: true
  },
  {
    id: 'feat-13',
    title_en: 'Pain-Free Treatment Approach',
    title_bn: 'ব্যথামুক্ত (Pain-free) চিকিৎসা পদ্ধতি',
    description_en: 'Modern gentle anesthesia techniques for comfortable, anxiety-free visits.',
    description_bn: 'আধুনিক লোকাল এনেস্থেসিয়া ও দক্ষ হাতের স্পর্শে ব্যথামুক্ত চিকিৎসা।',
    icon_name: 'HeartPulse',
    sort_order: 13,
    is_active: true
  },
  {
    id: 'feat-14',
    title_en: 'Emergency Dental Facility',
    title_bn: 'জরুরি ডেন্টাল চিকিৎসা সুবিধা',
    description_en: 'Prompt relief for severe toothache, fractures, and accidental dental trauma.',
    description_bn: 'তীব্র দাঁত ব্যথা বা সড়ক দুর্ঘটনায় দাঁতের আঘাতজনিত দ্রুত জরুরি সেবা।',
    icon_name: 'AlertCircle',
    sort_order: 14,
    is_active: true
  },
  {
    id: 'feat-15',
    title_en: 'Caring & Sincere Patient Support',
    title_bn: 'রোগীর প্রতি আন্তরিক ও যত্নশীল সেবা',
    description_en: 'We listen patiently, explain procedures clearly, and provide thoughtful aftercare.',
    description_bn: 'রোগীর মনের ভয় দূর করে আন্তরিক ও আন্তরিকতাপূর্ণ পারিবারিক যত্ন।',
    icon_name: 'HeartHandshake',
    sort_order: 15,
    is_active: true
  },
  {
    id: 'feat-16',
    title_en: 'Easy Serial & Online Booking',
    title_bn: 'সহজ সিরিয়াল ও অনলাইন অ্যাপয়েন্টমেন্ট',
    description_en: 'Book via phone, WhatsApp, or instant website reservation.',
    description_bn: 'ফোনে, হোয়াটসঅ্যাপে বা ওয়েবসাইট থেকে ঘরে বসেই সহজ সিরিয়াল বুকিং।',
    icon_name: 'CalendarCheck',
    sort_order: 16,
    is_active: true
  },
  {
    id: 'feat-17',
    title_en: 'Flexible Scheduling',
    title_bn: 'সুবিধাজনক সময়ে রোগী দেখার ব্যবস্থা',
    description_en: 'Daily evening slots with advance morning booking options.',
    description_bn: 'ব্যস্ত পেশাজীবী ও স্থানীয়দের জন্য সান্ধ্যকালীন ও পূর্বনির্ধারিত সকালের স্লট।',
    icon_name: 'Clock',
    sort_order: 17,
    is_active: true
  }
];

export const INITIAL_CATEGORIES: ServiceCategory[] = [
  {
    id: 'c1',
    slug: 'general-diagnostic',
    name_en: 'General & Diagnostic',
    name_bn: 'সাধারণ ও রোগ নির্ণয়',
    description_en: 'Comprehensive oral consultations, digital RVG x-rays, and routine ultrasonic cleaning.',
    description_bn: 'প্রাথমিক চেকআপ, আধুনিক ডিজিটাল এক্স-রে ও দাঁতের সার্বিক রোগ নির্ণয়।',
    icon_name: 'Stethoscope',
    sort_order: 1
  },
  {
    id: 'c2',
    slug: 'cosmetic-dentistry',
    name_en: 'Cosmetic Dentistry',
    name_bn: 'কসমেটিক ডেন্টিস্ট্রি ও স্মাইল ডিজাইন',
    description_en: 'Advanced teeth whitening, front teeth aesthetic gap closure, and personalized smile designing.',
    description_bn: 'দাঁতের স্বাভাবিক শুভ্রতা ফেরানো ও হাসির সৌন্দর্য বৃদ্ধি।',
    icon_name: 'Sparkles',
    sort_order: 2
  },
  {
    id: 'c3',
    slug: 'restorative',
    name_en: 'Restorative Dentistry',
    name_bn: 'দাঁতের ফিলিং, ক্যাপ ও ব্রিজ',
    description_en: 'Tooth-colored composite fillings, durable PFM and high-strength Zirconia ceramic crowns and bridges.',
    description_bn: 'ক্ষয়প্রাপ্ত দাঁত মেরামত এবং ক্যাপ ও ব্রিজের মাধ্যমে দাঁত সংরক্ষণ।',
    icon_name: 'Shield',
    sort_order: 3
  },
  {
    id: 'c4',
    slug: 'root-canal',
    name_en: 'Root Canal Treatment (RCT)',
    name_bn: 'রুট ক্যানেল চিকিৎসা',
    description_en: 'Single or multi-visit painless root canal therapy for anterior and posterior teeth saving infected natural teeth.',
    description_bn: 'প্রদাহ বা ইনফেকশনে আক্রান্ত প্রাকৃতিক দাঁত রক্ষা করার ব্যথামুক্ত চিকিৎসা।',
    icon_name: 'Activity',
    sort_order: 4
  },
  {
    id: 'c5',
    slug: 'oral-surgery',
    name_en: 'Oral & Dental Surgery',
    name_bn: 'ওরাল ও ডেন্টাল সার্জারি',
    description_en: 'Simple and surgical tooth extractions, impacted wisdom tooth removal, and periapical surgery.',
    description_bn: 'আক্কেল দাঁতের জটিল অপারেশন ও সার্জিক্যাল পদ্ধতিতে ব্যথামুক্ত দাঁত অপসারণ।',
    icon_name: 'Scissors',
    sort_order: 5
  },
  {
    id: 'c6',
    slug: 'dentures',
    name_en: 'Dentures & Prosthodontics',
    name_bn: 'কৃত্রিম দাঁত ও ডেনচার',
    description_en: 'Flexible dentures, acrylic partials, cast partials, and full complete denture solutions.',
    description_bn: 'হারিয়ে যাওয়া দাঁতের বদলে সহজে ব্যবহারযোগ্য আরামদায়ক কৃত্রিম দাঁত।',
    icon_name: 'Layers',
    sort_order: 6
  },
  {
    id: 'c7',
    slug: 'pediatric',
    name_en: 'Pediatric Dentistry',
    name_bn: 'শিশুদের দাঁতের চিকিৎসা',
    description_en: 'Child-friendly dental fillings, painless primary extractions, and preventive sealants.',
    description_bn: 'শিশুদের দাঁতের যত্ন ও ক্ষয়রোধে বিশেষায়িত ও মমতাময়ী চিকিৎসা সেবা।',
    icon_name: 'Baby',
    sort_order: 7
  },
  {
    id: 'c8',
    slug: 'orthodontics',
    name_en: 'Orthodontics',
    name_bn: 'আঁকাবাঁকা দাঁত সোজা করা',
    description_en: 'Removable and fixed orthodontic appliances to straighten crooked, crowded, or spaced teeth.',
    description_bn: 'আঁকাবাঁকা, ফাঁকা বা অসমান দাঁত সুন্দর বিন্যাসে সোজা করার চিকিৎসা।',
    icon_name: 'SmilePlus',
    sort_order: 8
  },
  {
    id: 'c9',
    slug: 'implants',
    name_en: 'Dental Implants',
    name_bn: 'স্থায়ী ডেন্টাল ইমপ্ল্যান্ট',
    description_en: 'Modern titanium implants restoring permanent functional and aesthetic teeth.',
    description_bn: 'প্রাকৃতিক দাঁতের মতো স্থায়ীভাবে টাইটানিয়াম পোস্ট বসিয়ে নতুন দাঁত প্রতিস্থাপন।',
    icon_name: 'Anchor',
    sort_order: 9
  },
  {
    id: 'c10',
    slug: 'preventive',
    name_en: 'Preventive Dental Care',
    name_bn: 'দাঁত ও মাড়ির প্রতিরোধমূলক যত্ন',
    description_en: 'Fluoride varnish, SDF pit and fissure sealants, and pulp vitality management.',
    description_bn: 'দাঁতের ক্ষয় ও সেনসিটিভিটি থেকে আগে থেকেই সুরক্ষা নিশ্চিতকরণ।',
    icon_name: 'ShieldCheck',
    sort_order: 10
  }
];

export const INITIAL_SERVICES: Service[] = [
  // General & Diagnostic
  {
    id: 's1',
    category_id: 'c1',
    slug: 'consultation',
    name_en: 'Doctor Consultation',
    name_bn: 'ডেন্টাল কনসালটেশন / পরামর্শ',
    short_desc_en: 'Detailed clinical examination, diagnosis, and personalized treatment planning.',
    short_desc_bn: 'মুখ ও দাঁতের পূর্ণাঙ্গ পর্যবেক্ষণ ও সুনির্দিষ্ট চিকিৎসা পরিকল্পনা।',
    price_min: 200,
    price_max: 200,
    price_unit_en: 'per visit',
    price_unit_bn: 'প্রতি ভিজিট',
    price_note_en: 'Fixed Consultation Fee',
    price_note_bn: 'নির্ধারিত কনসালটেশন ফি',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 1
  },
  {
    id: 's2',
    category_id: 'c1',
    slug: 'rvg-xray',
    name_en: 'Dental X-ray (RVG)',
    name_bn: 'ডিজিটাল ডেন্টাল এক্স-রে (RVG)',
    short_desc_en: 'Instant high-resolution digital radiograph with ultra-low radiation exposure.',
    short_desc_bn: 'কম রেডিয়েশনে তাৎক্ষণিক ডিজিটাল এক্স-রে ছবি ও সঠিক ডায়াগনোসিস।',
    price_min: 200,
    price_max: 200,
    price_unit_en: 'per film',
    price_unit_bn: 'প্রতি এক্স-রে',
    price_note_en: 'Fixed Fee',
    price_note_bn: 'নির্ধারিত ফি',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 2
  },
  {
    id: 's3',
    category_id: 'c1',
    slug: 'scaling-polishing',
    name_en: 'Scaling & Polishing',
    name_bn: 'স্কেলিং ও পলিশিং',
    short_desc_en: 'Ultrasonic tartar, calculus, and tobacco stain removal with enamel polishing.',
    short_desc_bn: 'আল্ট্রাসনিক স্কেলারে দাঁতের পাথর ও দাগ দূর করে উজ্জ্বল পলিশ।',
    price_min: 1500,
    price_max: 3000,
    price_unit_en: 'full mouth',
    price_unit_bn: 'সম্পূর্ণ মুখ',
    price_note_en: 'Based on tartar buildup severity',
    price_note_bn: 'দাঁতে জমে থাকা পাথরের তীব্রতার ওপর নির্ভরশীল',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 3
  },

  // Cosmetic Dentistry
  {
    id: 's4',
    category_id: 'c2',
    slug: 'tooth-whitening',
    name_en: 'Tooth Whitening (Bleaching)',
    name_bn: 'টুথ হোয়াইটনিং / দাঁত সাদা করা',
    short_desc_en: 'In-clinic professional whitening removing deep stains for shades-brighter smiles.',
    short_desc_bn: 'ক্লিনিক্যাল ব্লিচিংয়ের মাধ্যমে হলুদ দাগ দূর করে দাঁত উজ্জ্বল সাদা করা।',
    price_min: 6000,
    price_max: 12000,
    price_unit_en: 'full arch',
    price_unit_bn: 'সম্পূর্ণ দাঁত',
    price_note_en: 'Depending on staining severity',
    price_note_bn: 'দাগের মাত্রা অনুযায়ী খরচ নির্ধারিত হয়',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 4
  },
  {
    id: 's5',
    category_id: 'c2',
    slug: 'smile-designing',
    name_en: 'Smile Designing',
    name_bn: 'স্মাইল ডিজাইনিং',
    short_desc_en: 'Custom aesthetic smile makeover combining contouring, bonding, and veneers.',
    short_desc_bn: 'আপনার মুখের গড়ন ও হাসির সাথে সামঞ্জস্য রেখে পূর্ণাঙ্গ স্মাইল মেকওভার।',
    price_min: 15000,
    price_max: 30000,
    price_unit_en: 'per case',
    price_unit_bn: 'প্রতি কেস',
    price_note_en: 'Customized aesthetic treatment plan',
    price_note_bn: 'ব্যক্তিগত প্ল্যানের ওপর ভিত্তি করে',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 5
  },
  {
    id: 's6',
    category_id: 'c2',
    slug: 'gap-closure',
    name_en: 'Front Teeth Gap Closure',
    name_bn: 'সামনের দাঁতের ফাঁকা বন্ধ করা (Diastema)',
    short_desc_en: 'Direct aesthetic composite resin closure of spacing in a single sitting.',
    short_desc_bn: 'দাঁতের কোনো ক্ষতি ছাড়া একই দিনে সামনের দাঁতের দৃষ্টিকটু ফাঁকা বন্ধ।',
    price_min: 5000,
    price_max: 10000,
    price_unit_en: 'per area',
    price_unit_bn: 'প্রতিটি ফাঁকা',
    price_note_en: 'Based on width of gap',
    price_note_bn: 'ফাঁকা অংশের বিস্তৃতির ওপর নির্ভর করে',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 6
  },

  // Restorative
  {
    id: 's7',
    category_id: 'c3',
    slug: 'composite-filling',
    name_en: 'Tooth-Colored Filling (Composite)',
    name_bn: 'দাঁতের রঙের কসমেটিক ফিলিং',
    short_desc_en: 'Natural-shade composite filling that blends seamlessly with your tooth enamel.',
    short_desc_bn: 'দাঁতের রঙের সাথে মিলিয়ে তৈরি দীর্ঘস্থায়ী ও মজবুত লাইট-কিউরড ফিলিং।',
    price_min: 1500,
    price_max: 4000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Based on cavity depth and surfaces',
    price_note_bn: 'দাঁতের গহ্বর বা ক্ষতের পরিমাণের ওপর নির্ভর করে',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 7
  },
  {
    id: 's8',
    category_id: 'c3',
    slug: 'crown-pfm',
    name_en: 'Cap / Crown – PFM',
    name_bn: 'দাঁতের ক্যাপ – পিএফএম (মেটাল-সিরামিক)',
    short_desc_en: 'Time-tested strong porcelain-fused-to-metal dental crown.',
    short_desc_bn: 'ভেতরে মেটাল ও বাইরে দাঁতের রঙের সিরামিক ক্যাপ।',
    price_min: 4000,
    price_max: 5000,
    price_unit_en: 'per unit',
    price_unit_bn: 'প্রতিটি ক্যাপ',
    price_note_en: 'Durable aesthetic crown',
    price_note_bn: 'মজবুত ও স্থায়ী ক্যাপ',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 8
  },
  {
    id: 's9',
    category_id: 'c3',
    slug: 'crown-zirconia',
    name_en: 'Cap / Crown – Zirconia',
    name_bn: 'দাঁতের ক্যাপ – জার্কোনিয়া (প্রিমিয়াম)',
    short_desc_en: 'Metal-free, biocompatible, ultra-aesthetic monolithic zirconia ceramic crown.',
    short_desc_bn: '১০০% মেটাল-মুক্ত, অত্যন্ত নিখুঁত ও প্রাকৃতিক দাঁতের মতো উজ্জ্বল ক্যাপ।',
    price_min: 11000,
    price_max: 15000,
    price_unit_en: 'per unit',
    price_unit_bn: 'প্রতিটি ক্যাপ',
    price_note_en: 'Premium metal-free aesthetic crown',
    price_note_bn: 'প্রিমিয়াম কোয়ালিটি জার্কোনিয়া',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 9
  },
  {
    id: 's10',
    category_id: 'c3',
    slug: 'bridge-per-unit',
    name_en: 'Dental Bridge',
    name_bn: 'দাঁতের ব্রিজ (Bridge)',
    short_desc_en: 'Fixed replacement for missing teeth anchored to adjacent natural teeth.',
    short_desc_bn: 'হারানো দাঁতের জায়গায় পাশের দাঁতের সহায়তায় স্থায়ী ব্রিজ স্থাপন।',
    price_min: 5000,
    price_max: 6000,
    price_unit_en: 'per unit',
    price_unit_bn: 'প্রতি ইউনিট',
    price_note_en: 'Cost per unit multiplied by teeth replaced',
    price_note_bn: 'প্রয়োজনীয় ইউনিটের সংখ্যা অনুযায়ী খরচ',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 10
  },

  // Root Canal
  {
    id: 's11',
    category_id: 'c4',
    slug: 'root-canal-anterior',
    name_en: 'Root Canal – Anterior',
    name_bn: 'রুট ক্যানেল – সামনের দাঁত',
    short_desc_en: 'Painless extirpation of infected nerve tissues in front incisors or canines.',
    short_desc_bn: 'সামনের দাঁতের ইনফেকশন দূর করে প্রাকৃতিক দাঁত অক্ষত রাখার ব্যথামুক্ত চিকিৎসা।',
    price_min: 3000,
    price_max: 5000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Single or dual visits',
    price_note_bn: 'ইনফেকশনের মাত্রার ওপর নির্ভর করে',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 11
  },
  {
    id: 's12',
    category_id: 'c4',
    slug: 'root-canal-posterior',
    name_en: 'Root Canal – Posterior',
    name_bn: 'রুট ক্যানেল – পেছনের দাঁত (মাড়ির দাঁত)',
    short_desc_en: 'Complex multi-rooted nerve therapy saving severe molar decay from extraction.',
    short_desc_bn: 'মাড়ির বহু শিকড়বিশিষ্ট দাঁতের জটিল ইনফেকশন সারিয়ে দাঁত সংরক্ষণ।',
    price_min: 4000,
    price_max: 6000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Based on canal anatomy & curvature',
    price_note_bn: 'দাঁতের ক্যানেল সংখ্যা ও জটিলতার ওপর নির্ভর করে',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 12
  },
  {
    id: 's13',
    category_id: 'c4',
    slug: 'pulp-capping',
    name_en: 'Pulp Capping',
    name_bn: 'পাল্প ক্যাপিং',
    short_desc_en: 'Protective medicament placed over exposed nerve to prevent root canal.',
    short_desc_bn: 'গভীর ক্যাভিটিতে স্নায়ু সুরক্ষিত করে রুট ক্যানেলের প্রয়োজনীয়তা এড়ানোর চেষ্টা।',
    price_min: 2000,
    price_max: 3500,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Vital pulp therapy',
    price_note_bn: 'স্নায়ু রক্ষাকারী চিকিৎসা',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 13
  },
  {
    id: 's14',
    category_id: 'c4',
    slug: 'pulpectomy',
    name_en: 'Pulpectomy',
    name_bn: 'পালপেকটমি',
    short_desc_en: 'Complete nerve removal in pediatric or emergency acute pulpitis cases.',
    short_desc_bn: 'তীব্র ব্যথায় স্নায়ু অপসারণ করে দাঁতের ব্যথা দ্রুত নিরাময়।',
    price_min: 3000,
    price_max: 4000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Emergency pain relief',
    price_note_bn: 'জরুরি ব্যথা উপশমে',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 14
  },

  // Oral Surgery
  {
    id: 's15',
    category_id: 'c5',
    slug: 'extraction-normal',
    name_en: 'Tooth Extraction (Normal)',
    name_bn: 'দাঁত তোলা – সাধারণ',
    short_desc_en: 'Gentle, atraumatic removal of non-restorable teeth under local anesthesia.',
    short_desc_bn: 'লোকাল অ্যানেস্থেসিয়া দিয়ে অত্যন্ত সতর্কতায় ব্যথাহীনভাবে দাঁত তোলা।',
    price_min: 700,
    price_max: 2000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Based on tooth mobility & roots',
    price_note_bn: 'দাঁতের শিকড় ও অবস্থার ওপর ভিত্তি করে',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 15
  },
  {
    id: 's16',
    category_id: 'c5',
    slug: 'extraction-surgical',
    name_en: 'Tooth Extraction (Surgical)',
    name_bn: 'দাঁত তোলা – সার্জিক্যাল',
    short_desc_en: 'Surgical elevation and sectioning of broken roots or difficult impactions.',
    short_desc_bn: 'ভেঙে যাওয়া শিকড় বা জটিল দাঁত বিশেষ সার্জিক্যাল পদ্ধতিতে অপসারণ।',
    price_min: 3000,
    price_max: 4000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'For broken roots or ankylosed teeth',
    price_note_bn: 'মাড়িতে আটকে থাকা ভাঙা শিকড়ের ক্ষেত্রে',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 16
  },
  {
    id: 's17',
    category_id: 'c5',
    slug: 'wisdom-tooth-surgery',
    name_en: 'Wisdom Tooth Surgery',
    name_bn: 'আক্কেল দাঁত সার্জারি (ইম্প্যাকশন)',
    short_desc_en: 'Microsurgical removal of painful impacted or horizontally lying 3rd molars.',
    short_desc_bn: 'হাড় বা মাড়ির নিচে আটকে থাকা যন্ত্রণাদায়ক আক্কেল দাঁতের সফল অপারেশন।',
    price_min: 4000,
    price_max: 8000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Based on bone impaction depth',
    price_note_bn: 'হাড়ের গভীরতা ও পজিশনের ওপর নির্ভরশীল',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 17
  },
  {
    id: 's18',
    category_id: 'c5',
    slug: 'periapical-surgery',
    name_en: 'Periapical Surgery (Apicoectomy)',
    name_bn: 'পেরি-এপিক্যাল সার্জারি (এপিকোয়েকটমি)',
    short_desc_en: 'Surgical excision of chronic root apex cysts or unresolved periapical lesions.',
    short_desc_bn: 'দাঁতের গোড়ায় সৃষ্ট সিস্ট বা দীর্ঘস্থায়ী ইনফেকশন সার্জারির মাধ্যমে অপসারণ।',
    price_min: 8000,
    price_max: 13000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Includes surgical curettage and retrograde seal',
    price_note_bn: 'মাইক্রোসার্জিক্যাল কিউরেটেজ সহ',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 18
  },
  {
    id: 's19',
    category_id: 'c5',
    slug: 'biopsy-surgery',
    name_en: 'Biopsy Surgery',
    name_bn: 'ওরাল বায়োপসি সার্জারি',
    short_desc_en: 'Diagnostic tissue specimen harvesting for histopathological evaluation.',
    short_desc_bn: 'মুখের যেকোনো সন্দেহজনক ঘা বা মাংসপিণ্ডের ডায়াগনস্টিক টিস্যু পরীক্ষা।',
    price_min: 3000,
    price_max: 3000,
    price_unit_en: 'per procedure',
    price_unit_bn: 'প্রতি টেস্ট',
    price_note_en: 'Fixed biopsy collection fee',
    price_note_bn: 'সার্জিক্যাল স্যাম্পল কালেকশন ফি',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 19
  },
  {
    id: 's20',
    category_id: 'c5',
    slug: 'tooth-avulsion',
    name_en: 'Tooth Avulsion Management',
    name_bn: 'দুর্ঘটনায় খুলে যাওয়া দাঁত পুনঃস্থাপন',
    short_desc_en: 'Immediate emergency reimplantation and splinting of knocked-out natural tooth.',
    short_desc_bn: 'আঘাতজনিত কারণে উপড়ে আসা দাঁত দ্রুত পুনঃস্থাপন ও স্প্লিন্টিং।',
    price_min: 15000,
    price_max: 15000,
    price_unit_en: 'per procedure',
    price_unit_bn: 'প্রতি চিকিৎসা',
    price_note_en: 'Emergency splinting and stabilizing',
    price_note_bn: 'জরুরি ট্রমা ম্যানেজমেন্ট',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 20
  },
  {
    id: 's21',
    category_id: 'c5',
    slug: 'fracture-management',
    name_en: 'Jaw & Tooth Fracture Management',
    name_bn: 'চোয়াল ও দাঁতের ফ্র্যাকচার চিকিৎসা',
    short_desc_en: 'Fixation and stabilization of alveolar and facial trauma injuries.',
    short_desc_bn: 'চোয়াল ও দাঁতের আঘাতপ্রাপ্ত ফ্র্যাকচারের জরুরি ফিক্সেশন।',
    price_min: null,
    price_max: null,
    price_unit_en: 'custom',
    price_unit_bn: 'পরামর্শ সাপেক্ষে',
    price_note_en: 'Requires emergency clinical exam',
    price_note_bn: 'চোটের জটিলতা দেখে পরামর্শ সাপেক্ষে',
    is_consultation_only: true,
    is_featured: false,
    sort_order: 21
  },
  {
    id: 's22',
    category_id: 'c5',
    slug: 'dental-gingival-surgery',
    name_en: 'Dental & Gingival Surgery',
    name_bn: 'ডেন্টাল ও মাড়ির সার্জারি',
    short_desc_en: 'Gingivectomy, flap debridement, and periodontal recontouring surgery.',
    short_desc_bn: 'মাড়ির সংক্রমণ, ফোলা বা রক্ত পড়ার নিরাময়ে গাম সার্জারি।',
    price_min: null,
    price_max: null,
    price_unit_en: 'custom',
    price_unit_bn: 'পরামর্শ সাপেক্ষে',
    price_note_en: 'Evaluated upon periodontal charting',
    price_note_bn: 'মাড়ির গভীরতার ওপর ভিত্তি করে',
    is_consultation_only: true,
    is_featured: false,
    sort_order: 22
  },

  // Dentures
  {
    id: 's23',
    category_id: 'c6',
    slug: 'partial-denture-acrylic',
    name_en: 'Partial Denture – Acrylic',
    name_bn: 'আংশিক কৃত্রিম দাঁত – অ্যাক্রিলিক',
    short_desc_en: 'Affordable removable acrylic replacement for lost teeth.',
    short_desc_bn: 'স্বল্প খরচে সহজে খোলা-পড়া যায় এমন আংশিক কৃত্রিম দাঁত।',
    price_min: 1000,
    price_max: 1000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Cost increases with number of teeth',
    price_note_bn: 'দাঁতের সংখ্যার ওপর ভিত্তি করে নির্ধারিত',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 23
  },
  {
    id: 's24',
    category_id: 'c6',
    slug: 'fibre-partial-denture',
    name_en: 'Fibre Partial Denture',
    name_bn: 'ফাইবার পার্টিয়াল ডেনচার',
    short_desc_en: 'Fibre-reinforced aesthetic denture providing higher fracture resistance.',
    short_desc_bn: 'ফাইবার রিইনফোর্সড উন্নত ও টেকসই আংশিক কৃত্রিম দাঁত।',
    price_min: 2500,
    price_max: 2500,
    price_unit_en: 'per unit',
    price_unit_bn: 'প্রতি ইউনিট',
    price_note_en: 'Standard aesthetic replacement',
    price_note_bn: 'উন্নত মানের ফাইবার ম্যাটেরিয়াল',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 24
  },
  {
    id: 's25',
    category_id: 'c6',
    slug: 'partial-denture',
    name_en: 'Partial Denture (Standard)',
    name_bn: 'পার্টিয়াল ডেনচার (স্ট্যান্ডার্ড)',
    short_desc_en: 'Comfortable standard partial denture restoring chewing capacity.',
    short_desc_bn: 'চাবানোর ক্ষমতা ও চেহারার স্বাভাবিক ভাব ফিরিয়ে আনে।',
    price_min: 4000,
    price_max: 4000,
    price_unit_en: 'per unit',
    price_unit_bn: 'প্রতি সেট',
    price_note_en: 'Standard custom fit',
    price_note_bn: 'কাস্টম ফিটিং সেট',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 25
  },
  {
    id: 's26',
    category_id: 'c6',
    slug: 'flexible-denture',
    name_en: 'Flexible Denture (Valplast)',
    name_bn: 'ফ্লেক্সিবল ডেনচার (নরম ও আরামদায়ক)',
    short_desc_en: 'Unbreakable, ultra-comfortable, gum-shaded flexible nylon prosthesis.',
    short_desc_bn: 'ভেঙে যাওয়ার ভয় নেই, মাড়ির রঙের সাথে মানানসই ও অত্যন্ত আরামদায়ক।',
    price_min: 4000,
    price_max: 4000,
    price_unit_en: 'per unit',
    price_unit_bn: 'প্রতি ইউনিট',
    price_note_en: 'Lightweight & unbreakable nylon',
    price_note_bn: 'হালকা ও দীর্ঘস্থায়ী ফ্লেক্সিবল ম্যাটেরিয়াল',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 26
  },
  {
    id: 's27',
    category_id: 'c6',
    slug: 'cast-partial-denture',
    name_en: 'Cast Partial Denture (Metal Framework)',
    name_bn: 'কাস্ট পার্টিয়াল ডেনচার (মেটাল ফ্রেম)',
    short_desc_en: 'Precision metal framework denture with optimum retention and stability.',
    short_desc_bn: 'ক্ল্যাম্প ও মেটাল ফ্রেমের সমন্বয়ে মজবুতভাবে আটকে থাকা উন্নত ডেনচার।',
    price_min: 40000,
    price_max: 60000,
    price_unit_en: 'per arch',
    price_unit_bn: 'প্রতি চোয়াল',
    price_note_en: 'Depending on alloy used and complexity',
    price_note_bn: 'ব্যবহৃত মেটাল অ্যালয় ও দাঁতের সংখ্যার ওপর নির্ভর করে',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 27
  },
  {
    id: 's28',
    category_id: 'c6',
    slug: 'complete-denture',
    name_en: 'Complete Denture (Full Set)',
    name_bn: 'সম্পূর্ণ কৃত্রিম দাঁতের সেট (ফুল ডেনচার)',
    short_desc_en: 'Full arch rehabilitation for completely edentulous upper or lower jaw.',
    short_desc_bn: 'সব দাঁত হারানো রোগীদের জন্য পুরো মুখের নতুন আরামদায়ক দাঁতের সেট।',
    price_min: 30000,
    price_max: 50000,
    price_unit_en: 'full set',
    price_unit_bn: 'সম্পূর্ণ সেট',
    price_note_en: 'Starting from ৳30,000 on consultation',
    price_note_bn: 'পরামর্শ সাপেক্ষে ৳৩০,০০০ থেকে শুরু',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 28
  },

  // Pediatric Dentistry
  {
    id: 's29',
    category_id: 'c7',
    slug: 'pediatric-filling',
    name_en: 'Pediatric Dental Filling',
    name_bn: 'শিশুদের দাঁতের ফিলিং',
    short_desc_en: 'Gentle caries removal and fluoride-releasing glass ionomer filling for children.',
    short_desc_bn: 'শিশুদের দুধ দাঁতের ক্যাভিটি পরিষ্কার করে ব্যথাহীন ফ্রেন্ডলি ফিলিং।',
    price_min: 600,
    price_max: 1000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Gentle child-friendly care',
    price_note_bn: 'শিশুর সহযোগিতার ওপর ভিত্তি করে',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 29
  },

  // Orthodontics
  {
    id: 's30',
    category_id: 'c8',
    slug: 'orthodontic-appliance',
    name_en: 'Orthodontic Appliance (Braces)',
    name_bn: 'অর্থোডন্টিক ব্রেসেস ও অ্যাপ্লায়েন্স',
    short_desc_en: 'Fixed braces and functional aligners to correct crowded, spaced or misaligned teeth.',
    short_desc_bn: 'দাঁতের অনিয়মিত বিন্যাস, ফাঁকা বা সামনের দিকে এগিয়ে থাকা দাঁত সোজা করা।',
    price_min: 40000,
    price_max: 80000,
    price_unit_en: 'full treatment',
    price_unit_bn: 'সম্পূর্ণ কোর্স',
    price_note_en: 'Starting from ৳40,000 with monthly installment options',
    price_note_bn: 'পদ্ধতির ওপর ভিত্তি করে ৳৪০,০০০ থেকে শুরু (কিস্তি সুবিধা)',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 30
  },

  // Implants
  {
    id: 's31',
    category_id: 'c9',
    slug: 'dental-implant',
    name_en: 'Dental Implant',
    name_bn: 'স্থায়ী ডেন্টাল ইমপ্ল্যান্ট',
    short_desc_en: 'State-of-the-art titanium fixture fused into jawbone for a permanent natural tooth.',
    short_desc_bn: 'প্রাকৃতিক দাঁতের স্থায়ী বিকল্প—হাড়ের সাথে স্থায়ীভাবে যুক্ত টাইটানিয়াম ইমপ্ল্যান্ট।',
    price_min: 40000,
    price_max: 50000,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতিটি ইমপ্ল্যান্ট',
    price_note_en: 'Includes titanium implant body and precision abutment',
    price_note_bn: 'টাইটানিয়াম ফিক্সচার ও অ্যাবাটমেন্ট সহ',
    is_consultation_only: false,
    is_featured: true,
    sort_order: 31
  },

  // Preventive Care
  {
    id: 's32',
    category_id: 'c10',
    slug: 'sdf-pit-fissure-sealant',
    name_en: 'SDF with Pit & Fissure Sealant',
    name_bn: 'এসডিএফ ও পিট এন্ড ফিশার সিল্যান্ট',
    short_desc_en: 'Silver diamine fluoride application halting tooth decay in deep molar grooves.',
    short_desc_bn: 'দাঁতের গভীর খাঁজে খাদ্যকণা জমে ব্যাকটেরিয়া আক্রমণ প্রতিরোধে সিল্যান্ট কোটিং।',
    price_min: 500,
    price_max: 500,
    price_unit_en: 'per tooth',
    price_unit_bn: 'প্রতি দাঁত',
    price_note_en: 'Fixed preventive fee',
    price_note_bn: 'নির্ধারিত প্রতিরোধমূলক ফি',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 32
  },
  {
    id: 's33',
    category_id: 'c10',
    slug: 'fluoride-application',
    name_en: 'Professional Fluoride Application',
    name_bn: 'প্রফেশনাল ফ্লোরাইড অ্যাপ্লিকেশন',
    short_desc_en: 'High-concentration fluoride varnish strengthening enamel against acid attacks.',
    short_desc_bn: 'দাঁতের এনামেল মজবুত করে ক্ষয় ও সংবেদনশীলতা রোধে বিশেষ জেল অ্যাপ্লিকেশন।',
    price_min: 2000,
    price_max: 4000,
    price_unit_en: 'full mouth',
    price_unit_bn: 'সম্পূর্ণ মুখ',
    price_note_en: 'Protective therapy for sensitivity & decay',
    price_note_bn: 'দাঁত শিরশিরানি ও ক্ষয়রোধে বিশেষ থেরাপি',
    is_consultation_only: false,
    is_featured: false,
    sort_order: 33
  }
];

export const INITIAL_REELS: VideoReel[] = [
  {
    id: 'reel-1',
    title_en: 'Root Canal Quality: Low-Cost Half-Baked vs Complete Treatment',
    title_bn: 'কম খরচে হাফ-বেকড রুট ক্যানেল বনাম পারফেক্ট আধুনিক চিকিৎসা',
    reel_url: 'https://www.facebook.com/reel/1857864901861958',
    thumbnail_url: '/images/reels/reel-1.jpg',
    duration: '1:05',
    sort_order: 1,
    is_featured: true
  },
  {
    id: 'reel-2',
    title_en: 'Emergency Dental Trauma: Saving Knocked-Out Teeth in 1 Hour',
    title_bn: 'দুর্ঘটনায় দাঁত উপড়ে বা ভেঙে গেলে গোল্ডেন আওয়ারে দাঁত বাঁচানোর উপায়',
    reel_url: 'https://www.facebook.com/reel/1706318750448810',
    thumbnail_url: '/images/reels/reel-2.jpg',
    duration: '0:55',
    sort_order: 2,
    is_featured: true
  },
  {
    id: 'reel-3',
    title_en: 'Fear of Dental Needles? Pain-Free Local Anesthesia & Safe Care',
    title_bn: 'সিরিঞ্জ বা ইনজেকশনের ভয়? আধুনিক ব্যথামুক্ত অ্যানাস্থেশিয়া পদ্ধতি',
    reel_url: 'https://www.facebook.com/reel/1778058163550814',
    thumbnail_url: '/images/reels/reel-3.jpg',
    duration: '1:12',
    sort_order: 3,
    is_featured: true
  },
  {
    id: 'reel-4',
    title_en: 'Diastema Closure: Fixing Gaps Between Teeth for Confident Smile',
    title_bn: 'দাঁতের ফাঁকা জায়গা বন্ধ করে আকর্ষণীয় কনফিডেন্ট স্মাইল ফিরিয়ে আনা',
    reel_url: 'https://www.facebook.com/reel/1839137160830022',
    thumbnail_url: '/images/reels/reel-4.jpg',
    duration: '0:48',
    sort_order: 4,
    is_featured: true
  },
  {
    id: 'reel-5',
    title_en: 'Severe Tooth Infection & Advanced Tooth Preservation',
    title_bn: 'মারাত্মক ইনফেকশন ও ক্ষয়ে যাওয়া দাঁত সংরক্ষণে সঠিক চিকিৎসা পদ্ধতি',
    reel_url: 'https://www.facebook.com/reel/2426901334500612',
    thumbnail_url: '/images/reels/reel-5.jpg',
    duration: '1:00',
    sort_order: 5,
    is_featured: true
  },
  {
    id: 'reel-6',
    title_en: 'Post-Root Canal Protection & Long-Lasting Dental Crown Cap',
    title_bn: 'রুট ক্যানেলের পর ক্রাউন বা ক্যাপ কেন জরুরি? দাঁতের স্থায়ী সুরক্ষা',
    reel_url: 'https://www.facebook.com/reel/1572476604521557',
    thumbnail_url: '/images/reels/reel-6.jpg',
    duration: '0:45',
    sort_order: 6,
    is_featured: true
  },
  {
    id: 'reel-7',
    title_en: 'Gum Health, Fresh Breath & Comprehensive Oral Hygiene Guide',
    title_bn: 'মুখের দুর্গন্ধ দূর ও মাড়ির সুস্বাস্থ্য বজায় রাখার কার্যকরী উপায়',
    reel_url: 'https://www.facebook.com/reel/2263470164424621',
    thumbnail_url: '/images/reels/reel-7.jpg',
    duration: '1:18',
    sort_order: 7,
    is_featured: true
  },
  {
    id: 'reel-8',
    title_en: 'High-Precision Dental Loupes & Microscopic Root Canal Care',
    title_bn: 'ডেন্টাল লুপস ও মাইক্রো-প্রিসিশন প্রযুক্তিতে আধুনিক দাঁতের চিকিৎসা',
    reel_url: 'https://www.facebook.com/reel/3061772634024747',
    thumbnail_url: '/images/reels/reel-8.jpg',
    duration: '1:10',
    sort_order: 8,
    is_featured: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title_en: 'Care Point Dental Official Clinic Brand',
    title_bn: 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক অফিসিয়াল ব্র্যান্ড',
    category: 'clinic',
    image_url: '/images/logo.jpeg',
    sort_order: 1
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    patient_name_en: 'Tariqul Islam',
    patient_name_bn: 'তরিকুল ইসলাম',
    treatment_en: 'Root Canal & Zirconia Crown',
    treatment_bn: 'রুট ক্যানেল ও জার্কোনিয়া ক্যাপ',
    rating: 5,
    comment_en: 'Completely pain-free root canal treatment. Dr. Aktar Zahan Ony explained everything politely. The clinic is spotless and modern.',
    comment_bn: 'অসাধারণ অভিজ্ঞতা! একটুও ব্যথা পাইনি। ডাক্তার আপা অত্যন্ত আন্তরিক ও যত্নশীল। চেম্বারটি একদম পরিষ্কার এবং যন্ত্রপাতিগুলো সম্পূর্ণ নতুন ও জীবাণুমুক্ত।',
    date: '2 weeks ago',
    is_verified: true,
    is_featured: true,
    sort_order: 1
  },
  {
    id: 'rev-2',
    patient_name_en: 'Shamsun Nahar',
    patient_name_bn: 'শামসুন নাহার',
    treatment_en: 'Scaling & Polishing',
    treatment_bn: 'দাঁতের স্কেলিং ও পলিশিং',
    rating: 5,
    comment_en: 'Got scaling done here. Teeth look clean and bright now. Very reasonable price and no gum irritation at all.',
    comment_bn: 'আশুলিয়ায় এত চমৎকার ডেন্টাল ক্লিনিক সত্যিই প্রশংসনীয়। স্কেলিং করার পর দাঁতের সব দাগ দূর হয়ে গেছে। ডাক্তার ও স্টাফদের ব্যবহার খুব ভালো।',
    date: '1 month ago',
    is_verified: true,
    is_featured: true,
    sort_order: 2
  },
  {
    id: 'rev-3',
    patient_name_en: 'Md. Rafiqul Hasan',
    patient_name_bn: 'মো. রফিকুল হাসান',
    treatment_en: 'Wisdom Tooth Surgery',
    treatment_bn: 'আক্কেল দাঁতের সার্জারি',
    rating: 5,
    comment_en: 'Had severe wisdom tooth pain for weeks. Dr. Ony performed the surgery quickly and smoothly without any agony. Highly recommended!',
    comment_bn: 'কয়েক সপ্তাহ ধরে আক্কেল দাঁতের তীব্র যন্ত্রণায় ভুগছিলাম। মাত্র আধা ঘণ্টায় কোনো ঝামেলা ছাড়াই অপারেশন সম্পন্ন হলো। সাভার-আশুলিয়ার সেরা ডেন্টাল ক্লিনিক।',
    date: '3 weeks ago',
    is_verified: true,
    is_featured: true,
    sort_order: 3
  },
  {
    id: 'rev-4',
    patient_name_en: 'Farzana Akter',
    patient_name_bn: 'ফারজানা আক্তার',
    treatment_en: 'Front Gap Closure',
    treatment_bn: 'সামনের দাঁতের ফাঁকা বন্ধ',
    rating: 5,
    comment_en: 'My front teeth gap was closed in a single sitting with composite bonding. My smile looks completely natural now!',
    comment_bn: 'এক বসাতেই আমার সামনের দাঁতের ফাঁকা বন্ধ হয়ে গেল। এখন হাসতে কোনো দ্বিধা হয় না। সবাইকে এই ক্লিনিকে আসার পরামর্শ দিচ্ছি।',
    date: 'Last month',
    is_verified: true,
    is_featured: true,
    sort_order: 4
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question_en: 'Where is Care Point Dental Clinic located in Ashulia?',
    question_bn: 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক আশুলিয়ায় কোথায় অবস্থিত?',
    answer_en: 'We are located on the 2nd Floor of Mofizuddin Tower (Hungry Town Restaurant building), North of Mostofa Hotel and adjacent to Sawmill, beside UCB Bank, Pollibidyut Kabarsthan Road Bus Stand, Ashulia, Savar, Dhaka 1344.',
    answer_bn: 'আমাদের ঠিকানা: কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক, মোস্তফা হোটেলের উত্তর পাশে স\'মিলের সাথে মফিজ উদ্দিন টাওয়ার (হাংরি টাউন রেস্টুরেন্ট বিল্ডিং), দ্বিতীয় তলা, পল্লীবিদ্যুৎ কবরস্থান রোড বাস স্ট্যান্ড, আশুলিয়া, সাভার।',
    category: 'general',
    sort_order: 1,
    is_published: true
  },
  {
    id: 'faq-2',
    question_en: 'What are the consulting hours of Dr. Aktar Zahan Ony?',
    question_bn: 'ডা. আক্তার জাহান অনি-এর রোগী দেখার সময়সূচী কী?',
    answer_en: 'Dr. Aktar Zahan Ony sees patients daily from 4:00 PM to 9:00 PM. For morning appointments, patients are kindly requested to call 30 minutes in advance.',
    answer_bn: 'প্রতিদিন বিকাল ৪:০০ টা হতে রাত ৯:০০ টা পর্যন্ত। তবে সকালের সিরিয়ালের জন্য আসার ৩০ মিনিট আগে ফোনে জানানোর অনুরোধ রইল।',
    category: 'general',
    sort_order: 2,
    is_published: true
  },
  {
    id: 'faq-3',
    question_en: 'Is dental treatment at Care Point Dental painful?',
    question_bn: 'চিকিৎসা চলাকালীন কি কোনো ব্যথা অনুভূত হয়?',
    answer_en: 'No. We strictly prioritize pain-free dentistry using the finest local anesthetics, gentle techniques, and calming patient care to ensure total comfort.',
    answer_bn: 'না। আমাদের চেম্বারে সম্পূর্ণ ব্যথামুক্ত (Pain-free) আধুনিক পদ্ধতিতে লোকাল এনেস্থেসিয়া ও আন্তরিক পরিবেশে চিকিৎসা দেওয়া হয়, ফলে ভয়ের কোনো কারণ নেই।',
    category: 'treatment',
    sort_order: 3,
    is_published: true
  },
  {
    id: 'faq-4',
    question_en: 'How do you ensure sterilization and infection control?',
    question_bn: 'জীবাণুমুক্তকরণ ও হাইজিন কীভাবে বজায় রাখা হয়?',
    answer_en: 'We use hospital-grade multi-stage Autoclave, UV Sterilization, and 100% individual disposable items (gloves, needles, cups, suction tips) for every single patient.',
    answer_bn: 'আমরা প্রতিটি মেটাল ইন্সট্রুমেন্ট অটোক্লেভ ও ইউভি মেশিনে জীবাণুমুক্ত করি এবং প্রতি রোগীর জন্য সম্পূর্ণ নতুন ডিসপোজেবল সামগ্রী ব্যবহার করি।',
    category: 'hygiene',
    sort_order: 4,
    is_published: true
  },
  {
    id: 'faq-5',
    question_en: 'How much does a dental consultation and RVG X-ray cost?',
    question_bn: 'কনসালটেশন ও ডিজিটাল এক্স-রের খরচ কত?',
    answer_en: 'Doctor consultation fee is ৳200 and digital RVG dental X-ray is ৳200 per film.',
    answer_bn: 'ডাক্তার কনসালটেশন ফি মাত্র ৳২০০ এবং ডিজিটাল RVG এক্স-রে ফি মাত্র ৳২০০।',
    category: 'pricing',
    sort_order: 5,
    is_published: true
  },
  {
    id: 'faq-6',
    question_en: 'How does the Cost Calculator work on this website?',
    question_bn: 'কস্ট ক্যালকুলেটর কীভাবে কাজ করে?',
    answer_en: 'Our interactive Cost Calculator lets you pick the treatments you need and provides a transparent estimated low-to-high price range in BDT (৳).',
    answer_bn: 'কস্ট ক্যালকুলেটরে আপনার প্রয়োজনীয় চিকিৎসাগুলো সিলেক্ট করলেই মোট আনুমানিক খরচের রেঞ্জ (৳) সাথে সাথে দেখতে পারবেন।',
    category: 'pricing',
    sort_order: 6,
    is_published: true
  },
  {
    id: 'faq-7',
    question_en: 'Can I book an appointment via phone or WhatsApp?',
    question_bn: 'আমি কি অনলাইনে বা হোয়াটসঅ্যাপে অ্যাপয়েন্টমেন্ট নিতে পারি?',
    answer_en: 'Yes! You can book via our website form, or directly call or WhatsApp our hotline at +880 1324-558811.',
    answer_bn: 'হ্যাঁ! আমাদের ওয়েবসাইটের বুকিং ফর্মের মাধ্যমে অথবা হোয়াটসঅ্যাপে সরাসরি মেসেজ বা কল করে (+880 1324-558811) সহজে সিরিয়াল নিতে পারবেন।',
    category: 'appointment',
    sort_order: 7,
    is_published: true
  },
  {
    id: 'faq-8',
    question_en: 'Why choose Zirconia crown over regular PFM?',
    question_bn: 'মেটাল ক্যাপের তুলনায় জার্কোনিয়া ক্যাপ কেন বেশি ভালো?',
    answer_en: 'Zirconia crowns are 100% metal-free, match natural tooth translucency, never cause dark gum borders, and offer unmatched biocompatibility and strength.',
    answer_bn: 'জার্কোনিয়া ক্যাপ ১০০% মেটাল-মুক্ত, মাড়িতে কালো দাগ ফেলে না, দেখতে অবিকল প্রাকৃতিক দাঁতের মতো সুন্দর এবং অত্যন্ত দীর্ঘস্থায়ী।',
    category: 'treatment',
    sort_order: 8,
    is_published: true
  },
  {
    id: 'faq-9',
    question_en: 'How long does a Root Canal Treatment take?',
    question_bn: 'রুট ক্যানেল করতে কত সময় বা কয়টি ভিজিট লাগে?',
    answer_en: 'Depending on root anatomy and infection severity, anterior teeth are often completed in 1 to 2 visits, taking roughly 30–45 minutes per session.',
    answer_bn: 'ইনফেকশনের ওপর নির্ভর করে সাধারণত ১ থেকে ২ টি ভিজিটে রুট ক্যানেল শেষ করা সম্ভব হয়। প্রতি ভিজিটে ৩০-৪০ মিনিট সময় লাগে।',
    category: 'treatment',
    sort_order: 9,
    is_published: true
  },
  {
    id: 'faq-10',
    question_en: 'Do you treat pediatric (children) dental problems?',
    question_bn: 'আপনারা কি শিশুদের দাঁতের চিকিৎসা করেন?',
    answer_en: 'Yes, we provide gentle, friendly pediatric fillings, primary tooth extractions, and cavity-preventing fluoride sealants in a reassuring atmosphere.',
    answer_bn: 'হ্যাঁ, শিশুদের দাঁতের ক্যাভিটি ফিলিং, দুধ দাঁত তোলা ও ক্ষয়রোধক ফ্লোরাইড চিকিৎসা অত্যন্ত মমতাময়ী ও আনন্দদায়ক পরিবেশে করা হয়।',
    category: 'treatment',
    sort_order: 10,
    is_published: true
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'root-canal-treatment-cost-savar-ashulia',
    title_en: 'Root Canal Treatment Cost in Savar & Ashulia: What Patients Need to Know',
    title_bn: 'রুট ক্যানেল চিকিৎসার খরচ সাভার ও আশুলিয়ায়: কেন ও কখন এটি জরুরি?',
    excerpt_en: 'Explore how modern root canal therapy saves your natural teeth from extraction, what to expect during the painless procedure, and transparent pricing in Savar.',
    excerpt_bn: 'দাঁতের অসহ্য ব্যথা থেকে মুক্তি পেতে এবং আসল দাঁত তুলে ফেলা থেকে রক্ষা করতে রুট ক্যানেল কেন সেরা চিকিৎসা? জেনে নিন বিস্তারিত খরচ ও ডাক্তারের পরামর্শ।',
    content_en: `## Understanding Root Canal Treatment (RCT)

When dental decay penetrates through the enamel and dentin into the pulp chamber, bacteria inflame the internal nerve tissues and blood vessels. Left untreated, this infection triggers excruciating throbbing toothaches and can lead to dangerous facial cellulitis or jaw abscesses.

### Why Saving Your Natural Tooth is Critical
No artificial tooth completely replicates the chewing efficiency and proprioceptive sensory feedback of a natural tooth root. Root canal therapy meticulously cleans out bacteria, disinfects the canals, and hermetically seals them with biocompatible gutta-percha.

### Treatment Costs at Care Point Dental Clinic
- **Anterior (Front Teeth) Root Canal:** ৳3,000 – ৳5,000 per tooth
- **Posterior (Molar & Premolar) Root Canal:** ৳4,000 – ৳6,000 per tooth

All procedures are completed with modern digital apex locators, rotary instrumentation, and gentle local anesthesia under the care of **Dr. Aktar Zahan Ony**.`,
    content_bn: `## রুট ক্যানেল চিকিৎসা কী?

দাঁতের ক্যাভিটি বা ক্ষয় যখন গভীরে গিয়ে দাঁতের ভেতরের স্নায়ু (Pulp) আক্রান্ত করে, তখন তীব্র ব্যথার সৃষ্টি হয়। অনেকেই ভয়ে আক্রান্ত দাঁতটি তুলে ফেলতে চান, কিন্তু আসল দাঁত বাঁচিয়ে রাখাই আধুনিক চিকিৎসাবিজ্ঞানের প্রধান উদ্দেশ্য।

### রুট ক্যানেল কেন করবেন?
কোনো কৃত্রিম দাঁতই আপনার প্রাকৃতিক দাঁতের শিকড়ের মতো শক্তিশালী হতে পারে না। রুট ক্যানেলের মাধ্যমে দাঁতের ভেতরের জীবাণু সম্পূর্ণ পরিষ্কার করে ক্যানেল সিল করে দেওয়া হয়, যাতে দাঁতটি আজীবন সুরক্ষিত থাকে।

### কেয়ার পয়েন্ট ডেন্টাল ক্লিনিকে খরচ
- **সামনের দাঁতের রুট ক্যানেল:** ৩,০০০ – ৫,০০০ টাকা
- **মাড়ির পেছনের দাঁতের রুট ক্যানেল:** ৪,০০০ – ৬,০০০ টাকা

অভিজ্ঞ ওরাল এন্ড ডেন্টাল সার্জন ডা. আক্তার জাহান অনির তত্ত্বাবধানে এটি সম্পূর্ণ ব্যথামুক্তভাবে সম্পন্ন করা হয়।`,
    cover_image: '/images/logo.jpeg',
    target_keywords_en: 'root canal cost Savar, dental clinic Ashulia, painless root canal Dhaka',
    target_keywords_bn: 'রুট ক্যানেল খরচ সাভার, আশুলিয়া ডেন্টাল ক্লিনিক, দাঁতের ব্যথামুক্ত চিকিৎসা',
    read_time_en: '5 min read',
    read_time_bn: '৫ মিনিট পড়ার সময়',
    is_published: true,
    published_at: '2026-09-01T10:00:00Z'
  },
  {
    id: 'blog-2',
    slug: 'why-scaling-and-polishing-is-essential',
    title_en: 'Why Regular Scaling & Polishing is Crucial for Healthy Gums & Fresh Breath',
    title_bn: 'দাঁতের স্কেলিং ও পলিশিং কেন জরুরি? সাধারণ ভুল ধারণা ও সঠিক তথ্য',
    excerpt_en: 'Debunking the myth that scaling damages enamel. Discover how ultrasonic cleaning prevents gum disease, loose teeth, and bad breath.',
    excerpt_bn: 'অনেকেই মনে করেন স্কেলিং করলে দাঁত পাতলা বা ফাঁকা হয়ে যায়—এটি কি সত্যি? জানুন কীভাবে নিয়মিত স্কেলিং মাড়ির রোগ ও দুর্গন্ধ দূর করে।',
    content_en: `## Debunking the Scaling Myth

A persistent misconception among patients is that ultrasonic scaling scrapes away healthy enamel or loosens teeth. In reality, hardened calculus (tartar) cannot be removed by normal brushing. As tartar deposits accumulate, they harbor destructive anaerobic bacteria that trigger chronic gingivitis and alveolar bone resorption.

### Benefits of Professional Ultrasonic Cleaning
1. **Stops Gum Bleeding:** Relieves swollen and fragile gum tissues.
2. **Eliminates Halitosis:** Completely removes deep bacteria pockets causing persistent bad breath.
3. **Prevents Premature Tooth Loss:** Keeps the supporting jawbone intact.
4. **Removes Stubborn Stains:** Polishes away tea, coffee, and tobacco discolorations.

At Care Point Dental Clinic, ultrasonic scaling and polishing packages are priced fairly between **৳1,500 and ৳3,000** based on tartar accumulation.`,
    content_bn: `## স্কেলিং নিয়ে সাধারণ ভুল ধারণা

অনেকের ভুল ধারণা রয়েছে যে স্কেলিং করলে দাঁতের এনামেল ক্ষয় হয় কিংবা দাঁত ফাঁকা হয়ে যায়। প্রকৃতপক্ষে দাঁতের গোড়ায় জমে থাকা শক্ত টারটার বা পাথর সাধারণ ব্রাশ দিয়ে পরিষ্কার করা সম্ভব নয়। এই পাথর দিনে দিনে মাড়িকে নিচে নামিয়ে হাড় ক্ষয় করে দাঁত নড়বড়ে করে ফেলে।

### স্কেলিংয়ের মূল উপকারিতা
১. **মাড়ি দিয়ে রক্ত পড়া বন্ধ করে:** মাড়ির ফোলাভাব দূর করে সুস্থ গোলাপি মাড়ি ফিরিয়ে আনে।
২. **মুখের দুর্গন্ধ দূর করে:** পাথর ও জমে থাকা ব্যাকটেরিয়া পরিষ্কার করে নিঃশ্বাস সতেজ রাখে।
৩. **দাঁত পড়ে যাওয়া প্রতিরোধ করে:** দাঁতের চারপাশের হাড়ের সুরক্ষা নিশ্চিত করে।
৪. **দাঁত উজ্জ্বল ও মসৃণ করে:** চা, কফি বা পানের দাগ দূর করে দাঁত ঝকঝকে পলিশ করা হয়।

কেয়ার পয়েন্টে মাত্র **১,৫০০ থেকে ৩,০০০ টাকায়** সম্পূর্ণ মুখের স্কেলিং ও পলিশিং সেবা পাওয়া যায়।`,
    cover_image: '/images/logo.jpeg',
    target_keywords_en: 'teeth scaling cost Savar, dental cleaning Ashulia, gum bleeding treatment',
    target_keywords_bn: 'দাঁতের স্কেলিং খরচ, দাঁতের পাথর পরিষ্কার, মাড়ি দিয়ে রক্ত পড়া চিকিৎসা আশুলিয়া',
    read_time_en: '4 min read',
    read_time_bn: '৪ মিনিট পড়ার সময়',
    is_published: true,
    published_at: '2026-09-02T12:00:00Z'
  },
  {
    id: 'blog-3',
    slug: 'zirconia-vs-pfm-crowns-which-is-better',
    title_en: 'Zirconia vs PFM Dental Crowns: Which One Should You Choose?',
    title_bn: 'জার্কোনিয়া নাকি মেটাল ক্যাপ (PFM): আপনার দাঁতের জন্য কোনটি সেরা?',
    excerpt_en: 'A clear comparison between Porcelain-Fused-to-Metal (PFM) and premium Monolithic Zirconia crowns regarding strength, aesthetics, and longevity.',
    excerpt_bn: 'দাঁতে ক্যাপ করানোর আগে জেনে নিন পিএফএম এবং জার্কোনিয়া ক্যাপের পার্থক্য, স্থায়িত্ব এবং সঠিক নির্বাচন পদ্ধতি।',
    content_en: `## Choosing the Right Dental Crown

Following a root canal treatment or for fractured teeth, a protective crown is vital to reinforce the tooth structure against heavy masticatory forces.

### Porcelain Fused to Metal (PFM)
- **Advantages:** Time-tested durability and cost-effective (৳4,000 – ৳5,000 per unit).
- **Consideration:** The opaque metal substructure requires a thicker coping and may reveal a subtle dark metal line near the gum margin over time.

### Monolithic Zirconia Crowns
- **Advantages:** 100% metal-free, superior biocompatibility, life-like optical translucency, and exceptionally resistant to fractures (৳11,000 – ৳15,000 per unit).
- **Recommendation:** Best suited for anterior aesthetic zones and patients seeking lifelong, premium cosmetic restoration.`,
    content_bn: `## দাঁতের ক্যাপের সঠিক নির্বাচন

রুট ক্যানেল করার পর দাঁত ভঙ্গুর হয়ে যায়। শক্ত খাবার চাবানোর সময় দাঁত যাতে ভেঙে না যায়, সেজন্য ক্যাপ পরানো আবশ্যক।

### পিএফএম ক্যাপ (Porcelain Fused to Metal)
- **সুবিধা:** দীর্ঘদিন ধরে পরীক্ষিত, অত্যন্ত টেকসই এবং সাশ্রয়ী (৳৪,০০০ – ৳৫,০০০ প্রতি ইউনিট)।
- **সীমাবদ্ধতা:** ভেতরে মেটাল থাকায় কয়েক বছর পর মাড়ির সংযোগস্থলে হালকা কালো দাগ পড়তে পারে।

### জার্কোনিয়া ক্যাপ (Premium Monolithic Zirconia)
- **সুবিধা:** সম্পূর্ণ মেটাল-মুক্ত, অবিকল প্রাকৃতিক দাঁতের মতো উজ্জ্বল ও চকচকে (৳১১,০০০ – ৳১৫,০০০ প্রতি ইউনিট)। কখনো মাড়িতে কালো দাগ পড়ে না এবং দীর্ঘস্থায়ী।
- **পরামর্শ:** সামনের দাঁতের সৌন্দর্য ও হাসির স্বাভাবিক রূপ বজায় রাখতে জার্কোনিয়া ক্যাপই সেরা পছন্দ।`,
    cover_image: '/images/logo.jpeg',
    target_keywords_en: 'zirconia crown cost Savar, PFM cap price Dhaka, dental cap comparison',
    target_keywords_bn: 'জার্কোনিয়া ক্যাপের দাম, দাঁতের ক্যাপ সাভার, ডেন্টাল ক্রাউন আশুলিয়া',
    read_time_en: '5 min read',
    read_time_bn: '৫ মিনিট পড়ার সময়',
    is_published: true,
    published_at: '2026-09-03T14:30:00Z'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    patient_name: 'Mahmudur Rahman',
    phone: '01711223344',
    whatsapp: '+8801711223344',
    email: 'mahmud@example.com',
    preferred_date: '2026-09-10',
    preferred_time_slot: '05:30 PM - 06:00 PM',
    service_id: 's11',
    service_name: 'Root Canal – Anterior',
    notes: 'Severe upper front tooth sensitivity for 3 days',
    status: 'pending',
    created_at: '2026-09-05T10:00:00Z'
  },
  {
    id: 'apt-2',
    patient_name: 'Nasima Sultana',
    phone: '01899887766',
    whatsapp: '+8801899887766',
    preferred_date: '2026-09-08',
    preferred_time_slot: '06:00 PM - 06:30 PM',
    service_id: 's3',
    service_name: 'Scaling & Polishing',
    notes: 'Routine dental scaling appointment',
    status: 'confirmed',
    admin_notes: 'Confirmed via WhatsApp call',
    created_at: '2026-09-04T15:30:00Z'
  }
];
