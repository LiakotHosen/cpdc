'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { TopAnnouncement, SiteSettings } from '@/lib/types';
import { getAnnouncements, getSiteSettings } from '@/lib/data/api';
import { INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';
import {
  MapPin,
  Clock,
  Phone,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  Flame,
  ArrowRight,
  ExternalLink,
  Volume2,
  Moon,
  Star,
  Gift,
  Zap,
  Stethoscope,
  Sun,
  BadgePercent
} from 'lucide-react';

interface TopAnnouncementBarProps {
  settings?: SiteSettings;
}

export function TopAnnouncementBar({ settings: initialSettings }: TopAnnouncementBarProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const [settings, setSettings] = useState<SiteSettings>(initialSettings || INITIAL_SITE_SETTINGS);
  const [announcements, setAnnouncements] = useState<TopAnnouncement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 0 is always default clinic info slide
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load announcements
  const loadAnnouncements = useCallback(async () => {
    try {
      const data = await getAnnouncements();
      // filter only active announcements sorted by sort_order
      const active = (data || [])
        .filter((a) => a.is_active)
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      setAnnouncements(active);
    } catch {
      // fallback
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
    getSiteSettings().then(setSettings).catch(() => {});

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<TopAnnouncement[]>;
      if (customEvent.detail) {
        const active = customEvent.detail
          .filter((a) => a.is_active)
          .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setAnnouncements(active);
      } else {
        loadAnnouncements();
      }
    };

    window.addEventListener('cpdc_announcements_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('cpdc_announcements_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [loadAnnouncements]);

  // Total slides = 1 (Default Info) + announcements.length
  const totalSlides = 1 + announcements.length;

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
      setIsTransitioning(false);
    }, 250);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      setIsTransitioning(false);
    }, 250);
  }, [totalSlides]);

  // Auto-rotation timer (15 seconds default or custom per announcement)
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    // determine duration for current slide
    let duration = 15000; // 15 seconds
    if (currentIndex > 0) {
      const currentAnnouncement = announcements[currentIndex - 1];
      if (currentAnnouncement?.duration_seconds) {
        duration = currentAnnouncement.duration_seconds * 1000;
      }
    }

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, totalSlides, isPaused, nextSlide, announcements]);

  // Determine badge styling
  const getBadgeColors = (color?: string) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/40';
      case 'rose':
        return 'bg-rose-500/20 text-rose-300 border-rose-400/40';
      case 'indigo':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40';
      case 'purple':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/40';
      case 'teal':
        return 'bg-teal-500/20 text-teal-300 border-teal-400/40';
      case 'emerald':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
    }
  };

  const renderAnnouncementBadgeIcon = (item: TopAnnouncement) => {
    const text = `${item.badge_text_en || ''} ${item.occasion_en || ''} ${item.occasion_bn || ''}`.toLowerCase();
    if (text.includes('ramadan') || text.includes('রমজান')) {
      return <Moon className="w-3 h-3 text-current shrink-0" />;
    }
    if (text.includes('shab') || text.includes('বরাত') || text.includes('star')) {
      return <Star className="w-3 h-3 text-current shrink-0" />;
    }
    if (text.includes('eid') || text.includes('ঈদ')) {
      return <Gift className="w-3 h-3 text-current shrink-0" />;
    }
    if (text.includes('boishakh') || text.includes('বৈশাখ') || text.includes('new year')) {
      return <Sun className="w-3 h-3 text-current shrink-0" />;
    }
    if (text.includes('flash') || text.includes('ফ্ল্যাশ') || text.includes('sale')) {
      return <Zap className="w-3 h-3 text-current shrink-0" />;
    }
    if (text.includes('camp') || text.includes('clinic') || text.includes('ক্যাম্প') || text.includes('doctor')) {
      return <Stethoscope className="w-3 h-3 text-current shrink-0" />;
    }
    if (text.includes('scaling') || text.includes('স্কেলিং') || text.includes('combo') || text.includes('whitening')) {
      return <Sparkles className="w-3 h-3 text-current shrink-0" />;
    }
    return <Flame className="w-3 h-3 text-current shrink-0" />;
  };

  const currentAnnouncement = currentIndex > 0 ? announcements[currentIndex - 1] : null;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-navy-dark text-slate-300 text-[11.5px] border-b border-white/10 relative overflow-hidden transition-colors"
      style={{ backgroundColor: '#070E28' }}
    >
      {/* Subtle glowing animated top border when an offer is active */}
      {currentAnnouncement && (
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-500 via-amber-400 to-teal-400 animate-pulse" />
      )}

      <div className="w-full px-3 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 mx-auto py-1.5 flex items-center justify-between gap-2 min-h-[36px]">
        {/* Left Side: Navigation Arrows (if multiple slides exist) */}
        {totalSlides > 1 && (
          <div className="hidden sm:flex items-center gap-1 shrink-0">
            <button
              onClick={prevSlide}
              title={t('Previous Notice', 'পূর্ববর্তী নোটিশ')}
              aria-label="Previous Slide"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextSlide}
              title={t('Next Notice', 'পরবর্তী নোটিশ')}
              aria-label="Next Slide"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Center / Main Content Area with Smooth Fade & Slide Transition */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
          }`}
        >
          {currentIndex === 0 ? (
            /* SLIDE 0: Default Chamber Location & Consulting Hours */
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                {/* Chamber Location */}
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="truncate max-w-[340px] sm:max-w-none">
                    {t(
                      '2nd Floor, Mofizuddin Tower, Pollibidyut, Ashulia, Savar',
                      '২য় তলা, মফিজ উদ্দিন টাওয়ার (ইউসিবি ব্যাংকের পাশে), পল্লীবিদ্যুৎ, আশুলিয়া, সাভার'
                    )}
                  </span>
                </div>

                {/* Consulting Schedule */}
                <div className="hidden lg:flex items-center gap-1.5 text-slate-300 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    {t(
                      'Consulting: 4:00 PM – 9:00 PM Daily (Dr. Aktar Zahan Ony)',
                      'রোগী দেখার সময়: প্রতিদিন বিকাল ৪:০০ – রাত ৯:০০ (ডা. আক্তার জাহান অনি)'
                    )}
                  </span>
                </div>
              </div>

              {/* Right Side Hotline Contacts (Desktop) */}
              <div className="hidden md:flex items-center gap-3 shrink-0">
                <a
                  href={`https://wa.me/${(settings.whatsapp || '8801324558811').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    'Hello Care Point Dental, I want to consult Dr. Aktar Zahan Ony'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp: {settings.whatsapp || '+880 1324-558811'}</span>
                </a>
                <span className="text-slate-600">|</span>
                <a
                  href={`tel:${settings.phone || '+8801324558811'}`}
                  className="flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{settings.phone || '01324-558811'}</span>
                </a>
              </div>
            </div>
          ) : currentAnnouncement ? (
            /* SLIDE 1..N: Custom Notice / Offer / Flash Sale */
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
                {/* Badge Tag */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase border ${getBadgeColors(
                    currentAnnouncement.badge_color
                  )}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                  {renderAnnouncementBadgeIcon(currentAnnouncement)}
                  <span>
                    {lang === 'bn'
                      ? currentAnnouncement.badge_text_bn || currentAnnouncement.badge_text_en || 'অফার'
                      : currentAnnouncement.badge_text_en || 'SPECIAL OFFER'}
                  </span>
                </span>

                {/* Occasion / Purpose */}
                <span className="font-bold text-white tracking-wide">
                  {lang === 'bn'
                    ? currentAnnouncement.occasion_bn || currentAnnouncement.occasion_en
                    : currentAnnouncement.occasion_en}
                  :
                </span>

                {/* Benefit Details */}
                <span className="text-amber-300 font-medium">
                  {lang === 'bn'
                    ? currentAnnouncement.benefit_bn || currentAnnouncement.benefit_en
                    : currentAnnouncement.benefit_en}
                </span>
              </div>

              {/* Action Button & Contact */}
              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                {/* Action CTA */}
                {currentAnnouncement.action_type === 'booking' && (
                  <button
                    onClick={() => openBooking()}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-[10.5px] transition-all shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>
                      {lang === 'bn'
                        ? currentAnnouncement.action_text_bn || 'সিরিয়াল নিন'
                        : currentAnnouncement.action_text_en || 'Book Now'}
                    </span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                )}

                {currentAnnouncement.action_type === 'whatsapp' && (
                  <a
                    href={`https://wa.me/${(settings.whatsapp || '8801324558811').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      lang === 'bn'
                        ? `আসসালামু আলাইকুম, "${currentAnnouncement.occasion_bn || currentAnnouncement.occasion_en}" অফারটি সম্পর্কে বিস্তারিত জানতে চাচ্ছি।`
                        : `Hello Care Point Dental, I would like to know more about the "${currentAnnouncement.occasion_en}" offer.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10.5px] transition-all shadow-xs"
                  >
                    <WhatsAppIcon className="w-3 h-3 fill-white" />
                    <span>
                      {lang === 'bn'
                        ? currentAnnouncement.action_text_bn || 'হোয়াটসঅ্যাপ'
                        : currentAnnouncement.action_text_en || 'WhatsApp'}
                    </span>
                  </a>
                )}

                {currentAnnouncement.action_type === 'link' && currentAnnouncement.action_url && (
                  <Link
                    href={currentAnnouncement.action_url}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-bold text-[10.5px] transition-all border border-white/20"
                  >
                    <span>
                      {lang === 'bn'
                        ? currentAnnouncement.action_text_bn || 'বিস্তারিত'
                        : currentAnnouncement.action_text_en || 'Details'}
                    </span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                )}

                {/* Hotline Quick Call (Desktop) */}
                <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-white/10">
                  <a
                    href={`tel:${settings.phone || '+8801324558811'}`}
                    className="flex items-center gap-1 text-slate-300 hover:text-white font-semibold transition-colors"
                  >
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>{settings.phone || '01324-558811'}</span>
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right Side: Slide Indicator Dots */}
        {totalSlides > 1 && (
          <div className="flex items-center gap-1.5 shrink-0 pl-1 sm:pl-3">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setIsTransitioning(false);
                  }, 200);
                }}
                title={idx === 0 ? t('Clinic Info', 'চেম্বার তথ্য') : `${t('Notice', 'নোটিশ')} #${idx}`}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-4 h-1.5 bg-amber-400'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
