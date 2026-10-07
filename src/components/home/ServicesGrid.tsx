'use client';

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { ServiceCategory, Service } from '@/lib/types';
import styles from './ServicesGrid.module.css';
import {
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Microscope,
  Crosshair,
  Smile,
  Heart,
  SmilePlus,
  Award,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Activity,
  LucideIcon
} from 'lucide-react';

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Microscope,
  Crosshair,
  Smile,
  Heart,
  SmilePlus,
  Award,
  // Graceful formal fallbacks for legacy/informal names
  Scissors: Crosshair,
  Anchor: Award,
  Baby: Heart,
  Layers: Smile,
  Activity: Microscope,
  Shield: ShieldCheck
};

/**
 * High-definition, formal, medical-grade dental insignias for all 10 clinical categories.
 */
function CategoryInsignia({
  slug,
  iconName,
  className = 'w-5 h-5 text-white',
}: {
  slug: string;
  iconName?: string;
  className?: string;
}) {
  switch (slug) {
    case 'general-diagnostic':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3" />
          <path d="M9 12.5v4a2.5 2.5 0 0 0 5 0v-2.5" />
          <circle cx="14" cy="14" r="2.5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="4.5" cy="3" r="1.5" fill="currentColor" />
          <circle cx="13.5" cy="3" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'cosmetic-dentistry':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8 2 5.5 4.5 5.5 8C5.5 11 7 13.5 8.5 16C9.2 17.2 9.5 19 9.8 21.5C10.6 20.8 11.4 20.8 12 20.8C12.6 20.8 13.4 20.8 14.2 21.5C14.5 19 14.8 17.2 15.5 16C17 13.5 18.5 11 18.5 8C18.5 4.5 16 2.5 12 2.5Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M8.5 11.5C9.5 14 14.5 14 15.5 11.5" stroke="#FEF08A" strokeWidth="2.2" />
          <path d="M18 4L18.6 5.5L20 6.1L18.6 6.7L18 8.2L17.4 6.7L16 6.1L17.4 5.5L18 4Z" fill="#FEF08A" stroke="none" />
        </svg>
      );
    case 'restorative':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8 2 6 4 6 7.5C6 9.5 7 11 8 13C9 15 9.5 17.5 9.5 22C10.5 21 11.5 21 12 21C12.5 21 13.5 21 14.5 22C14.5 17.5 15 15 16 13C17 11 18 9.5 18 7.5C18 4 16 2 12 2Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M8.5 8.5C10.5 10.5 13.5 10.5 15.5 8.5" stroke="#93C5FD" strokeWidth="2" />
          <circle cx="12" cy="14" r="2" fill="#93C5FD" stroke="none" />
        </svg>
      );
    case 'root-canal':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.5 2 6 4.2 6 7.8C6 9.8 7 11.2 8 13.2C8.8 14.8 9.2 17 9.4 21C10.2 20.2 11.2 20.2 12 20.2C12.8 20.2 13.8 20.2 14.6 21C14.8 17 15.2 14.8 16 13.2C17 11.2 18 9.8 18 7.8C18 4.2 15.5 2 12 2Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M12 6V15" stroke="#FDE047" strokeWidth="2.2" />
          <circle cx="12" cy="15.5" r="1.5" fill="#FDE047" stroke="none" />
          <path d="M9.5 9.5H14.5" stroke="#FDE047" strokeWidth="1.6" />
        </svg>
      );
    case 'oral-surgery':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 4v16M4 12h16" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4.5" stroke="#7DD3FC" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="1.5" fill="#7DD3FC" stroke="none" />
        </svg>
      );
    case 'dentures':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14C4 8.5 7.5 4 12 4C16.5 4 20 8.5 20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 14C7.5 17 9.5 18 12 18C14.5 18 16.5 17 18 14" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="8.5" cy="10" r="1.5" fill="white" stroke="none" />
          <circle cx="12" cy="8.5" r="1.5" fill="white" stroke="none" />
          <circle cx="15.5" cy="10" r="1.5" fill="white" stroke="none" />
        </svg>
      );
    case 'pediatric':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.2C11.6 21 4.5 16.2 4.5 9.8C4.5 6.5 7 4 10 4C11.5 4 12 4.8 12 4.8C12 4.8 12.5 4 14 4C17 4 19.5 6.5 19.5 9.8C19.5 16.2 12.4 21 12 21.2Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M9 11C10 13 14 13 15 11" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'orthodontics':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 13C6 9 18 9 21 13" stroke="#93C5FD" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="6" y="9.5" width="3" height="3" rx="0.8" fill="#FDE047" stroke="none" />
          <rect x="10.5" y="8" width="3" height="3" rx="0.8" fill="#FDE047" stroke="none" />
          <rect x="15" y="9.5" width="3" height="3" rx="0.8" fill="#FDE047" stroke="none" />
        </svg>
      );
    case 'implants':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3H15V6H9V3Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 6V9M14 6V9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 9H16L15 15H9L8 9Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 15L11 21H13L14 15" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <path d="M9.5 17H14.5M10.5 19H13.5" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'preventive':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.5L19 5.5V11C19 16.5 15.8 20.2 12 22C8.2 20.2 5 16.5 5 11V5.5L12 2.5Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 12L11 14L15 10" stroke="#86EFAC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default: {
      const FallbackIcon = CATEGORY_ICON_MAP[iconName || ''] || ShieldCheck;
      return <FallbackIcon className={className} strokeWidth={2} />;
    }
  }
}

const AUTOPLAY_MS = 5000;
const MEDIA_MS = 2800;

// Fallback image sets per category (max 3 per category)
const IMG = {
  diag3d: '/images/services/cat-diagnostic-3d.jpg',
  cosmetic3d: '/images/services/cat-cosmetic-3d.jpg',
  surgery3d: '/images/services/cat-surgery-3d.jpg',
  shield3d: '/images/dental_3d_shield.jpg',
  diagnostic: '/images/services/general-diagnostic.jpg',
  cosmetic: '/images/services/cosmetic-dentistry.jpg',
  operatory: '/images/clinic_operatory_bg.jpg',
  hero: '/images/services-hero-bg.jpg'
};

function getCategoryImages(slug: string): string[] {
  switch (slug) {
    case 'general-diagnostic':
      return [IMG.diag3d, IMG.diagnostic, IMG.operatory];
    case 'cosmetic-dentistry':
      return [IMG.cosmetic3d, IMG.cosmetic, IMG.hero];
    case 'restorative':
      return [IMG.shield3d, IMG.diag3d, IMG.operatory];
    case 'root-canal':
      return [IMG.diag3d, IMG.hero, IMG.operatory];
    case 'oral-surgery':
      return [IMG.surgery3d, IMG.operatory, IMG.hero];
    case 'dentures':
      return [IMG.cosmetic3d, IMG.shield3d, IMG.operatory];
    case 'pediatric':
      return [IMG.hero, IMG.cosmetic, IMG.diag3d];
    case 'orthodontics':
      return [IMG.cosmetic3d, IMG.cosmetic, IMG.hero];
    case 'implants':
      return [IMG.shield3d, IMG.surgery3d, IMG.operatory];
    case 'preventive':
    default:
      return [IMG.diagnostic, IMG.diag3d, IMG.operatory];
  }
}

interface Dims {
  c: number; // collapsed card width
  e: number; // expanded card width
  g: number; // gap
  h: number; // card height
  stacked: boolean; // media on top, info below (small screens)
}

function computeDims(w: number): Dims {
  if (w < 640) {
    const c = 75;
    const g = 10;
    const e = Math.min(Math.max(280, w - 36), 400);
    return { c, g, e, h: 560, stacked: true };
  }
  if (w < 1024) {
    const c = 160;
    const g = 14;
    const e = Math.min(680, w - 60);
    return { c, g, e, h: 520, stacked: true };
  }
  if (w < 1440) {
    const c = 240;
    const g = 16;
    const e = Math.min(840, w - 80);
    return { c, g, e, h: 510, stacked: false };
  }
  if (w < 1920) {
    const c = 270;
    const g = 18;
    const e = 900;
    return { c, g, e, h: 520, stacked: false };
  }
  // 1920px+ (ultra-wide viewports)
  const c = 290;
  const g = 20;
  const e = 960;
  return { c, g, e, h: 530, stacked: false };
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

interface ServicesGridProps {
  categories: ServiceCategory[];
  services: Service[];
}

export function ServicesGrid({ categories, services }: ServicesGridProps) {
  const { t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const total = categories.length;
  // Triple array for seamless infinite looping: [prevSet, currentSet, nextSet]
  const items = React.useMemo(() => {
    if (!categories || categories.length === 0) return [];
    return [...categories, ...categories, ...categories];
  }, [categories]);

  // Start in the middle set at index = total (category 0)
  const [virtualIndex, setVirtualIndex] = useState(() => total);
  const [enableTransition, setEnableTransition] = useState(true);
  const [containerWidth, setContainerWidth] = useState(1280);
  const [dims, setDims] = useState<Dims>(() => computeDims(1280));

  const [manualPaused, setManualPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touchHold, setTouchHold] = useState(false);
  const [inView, setInView] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const activeCategory = total > 0 ? ((virtualIndex % total) + total) % total : 0;
  const paused = manualPaused || hovering || focused || touchHold || !inView || reducedMotion;

  // Measure container width -> update card geometry and centering
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setContainerWidth(w);
      setDims(computeDims(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Only autoplay while section is visible in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Center offset calculation:
  // Distance from track start to the left of card `virtualIndex` is:
  // virtualIndex * (dims.c + dims.g)
  // To center card `virtualIndex` (width dims.e) in container of width containerWidth:
  // its left edge in container should be at: (containerWidth - dims.e) / 2
  const centerTarget = (containerWidth - dims.e) / 2;
  const cardStartOffset = virtualIndex * (dims.c + dims.g);
  const trackOffset = centerTarget - cardStartOffset;

  // Next / Prev slide handlers
  const goToNext = useCallback(() => {
    setEnableTransition(true);
    setVirtualIndex((curr) => curr + 1);
  }, []);

  const goToPrev = useCallback(() => {
    setEnableTransition(true);
    setVirtualIndex((curr) => curr - 1);
  }, []);

  const goToVirtual = useCallback((idx: number) => {
    setEnableTransition(true);
    setVirtualIndex(idx);
  }, []);

  // Navigate to category from top quick pills
  const handlePillClick = useCallback(
    (catIdx: number) => {
      if (total <= 0) return;
      const currentCat = ((virtualIndex % total) + total) % total;
      let diff = catIdx - currentCat;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      setEnableTransition(true);
      setVirtualIndex((curr) => curr + diff);
    },
    [total, virtualIndex]
  );

  // Seamless infinite loop boundary snap when transition finishes
  const handleTrackTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== trackRef.current || e.propertyName !== 'transform') return;
      if (total <= 0) return;

      // If out of the middle set [total, 2*total - 1], snap back to middle set
      if (virtualIndex >= 2 * total || virtualIndex < total) {
        setEnableTransition(false);
        const normalized = ((virtualIndex % total) + total) % total + total;
        setVirtualIndex(normalized);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setEnableTransition(true);
          });
        });
      }
    },
    [total, virtualIndex]
  );

  // Autoplay timer: advances by 1 card every AUTOPLAY_MS while not paused
  useEffect(() => {
    if (paused || total <= 0) return;
    const timer = setTimeout(() => {
      goToNext();
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [virtualIndex, paused, total, goToNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setTouchHold(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - (touchStartY.current || 0);
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setTimeout(() => setTouchHold(false), 2500);
  };

  const trackStyle = {
    '--c': `${dims.c}px`,
    '--e': `${dims.e}px`,
    '--g': `${dims.g}px`,
    '--h': `${dims.h}px`,
    '--pw': `${dims.stacked ? dims.e : Math.round(dims.e * 0.52)}px`,
    '--mw': `${dims.stacked ? dims.e : dims.e - Math.round(dims.e * 0.52)}px`,
    '--track-offset': `${trackOffset}px`
  } as React.CSSProperties;

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden">
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(59,91,219,0.12),transparent_65%)]"
      />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14 2xl:px-16 relative">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-bold uppercase tracking-wider border border-[#0F1A48]/15">
                <Sparkles className="w-3.5 h-3.5 text-[#0F1A48]" />
                <span>{t('Specialized Dental Disciplines', 'হাসিমুখে বাঁচুন • বিশেষায়িত ডেন্টাল চিকিৎসা')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1A48] tracking-tight">
                {t(
                  'Advanced Oral Treatments & Specialized Care in Savar',
                  'সাভারে সর্বাধুনিক ডেন্টাল চিকিৎসা ও বিশেষায়িত সেবা'
                )}
              </h2>

              <p className="text-sm sm:text-base text-[#0F1A48]/80 leading-relaxed font-normal">
                {t(
                  'Explore our 10 specialized categories and 31+ dental procedures. Direct surgeon-led care with 100% autoclave sterile instrumentation and gentle, pain-free technique.',
                  '১০টি বিশেষায়িত বিভাগ ও ৩১টিরও বেশি আধুনিক চিকিৎসা। বিএমডিসি নিবন্ধিত অভিজ্ঞ ডেন্টাল সার্জনের দক্ষ পরিচালনায় শতভাগ জীবাণুমুক্ত ও ব্যথামুক্ত চিকিৎসা সেবা।'
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="px-5 py-3 bg-white hover:bg-[#EEF2FF] text-[#0F1A48] font-bold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
              >
                <span>{t('Explore All 31+ Treatments', 'সকল ৩১+ চিকিৎসা দেখুন')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Category quick pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none" role="tablist">
          {categories.map((cat, idx) => {
            const Icon = CATEGORY_ICON_MAP[cat.icon_name] || Activity;
            const isSelected = idx === activeCategory;
            return (
              <button
                key={cat.id}
                id={`treatment-pill-${cat.slug}`}
                role="tab"
                aria-selected={isSelected}
                onClick={() => handlePillClick(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#0F1A48] text-white border-[#0F1A48] shadow-md'
                    : 'bg-white text-[#0F1A48] border-slate-200 hover:border-[#0F1A48]/30 hover:bg-[#EEF2FF]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-300' : 'text-[#0F1A48]'}`} />
                <span>{t(cat.name_en, cat.name_bn)}</span>
              </button>
            );
          })}
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2 text-[#0F1A48]">
            <span className="text-2xl font-black tabular-nums">{String(activeCategory + 1).padStart(2, '0')}</span>
            <span className="text-sm font-bold text-slate-400 tabular-nums">/ {String(total).padStart(2, '0')}</span>
            <span className="hidden sm:inline text-xs font-semibold text-slate-500 ml-2">
              {t('Click any card to expand in center', 'মাঝখানে দেখতে যেকোনো কার্ডে ক্লিক করুন')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="treatment-slider-toggle"
              onClick={() => setManualPaused((p) => !p)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0F1A48] hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
              aria-label={manualPaused ? t('Resume autoplay', 'অটোপ্লে চালু করুন') : t('Pause autoplay', 'অটোপ্লে থামান')}
            >
              {manualPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              id="treatment-slider-prev"
              onClick={goToPrev}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0F1A48] hover:bg-slate-50 shadow-2xs transition-all cursor-pointer active:scale-95"
              aria-label={t('Previous category', 'পূর্ববর্তী বিভাগ')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="treatment-slider-next"
              onClick={goToNext}
              className="p-2 rounded-xl bg-[#0F1A48] border border-[#0F1A48] text-white hover:bg-emerald-600 hover:border-emerald-600 shadow-2xs transition-all cursor-pointer active:scale-95"
              aria-label={t('Next category', 'পরবর্তী বিভাগ')}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expanding card carousel container */}
        <div
          ref={containerRef}
          className={styles.carouselViewport}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setHovering(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
          }}
          aria-roledescription="carousel"
          aria-label={t('Treatment categories', 'চিকিৎসা বিভাগসমূহ')}
        >
          <div
            ref={trackRef}
            className={styles.track}
            style={trackStyle}
            data-stacked={dims.stacked}
            data-no-transition={!enableTransition}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {items.map((cat, idx) => (
              <TreatmentCard
                key={`${cat.id}-${idx}`}
                cat={cat}
                index={idx % total}
                virtualIndex={idx}
                total={total}
                isActive={idx === virtualIndex}
                services={services.filter((s) => s.category_id === cat.id)}
                animateMedia={!reducedMotion}
                onActivate={() => goToVirtual(idx)}
                onBook={openBooking}
              />
            ))}
          </div>
        </div>

        {/* Autoplay progress bar indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2" aria-hidden>
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              tabIndex={-1}
              onClick={() => handlePillClick(idx)}
              className={`h-1.5 rounded-full overflow-hidden cursor-pointer transition-all duration-500 ${
                idx === activeCategory
                  ? 'w-12 bg-slate-200'
                  : idx < activeCategory
                  ? 'w-3 bg-[#0F1A48]/70'
                  : 'w-3 bg-slate-300 hover:bg-slate-400'
              }`}
            >
              {idx === activeCategory && !reducedMotion && (
                <span
                  key={virtualIndex}
                  className={styles.fill}
                  style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

interface TreatmentCardProps {
  cat: ServiceCategory;
  index: number;
  virtualIndex: number;
  total: number;
  isActive: boolean;
  services: Service[];
  animateMedia: boolean;
  onActivate: () => void;
  onBook: (serviceId?: string, label?: string) => void;
}

function TreatmentCard({
  cat,
  index,
  total,
  isActive,
  services,
  animateMedia,
  onActivate,
  onBook
}: TreatmentCardProps) {
  const { t } = useLanguage();

  // Determine images: cat.images array, cat.image_url string, or fallback presets.
  // Limitation: minimum 1, maximum 3 images per category.
  const rawImages =
    cat.images && cat.images.length > 0
      ? cat.images
      : cat.image_url
      ? [cat.image_url]
      : getCategoryImages(cat.slug);
  const images = rawImages.slice(0, 3);
  const isSingle = images.length <= 1;

  const [slide, setSlide] = useState(0);

  // If only 1 image, keep it static without cycling.
  // If 2 or 3 images, cycle through them while the card is expanded in the center.
  useEffect(() => {
    if (!isActive || !animateMedia || isSingle) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % images.length);
    }, MEDIA_MS);
    return () => clearInterval(id);
  }, [isActive, animateMedia, isSingle, images.length]);

  // Reset slide index when becoming active
  useEffect(() => {
    if (isActive) setSlide(0);
  }, [isActive]);

  const name = t(cat.name_en, cat.name_bn);
  const shown = services.slice(0, 4);
  const extra = services.length - shown.length;
  const num = String(index + 1).padStart(2, '0');

  return (
    <article
      id={`treatment-card-${cat.slug}-${index}`}
      className={styles.card}
      data-active={isActive}
      tabIndex={0}
      aria-label={name}
      onClick={() => {
        // Only activate on click when collapsed! (No hover activation)
        if (!isActive) onActivate();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!isActive) {
            e.preventDefault();
            onActivate();
          }
        }
      }}
    >
      {/* Left (or top): visual pane */}
      <div className={styles.media}>
        {images.map((src, i) => {
          const state = isSingle
            ? 'current'
            : i === slide
            ? 'current'
            : i === (slide - 1 + images.length) % images.length
            ? 'prev'
            : 'next';
          return (
            <div key={`${src}-${i}`} className={styles.slide} data-state={state} data-single={isSingle}>
              <Image
                src={src}
                alt={i === 0 ? name : ''}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 90vw, (max-width: 1000px) 60vw, 420px"
              />
            </div>
          );
        })}
        <div className={styles.shade} />

        {/* Collapsed label: icon, number, category name, and procedures count */}
        <div className={styles.label}>
          <div className="flex items-start justify-between gap-2">
            <span className="w-11 h-11 shrink-0 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
              <CategoryInsignia slug={cat.slug} iconName={cat.icon_name} className="w-5 h-5 text-white drop-shadow-xs" />
            </span>
            <span className={styles.meta}>{num}</span>
          </div>
          <div>
            <h3 className={styles.title}>{name}</h3>
            <p className={`${styles.meta} ${styles.count} mt-1.5`}>
              {services.length} {t('Procedures', 'টি সেবা')}
            </p>
          </div>
        </div>

        {/* Dots indicator: only rendered when there are multiple images (2 or 3) */}
        {!isSingle && (
          <div className={styles.dots} aria-hidden={!isActive}>
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                tabIndex={isActive ? 0 : -1}
                onClick={(e) => {
                  e.stopPropagation();
                  setSlide(i);
                }}
                className={styles.dot}
                data-on={i === slide}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right (or bottom): info pane (expanded center card only) */}
      <div className={styles.panel} aria-hidden={!isActive}>
        <div
          className={`${styles.reveal} flex items-center justify-between gap-2`}
          style={{ '--i': 0 } as React.CSSProperties}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F1A48]/55">
            {t('Category', 'বিভাগ')} {num} / {String(total).padStart(2, '0')}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            {t('Sterile', 'জীবাণুমুক্ত')}
          </span>
        </div>

        <div className="flex items-center gap-2.5 mt-2">
          <span className="w-8 h-8 rounded-xl bg-[#0F1A48] flex items-center justify-center shrink-0 shadow-xs">
            <CategoryInsignia slug={cat.slug} iconName={cat.icon_name} className="w-4 h-4 text-white" />
          </span>
          <h3
            className={`${styles.reveal} text-xl lg:text-2xl font-black text-[#0F1A48] leading-tight tracking-tight`}
            style={{ '--i': 1 } as React.CSSProperties}
          >
            {name}
          </h3>
        </div>

        <p
          className={`${styles.reveal} mt-2 text-xs sm:text-sm text-[#0F1A48]/70 leading-relaxed line-clamp-2 lg:line-clamp-3`}
          style={{ '--i': 2 } as React.CSSProperties}
        >
          {t(cat.description_en, cat.description_bn)}
        </p>

        <p
          className={`${styles.reveal} mt-4 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#0F1A48]/50`}
          style={{ '--i': 3 } as React.CSSProperties}
        >
          {services.length} {t('Treatments included', 'টি চিকিৎসা অন্তর্ভুক্ত')}
        </p>
        <ul className="space-y-1.5">
          {shown.map((s, i) => (
            <li
              key={s.id}
              className={`${styles.reveal} flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#0F1A48]`}
              style={{ '--i': 4 + i } as React.CSSProperties}
            >
              <span className="w-4 h-4 shrink-0 rounded-full bg-[#EEF2FF] border border-[#0F1A48]/10 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-emerald-600" strokeWidth={3} />
              </span>
              <span className="truncate">{t(s.name_en, s.name_bn)}</span>
            </li>
          ))}
          {extra > 0 && (
            <li
              className={`${styles.reveal} pl-6 text-xs font-bold text-emerald-700`}
              style={{ '--i': 4 + shown.length } as React.CSSProperties}
            >
              +{extra} {t('more treatments', 'আরও চিকিৎসা')}
            </li>
          )}
        </ul>

        <div
          className={`${styles.reveal} mt-auto pt-4 border-t border-slate-200/80 flex items-center justify-between gap-2`}
          style={{ '--i': 9 } as React.CSSProperties}
        >
          <Link
            href={`/services/${cat.slug}`}
            tabIndex={isActive ? 0 : -1}
            className="group/cta inline-flex items-center gap-2 py-2.5 pl-4 pr-2.5 rounded-full bg-[#0F1A48] text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
          >
            <span>{t('Explore Treatments', 'চিকিৎসা দেখুন')}</span>
            <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover/cta:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <button
            type="button"
            tabIndex={isActive ? 0 : -1}
            onClick={(e) => {
              e.stopPropagation();
              onBook(services[0]?.id, name);
            }}
            className="inline-flex items-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold text-[#0F1A48] hover:bg-[#EEF2FF] transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('Book Serial', 'সিরিয়াল নিন')}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
