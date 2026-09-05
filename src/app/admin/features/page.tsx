import React from 'react';
import { Metadata } from 'next';
import { getFeatures } from '@/lib/data/api';
import { FeaturesAdminClient } from './FeaturesAdminClient';

export const metadata: Metadata = {
  title: 'Clinic Features Management | Care Point Dental Admin',
};

export default async function AdminFeaturesPage() {
  const features = await getFeatures();
  return <FeaturesAdminClient initialFeatures={features} />;
}
