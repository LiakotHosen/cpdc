'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Appointment, SiteSettings, Doctor } from '@/lib/types';
import { updateAppointmentStatus } from '@/lib/data/api';
import {
  CalendarCheck,
  Users,
  Clock,
  Stethoscope,
  Video,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface DashboardClientProps {
  initialAppointments: Appointment[];
  servicesCount: number;
  categoriesCount: number;
  reelsCount: number;
  blogsCount: number;
  settings: SiteSettings;
  doctor: Doctor;
}

export function DashboardClient({
  initialAppointments,
  servicesCount,
  categoriesCount,
  reelsCount,
  blogsCount,
  settings,
  doctor,
}: DashboardClientProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;

  const handleStatusChange = async (
    id: string,
    status: 'confirmed' | 'completed' | 'cancelled'
  ) => {
    setUpdatingId(id);
    try {
      const updated = await updateAppointmentStatus(id, status);
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Greeting & Clinic Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Clinic Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Care Point Dental Clinic • Ashulia, Savar • Lead Surgeon: {doctor.name_en} ({doctor.bmdc_reg})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/appointments"
            className="px-4 py-2 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Manage All Bookings</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pending Appointments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pending Serials
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-navy-primary">{pendingCount}</span>
            <span className="text-xs font-medium text-amber-600">Requires Confirmation</span>
          </div>
        </div>

        {/* Total Appointments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Appointments
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-navy-primary flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-navy-primary">{appointments.length}</span>
            <span className="text-xs font-medium text-slate-500">
              {confirmedCount} Confirmed
            </span>
          </div>
        </div>

        {/* Active Treatments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Dental Treatments
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-navy-primary">{servicesCount}</span>
            <span className="text-xs font-medium text-slate-500">
              across {categoriesCount} categories
            </span>
          </div>
        </div>

        {/* Media & Blog */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Content & Media
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-navy-primary">{reelsCount} Reels</span>
            <span className="text-xs font-medium text-slate-500">
              {blogsCount} Blog Posts
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Link
          href="/admin/services"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2 group shadow-2xs transition-all"
        >
          <Stethoscope className="w-5 h-5 mx-auto text-navy-primary group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">Pricing & Services</span>
        </Link>
        <Link
          href="/admin/settings"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2 group shadow-2xs transition-all"
        >
          <Phone className="w-5 h-5 mx-auto text-emerald-600 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">Phone & WhatsApp</span>
        </Link>
        <Link
          href="/admin/doctor"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2 group shadow-2xs transition-all"
        >
          <Users className="w-5 h-5 mx-auto text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">Doctor Profile</span>
        </Link>
        <Link
          href="/admin/videos"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2 group shadow-2xs transition-all"
        >
          <Video className="w-5 h-5 mx-auto text-red-500 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">Facebook Reels</span>
        </Link>
        <Link
          href="/admin/blog"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2 group shadow-2xs transition-all"
        >
          <BookOpen className="w-5 h-5 mx-auto text-purple-600 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">Dental Articles</span>
        </Link>
        <Link
          href="/admin/features"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2 group shadow-2xs transition-all"
        >
          <Sparkles className="w-5 h-5 mx-auto text-amber-500 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">Clinic Features</span>
        </Link>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs space-y-4">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-navy-primary">
              Recent Patient Appointment Requests
            </h2>
            <p className="text-xs text-slate-500">
              Manage patient serials, confirm schedules, or contact them directly.
            </p>
          </div>
          <Link
            href="/admin/appointments"
            className="text-xs font-bold text-navy-primary hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Service / Concern</th>
                <th className="px-5 py-3">Preferred Time</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {appointments.slice(0, 8).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-navy-primary">
                    {app.patient_name}
                  </td>
                  <td className="px-5 py-3.5">
                    <a
                      href={`tel:${app.phone}`}
                      className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{app.phone}</span>
                    </a>
                  </td>
                  <td className="px-5 py-3.5 max-w-[200px] truncate">
                    <span>{app.service_name || 'General Dental Consultation'}</span>
                    {app.estimated_cost && (
                      <span className="block text-[10px] text-amber-700 font-bold">
                        {app.estimated_cost}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-slate-500">
                    <div>{app.preferred_date || 'Next Available'}</div>
                    <div className="text-[10px] text-slate-400">{app.preferred_time || app.preferred_time_slot || 'Chamber Hours'}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        app.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/88${app.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                      {app.status === 'pending' && (
                        <button
                          disabled={updatingId === app.id}
                          onClick={() => handleStatusChange(app.id, 'confirmed')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-all"
                        >
                          Confirm
                        </button>
                      )}
                      {app.status === 'confirmed' && (
                        <button
                          disabled={updatingId === app.id}
                          onClick={() => handleStatusChange(app.id, 'completed')}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-all"
                        >
                          Done
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
