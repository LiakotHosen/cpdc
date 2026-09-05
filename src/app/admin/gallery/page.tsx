import React from 'react';
import { Metadata } from 'next';
import { getGalleryItems } from '@/lib/data/api';
import { GalleryAdminClient } from './GalleryAdminClient';

export const metadata: Metadata = {
  title: 'Gallery Management | Care Point Dental Admin',
};

export default async function AdminGalleryPage() {
  const items = await getGalleryItems();
  return <GalleryAdminClient initialItems={items} />;
}
