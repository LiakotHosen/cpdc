import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings, getDoctor } from '@/lib/data/api';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact & Google Map | Care Point Dental Clinic Ashulia',
  description: 'Find Care Point Dental Clinic at 2nd Floor, Mofizuddin Tower, Pollibidyut, Ashulia, Savar. Contact Dr. Aktar Zahan Ony via phone +880 1324-558811 or WhatsApp.',
};

export default async function ContactPage() {
  const [settings, doctor] = await Promise.all([
    getSiteSettings(),
    getDoctor(),
  ]);

  return <ContactClient settings={settings} doctor={doctor} />;
}
