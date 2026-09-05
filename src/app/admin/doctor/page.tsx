import React from 'react';
import { Metadata } from 'next';
import { getDoctor } from '@/lib/data/api';
import { DoctorAdminClient } from './DoctorAdminClient';

export const metadata: Metadata = {
  title: 'Doctor Profile Management | Care Point Dental Admin',
};

export default async function AdminDoctorPage() {
  const doctor = await getDoctor();
  return <DoctorAdminClient initialDoctor={doctor} />;
}
