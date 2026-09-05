'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { SiteSettings, Doctor } from '@/lib/types';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  ExternalLink,
  Calendar,
  CheckCircle,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface ContactClientProps {
  settings: SiteSettings;
  doctor: Doctor;
}

export function ContactClient({ settings, doctor }: ContactClientProps) {
  const { lang, t } = useLanguage();
  const { openBooking } = useAppointmentModal();

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate inquiry submission
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', phone: '', message: '' });
      setFormSent(false);
    }, 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-navy-primary text-white py-14 lg:py-18 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {t('Contact & Chamber Location', 'যোগাযোগ ও চেম্বারের ঠিকানা')}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              {t(
                'Visit Dr. Aktar Zahan Ony at Care Point Dental Clinic in Ashulia, Savar. Reach us directly via phone, WhatsApp, or book your serial online.',
                'সাভারের আশুলিয়া পল্লীবিদ্যুৎ চেম্বারে সরাসরি আসুন অথবা যেকোনো তথ্যের জন্য কল ও হোয়াটসঅ্যাপ করুন।'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-xl font-extrabold text-navy-primary">
                {t('Clinic Contact Details', 'চেম্বার যোগাযোগের তথ্য')}
              </h2>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-navy-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    {t('Chamber Address', 'চেম্বারের ঠিকানা')}
                  </span>
                  <p className="text-sm font-semibold text-slate-800">
                    {t(settings.address_en, settings.address_bn)}
                  </p>
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-navy-primary hover:underline pt-1"
                  >
                    <span>{t('Open in Google Maps', 'গুগল ম্যাপে দেখুন')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    {t('Consulting Hours', 'রোগী দেখার সময়')}
                  </span>
                  <p className="text-sm font-semibold text-slate-800">
                    {t(settings.hours_en, settings.hours_bn)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t('Surgeon:', 'সার্জন:')} {t(doctor.name_en, doctor.name_bn)} ({doctor.bmdc_reg})
                  </p>
                </div>
              </div>

              {/* Phone Lines */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    {t('Direct Hotlines', 'সরাসরি হটলাইন')}
                  </span>
                  <p className="text-sm font-bold text-slate-800">
                    <a href={`tel:${settings.phone}`} className="hover:text-navy-primary">
                      {settings.phone}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500">
                    {t('Serial & Dental Emergency Assistance', 'সিরিয়াল ও ডেন্টাল জরুরি পরামর্শ')}
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-emerald-600 hover:underline block"
                  >
                    {settings.whatsapp}
                  </a>
                  <p className="text-xs text-slate-500">
                    {t('Chat directly with clinic reception', 'সরাসরি চেম্বারের সাথে চ্যাট করুন')}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => openBooking()}
                  className="flex-1 py-3 bg-navy-primary hover:bg-navy-light text-white rounded-xl text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('Book Online Serial', 'অনলাইন সিরিয়াল নিন')}</span>
                </button>
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all"
                  title="Official Facebook Page"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Digital Chamber Information Badge */}
            <div className="bg-gradient-to-br from-navy-primary to-navy-dark rounded-3xl border border-navy-light/40 p-6 shadow-md space-y-3 text-white">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <span className="font-bold text-teal-300">
                  {t('Verified Dental Surgeon', 'বিএমডিসি নিবন্ধিত সার্জন')}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                  BMDC: {doctor.bmdc_reg}
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  {t(doctor.name_en, doctor.name_bn)}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {doctor.qualifications_en}
                </p>
              </div>
              <div className="pt-2 text-xs space-y-1 text-slate-200 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('Visiting Hours:', 'রোগী দেখার সময়:')}</span>
                  <span className="font-semibold text-white">৪:০০ – ৯:০০ টা</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('Consultation Fee:', 'পরামর্শ ফি:')}</span>
                  <span className="font-bold text-emerald-300">৳২০০ (নির্দিষ্ট)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map Embed & Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Google Map Section */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-navy-primary">
                    {t('Chamber Map Location', 'গুগল ম্যাপে ক্লিনিকের অবস্থান')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('Pollibidyut Bus Stand / Mofizuddin Tower, Ashulia', 'পল্লীবিদ্যুৎ বাস স্ট্যান্ড / মফিজউদ্দিন টাওয়ার, আশুলিয়া')}
                  </p>
                </div>
                <a
                  href={settings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-blue-50 text-navy-primary hover:bg-blue-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span>{t('Get Directions', 'দিকনির্দেশনা পান')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Interactive iframe embed */}
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.7758368560046!2d90.2882890759082!3d23.902264983159307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e9680327f121%3A0x868c2d1fa34cbaec!2sCare%20Point%20Dental%20Clinic!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Care Point Dental Clinic Location Map"
                />
              </div>
            </div>

            {/* Quick Patient Inquiry Form */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div>
                <h3 className="text-lg font-bold text-navy-primary">
                  {t('Send a Quick Inquiry or Question', 'আপনার মতামত বা জিজ্ঞাসা পাঠান')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t('Our front desk will review and get back to you promptly.', 'আমাদের সাপোর্ট টিম আপনার বার্তা দেখে দ্রুত যোগাযোগ করবে।')}
                </p>
              </div>

              {formSent ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold text-emerald-800">
                    {t('Thank You! Message Received.', 'ধন্যবাদ! আপনার বার্তাটি পৌঁছেছে।')}
                  </p>
                  <p className="text-xs text-emerald-700">
                    {t('We will contact you shortly via phone or WhatsApp.', 'আমরা দ্রুত আপনার ফোন অথবা হোয়াটসঅ্যাপে যোগাযোগ করব।')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('Your Name', 'আপনার নাম')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('e.g. Rafiqul Islam', 'যেমন: মো: রফিকুল ইসলাম')}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('Mobile Number', 'মোবাইল নম্বর')} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Your Question or Dental Issue', 'আপনার সমস্যা বা প্রশ্ন')} *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('Describe your tooth pain or treatment inquiry...', 'আপনার দাঁতের সমস্যা বা প্রশ্ন লিখুন...')}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-navy-primary hover:bg-navy-light text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('Send Message', 'বার্তা পাঠান')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
