import React from 'react';
import { Metadata } from 'next';
import { getServices, getCategories } from '@/lib/data/api';
import { ServicesAdminClient } from './ServicesAdminClient';

export const metadata: Metadata = {
  title: 'Services & Pricing Management | Care Point Dental Admin',
};

export default async function AdminServicesPage() {
  const [services, categories] = await Promise.all([
    getServices(),
    getCategories(),
  ]);

  return <ServicesAdminClient initialServices={services} categories={categories} />;
}
