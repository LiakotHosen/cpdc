'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { ServiceCategory, Service } from '@/lib/types';
import { TREATMENT_DETAILS_MAP } from '@/lib/data/treatment-details';
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Phone,
} from 'lucide-react';

interface CategoryDetailClientProps {
  category: ServiceCategory;
  allCategories: ServiceCategory[];
  services: Service[];
}

export function CategoryDetailClient({
  category,
  allCategories,
  services,
}: CategoryDetailClientProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

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

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Category Hero */}
      <section className="bg-white text-[#0F1A48] py-14 lg:py-18 relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-4 max-w-3xl">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F1A48] hover:bg-[#EEF2FF] transition-colors bg-[#F8FAFC] px-3 py-1.5 rounded-lg w-fit border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('Back to All Treatments', 'সকল চিকিৎসার তালিকায় ফিরে যান')}</span>
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F1A48]">
              {t(category.name_en, category.name_bn)}
            </h1>

            <p className="text-base sm:text-lg text-[#0F1A48]/80 leading-relaxed font-normal">
              {t(category.description_en, category.description_bn)}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Treatments + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Services List (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h2 className="text-xl font-extrabold text-navy-primary">
                {t('Procedures & Clinical Guidelines', 'চিকিৎসাসমূহ ও ক্লিনিক্যাল নির্দেশিকা')}
              </h2>
              <span className="text-xs font-bold text-navy-primary bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                {services.length} {t('Procedures', 'টি চিকিৎসা')}
              </span>
            </div>

            {services.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                <p className="text-slate-600 font-medium">
                  {t('No specific procedures listed under this category yet.', 'এই বিভাগে বর্তমানে কোনো সেবা তালিকাভুক্ত নেই।')}
                </p>
                <Link href="/services" className="text-navy-primary font-bold text-sm">
                  {t('Explore other treatments', 'অন্যান্য চিকিৎসা দেখুন')}
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {services.map((service) => {
                  const details = TREATMENT_DETAILS_MAP[service.id];
                  const currentTab = activeTabs[service.id] || 'causes';
                  const isExpandedAll = !!expandedCards[service.id];

                  return (
                    <article
                      key={service.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all overflow-hidden group"
                    >
                      {/* Treatment Header */}
                      <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">
                            <Stethoscope className="w-3 h-3 text-emerald-600" />
                            <span>ডা. আক্তার জাহান অনি</span>
                          </span>

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

                        <h3 className="text-xl font-bold text-navy-primary group-hover:text-navy-light transition-colors leading-snug">
                          {t(service.name_en, service.name_bn)}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {t(service.short_desc_en, service.short_desc_bn)}
                        </p>
                      </div>

                      {/* Clinical Content Tabs / Sections */}
                      <div className="p-6 space-y-4">
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

                        {/* Section 1: রোগ ও কারণ */}
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

                        {/* Section 2: চিকিৎসা পদ্ধতি */}
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

                        {/* Section 3: লক্ষণ ও গুরুত্ব */}
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
                      <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>{t('100% Autoclave Sterile Tools', '১০০% অটোক্লেভ জীবাণুমুক্ত')}</span>
                        </div>

                        <button
                          onClick={() =>
                            openBooking(
                              service.id,
                              t(service.name_en, service.name_bn)
                            )
                          }
                          className="px-6 py-3 bg-navy-primary hover:bg-navy-light text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
                        >
                          <Calendar className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                          <span>{t('Book Serial for this Treatment', 'এই চিকিৎসার সিরিয়াল নিন')}</span>
                          <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Doctor Booking Card */}
            <div className="bg-white text-[#0F1A48] border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0F1A48] border border-[#0F1A48]/15 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('Direct Consultation', 'সরাসরি ডাক্তারের পরামর্শ')}</span>
              </div>
              <h4 className="text-lg font-bold text-[#0F1A48]">
                {t('Consult Dr. Aktar Zahan Ony', 'ডা. আক্তার জাহান অনির পরামর্শ নিন')}
              </h4>
              <p className="text-xs text-[#0F1A48]/80 leading-relaxed">
                {t(
                  'Book your appointment online for precision RVG diagnostics, sterilization assurance, and personalized gentle care.',
                  'আধুনিক ডিজিটাল আরভিজি এক্স-রে ডায়াগনোসিস ও শতভাগ জীবাণুমুক্ত পরিবেশে চিকিৎসার জন্য ঘরে বসেই সিরিয়াল নিশ্চিত করুন।'
                )}
              </p>
              <button
                onClick={() => openBooking('', t(category.name_en, category.name_bn))}
                className="block w-full text-center py-3 bg-[#0F1A48] hover:bg-[#EEF2FF] text-white hover:text-[#0F1A48] border border-[#0F1A48] rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('Book Appointment Now', 'অনলাইন সিরিয়াল নিশ্চিত করুন')}</span>
              </button>
            </div>

            {/* Other Categories Widget */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-navy-primary uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-navy-primary" />
                <span>{t('All Dental Departments', 'অন্যান্য ডেন্টাল বিভাগসমূহ')}</span>
              </h3>

              <div className="space-y-1">
                {allCategories.map((cat) => {
                  const isActive = cat.id === category.id;
                  return (
                    <Link
                      key={cat.id}
                      href={`/services/${cat.slug}`}
                      className={`block px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-navy-primary text-white font-bold shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-navy-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{t(cat.name_en, cat.name_bn)}</span>
                        <ArrowRight className="w-3 h-3 opacity-60" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
