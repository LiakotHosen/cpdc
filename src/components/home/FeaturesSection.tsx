'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Feature } from '@/lib/types';
import {
  ShieldCheck,
  Cpu,
  Sparkles,
  UserCheck,
  Smile,
  Flame,
  PackageCheck,
  ScanLine,
  CheckCircle2,
  Zap,
  Wind,
  Video,
  HeartPulse,
  AlertCircle,
  HeartHandshake,
  CalendarCheck,
  Clock,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Check,
  LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Cpu,
  Sparkles,
  UserCheck,
  Smile,
  ShieldCheck,
  Flame,
  PackageCheck,
  ScanLine,
  CheckCircle2,
  Zap,
  Wind,
  Video,
  HeartPulse,
  AlertCircle,
  HeartHandshake,
  CalendarCheck,
  Clock
};

interface FeaturesSectionProps {
  features: Feature[];
}

interface FeatureStage {
  id: string;
  stageNumber: string;
  title_en: string;
  title_bn: string;
  subtitle_en: string;
  subtitle_bn: string;
  tag_en: string;
  tag_bn: string;
  features: Feature[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  const { lang, t } = useLanguage();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Group 17 features into 4 thematic stages (4 + 4 + 4 + 5)
  const stages: FeatureStage[] = [
    {
      id: 'stage-1',
      stageNumber: '01',
      title_en: '100% Autoclave Sterilization & Zero Infection',
      title_bn: 'শতভাগ অটোক্লেভ জীবাণুমুক্তকরণ ও পরম নিরাপত্তা',
      subtitle_en: 'Hospital-grade autoclave and sealed sterile instrument pouches for every patient.',
      subtitle_bn: 'প্রতি রোগীর জন্য আলাদা অটোক্লেভ ও ইউভি জীবাণুমুক্ত সিল করা ইন্সট্রুমেন্ট পাউচ।',
      tag_en: 'Sterilization & Biosecurity',
      tag_bn: 'জীবাণুমুক্তকরণ ও সংক্রমণ রোধ',
      features: features.filter(f => ['feat-5', 'feat-6', 'feat-7', 'feat-8'].includes(f.id)).length === 4
        ? features.filter(f => ['feat-5', 'feat-6', 'feat-7', 'feat-8'].includes(f.id))
        : features.slice(0, 4)
    },
    {
      id: 'stage-2',
      stageNumber: '02',
      title_en: 'Digital RVG Diagnostic & Modern Technology',
      title_bn: 'ডিজিটাল আরভিজি এক্স-রে ও অত্যাধুনিক প্রযুক্তি',
      subtitle_en: 'Ultra-low radiation real-time imaging and top-tier computerized operatory chairs.',
      subtitle_bn: 'তাৎক্ষণিক ডিজিটাল আরভিজি এক্স-রে এবং আরামদায়ক উচ্চপ্রযুক্তির ডেন্টাল স্যুট।',
      tag_en: 'Advanced Diagnostics',
      tag_bn: 'উন্নত রোগ নির্ণয় প্রযুক্তি',
      features: features.filter(f => ['feat-1', 'feat-2', 'feat-9', 'feat-10'].includes(f.id)).length === 4
        ? features.filter(f => ['feat-1', 'feat-2', 'feat-9', 'feat-10'].includes(f.id))
        : features.slice(4, 8)
    },
    {
      id: 'stage-3',
      stageNumber: '03',
      title_en: 'Experienced Surgeon & Gentle Pain-Free Dentistry',
      title_bn: 'দক্ষ ডেন্টাল সার্জন ও ব্যথাহীন আধুনিক চিকিৎসা',
      subtitle_en: 'Personalized treatment by Dr. Aktar Zahan Ony (BMDC 12990) with gentle anesthesia.',
      subtitle_bn: 'ডা. আক্তার জাহান অনি-এর দক্ষ নেতৃত্বে শান্তিময় ও ব্যথামুক্ত আধুনিক চিকিৎসা।',
      tag_en: 'Surgeon Led Care',
      tag_bn: 'অভিজ্ঞ সার্জিক্যাল কেয়ার',
      features: features.filter(f => ['feat-3', 'feat-13', 'feat-4', 'feat-14'].includes(f.id)).length === 4
        ? features.filter(f => ['feat-3', 'feat-13', 'feat-4', 'feat-14'].includes(f.id))
        : features.slice(8, 12)
    },
    {
      id: 'stage-4',
      stageNumber: '04',
      title_en: 'Comfort, Transparent Pricing & Patient First Support',
      title_bn: 'আরামদায়ক পরিবেশ, স্বচ্ছ ফি ও আন্তরিক যত্ন',
      subtitle_en: 'Full AC suites, 24/7 security, prompt appointment booking and honest aftercare.',
      subtitle_bn: 'ফুল এসি ও পাওয়ার ব্যাকআপ, সিসিটিভি নিরাপত্তা এবং সহজ সিরিয়াল বুকিং ব্যবস্থা।',
      tag_en: 'Comfort & Trust',
      tag_bn: 'আরাম, নিরাপত্তা ও আস্থার অঙ্গীকার',
      features: features.filter(f => ['feat-11', 'feat-15', 'feat-16', 'feat-17', 'feat-12'].includes(f.id)).length >= 4
        ? features.filter(f => ['feat-11', 'feat-15', 'feat-16', 'feat-17', 'feat-12'].includes(f.id))
        : features.slice(12, 17)
    }
  ];

  const currentStage = stages[activeStageIndex] || stages[0];

  // Stage switcher with smooth animation reset
  const handleStageChange = (newIndex: number) => {
    if (newIndex === activeStageIndex || animating) return;
    setAnimating(true);
    setActiveStageIndex(newIndex);
    setTimeout(() => {
      setAnimating(false);
    }, 450);
  };

  const handleNext = () => {
    const nextIdx = (activeStageIndex + 1) % stages.length;
    handleStageChange(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeStageIndex - 1 + stages.length) % stages.length;
    handleStageChange(prevIdx);
  };

  // Auto-play timer (changes stage every 7 seconds if not paused)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % stages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, stages.length]);

  // Scroll wheel interaction: smoothly transition through stages when scrolling over this section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isThrottled = false;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;

      // When scrolling down and not yet at the last stage, advance stage
      if (e.deltaY > 30 && activeStageIndex < stages.length - 1) {
        e.preventDefault();
        if (!isThrottled) {
          isThrottled = true;
          handleStageChange(activeStageIndex + 1);
          setTimeout(() => {
            isThrottled = false;
          }, 650);
        }
      } else if (e.deltaY < -30 && activeStageIndex > 0) {
        // When scrolling up and not yet at the first stage, go to previous stage
        e.preventDefault();
        if (!isThrottled) {
          isThrottled = true;
          handleStageChange(activeStageIndex - 1);
          setTimeout(() => {
            isThrottled = false;
          }, 650);
        }
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, [activeStageIndex, stages.length]);

  // Subtle zoom factor based on active stage
  // Stage 0: 1.00 -> Stage 1: 1.05 -> Stage 2: 1.10 -> Stage 3: 1.15
  const zoomScale = 1 + activeStageIndex * 0.05;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden bg-navy-dark text-white select-none border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Cinematic Background Operatory Image with Dynamic Zoom-In */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/clinic_operatory_bg.jpg"
          alt="Care Point Dental Clinic High-Tech Operatory"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out will-change-transform"
          style={{ transform: `scale(${zoomScale})` }}
        />

        {/* Multi-layered Vignette & Dark Blue Tint for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/95 via-navy-dark/85 to-navy-dark/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-navy-dark/60 to-navy-dark/95" />

        {/* Dynamic Ambient Glow Spheres */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl transition-opacity duration-700"
          style={{ opacity: activeStageIndex % 2 === 0 ? 0.35 : 0.15 }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl transition-opacity duration-700"
          style={{ opacity: activeStageIndex % 2 === 1 ? 0.4 : 0.2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header & Context */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-teal-300 text-xs font-bold uppercase tracking-wider shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t('Our Clinical Commitments', 'আপনার সুরক্ষায় ১৭টি বিশেষ অঙ্গীকার')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-md">
            {t(
              'Why Patients Trust Care Point Dental Clinic',
              'কেন আশুলিয়া ও সাভারের মানুষ আমাদের ওপর আস্থা রাখেন?'
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            {t(
              'Modern dental care is not just about aesthetics—it is about absolute biological safety. We ensure zero cross-contamination through multi-stage autoclave sterilization, instant RVG digital imaging, and gentle surgeon-led treatment.',
              'উন্নত ডেন্টাল চিকিৎসা শুধু সুন্দর হাসির জন্যই নয়, আপনার সুস্বাস্থ্যের পরম নিরাপত্তা। আমরা প্রতিটি রোগীর জন্য আলাদা জীবাণুমুক্ত সিল করা সরঞ্জাম, কম রেডিয়েশনের ডিজিটাল এক্স-রে ও দক্ষ ডেন্টাল সার্জনের নিখুঁত তত্ত্বাবধান নিশ্চিত করি।'
            )}
          </p>
        </div>

        {/* Stage Selector Tabs with Progress Indicators */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {stages.map((stg, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stg.id}
                onClick={() => handleStageChange(idx)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white border-teal-300/40 shadow-lg shadow-teal-500/25 scale-102'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-white/20'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                    isActive ? 'bg-white text-navy-dark' : 'bg-white/15 text-white'
                  }`}
                >
                  {stg.stageNumber}
                </span>
                <span>{t(stg.tag_en, stg.tag_bn)}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Interactive Showcase: Center Hub with 4 Points Entering from Four Sides */}
        <div className="relative min-h-[460px] sm:min-h-[520px] flex flex-col justify-center">
          {/* Central Interactive Hub */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="relative w-56 h-56 rounded-full bg-navy-primary/60 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center p-6 text-center space-y-2 group">
              {/* Outer Pulsing Aura Ring */}
              <div className="absolute -inset-3 rounded-full border border-teal-400/30 animate-pulse pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-teal-500/30">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-300">
                  {t(`Stage ${currentStage.stageNumber} of 04`, `ধাপ ${currentStage.stageNumber} / ০৪`)}
                </span>
                <h4 className="text-xs font-bold text-white leading-tight">
                  {t(currentStage.title_en, currentStage.title_bn)}
                </h4>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5 pt-1">
                {stages.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === activeStageIndex
                        ? 'w-6 bg-teal-400'
                        : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 4 Corners / Quadrants Floating Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-x-72 lg:gap-y-8 relative z-20">
            {currentStage.features.slice(0, 4).map((feat, i) => {
              const Icon = ICON_MAP[feat.icon_name] || ShieldCheck;

              // Animation trajectory based on quadrant:
              // i === 0: Top-Left  (Enters from -x, -y)
              // i === 1: Top-Right (Enters from +x, -y)
              // i === 2: Bottom-Left (Enters from -x, +y)
              // i === 3: Bottom-Right (Enters from +x, +y)
              const getQuadrantTransform = () => {
                if (animating) {
                  if (i === 0) return '-translate-x-8 -translate-y-6 opacity-0 scale-95';
                  if (i === 1) return 'translate-x-8 -translate-y-6 opacity-0 scale-95';
                  if (i === 2) return '-translate-x-8 translate-y-6 opacity-0 scale-95';
                  return 'translate-x-8 translate-y-6 opacity-0 scale-95';
                }
                return 'translate-x-0 translate-y-0 opacity-100 scale-100';
              };

              return (
                <div
                  key={feat.id}
                  className={`relative p-5 sm:p-6 rounded-3xl bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-teal-400/50 transition-all duration-700 ease-out shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 group cursor-default ${getQuadrantTransform()}`}
                  style={{
                    transitionDelay: `${i * 100}ms`
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Glowing Tech Icon Pill */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500/20 to-blue-600/30 border border-teal-400/30 text-teal-300 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-teal-400 uppercase tracking-wider bg-teal-950/60 px-2 py-0.5 rounded-md border border-teal-800/50">
                          #{feat.sort_order} Commitment
                        </span>
                        <Check className="w-4 h-4 text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-teal-200 transition-colors leading-snug">
                        {t(feat.title_en, feat.title_bn)}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {t(
                          feat.description_en || feat.desc_en || '',
                          feat.description_bn || feat.desc_bn || ''
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5th feature if present in stage 4 */}
          {currentStage.features.length > 4 && (
            <div
              className={`mt-4 mx-auto max-w-md w-full p-4 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 text-center transition-all duration-700 ${
                animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <span className="text-xs text-teal-300 font-bold">
                ✓ {t(currentStage.features[4].title_en, currentStage.features[4].title_bn)}:
              </span>{' '}
              <span className="text-xs text-slate-300">
                {t(currentStage.features[4].description_en, currentStage.features[4].description_bn)}
              </span>
            </div>
          )}
        </div>

        {/* 3. Bottom Controls: Prev, Next, Auto-Play status & Step Indicators */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-white/10"
              title={isPaused ? 'Play auto-rotation' : 'Pause auto-rotation'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-teal-400 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{isPaused ? t('Resume Auto-Showcase', 'অটো-প্লে চালান') : t('Auto-Showcase Running', 'অটো-শোকেস চলছে')}</span>
            </button>
            <span className="text-xs text-slate-400">
              {t(`Step ${activeStageIndex + 1} of ${stages.length}`, `ধাপ ${activeStageIndex + 1} / ${stages.length}`)}
            </span>
          </div>

          {/* Prev / Next Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/15 hover:scale-105"
              aria-label="Previous clinical commitments stage"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 px-2">
              {stages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleStageChange(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeStageIndex ? 'w-8 bg-teal-400' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to stage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white transition-all cursor-pointer shadow-md shadow-teal-500/20 hover:scale-105"
              aria-label="Next clinical commitments stage"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
