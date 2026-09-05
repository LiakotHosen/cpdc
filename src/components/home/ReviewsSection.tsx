'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Review } from '@/lib/types';
import { Star, QrCode, CheckCircle, Quote, ArrowUpRight } from 'lucide-react';
import QRCode from 'qrcode';

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const { lang, t } = useLanguage();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const googleReviewUrl = 'https://search.google.com/local/writereview?placeid=carepointdentalclinic';

  useEffect(() => {
    QRCode.toDataURL(googleReviewUrl, {
      width: 140,
      margin: 1,
      color: {
        dark: '#1B2A6D',
        light: '#FFFFFF'
      }
    }).then(setQrCodeUrl).catch(() => {});
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{t('Patient Reviews & Ratings', 'রোগীদের অভিজ্ঞতা ও মতামত')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-primary tracking-tight">
            {t('Trusted by Patients Across Ashulia & Savar', 'আশুলিয়া ও সাভারের রোগীদের অগাধ বিশ্বাস')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t(
              'Real stories from individuals and families who experienced gentle, sterile, and pain-free treatments at Care Point Dental Clinic.',
              'কেয়ার পয়েন্ট ডেন্টাল ক্লিনিকে যারা ব্যথামুক্ত চিকিৎসা সেবা নিয়েছেন তাদের বাস্তব অভিজ্ঞতা।'
            )}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-slate-300" />

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{t(rev.comment_en, rev.comment_bn)}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {t(rev.patient_name_en, rev.patient_name_bn)}
                  </h4>
                  {rev.treatment_en && (
                    <span className="text-[11px] text-navy-primary font-medium block">
                      {t(rev.treatment_en, rev.treatment_bn || '')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Banner & QR Code Card */}
        <div className="bg-gradient-to-r from-navy-primary via-navy-light to-navy-primary rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full inline-block">
              {t('Google Verified Reviews', 'গুগল ভেরিফায়েড রিভিউ')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              {t('Had a Visit? Share Your Feedback on Google', 'আপনি কি সেবা নিয়েছেন? গুগলে আপনার মতামত দিন')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {t(
                'Your honest feedback helps our community in Ashulia choose quality, sterile healthcare with confidence.',
                'আপনার মূল্যবান রিভিউ স্থানীয় মানুষকে সঠিক ও নিরাপদ চিকিৎসা সেবা বেছে নিতে সাহায্য করবে।'
              )}
            </p>
            <div className="pt-2">
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-navy-primary hover:bg-slate-100 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                <span>{t('Write a Google Review', 'গুগলে রিভিউ লিখুন')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="bg-white/10 border border-white/20 p-4 rounded-2xl flex flex-col items-center text-center space-y-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
              <QrCode className="w-4 h-4" />
              <span>{t('Scan & Review', 'স্ক্যান করে রিভিউ দিন')}</span>
            </div>
            {qrCodeUrl && (
              <div className="p-2 bg-white rounded-xl shadow-md">
                <img src={qrCodeUrl} alt="Google Review QR" className="w-24 h-24" />
              </div>
            )}
            <span className="text-[10px] text-slate-300">Point mobile camera here</span>
          </div>
        </div>
      </div>
    </section>
  );
}
