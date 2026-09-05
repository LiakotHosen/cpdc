'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { BlogPost } from '@/lib/types';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  CalendarCheck,
  Stethoscope,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const formattedDate = new Date(post.published_at).toLocaleDateString(
    lang === 'bn' ? 'bn-BD' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const content = t(post.content_en, post.content_bn);

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-primary hover:text-navy-light mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('Back to All Articles', 'সকল আর্টিকেলে ফিরে যান')}</span>
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-10 lg:p-12 space-y-8">
          {/* Header */}
          <div className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-navy-primary" />
                <span>{formattedDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-navy-primary" />
                <span>{t(post.read_time_en, post.read_time_bn)}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-primary tracking-tight leading-[1.25]">
              {t(post.title_en, post.title_bn)}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed italic">
              {t(post.excerpt_en, post.excerpt_bn)}
            </p>
          </div>

          {/* Featured Cover Image if any */}
          {post.cover_image && (
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src={post.cover_image}
                alt={t(post.title_en, post.title_bn)}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Body Content */}
          <div className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line font-normal">
            {content}
          </div>

          {/* Keywords / Tags */}
          {(post.target_keywords_en || post.target_keywords_bn) && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-slate-400">
                {t('Keywords:', 'মূল বিষয়সমূহ:')}
              </span>
              {(t(post.target_keywords_en || '', post.target_keywords_bn || '')).split(',').map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                >
                  #{kw.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Doctor Author Card & Serial CTA */}
          <div className="bg-navy-primary text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-ash-light text-xs font-bold">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Dr. Aktar Zahan Ony</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                {t('Experiencing Any Dental Discomfort?', 'দাঁতে ব্যথা বা কোনো সমস্যা অনুভব করছেন?')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200">
                {t(
                  'Early diagnosis prevents tooth loss and costly procedures. Book an appointment today.',
                  'প্রাথমিক অবস্থায় পরীক্ষা করালে জটিলতা ও বাড়তি খরচ এড়িয়ে দাঁত রক্ষা করা সম্ভব।'
                )}
              </p>
            </div>

            <button
              onClick={() => openBooking(undefined, t(post.title_en, post.title_bn))}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow transition-all shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('Book Consultation', 'পরামর্শের জন্য সিরিয়াল')}</span>
            </button>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 space-y-6">
            <h3 className="text-xl font-bold text-navy-primary">
              {t('Other Helpful Articles', 'অন্যান্য গুরুত্বপূর্ণ আর্টিকেল')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-navy-light/40 transition-all block space-y-2 group"
                >
                  <span className="text-[11px] text-slate-400 block">
                    {t(rel.read_time_en, rel.read_time_bn)}
                  </span>
                  <h4 className="text-sm font-bold text-navy-primary group-hover:text-navy-light transition-colors leading-snug">
                    {t(rel.title_en, rel.title_bn)}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {t(rel.excerpt_en, rel.excerpt_bn)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
