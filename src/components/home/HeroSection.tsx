'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { SiteSettings, Doctor } from '@/lib/types';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Stethoscope,
  HeartHandshake,
  MessageSquare,
  Star,
  Zap,
  Award,
} from 'lucide-react';

interface HeroSectionProps {
  settings: SiteSettings;
  doctor: Doctor;
}

export function HeroSection({ settings, doctor }: HeroSectionProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-tint/80 via-white to-slate-50/80 bg-dental-pattern pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80">
      {/* Dynamic Background Ambient Light Spheres */}
      <div className="absolute top-0 right-1/4 -mt-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/15 via-teal-400/15 to-transparent blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-1/3 left-0 -ml-24 w-80 h-80 rounded-full bg-navy-primary/10 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none animate-float-reverse" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-7 sm:space-y-8">
        
        {/* Top Credibility & Trust Pill with Reveal */}
        <ScrollReveal animation="fade-down" duration={500}>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs text-xs font-bold text-navy-primary hover:border-navy-light/40 transition-all">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="tracking-wide">
                {t(
                  'Ashulia & Savar Trusted Dental Clinic',
                  'আশুলিয়া ও সাভারবাসীর নির্ভরযোগ্য আধুনিক ডেন্টাল কেয়ার'
                )}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/70 text-xs font-bold text-navy-primary hover:scale-105 transition-transform">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>BMDC Reg: {doctor.bmdc_reg}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/70 text-xs font-bold text-emerald-800 hover:scale-105 transition-transform">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t(doctor.name_en, doctor.name_bn)}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Headline - Rhythmic, Radiant, Fluent Bengali */}
        <ScrollReveal animation="fade-up" delay={80} duration={650}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-primary tracking-tight leading-[1.15] max-w-4xl mx-auto">
            {lang === 'bn' ? (
              <>
                ব্যথামুক্ত আধুনিক চিকিৎসা,{' '}
                <span className="bg-gradient-to-r from-blue-700 via-teal-600 to-indigo-700 bg-clip-text text-transparent underline decoration-amber-400 decoration-wavy decoration-2 underline-offset-8">
                  আপনার আত্মবিশ্বাসী হাসির
                </span>{' '}
                পূর্ণ আস্থা
              </>
            ) : (
              <>
                Gentle, Advanced & Pain-Free Dentistry For{' '}
                <span className="bg-gradient-to-r from-blue-700 via-teal-600 to-indigo-700 bg-clip-text text-transparent">
                  Your Confident Smile
                </span>
              </>
            )}
          </h1>
        </ScrollReveal>

        {/* Subheadline - Natural, Empathetic Healthcare Messaging */}
        <ScrollReveal animation="fade-up" delay={160} duration={650}>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            {t(
              'Experience world-class Class-B autoclave sterilization, digital RVG instant X-rays, and gentle surgical care directly by Dr. Aktar Zahan Ony. Dedicated care and heartfelt patient attention in Ashulia & Savar.',
              'রোগীর শতভাগ সুরক্ষায় আন্তর্জাতিক স্ট্যান্ডার্ড ক্লাস-বি অটোক্লেভ জীবাণুমুক্ত পরিবেশ, মাত্র ২০০ টাকায় তাৎক্ষণিক ডিজিটাল আরভিজি এক্স-রে এবং চিফ সার্জন ডা: আক্তার জাহান অনি-র নিবিড় তত্ত্বাবধানে ব্যথাহীন চিকিৎসাসেবা।'
            )}
          </p>
        </ScrollReveal>

        {/* Value Highlights Grid - 4 Centered Bento Chips with Hover Lift */}
        <ScrollReveal animation="fade-up" delay={240} duration={650}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 pro-card group text-center cursor-default">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block leading-tight">
                {t('100% Sterile', '১০০% অটোক্লেভ')}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">জীবাণুমুক্ত সুরক্ষা</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-teal-300 pro-card group text-center cursor-default">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block leading-tight">
                {t('Digital RVG X-Ray', 'আরভিজি এক্স-রে')}
              </span>
              <span className="text-[10px] text-teal-700 font-bold mt-0.5 block">মাত্র ৳২০০</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 pro-card group text-center cursor-default">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block leading-tight">
                {t('Pain-Free Care', 'ব্যথাহীন চিকিৎসা')}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">কোমল অ্যানেস্থেশিয়া</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-amber-300 pro-card group text-center cursor-default">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block leading-tight">
                {t('24/7 Power & AC', 'ফুল এসি ও ব্যাকআপ')}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">নিরবচ্ছিন্ন আরাম</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Action Buttons with Visual Hierarchy & Glowing CTA */}
        <ScrollReveal animation="fade-up" delay={320} duration={650}>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openBooking()}
              className="relative px-7 py-4 bg-navy-primary hover:bg-navy-dark text-white rounded-2xl font-bold text-sm sm:text-base shadow-xl shadow-navy-primary/25 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <Calendar className="w-5 h-5 text-amber-300 group-hover:rotate-6 transition-transform" />
              <span>{t('Book Appointment (Fee ৳200)', 'সিরিয়াল নিশ্চিত করুন (ভিজিট ৳২০০)')}</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental,%20I%20want%20to%20consult%20Dr.%20Aktar%20Zahan%20Ony"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t('WhatsApp Chat', 'হোয়াটসঅ্যাপে পরামর্শ')}</span>
            </a>

            <Link
              href="/calculator"
              className="px-5 py-4 bg-white hover:bg-slate-50 text-navy-primary border border-slate-300/80 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-2xs hover:border-slate-400 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t('Cost Calculator', 'চিকিৎসা বাজেট ক্যালকুলেটর')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Trust Footer Bar / Social Proof Strip */}
        <ScrollReveal animation="fade-up" delay={400} duration={650}>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 border-t border-slate-200/80 max-w-3xl mx-auto">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Stethoscope className="w-4 h-4 text-navy-primary" />
              <span>{t(doctor.name_en, doctor.name_bn)}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="font-semibold text-slate-600">{doctor.qualifications_en}</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1 font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>পরামর্শ ফি: ৳২০০ (নির্দিষ্ট)</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>৫.০ স্টার রেটিং (১২০+ সন্তুষ্ট হাসি)</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
