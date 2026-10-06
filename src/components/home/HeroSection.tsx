'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { SiteSettings, Doctor } from '@/lib/types';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Calendar,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Stethoscope,
  MessageSquare,
  Star,
  Zap,
  BadgeCheck,
} from 'lucide-react';

interface HeroSectionProps {
  settings: SiteSettings;
  doctor: Doctor;
}

export function HeroSection({ settings, doctor }: HeroSectionProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  // Visual toggle: Surgeon portrait vs 3D Technology
  const [activeVisual, setActiveVisual] = useState<'doctor' | 'tech'>('doctor');

  // Interactive 3D Card Tilt State (Mouse Move)
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Parallax State
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles (max 6 degrees for elegant Apple feel)
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF]/40 to-[#F8FAFC] pt-10 pb-16 lg:pt-18 lg:pb-24 border-b border-slate-200/80">
      
      {/* Ambient Medical Micro-Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#0F1A48 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Floating Ambient Glowing Light Orbs with Scroll Parallax */}
      <div 
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-200/25 rounded-full blur-[90px] pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollY * -0.08}px)` }}
      />

      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Apple-Style Minimalist 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          
          {/* ================= LEFT COLUMN: CLEAN 2-LINE NARRATIVE & EFFORTLESS ACTIONS ================= */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Live Trust Pill */}
            <ScrollReveal animation="fade-down" duration={500}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-bold text-[#0F1A48]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>
                  {t(
                    'Chamber Open Daily: 4:00 PM – 9:00 PM',
                    'চেম্বার সক্রিয় • প্রতিদিন বিকাল ৪:০০ – রাত ৯:০০'
                  )}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[#0F1A48]/75">
                  {t('Ashulia & Savar', 'আশুলিয়া ও সাভার')}
                </span>
              </div>
            </ScrollReveal>

            {/* Gorgeous 2-Line Headline (Simple & Majestic) */}
            <ScrollReveal animation="fade-up" delay={80} duration={650}>
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-[#0F1A48] tracking-tight leading-[1.2] sm:leading-[1.12]">
                {lang === 'bn' ? (
                  <>
                    ব্যথামুক্ত আধুনিক ডেন্টাল চিকিৎসা,{' '}
                    <span className="text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-2xl border border-emerald-300/60 inline-block my-1 shadow-2xs">
                      আপনার আত্মবিশ্বাসী হাসি
                    </span>
                  </>
                ) : (
                  <>
                    Gentle & Pain-Free Dental Care,{' '}
                    <span className="text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-2xl border border-emerald-300/60 inline-block my-1 shadow-2xs">
                      For Your Confident Smile
                    </span>
                  </>
                )}
              </h1>
            </ScrollReveal>

            {/* Exactly 1 Calming, High-Trust Subline */}
            <ScrollReveal animation="fade-up" delay={160} duration={650}>
              <p className="text-base sm:text-xl text-[#0F1A48]/80 leading-relaxed font-normal max-w-2xl">
                {t(
                  'Hospital-grade Class-B sterilization, instant ৳200 digital RVG X-rays, and gentle surgical care directly by Chief Dental Surgeon Dr. Aktar Zahan Ony.',
                  'আন্তর্জাতিক স্ট্যান্ডার্ড ক্লাস-বি অটোক্লেভ জীবাণুমুক্ত পরিবেশ, মাত্র ৳২০০ ডিজিটাল আরভিজি এক্স-রে এবং চিফ সার্জন ডা: আক্তার জাহান অনির নিবিড় যত্ন।'
                )}
              </p>
            </ScrollReveal>

            {/* 2 Pristine Apple-Grade Pill Buttons */}
            <ScrollReveal animation="fade-up" delay={240} duration={650}>
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                {/* Primary Button */}
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="px-7 py-4 bg-[#0F1A48] hover:bg-[#1E2D6A] text-white rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer group"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <Calendar className="w-5 h-5 text-amber-300 group-hover:rotate-6 transition-transform" />
                  <span>{t('Book Online Serial', 'অনলাইন সিরিয়াল নিন')}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary Button */}
                <a
                  href={`https://wa.me/${(settings.whatsapp || '8801324558811').replace(/[^0-9]/g, '')}?text=Hello%20Care%20Point%20Dental,%20I%20want%20to%20consult%20Dr.%20Aktar%20Zahan%20Ony`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-white hover:bg-[#EEF2FF] text-[#0F1A48] border border-slate-300/90 rounded-full font-bold text-sm sm:text-base shadow-xs hover:border-[#0F1A48]/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <span>{t('WhatsApp Chat', 'হোয়াটসঅ্যাপে পরামর্শ')}</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Minimalist Trust & Credibility Strip */}
            <ScrollReveal animation="fade-up" delay={320} duration={650}>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#0F1A48]/80 font-medium">
                <div className="flex items-center gap-1.5 font-bold text-[#0F1A48]">
                  <Stethoscope className="w-4 h-4 text-[#0F1A48]" />
                  <span>{t(doctor.name_en, doctor.name_bn)}</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-1 text-emerald-700 font-bold">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span>BMDC Reg: {doctor.bmdc_reg || '12990'}</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>৫.০ স্টার রেটিং (১২০+ সন্তুষ্ট রোগী)</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* ================= RIGHT COLUMN: 3D MOUSE TILT & SCROLL PARALLAX VISUAL STAGE ================= */}
          <div className="lg:col-span-5 xl:col-span-5">
            <ScrollReveal animation="fade-left" duration={700}>
              
              {/* Subtle Switcher (Surgeon vs 3D Care) */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="inline-flex items-center gap-1 bg-white p-1 rounded-full border border-slate-200/90 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setActiveVisual('doctor')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeVisual === 'doctor'
                        ? 'bg-[#0F1A48] text-white shadow-xs'
                        : 'text-[#0F1A48]/70 hover:text-[#0F1A48] hover:bg-[#EEF2FF]'
                    }`}
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>{t('Surgeon Profile', 'চিফ সার্জন')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveVisual('tech')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeVisual === 'tech'
                        ? 'bg-[#0F1A48] text-white shadow-xs'
                        : 'text-[#0F1A48]/70 hover:text-[#0F1A48] hover:bg-[#EEF2FF]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('3D Tech Care', 'আধুনিক প্রযুক্তি')}</span>
                  </button>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t('Verified Clinic', 'ভেরিফায়েড')}</span>
                </span>
              </div>

              {/* 3D TILT & PARALLAX CARD CONTAINER */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-3xl p-3 sm:p-4 bg-white border border-slate-200/90 shadow-2xl transition-all duration-300 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(${scrollY * -0.04}px)`,
                  transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform',
                }}
              >
                
                {/* Soft Dynamic Glow behind frame */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/15 via-emerald-500/15 to-indigo-500/15 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Main Visual Display */}
                <div className="relative w-full aspect-[4/4.3] sm:aspect-[4/4.6] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                  {activeVisual === 'doctor' ? (
                    <Image
                      src={doctor.photo_url || '/images/doctor-ony.jpg'}
                      alt={doctor.name_en || 'Dr. Aktar Zahan Ony - Chief Dental Surgeon'}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 550px"
                      priority
                    />
                  ) : (
                    <Image
                      src="/images/dental_3d_shield.jpg"
                      alt="3D Advanced Dental Technology & Shield"
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 550px"
                      priority
                    />
                  )}

                  {/* Soft Gradient Overlay at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A48]/75 via-transparent to-black/10 pointer-events-none" />

                  {/* BMDC Badge directly on photo */}
                  <div className="absolute top-3.5 right-3.5 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1A48]/90 text-white text-xs font-bold shadow-md border border-white/20 backdrop-blur-md">
                      <BadgeCheck className="w-4 h-4 text-emerald-400" />
                      <span>{doctor.bmdc_reg ? `BMDC: ${doctor.bmdc_reg}` : 'BMDC Verified'}</span>
                    </div>
                  </div>

                  {/* Bottom Minimalist Glass Ribbon */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-left">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-black text-[#0F1A48] truncate">
                          {activeVisual === 'doctor'
                            ? t(doctor.name_en, doctor.name_bn)
                            : t('Advanced 3D Dental Care', 'আধুনিক ৩ডি ডেন্টাল কেয়ার')}
                        </h3>
                        <p className="text-[11px] text-[#0F1A48]/75 font-semibold truncate">
                          {activeVisual === 'doctor'
                            ? `${doctor.title_en || 'Chief Dental Surgeon'} • ${doctor.qualifications_en || 'BDS, MPH, JU'}`
                            : t('Class-B Autoclave & Digital Precision', 'ক্লাস-বি অটোক্লেভ ও ডিজিটাল প্রিসিশন')}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openBooking(undefined, activeVisual === 'doctor' ? t(doctor.name_en, doctor.name_bn) : undefined)}
                        className="px-4 py-2 bg-[#0F1A48] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                      >
                        {t('Book', 'সিরিয়াল')}
                      </button>
                    </div>
                  </div>

                </div>

                {/* 2 Lightweight Floating Glass Pills (No Juggling, Pure Elegance) */}
                
                {/* Floating Pill 1 (Top Left) */}
                <div className="absolute -top-3 -left-3 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg animate-float">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-black text-[#0F1A48]">
                    {t('100% Sterile Class-B', '১০০% জীবাণুমুক্ত অটোক্লেভ')}
                  </span>
                </div>

                {/* Floating Pill 2 (Bottom Right) */}
                <div className="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg animate-float-slow">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-black text-[#0F1A48]">
                    {t('Digital RVG X-Ray ৳200', 'ডিজিটাল RVG এক্স-রে ৳২০০')}
                  </span>
                </div>

              </div>

            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
