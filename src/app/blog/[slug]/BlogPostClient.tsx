'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { BlogPost } from '@/lib/types';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data/api';
import { RichContentRenderer } from '@/components/blog/RichContentRenderer';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CalendarCheck,
  Stethoscope,
  BookOpen,
  Search,
} from 'lucide-react';

interface BlogPostClientProps {
  initialPost?: BlogPost | null;
  slug?: string;
  initialRelatedPosts?: BlogPost[];
  // Backwards compatibility if post was passed directly
  post?: BlogPost;
  relatedPosts?: BlogPost[];
}

export function BlogPostClient({
  initialPost,
  slug,
  initialRelatedPosts = [],
  post: legacyPost,
  relatedPosts: legacyRelated = [],
}: BlogPostClientProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const [post, setPost] = useState<BlogPost | null>(initialPost || legacyPost || null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>(initialRelatedPosts.length > 0 ? initialRelatedPosts : legacyRelated);
  const [loading, setLoading] = useState(!initialPost && !legacyPost);

  useEffect(() => {
    if (!post && slug) {
      getBlogPostBySlug(slug).then((found) => {
        if (found) {
          setPost(found);
        }
        setLoading(false);
      });
      getBlogPosts().then((all) => {
        if (all && all.length > 0) {
          setRelatedPosts(all.filter((p) => p.slug !== slug && p.is_published).slice(0, 3));
        }
      });
    }
  }, [post, slug]);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-navy-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-500">{t('Loading article...', 'আর্টিকেল লোড হচ্ছে...')}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-md w-full shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy-primary">
            {t('Article Not Found', 'আর্টিকেলটি পাওয়া যায়নি')}
          </h2>
          <p className="text-sm text-slate-500">
            {t(
              'The requested article may have been unpublished or removed.',
              'অনুরোধকৃত আর্টিকেলটি প্রকাশিত নয় অথবা সরিয়ে ফেলা হয়েছে।'
            )}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-primary text-white text-xs font-bold hover:bg-navy-light transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('Back to Blog List', 'সকল ব্লগে ফিরে যান')}</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.published_at || Date.now()).toLocaleDateString(
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

            {post.excerpt_en || post.excerpt_bn ? (
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed italic">
                {t(post.excerpt_en, post.excerpt_bn)}
              </p>
            ) : null}
          </div>

          {/* Featured Cover Image if any */}
          {post.cover_image && (
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src={post.cover_image}
                alt={t(post.title_en, post.title_bn)}
                fill
                className="object-cover"
                unoptimized={post.cover_image.startsWith('http')}
              />
            </div>
          )}

          {/* Rich Body Content */}
          <RichContentRenderer content={content} />

          {/* Keywords / Tags */}
          {(post.target_keywords_en || post.target_keywords_bn) && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-slate-400">
                {t('Keywords:', 'মূল বিষয়সমূহ:')}
              </span>
              {t(post.target_keywords_en || '', post.target_keywords_bn || '')
                .split(',')
                .filter(Boolean)
                .map((kw, i) => (
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
