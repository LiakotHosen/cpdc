import React from 'react';
import { Metadata } from 'next';
import { getAnnouncements } from '@/lib/data/api';
import { AnnouncementsAdminClient } from './AnnouncementsAdminClient';

export const metadata: Metadata = {
  title: 'Top Bar Notices & Offers | Care Point Dental Admin',
};

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements();
  return <AnnouncementsAdminClient initialAnnouncements={announcements} />;
}
