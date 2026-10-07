'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { Phone, Calendar, Menu, X, Globe, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { TopAnnouncementBar } from '@/components/layout/TopAnnouncementBar';

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
      {/* Top Interactive Announcement & Notice Bar */}
      <TopAnnouncementBar />

      {/* Main Modern Clean Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8FAFC]/95 backdrop-blur-md shadow-sm py-2 border-b border-slate-200'
            : 'bg-[#F8FAFC] py-3 border-b border-slate-200/60'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mx-auto flex items-center justify-between">
          
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
                      ? 'bg-[#EEF2FF] text-[#0F1A48] font-bold shadow-2xs'
                      : 'text-[#0F1A48] hover:text-[#0F1A48] hover:bg-[#EEF2FF]'
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#0F1A48] text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title={lang === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#0F1A48]" />
              <span className={lang === 'bn' ? 'font-extrabold text-[#0F1A48]' : 'text-[#0F1A48]/80'}>
                {lang === 'bn' ? 'বাংলা' : 'EN'}
              </span>
            </button>

            {/* Quick Phone Call Pill */}
            <a
              href="tel:+8801324558811"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0F1A48] bg-[#EEF2FF] hover:bg-[#EEF2FF]/80 transition-colors shadow-2xs border border-[#0F1A48]/10"
              title="Call Chamber Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F1A48]" />
              <span>01324-558811</span>
            </a>

            {/* Appointment CTA Button */}
            <button
              onClick={() => openBooking()}
              className="hidden sm:flex items-center gap-2 px-4.5 py-2 bg-[#0F1A48] hover:bg-[#EEF2FF] hover:text-[#0F1A48] text-white border border-[#0F1A48] rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-amber-300 group-hover:text-[#0F1A48] transition-colors" />
              <span>{t('Book Serial', 'সিরিয়াল নিন')}</span>
            </button>

            {/* Mobile Menu Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#0F1A48] hover:bg-[#EEF2FF] transition-colors"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#0F1A48]" /> : <Menu className="w-6 h-6 text-[#0F1A48]" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F8FAFC] border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
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
                        ? 'bg-[#EEF2FF] text-[#0F1A48] font-bold'
                        : 'text-[#0F1A48] hover:bg-[#EEF2FF] hover:text-[#0F1A48]'
                    }`}
                  >
                    <span>{t(link.label_en, link.label_bn)}</span>
                    <ChevronRight className="w-4 h-4 text-[#0F1A48]/50" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full py-3 bg-[#0F1A48] hover:bg-[#EEF2FF] hover:text-[#0F1A48] text-white border border-[#0F1A48] rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all group"
              >
                <Calendar className="w-4 h-4 text-amber-300 group-hover:text-[#0F1A48]" />
                <span>{t('Book Doctor Appointment', 'সিরিয়াল / অ্যাপয়েন্টমেন্ট নিন')}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+8801324558811"
                  className="py-2.5 px-3 bg-[#EEF2FF] hover:bg-[#EEF2FF]/80 text-[#0F1A48] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0F1A48]" />
                  <span>Call 01324-558811</span>
                </a>
                <a
                  href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
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
