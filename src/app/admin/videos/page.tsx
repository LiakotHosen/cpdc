import React from 'react';
import { Metadata } from 'next';
import { getVideoReels } from '@/lib/data/api';
import { VideosAdminClient } from './VideosAdminClient';

export const metadata: Metadata = {
  title: 'Facebook Reels Management | Care Point Dental Admin',
};

export default async function AdminVideosPage() {
  const reels = await getVideoReels();
  return <VideosAdminClient initialReels={reels} />;
}
