import React from 'react';
import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/data/api';
import { BlogAdminClient } from './BlogAdminClient';

export const metadata: Metadata = {
  title: 'Blog CMS Management | Care Point Dental Admin',
};

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();
  return <BlogAdminClient initialPosts={posts} />;
}
