import React from 'react';
import { Metadata } from 'next';
import { getReviews } from '@/lib/data/api';
import { ReviewsAdminClient } from './ReviewsAdminClient';

export const metadata: Metadata = {
  title: 'Patient Reviews Management | Care Point Dental Admin',
};

export default async function AdminReviewsPage() {
  const reviews = await getReviews();
  return <ReviewsAdminClient initialReviews={reviews} />;
}
