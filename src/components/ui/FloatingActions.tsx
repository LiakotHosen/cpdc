'use client';

import { usePathname } from 'next/navigation';
import { useAppointmentModal } from '@/lib/context/AppointmentModalContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Phone, Calendar } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function FloatingActions() {
  const pathname = usePathname();
  const { openBooking } = useAppointmentModal();
  const { t } = useLanguage();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Mobile Book Floating Pill */}
      <button
        onClick={() => openBooking()}
        className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-navy-primary text-white text-xs font-bold rounded-full shadow-2xl border border-white/20 hover:bg-navy-dark transition-all"
        aria-label="Book Appointment"
      >
        <Calendar className="w-4 h-4 text-amber-400" />
        <span>{t('Book Serial', 'সিরিয়াল নিন')}</span>
      </button>

      <div className="flex items-center gap-2.5">
        {/* Phone Call Float */}
        <a
          href="tel:+8801324558811"
          className="w-12 h-12 bg-navy-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-navy-dark hover:scale-105 transition-all"
          title="Call Care Point Dental Hotline: 01324-558811"
          aria-label="Call Doctor"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* WhatsApp Direct Float */}
        <a
          href="https://wa.me/8801324558811?text=Hello%20Care%20Point%20Dental%20Clinic,%20I%20would%20like%20to%20inquire%20about%20dental%20appointment"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all"
          title="Chat on WhatsApp: +880 1324-558811"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          <WhatsAppIcon className="w-6 h-6 fill-white" />
        </a>
      </div>
    </div>
  );
}
