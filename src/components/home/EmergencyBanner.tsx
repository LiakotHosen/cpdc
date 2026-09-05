'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { Phone, Calendar, MessageSquare, AlertCircle, Clock, MapPin } from 'lucide-react';

export function EmergencyBanner() {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  return (
    <section className="py-14 bg-navy-dark text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-r from-navy-primary via-navy-light to-navy-dark border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider border border-red-500/30">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{t('Severe Toothache or Accident Trauma?', 'তীব্র দাঁতের যন্ত্রণা বা জরুরি দুর্ঘটনা?')}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t(
                'Get Prompt Emergency Care & Same-Day Relief',
                'জরুরি ডেন্টাল চিকিৎসা ও দ্রুত ব্যথা নিরাময়'
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {t(
                'Do not suffer through unbearable tooth pain or dental trauma. Contact our clinic hotline immediately or book online for immediate scheduling.',
                'অসহ্য দাঁতের ব্যথা সহ্য করবেন না। দ্রুত আমাদের চেম্বারে যোগাযোগ করুন অথবা অনলাইনে তাৎক্ষণিক সিরিয়ালের জন্য বুক করুন।'
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-ash-light">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('4:00 PM – 9:00 PM Daily', 'প্রতিদিন বিকাল ৪:০০ – রাত ৯:০০')}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('Pollibidyut, Ashulia, Savar', 'পল্লীবিদ্যুৎ, আশুলিয়া, সাভার')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+8801324558811"
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{t('Call: 01324-558811', 'সরাসরি কল: ০১৩২৪-৫৫৮৮১১')}</span>
            </a>

            <button
              onClick={() => openBooking()}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-navy-primary font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-navy-primary" />
              <span>{t('Online Booking', 'অনলাইন সিরিয়াল')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
