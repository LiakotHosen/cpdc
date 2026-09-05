'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { VideoReel } from '@/lib/types';
import { Play, ArrowRight, Video, ExternalLink, X, ShieldAlert, Sparkles } from 'lucide-react';

interface VideoReelsSectionProps {
  reels: VideoReel[];
  fullGalleryMode?: boolean;
}

export function VideoReelsSection({ reels, fullGalleryMode = false }: VideoReelsSectionProps) {
  const { lang, t } = useLanguage();
  const [activeReel, setActiveReel] = useState<VideoReel | null>(null);
  const [forceEmbed, setForceEmbed] = useState(false);

  const displayedReels = fullGalleryMode ? reels : reels.slice(0, 4);

  // Helper to normalize Facebook reel / video URLs
  const getCleanFacebookUrl = (reel: VideoReel): string => {
    const raw = reel.video_url || reel.reel_url || '';
    if (raw.includes('1857864901861958')) {
      return 'https://www.facebook.com/carepointdentalclinic/videos/1857864901861958/';
    }
    return raw.replace('web.facebook.com', 'www.facebook.com').replace('m.facebook.com', 'www.facebook.com');
  };

  // Helper to get local poster image fallback
  const getThumbnailSrc = (reel: VideoReel): string => {
    if (reel.thumbnail_url && reel.thumbnail_url.startsWith('/')) {
      return reel.thumbnail_url;
    }
    return `/images/reels/${reel.id}.jpg`;
  };

  const isRestrictedReel = (reel: VideoReel): boolean => {
    const url = reel.video_url || reel.reel_url || '';
    return reel.id === 'reel-1' || url.includes('1857864901861958');
  };

  const handleOpenReel = (reel: VideoReel) => {
    setActiveReel(reel);
    setForceEmbed(false);
  };

  return (
    <section className={`w-full ${fullGalleryMode ? 'py-6' : 'py-16 lg:py-24 bg-white border-b border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!fullGalleryMode && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200 shadow-2xs">
                <Video className="w-3.5 h-3.5" />
                <span>{t('Authentic Clinic Video Reels', 'ভিডিও গ্যালারি • সরাসরি আমাদের ক্লিনিক থেকে')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-primary tracking-tight">
                {t('Watch Treatments & Clinic Tour Videos', 'চোখে দেখুন আমাদের ক্লিনিক্যাল পরিবেশ ও সফল চিকিৎসার ভিডিও')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {t(
                  'Watch authentic videos of our sterile clinic environment, patient procedures, and doctor advice directly from our official Facebook reels.',
                  'ক্লিনিকের বাস্তব পরিবেশ, শতভাগ অটোক্লেভ জীবাণুমুক্তকরণ প্রক্রিয়া ও অভিজ্ঞ ডেন্টাল সার্জনের চিকিৎসা পরামর্শ সরাসরি ভিডিওতে দেখে নিশ্চিত হোন।'
                )}
              </p>
            </div>

            <Link
              href="/gallery"
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 self-start md:self-auto shadow-2xs hover:shadow-xs"
            >
              <span>{t('View All 8 Facebook Reels', 'সকল ৮টি ফেসবুক রিলস দেখুন')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedReels.map((reel) => {
            const thumbSrc = getThumbnailSrc(reel);
            const directUrl = getCleanFacebookUrl(reel);

            return (
              <div
                key={reel.id}
                className="group relative bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800 hover:border-navy-light/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Reel Video Frame Preview Container with HD Poster */}
                <div
                  className="relative aspect-[9/16] w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center group/card"
                  onClick={() => handleOpenReel(reel)}
                >
                  {/* Real Video Poster Image from Facebook Reel */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbSrc}
                    alt={t(reel.title_en, reel.title_bn)}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for visual polish & text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/50 pointer-events-none" />

                  {/* Centered Glowing Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-navy-primary/90 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover/card:scale-110 group-hover/card:bg-emerald-600 transition-all shadow-xl shadow-black/50">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {reel.duration && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-semibold text-white pointer-events-none">
                      {reel.duration}
                    </span>
                  )}

                  {/* Facebook Reel Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-blue-600/90 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-1 pointer-events-none shadow-xs">
                    <Video className="w-3 h-3" />
                    <span>FB Reel</span>
                  </span>

                  {/* Bottom Title on Cover */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1 pointer-events-none">
                    <h4 className="text-xs font-bold line-clamp-2 leading-snug drop-shadow-md">
                      {t(reel.title_en, reel.title_bn)}
                    </h4>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleOpenReel(reel)}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t('Watch Video', 'ভিডিওটি দেখুন')}</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>

                  <a
                    href={directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Open on Facebook"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Player */}
        {activeReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
              <div className="p-4 bg-slate-800 flex items-center justify-between text-white border-b border-slate-700">
                <span className="text-xs font-bold truncate max-w-[220px]">
                  {t(activeReel.title_en, activeReel.title_bn)}
                </span>
                <button
                  onClick={() => setActiveReel(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Player Body */}
              <div className="relative aspect-[9/16] w-full bg-black flex flex-col items-center justify-center overflow-hidden">
                {isRestrictedReel(activeReel) && !forceEmbed ? (
                  /* Dedicated High-Impact View for Reels with Facebook Audio/Music Restrictions */
                  <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getThumbnailSrc(activeReel)}
                      alt={t(activeReel.title_en, activeReel.title_bn)}
                      className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-xs scale-105 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 pointer-events-none" />

                    {/* Header badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                        <Video className="w-3 h-3" />
                        <span>Facebook Reel</span>
                      </span>
                      {activeReel.duration && (
                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-medium backdrop-blur-xs">
                          {activeReel.duration}
                        </span>
                      )}
                    </div>

                    {/* Center Action */}
                    <div className="relative z-10 text-center space-y-4 my-auto">
                      <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
                        <Play className="w-10 h-10 fill-current translate-x-1" />
                      </div>

                      <div className="space-y-2 max-w-xs mx-auto">
                        <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                          {t(activeReel.title_en, activeReel.title_bn)}
                        </h3>
                        <p className="text-[12px] text-slate-300 leading-relaxed font-normal">
                          {t(
                            'Due to Facebook music copyright protection, this video is best viewed directly on Facebook with full audio.',
                            'ফেসবুকের ব্যাকগ্রাউন্ড মিউজিক পলিসির কারণে সম্পূর্ণ অডিওসহ ভিডিওটি সরাসরি ফেসবুকে দেখার জন্য ওপেন করুন।'
                          )}
                        </p>
                      </div>

                      <div className="pt-2 space-y-2">
                        <a
                          href={getCleanFacebookUrl(activeReel)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all text-xs sm:text-sm"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>{t('Play Directly on Facebook', 'ফেসবুকে সরাসরি ভিডিওটি চালান')}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-80 ml-1" />
                        </a>

                        <button
                          onClick={() => setForceEmbed(true)}
                          className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer py-1 block mx-auto"
                        >
                          {t('Or try loading embed player', 'বা এখানে এমবেড প্লেয়ারে চেষ্টা করুন')}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Interactive Facebook Video Player */
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                      getCleanFacebookUrl(activeReel)
                    )}&show_text=0&width=350&autoplay=1`}
                    width="100%"
                    height="100%"
                    style={{ border: 'none', overflow: 'hidden' }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title={activeReel.title_en}
                  />
                )}
              </div>

              <div className="p-3 bg-slate-800 flex items-center justify-between text-xs">
                <a
                  href={getCleanFacebookUrl(activeReel)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{t('View Directly on Facebook', 'ফেসবুকে সরাসরি দেখুন')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setActiveReel(null)}
                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs cursor-pointer"
                >
                  {t('Close', 'বন্ধ করুন')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
