'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { BlogPost } from '@/lib/types';
import {
  BookOpen,
  Clock,
  Calendar,
  Search,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface BlogClientProps {
  posts: BlogPost[];
}

export function BlogClient({ posts }: BlogClientProps) {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title_en.toLowerCase().includes(q) ||
        p.title_bn.toLowerCase().includes(q) ||
        p.excerpt_en.toLowerCase().includes(q) ||
        p.excerpt_bn.toLowerCase().includes(q) ||
        p.target_keywords_en?.toLowerCase().includes(q) ||
        p.target_keywords_bn?.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-navy-primary text-white py-14 lg:py-18 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-ash-light border border-white/10 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('Doctor-Authored Articles', 'ডাক্তারের লেখা স্বাস্থ্য পরামর্শ')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {t('Dental Health Blog & Advice', 'দাঁতের যত্ন ও সচেতনতামূলক ব্লগ')}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              {t(
                'Explore evidence-based guides on oral hygiene, tooth decay prevention, root canal explanations, and post-treatment dental care from Dr. Aktar Zahan Ony.',
                'দাঁত ও মুখের সঠিক যত্ন, রুট ক্যানেলের প্রয়োজনীয়তা ও ডেন্টাল সুরক্ষায় আধুনিক পরামর্শসমূহ জানুন।'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search articles (e.g. root canal, scaling)...', 'আর্টিকেল খুঁজুন (যেমন: রুট ক্যানেল, স্কেলিং)...')}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-primary/30 focus:border-navy-primary shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-base font-bold text-slate-700">
              {t('No articles found matching your query', 'কোনো আর্টিকেল খুঁজে পাওয়া যায়নি')}
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-navy-primary text-white text-xs font-semibold rounded-lg"
            >
              {t('Clear Search', 'সার্চ মুছুন')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-navy-light/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
                    <Image
                      src={post.cover_image || '/images/logo.jpeg'}
                      alt={t(post.title_en, post.title_bn)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-navy-primary/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{t(post.read_time_en, post.read_time_bn)}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.published_at).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-navy-primary group-hover:text-navy-light transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {t(post.title_en, post.title_bn)}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {t(post.excerpt_en, post.excerpt_bn)}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-primary group-hover:text-navy-light transition-colors"
                  >
                    <span>{t('Read Full Article', 'সম্পূর্ণ পড়ুন')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
