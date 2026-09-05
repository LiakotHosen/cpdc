'use client';

import React from 'react';
import Image from 'next/image';
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
  MessageSquare,
  Sparkles,
  Activity,
  HeartPulse,
  BadgeCheck,
  ArrowRight
} from 'lucide-react';

interface DoctorSpotlightProps {
  doctor: Doctor;
}

export function DoctorSpotlight({ doctor }: DoctorSpotlightProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  return (
    <section className="w-full py-20 lg:py-28 bg-gradient-to-br from-[#163F72] via-[#1E5292] to-[#2463AB] text-white relative overflow-hidden border-y border-blue-300/20 shadow-2xl">
      {/* Full-Bleed Ambient Background Glows */}
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-[600px] h-[600px] bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container with Expansive Breathing Room */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md border border-white/20 shadow-xs">
            <Stethoscope className="w-4 h-4 text-teal-300" />
            <span>{t('Lead Oral & Dental Surgeon', 'প্রধান ডেন্টাল সার্জন পরিচিতি')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
            {t('Meet Dr. Aktar Zahan Ony', 'আপনার ডেন্টাল কেয়ার ও পরামর্শে ডা. আক্তার জাহান অনি')}
          </h2>

          <p className="text-base sm:text-lg text-blue-100 leading-relaxed font-normal max-w-2xl mx-auto">
            {t(
              'A compassionate dental surgeon dedicated to pain-free modern dentistry, sterile protocols, and patient-first care in Ashulia and Savar.',
              'সাভার ও আশুলিয়ার মানুষের মুখে সুস্থ ও সুন্দর হাসি ফিরিয়ে দিতে আন্তর্জাতিক মানের আধুনিক প্রযুক্তি, নিখুঁত সার্জারি ও পরম আন্তরিকতায় নিবেদিতপ্রাণ ডেন্টাল সার্জন।'
            )}
          </p>
        </div>

        {/* Full-Bleed 2-Column Showcase with Generous Grid Gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Expanded Surgeon Visual Showcase Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-7 bg-white/15 border border-white/25 shadow-2xl backdrop-blur-xl text-center space-y-5 hover:shadow-cyan-500/10 transition-shadow">
              
              {/* Doctor Headshot Photo - Large & Prominent Portrait */}
              <div className="relative w-full aspect-[4/4.2] sm:aspect-[4/4.5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 bg-navy-dark group/photo">
                <Image
                  src={doctor.photo_url || '/images/doctor-ony.jpg'}
                  alt={doctor.name_en || 'Dr. Aktar Zahan Ony'}
                  fill
                  className="object-cover object-top group-hover/photo:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 440px, 460px"
                  priority
                />

                {/* Subtle Image Bottom Shadow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Verified Surgeon Badges Overlay directly on Photo */}
                <div className="absolute top-3.5 right-3.5 pointer-events-none">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black shadow-lg border border-white/40 backdrop-blur-xs"
                    title="BMDC Registered Surgeon"
                  >
                    <BadgeCheck className="w-4 h-4" />
                    <span className="uppercase tracking-wider">BMDC REG</span>
                  </div>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>রেজিস্ট্রেশন: {doctor.bmdc_reg}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-500/80 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span>চেম্বার সক্রিয়</span>
                  </div>
                </div>
              </div>

              {/* Consulting Timing & Consultation Fee Cards */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-white/12 border border-white/18 backdrop-blur-xs">
                  <span className="text-[11px] text-blue-200 block font-medium">চেম্বার সময়সূচি</span>
                  <span className="text-xs sm:text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    ৪:০০ – ৯:০০ টা
                  </span>
                  <span className="text-[10px] text-teal-200 block mt-0.5">প্রতিদিন চেম্বার খোলা</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/12 border border-white/18 backdrop-blur-xs">
                  <span className="text-[11px] text-blue-200 block font-medium">পরামর্শ ফি</span>
                  <span className="text-sm sm:text-base font-black text-emerald-300 mt-1 block">৳২০০ (নির্দিষ্ট)</span>
                  <span className="text-[10px] text-blue-200 block mt-0.5">কোনো লুকানো চার্জ নেই</span>
                </div>
              </div>

              {/* Direct Action Inside Plaque */}
              <button
                type="button"
                onClick={() => openBooking(undefined, t(doctor.name_en, doctor.name_bn))}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-400 hover:from-teal-200 hover:to-emerald-300 text-slate-900 rounded-2xl font-black text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-900" />
                <span>{t('Book Serial with Dr. Ony', 'ডা. অনির সিরিয়াল বুক করুন')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bio, Credentials & Prescription Pad Safeguards */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Header / Badges & Philosophy */}
            <div className="space-y-3.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold border border-white/20 backdrop-blur-xs">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>{t('Professional Philosophy & Care', 'চিকিৎসা দর্শন ও আন্তরিক সেবা')}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-400/20 text-teal-200 text-xs font-semibold border border-teal-300/30">
                  <BadgeCheck className="w-3.5 h-3.5 text-teal-300" />
                  <span>{doctor.degrees || t(doctor.qualifications_en, doctor.qualifications_bn)}</span>
                </div>
              </div>

              <p className="text-base sm:text-lg text-blue-50 leading-relaxed font-normal">
                {t(
                  'Dr. Aktar Zahan Ony combines academic excellence with gentle clinical expertise. Every patient receives a comprehensive systemic pre-check, low-radiation digital imaging, and customized pain-free treatment plans tailored to long-term oral health.',
                  'ডা. আক্তার জাহান অনি রোগীর ভয় ও ব্যথামুক্ত চিকিৎসাকে সর্বোচ্চ প্রাধান্য দিয়ে আশুলিয়ার প্রতিটি মানুষের মুখে দীর্ঘমেয়াদী সুস্থ ও সুন্দর হাসি ফিরিয়ে দিতে নিবেদিত। আধুনিক ডিজিটাল সরঞ্জাম, সঠিক রোগ নির্ণয় ও সর্বোচ্চ পরিচ্ছন্নতার সাথে প্রতিটি চিকিৎসা সম্পন্ন করা হয়।'
                )}
              </p>
            </div>

            {/* 4 Clinical Safeguards Extracted From Official Prescription Pad */}
            <div className="space-y-3.5 pt-1">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-300" />
                <span>{t('Clinical Investigation & Safety Protocols', 'প্রেসক্রিপশন প্যাড ক্লিনিকাল নিরাপত্তা প্রোটোকল')}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                <div className="p-4 sm:p-4.5 bg-white/12 hover:bg-white/18 transition-all rounded-2xl border border-white/18 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm sm:text-base">সিস্টেমিক স্বাস্থ্য পর্যবেক্ষণ</span>
                    <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                      সার্জারির আগে রক্তচাপ (HTN), ডায়াবেটিস (DM), অ্যাজমা ও রক্তক্ষরণের ঝুঁকি সতর্ক মূল্যায়ন।
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-4.5 bg-white/12 hover:bg-white/18 transition-all rounded-2xl border border-white/18 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm sm:text-base">ইনস্ট্যান্ট ডিজিটাল RVG এক্স-রে</span>
                    <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                      মাত্র ২০০ টাকায় কম্পিউটার স্ক্রিনে দাঁতের ভেতরের সুনির্দিষ্ট ইনফেকশন ও অবস্থা নির্ণয়।
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-4.5 bg-white/12 hover:bg-white/18 transition-all rounded-2xl border border-white/18 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm sm:text-base">১০০% ক্লাস-বি অটোক্লেভ নির্বীজন</span>
                    <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                      হাসপাতাল-গ্রেড অটোক্লেভ ও ইউভি চেম্বারে প্রতিটি ধাতব যন্ত্রপাতি সম্পূর্ণ জীবাণুমুক্তকরণ।
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-4.5 bg-white/12 hover:bg-white/18 transition-all rounded-2xl border border-white/18 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm sm:text-base">স্বচ্ছ বাজেট ও ডিজিটাল রেকর্ড</span>
                    <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                      চিকিৎসা শুরুর পূর্বেই খরচের পূর্ণ হিসাব ও ডিজিটাল প্রেসক্রিপশন সংরক্ষণ।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking & Call Actions with More Breathing Space */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => openBooking(undefined, t(doctor.name_en, doctor.name_bn))}
                className="px-7 py-4 bg-white text-navy-primary hover:bg-blue-50 rounded-2xl font-black text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                <Calendar className="w-5 h-5 text-navy-primary group-hover:scale-110 transition-transform" />
                <span>{t('Book Consultation Serial (৳200)', 'সিরিয়াল নিন (পরামর্শ ফি ৳২০০)')}</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental,%20I%20want%20to%20consult%20Dr.%20Aktar%20Zahan%20Ony"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp: 01324-558811</span>
              </a>

              <a
                href="tel:+8801324558811"
                className="px-5 py-4 bg-white/15 hover:bg-white/25 text-white rounded-2xl font-bold text-sm sm:text-base border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>সরাসরি কল</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
