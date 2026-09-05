'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { Service, ServiceCategory } from '@/lib/types';
import { Calculator, Check, Plus, Trash2, Calendar, HelpCircle, ArrowRight, ShieldAlert } from 'lucide-react';

interface CostCalculatorWidgetProps {
  services: Service[];
  categories: ServiceCategory[];
  fullPageMode?: boolean;
}

export function CostCalculatorWidget({ services, categories, fullPageMode = false }: CostCalculatorWidgetProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const [selectedIds, setSelectedIds] = useState<string[]>(['s1', 's3']); // Pre-select Consultation & Scaling
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return services;
    return services.filter((s) => s.category_id === activeCategory);
  }, [services, activeCategory]);

  const selectedServices = useMemo(() => {
    return services.filter((s) => selectedIds.includes(s.id));
  }, [services, selectedIds]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearAll = () => {
    setSelectedIds([]);
  };

  // Compute low and high totals
  const { totalMin, totalMax, hasConsultationOnly } = useMemo(() => {
    let min = 0;
    let max = 0;
    let consultationCount = 0;

    selectedServices.forEach((s) => {
      if (s.is_consultation_only || (s.price_min === null && s.price_max === null)) {
        consultationCount++;
      } else {
        min += s.price_min || 0;
        max += s.price_max || s.price_min || 0;
      }
    });

    return {
      totalMin: min,
      totalMax: max,
      hasConsultationOnly: consultationCount > 0
    };
  }, [selectedServices]);

  const priceRangeString = useMemo(() => {
    if (selectedServices.length === 0) return '৳0';
    if (totalMin === totalMax && totalMin > 0) return `৳${totalMin.toLocaleString()}`;
    if (totalMin > 0) return `৳${totalMin.toLocaleString()} – ৳${totalMax.toLocaleString()}`;
    return t('Requires In-Person Consultation', 'পরামর্শ সাপেক্ষে');
  }, [selectedServices, totalMin, totalMax, t]);

  const selectedNamesSummary = useMemo(() => {
    return selectedServices.map((s) => (lang === 'bn' ? s.name_bn : s.name_en)).join(', ');
  }, [selectedServices, lang]);

  return (
    <div className={`w-full ${fullPageMode ? 'py-8' : 'py-16 bg-white border-b border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {!fullPageMode && (
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200 shadow-2xs">
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('Transparent Dental Budget Calculator', 'স্বচ্ছ বাজেট • চিকিৎসা খরচের ক্যালকুলেটর')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-primary tracking-tight">
              {t('Calculate Your Dental Treatment Cost in BDT (৳)', 'চিকিৎসা শুরুর আগেই সহজে জেনে নিন আপনার সম্ভাব্য খরচ')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t(
                'Select the treatments you need to calculate an instant combined low-to-high price range. Transparent, fixed, and completely free of unexpected surprise fees.',
                'কোনো লুকানো চার্জ নেই। আপনার প্রয়োজনীয় চিকিৎসাগুলো বেছে নিয়ে সাথে সাথেই সাশ্রয়ী বাজেট পরিধি দেখে নিন এবং পছন্দের তারিখে সহজেই সিরিয়াল বুক করুন।'
              )}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main: Service Selection */}
          <div className="lg:col-span-8 space-y-5">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === 'all'
                    ? 'bg-navy-primary text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t('All Treatments', 'সকল চিকিৎসা')} ({services.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-navy-primary text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {t(cat.name_en, cat.name_bn)}
                </button>
              ))}
            </div>

            {/* Service Checkbox Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-1">
              {filteredServices.map((service) => {
                const isSelected = selectedIds.includes(service.id);
                const isConsultation = service.is_consultation_only || (!service.price_min && !service.price_max);

                return (
                  <div
                    key={service.id}
                    onClick={() => toggleSelect(service.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-navy-tint/50 border-navy-primary shadow-xs ring-1 ring-navy-primary/30'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-navy-primary text-white' : 'border border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {t(service.name_en, service.name_bn)}
                        </h4>
                      </div>

                      <p className="text-[11px] text-slate-500 pl-7 leading-relaxed line-clamp-2">
                        {t(service.short_desc_en, service.short_desc_bn)}
                      </p>

                      <div className="pl-7 pt-1">
                        {isConsultation ? (
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            {t('On Consultation', 'পরামর্শ সাপেক্ষে')}
                          </span>
                        ) : (
                          <span className="text-xs font-extrabold text-navy-primary">
                            ৳{service.price_min?.toLocaleString()}
                            {service.price_max && service.price_max !== service.price_min
                              ? ` – ৳${service.price_max.toLocaleString()}`
                              : ''}
                            <span className="text-[10px] font-normal text-slate-500 ml-1">
                              ({t(service.price_unit_en, service.price_unit_bn)})
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Real-time Range Tally Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold">{t('Estimated Cost', 'সম্ভাব্য মোট খরচ')}</h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t('Clear', 'রিসেট')}</span>
                  </button>
                )}
              </div>

              {/* Total Display */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center space-y-1">
                <span className="text-xs text-ash-light font-medium block">
                  {t('Estimated Total Range (BDT)', 'মোট সম্ভাব্য খরচের পরিধি')}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 block tracking-tight">
                  {priceRangeString}
                </span>
                {hasConsultationOnly && (
                  <span className="text-[11px] text-amber-300 flex items-center justify-center gap-1 mt-1">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>{t('+ Some items require in-person diagnosis', '+ কিছু সেবা পরামর্শ সাপেক্ষে')}</span>
                  </span>
                )}
              </div>

              {/* Selected Services Itemized List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {t(`Selected Treatments (${selectedServices.length})`, `নির্বাচিত চিকিৎসা (${selectedServices.length}টি)`)}:
                </span>

                {selectedServices.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2">
                    {t('Click treatments from the left list to calculate.', 'বাম পাশের তালিকা থেকে যেকোনো চিকিৎসা সিলেক্ট করুন।')}
                  </p>
                ) : (
                  selectedServices.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800 text-slate-300"
                    >
                      <span className="font-medium truncate max-w-[180px]">
                        {t(s.name_en, s.name_bn)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">
                          {s.price_min ? `৳${s.price_min.toLocaleString()}` : t('Consultation', 'পরামর্শ')}
                        </span>
                        <button
                          onClick={() => toggleSelect(s.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Important Medical Disclaimer */}
              <div className="p-3 bg-white/5 rounded-xl text-[11px] text-slate-400 leading-relaxed border border-white/5">
                <p>
                  ⚠️{' '}
                  {t(
                    'Exact treatment cost is finalized upon clinical examination and digital RVG X-ray by Dr. Aktar Zahan Ony.',
                    'চূড়ান্ত খরচ ডাক্তার কনসালটেশন ও ডিজিটাল এক্স-রের পর সুনির্দিষ্ট করা হবে।'
                  )}
                </p>
              </div>

              {/* Instant Book With Estimate Button */}
              <button
                disabled={selectedServices.length === 0}
                onClick={() =>
                  openBooking(
                    selectedServices[0]?.id,
                    selectedNamesSummary,
                    priceRangeString
                  )
                }
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('Book Serial with This Estimate', 'এই খরচে সিরিয়াল বুক করুন')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
