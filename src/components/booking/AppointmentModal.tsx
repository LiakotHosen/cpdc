'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { getServices, createAppointment } from '@/lib/data/api';
import { Service } from '@/lib/types';
import { X, Calendar, Clock, CheckCircle2, AlertCircle, Phone, User, Stethoscope, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const TIME_SLOTS = [
  '04:00 PM - 04:30 PM',
  '04:30 PM - 05:00 PM',
  '05:00 PM - 05:30 PM',
  '05:30 PM - 06:00 PM',
  '06:00 PM - 06:30 PM',
  '06:30 PM - 07:00 PM',
  '07:00 PM - 07:30 PM',
  '07:30 PM - 08:00 PM',
  '08:00 PM - 08:30 PM',
  '08:30 PM - 09:00 PM',
  'Morning Slot (Call 30m prior / সকালের সিরিয়াল)'
];

export function AppointmentModal() {
  const pathname = usePathname();
  const { isOpen, closeBooking, selectedServiceId, selectedServiceName, estimatedPriceRange } = useAppointmentModal();
  const { lang, t } = useLanguage();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const [services, setServices] = useState<Service[]>([]);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState(TIME_SLOTS[0]);
  const [serviceId, setServiceId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getServices().then(setServices);
    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
    }
    if (isOpen) {
      setIsSuccess(false);
      setError('');
    }
  }, [selectedServiceId, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError(t('Please enter patient name', 'রোগীর নাম প্রদান করুন'));
      return;
    }
    if (!phone.trim() || phone.trim().length < 11) {
      setError(t('Please enter a valid 11-digit phone number', 'সঠিক ১১ ডিজিটের ফোন নম্বর লিখুন'));
      return;
    }
    if (!preferredDate) {
      setError(t('Please choose a preferred date', 'তারিখ নির্বাচন করুন'));
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const chosenService = services.find(s => s.id === serviceId);
      const serviceNameDisplay = chosenService
        ? (lang === 'bn' ? chosenService.name_bn : chosenService.name_en)
        : (selectedServiceName || 'General Checkup');

      await createAppointment({
        patient_name: patientName,
        phone: phone.trim(),
        whatsapp: sameAsPhone ? phone.trim() : (whatsapp.trim() || phone.trim()),
        preferred_date: preferredDate,
        preferred_time_slot: preferredTimeSlot,
        service_id: serviceId || undefined,
        service_name: serviceNameDisplay,
        notes: estimatedPriceRange ? `[Estimated: ${estimatedPriceRange}] ${notes}` : notes
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      setIsSubmitting(false);
      setError(t('Failed to submit appointment. Please call directly.', 'সিরিয়াল নিতে সমস্যা হয়েছে। দয়া করে সরাসরি ফোন করুন।'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-navy-primary text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-ash-light bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
              {t('Online Serial Booking', 'অনলাইন সিরিয়াল বুকিং')}
            </span>
            <h3 className="text-xl font-bold">
              {t('Book Doctor Appointment', 'ডাক্তারের সিরিয়াল নিন')}
            </h3>
            <p className="text-xs text-slate-200 mt-0.5">
              {t('Dr. Aktar Zahan Ony (Oral & Dental Surgeon)', 'ডা. আক্তার জাহান অনি (ওরাল এন্ড ডেন্টাল সার্জন)')}
            </p>
          </div>
          <button
            onClick={closeBooking}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-navy-primary">
                {t('Appointment Requested Successfully!', 'আপনার সিরিয়াল রিকোয়েস্ট সফল হয়েছে!')}
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                {t(
                  `Thank you, ${patientName}. Our team will contact you at ${phone} via WhatsApp / Phone shortly to confirm your slot.`,
                  `ধন্যবাদ, ${patientName}। আপনার উল্লেখিত নম্বরে (${phone}) আমাদের ক্লিনিক থেকে কল বা হোয়াটসঅ্যাপে দ্রুত কনফার্ম করা হবে।`
                )}
              </p>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left text-xs space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('Preferred Date:', 'নির্বাচিত তারিখ:')}</span>
                  <span className="font-semibold">{preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('Time Slot:', 'সময়:')}</span>
                  <span className="font-semibold">{preferredTimeSlot}</span>
                </div>
                {estimatedPriceRange && (
                  <div className="flex justify-between text-navy-primary font-bold pt-1 border-t border-slate-200">
                    <span>{t('Calculator Estimate:', 'ক্যালকুলেটর অনুমান:')}</span>
                    <span>{estimatedPriceRange}</span>
                  </div>
                )}
              </div>
              <button
                onClick={closeBooking}
                className="w-full py-3 bg-navy-primary hover:bg-navy-dark text-white rounded-xl font-semibold shadow-md transition-all"
              >
                {t('Close', 'সম্পন্ন')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {estimatedPriceRange && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex items-center justify-between text-emerald-800">
                  <span className="font-medium">
                    {t('Pre-selected Treatment Estimate:', 'নির্বাচিত চিকিৎসার আনুমানিক খরচ:')}
                  </span>
                  <span className="font-bold text-sm bg-emerald-100 px-2 py-0.5 rounded text-emerald-900">
                    {estimatedPriceRange}
                  </span>
                </div>
              )}

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('Patient Full Name *', 'রোগীর পুরো নাম *')}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={t('e.g. Md. Tariqul Islam', 'যেমন: মো. তরিকুল ইসলাম')}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-primary/30 focus:border-navy-primary"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('Phone Number (11 digits) *', 'মোবাইল নম্বর (১১ ডিজিট) *')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-primary/30 focus:border-navy-primary"
                  />
                </div>
              </div>

              {/* WhatsApp Option */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sameWhatsapp"
                  checked={sameAsPhone}
                  onChange={(e) => setSameAsPhone(e.target.checked)}
                  className="rounded text-navy-primary focus:ring-navy-primary"
                />
                <label htmlFor="sameWhatsapp" className="text-xs text-slate-600 cursor-pointer">
                  {t('WhatsApp number is the same as phone', 'হোয়াটসঅ্যাপ নম্বর এই একই নম্বর')}
                </label>
              </div>

              {!sameAsPhone && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('WhatsApp Number', 'হোয়াটসঅ্যাপ নম্বর')}
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+8801XXXXXXXXX"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
                  />
                </div>
              )}

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('Treatment Needed', 'চিকিৎসা বা সেবার ধরন')}
                </label>
                <div className="relative">
                  <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-primary/30 text-slate-800"
                  >
                    <option value="">{t('General Consultation & Checkup', 'সাধারণ পরামর্শ ও চেকআপ')}</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {lang === 'bn' ? s.name_bn : s.name_en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Preferred Date *', 'তারিখ নির্বাচন *')}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Preferred Time *', 'সময় নির্বাচন *')}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={preferredTimeSlot}
                      onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-primary/30 text-slate-800"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('Problem / Symptoms (Optional)', 'সমস্যা বা উপসর্গ (ঐচ্ছিক)')}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('Describe any pain, tooth number, or bleeding...', 'দাঁতে ব্যথা, শিরশিরানি বা মাড়ির কোনো সমস্যা থাকলে লিখুন...')}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-navy-primary hover:bg-navy-dark text-white rounded-xl font-bold text-sm shadow-lg shadow-navy-primary/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{t('Processing...', 'প্রসেসিং হচ্ছে...')}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('Submit Serial Request', 'সিরিয়াল কনফার্ম করুন')}</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  {t('Consulting hours: 4:00 PM – 9:00 PM daily. Emergency? Call +880 1324-558811', 'প্রতিদিন বিকাল ৪:০০ টা – রাত ৯:০০ টা। জরুরি প্রয়োজনে কল: ০১৩২৪-৫৫৮৮১১')}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
