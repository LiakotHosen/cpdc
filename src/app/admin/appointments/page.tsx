import React from 'react';
import { Metadata } from 'next';
import { getAppointments } from '@/lib/data/api';
import { AppointmentsClient } from './AppointmentsClient';

export const metadata: Metadata = {
  title: 'Appointment Ledger | Care Point Dental Admin',
};

export default async function AdminAppointmentsPage() {
  const appointments = await getAppointments();
  return <AppointmentsClient initialAppointments={appointments} />;
}
