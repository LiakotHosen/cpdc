import React from 'react';
import { Metadata } from 'next';
import { getFAQs } from '@/lib/data/api';
import { FAQsAdminClient } from './FAQsAdminClient';

export const metadata: Metadata = {
  title: 'FAQ Management | Care Point Dental Admin',
};

export default async function AdminFAQsPage() {
  const faqs = await getFAQs();
  return <FAQsAdminClient initialFAQs={faqs} />;
}
