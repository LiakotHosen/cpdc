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
  ArrowRight,
  MapPin,
} from 'lucide-react';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface DoctorSpotlightProps {
  doctor: Doctor;
}

export function DoctorSpotlight({ doctor }: DoctorSpotlightProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  return (
    <section className="w-full py-16 lg:py-24 bg-[#F8FAFC] text-[#0F1A48] relative overflow-hidden border-b border-slate-200">
      {/* Main Container */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-black uppercase tracking-wider border border-[#0F1A48]/15 shadow-2xs">
              <Stethoscope className="w-4 h-4 text-[#0F1A48]" />
              <span>{t('Lead Oral & Dental Surgeon', 'প্রধান ডেন্টাল সার্জন পরিচিতি')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1A48] tracking-tight leading-[1.2]">
              {t('Meet Dr. Aktar Zahan Ony', 'আপনার ডেন্টাল কেয়ার ও পরামর্শে ডা. আক্তার জাহান অনি')}
            </h2>

            <p className="text-base sm:text-lg text-[#0F1A48]/80 leading-relaxed font-normal max-w-2xl mx-auto">
              {t(
                'A compassionate dental surgeon dedicated to pain-free modern dentistry, sterile protocols, and patient-first care in Ashulia and Savar.',
                'সাভার ও আশুলিয়ার মানুষের মুখে সুস্থ ও সুন্দর হাসি ফিরিয়ে দিতে আন্তর্জাতিক মানের আধুনিক প্রযুক্তি, নিখুঁত সার্জারি ও পরম আন্তরিকতায় নিবেদিতপ্রাণ ডেন্টাল সার্জন।'
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
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
                      <span>রেজি: {doctor.bmdc_reg || '12990'}</span>
                    </div>
                  </div>

                  {/* Bottom-Right: Live Status */}
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F1A48]/85 text-white text-[11px] font-bold shadow-sm backdrop-blur-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>চেম্বার সক্রিয়</span>
                    </div>
                  </div>
                </div>

                {/* Consulting Timing & Chamber Location */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3.5 rounded-2xl bg-[#EEF2FF] border border-[#0F1A48]/10 hover:bg-[#EEF2FF]/80 transition-colors">
                    <span className="text-[11px] text-[#0F1A48]/75 block font-medium">চেম্বার সময়সূচি</span>
                    <span className="text-xs sm:text-sm font-bold text-[#0F1A48] mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      ৪:০০ – ৯:০০ টা
                    </span>
                    <span className="text-[10px] text-[#0F1A48]/70 block mt-0.5">প্রতিদিন চেম্বার খোলা</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#EEF2FF] border border-[#0F1A48]/10 hover:bg-[#EEF2FF]/80 transition-colors">
                    <span className="text-[11px] text-[#0F1A48]/75 block font-medium">চেম্বার অবস্থান</span>
                    <span className="text-xs sm:text-sm font-bold text-[#0F1A48] mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      পল্লীবিদ্যুৎ, সাভার
                    </span>
                    <span className="text-[10px] text-[#0F1A48]/70 block mt-0.5">মফিজ উদ্দিন টাওয়ার</span>
                  </div>
                </div>

                {/* Direct Action Inside Plaque */}
                <button
                  type="button"
                  onClick={() => openBooking(undefined, t(doctor.name_en, doctor.name_bn))}
                  className="w-full py-3.5 px-5 bg-[#0F1A48] hover:bg-[#EEF2FF] hover:text-[#0F1A48] text-white border border-[#0F1A48] rounded-2xl font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 text-amber-300 group-hover:text-[#0F1A48]" />
                  <span>{t('Book Serial with Dr. Ony', 'ডা. অনির সিরিয়াল বুক করুন')}</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Credentials & Prescription Pad Safeguards */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <ScrollReveal animation="fade-left" duration={700}>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-bold border border-[#0F1A48]/15">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>{t('Professional Philosophy & Care', 'চিকিৎসা দর্শন ও আন্তরিক সেবা')}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-semibold border border-[#0F1A48]/15">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#0F1A48]" />
                  <span>{doctor.degrees || t(doctor.qualifications_en, doctor.qualifications_bn)}</span>
                </div>
              </div>
            </ScrollReveal>

            {/* 4 Clinical Safeguards Extracted From Official Prescription Pad */}
            <div className="space-y-3.5 pt-1">
              <ScrollReveal animation="fade-up" delay={150}>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0F1A48] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <span>{t('Clinical Investigation & Safety Protocols', 'প্রেসক্রিপশন প্যাড ক্লিনিকাল নিরাপত্তা প্রোটোকল')}</span>
                </h4>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                {[
                  {
                    title: 'সিস্টেমিক স্বাস্থ্য পর্যবেক্ষণ',
                    desc: 'সার্জারির আগে রক্তচাপ (HTN), ডায়াবেটিস (DM), অ্যাজমা ও রক্তক্ষরণের ঝুঁকি সতর্ক মূল্যায়ন।',
                    delay: 200,
                  },
                  {
                    title: 'ইনস্ট্যান্ট ডিজিটাল RVG এক্স-রে',
                    desc: 'কম্পিউটার স্ক্রিনে দাঁতের ভেতরের সুনির্দিষ্ট ইনফেকশন ও অবস্থা নির্ণয়।',
                    delay: 280,
                  },
                  {
                    title: '১০০% ক্লাস-বি অটোক্লেভ নির্বীজন',
                    desc: 'হাসপাতাল-গ্রেড অটোক্লেভ ও ইউভি চেম্বারে প্রতিটি ধাতব যন্ত্রপাতি সম্পূর্ণ জীবাণুমুক্তকরণ।',
                    delay: 360,
                  },
                  {
                    title: 'স্বচ্ছ বাজেট ও ডিজিটাল রেকর্ড',
                    desc: 'চিকিৎসা শুরুর পূর্বেই খরচের পূর্ণ হিসাব ও ডিজিটাল প্রেসক্রিপশন সংরক্ষণ।',
                    delay: 440,
                  },
                ].map((item, idx) => (
                  <ScrollReveal key={idx} animation="fade-up" delay={item.delay}>
                    <div className="p-4 sm:p-4.5 bg-white hover:bg-[#EEF2FF] transition-all rounded-2xl border border-slate-200 flex items-start gap-3 shadow-xs hover:-translate-y-1">
                      <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#0F1A48] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-[#0F1A48] block text-sm sm:text-base">{item.title}</span>
                        <p className="text-xs text-[#0F1A48]/75 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Booking & Call Actions with More Breathing Space */}
            <ScrollReveal animation="fade-up" delay={500}>
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => openBooking(undefined, t(doctor.name_en, doctor.name_bn))}
                  className="px-7 py-4 bg-[#0F1A48] text-white hover:bg-[#EEF2FF] hover:text-[#0F1A48] border border-[#0F1A48] rounded-2xl font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer group"
                >
                  <Calendar className="w-5 h-5 text-amber-300 group-hover:text-[#0F1A48] transition-transform" />
                  <span>{t('Book Serial', 'সিরিয়াল নিন')}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0F1A48] group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental,%20I%20want%20to%20consult%20Dr.%20Aktar%20Zahan%20Ony"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp: 01324-558811</span>
                </a>

                <a
                  href="tel:+8801324558811"
                  className="px-5 py-4 bg-white hover:bg-[#EEF2FF] text-[#0F1A48] rounded-2xl font-bold text-sm sm:text-base border border-slate-300 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>সরাসরি কল</span>
                </a>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
}
