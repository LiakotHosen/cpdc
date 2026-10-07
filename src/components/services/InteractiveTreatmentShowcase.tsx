'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { ServiceCategory, Service } from '@/lib/types';
import { TREATMENT_DETAILS_MAP } from '@/lib/data/treatment-details';
import { getTreatmentImage } from '@/lib/data/treatment-images';
import { TreatmentImage } from './TreatmentImage';
import {
  Calendar,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Layers,
  HeartPulse,
  Clock,
  Phone,
  Search,
  ArrowDown,
  Info,
} from 'lucide-react';

interface InteractiveTreatmentShowcaseProps {
  categories: ServiceCategory[];
  services: Service[];
}

export function InteractiveTreatmentShowcase({
  categories,
  services,
}: InteractiveTreatmentShowcaseProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  // Active selected service ID (defaults to the first service)
  const [activeServiceId, setActiveServiceId] = useState<string>(
    services[0]?.id || 's1'
  );

  // Active category filter for the showcase reel
  const [reelCategoryFilter, setReelCategoryFilter] = useState<string>('all');
  const [reelSearchQuery, setReelSearchQuery] = useState<string>('');

  // Active clinical tab: 'causes' | 'procedure' | 'symptoms' | 'all'
  const [activeClinicalTab, setActiveClinicalTab] = useState<
    'causes' | 'procedure' | 'symptoms' | 'all'
  >('causes');

  // Ref for the right-hand scrollable reel list and items
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Filtered services for the reel
  const visibleServices = useMemo(() => {
    return services.filter((srv) => {
      const matchCat =
        reelCategoryFilter === 'all' || srv.category_id === reelCategoryFilter;
      const q = reelSearchQuery.toLowerCase().trim();
      if (!q) return matchCat;
      return (
        matchCat &&
        (srv.name_en.toLowerCase().includes(q) ||
          srv.name_bn.toLowerCase().includes(q) ||
          srv.short_desc_en.toLowerCase().includes(q) ||
          srv.short_desc_bn.toLowerCase().includes(q))
      );
    });
  }, [services, reelCategoryFilter, reelSearchQuery]);

  // Current active service object
  const activeService = useMemo(() => {
    return (
      services.find((s) => s.id === activeServiceId) ||
      services[0] ||
      null
    );
  }, [services, activeServiceId]);

  // Active service index
  const activeIndex = useMemo(() => {
    return services.findIndex((s) => s.id === activeServiceId);
  }, [services, activeServiceId]);

  // Parent category of active service
  const activeCategory = useMemo(() => {
    if (!activeService) return null;
    return categories.find((c) => c.id === activeService.category_id) || null;
  }, [categories, activeService]);

  // Clinical details for active service
  const activeDetails = useMemo(() => {
    if (!activeService) return null;
    return TREATMENT_DETAILS_MAP[activeService.id] || null;
  }, [activeService]);

  // Scroll active item into view smoothly when activeServiceId changes
  useEffect(() => {
    if (activeItemRef.current && reelContainerRef.current) {
      const container = reelContainerRef.current;
      const item = activeItemRef.current;
      const itemTop = item.offsetTop;
      const itemBottom = itemTop + item.offsetHeight;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      if (itemTop < containerTop || itemBottom > containerBottom) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeServiceId]);

  // Navigate to previous treatment
  const handlePrev = () => {
    if (services.length === 0) return;
    const newIdx = activeIndex <= 0 ? services.length - 1 : activeIndex - 1;
    setActiveServiceId(services[newIdx].id);
  };

  // Navigate to next treatment
  const handleNext = () => {
    if (services.length === 0) return;
    const newIdx = activeIndex >= services.length - 1 ? 0 : activeIndex + 1;
    setActiveServiceId(services[newIdx].id);
  };

  // Scroll smoothly to bottom grid
  const scrollToGrid = () => {
    const el = document.getElementById('treatments-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!activeService) return null;

  const activeTreatmentImage = getTreatmentImage(activeService);
  const activeTreatmentName = t(activeService.name_en, activeService.name_bn);
  const activeCategoryName = activeCategory
    ? t(activeCategory.name_en, activeCategory.name_bn)
    : '';

  return (
    <section
      id="interactive-treatment-showcase"
      className="relative w-full py-12 lg:py-18 bg-gradient-to-b from-slate-100 via-slate-50 to-white border-b border-slate-200 overflow-hidden"
    >
      {/* Background Subtle Ambient Highlights */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10 pb-6 border-b border-slate-200/80">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1A48]/10 text-[#0F1A48] border border-[#0F1A48]/15 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('Interactive Clinical Studio', 'ইন্টারেক্টিভ চিকিৎসা প্রদর্শনী')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1A48] tracking-tight leading-tight">
              {t(
                '33+ Specialized Treatments Interactive Explorer',
                '৩৩+ বিশেষায়িত ডেন্টাল চিকিৎসা এক্সপ্লোরার'
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t(
                'Select any procedure from the treatment stack on the right to view its clinical visual in the center and in-depth medical guide on the left.',
                'ডান পাশের তালিকা থেকে যেকোনো চিকিৎসা নির্বাচন করুন — মাঝখানে তার ভিজ্যুয়াল রূপ এবং বাম পাশে ডা. আক্তার জাহান অনির পরিচালনায় পূর্ণাঙ্গ ক্লিনিক্যাল তথ্য দেখুন।'
              )}
            </p>
          </div>

          {/* Quick Action Navigation & Grid Jump */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Treatment Counter */}
            <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0F1A48] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {t('Treatment', 'চিকিৎসা')} {activeIndex + 1} / {services.length}
              </span>
            </div>

            {/* Prev/Next arrows */}
            <div className="inline-flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl shadow-2xs">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous treatment"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0F1A48] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next treatment"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0F1A48] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Jump to Full Grid View Button */}
            <button
              type="button"
              onClick={scrollToGrid}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#0F1A48] transition-all shadow-2xs cursor-pointer group"
            >
              <span>{t('All Cards Grid', 'গ্রিড ভিউতে যান')}</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3-ZONE INTERACTIVE STUDIO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ========================================================
              LEFT COLUMN (COL-SPAN-5): CLINICAL DETAILS STAGE
              ======================================================== */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6 flex flex-col justify-between min-h-[580px] lg:h-[640px] overflow-y-auto scrollbar-thin">
            
            {/* Header / Badges & Title */}
            <div className="space-y-3 pb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {activeCategory && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#0F1A48]/10 text-[#0F1A48]">
                      <Layers className="w-3 h-3 text-emerald-600" />
                      <span>{activeCategoryName}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                    #{String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                  <Stethoscope className="w-3 h-3 text-emerald-600" />
                  <span>ডা. আক্তার জাহান অনি</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1A48] leading-tight">
                  {t(activeService.name_en, activeService.name_bn)}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-0.5">
                  {activeService.name_en}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {t(activeService.short_desc_en, activeService.short_desc_bn)}
                </p>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveClinicalTab('causes')}
                className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                  activeClinicalTab === 'causes'
                    ? 'bg-white text-[#0F1A48] shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🔍 {t('Causes', 'রোগ ও কারণ')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveClinicalTab('procedure')}
                className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                  activeClinicalTab === 'procedure'
                    ? 'bg-white text-[#0F1A48] shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🩺 {t('Procedure', 'পদ্ধতি')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveClinicalTab('symptoms')}
                className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                  activeClinicalTab === 'symptoms'
                    ? 'bg-white text-[#0F1A48] shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>⚠️ {t('Symptoms', 'লক্ষণ')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveClinicalTab('all')}
                className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                  activeClinicalTab === 'all'
                    ? 'bg-white text-[#0F1A48] shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>📖 {t('All', 'সব দেখুন')}</span>
              </button>
            </div>

            {/* Detailed Clinical Sections */}
            <div className="space-y-4 flex-1 overflow-y-auto pr-1 scrollbar-thin">
              
              {/* SECTION 1: রোগটা কী, কেন ও কীভাবে হয় (Causes) */}
              {(activeClinicalTab === 'causes' || activeClinicalTab === 'all') && (
                <div className="rounded-2xl bg-blue-50/60 border border-blue-100 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F1A48]">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0F1A48] flex items-center justify-center text-[10px] font-black">
                      ১
                    </span>
                    <span className="uppercase tracking-wide">
                      {t('What is the Condition & Why it Happens', 'রোগটি কী, কেন ও কীভাবে হয়?')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeDetails
                      ? t(activeDetails.diseaseOverview_en, activeDetails.diseaseOverview_bn)
                      : t(
                          activeService.full_desc_en || activeService.short_desc_en,
                          activeService.full_desc_bn || activeService.short_desc_bn
                        )}
                  </p>

                  {activeDetails && activeDetails.causes_bn && activeDetails.causes_bn.length > 0 && (
                    <div className="pt-2 border-t border-blue-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 block">
                        {t('Primary Causes:', 'প্রধান কারণসমূহ:')}
                      </span>
                      <ul className="space-y-1">
                        {(lang === 'bn' ? activeDetails.causes_bn : activeDetails.causes_en).map(
                          (cause, idx) => (
                            <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                              <span className="text-blue-500 font-bold mt-0.5">•</span>
                              <span>{cause}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 2: ডক্টরের আধুনিক চিকিৎসা পদ্ধতি (Procedure) */}
              {(activeClinicalTab === 'procedure' || activeClinicalTab === 'all') && (
                <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">
                      ২
                    </span>
                    <span className="uppercase tracking-wide">
                      {t(
                        'Dr. Aktar Zahan Ony’s Treatment Procedure',
                        'ডা. আক্তার জাহান অনির আধুনিক চিকিৎসা পদ্ধতি'
                      )}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeDetails
                      ? t(activeDetails.procedure_en, activeDetails.procedure_bn)
                      : t(
                          'Conducted with 100% autoclave sterile tools and pain-free technique.',
                          '১০০% অটোক্লেভ জীবাণুমুক্ত ইন্সট্রুমেন্ট ও আধুনিক ব্যথামুক্ত পদ্ধতিতে সরাসরি সার্জন দ্বারা পরিচালিত।'
                        )}
                  </p>

                  {activeDetails &&
                    activeDetails.procedureSteps_bn &&
                    activeDetails.procedureSteps_bn.length > 0 && (
                      <div className="pt-2 border-t border-emerald-100 space-y-1.5">
                        <span className="text-[11px] font-bold text-emerald-900 block">
                          {t('Clinical Protocol & Steps:', 'চিকিৎসা ধাপসমূহ ও সুরক্ষা:')}
                        </span>
                        {(lang === 'bn'
                          ? activeDetails.procedureSteps_bn
                          : activeDetails.procedureSteps_en
                        ).map((step, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}

              {/* SECTION 3: প্রধান লক্ষণ ও জরুরি চিকিৎসার গুরুত্ব (Symptoms) */}
              {(activeClinicalTab === 'symptoms' || activeClinicalTab === 'all') && (
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200/70 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-black">
                      ৩
                    </span>
                    <span className="uppercase tracking-wide">
                      {t('Symptoms & Why Treatment is Vital', 'প্রধান লক্ষণ ও জরুরি চিকিৎসার গুরুত্ব')}
                    </span>
                  </div>

                  {activeDetails && activeDetails.symptoms_bn && activeDetails.symptoms_bn.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-amber-950 block">
                        {t('Warning Symptoms:', 'যেসব লক্ষণ দেখা দিলে সচেতন হবেন:')}
                      </span>
                      <ul className="space-y-1">
                        {(lang === 'bn'
                          ? activeDetails.symptoms_bn
                          : activeDetails.symptoms_en
                        ).map((sym, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                            <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                            <span>{sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeDetails && activeDetails.urgencyReason_bn && (
                    <div className="p-2.5 bg-white/80 rounded-xl border border-amber-200 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-amber-900 font-bold block mb-0.5">
                        {t('Why prompt action is needed:', 'দেরি না করার কারণ:')}
                      </strong>
                      <span>{t(activeDetails.urgencyReason_en, activeDetails.urgencyReason_bn)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Booking Action Card */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t('100% Sterile Tools', '১০০% অটোক্লেভ জীবাণুমুক্ত')}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  {t('Daily: 4:00 PM – 9:00 PM', 'প্রতিদিন: ৪:০০ – ৯:০০ টা')}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => openBooking(activeService.id, activeTreatmentName)}
                  className="flex-1 py-3 px-4 bg-[#0F1A48] hover:bg-[#1E2D6A] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>{t('Book Serial for this Treatment', 'বুক নাও – সিরিয়াল নিশ্চিত করুন')}</span>
                  <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>

                <a
                  href="tel:+8801324558811"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('Direct Call', 'কল করুন')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================
              MIDDLE COLUMN (COL-SPAN-4): FEATURED SHOWCASE STAGE
              ======================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between h-[480px] sm:h-[540px] lg:h-[640px] relative group">
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
              <TreatmentImage
                src={activeTreatmentImage}
                alt={activeTreatmentName}
                variant="featured"
                categoryName={activeCategoryName}
                treatmentName={activeTreatmentName}
                priority
              />

              {/* Floating Top Header Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[11px] font-black text-[#0F1A48] shadow-sm">
                  #{String(activeIndex + 1).padStart(2, '0')} • {t('Specialized Treatment', 'বিশেষায়িত চিকিৎসা')}
                </span>

                {activeCategory && (
                  <span className="px-3 py-1.5 rounded-full bg-[#0F1A48]/85 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white shadow-sm">
                    {activeCategoryName}
                  </span>
                )}
              </div>

              {/* Quick Arrow Navigators on sides of Middle Image */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous treatment"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0F1A48] shadow-lg border border-slate-200 flex items-center justify-center opacity-80 hover:opacity-100 transition-all cursor-pointer hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next treatment"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0F1A48] shadow-lg border border-slate-200 flex items-center justify-center opacity-80 hover:opacity-100 transition-all cursor-pointer hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Floating Bottom Card Over Image */}
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-lg flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {t('Currently Viewing', 'বর্তমানে প্রদর্শিত')}
                    </span>
                    <h4 className="text-sm font-black text-[#0F1A48] truncate">
                      {activeTreatmentName}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBooking(activeService.id, activeTreatmentName)}
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t('Book', 'সিরিয়াল')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN (COL-SPAN-3): ALL 33 TREATMENTS STACK RAIL
              ======================================================== */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between h-[520px] lg:h-[640px]">
            
            {/* Rail Header with Counter and Mini Search */}
            <div className="space-y-3 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F1A48]">
                    {t('All Treatments Stack', 'চিকিৎসা তালিকা')}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {t('Click any item to view', 'ক্লিক করে যেকোনোটি দেখুন')}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#0F1A48]/10 text-[#0F1A48] text-xs font-black">
                  {services.length}
                </span>
              </div>

              {/* Quick Search inside Rail */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={reelSearchQuery}
                  onChange={(e) => setReelSearchQuery(e.target.value)}
                  placeholder={t('Filter 33 treatments...', 'খুঁজুন...')}
                  className="w-full pl-8 pr-7 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#0F1A48] focus:bg-white transition-all"
                />
                {reelSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setReelSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Quick Selector Dropdown/Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setReelCategoryFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold shrink-0 cursor-pointer transition-colors ${
                    reelCategoryFilter === 'all'
                      ? 'bg-[#0F1A48] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t('All', 'সব')} ({services.length})
                </button>
                {categories.map((cat) => {
                  const isSel = reelCategoryFilter === cat.id;
                  const catCount = services.filter((s) => s.category_id === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setReelCategoryFilter(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold shrink-0 cursor-pointer transition-colors ${
                        isSel
                          ? 'bg-[#0F1A48] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {t(cat.name_en, cat.name_bn)} ({catCount})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Stack Rail for all Treatments */}
            <div
              ref={reelContainerRef}
              className="flex-1 overflow-y-auto space-y-2 py-2 pr-1 scrollbar-thin"
            >
              {visibleServices.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-400">
                  {t('No treatment found.', 'কোনো চিকিৎসা মেলেনি।')}
                </div>
              ) : (
                visibleServices.map((service, idx) => {
                  const isSelected = service.id === activeServiceId;
                  const parentCat = categories.find((c) => c.id === service.category_id);
                  const img = getTreatmentImage(service);
                  const sName = t(service.name_en, service.name_bn);

                  return (
                    <button
                      key={service.id}
                      ref={isSelected ? activeItemRef : null}
                      type="button"
                      onClick={() => setActiveServiceId(service.id)}
                      className={`w-full text-left flex items-center gap-3 p-2 rounded-2xl transition-all duration-200 cursor-pointer group/item ${
                        isSelected
                          ? 'bg-[#0F1A48] text-white shadow-md ring-2 ring-[#0F1A48]/30 scale-[1.01]'
                          : 'bg-slate-50 hover:bg-slate-100/90 border border-slate-200/70 text-slate-800'
                      }`}
                    >
                      {/* Left Thumbnail (with real image or cream skeleton) */}
                      <TreatmentImage
                        src={img}
                        alt={sName}
                        variant="thumbnail"
                        treatmentName={sName}
                        categoryName={parentCat ? t(parentCat.name_en, parentCat.name_bn) : undefined}
                      />

                      {/* Right Details */}
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                              isSelected
                                ? 'bg-white/20 text-emerald-300'
                                : 'bg-slate-200/70 text-slate-600'
                            }`}
                          >
                            #{String(idx + 1).padStart(2, '0')}
                          </span>
                          {parentCat && (
                            <span
                              className={`text-[9px] font-semibold truncate max-w-[100px] ${
                                isSelected ? 'text-slate-300' : 'text-slate-400'
                              }`}
                            >
                              {t(parentCat.name_en, parentCat.name_bn)}
                            </span>
                          )}
                        </div>

                        <h5
                          className={`text-xs font-bold truncate leading-snug ${
                            isSelected ? 'text-white' : 'text-[#0F1A48] group-hover/item:text-[#1E2D6A]'
                          }`}
                        >
                          {sName}
                        </h5>

                        <p
                          className={`text-[10px] truncate ${
                            isSelected ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {service.name_en}
                        </p>
                      </div>

                      {/* Active indicator dot or chevron */}
                      <div className="shrink-0 pr-1">
                        {isSelected ? (
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-slate-500 transition-colors" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Rail Footer */}
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{visibleServices.length} {t('shown', 'টি প্রদর্শিত')}</span>
              <button
                type="button"
                onClick={scrollToGrid}
                className="text-[11px] font-bold text-[#0F1A48] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{t('View all in grid', 'গ্রিডে দেখুন')}</span>
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
