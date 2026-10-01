import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPosts } from '@/lib/data/api';
import { BlogPostClient } from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | Care Point Dental Clinic',
    };
  }

  return {
    title: `${post.title_en} | Care Point Dental Clinic`,
    description: post.excerpt_en,
    keywords: post.target_keywords_en ? post.target_keywords_en.split(', ') : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return <BlogPostClient initialPost={post || null} slug={slug} initialRelatedPosts={relatedPosts} />;
}
