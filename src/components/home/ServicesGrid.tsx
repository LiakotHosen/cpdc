'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { ServiceCategory, Service } from '@/lib/types';
import {
  Stethoscope,
  Sparkles,
  Shield,
  Activity,
  Scissors,
  Layers,
  Baby,
  SmilePlus,
  Anchor,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  HeartPulse,
  LucideIcon
} from 'lucide-react';

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope,
  Sparkles,
  Shield,
  Activity,
  Scissors,
  Layers,
  Baby,
  SmilePlus,
  Anchor,
  ShieldCheck
};

interface CategoryAccent {
  bgLight: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  borderHover: string;
  glow: string;
}

const CATEGORY_ACCENTS: Record<string, CategoryAccent> = {
  'general-diagnostic': {
    bgLight: 'from-sky-50/50 to-white',
    iconBg: 'bg-sky-100/80 text-sky-700',
    iconColor: 'text-sky-700',
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-800',
    badgeText: 'text-sky-800',
    borderHover: 'hover:border-sky-400/50',
    glow: 'group-hover:shadow-sky-100',
  },
  'cosmetic-dentistry': {
    bgLight: 'from-fuchsia-50/50 to-white',
    iconBg: 'bg-fuchsia-100/80 text-fuchsia-700',
    iconColor: 'text-fuchsia-700',
    badgeBg: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800',
    badgeText: 'text-fuchsia-800',
    borderHover: 'hover:border-fuchsia-400/50',
    glow: 'group-hover:shadow-fuchsia-100',
  },
  'restorative': {
    bgLight: 'from-indigo-50/50 to-white',
    iconBg: 'bg-indigo-100/80 text-indigo-700',
    iconColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    badgeText: 'text-indigo-800',
    borderHover: 'hover:border-indigo-400/50',
    glow: 'group-hover:shadow-indigo-100',
  },
  'root-canal': {
    bgLight: 'from-amber-50/50 to-white',
    iconBg: 'bg-amber-100/80 text-amber-700',
    iconColor: 'text-amber-700',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
    badgeText: 'text-amber-800',
    borderHover: 'hover:border-amber-400/50',
    glow: 'group-hover:shadow-amber-100',
  },
  'oral-surgery': {
    bgLight: 'from-teal-50/50 to-white',
    iconBg: 'bg-teal-100/80 text-teal-700',
    iconColor: 'text-teal-700',
    badgeBg: 'bg-teal-50 border-teal-200 text-teal-800',
    badgeText: 'text-teal-800',
    borderHover: 'hover:border-teal-400/50',
    glow: 'group-hover:shadow-teal-100',
  },
  'dentures': {
    bgLight: 'from-blue-50/50 to-white',
    iconBg: 'bg-blue-100/80 text-blue-700',
    iconColor: 'text-blue-700',
    badgeBg: 'bg-blue-50 border-blue-200 text-blue-800',
    badgeText: 'text-blue-800',
    borderHover: 'hover:border-blue-400/50',
    glow: 'group-hover:shadow-blue-100',
  },
  'pediatric': {
    bgLight: 'from-rose-50/50 to-white',
    iconBg: 'bg-rose-100/80 text-rose-700',
    iconColor: 'text-rose-700',
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-800',
    badgeText: 'text-rose-800',
    borderHover: 'hover:border-rose-400/50',
    glow: 'group-hover:shadow-rose-100',
  },
  'orthodontics': {
    bgLight: 'from-purple-50/50 to-white',
    iconBg: 'bg-purple-100/80 text-purple-700',
    iconColor: 'text-purple-700',
    badgeBg: 'bg-purple-50 border-purple-200 text-purple-800',
    badgeText: 'text-purple-800',
    borderHover: 'hover:border-purple-400/50',
    glow: 'group-hover:shadow-purple-100',
  },
  'implants': {
    bgLight: 'from-emerald-50/50 to-white',
    iconBg: 'bg-emerald-100/80 text-emerald-700',
    iconColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    badgeText: 'text-emerald-800',
    borderHover: 'hover:border-emerald-400/50',
    glow: 'group-hover:shadow-emerald-100',
  },
  'preventive': {
    bgLight: 'from-cyan-50/50 to-white',
    iconBg: 'bg-cyan-100/80 text-cyan-700',
    iconColor: 'text-cyan-700',
    badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    badgeText: 'text-cyan-800',
    borderHover: 'hover:border-cyan-400/50',
    glow: 'group-hover:shadow-cyan-100',
  },
};

const DEFAULT_ACCENT: CategoryAccent = {
  bgLight: 'from-slate-50 to-white',
  iconBg: 'bg-navy-tint text-navy-primary',
  iconColor: 'text-navy-primary',
  badgeBg: 'bg-slate-100 border-slate-200 text-slate-700',
  badgeText: 'text-slate-700',
  borderHover: 'hover:border-navy-primary/40',
  glow: 'group-hover:shadow-slate-200',
};

interface ServicesGridProps {
  categories: ServiceCategory[];
  services: Service[];
}

export function ServicesGrid({ categories, services }: ServicesGridProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, categories.length - cardsPerView);

  // Keep index within bounds if window resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused || isHovered || maxIndex === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused, isHovered, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleCategorySelect = (index: number) => {
    const targetIndex = Math.min(index, maxIndex);
    setCurrentIndex(targetIndex);
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50/70 border-b border-slate-200 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-tint text-navy-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-navy-primary" />
                <span>{t('Specialized Dental Disciplines', 'হাসিমুখে বাঁচুন • বিশেষায়িত ডেন্টাল চিকিৎসা')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-primary tracking-tight">
                {t(
                  'Advanced Oral Treatments & Specialized Care in Savar',
                  'সাভারে সর্বাধুনিক ডেন্টাল চিকিৎসা ও বিশেষায়িত সেবা'
                )}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {t(
                  'Explore our 10 specialized categories and 31+ dental procedures. Direct surgeon-led care with 100% autoclave sterile instrumentation and gentle, pain-free technique.',
                  '১০টি বিশেষায়িত বিভাগ ও ৩১টিরও বেশি আধুনিক চিকিৎসা। বিএমডিসি নিবন্ধিত অভিজ্ঞ ডেন্টাল সার্জনের দক্ষ পরিচালনায় শতভাগ জীবাণুমুক্ত ও ব্যথামুক্ত চিকিৎসা সেবা।'
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="px-5 py-3 bg-white hover:bg-slate-50 text-navy-primary font-bold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
              >
                <span>{t('Explore All 31+ Treatments', 'সকল ৩১+ চিকিৎসা দেখুন')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Quick Pills Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat, idx) => {
            const Icon = CATEGORY_ICON_MAP[cat.icon_name] || Activity;
            const isSelected = idx >= currentIndex && idx < currentIndex + cardsPerView;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-navy-primary text-white border-navy-primary shadow-sm scale-102'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{t(cat.name_en, cat.name_bn)}</span>
              </button>
            );
          })}
        </div>

        {/* Slider Controls Header (Pagination & Arrows) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              {t('Category Slide', 'বিভাগ প্রদর্শন')}:
            </span>
            <span className="text-xs font-extrabold text-navy-primary bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {String(currentIndex + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-navy-primary hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
              title={isPaused ? t('Resume autoplay', 'অটোপ্লে চালু করুন') : t('Pause autoplay', 'অটোপ্লে থামান')}
            >
              {isPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-navy-primary hover:bg-slate-50 shadow-2xs transition-all cursor-pointer active:scale-95"
              aria-label="Previous Category"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-navy-primary hover:bg-slate-50 shadow-2xs transition-all cursor-pointer active:scale-95"
              aria-label="Next Category"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sliding Carousel Track Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="overflow-hidden relative py-2"
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {categories.map((cat) => {
              const Icon = CATEGORY_ICON_MAP[cat.icon_name] || Activity;
              const categoryServices = services.filter((s) => s.category_id === cat.id);
              const accent = CATEGORY_ACCENTS[cat.slug] || DEFAULT_ACCENT;

              return (
                <div
                  key={cat.id}
                  style={{ width: `${100 / cardsPerView}%` }}
                  className="shrink-0 px-3 transition-all"
                >
                  <div
                    className={`h-full bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-2xl ${accent.borderHover} transition-all duration-300 flex flex-col justify-between group relative overflow-hidden hover:-translate-y-1.5`}
                  >
                    {/* Top Ambient Glow Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-navy-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      {/* Card Top: Icon & Procedure Count Badge (NO PRICING) */}
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={`w-14 h-14 rounded-2xl ${accent.iconBg} flex items-center justify-center transition-all shadow-xs group-hover:scale-110 group-hover:rotate-1`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${accent.badgeBg}`}
                          >
                            {categoryServices.length} {t('Procedures', 'টি সেবা')}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            {t('100% Sterile', '১০০% জীবাণুমুক্ত')}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-extrabold text-navy-primary mb-2 group-hover:text-navy-light transition-colors leading-snug">
                        {t(cat.name_en, cat.name_bn)}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2 font-normal">
                        {t(cat.description_en, cat.description_bn)}
                      </p>

                      {/* Sub-services preview pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {categoryServices.slice(0, 3).map((sub) => (
                          <span
                            key={sub.id}
                            className="text-[11px] bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg font-medium border border-slate-200/80 group-hover:bg-slate-100 transition-colors"
                          >
                            {t(sub.name_en, sub.name_bn)}
                          </span>
                        ))}
                        {categoryServices.length > 3 && (
                          <span className="text-[11px] text-navy-primary font-bold px-1 self-center">
                            +{categoryServices.length - 3} {t('more', 'আরও')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: See More Button & Direct Serial Button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        href={`/services/${cat.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy-primary hover:text-navy-light transition-colors group/link"
                      >
                        <span>{t('Learn More', 'বিস্তারিত দেখুন')}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>

                      <button
                        onClick={() => openBooking(categoryServices[0]?.id, t(cat.name_en, cat.name_bn))}
                        className="py-2 px-3.5 bg-navy-tint hover:bg-navy-primary text-navy-primary hover:text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer group/btn"
                        title={t('Book appointment for this discipline', 'এই বিভাগের সিরিয়াল নিশ্চিত করুন')}
                      >
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 group-hover/btn:text-emerald-300 transition-colors" />
                        <span>{t('Book Serial', 'সিরিয়াল নিন')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Slide Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-navy-primary shadow-xs'
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
