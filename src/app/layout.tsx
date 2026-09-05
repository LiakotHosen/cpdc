import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { AppointmentModalProvider } from '@/lib/context/AppointmentModalContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AppointmentModal } from '@/components/booking/AppointmentModal';
import { FloatingActions } from '@/components/ui/FloatingActions';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://carepointdental.com'),
  title: 'Care Point Dental Clinic | Best Dental Surgeon in Ashulia, Savar',
  description: 'Care Point Dental Clinic (কেয়ার পয়েন্ট ডেন্টাল ক্লিনিক) — Advanced, sterile and pain-free dental treatments by Dr. Aktar Zahan Ony (BDS, MPH, JU, BMDC 12990). Digital RVG X-ray, root canal, teeth whitening, zirconia crowns in Pollibidyut, Ashulia, Savar.',
  keywords: [
    'Care Point Dental Clinic',
    'dental clinic in Ashulia Savar',
    'Dr Aktar Zahan Ony',
    'tooth extraction cost in Savar',
    'root canal treatment Ashulia',
    'dental implant Dhaka Savar',
    'scaling and polishing near me',
    'ডেন্টাল ক্লিনিক আশুলিয়া সাভার',
    'দাঁতের ডাক্তার আশুলিয়া'
  ],
  authors: [{ name: 'Dr. Aktar Zahan Ony' }],
  icons: {
    icon: '/images/logo.jpeg',
    shortcut: '/images/logo.jpeg',
    apple: '/images/logo.jpeg'
  },
  openGraph: {
    title: 'Care Point Dental Clinic — Ashulia, Savar',
    description: 'Modern, sterile and pain-free dentistry by Dr. Aktar Zahan Ony. Digital RVG X-ray & transparent pricing.',
    url: 'https://carepointdental.com',
    siteName: 'Care Point Dental Clinic',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Care Point Dental Clinic Ashulia'
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased selection:bg-navy-primary selection:text-white">
        <LanguageProvider>
          <AppointmentModalProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <AppointmentModal />
            <FloatingActions />
          </AppointmentModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
