'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { SiteSettings, Doctor } from '@/lib/types';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  Phone,
  Clock,
  Compass,
  Building2,
  ExternalLink,
  Calendar,
  ShieldCheck,
  Car
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface LocationWayfindingSectionProps {
  settings: SiteSettings;
  doctor?: Doctor;
  showTitle?: boolean;
}

export function LocationWayfindingSection({
  settings,
  doctor,
  showTitle = true,
}: LocationWayfindingSectionProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();
  const [copied, setCopied] = useState(false);

  const fullAddress = lang === 'bn' ? settings.address_bn : settings.address_en;
  const mapsUrl = settings.google_maps_url || 'https://maps.app.goo.gl/tTvNAHkod8TfRVPz9?g_st=ac';
  const mapsEmbed =
    settings.google_maps_embed ||
    'https://maps.google.com/maps?q=CarePoint+Dental+Clinic,+Mofizuddin+Tower,+Pollibidyut,+Ashulia,+Savar&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full">
      {showTitle && (
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-navy-primary text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Compass className="w-4 h-4 text-navy-primary" />
              <span>{t('Chamber & Exact Location', 'চেম্বারের সুনির্দিষ্ট অবস্থান ও রুট')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-primary tracking-tight">
              {t(
                'Easy-to-Reach Location in Ashulia, Savar',
                'সহজে ক্লিনিকে পৌঁছানোর সঠিক লোকেশন ও ঠিকানা'
              )}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              {t(
                'Care Point Dental Clinic is conveniently located at Pollibidyut Bus Stand on Nabinagar-Chandra Highway.',
                'নবীনগর-চন্দ্রা মহাসড়কের পল্লীবিদ্যুৎ বাস স্ট্যান্ড সংলগ্ন মফিজ উদ্দিন টাওয়ারের ২য় তলায় কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক।'
              )}
            </p>
          </div>
        </ScrollReveal>
      )}

      {/* Main Grid: Card Details & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Col: Chamber Location Details (5 cols) */}
        <ScrollReveal animation="fade-right" duration={700} className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5 h-full flex flex-col justify-between pro-card">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-extrabold mb-1.5 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    {t('Verified Clinic Location', 'ভেরিফাইড ক্লিনিক লোকেশন')}
                  </span>
                  <h3 className="text-xl font-extrabold text-navy-primary">
                    {t('Care Point Dental Clinic', 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক')}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {t('Ashulia, Savar, Dhaka 1344', 'পল্লীবিদ্যুৎ, আশুলিয়া, সাভার, ঢাকা')}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-navy-primary flex items-center justify-center shrink-0 border border-blue-100">
                  <MapPin className="w-6 h-6 text-navy-primary" />
                </div>
              </div>

              {/* Address Box with One-Click Copy */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <span>{t('Full Address & Floor', 'পূর্ণাঙ্গ ঠিকানা ও তলা')}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-navy-primary hover:text-navy-light cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">{t('Copied!', 'কপি হয়েছে!')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t('Copy Address', 'কপি করুন')}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {fullAddress}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-navy-primary" />
                    {t('2nd Floor (হাংরি টাউন ভবন)', '২য় তলা (হাংরি টাউন ভবন)')}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-teal-600" />
                    {t('Bike & Car Parking', 'পার্কিং সুবিধা রয়েছে')}
                  </span>
                </div>
              </div>

              {/* Quick Consultation Hours */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-1">
                  <span className="text-slate-500 font-semibold block">{t('Consulting Hours', 'রোগী দেখার সময়')}</span>
                  <span className="text-slate-900 font-extrabold block text-xs sm:text-sm">
                    {t('4:00 PM – 9:00 PM', 'বিকাল ৪:০০ – রাত ৯:০০')}
                  </span>
                  <span className="text-[10px] text-amber-700 font-medium block">
                    {t('Daily (প্রতিদিন)', 'প্রতিদিন খোলা')}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200/70 space-y-1">
                  <span className="text-slate-500 font-semibold block">{t('Morning Slot', 'সকালের সিরিয়াল')}</span>
                  <span className="text-slate-900 font-extrabold block text-xs sm:text-sm">
                    {t('Call 30m Prior', '৩০ মি. আগে কল')}
                  </span>
                  <span className="text-[10px] text-teal-700 font-medium block">
                    {t('Special Appointment', 'অন-কল বিশেষ ব্যবস্থা')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-navy-primary hover:bg-navy-light text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-teal-300" />
                <span>{t('Open GPS Navigation', 'গুগল ম্যাপে নেভিগেশন চালু')}</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  lang === 'bn'
                    ? 'আসসালামু আলাইকুম, কেয়ার পয়েন্ট ডেন্টাল ক্লিনিকের সঠিক লোকেশন ও সিরিয়াল জানতে চাচ্ছি।'
                    : 'Hello, I want to know the exact location and serial booking for Care Point Dental Clinic.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Ask Location on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Col: High-Tech Interactive Google Map & Live View (7 cols) */}
        <ScrollReveal animation="fade-left" duration={700} className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs p-5 sm:p-7 flex-1 flex flex-col justify-between pro-card">
            {/* Map Header with Realtime Direction Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-base sm:text-lg font-bold text-navy-primary">
                    {t('Interactive GPS Google Map', 'ইন্টারেক্টিভ গুগল ম্যাপ ও অবস্থান')}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t(
                    'Zoom, pan, or open in Google Maps app for direct voice-guided GPS route.',
                    'ম্যাপটি জুম বা মুভ করে দেখুন, অথবা সরাসরি গুগল ম্যাপ অ্যাপে রুট চালু করুন।'
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-navy-primary rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-navy-primary" />
                  <span>{t('Directions', 'দিকনির্দেশনা')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="px-3.5 py-2 bg-navy-primary hover:bg-navy-light text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('Book Serial', 'সিরিয়াল নিন')}</span>
                </button>
              </div>
            </div>

            {/* Embedded Iframe Container with Subtle Glassmorphic Overlay Tag */}
            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Care Point Dental Clinic Exact Google Map Location"
                className="w-full h-full"
              />

              {/* Top-Left Floating Location Pin Badge */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span className="text-xs font-black text-navy-primary">
                  Care Point Dental Clinic
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  Ashulia
                </span>
              </div>

              {/* Bottom Floating Bar */}
              <div className="absolute bottom-3 right-3 z-10">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-navy-primary text-xs font-bold shadow-lg hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>{t('View Larger Map', 'বড় ম্যাপে দেখুন')}</span>
                </a>
              </div>
            </div>

            {/* Bottom Support Information Ribbon */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 mt-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">{t('Hotline', 'হটলাইন')}</span>
                  <a href={`tel:${settings.phone}`} className="font-bold text-slate-800 hover:text-navy-primary">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">{t('Daily Hours', 'সময়সূচী')}</span>
                  <span className="font-bold text-slate-800">৪:০০ – ৯:০০ টা</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">{t('Surgeon', 'ডেন্টাল সার্জন')}</span>
                  <span className="font-bold text-slate-800">ডা. আক্তার জাহান অনি</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
