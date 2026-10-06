'use client';

import React from 'react';
import { DoctorCard } from '@/components/ui/DoctorCard';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { Doctor, SiteSettings, Feature } from '@/lib/types';
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
} from 'lucide-react';

interface AboutClientProps {
  doctor: Doctor;
  settings: SiteSettings;
  features: Feature[];
}

export function AboutClient({ doctor, settings, features }: AboutClientProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Header */}
      <section className="bg-white text-[#0F1A48] py-16 lg:py-20 relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] border border-[#0F1A48]/15 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('About Our Clinic', 'আমাদের ক্লিনিক পরিচিতি')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F1A48]">
              {t(
                'Care Point Dental Clinic — Dedicated to Your Healthy Smile',
                'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক — আপনার সুন্দর ও সুস্থ হাসির বিশ্বস্ত ঠিকানা'
              )}
            </h1>
            <p className="text-base sm:text-lg text-[#0F1A48]/80 leading-relaxed font-normal">
              {t(
                'Located at Pollibidyut, Ashulia, Savar. We blend modern dental science, state-of-the-art autoclave sterilization, and patient-first compassionate care led by Dr. Aktar Zahan Ony.',
                'পল্লীবিদ্যুৎ, আশুলিয়া, সাভারে অবস্থিত আধুনিক ও পরিচ্ছন্ন ডেন্টাল ক্লিনিক। ডা. আক্তার জাহান অনির আন্তরিক পরিচালনায় আমরা দিচ্ছি আধুনিক চিকিৎসা ও শতভাগ জীবাণুমুক্ত পরিবেশ।'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Doctor Detailed Profile */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col items-center">
              <DoctorCard doctor={doctor} settings={settings} />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-navy-primary text-xs font-bold uppercase tracking-wider border border-blue-200">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>{t('Lead Dental Surgeon', 'প্রধান ডেন্টাল সার্জন')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-primary tracking-tight">
                  {t(doctor.name_en, doctor.name_bn)}
                </h2>
                <p className="text-lg font-semibold text-slate-700">
                  {t(doctor.title_en, doctor.title_bn)}
                </p>
                <p className="text-sm font-medium text-slate-500">
                  {doctor.degrees || t(doctor.qualifications_en, doctor.qualifications_bn)}
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {t(doctor.bio_en, doctor.bio_bn)}
              </p>

              {/* Consultation Details Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-navy-primary uppercase tracking-wider">
                  {t('Clinic Hours & Chamber Consultation', 'চেম্বার সময়সূচি ও পরামর্শ')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-navy-primary shrink-0" />
                    <span>{t(doctor.consulting_hours_en, doctor.consulting_hours_bn)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-navy-primary shrink-0" />
                    <span>{t(settings.address_en, settings.address_bn)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openBooking()}
                  className="px-6 py-3 bg-navy-primary hover:bg-navy-light text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('Book an Appointment', 'অ্যাপয়েন্টমেন্ট বুক করুন')}</span>
                </button>
                <a
                  href={`tel:${settings.phone}`}
                  className="px-6 py-3 bg-white hover:bg-slate-100 text-navy-primary font-bold rounded-xl text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t('Direct Call', 'সরাসরি কল')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sterilization & Patient Safety Standards */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('Safety & Infection Control', 'সুরক্ষা ও সংক্রমণ প্রতিরোধ')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-primary tracking-tight">
              {t('Our Zero-Compromise Sterilization Protocol', 'আমাদের শতভাগ জীবাণুমুক্তকরণ নীতি')}
            </h2>
            <p className="text-sm text-slate-600">
              {t(
                'We adhere to hospital-grade sterilization protocols to guarantee patient safety against cross-infection.',
                'আমরা প্রতিটি রোগীর জন্য আলাদা জীবাণুমুক্ত ইন্সট্রুমেন্ট ও হাসপাতাল গ্রেড অটোক্লেভ পদ্ধতি ব্যবহার করি।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-primary">
                {t('Autoclave Sterilization', 'অটোক্লেভ জীবাণুমুক্তকরণ')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t(
                  'High-pressure saturated steam destroys 100% of bacterial and viral spores on all metal tools before every single patient appointment.',
                  'প্রতিটি রোগীর চিকিৎসার পূর্বে উচ্চচাপ বাষ্পযুক্ত অটোক্লেভ মেশিনে সমস্ত ধাতব যন্ত্রপাতি সম্পূর্ণ জীবাণুমুক্ত করা হয়।'
                )}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-navy-primary flex items-center justify-center">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-primary">
                {t('Low-Radiation Digital RVG X-Ray', 'ডিজিটাল RVG এক্স-রে')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t(
                  'Instant on-screen digital imaging with up to 80% lower radiation than traditional film, offering fast and pinpoint root canal diagnosis for only ৳200.',
                  'সনাতন এক্স-রের চেয়ে ৮০% কম রেডিয়েশন এবং কম্পিউটারের পর্দায় তাৎক্ষণিক রেজাল্ট। মাত্র ২০০ টাকায় নিখুঁত রোগ নির্ণয়।'
                )}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-primary">
                {t('Continuous Power Backup (IPS/Generator)', 'নিরবচ্ছিন্ন বিদ্যুৎ ব্যবস্থা')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t(
                  'Dedicated instant power backup guarantees that surgical and root canal procedures are never interrupted by local grid power outages.',
                  'চিকিৎসা চলাকালীন যেন লোডশেডিংয়ের সমস্যা না হয়, সেজন্য সার্বক্ষণিক আইপিএস ও জেনারেটর ব্যাকআপ নিশ্চিত করা আছে।'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 17 Features Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-primary tracking-tight">
              {t('Why Care Point Dental Clinic is Your Best Choice', 'কেন কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক আপনার সেরা পছন্দ')}
            </h2>
            <p className="text-sm text-slate-600">
              {t(
                '17 reasons why patients in Ashulia, Savar, and surrounding areas trust us with their dental health.',
                '১৭টি বিশেষ সুবিধা যা আমাদের সেবাকে করে তুলেছে আশুলিয়া ও সাভারের রোগীদের কাছে নির্ভরযোগ্য।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-navy-light/40 hover:bg-white hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-navy-primary/10 text-navy-primary flex items-center justify-center shrink-0 font-bold text-xs">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-navy-primary">
                    {t(feature.title_en, feature.title_bn)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t(feature.description_en, feature.description_bn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Chamber & Emergency Action Banner */}
      <section className="py-14 bg-white text-[#0F1A48] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-bold uppercase tracking-wider border border-[#0F1A48]/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('Instant Chamber Access & Support', 'জরুরি যোগাযোগ ও চেম্বার সেবা')}</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black text-[#0F1A48] tracking-tight">
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
              className="px-6 py-3 bg-[#0F1A48] hover:bg-[#EEF2FF] text-white hover:text-[#0F1A48] font-bold rounded-xl text-xs sm:text-sm shadow-md border border-[#0F1A48] flex items-center gap-2 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>{t('Direct Hotline: +880 1324-558811', 'সরাসরি কল: ০১৩২৪-৫৫৮৮১১')}</span>
            </a>

            <a
              href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental,%20I%20want%20to%20consult%20Dr.%20Aktar%20Zahan%20Ony"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#EEF2FF] hover:bg-[#0F1A48] text-[#0F1A48] hover:text-white font-bold rounded-xl text-xs sm:text-sm border border-[#0F1A48]/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>WhatsApp: 01324-558811</span>
            </a>

            <a
              href={settings.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white hover:bg-[#EEF2FF] text-[#0F1A48] font-bold rounded-xl text-xs sm:text-sm border border-slate-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#0F1A48]" />
              <span>{t('Google Maps Location', 'গুগল ম্যাপে লোকেশন')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
