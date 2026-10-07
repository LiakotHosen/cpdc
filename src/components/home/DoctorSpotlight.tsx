'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { Doctor } from '@/lib/types';
import {
  Award,
  Clock,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Stethoscope,
  Phone,
  Sparkles,
  HeartPulse,
  BadgeCheck,
  ArrowRight,
  MapPin,
  Smile,
  GraduationCap,
  Quote,
  Star,
  UserCheck,
} from 'lucide-react';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface DoctorSpotlightProps {
  doctor: Doctor;
}

export function DoctorSpotlight({ doctor }: DoctorSpotlightProps) {
  const { t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const doctorName = t(doctor.name_en || 'Dr. Aktar Zahan Ony', doctor.name_bn || 'ডা. আক্তার জাহান অনি');
  const doctorTitle = t(doctor.title_en || 'Oral & Dental Surgeon', doctor.title_bn || 'ওরাল এন্ড ডেন্টাল সার্জন');
  const doctorDegrees = doctor.degrees || t(doctor.qualifications_en || 'BDS, MPH, JU', doctor.qualifications_bn || 'বিডিএস (রাবি), এমপিএইচ (জেইউ)');
  const experienceYears = doctor.experience_years || '7+';
  const treatedPatients = doctor.patients_treated || '3,000+';

  return (
    <section className="w-full py-16 lg:py-24 bg-[#F8FAFC] text-[#0F1A48] relative overflow-hidden border-b border-slate-200">
      {/* Background Decorative Ambient Gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/6 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-black uppercase tracking-wider border border-[#0F1A48]/15 shadow-2xs">
              <Stethoscope className="w-4 h-4 text-[#0F1A48]" />
              <span>{t('Lead Oral & Dental Surgeon', 'প্রধান ডেন্টাল সার্জন পরিচিতি')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1A48] tracking-tight leading-[1.2]">
              {t('Meet Dr. Aktar Zahan Ony', 'আপনার ডেন্টাল কেয়ার ও পরামর্শে ডা. আক্তার জাহান অনি')}
            </h2>

            <p className="text-base sm:text-lg text-[#0F1A48]/80 leading-relaxed font-normal max-w-2xl mx-auto">
              {t(
                'A compassionate dental surgeon dedicated to pain-free modern dentistry, rotary endodontics, aesthetic smile architecture, and patient-first care in Savar and Ashulia.',
                'সাভার ও আশুলিয়ার মানুষের মুখে সুস্থ ও সুন্দর হাসি ফিরিয়ে দিতে আন্তর্জাতিক মানের আধুনিক প্রযুক্তি, ব্যথামুক্ত রুট ক্যানেল, নান্দনিক স্মাইল ডিজাইন ও পরম আন্তরিকতায় নিবেদিতপ্রাণ ডেন্টাল সার্জন।'
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Surgeon Visual Showcase Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center">
            <ScrollReveal animation="fade-right" duration={700} className="w-full max-w-lg">
              <div className="relative w-full rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 shadow-md text-center space-y-5 transition-all duration-300">
                
                {/* Doctor Headshot Photo */}
                <div className="relative w-full aspect-[513/590] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 border-slate-200 bg-[#EEF2FF] group/photo">
                  <Image
                    src={doctor.photo_url || '/images/doctor-aktar-zahan-ony.webp'}
                    alt={doctor.name_en || 'Dr. Aktar Zahan Ony'}
                    fill
                    className="object-cover object-center group-hover/photo:scale-102 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 440px, 460px"
                    priority
                  />

                  {/* Top-Right: Verified Surgeon Badge */}
                  <div className="absolute top-3.5 right-3.5 pointer-events-none">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black shadow-md border border-white/40"
                      title="BMDC Registered Surgeon"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      <span className="uppercase tracking-wider">BMDC REG</span>
                    </div>
                  </div>

                  {/* Top-Left: BMDC Registration Number */}
                  <div className="absolute top-3.5 left-3.5 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1A48]/90 text-white text-xs font-bold shadow-md border border-white/20 backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t(`Reg: ${doctor.bmdc_reg || '12990'}`, `রেজি: ${doctor.bmdc_reg || '12990'}`)}</span>
                    </div>
                  </div>

                  {/* Bottom-Right: Live Status */}
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F1A48]/85 text-white text-[11px] font-bold shadow-sm backdrop-blur-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{t('Chamber Active', 'চেম্বার সক্রিয়')}</span>
                    </div>
                  </div>
                </div>

                {/* Consulting Timing & Chamber Location */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3.5 rounded-2xl bg-[#EEF2FF] border border-[#0F1A48]/10 hover:bg-[#EEF2FF]/80 transition-colors">
                    <span className="text-[11px] text-[#0F1A48]/75 block font-medium">
                      {t('Chamber Hours', 'চেম্বার সময়সূচি')}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0F1A48] mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      {t('4:00 PM – 9:00 PM', '৪:০০ – ৯:০০ টা')}
                    </span>
                    <span className="text-[10px] text-[#0F1A48]/70 block mt-0.5">
                      {t('Open Daily', 'প্রতিদিন চেম্বার খোলা')}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#EEF2FF] border border-[#0F1A48]/10 hover:bg-[#EEF2FF]/80 transition-colors">
                    <span className="text-[11px] text-[#0F1A48]/75 block font-medium">
                      {t('Chamber Location', 'চেম্বার অবস্থান')}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0F1A48] mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      {t('Pollibidyut, Savar', 'পল্লীবিদ্যুৎ, সাভার')}
                    </span>
                    <span className="text-[10px] text-[#0F1A48]/70 block mt-0.5">
                      {t('Mofiz Uddin Tower', 'মফিজ উদ্দিন টাওয়ার')}
                    </span>
                  </div>
                </div>

                {/* Direct Action Inside Plaque */}
                <button
                  type="button"
                  onClick={() => openBooking(undefined, doctorName)}
                  className="w-full py-3.5 px-5 bg-[#0F1A48] hover:bg-[#EEF2FF] hover:text-[#0F1A48] text-white border border-[#0F1A48] rounded-2xl font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 text-amber-300 group-hover:text-[#0F1A48]" />
                  <span>{t('Book Serial with Dr. Ony', 'ডা. অনির সিরিয়াল বুক করুন')}</span>
                </button>

                {/* Consultation Fee Transparency Badge */}
                <p className="text-[11px] text-slate-500 font-medium">
                  {t(
                    'Consultation Fee: ৳200 only • Thorough Oral & Dental Examination',
                    'পরামর্শ ফি মাত্র ৳২০০ • প্রতিটি রোগীর সম্পূর্ণ ওরাল হেলথ চেকআপ'
                  )}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Doctor Credentials, Expertise, Philosophy & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* 1. Badges & Credentials Pills */}
            <ScrollReveal animation="fade-left" duration={700}>
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-black border border-[#0F1A48]/15 shadow-2xs">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <span>{doctorDegrees}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t(`BMDC Reg: ${doctor.bmdc_reg || '12990'}`, `বিএমডিসি রেজি: ${doctor.bmdc_reg || '12990'}`)}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-purple-600" />
                  <span>{t(`${experienceYears} Years Clinical Experience`, `${experienceYears} বছর ক্লিনিক্যাল অভিজ্ঞতা`)}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-2xs">
                  <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>{t(`${treatedPatients} Treated Patients`, `${treatedPatients} সফল চিকিৎসা ও হাসিমুখ`)}</span>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Doctor Personal Bio & Empathy Statement */}
            <ScrollReveal animation="fade-up" delay={120}>
              <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-[#0F1A48]/30 transition-all">
                <div className="absolute top-3 right-4 opacity-10 pointer-events-none text-[#0F1A48]">
                  <Quote className="w-16 h-16" />
                </div>
                <div className="relative z-10 space-y-2.5">
                  <span className="text-[11px] font-black tracking-wider uppercase text-amber-600 block">
                    {t('Surgeon’s Care Philosophy & Promise', 'ডাক্তারের চিকিৎসা দর্শন ও অঙ্গীকার')}
                  </span>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic">
                    {t(
                      doctor.bio_en ||
                        '"Every patient deserves compassionate, pain-free dental care. Our focus is preserving your natural teeth through gentle micro-dentistry and transparent treatment guidance."',
                      doctor.bio_bn ||
                        '“প্রতিটি রোগীর নিজস্ব মানসিক ভীতি থাকে। আমার সর্বোচ্চ অগ্রাধিকার হলো সম্পূর্ণ ব্যথাহীন ও আরামদায়ক পরিবেশে চিকিৎসা প্রদান এবং অহেতুক দাঁত না তুলে আধুনিক চিকিৎসার মাধ্যমে প্রাকৃতিক দাঁত আজীবন রক্ষা করা।”'
                    )}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="font-bold text-[#0F1A48]">{doctorName}</span>
                    <span>{doctorTitle}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Doctor's 4 Key Clinical Specializations & Expertise */}
            <div className="space-y-3.5 pt-1">
              <ScrollReveal animation="fade-up" delay={200}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0F1A48] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>{t('Core Clinical Specializations & Expertise', 'বিশেষায়িত চিকিৎসা ক্ষেত্র ও দক্ষতা')}</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                    {t('Modern Precision Protocols', 'আধুনিক নির্ভুল চিকিৎসা পদ্ধতি')}
                  </span>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2C8.5 2 6 4.2 6 7.8C6 9.8 7 11.2 8 13.2C8.8 14.8 9.2 17 9.4 21C10.2 20.2 11.2 20.2 12 20.2C12.8 20.2 13.8 20.2 14.6 21C14.8 17 15.2 14.8 16 13.2C17 11.2 18 9.8 18 7.8C18 4.2 15.5 2 12 2Z"
                          fill="currentColor"
                          fillOpacity="0.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path d="M12 6V15" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
                        <circle cx="12" cy="15.5" r="1.5" fill="#FDE047" />
                        <path d="M9.5 9.5H14.5" stroke="#FDE047" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    ),
                    iconContainerClass:
                      'bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 shadow-md shadow-indigo-500/25 ring-2 ring-indigo-200/60',
                    title: t('Advanced Rotary Endodontics', 'উন্নত রোটারি এন্ডোডন্টিক্স (RCT)'),
                    desc: t(
                      'Single-sitting painless root canal treatment using motorized endomotors and apex locators to save natural teeth.',
                      'আধুনিক মোটরাইজড এন্ডোমোটর ও অ্যাপেক্স লোকেশনে সিঙ্গেল-সিটিংয়ে ব্যথামুক্ত রুট ক্যানেল ও প্রাকৃতিক দাঁত শতভাগ সংরক্ষণ।'
                    ),
                    highlight: t('Single Sitting RCT', 'ব্যথাহীন রুট ক্যানেল'),
                    badgeClass: 'text-indigo-800 bg-indigo-50 border-indigo-200',
                    delay: 240,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2.5C8 2.5 5.5 4.5 5.5 8C5.5 11 7 13.5 8.5 16C9.2 17.2 9.5 19 9.8 21.5C10.6 20.8 11.4 20.8 12 20.8C12.6 20.8 13.4 20.8 14.2 21.5C14.5 19 14.8 17.2 15.5 16C17 13.5 18.5 11 18.5 8C18.5 4.5 16 2.5 12 2.5Z"
                          fill="currentColor"
                          fillOpacity="0.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 11.5C9.5 14 14.5 14 15.5 11.5"
                          stroke="#FEF08A"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M17 4L17.8 5.8L19.5 6.5L17.8 7.2L17 9L16.2 7.2L14.5 6.5L16.2 5.8L17 4Z"
                          fill="#FEF08A"
                        />
                      </svg>
                    ),
                    iconContainerClass:
                      'bg-gradient-to-br from-amber-500 via-rose-500 to-pink-600 shadow-md shadow-rose-500/25 ring-2 ring-rose-200/60',
                    title: t('Aesthetic Smile Architecture', 'এসথেটিক ও কসমেটিক স্মাইল ডিজাইন'),
                    desc: t(
                      'Direct composite veneers, diastema gap closure, tooth reshaping, and lifelike smile rejuvenation.',
                      'কম্পোজিট ভেনিয়ার, দাঁতের ফাঁক বন্ধকরণ (Diastema), টুথ রিশেপিং ও আত্মবিশ্বাসী আকর্ষণীয় ন্যাচারাল স্মাইল মেকওভার।'
                    ),
                    highlight: t('Smile Rejuvenation', 'সুন্দর ও উজ্জ্বল হাসি'),
                    badgeClass: 'text-rose-800 bg-rose-50 border-rose-200',
                    delay: 300,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2.5L19 5.5V11C19 16.5 15.8 20.2 12 22C8.2 20.2 5 16.5 5 11V5.5L12 2.5Z"
                          fill="currentColor"
                          fillOpacity="0.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V16M8 12H16"
                          stroke="#7DD3FC"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        <circle cx="12" cy="12" r="5.5" stroke="#7DD3FC" strokeWidth="1.2" strokeDasharray="2 3" />
                      </svg>
                    ),
                    iconContainerClass:
                      'bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 shadow-md shadow-sky-500/25 ring-2 ring-sky-200/60',
                    title: t('Painless Minor Oral Surgery', 'ব্যথামুক্ত ওরাল সার্জারি ও এক্সট্রাকশন'),
                    desc: t(
                      'Surgical extraction of impacted wisdom teeth and gentle extractions with computerized anaesthesia protocols.',
                      'বাঁকা ও জটিল আক্কেল দাঁত (Impacted Wisdom Tooth) অপারেশন এবং সম্পূর্ণ ব্যথামুক্ত নির্ভুল সার্জিক্যাল এক্সট্রাকশন।'
                    ),
                    highlight: t('Wisdom Tooth & Surgery', 'নিখুঁত সার্জারি'),
                    badgeClass: 'text-sky-800 bg-sky-50 border-sky-200',
                    delay: 360,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 21.2C11.6 21 4.5 16.2 4.5 9.8C4.5 6.5 7 4 10 4C11.5 4 12 4.8 12 4.8C12 4.8 12.5 4 14 4C17 4 19.5 6.5 19.5 9.8C19.5 16.2 12.4 21 12 21.2Z"
                          fill="currentColor"
                          fillOpacity="0.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 10.5L11 13L15.5 8.5"
                          stroke="#A7F3D0"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    iconContainerClass:
                      'bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-200/60',
                    title: t('Conservative & Pediatric Care', 'প্রাকৃতিক দাঁত রক্ষা ও শিশু ডেন্টাল কেয়ার'),
                    desc: t(
                      'Fear-free friendly pediatric dentistry, biomimetic fillings, and long-term oral preventive healthcare.',
                      'শিশুদের ভয় দূর করে বন্ধুত্বপূর্ণ ডেন্টাল কেয়ার, টুথ-কালার বায়োমিমেটিক ফিলিং এবং দীর্ঘস্থায়ী দাঁতের সুরক্ষা।'
                    ),
                    highlight: t('Natural Tooth Preserved', 'প্রাকৃতিক দাঁত সংরক্ষণ'),
                    badgeClass: 'text-emerald-800 bg-emerald-50 border-emerald-200',
                    delay: 420,
                  },
                ].map((item, idx) => (
                  <ScrollReveal key={idx} animation="fade-up" delay={item.delay}>
                    <div className="p-4.5 sm:p-5 bg-white hover:bg-slate-50/80 transition-all duration-300 rounded-3xl border border-slate-200/90 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md hover:-translate-y-1 group">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1 ${item.iconContainerClass}`}
                        >
                          {item.icon}
                        </div>
                        <div className="space-y-1">
                          <span className="font-bold text-[#0F1A48] block text-sm sm:text-base tracking-tight leading-snug group-hover:text-blue-900 transition-colors">
                            {item.title}
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span
                          className={`font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${item.badgeClass}`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {item.highlight}
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* 4. Single Prominent Action: Learn More About Doctor -> Goes to /about */}
            <ScrollReveal animation="fade-up" delay={480}>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0F1A48] hover:bg-[#1E2E70] text-white rounded-2xl font-black text-sm sm:text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer border border-[#0F1A48]"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-[#0F1A48] transition-all">
                    <UserCheck className="w-4.5 h-4.5" />
                  </div>
                  <span>
                    {t(
                      'Learn More About Dr. Ony — Full Profile & Career Timeline',
                      'ডক্টর সম্পর্কে আরও জানুন — পূর্ণাঙ্গ প্রোফাইল ও ক্যারিয়ার জার্নি'
                    )}
                  </span>
                  <ArrowRight className="w-4.5 h-4.5 text-amber-300 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
}

