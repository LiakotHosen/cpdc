'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DoctorCard } from '@/components/ui/DoctorCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { Doctor, SiteSettings, Feature, DoctorTimelineItem } from '@/lib/types';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  Phone,
  Flame,
  ScanLine,
  Zap,
  Camera,
  BadgeCheck,
  GraduationCap,
  Briefcase,
  Layers,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Building,
  Check,
  Smile,
  Activity,
  Microscope,
} from 'lucide-react';

interface AboutClientProps {
  doctor: Doctor;
  settings: SiteSettings;
  features: Feature[];
}

/**
 * Interactive Timeline Scroll Card with dynamic entrance and exit animations on scroll.
 * Floats up smoothly when scrolling down; gracefully exits when scrolled past;
 * and floats back in when scrolling back up.
 */
function TimelineScrollCard({
  item,
  isEven,
  t,
}: {
  item: DoctorTimelineItem;
  isEven: boolean;
  t: (en: string, bn: string) => string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<'below' | 'active' | 'above'>('below');

  useEffect(() => {
    const handleScroll = () => {
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Card enters into view when top is within 85% of viewport
      const enterThreshold = windowHeight * 0.85;
      // Card exits off top when bottom is above 70px from top
      const exitThreshold = 70;

      if (rect.top > enterThreshold) {
        setScrollState('below');
      } else if (rect.bottom < exitThreshold) {
        setScrollState('above');
      } else {
        setScrollState('active');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const isCert = item.type === 'certification';
  const isExp = item.type === 'experience';

  // Dynamic animation classes based on scroll position
  let cardTransformClass = '';
  if (scrollState === 'below') {
    cardTransformClass = `opacity-0 translate-y-16 scale-95 pointer-events-none ${
      isEven ? 'sm:-translate-x-6' : 'sm:translate-x-6'
    }`;
  } else if (scrollState === 'above') {
    cardTransformClass = 'opacity-0 -translate-y-14 scale-95 pointer-events-none';
  } else {
    cardTransformClass = 'opacity-100 translate-y-0 translate-x-0 scale-100 shadow-md hover:shadow-xl';
  }

  const isNodeActive = scrollState === 'active';

  return (
    <div ref={cardRef} className="relative flex flex-col sm:flex-row items-start sm:items-center w-full">
      {/* Left / Right Card Container */}
      <div
        className={`w-full sm:w-[calc(50%-2.5rem)] pl-14 sm:pl-0 ${
          isEven ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
        }`}
      >
        <div
          className={`relative p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 transition-all duration-700 ease-out group ${cardTransformClass}`}
        >
          {/* Top Meta Header: Year & Badge */}
          <div
            className={`flex items-center gap-2 mb-3 ${
              isEven ? 'sm:justify-end' : 'sm:justify-start'
            }`}
          >
            <span className="px-3 py-1 rounded-full bg-[#0F1A48] text-white text-xs font-black shadow-xs">
              {item.year}
            </span>

            {(item.badge_en || item.badge_bn) && (
              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                  isCert
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : isExp
                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                    : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}
              >
                {t(item.badge_en || '', item.badge_bn || '')}
              </span>
            )}
          </div>

          {/* Degree / Milestone Title */}
          <h3 className="text-base sm:text-lg font-black text-[#0F1A48] leading-tight group-hover:text-emerald-700 transition-colors">
            {t(item.degree_en, item.degree_bn)}
          </h3>

          {/* Institution Name */}
          <div
            className={`flex items-center gap-1.5 text-xs font-bold text-slate-500 mt-1 mb-2.5 ${
              isEven ? 'sm:justify-end' : 'sm:justify-start'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{t(item.institution_en, item.institution_bn)}</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t(item.description_en, item.description_bn)}
          </p>
        </div>
      </div>

      {/* Center Node Icon on Spine */}
      <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-4 sm:top-auto flex items-center justify-center z-10">
        <div
          className={`w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white transition-all duration-500 ${
            isCert
              ? 'bg-emerald-600'
              : isExp
              ? 'bg-purple-600'
              : 'bg-[#0F1A48]'
          } ${
            isNodeActive
              ? 'scale-110 ring-4 ring-emerald-200/90 shadow-emerald-200/50'
              : 'scale-90 opacity-40 ring-0'
          }`}
        >
          {isCert ? (
            <Award className="w-4 h-4" />
          ) : isExp ? (
            <Briefcase className="w-4 h-4" />
          ) : (
            <GraduationCap className="w-4 h-4" />
          )}
        </div>
      </div>
    </div>
  );
}

export function AboutClient({ doctor, settings, features }: AboutClientProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();
  const [visualMode, setVisualMode] = useState<'photo' | 'card'>('photo');
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'education' | 'certification' | 'experience'>('all');

  const timelineItems: DoctorTimelineItem[] = doctor.timeline || [];

  const filteredTimeline = useMemo(() => {
    if (timelineFilter === 'all') return timelineItems;
    return timelineItems.filter((item) => (item.type || 'education') === timelineFilter);
  }, [timelineItems, timelineFilter]);

  const specialties = [
    {
      title_en: 'Single-Visit Painless RCT',
      title_bn: 'এক সিটিংয়ে ব্যথামুক্ত রুট ক্যানেল',
      desc_en: 'Rotary motorized precision & electronic apex locator',
      desc_bn: 'মোটরাইজড রোটারি সিস্টেম ও অ্যাপেক্স লোকেটার প্রযুক্তি',
      icon: Activity,
    },
    {
      title_en: 'Aesthetic Smile Architecture',
      title_bn: 'স্মাইল ডিজাইন ও কম্পোজিট ভেনিয়ার',
      desc_en: 'Biomimetic veneers, diastema closure & reshaping',
      desc_bn: 'বায়োমিমেটিক ভেনিয়ার ও দাঁতের ফাঁক নিখুঁত সমাধান',
      icon: Smile,
    },
    {
      title_en: 'Surgical & Wisdom Extractions',
      title_bn: 'সার্জিক্যাল ও আক্কেল দাঁত তোলা',
      desc_en: 'Atraumatic surgical protocols with rapid healing',
      desc_bn: 'ব্যথামুক্ত আধুনিক সার্জারি ও দ্রুত আরোগ্য লাভ',
      icon: ShieldCheck,
    },
    {
      title_en: 'Crowns, Bridges & Implants',
      title_bn: 'ক্যাপ, ব্রিজ ও স্থায়ী দাঁত প্রতিস্থাপন',
      desc_en: 'Durable porcelain and zirconia prosthetic solutions',
      desc_bn: 'টেকসই পোরসেলিন ও জিরকোনিয়া কৃত্রিম দাঁত',
      icon: Award,
    },
    {
      title_en: 'Digital RVG Diagnostic X-Ray',
      title_bn: 'ডিজিটাল RVG এক্স-রে (৳২০০)',
      desc_en: 'Instant sensor imaging with 80% reduced radiation',
      desc_bn: 'সনাতন এক্স-রের চেয়ে ৮০% কম রেডিয়েশনে নির্ভুল রিপোর্ট',
      icon: ScanLine,
    },
    {
      title_en: 'Pediatric Child Dental Care',
      title_bn: 'শিশুদের বিশেষ ডেন্টাল কেয়ার',
      desc_en: 'Fear-free friendly environment for baby teeth & fluoride',
      desc_bn: 'ভয়হীন শিশুবান্ধব পরিবেশ ও প্রতিরোধমূলক ডেন্টাল সেবা',
      icon: HeartPulse,
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F1A48]">
      {/* 1. Full-Screen Bleed Hero Section with Cover Image Background */}
      <section className="relative w-full overflow-hidden text-white min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-start border-b border-slate-200">
        {/* Full Bleed Background Image with Lightened, Highly Transparent Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={doctor.cover_url || '/images/about-clinic-cover.webp'}
            alt={t('Care Point Dental Clinic', 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক')}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Lightened, subtle transparent shadow overlay so background image is bright and clearly visible */}
          <div className="absolute inset-0 bg-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/20" />
        </div>

        {/* Hero Content on Top of Background */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="max-w-3xl space-y-5">
              {/* About Our Clinic Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/50 text-white border border-white/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="!text-white" style={{ color: '#FFFFFF' }}>{t('About Our Clinic', 'আমাদের ক্লিনিক পরিচিতি')}</span>
              </div>

              {/* Main Headline - Guaranteed Pure Crisp White with text-shadow */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] !text-white"
                style={{ color: '#FFFFFF' }}
              >
                {t(
                  'Care Point Dental Clinic — Dedicated to Your Healthy Smile',
                  'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক — আপনার সুন্দর ও সুস্থ হাসির বিশ্বস্ত ঠিকানা'
                )}
              </h1>

              {/* Subtitle */}
              <p
                className="text-base sm:text-lg leading-relaxed font-normal max-w-2xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] !text-white/95"
                style={{ color: '#F8FAFC' }}
              >
                {t(
                  'Located at Pollibidyut, Ashulia, Savar. We blend modern dental science, state-of-the-art autoclave sterilization, and patient-first compassionate care led by Dr. Aktar Zahan Ony (BDS, MPH, BMDC 12990).',
                  'পল্লীবিদ্যুৎ, আশুলিয়া, সাভারে অবস্থিত আধুনিক ও পরিচ্ছন্ন ডেন্টাল ক্লিনিক। ডা. আক্তার জাহান অনির (বিডিএস, এমপিএইচ, বিএমডিসি ১২৯৯০) আন্তরিক পরিচালনায় আমরা দিচ্ছি আধুনিক চিকিৎসা ও শতভাগ জীবাণুমুক্ত পরিবেশ।'
                )}
              </p>

              {/* Trust Badges Row */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-semibold text-white">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/30 shadow-md !text-white" style={{ color: '#FFFFFF' }}>
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('BMDC Reg. No: 12990', 'বিএমডিসি রেজি: ১২৯৯০')}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/30 shadow-md !text-white" style={{ color: '#FFFFFF' }}>
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('Class-B Autoclave Sterile', 'ক্লাস-বি শতভাগ জীবাণুমুক্ত')}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/30 shadow-md !text-white" style={{ color: '#FFFFFF' }}>
                  <ScanLine className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t('Digital RVG Radiography', 'ডিজিটাল RVG এক্স-রে (৳২০০)')}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/30 shadow-md !text-white" style={{ color: '#FFFFFF' }}>
                  <Clock className="w-3.5 h-3.5 text-slate-300" />
                  <span>{t('Daily 4:00 PM – 9:00 PM', 'প্রতিদিন বিকাল ৪টা – রাত ৯টা')}</span>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Doctor Detailed Profile Section (With Hero Shot Portrait) */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Doctor Hero Portrait & Mode Switcher */}
            <div className="lg:col-span-5 flex flex-col items-center w-full">
              {/* Visual Mode Switcher */}
              <div className="flex items-center justify-center p-1 rounded-2xl bg-slate-100 border border-slate-200 mb-5 max-w-sm w-full mx-auto shadow-2xs">
                <button
                  type="button"
                  onClick={() => setVisualMode('photo')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    visualMode === 'photo'
                      ? 'bg-white text-[#0F1A48] shadow-xs'
                      : 'text-slate-600 hover:text-[#0F1A48]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t("Doctor's Portrait", 'ডাক্তারের ছবি')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVisualMode('card')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    visualMode === 'card'
                      ? 'bg-white text-[#0F1A48] shadow-xs'
                      : 'text-slate-600 hover:text-[#0F1A48]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('Visiting Card & Rx', 'ভিজিটিং কার্ড ও প্রেসক্রিপশন')}</span>
                </button>
              </div>

              {visualMode === 'photo' ? (
                <div className="relative w-full max-w-md rounded-3xl p-5 sm:p-6 bg-white border border-slate-200 shadow-xl text-center space-y-4">
                  {/* Photo Frame */}
                  <div className="relative w-full aspect-[513/590] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-[#EEF2FF] group/photo">
                    <Image
                      src={doctor.photo_url || '/images/doctor-aktar-zahan-ony.webp'}
                      alt={doctor.name_en || 'Dr. Aktar Zahan Ony'}
                      fill
                      className="object-cover object-center group-hover/photo:scale-102 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, 440px"
                      priority
                    />

                    {/* Verified Surgeon Badge */}
                    <div className="absolute top-3.5 right-3.5 pointer-events-none">
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black shadow-md border border-white/40"
                        title="BMDC Registered Surgeon"
                      >
                        <BadgeCheck className="w-4 h-4" />
                        <span className="uppercase tracking-wider">BMDC REG</span>
                      </div>
                    </div>

                    {/* Registration Number Badge */}
                    <div className="absolute top-3.5 left-3.5 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1A48]/90 text-white text-xs font-bold shadow-md border border-white/20 backdrop-blur-md">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>রেজি: {doctor.bmdc_reg || '12990'}</span>
                      </div>
                    </div>

                    {/* Live Chamber Availability Indicator */}
                    <div className="absolute bottom-3 right-3 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1A48]/90 text-white text-[11px] font-bold shadow-sm backdrop-blur-xs border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{t('Chamber Active • 4-9 PM', 'চেম্বার সক্রিয় • ৪-৯ টা')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Title Details Under Photo */}
                  <div className="text-left space-y-1 pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-black text-[#0F1A48]">
                        {t(doctor.name_en, doctor.name_bn)}
                      </h3>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        BMDC #{doctor.bmdc_reg || '12990'}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-700">
                      {doctor.degrees || t(doctor.qualifications_en, doctor.qualifications_bn)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {t('Oral & Dental Surgeon • Lead Consultant', 'ওরাল এন্ড ডেন্টাল সার্জন • প্রধান কনসালট্যান্ট')}
                    </p>
                  </div>
                </div>
              ) : (
                <DoctorCard doctor={doctor} settings={settings} />
              )}
            </div>

            {/* Right Column: Doctor Professional Info & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                {/* Chamber Status Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>{t('Chamber Open • Serials Ongoing', 'চেম্বার ওপেন • সিরিয়াল বুকিং চলছে')}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-bold uppercase tracking-wider border border-[#0F1A48]/15">
                    <Stethoscope className="w-3.5 h-3.5 text-[#0F1A48]" />
                    <span>{t('Oral & Dental Surgeon', 'ওরাল এন্ড ডেন্টাল সার্জন')}</span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1A48] tracking-tight leading-tight">
                  {t(doctor.name_en, doctor.name_bn)}
                </h2>

                <p className="text-lg sm:text-xl font-bold text-emerald-700">
                  {doctor.degrees || t(doctor.qualifications_en, doctor.qualifications_bn)}
                </p>

                <p className="text-sm font-semibold text-slate-500">
                  {t(doctor.title_en, doctor.title_bn)} • {t('BMDC Registration No: 12990', 'বিএমডিসি রেজিস্ট্রেশন নং: ১২৯৯০')}
                </p>
              </div>

              {/* Bio Paragraphs */}
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {t(doctor.bio_en, doctor.bio_bn)}
              </p>

              {/* Clinical Specialties Grid */}
              <div className="space-y-2 pt-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  {t('Key Clinical Expertise & Services', 'বিশেষ ক্লিনিক্যাল দক্ষতা ও সেবাসমূহ')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {specialties.map((spec, i) => {
                    const IconComp = spec.icon;
                    return (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 hover:bg-white hover:border-[#0F1A48]/30 hover:shadow-xs transition-all"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#0F1A48] flex items-center justify-center shrink-0 mt-0.5">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[#0F1A48] leading-snug">
                            {t(spec.title_en, spec.title_bn)}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            {t(spec.desc_en, spec.desc_bn)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chamber Consultation Time Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-bold text-[#0F1A48] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0F1A48]" />
                  <span>{t('Chamber Consultation Schedule & Location', 'চেম্বার সময়সূচি ও পরামর্শ স্থান')}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">{t(doctor.consulting_hours_en, doctor.consulting_hours_bn)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{t(settings.address_en, settings.address_bn)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="px-6 py-3.5 bg-[#0F1A48] hover:bg-[#1E2D6A] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('Book an Appointment', 'অ্যাপয়েন্টমেন্ট বুক করুন')}</span>
                </button>
                <a
                  href={`tel:${settings.phone}`}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0F1A48] font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{t('Direct Call', 'সরাসরি কল')}</span>
                </a>
                <a
                  href={`https://wa.me/8801324558811?text=Hello%20Dr.%20Ony,%20I%20want%20to%20consult%20at%20Care%20Point%20Dental`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl text-sm border border-emerald-200 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Educational Background & Career Milestones Timeline (Designer Effect with Dynamic Scroll Animation) */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-bold uppercase tracking-wider border border-[#0F1A48]/15 shadow-2xs">
                <GraduationCap className="w-4 h-4 text-[#0F1A48]" />
                <span>{t('Academic & Professional Journey', 'শিক্ষাগত যোগ্যতা ও প্রফেশনাল পথচলা')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1A48] tracking-tight leading-tight">
                {t(
                  'Educational Background & Clinical Milestones',
                  'উচ্চতর ডিগ্রি, রেজিস্ট্রেশন ও ক্লিনিক্যাল মাইলফলক'
                )}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {t(
                  'A structured record of academic qualifications, medical council licensing, specialized hands-on certifications, and public health postgraduate training.',
                  'ব্যাচেলর অব ডেন্টাল সার্জারি থেকে শুরু করে সরকারি বিএমডিসি সনদ, রোটারি এন্ডোডন্টিক্স, এমপিএইচ ডিগ্রি এবং সার্বক্ষণিক আধুনিক সেবার একটি পরিপূর্ণ টাইমলাইন।'
                )}
              </p>

              {/* Timeline Category Filter Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {[
                  { key: 'all', label_en: 'All Milestones', label_bn: 'সকল মাইলফলক' },
                  { key: 'education', label_en: 'Academic Degrees', label_bn: 'উচ্চতর ডিগ্রি' },
                  { key: 'certification', label_en: 'Certifications & BMDC', label_bn: 'সনদ ও বিএমডিসি' },
                  { key: 'experience', label_en: 'Clinical Leadership', label_bn: 'ক্লিনিক্যাল লিডারশিপ' },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setTimelineFilter(filter.key as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      timelineFilter === filter.key
                        ? 'bg-[#0F1A48] text-white shadow-md'
                        : 'bg-white text-slate-600 hover:text-[#0F1A48] border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {t(filter.label_en, filter.label_bn)}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Timeline Spine & Nodes */}
          <div className="relative">
            {/* Vertical Gradient Spine Line */}
            <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-1 bg-gradient-to-b from-[#0F1A48] via-emerald-500 to-[#0F1A48]/70 rounded-full" />

            <div className="space-y-8 sm:space-y-12">
              {filteredTimeline.map((item, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <TimelineScrollCard
                    key={item.id || idx}
                    item={item}
                    isEven={isEven}
                    t={t}
                  />
                );
              })}
            </div>
          </div>

          {/* Admin Sync Note */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {t(
                  'Academic credentials and clinical licenses are dynamically synchronized and verifiable via Bangladesh Medical & Dental Council.',
                  'সকল ডিগ্রি ও সনদসমূহ বাংলাদেশ মেডিকেল অ্যান্ড ডেন্টাল কাউন্সিল (বিএমডিসি) দ্বারা নিবন্ধিত ও অনুমোদিত।'
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Zero-Compromise Sterilization & Patient Safety Standards */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('Safety & Infection Control', 'সুরক্ষা ও সংক্রমণ প্রতিরোধ')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1A48] tracking-tight">
                {t('Our Zero-Compromise Sterilization Protocol', 'আমাদের শতভাগ জীবাণুমুক্তকরণ নীতি')}
              </h2>
              <p className="text-sm text-slate-600">
                {t(
                  'We adhere to hospital-grade sterilization protocols to guarantee patient safety against cross-infection.',
                  'আমরা প্রতিটি রোগীর জন্য আলাদা জীবাণুমুক্ত ইন্সট্রুমেন্ট ও হাসপাতাল গ্রেড অটোক্লেভ পদ্ধতি ব্যবহার করি।'
                )}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-[#F8FAFC] p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3 h-full hover:bg-white hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0F1A48]">
                  {t('Autoclave Sterilization', 'অটোক্লেভ জীবাণুমুক্তকরণ')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t(
                    'High-pressure saturated steam destroys 100% of bacterial and viral spores on all metal tools before every single patient appointment.',
                    'প্রতিটি রোগীর চিকিৎসার পূর্বে উচ্চচাপ বাষ্পযুক্ত অটোক্লেভ মেশিনে সমস্ত ধাতব যন্ত্রপাতি সম্পূর্ণ জীবাণুমুক্ত করা হয়।'
                  )}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-[#F8FAFC] p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3 h-full hover:bg-white hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ScanLine className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0F1A48]">
                  {t('Low-Radiation Digital RVG X-Ray', 'ডিজিটাল RVG এক্স-রে (৳২০০)')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t(
                    'Instant on-screen digital imaging with up to 80% lower radiation than traditional film, offering fast and pinpoint root canal diagnosis for only ৳200.',
                    'সনাতন এক্স-রের চেয়ে ৮০% কম রেডিয়েশন এবং কম্পিউটারের পর্দায় তাৎক্ষণিক রেজাল্ট। মাত্র ২০০ টাকায় নিখুঁত রোগ নির্ণয়।'
                  )}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-[#F8FAFC] p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3 h-full hover:bg-white hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0F1A48]">
                  {t('Continuous Power Backup (IPS/Generator)', 'নিরবচ্ছিন্ন বিদ্যুৎ ব্যবস্থা')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t(
                    'Dedicated instant power backup guarantees that surgical and root canal procedures are never interrupted by local grid power outages.',
                    'চিকিৎসা চলাকালীন যেন লোডশেডিংয়ের সমস্যা না হয়, সেজন্য সার্বক্ষণিক আইপিএস ও জেনারেটর ব্যাকআপ নিশ্চিত করা আছে।'
                  )}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Why Care Point Dental Clinic is Your Best Choice (Features Grid) */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F1A48] tracking-tight">
                {t('Why Care Point Dental Clinic is Your Best Choice', 'কেন কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক আপনার সেরা পছন্দ')}
              </h2>
              <p className="text-sm text-slate-600">
                {t(
                  '17 reasons why patients in Ashulia, Savar, and surrounding areas trust us with their dental health.',
                  '১৭টি বিশেষ সুবিধা যা আমাদের সেবাকে করে তুলেছে আশুলিয়া ও সাভারের রোগীদের কাছে নির্ভরযোগ্য।'
                )}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#0F1A48]/30 hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#0F1A48] flex items-center justify-center shrink-0 font-black text-xs">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#0F1A48]">
                    {t(feature.title_en, feature.title_bn)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {t(feature.description_en, feature.description_bn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Clinic Chamber & Emergency Action Banner */}
      <section className="py-14 lg:py-16 bg-white text-[#0F1A48]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-bold uppercase tracking-wider border border-[#0F1A48]/15 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('Instant Chamber Access & Support', 'জরুরি যোগাযোগ ও চেম্বার সেবা')}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1A48] tracking-tight">
            {t('Care Point Dental Clinic — Ashulia, Savar', 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক — আশুলিয়া, সাভার')}
          </h3>

          <p className="text-sm text-[#0F1A48]/80 max-w-xl mx-auto leading-relaxed">
            {t(
              '2nd Floor, Mofizuddin Tower, Beside UCB Bank, Pollibidyut Kabarsthan Road Stand, Ashulia, Savar. Consulting daily from 4:00 PM to 9:00 PM.',
              '২য় তলা, মফিজ উদ্দিন টাওয়ার (হাংরি টাউন বিল্ডিং), স\'মিলের সাথে, ইউসিবি ব্যাংকের পাশে, পল্লীবিদ্যুৎ কবরস্থান রোড বাস স্ট্যান্ড, আশুলিয়া, সাভার।'
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="tel:+8801324558811"
              className="px-6 py-3.5 bg-[#0F1A48] hover:bg-[#1E2D6A] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{t('Direct Hotline: +880 1324-558811', 'সরাসরি কল: ০১৩২৪-৫৫৮৮১১')}</span>
            </a>

            <a
              href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental,%20I%20want%20to%20consult%20Dr.%20Aktar%20Zahan%20Ony"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: 01324-558811</span>
            </a>

            <a
              href={settings.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-white hover:bg-slate-50 text-[#0F1A48] font-bold rounded-xl text-xs sm:text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>{t('Google Maps Location', 'গুগল ম্যাপে লোকেশন')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
