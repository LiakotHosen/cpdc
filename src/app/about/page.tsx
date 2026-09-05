import React from 'react';
import { Metadata } from 'next';
import { getDoctor, getSiteSettings, getFeatures } from '@/lib/data/api';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Care Point Dental Clinic Ashulia',
  description: 'Learn about Care Point Dental Clinic, Dr. Aktar Zahan Ony (BDS, MPH, JU, BMDC 12990), our strict autoclave sterilization protocols, digital RVG X-ray, and patient-first dentistry in Ashulia, Savar.',
};

export default async function AboutPage() {
  const [doctor, settings, features] = await Promise.all([
    getDoctor(),
    getSiteSettings(),
    getFeatures(),
  ]);

  return <AboutClient doctor={doctor} settings={settings} features={features} />;
}
