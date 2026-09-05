import React from 'react';
import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/data/api';
import { BlogClient } from './BlogClient';

export const metadata: Metadata = {
  title: 'Dental Health Blog & Articles | Care Point Dental Clinic',
  description: 'Evidence-based oral healthcare advice, guides on root canal, tooth extraction recovery, brushing techniques, and dental hygiene from Dr. Aktar Zahan Ony in Ashulia, Savar.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogClient posts={posts.filter((p) => p.is_published)} />;
}
