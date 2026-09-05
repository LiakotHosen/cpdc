'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { Phone, MessageSquare, Calendar, Menu, X, Globe, Clock, MapPin, ChevronRight } from 'lucide-react';

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Simplified and concise navigation as requested by the user
  const navLinks = [
    { href: '/', label_en: 'Home', label_bn: 'হোম' },
    { href: '/about', label_en: 'About', label_bn: 'পরিচিতি' },
    { href: '/services', label_en: 'Treatments', label_bn: 'চিকিৎসাসমূহ' },
    { href: '/gallery', label_en: 'Gallery', label_bn: 'গ্যালারি' },
    { href: '/faq', label_en: 'FAQ', label_bn: 'প্রশ্নোত্তর' },
    { href: '/blog', label_en: 'Blog', label_bn: 'ব্লগ' },
    { href: '/contact', label_en: 'Contact', label_bn: 'যোগাযোগ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification & Quick Emergency Bar */}
      <div className="bg-navy-dark text-slate-300 text-[11.5px] py-1.5 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>
                {t(
                  '2nd Floor, Mofizuddin Tower, Pollibidyut, Ashulia, Savar',
                  '২য় তলা, মফিজ উদ্দিন টাওয়ার (ইউসিবি ব্যাংকের পাশে), পল্লীবিদ্যুৎ, আশুলিয়া, সাভার'
                )}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {t(
                  'Consulting: 4:00 PM – 9:00 PM Daily (Dr. Aktar Zahan Ony)',
                  'রোগী দেখার সময়: প্রতিদিন বিকাল ৪:০০ – রাত ৯:০০ (ডা. আক্তার জাহান অনি)'
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental,%20I%20want%20to%20consult%20Dr.%20Aktar%20Zahan%20Ony"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: +880 1324-558811</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+8801324558811"
              className="flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>01324-558811</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Modern Glassmorphic Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-slate-200'
            : 'bg-white py-3 shadow-xs border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Only (Clean & Perfectly Sized with transparent cropped asset) */}
          <Link
            href="/"
            className="flex items-center focus:outline-none transition-transform hover:opacity-95"
            aria-label="Care Point Dental Clinic Home"
          >
            <div className="relative h-12 sm:h-13 w-40 sm:w-48 flex items-center">
              <Image
                src="/images/logo-clean.png"
                alt="Care Point Dental Clinic"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-navy-tint text-navy-primary font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-navy-primary hover:bg-slate-50'
                  }`}
                >
                  {t(link.label_en, link.label_bn)}
                </Link>
              );
            })}
          </div>

          {/* Right Area: Language Switcher, Hotline & Main Booking CTA */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-navy-primary text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title={lang === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-navy-primary" />
              <span className={lang === 'bn' ? 'font-extrabold text-navy-primary' : 'text-slate-600'}>
                {lang === 'bn' ? 'বাংলা' : 'EN'}
              </span>
            </button>

            {/* Quick Phone Call Pill */}
            <a
              href="tel:+8801324558811"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-navy-primary bg-navy-tint hover:bg-blue-100 transition-colors shadow-2xs"
              title="Call Chamber Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-navy-primary" />
              <span>01324-558811</span>
            </a>

            {/* Glowing Appointment CTA Button */}
            <button
              onClick={() => openBooking()}
              className="hidden sm:flex items-center gap-2 px-4.5 py-2 bg-gradient-to-r from-navy-primary to-navy-light hover:from-navy-dark hover:to-navy-primary text-white rounded-xl text-xs sm:text-sm font-black shadow-md shadow-navy-primary/25 hover:shadow-lg hover:scale-102 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>{t('Book Serial', 'সিরিয়াল নিন')}</span>
            </button>

            {/* Mobile Menu Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-navy-primary" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-navy-tint text-navy-primary font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-navy-primary'
                    }`}
                  >
                    <span>{t(link.label_en, link.label_bn)}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full py-3 bg-gradient-to-r from-navy-primary to-navy-light text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-navy-primary/20"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>{t('Book Doctor Appointment', 'সিরিয়াল / অ্যাপয়েন্টমেন্ট নিন')}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+8801324558811"
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-navy-primary" />
                  <span>Call 01324-558811</span>
                </a>
                <a
                  href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
