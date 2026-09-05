import React from 'react';
import { Metadata } from 'next';
import { getCategories, getServices } from '@/lib/data/api';
import { ServicesClient } from './ServicesClient';

export const metadata: Metadata = {
  title: 'Dental Treatments & Clinical Care Guide | Care Point Dental Clinic Ashulia',
  description: 'Comprehensive medical guide for all 33+ specialized dental treatments at Care Point Dental Clinic, Ashulia, Savar. Disease causes, procedures by Dr. Aktar Zahan Ony, symptoms & appointment booking.',
};

export default async function ServicesPage() {
  const [categories, services] = await Promise.all([
    getCategories(),
    getServices(),
  ]);

  return <ServicesClient categories={categories} services={services} />;
}
