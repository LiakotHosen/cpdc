'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { Doctor, SiteSettings } from '@/lib/types';
import {
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Calendar,
  Sparkles,
  Award,
  Stethoscope,
  CheckCircle2,
  FileText,
  Activity,
  Star,
  Camera,
  Check,
  Zap,
} from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  settings: SiteSettings;
  compact?: boolean;
}

export function DoctorCard({ doctor, settings, compact = false }: DoctorCardProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();
  const [activeTab, setActiveTab] = useState<'card' | 'prescription' | 'specialties'>('card');

  return (
    <div className="relative group max-w-lg mx-auto w-full pt-4 pb-2">
      {/* Floating Satellite Card 1: Top-Right Rating Badge */}
      <div className="absolute -top-3 -right-2 sm:-right-4 z-20 animate-float hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-200/80 shadow-lg shadow-navy-primary/10">
        <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-black text-slate-800">৫.০ রেটিং</span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1 rounded">★ 5.0</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">১২০+ সন্তুষ্ট হাসিমুখ</span>
        </div>
      </div>

      {/* Floating Satellite Card 2: Bottom-Left RVG X-Ray Badge */}
      <div className="absolute -bottom-3 -left-2 sm:-left-5 z-20 animate-float-reverse hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-teal-200/80 shadow-lg shadow-navy-primary/10">
        <div className="w-8 h-8 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-600">
          <Camera className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-navy-primary">ডিজিটাল RVG এক্স-রে</span>
            <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-1 rounded">৳২০০</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">তাৎক্ষণিক নির্ভুল ডায়াগনস্টিক</span>
        </div>
      </div>

      {/* Multi-layer Ambient Backlight Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-teal-500 to-indigo-600 rounded-[2.2rem] blur-2xl opacity-30 group-hover:opacity-55 transition duration-700 pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#16235C] via-[#0F1944] to-[#090F2D] border border-white/20 shadow-2xl text-white backdrop-blur-xl">
        
        {/* Top Metallic Brand Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 via-teal-300 via-amber-300 to-indigo-400" />

        {/* Card Header with Status & Mode Toggle */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between gap-3">
            {/* Live Chamber Availability Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] sm:text-xs font-bold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{t('Chamber Open • Serials Ongoing', 'চেম্বার ওপেন • সিরিয়াল বুকিং চলছে')}</span>
            </div>

            {/* Official BMDC Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>BMDC: {doctor.bmdc_reg}</span>
            </div>
          </div>

          {/* Doctor Core Profile Header */}
          <div className="mt-5 flex items-start gap-4">
            {/* Stethoscope & Medical Crest Avatar */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-navy-primary to-blue-500 border-2 border-white/30 flex items-center justify-center shadow-lg shrink-0">
              <div className="text-center">
                <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto drop-shadow-md" />
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 block">Surgeon</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#121E52] flex items-center justify-center text-white shadow-sm" title="Verified BMDC Surgeon">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Doctor Titles & Degrees */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-widest text-teal-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{t(doctor.title_en, doctor.title_bn)}</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-0.5">
                {t(doctor.name_en, doctor.name_bn)}
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {doctor.degrees || t(doctor.qualifications_en, doctor.qualifications_bn)}
              </p>

              <p className="text-[11px] text-teal-200/90 font-medium mt-0.5">
                {t('BMDC Registered Oral & Dental Specialist', 'বাংলাদেশ মেডিকেল ও ডেন্টাল কাউন্সিল (BMDC) নিবন্ধিত সার্জন')}
              </p>
            </div>
          </div>

          {/* Interactive Digital Mode Selector (3 Tabs) */}
          <div className="mt-5 grid grid-cols-3 gap-1 p-1 rounded-xl bg-black/35 border border-white/10 text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`py-2 px-1.5 sm:px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer text-center ${
                activeTab === 'card'
                  ? 'bg-white text-navy-primary shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-3 h-3 text-navy-primary shrink-0" />
              <span className="truncate">{t('Visiting Card', 'চেম্বার কার্ড')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('prescription')}
              className={`py-2 px-1.5 sm:px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer text-center ${
                activeTab === 'prescription'
                  ? 'bg-white text-navy-primary shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-3 h-3 text-navy-primary shrink-0" />
              <span className="truncate">{t('Safety Protocol', 'সুরক্ষা নিয়ম')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('specialties')}
              className={`py-2 px-1.5 sm:px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer text-center ${
                activeTab === 'specialties'
                  ? 'bg-white text-navy-primary shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-3 h-3 text-navy-primary shrink-0" />
              <span className="truncate">{t('Treatments', 'চিকিৎসা দক্ষতা')}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Digital Visiting Card View */}
        {activeTab === 'card' && (
          <div className="p-5 sm:p-6 space-y-3.5">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-medium text-slate-300 block">
                  {t('Consulting Hours', 'রোগী দেখার সময়')}
                </span>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white mt-1">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t('4:00 PM – 9:00 PM Daily', 'বিকাল ৪:০০ – রাত ৯:০০ টা')}</span>
                </div>
                <span className="text-[10px] text-teal-300 block mt-1">
                  {t('Morning on 30m prior call', 'সকালে আসার ৩০ মি. আগে জানান')}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-medium text-slate-300 block">
                  {t('Consultation Fee', 'পরামর্শ ফি (নির্দিষ্ট)')}
                </span>
                <div className="flex items-center gap-1.5 text-sm sm:text-base font-extrabold text-emerald-300 mt-1">
                  <span>৳২০০</span>
                  <span className="text-[10px] text-white/80 font-normal">/ ভিজিট</span>
                </div>
                <span className="text-[10px] text-amber-300 block mt-1">
                  {t('Digital RVG X-Ray: ৳200', 'ডিজিটাল RVG এক্স-রে: ৳২০০')}
                </span>
              </div>
            </div>

            {/* Chamber Location Chip */}
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5 leading-snug">
                <span className="font-bold text-white block">
                  {t('Chamber Address (Care Point Dental)', 'চেম্বারের পূর্ণ ঠিকানা (কেয়ার পয়েন্ট)')}
                </span>
                <p className="text-slate-300 text-[11px]">
                  {t(
                    '2nd Floor, Mofizuddin Tower, Beside UCB Bank, Pollibidyut Kabarsthan Rd Stand, Ashulia, Savar',
                    '২য় তলা, মফিজ উদ্দিন টাওয়ার (হাংরি টাউন বিল্ডিং), স\'মিলের সাথে, ইউসিবি ব্যাংকের পাশে, পল্লীবিদ্যুৎ, আশুলিয়া, সাভার।'
                  )}
                </p>
              </div>
            </div>

            {/* Hotlines Extracted From Card */}
            <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-black/25 border border-white/10 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">{settings.phone}</span>
              </div>
              <span className="text-[10px] text-teal-300 font-bold">হটলাইন ও হোয়াটসঅ্যাপ</span>
            </div>
          </div>
        )}

        {/* Tab 2: Clinical Prescription & Safety Protocols View */}
        {activeTab === 'prescription' && (
          <div className="p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                {t('Prescription Pad Safety Standards', 'প্রেসক্রিপশন প্যাড ক্লিনিকাল স্ট্যান্ডার্ড')}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                Class-B Sterile
              </span>
            </div>

            {/* Protocols directly from Prescription Pad image */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {t('Pre-Procedure Health Screening', 'ট্রিটমেন্ট পূর্ববর্তী স্বাস্থ্য পর্যবেক্ষণ')}
                  </span>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    {t(
                      'Routine check for Hypertension (HTN), Diabetes (DM), Asthma, Heart disorder & Bleeding tendencies before surgical extractions.',
                      'দাঁত তোলা বা ওরাল সার্জারির পূর্বে রক্তচাপ (HTN), ডায়াবেটিস (DM), অ্যাজমা ও রক্ত জমাট বাঁধার সার্বিক ঝুঁকি পরীক্ষা।'
                    )}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {t('Digital Diagnostic Imaging', 'ডিজিটাল আরভিজি (RVG) ও ওপিজি এক্স-রে')}
                  </span>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    {t(
                      'Instant low-radiation intraoral X-ray (৳200) for exact root canal depth & wisdom tooth positioning.',
                      'কম রেডিয়েশনে তাৎক্ষণিক ডিজিটাল এক্স-রে রিপোর্ট (মাত্র ৳২০০), যা রুট ক্যানেল ও আক্কেল দাঁতের নির্ভুল চিত্র নিশ্চিত করে।'
                    )}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {t('Hospital Grade Autoclave Autoclave', '১০০% অটোক্লেভ ও ইউভি নির্বীজন')}
                  </span>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    {t(
                      'Zero cross-contamination policy. Every metal instrument is sealed in sterile pouches for each patient.',
                      'রোগীর সর্বোচ্চ সুরক্ষায় প্রতিটি যন্ত্র স্বয়ংক্রিয় অটোক্লেভ ও ইউভি মেশিনে জীবাণুমুক্ত করে সিল করা হয়।'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Specialized Treatments & Surgical Mastery View */}
        {activeTab === 'specialties' && (
          <div className="p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                {t('Core Clinical Services', 'বিশেষায়িত চিকিৎসা দক্ষতা')}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                BDS Surgeon
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-[11px]">রুট ক্যানেল (RCT)</span>
                  <span className="text-[10px] text-slate-300 block">ব্যথামুক্ত ও দীর্ঘস্থায়ী ক্রাউন</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-[11px]">আক্কেল দাঁত সার্জারি</span>
                  <span className="text-[10px] text-slate-300 block">ইমপ্যাক্টেড ও জটিল নিষ্কাশন</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-[11px]">স্কেলিং ও পলিশিং</span>
                  <span className="text-[10px] text-slate-300 block">আল্ট্রাসনিক টেকনোলজি</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-[11px]">বাচ্চাদের ডেন্টাল কেয়ার</span>
                  <span className="text-[10px] text-slate-300 block">ভীতিহীন ক্যাভিটি ফিলিং</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-teal-900/30 border border-teal-500/30 text-[11px] text-teal-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{t('Modern painless anesthesia and precision micro-dentistry tools.', 'প্রতিটি প্রক্রিয়ায় সম্পূর্ণ আধুনিক ব্যথামুক্ত অবশ ও উন্নত যন্ত্রপাতি ব্যবহৃত হয়।')}</span>
            </div>
          </div>
        )}

        {/* Card Footer CTAs */}
        <div className="p-4 sm:p-5 bg-black/40 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => openBooking(undefined, t(doctor.name_en, doctor.name_bn))}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-navy-dark rounded-xl font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-navy-primary" />
            <span>{t('Book Serial (Fee: ৳200)', 'সিরিয়াল কনফার্ম করুন (৳২০০)')}</span>
          </button>

          <a
            href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental,%20I%20would%20like%20to%20book%20an%20appointment%20with%20Dr.%20Aktar%20Zahan%20Ony"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5"
            title="WhatsApp Consultation"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <a
            href={`tel:${settings.phone}`}
            className="py-3 px-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5"
            title="Call Directly"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{t('Call', 'কল')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

