import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/data/api';
import { SettingsAdminClient } from './SettingsAdminClient';

export const metadata: Metadata = {
  title: 'Clinic Settings | Care Point Dental Admin',
};

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <SettingsAdminClient initialSettings={settings} />;
}
