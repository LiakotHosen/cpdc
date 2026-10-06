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
  Shield,
  Activity,
  Scissors,
  Layers,
  Baby,
  SmilePlus,
  Anchor,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
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

const AUTOPLAY_MS = 5000;
const MEDIA_MS = 2800;

// Image sets per category: the first is shown collapsed; all cycle in the expanded left pane.
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
  compact: boolean; // vertical titles on narrow collapsed cards
}

function computeDims(w: number): Dims {
  if (w < 640) {
    const c = 80, g = 10;
    return { c, g, e: Math.max(300, w - c - g * 2), h: 540, stacked: true, compact: true };
  }
  if (w < 1024) {
    const c = 180, g = 14;
    return { c, g, e: Math.min(700, w - 2 * (c + g)), h: 520, stacked: true, compact: false };
  }
  if (w < 1440) {
    const c = 260, g = 18;
    return {
      c,
      g,
      e: 840,
      h: 500,
      stacked: false,
      compact: false
    };
  }
  if (w < 1920) {
    const c = 290, g = 20;
    return {
      c,
      g,
      e: 920,
      h: 510,
      stacked: false,
      compact: false
    };
  }
  // 1920px+ (2133px+ ultra-wide viewports)
  const c = 320, g = 24;
  return {
    c,
    g,
    e: 980,
    h: 520,
    stacked: false,
    compact: false
  };
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

  const [active, setActive] = useState(0);
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

  const trackRef = useRef<HTMLDivElement>(null);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = categories.length;
  const paused = manualPaused || hovering || focused || touchHold || !inView || reducedMotion;

  // Measure track width -> card geometry
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setDims(computeDims(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Only autoplay while visible
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
  }, []);

  // Activate a card and center it. Final layout is deterministic (one expanded card),
  // so the target offset can be computed up front and scrolled in parallel with the expansion.
  const goTo = useCallback(
    (index: number) => {
      const i = (index + total) % total;
      setActive(i);
      const el = trackRef.current;
      if (!el) return;
      const left = i * (dims.c + dims.g) - (el.clientWidth - dims.e) / 2;
      el.scrollTo({ left: Math.max(0, left), behavior: reducedMotion ? 'auto' : 'smooth' });
    },
    [total, dims, reducedMotion]
  );

  // Pause briefly after touch interaction so the user can read the opened card
  const holdForTouch = () => {
    setTouchHold(true);
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setTouchHold(false), 9000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const trackStyle = {
    '--c': `${dims.c}px`,
    '--e': `${dims.e}px`,
    '--g': `${dims.g}px`,
    '--h': `${dims.h}px`,
    '--pw': `${dims.stacked ? dims.e : Math.round(dims.e * 0.52)}px`,
    '--mw': `${dims.stacked ? dims.e : dims.e - Math.round(dims.e * 0.52)}px`
  } as React.CSSProperties;

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
            const isSelected = idx === active;
            return (
              <button
                key={cat.id}
                id={`treatment-pill-${cat.slug}`}
                role="tab"
                aria-selected={isSelected}
                onClick={() => goTo(idx)}
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

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2 text-[#0F1A48]">
            <span className="text-2xl font-black tabular-nums">{String(active + 1).padStart(2, '0')}</span>
            <span className="text-sm font-bold text-slate-400 tabular-nums">/ {String(total).padStart(2, '0')}</span>
            <span className="hidden sm:inline text-xs font-semibold text-slate-500 ml-2">
              {t('Hover a card to explore', 'বিস্তারিত দেখতে কার্ডে রাখুন')}
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
              onClick={() => goTo(active - 1)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0F1A48] hover:bg-slate-50 shadow-2xs transition-all cursor-pointer active:scale-95"
              aria-label={t('Previous category', 'পূর্ববর্তী বিভাগ')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="treatment-slider-next"
              onClick={() => goTo(active + 1)}
              className="p-2 rounded-xl bg-[#0F1A48] border border-[#0F1A48] text-white hover:bg-emerald-600 hover:border-emerald-600 shadow-2xs transition-all cursor-pointer active:scale-95"
              aria-label={t('Next category', 'পরবর্তী বিভাগ')}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expanding card track */}
        <div
          ref={trackRef}
          className={styles.track}
          style={trackStyle}
          data-stacked={dims.stacked}
          data-compact={dims.compact}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setHovering(false)}
          onTouchStart={holdForTouch}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
          }}
          aria-roledescription="carousel"
          aria-label={t('Treatment categories', 'চিকিৎসা বিভাগসমূহ')}
        >
          {categories.map((cat, idx) => (
            <TreatmentCard
              key={cat.id}
              cat={cat}
              index={idx}
              total={total}
              isActive={idx === active}
              services={services.filter((s) => s.category_id === cat.id)}
              animateMedia={!reducedMotion}
              onActivate={() => {
                if (idx === active) return;
                goTo(idx);
              }}
              onBook={openBooking}
            />
          ))}
        </div>

        {/* Autoplay progress */}
        <div className="flex items-center justify-center gap-1.5 mt-2" aria-hidden>
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              tabIndex={-1}
              onClick={() => goTo(idx)}
              className={`h-1.5 rounded-full overflow-hidden cursor-pointer transition-all duration-500 ${
                idx === active ? 'w-12 bg-slate-200' : idx < active ? 'w-3 bg-[#0F1A48]/70' : 'w-3 bg-slate-300 hover:bg-slate-400'
              }`}
            >
              {idx === active && !reducedMotion && (
                <span
                  key={active}
                  className={styles.fill}
                  style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                  onAnimationEnd={() => goTo(active + 1)}
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
  total: number;
  isActive: boolean;
  services: Service[];
  animateMedia: boolean;
  onActivate: () => void;
  onBook: (serviceId?: string, label?: string) => void;
}

function TreatmentCard({ cat, index, total, isActive, services, animateMedia, onActivate, onBook }: TreatmentCardProps) {
  const { t } = useLanguage();
  const Icon = CATEGORY_ICON_MAP[cat.icon_name] || Activity;
  const images = getCategoryImages(cat.slug);
  const [slide, setSlide] = useState(0);

  // Continuous image carousel inside the expanded left pane
  useEffect(() => {
    if (!isActive || !animateMedia) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % images.length), MEDIA_MS);
    return () => clearInterval(id);
  }, [isActive, animateMedia, images.length]);

  const name = t(cat.name_en, cat.name_bn);
  const shown = services.slice(0, 4);
  const extra = services.length - shown.length;
  const num = String(index + 1).padStart(2, '0');

  return (
    <article
      id={`treatment-card-${cat.slug}`}
      className={styles.card}
      data-active={isActive}
      tabIndex={0}
      aria-label={name}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onActivate()}
      onClick={() => onActivate()}
      onFocus={(e) => e.target === e.currentTarget && onActivate()}
    >
      {/* Left: visual pane */}
      <div className={styles.media}>
        {images.map((src, i) => {
          const state = i === slide ? 'current' : i === (slide - 1 + images.length) % images.length ? 'prev' : 'next';
          return (
            <div key={src + i} className={styles.slide} data-state={state}>
              <Image
                src={src}
                alt={i === 0 ? name : ''}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 90vw, (max-width: 1000px) 60vw, 360px"
              />
            </div>
          );
        })}
        <div className={styles.shade} />

        <div className={styles.label}>
          <div className="flex items-start justify-between gap-2">
            <span className="w-10 h-10 shrink-0 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
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

        <div className={styles.dots} aria-hidden>
          {images.map((src, i) => (
            <span key={src + i} className={styles.dot} data-on={i === slide} />
          ))}
        </div>
      </div>

      {/* Right: info pane */}
      <div className={styles.panel} aria-hidden={!isActive}>
        <div className={`${styles.reveal} flex items-center justify-between gap-2`} style={{ '--i': 0 } as React.CSSProperties}>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F1A48]/55">
            {t('Category', 'বিভাগ')} {num} / {String(total).padStart(2, '0')}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            {t('Sterile', 'জীবাণুমুক্ত')}
          </span>
        </div>

        <h3
          className={`${styles.reveal} mt-2 text-xl lg:text-2xl font-black text-[#0F1A48] leading-tight tracking-tight`}
          style={{ '--i': 1 } as React.CSSProperties}
        >
          {name}
        </h3>

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
