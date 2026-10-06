'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, QrCode, ShieldCheck, Heart, Lock } from 'lucide-react';
import QRCode from 'qrcode';

export function Footer() {
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const googleReviewLink = 'https://search.google.com/local/writereview?placeid=carepointdentalclinic';

  useEffect(() => {
    QRCode.toDataURL(googleReviewLink, {
      width: 140,
      margin: 1,
      color: {
        dark: '#0F1A48',
        light: '#FFFFFF'
      }
    }).then(setQrDataUrl).catch(() => {});
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#F8FAFC] text-[#0F1A48] pt-16 pb-12 border-t border-slate-200">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          {/* Column 1: Brand & Doctor info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white p-1 border border-slate-200 shadow-sm">
                <Image
                  src="/images/logo-clean.png"
                  alt="Care Point Dental Clinic"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0F1A48] tracking-tight">CARE POINT</h4>
                <p className="text-xs text-[#0F1A48]/70 uppercase tracking-wider font-semibold">
                  {t('Dental Clinic', 'ডেন্টাল ক্লিনিক')}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#0F1A48]/80 leading-relaxed">
              {t(
                'Comprehensive dental healthcare in Ashulia & Savar. Advanced diagnostics, digital RVG X-ray, autoclave sterilization and painless dentistry by Dr. Aktar Zahan Ony.',
                'আশুলিয়া ও সাভারের বিশ্বস্ত ডেন্টাল ক্লিনিক। ডিজিটাল RVG এক্স-রে, অটোক্লেভ জীবাণুমুক্তকরণ ও ডা. আক্তার জাহান অনির আন্তরিক তত্ত্বাবধানে আধুনিক ব্যথামুক্ত চিকিৎসা।'
              )}
            </p>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs space-y-1 shadow-sm">
              <p className="text-[#0F1A48] font-bold">
                {t('Surgeon: Dr. Aktar Zahan Ony', 'সার্জন: ডা. আক্তার জাহান অনি')}
              </p>
              <p className="text-[#0F1A48]/80 font-medium">
                {t('Oral & Dental Surgeon | BDS, MPH, JU', 'ওরাল এন্ড ডেন্টাল সার্জন | বিডিএস, এমপিএইচ, জেইউ')}
              </p>
              <p className="text-[#0F1A48]/60 text-[11px] font-medium">
                {t('BMDC Reg. No: 12990', 'বিএমডিসি রেজি: ১২৯৯০')}
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links & Services */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-[#0F1A48] uppercase tracking-wider">
              {t('Treatments & Pages', 'জরুরি লিংক ও চিকিৎসা')}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/general-diagnostic" className="text-[#0F1A48]/80 hover:text-[#0F1A48] hover:bg-[#EEF2FF] px-2 py-1 -mx-2 rounded transition-colors inline-block font-medium">
                  {t('General Checkup & Scaling', 'সাধারণ চেকআপ ও স্কেলিং')}
                </Link>
              </li>
              <li>
                <Link href="/services/root-canal" className="text-[#0F1A48]/80 hover:text-[#0F1A48] hover:bg-[#EEF2FF] px-2 py-1 -mx-2 rounded transition-colors inline-block font-medium">
                  {t('Root Canal Treatment (RCT)', 'ব্যথামুক্ত রুট ক্যানেল চিকিৎসা')}
                </Link>
              </li>
              <li>
                <Link href="/services/cosmetic-dentistry" className="text-[#0F1A48]/80 hover:text-[#0F1A48] hover:bg-[#EEF2FF] px-2 py-1 -mx-2 rounded transition-colors inline-block font-medium">
                  {t('Teeth Whitening & Smile Design', 'দাঁত সাদা করা ও স্মাইল ডিজাইন')}
                </Link>
              </li>
              <li>
                <Link href="/services/restorative" className="text-[#0F1A48]/80 hover:text-[#0F1A48] hover:bg-[#EEF2FF] px-2 py-1 -mx-2 rounded transition-colors inline-block font-medium">
                  {t('Zirconia & PFM Crowns / Caps', 'জার্কোনিয়া ও পিএফএম ক্যাপ')}
                </Link>
              </li>
              <li>
                <Link href="/services/oral-surgery" className="text-[#0F1A48]/80 hover:text-[#0F1A48] hover:bg-[#EEF2FF] px-2 py-1 -mx-2 rounded transition-colors inline-block font-medium">
                  {t('Wisdom Tooth & Painless Extraction', 'আক্কেল দাঁত ও ব্যথামুক্ত দাঁত তোলা')}
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-[#0F1A48] hover:bg-[#EEF2FF] px-2 py-1 -mx-2 rounded font-bold transition-colors inline-flex items-center gap-1">
                  <span>{t('Treatment Cost Calculator', 'চিকিৎসা খরচের হিসাব ক্যালকুলেটর')}</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-[#0F1A48] uppercase tracking-wider">
              {t('Contact & Hours', 'চেম্বারের ঠিকানা ও সময়')}
            </h5>
            <div className="space-y-2.5 text-xs text-[#0F1A48]/80 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0F1A48] shrink-0 mt-0.5" />
                <p>
                  {t(
                    '2nd Floor, Mofizuddin Tower, Beside UCB Bank Building, Pollibidyut, Ashulia, Savar, Dhaka 1344',
                    'মফিজ উদ্দিন টাওয়ার (২য় তলা), মোস্তফা হোটেলের উত্তর পাশে স\'মিলের সাথে, ইউসিবি ব্যাংকের পাশে, পল্লীবিদ্যুৎ, আশুলিয়া, সাভার।'
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0F1A48] shrink-0" />
                <p>
                  {t(
                    'Daily: 4:00 PM – 9:00 PM (Call 30 mins prior for morning)',
                    'প্রতিদিন: বিকাল ৪:০০ টা – রাত ৯:০০ টা'
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0F1A48] shrink-0" />
                <a href="tel:+8801324558811" className="text-[#0F1A48] hover:underline font-bold">
                  +880 1324-558811
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0F1A48] shrink-0" />
                <a href="mailto:carepointoraldental@gmail.com" className="hover:underline text-[#0F1A48]/80">
                  carepointoraldental@gmail.com
                </a>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://facebook.com/carepointdentalclinic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#EEF2FF] hover:bg-[#0F1A48] text-[#0F1A48] hover:text-white border border-[#0F1A48]/15 flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Facebook Page"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/8801324558811"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#EEF2FF] hover:bg-[#0F1A48] text-[#0F1A48] hover:text-white border border-[#0F1A48]/15 flex items-center justify-center transition-colors shadow-xs"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Google Review QR Code */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center flex flex-col items-center justify-center space-y-3 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs text-[#0F1A48] font-bold">
              <QrCode className="w-4 h-4 text-[#0F1A48]" />
              <span>{t('Scan to Review on Google', 'গুগলে রিভিউ দিতে স্ক্যান করুন')}</span>
            </div>
            {qrDataUrl && (
              <div className="p-2 bg-[#F8FAFC] border border-slate-200 rounded-xl shadow-xs">
                <img src={qrDataUrl} alt="Scan Google Review QR Code" className="w-24 h-24" />
              </div>
            )}
            <p className="text-[11px] text-[#0F1A48]/70 leading-tight">
              {t(
                'Patients can scan directly with their phone camera to share feedback on Google.',
                'মোবাইল ক্যামেরা দিয়ে স্ক্যান করে সরাসরি গুগলে আপনার মূল্যবান রিভিউ দিন।'
              )}
            </p>
            <button
              onClick={() => openBooking()}
              className="w-full py-2.5 bg-[#0F1A48] hover:bg-[#EEF2FF] text-white hover:text-[#0F1A48] border border-[#0F1A48] rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              {t('Book Online Serial', 'অনলাইন সিরিয়াল নিন')}
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0F1A48]/70">
          <p>© {new Date().getFullYear()} Care Point Dental Clinic. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="hover:text-[#0F1A48] hover:underline font-medium">
              {t('FAQ', 'প্রশ্নোত্তর')}
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#0F1A48] hover:underline font-medium">
              {t('Find Us on Map', 'গুগল ম্যাপ')}
            </Link>
            <span>•</span>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-[#0F1A48] hover:underline font-medium transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>{t('Admin Login', 'অ্যাডমিন প্যানেল')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
