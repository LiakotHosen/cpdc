import React from 'react';
import { Metadata } from 'next';
import {
  getAppointments,
  getServices,
  getCategories,
  getVideoReels,
  getBlogPosts,
  getSiteSettings,
  getDoctor,
} from '@/lib/data/api';
import { DashboardClient } from './DashboardClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Care Point Dental Clinic',
};

export default async function AdminDashboardPage() {
  const [
    appointments,
    services,
    categories,
    reels,
    blogs,
    settings,
    doctor,
  ] = await Promise.all([
    getAppointments(),
    getServices(),
    getCategories(),
    getVideoReels(),
    getBlogPosts(),
    getSiteSettings(),
    getDoctor(),
  ]);

  return (
    <DashboardClient
      initialAppointments={appointments}
      servicesCount={services.length}
      categoriesCount={categories.length}
      reelsCount={reels.length}
      blogsCount={blogs.length}
      settings={settings}
      doctor={doctor}
    />
  );
}
