import React from 'react';
import { Metadata } from 'next';
import { getVideoReels, getGalleryItems } from '@/lib/data/api';
import { GalleryClient } from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery & Facebook Reels | Care Point Dental Clinic Ashulia',
  description: 'Explore video reels of treatments, autoclave sterilization, modern dental clinic infrastructure and patient smiles at Care Point Dental Clinic in Ashulia, Savar.',
};

export default async function GalleryPage() {
  const [reels, galleryItems] = await Promise.all([
    getVideoReels(),
    getGalleryItems(),
  ]);

  return <GalleryClient reels={reels} galleryItems={galleryItems} />;
}
