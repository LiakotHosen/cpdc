'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { VideoReel, GalleryItem } from '@/lib/types';
import { VideoReelsSection } from '@/components/home/VideoReelsSection';
import { Video, Image as ImageIcon, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface GalleryClientProps {
  reels: VideoReel[];
  galleryItems: GalleryItem[];
}

export function GalleryClient({ reels, galleryItems }: GalleryClientProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'reels' | 'photos'>('all');

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-navy-primary text-white py-14 lg:py-18 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-ash-light border border-white/10 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('Authentic Media', 'ক্লিনিক ও চিকিৎসার ভিডিও')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {t('Clinic Gallery & Video Reels', 'ভিডিও রিলস ও ছবির গ্যালারি')}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              {t(
                'Explore our sterile clinical environment, modern equipment, digital RVG diagnostics, and direct Facebook video reels by Dr. Aktar Zahan Ony.',
                'আমাদের আধুনিক চেম্বার, অটোক্লেভ জীবাণুমুক্তকরণ ব্যবস্থা এবং অফিসিয়াল ফেসবুক পেজের রিলস ও শিক্ষণীয় ভিডিওসমূহ দেখুন।'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-navy-primary text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {t('All Media', 'সকল মিডিয়া')}
          </button>
          <button
            onClick={() => setActiveTab('reels')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reels'
                ? 'bg-navy-primary text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{t('Facebook Reels', 'ফেসবুক রিলস')} ({reels.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'photos'
                ? 'bg-navy-primary text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{t('Clinic Photos', 'ক্লিনিক ও যন্ত্রপাতি')}</span>
          </button>
        </div>

        {/* Video Reels Section */}
        {(activeTab === 'all' || activeTab === 'reels') && (
          <div className="mt-6 mb-12">
            <div className="mb-4">
              <h2 className="text-xl font-extrabold text-navy-primary">
                {t('Facebook Video Reels', 'অফিসিয়াল ফেসবুক ভিডিও রিলস')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('Click any reel to watch patient procedures and oral health guidance.', 'চিকিৎসা পদ্ধতি ও স্বাস্থ্য পরামর্শ দেখতে যেকোনো রিলসে ক্লিক করুন।')}
              </p>
            </div>
            <VideoReelsSection reels={reels} fullGalleryMode={true} />
          </div>
        )}

        {/* Photos Section */}
        {(activeTab === 'all' || activeTab === 'photos') && (
          <div className="mt-8 mb-16">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-navy-primary">
                {t('Chamber & Equipment Photos', 'চেম্বার ও আধুনিক যন্ত্রপাতি')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('Hospital-grade hygiene, digital RVG sensor, dental chair and sterile instruments.', 'হাসপাতাল গ্রেড পরিবেশ, ডিজিটাল আরভিজি সেন্সর ও ডেন্টাল চেয়ার।')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.length > 0 ? (
                galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all group"
                  >
                    <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                      <Image
                        src={item.image_url}
                        alt={t(item.title_en, item.title_bn)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-navy-primary">
                        {t(item.title_en, item.title_bn)}
                      </h3>
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider block mt-1">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                /* Fallback photos when database has no custom gallery images */
                <>
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs p-4 space-y-3">
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                      <div className="text-center p-6 space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 text-navy-primary flex items-center justify-center font-black text-xl shadow-xs">
                          CP
                        </div>
                        <h4 className="text-xs font-bold text-navy-primary">Care Point Dental Clinic</h4>
                        <span className="text-[11px] text-slate-500 block">আশুলিয়া ও সাভারের আধুনিক ডেন্টাল কেয়ার</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-primary">
                        {t('Clinical Sterilization & Care Center', 'আধুনিক চিকিৎসা ও জীবাণুমুক্ত পরিবেশ')}
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        {t('Ashulia, Savar', 'পল্লীবিদ্যুৎ, আশুলিয়া')}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs p-4 space-y-3">
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100">
                      <Image
                        src="/images/logo.jpeg"
                        alt="Care Point Dental Clinic Brand"
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-primary">
                        {t('Care Point Dental Clinic Identity', 'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক প্রতীক')}
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        {t('Ashulia, Savar', 'পল্লীবিদ্যুৎ, আশুলিয়া')}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
