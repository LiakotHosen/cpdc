'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { ServiceCategory, Service } from '@/lib/types';
import { TREATMENT_DETAILS_MAP, TreatmentDetail } from '@/lib/data/treatment-details';
import {
  Search,
  Calendar,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  HeartPulse,
  UserCheck,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ServicesClientProps {
  categories: ServiceCategory[];
  services: Service[];
}

export function ServicesClient({ categories, services }: ServicesClientProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active tab per card: 'causes' | 'procedure' | 'symptoms'
  const [activeTabs, setActiveTabs] = useState<Record<string, 'causes' | 'procedure' | 'symptoms'>>({});
  // Expanded all state per card
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const handleTabChange = (serviceId: string, tab: 'causes' | 'procedure' | 'symptoms') => {
    setActiveTabs((prev) => ({ ...prev, [serviceId]: tab }));
  };

  const toggleExpandAll = (serviceId: string) => {
    setExpandedCards((prev) => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCatId === 'all' || service.category_id === selectedCatId;

      const q = searchQuery.toLowerCase().trim();
      const details = TREATMENT_DETAILS_MAP[service.id];
      const matchesSearch =
        !q ||
        service.name_en.toLowerCase().includes(q) ||
        service.name_bn.toLowerCase().includes(q) ||
        service.short_desc_en.toLowerCase().includes(q) ||
        service.short_desc_bn.toLowerCase().includes(q) ||
        (details && (
          details.diseaseOverview_bn.toLowerCase().includes(q) ||
          details.procedure_bn.toLowerCase().includes(q) ||
          details.symptoms_bn.some((s) => s.toLowerCase().includes(q))
        ));

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCatId, searchQuery]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCatId);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner - Full-Bleed Dental Services Cover */}
      <section className="relative text-white py-16 lg:py-22 overflow-hidden border-b border-navy-light/20 bg-navy-dark">
        {/* Full-Bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero-bg.jpg"
            alt="Care Point Dental Clinic Modern Operatory & Treatments"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000"
            sizes="100vw"
          />
          {/* Multi-Layer Cinematic Brand Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070E26]/95 via-[#0D1A45]/85 to-[#070E26]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070E26] via-transparent to-transparent opacity-90" />
        </div>

        {/* Ambient Subtle Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute -bottom-10 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none z-1" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-ash-light border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('Specialized Clinical Guidance', 'বিশেষায়িত চিকিৎসা ও ক্লিনিক্যাল গাইড')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {t('Dental Treatments & Clinical Care Guide', 'সকল ডেন্টাল চিকিৎসা ও পরামর্শ নির্দেশিকা')}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal drop-shadow-xs">
                {t(
                  'Explore each specialized dental procedure in clinical detail: understand the root cause of the condition, Dr. Aktar Zahan Ony’s precise sterile procedure, warning symptoms, and book your appointment directly.',
                  'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিকের প্রতিটি চিকিৎসার বৈজ্ঞানিক কারণ, রোগ কেন ও কীভাবে হয়, ডা. আক্তার জাহান অনির আধুনিক ব্যথামুক্ত চিকিৎসা পদ্ধতি এবং জরুরি পরামর্শ জেনে সরাসরি সিরিয়াল নিশ্চিত করুন।'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white">
                <span className="inline-flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{t('100% Autoclave Sterile Arena', '১০০% অটোক্লেভ জীবাণুমুক্ত পরিবেশ')}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-xs">
                  <UserCheck className="w-4 h-4 text-sky-400" />
                  <span>{t('BMDC Reg. Surgeon Led Care', 'বিএমডিসি নিবন্ধিত ডেন্টাল সার্জন')}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-xs">
                  <HeartPulse className="w-4 h-4 text-rose-400" />
                  <span>{t('Gentle & Pain-Free Technique', 'সম্পূর্ণ ব্যথামুক্ত ও মমতাময়ী সেবা')}</span>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Search & Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:max-w-lg">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search treatments (e.g. Root Canal, Scaling, Cavity)...', 'চিকিৎসা বা রোগের নাম খুঁজুন (যেমন: রুট ক্যানেল, স্কেলিং, ক্যাভিটি)...')}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-primary/30 focus:border-navy-primary transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-2 py-1"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => openBooking('', t('Dental Consultation', 'ডেন্টাল কনসালটেশন / পরামর্শ'))}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-primary hover:bg-navy-light text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{t('Book Doctor Appointment', 'অনলাইন সিরিয়াল নিশ্চিত করুন')}</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCatId('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCatId === 'all'
                ? 'bg-navy-primary text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {t('All Treatments', 'সকল চিকিৎসা')} ({services.length})
          </button>

          {categories.map((cat) => {
            const count = services.filter((s) => s.category_id === cat.id).length;
            const isSelected = selectedCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-navy-primary text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{t(cat.name_en, cat.name_bn)}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Banner */}
        {activeCategoryObj && (
          <div className="mb-8 p-5 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>{t('Selected Department', 'নির্বাচিত ডেন্টাল বিভাগ')}</span>
              </div>
              <h2 className="text-lg font-bold text-navy-primary">
                {t(activeCategoryObj.name_en, activeCategoryObj.name_bn)}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t(activeCategoryObj.description_en, activeCategoryObj.description_bn)}
              </p>
            </div>
            <Link
              href={`/services/${activeCategoryObj.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-primary hover:text-navy-light shrink-0 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>{t('View Category Guide', 'বিভাগীয় বিস্তারিত গাইড')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Services Listing Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">
              {t('No treatments found', 'কোনো চিকিৎসা খুঁজে পাওয়া যায়নি')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {t('Try searching with a different keyword or choose another category.', 'অন্য কোনো নাম লিখে খুঁজুন অথবা ক্যাটাগরি পরিবর্তন করুন।')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCatId('all');
              }}
              className="mt-2 px-4 py-2 bg-navy-primary text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              {t('Reset Filters', 'ফিল্টার রিসেট করুন')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredServices.map((service, idx) => {
              const parentCat = categories.find((c) => c.id === service.category_id);
              const details = TREATMENT_DETAILS_MAP[service.id];
              const currentTab = activeTabs[service.id] || 'causes';
              const isExpandedAll = !!expandedCards[service.id];

              return (
                <ScrollReveal key={service.id} animation="fade-up" delay={(idx % 4) * 80}>
                  <article
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-navy-light/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full pro-card"
                  >
                  {/* Card Header & Badges */}
                  <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {parentCat && (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-navy-primary/10 text-navy-primary">
                            {t(parentCat.name_en, parentCat.name_bn)}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">
                          <Stethoscope className="w-3 h-3 text-emerald-600" />
                          <span>ডা. আক্তার জাহান অনি</span>
                        </span>
                      </div>

                      {/* Expand / Collapse All Toggle */}
                      <button
                        onClick={() => toggleExpandAll(service.id)}
                        className="text-[11px] font-bold text-navy-primary hover:text-navy-light inline-flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
                      >
                        {isExpandedAll ? (
                          <>
                            <span>{t('Tabbed View', 'ট্যাব ভিউ')}</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>{t('View All Details', 'সকল তথ্য একসাথে')}</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-navy-primary group-hover:text-navy-light transition-colors leading-snug">
                      {t(service.name_en, service.name_bn)}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {t(service.short_desc_en, service.short_desc_bn)}
                    </p>
                  </div>

                  {/* Card Body - Structured Clinical Sections */}
                  <div className="p-6 space-y-4 flex-1">
                    {/* Interactive Tab Switcher (when not expanded all) */}
                    {!isExpandedAll && (
                      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
                        <button
                          type="button"
                          onClick={() => handleTabChange(service.id, 'causes')}
                          className={`py-2 px-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                            currentTab === 'causes'
                              ? 'bg-white text-navy-primary shadow-xs font-extrabold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>🔍</span>
                          <span className="truncate">{t('Causes & Origin', 'রোগ ও কারণ')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleTabChange(service.id, 'procedure')}
                          className={`py-2 px-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                            currentTab === 'procedure'
                              ? 'bg-white text-navy-primary shadow-xs font-extrabold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>🩺</span>
                          <span className="truncate">{t('Procedure', 'চিকিৎসা পদ্ধতি')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleTabChange(service.id, 'symptoms')}
                          className={`py-2 px-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                            currentTab === 'symptoms'
                              ? 'bg-white text-navy-primary shadow-xs font-extrabold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>⚠️</span>
                          <span className="truncate">{t('Symptoms & Need', 'লক্ষণ ও গুরুত্ব')}</span>
                        </button>
                      </div>
                    )}

                    {/* SECTION 1: রোগটা কী, কেন ও কীভাবে হয় (What is it, Causes & Progression) */}
                    {(isExpandedAll || currentTab === 'causes') && (
                      <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-4 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-navy-primary">
                          <span className="w-5 h-5 rounded-full bg-blue-100 text-navy-primary flex items-center justify-center text-[10px] font-black">
                            ১
                          </span>
                          <span className="uppercase tracking-wide">
                            {t('What is the Condition & Why it Happens', 'রোগটি কী, কেন ও কীভাবে হয়?')}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {details ? t(details.diseaseOverview_en, details.diseaseOverview_bn) : t(service.full_desc_en || service.short_desc_en, service.full_desc_bn || service.short_desc_bn)}
                        </p>

                        {details && details.causes_bn && details.causes_bn.length > 0 && (
                          <div className="pt-2 border-t border-blue-100/80">
                            <span className="text-[11px] font-bold text-slate-600 block mb-1">
                              {t('Primary Causes & Etiology:', 'প্রধান কারণসমূহ:')}
                            </span>
                            <ul className="space-y-1">
                              {(lang === 'bn' ? details.causes_bn : details.causes_en).map((cause, idx) => (
                                <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                                  <span>{cause}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* SECTION 2: ডক্টরের আধুনিক চিকিৎসা পদ্ধতি (Doctor's Advanced Procedure) */}
                    {(isExpandedAll || currentTab === 'procedure') && (
                      <div className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-4 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">
                            ২
                          </span>
                          <span className="uppercase tracking-wide">
                            {t('Doctor Aktar Zahan Ony’s Treatment Procedure', 'ডা. আক্তার জাহান অনির আধুনিক চিকিৎসা পদ্ধতি')}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {details ? t(details.procedure_en, details.procedure_bn) : t('Conducted with 100% autoclave sterile tools and pain-free technique.', '১০০% অটোক্লেভ জীবাণুমুক্ত ইন্সট্রুমেন্ট ও আধুনিক ব্যথামুক্ত পদ্ধতিতে সরাসরি সার্জন দ্বারা পরিচালিত।')}
                        </p>

                        {details && details.procedureSteps_bn && details.procedureSteps_bn.length > 0 && (
                          <div className="pt-2 border-t border-emerald-100/80 space-y-1.5">
                            <span className="text-[11px] font-bold text-emerald-900 block">
                              {t('Clinical Methodology & Protocol:', 'চিকিৎসা ধাপসমূহ ও সুরক্ষা:')}
                            </span>
                            {(lang === 'bn' ? details.procedureSteps_bn : details.procedureSteps_en).map((step, idx) => (
                              <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* SECTION 3: প্রধান লক্ষণ ও দ্রুত চিকিৎসার গুরুত্ব (Symptoms & Why Treatment is Vital) */}
                    {(isExpandedAll || currentTab === 'symptoms') && (
                      <div className="rounded-xl bg-amber-50/50 border border-amber-200/70 p-4 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-black">
                            ৩
                          </span>
                          <span className="uppercase tracking-wide">
                            {t('Symptoms & Why Timely Treatment is Vital', 'প্রধান লক্ষণ ও দ্রুত চিকিৎসার গুরুত্ব')}
                          </span>
                        </div>

                        {details && details.symptoms_bn && details.symptoms_bn.length > 0 && (
                          <div>
                            <span className="text-[11px] font-bold text-amber-950 block mb-1">
                              {t('Warning Symptoms:', 'যেসব লক্ষণ দেখা দিলে সচেতন হবেন:')}
                            </span>
                            <ul className="space-y-1">
                              {(lang === 'bn' ? details.symptoms_bn : details.symptoms_en).map((sym, idx) => (
                                <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                                  <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                                  <span>{sym}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {details && details.urgencyReason_bn && (
                          <div className="p-2.5 bg-white/80 rounded-lg border border-amber-200 text-xs text-slate-700 leading-relaxed">
                            <strong className="text-amber-900 font-bold block mb-0.5">
                              {t('Why you must treat promptly:', 'চিকিৎসায় দেরি না করার কারণ:')}
                            </strong>
                            <span>{t(details.urgencyReason_en, details.urgencyReason_bn)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer - Prominent CTA Button ONLY (NO PRICING) */}
                  <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/70 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {t('100% Sterile Tools', '১০০% অটোক্লেভ জীবাণুমুক্ত')}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        {t('Daily: 4:00 PM – 9:00 PM', 'প্রতিদিন: ৪:০০ – ৯:০০ টা')}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        openBooking(
                          service.id,
                          t(service.name_en, service.name_bn)
                        )
                      }
                      className="w-full py-3 px-5 bg-navy-primary hover:bg-navy-light text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <Calendar className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>{t('Book Serial for this Treatment', 'বুক নাও – সিরিয়াল নিশ্চিত করুন')}</span>
                      <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
          </div>
        )}

        {/* Clinical Assurance Notice (NO PRICING NOTICE) */}
        <div className="mt-14 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200/80 rounded-2xl p-6 sm:p-8 text-xs sm:text-sm text-slate-700 space-y-3">
          <div className="flex items-center gap-2 font-bold text-navy-primary text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{t('Commitment to Biological Safety & Ethical Care', 'ক্লিনিক্যাল সুরক্ষা ও রোগীর প্রতি আমাদের অঙ্গীকার')}</span>
          </div>
          <p className="leading-relaxed text-slate-600">
            {t(
              'At Care Point Dental Clinic, every dental treatment is conducted with uncompromising hospital-grade infection control. All metal instruments undergo Class-B vacuum autoclave sterilization, and patient disposables are opened freshly in your presence. Dr. Aktar Zahan Ony prioritizes tooth preservation and pain-free micro-dentistry.',
              'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিকে প্রতিটি চিকিৎসা আন্তর্জাতিক মানদণ্ডে পরিচালিত হয়। রোগীর সম্পূর্ণ শারীরিক সুরক্ষায় প্রতিটি মেটাল ইন্সট্রুমেন্ট ক্লাস-বি ভ্যাকুয়াম অটোক্লেভে জীবাণুমুক্ত করা হয় এবং ওয়ান-টাইম ডিসপোজেবল সামগ্রী আপনার সামনে খোলা হয়। ব্যথামুক্ত চিকিৎসা ও প্রাকৃতিক দাঁত সংরক্ষণই আমাদের সর্বোচ্চ অগ্রাধিকার।'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
