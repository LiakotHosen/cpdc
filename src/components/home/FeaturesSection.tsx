'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Feature } from '@/lib/types';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
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
  BatteryCharging,
  Thermometer,
  Camera,
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
  Flame: ShieldCheck, // Formal sterile badge instead of flame
  PackageCheck,
  ScanLine,
  CheckCircle2,
  Zap: BatteryCharging, // Formal hospital power backup instead of cartoon lightning
  BatteryCharging,
  Wind: Thermometer, // Formal climate control instead of wind
  Thermometer,
  Video: Camera, // Formal surveillance camera instead of camcorder
  Camera,
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

  return (
    <section
      className="relative w-full py-16 lg:py-24 overflow-hidden bg-[#F8FAFC] text-[#0F1A48] border-b border-slate-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Top Header & Context */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] border border-[#0F1A48]/15 text-[#0F1A48] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#0F1A48]" />
              <span>{t('Our Clinical Commitments', 'আপনার সুরক্ষায় ১৭টি বিশেষ অঙ্গীকার')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0F1A48]">
              {t(
                'Why Patients Trust Care Point Dental Clinic',
                'কেন আশুলিয়া ও সাভারের মানুষ আমাদের ওপর আস্থা রাখেন?'
              )}
            </h2>

            <p className="text-xs sm:text-sm text-[#0F1A48]/80 leading-relaxed max-w-2xl mx-auto font-normal">
              {t(
                'Modern dental care is not just about aesthetics—it is about absolute biological safety. We ensure zero cross-contamination through multi-stage autoclave sterilization, instant RVG digital imaging, and gentle surgeon-led treatment.',
                'উন্নত ডেন্টাল চিকিৎসা শুধু সুন্দর হাসির জন্যই নয়, আপনার সুস্বাস্থ্যের পরম নিরাপত্তা। আমরা প্রতিটি রোগীর জন্য আলাদা জীবাণুমুক্ত সিল করা সরঞ্জাম, কম রেডিয়েশনের ডিজিটাল এক্স-রে ও দক্ষ ডেন্টাল সার্জনের নিখুঁত তত্ত্বাবধান নিশ্চিত করি।'
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* Stage Selector Tabs with 3D Segmented Floating Dock */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="flex items-center justify-center mb-12">
            <div className="p-1.5 rounded-2xl bg-white border border-slate-200 shadow-[0_10px_30px_-6px_rgba(15,26,72,0.08),0_2px_8px_rgba(15,26,72,0.04)] inline-flex items-center gap-1.5 max-w-full overflow-x-auto scrollbar-none">
              {stages.map((stg, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={stg.id}
                    onClick={() => handleStageChange(idx)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0 border ${
                      isActive
                        ? 'bg-[#0F1A48] text-white border-[#0F1A48] shadow-[0_4px_14px_rgba(15,26,72,0.3)] scale-[1.02]'
                        : 'bg-transparent hover:bg-[#EEF2FF] text-[#0F1A48] border-transparent hover:border-[#0F1A48]/15'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#EEF2FF] text-[#0F1A48]' : 'bg-[#EEF2FF] text-[#0F1A48]'
                      }`}
                    >
                      {stg.stageNumber}
                    </span>
                    <span>{t(stg.tag_en, stg.tag_bn)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Interactive Showcase: Center 3D Hub with 4 Floating Quadrant Cards */}
        <div className="relative min-h-[480px] sm:min-h-[540px] flex flex-col justify-center [perspective:1400px]">
          {/* Central Interactive 3D Hub */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
            <div className="relative flex items-center justify-center">
              {/* Concentric Ambient 3D Ripple Rings */}
              <div className="absolute w-80 h-80 rounded-full border border-[#0F1A48]/10 animate-pulse-glow pointer-events-none" />
              <div className="absolute w-72 h-72 rounded-full border border-[#0F1A48]/15 pointer-events-none" />

              {/* Soft Floor Shadow beneath the hub */}
              <div className="absolute -bottom-8 w-52 h-8 rounded-[100%] bg-[#0F1A48]/14 blur-xl transition-all duration-500 pointer-events-none" />

              {/* 3D Floating Command Disc */}
              <div className="relative w-64 h-64 rounded-full bg-white border-2 border-slate-200/90 shadow-[0_24px_50px_-12px_rgba(15,26,72,0.18),0_8px_24px_rgba(15,26,72,0.06),inset_0_2px_6px_rgba(255,255,255,1)] flex flex-col items-center justify-center p-7 text-center space-y-2.5 animate-float-slow pointer-events-auto">
                {/* 3D Embossed Shield Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] border border-[#0F1A48]/15 flex items-center justify-center text-[#0F1A48] shadow-[0_4px_12px_rgba(15,26,72,0.1),inset_0_1px_2px_rgba(255,255,255,1)] group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-8 h-8 text-[#0F1A48]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0F1A48]/70 block">
                    {t(`STAGE ${currentStage.stageNumber} OF 04`, `ধাপ ${currentStage.stageNumber} / ০৪`)}
                  </span>
                  <h4 className="text-xs font-extrabold text-[#0F1A48] leading-tight px-1">
                    {t(currentStage.title_en, currentStage.title_bn)}
                  </h4>
                </div>

                {/* Progress Dots with Direct Click Navigation */}
                <div className="flex items-center gap-1.5 pt-1">
                  {stages.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => handleStageChange(dotIdx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        dotIdx === activeStageIndex
                          ? 'w-7 bg-[#0F1A48] shadow-2xs'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Switch to stage ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Corners / Quadrants 3D Floating Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-x-72 xl:gap-x-80 2xl:gap-x-96 lg:gap-y-10 relative z-20">
            {currentStage.features.slice(0, 4).map((feat, i) => {
              const Icon = ICON_MAP[feat.icon_name] || ShieldCheck;

              const getQuadrantTransform = () => {
                if (animating) {
                  if (i === 0) return '-translate-x-8 -translate-y-6 opacity-0 scale-95';
                  if (i === 1) return 'translate-x-8 -translate-y-6 opacity-0 scale-95';
                  if (i === 2) return '-translate-x-8 translate-y-6 opacity-0 scale-95';
                  return 'translate-x-8 translate-y-6 opacity-0 scale-95';
                }
                return 'translate-x-0 translate-y-0 opacity-100 scale-100';
              };

              const getFloatClass = (idx: number) => {
                switch (idx) {
                  case 0:
                    return 'animate-float [animation-duration:5s]';
                  case 1:
                    return 'animate-float-slow [animation-duration:6.5s] [animation-delay:1.2s]';
                  case 2:
                    return 'animate-float-reverse [animation-duration:5.8s] [animation-delay:0.6s]';
                  case 3:
                  default:
                    return 'animate-float [animation-duration:6.2s] [animation-delay:1.8s]';
                }
              };

              const get3DTiltClass = (idx: number) => {
                switch (idx) {
                  case 0:
                    return 'hover:[transform:translateY(-12px)_scale(1.025)_rotateX(2deg)_rotateY(-2deg)]';
                  case 1:
                    return 'hover:[transform:translateY(-12px)_scale(1.025)_rotateX(2deg)_rotateY(2deg)]';
                  case 2:
                    return 'hover:[transform:translateY(-12px)_scale(1.025)_rotateX(-2deg)_rotateY(-2deg)]';
                  case 3:
                  default:
                    return 'hover:[transform:translateY(-12px)_scale(1.025)_rotateX(-2deg)_rotateY(2deg)]';
                }
              };

              return (
                <div key={feat.id} className="relative group cursor-pointer">
                  {/* Underneath 3D Cast Shadow (Creates authentic mid-air floating illusion) */}
                  <div className="absolute -bottom-3 left-6 right-6 h-5 rounded-[100%] bg-[#0F1A48]/8 blur-md transition-all duration-300 pointer-events-none group-hover:bg-[#0F1A48]/18 group-hover:blur-xl group-hover:scale-90 group-hover:translate-y-3" />

                  {/* 3D Floating Card Body */}
                  <div
                    className={`relative p-6 sm:p-7 rounded-3xl bg-white hover:bg-[#EEF2FF] border border-slate-200/90 border-t-white hover:border-[#0F1A48]/30 shadow-[0_16px_35px_-8px_rgba(15,26,72,0.08),0_6px_16px_rgba(15,26,72,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(15,26,72,0.18),0_12px_24px_rgba(15,26,72,0.08)] transition-all duration-300 ease-out transform-gpu hover:[animation-play-state:paused] ${getFloatClass(i)} ${get3DTiltClass(i)} ${getQuadrantTransform()}`}
                    style={{
                      transitionDelay: `${i * 80}ms`
                    }}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Tactile 3D Icon Box */}
                      <div className="relative w-14 h-14 rounded-2xl bg-white border border-[#0F1A48]/15 shadow-[0_6px_16px_rgba(15,26,72,0.08),inset_0_2px_4px_rgba(255,255,255,1)] text-[#0F1A48] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0F1A48] group-hover:text-white group-hover:border-[#0F1A48] group-hover:shadow-[0_8px_20px_rgba(15,26,72,0.3)] transition-all duration-300">
                        <Icon className="w-7 h-7 transition-transform group-hover:scale-105" />
                      </div>

                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-[#0F1A48] uppercase tracking-wider bg-[#EEF2FF] px-2.5 py-1 rounded-md border border-[#0F1A48]/15 shadow-2xs group-hover:bg-white transition-colors">
                            #{feat.sort_order} Commitment
                          </span>
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200 shadow-2xs">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified</span>
                          </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-extrabold text-[#0F1A48] leading-snug">
                          {t(feat.title_en, feat.title_bn)}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#0F1A48]/80 leading-relaxed font-normal">
                          {t(
                            feat.description_en || feat.desc_en || '',
                            feat.description_bn || feat.desc_bn || ''
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5th feature if present in stage 4 */}
          {currentStage.features.length > 4 && (
            <div
              className={`mt-6 mx-auto max-w-lg w-full p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_12px_28px_-6px_rgba(15,26,72,0.08)] hover:shadow-md text-center transition-all duration-500 hover:-translate-y-1 ${
                animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <span className="text-xs text-[#0F1A48] font-extrabold">
                ✓ {t(currentStage.features[4].title_en, currentStage.features[4].title_bn)}:
              </span>{' '}
              <span className="text-xs text-[#0F1A48]/80 font-medium">
                {t(currentStage.features[4].description_en, currentStage.features[4].description_bn)}
              </span>
            </div>
          )}
        </div>

        {/* 3. Bottom Controls */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl bg-white hover:bg-[#EEF2FF] text-[#0F1A48] transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200"
              title={isPaused ? 'Play auto-rotation' : 'Pause auto-rotation'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#0F1A48] fill-current" /> : <Pause className="w-3.5 h-3.5 text-[#0F1A48]" />}
              <span className="text-[11px]">{isPaused ? t('Resume Auto-Showcase', 'অটো-প্লে চালান') : t('Auto-Showcase Running', 'অটো-শোকেস চলছে')}</span>
            </button>
            <span className="text-xs text-[#0F1A48]/70">
              {t(`Step ${activeStageIndex + 1} of ${stages.length}`, `ধাপ ${activeStageIndex + 1} / ${stages.length}`)}
            </span>
          </div>

          {/* Prev / Next Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white hover:bg-[#EEF2FF] text-[#0F1A48] transition-all cursor-pointer border border-slate-200 hover:scale-105"
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
                    i === activeStageIndex ? 'w-8 bg-[#0F1A48]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to stage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-[#0F1A48] hover:bg-[#EEF2FF] hover:text-[#0F1A48] text-white border border-[#0F1A48] transition-all cursor-pointer shadow-md hover:scale-105"
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
