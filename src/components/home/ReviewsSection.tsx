'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Review } from '@/lib/types';
import {
  Star,
  QrCode,
  CheckCircle,
  Quote,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  ExternalLink,
  MessageSquareHeart
} from 'lucide-react';
import QRCode from 'qrcode';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const { lang, t } = useLanguage();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Drag state
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const googleReviewUrl = 'https://search.google.com/local/writereview?placeid=carepointdentalclinic';

  useEffect(() => {
    QRCode.toDataURL(googleReviewUrl, {
      width: 140,
      margin: 1,
      color: {
        dark: '#0F1A48',
        light: '#FFFFFF'
      }
    }).then(setQrCodeUrl).catch(() => {});
  }, []);

  // Update active dot index based on scroll position
  const handleScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth > 768 ? 420 : 320;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(0, index), reviews.length - 1));
  }, [reviews.length]);

  const scrollNext = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth > 768 ? 430 : 330;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 20) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }, []);

  const scrollPrev = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth > 768 ? 430 : 330;
    if (el.scrollLeft <= 20) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  }, []);

  const scrollToCard = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth > 768 ? 430 : 330;
    el.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  // Auto-sliding interval (Right to Left sliding)
  useEffect(() => {
    if (isPaused || isHovered || isMouseDown) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused, isHovered, isMouseDown, scrollNext]);

  // Desktop Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    setIsMouseDown(true);
    setIsDragging(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const el = sliderRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.4;
    if (Math.abs(walk) > 6) {
      setIsDragging(true);
    }
    el.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(() => setIsDragging(false), 80);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] text-xs font-bold uppercase tracking-wider border border-[#0F1A48]/15 shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{t('Patient Reviews & Ratings', 'রোগীদের অভিজ্ঞতা ও মতামত')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1A48] tracking-tight">
                {t('Trusted by Patients Across Ashulia & Savar', 'আশুলিয়া ও সাভারের রোগীদের অগাধ বিশ্বাস')}
              </h2>

              <p className="text-sm sm:text-base text-[#0F1A48]/80 leading-relaxed font-normal">
                {t(
                  'Real stories and genuine feedback from patients treated with gentle, sterile, and pain-free care at Care Point Dental Clinic.',
                  'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিকে যারা ব্যথামুক্ত চিকিৎসা সেবা নিয়েছেন তাদের বাস্তব অভিজ্ঞতা ও গুগল ভেরিফায়েড রিভিউ।'
                )}
              </p>
            </div>

            {/* Carousel Control Toolbar: Play/Pause, Counter & Navigation Arrows */}
            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF2FF] text-[#0F1A48] border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                title={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t('Play', 'চালান')}</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>{t('Pause', 'পজ')}</span>
                  </>
                )}
              </button>

              {/* Prev Arrow */}
              <button
                onClick={scrollPrev}
                className="p-2.5 rounded-xl bg-white hover:bg-[#EEF2FF] text-[#0F1A48] border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                aria-label="Previous review"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Next Arrow */}
              <button
                onClick={scrollNext}
                className="p-2.5 rounded-xl bg-[#0F1A48] hover:bg-[#EEF2FF] hover:text-[#0F1A48] text-white border border-[#0F1A48] shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
                aria-label="Next review"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 3D Floating Carousel Slider Container */}
        <div
          className="relative mb-12 [perspective:1400px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseUpOrLeave();
          }}
        >
          {/* Scrollable Track with Drag & Drop */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className={`flex gap-6 overflow-x-auto scrollbar-none py-6 px-2 scroll-smooth select-none ${
              isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollSnapType: isMouseDown ? 'none' : 'x mandatory'
            }}
          >
            {reviews.map((rev, idx) => {
              const directGoogleLink = rev.google_review_url || googleReviewUrl;
              // Generate patient initials for avatar
              const initials = rev.patient_name_en
                ? rev.patient_name_en
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                : 'PT';

              return (
                <div
                  key={rev.id || idx}
                  className="relative group shrink-0 w-[310px] sm:w-[380px] lg:w-[410px]"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Underneath 3D Cast Floor Shadow */}
                  <div className="absolute -bottom-3 left-6 right-6 h-5 rounded-[100%] bg-[#0F1A48]/8 blur-md transition-all duration-300 pointer-events-none group-hover:bg-[#0F1A48]/18 group-hover:blur-xl group-hover:scale-90 group-hover:translate-y-2" />

                  {/* 3D Floating Card Body */}
                  <div className="relative h-full bg-white hover:bg-[#EEF2FF] rounded-3xl p-6 sm:p-7 border border-slate-200/90 border-t-white hover:border-[#0F1A48]/25 shadow-[0_16px_36px_-8px_rgba(15,26,72,0.08),0_6px_16px_rgba(15,26,72,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(15,26,72,0.18),0_10px_20px_rgba(15,26,72,0.08)] transition-all duration-300 ease-out transform-gpu hover:-translate-y-2.5 hover:scale-[1.015] flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Top Row: Rating Stars + Verified Pill */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current drop-shadow-2xs" />
                          ))}
                          <span className="text-xs font-black text-[#0F1A48] ml-1.5">
                            {rev.rating}.0
                          </span>
                        </div>

                        {rev.is_verified && (
                          <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{t('Verified Patient', 'ভেরিফাইড রোগী')}</span>
                          </div>
                        )}
                      </div>

                      {/* Large Quote Mark */}
                      <Quote className="w-8 h-8 text-[#0F1A48]/20 group-hover:text-[#0F1A48]/40 transition-colors" />

                      {/* Patient Feedback Review Content */}
                      <p className="text-xs sm:text-sm text-[#0F1A48]/85 leading-relaxed italic line-clamp-4 font-normal">
                        "{t(rev.comment_en, rev.comment_bn)}"
                      </p>
                    </div>

                    {/* Bottom Metadata & "See on Google" Action */}
                    <div className="pt-5 mt-6 border-t border-slate-200/80 space-y-3.5">
                      {/* Author Row */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Initials Avatar */}
                          <div className="w-10 h-10 rounded-full bg-[#0F1A48] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs border border-white">
                            {initials}
                          </div>

                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-[#0F1A48]">
                              {t(rev.patient_name_en, rev.patient_name_bn)}
                            </h4>
                            {rev.treatment_en && (
                              <span className="text-[11px] text-[#0F1A48]/75 font-semibold block line-clamp-1">
                                {t(rev.treatment_en, rev.treatment_bn || '')}
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] text-[#0F1A48]/60 font-medium shrink-0">
                          {rev.date}
                        </span>
                      </div>

                      {/* "See on Google" Direct Verification Button */}
                      <a
                        href={directGoogleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (isDragging) {
                            e.preventDefault();
                          }
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#0F1A48] text-[#0F1A48] hover:text-white border border-slate-300 hover:border-[#0F1A48] text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs group/btn cursor-pointer"
                      >
                        {/* Google "G" Colorful SVG Icon */}
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.67v3.05h3.87c2.27-2.09 3.67-5.17 3.67-9.16z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.24v3.15C3.26 21.36 7.36 24 12 24z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24 0-.75.13-1.52.38-2.24V6.61H1.24C.45 8.18 0 9.94 0 12c0 2.06.45 3.82 1.24 5.39l4.03-3.15z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.24 6.61l4.03 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
                          />
                        </svg>
                        <span>{t('See on Google Reviews', 'গুগল রিভিউতে দেখুন')}</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator with Direct Click Navigation */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? 'w-7 bg-[#0F1A48] shadow-2xs'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Jump to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews Verified Banner & QR Code Card */}
        <ScrollReveal animation="zoom-in" duration={600}>
          <div className="bg-white rounded-3xl p-6 sm:p-10 text-[#0F1A48] shadow-[0_16px_36px_-8px_rgba(15,26,72,0.08),0_4px_12px_rgba(15,26,72,0.04)] flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-200">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F1A48] bg-[#EEF2FF] px-3.5 py-1.5 rounded-full inline-block border border-[#0F1A48]/15">
                {t('Google Verified Reviews', 'গুগল ভেরিফায়েড রিভিউ')}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F1A48]">
                {t('Had a Visit? Share Your Feedback on Google', 'আপনি কি সেবা নিয়েছেন? গুগলে আপনার মূল্যবান মতামত দিন')}
              </h3>
              <p className="text-xs sm:text-sm text-[#0F1A48]/80 leading-relaxed font-normal">
                {t(
                  'Your honest feedback helps our community in Ashulia and Savar choose sterile, high-quality healthcare with confidence.',
                  'আপনার মূল্যবান রিভিউ স্থানীয় মানুষকে সঠিক ও নিরাপদ চিকিৎসা সেবা বেছে নিতে সাহায্য করবে।'
                )}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F1A48] hover:bg-[#EEF2FF] hover:text-[#0F1A48] text-white border border-[#0F1A48] rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md group cursor-pointer"
                >
                  <span>{t('Write a Google Review', 'গুগলে রিভিউ লিখুন')}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:text-[#0F1A48] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="flex items-center gap-1.5 text-xs text-[#0F1A48] font-bold bg-[#EEF2FF] px-3.5 py-2.5 rounded-xl border border-[#0F1A48]/15">
                  <div className="flex text-amber-500">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                  <span>4.9 / 5.0 on Google Maps</span>
                </div>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="bg-[#EEF2FF] border border-[#0F1A48]/15 p-5 rounded-2xl flex flex-col items-center text-center space-y-2.5 shrink-0 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs text-[#0F1A48] font-bold">
                <QrCode className="w-4 h-4 text-[#0F1A48]" />
                <span>{t('Scan & Review on Mobile', 'মোবাইলে স্ক্যান করে রিভিউ দিন')}</span>
              </div>
              {qrCodeUrl && (
                <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrCodeUrl} alt="Google Review QR" className="w-28 h-28" />
                </div>
              )}
              <span className="text-[10px] text-[#0F1A48]/70 font-semibold">
                Camera Scan • Instant Link
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
