import React from 'react';
import { Metadata } from 'next';
import { getFAQs } from '@/lib/data/api';
import { FAQClient } from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Care Point Dental Clinic',
  description: 'Find answers to common questions about root canal, dental implants, scaling, autoclave sterilization, pricing, and appointments at Care Point Dental Clinic in Ashulia, Savar.',
};

export default async function FAQPage() {
  const faqs = await getFAQs();
  return <FAQClient faqs={faqs} />;
}
