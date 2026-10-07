'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { FAQ } from '@/lib/types';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

interface FAQClientProps {
  faqs: FAQ[];
}

export function FAQClient({ faqs }: FAQClientProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || 'f1']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(faqs.map((f) => f.category)));
    return ['all', ...cats];
  }, [faqs]);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question_en.toLowerCase().includes(q) ||
        faq.question_bn.toLowerCase().includes(q) ||
        faq.answer_en.toLowerCase().includes(q) ||
        faq.answer_bn.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Banner */}
      <section className="bg-white text-[#0F1A48] py-14 lg:py-18 relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#0F1A48] border border-[#0F1A48]/15 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('Patient Guide & Answers', 'রোগীদের প্রশ্ন ও উত্তর')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F1A48]">
              {t('Frequently Asked Questions', 'সাধারণ জিজ্ঞাসা ও প্রশ্নোত্তর')}
            </h1>
            <p className="text-base sm:text-lg text-[#0F1A48]/80 leading-relaxed font-normal">
              {t(
                'Everything you need to know about dental treatments, pain-free procedures, digital X-rays, sterilization protocols, and consultation appointments.',
                'দাঁতের বিভিন্ন চিকিৎসা, ব্যথামুক্ত পদ্ধতি, ডিজিটাল এক্স-রে, অটোক্লেভ জীবাণুমুক্তকরণ ও সিরিয়াল নেওয়ার নিয়ম সম্পর্কে বিস্তারিত জানুন।'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Search & Filtering */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="relative mb-6">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search your question (e.g., pain, root canal, autoclave)...', 'আপনার প্রশ্ন লিখে খুঁজুন (যেমন: ব্যথা, রুট ক্যানেল, স্কেলিং)...')}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F1A48]/30 focus:border-[#0F1A48] text-[#0F1A48] shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const label =
              cat === 'all'
                ? t('All Questions', 'সকল প্রশ্ন')
                : cat.charAt(0).toUpperCase() + cat.slice(1);

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F1A48] text-white shadow-sm'
                    : 'bg-white hover:bg-[#EEF2FF] text-[#0F1A48] border border-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* FAQs Accordion */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-[#0F1A48]">
              {t('No matching questions found', 'কোনো প্রশ্ন খুঁজে পাওয়া যায়নি')}
            </p>
            <p className="text-xs text-[#0F1A48]/70">
              {t('Feel free to call or WhatsApp us directly with your question.', 'আপনার যেকোনো জিজ্ঞাসায় আমাদের সরাসরি ফোন অথবা হোয়াটসঅ্যাপ করতে পারেন।')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#EEF2FF]/40 transition-colors"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#0F1A48]">
                      {t(faq.question_en, faq.question_bn)}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#0F1A48] text-white' : 'bg-[#EEF2FF] text-[#0F1A48]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#0F1A48]/80 leading-relaxed border-t border-slate-100 bg-[#F8FAFC]">
                      {t(faq.answer_en, faq.answer_bn)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still Have Questions CTA */}
        <div className="mt-14 bg-white text-[#0F1A48] border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F1A48]">
              {t('Still have a dental question?', 'দাঁত নিয়ে আপনার অন্য কোনো জিজ্ঞাসা আছে?')}
            </h3>
            <p className="text-xs sm:text-sm text-[#0F1A48]/80">
              {t(
                'Dr. Aktar Zahan Ony is happy to guide you. Send us a message on WhatsApp or call our chamber.',
                'ডা. আক্তার জাহান অনি আপনার দাঁতের সমস্যা শুনে সঠিক দিকনির্দেশনা দেবেন।'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/8801324558811"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-50 hover:bg-[#25D366] text-emerald-800 hover:text-white border border-emerald-200/80 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 group"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white fill-current transition-colors" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => openBooking()}
              className="px-5 py-2.5 bg-[#0F1A48] hover:bg-[#EEF2FF] text-white hover:text-[#0F1A48] border border-[#0F1A48] rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('Book Serial', 'সিরিয়াল নিন')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
