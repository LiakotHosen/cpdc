'use client';

import React, { useState, useMemo } from 'react';
import { Appointment } from '@/lib/types';
import { updateAppointmentStatus } from '@/lib/data/api';
import {
  CalendarCheck,
  Search,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  User,
  Calendar,
  FileText,
} from 'lucide-react';

interface AppointmentsClientProps {
  initialAppointments: Appointment[];
}

export function AppointmentsClient({ initialAppointments }: AppointmentsClientProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return appointments.filter((app) => {
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.patient_name.toLowerCase().includes(q) ||
        app.phone.includes(q) ||
        app.service_name?.toLowerCase().includes(q) ||
        app.notes?.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [appointments, statusFilter, searchQuery]);

  const handleStatusChange = async (
    id: string,
    newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  ) => {
    setLoadingId(id);
    try {
      await updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Patient Appointment Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Total bookings: {appointments.length} | Pending review:{' '}
            <span className="font-bold text-amber-600">
              {appointments.filter((a) => a.status === 'pending').length}
            </span>
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer uppercase tracking-wider ${
                statusFilter === st
                  ? 'bg-navy-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {st} ({st === 'all' ? appointments.length : appointments.filter((a) => a.status === st).length})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient, phone, notes..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-navy-primary/30"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Patient Details</th>
                <th className="px-5 py-3.5">Contact</th>
                <th className="px-5 py-3.5">Service Requested</th>
                <th className="px-5 py-3.5">Preferred Slot</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    No appointment records match the selected filter.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                    onClick={() => setSelectedApp(app)}
                  >
                    <td className="px-5 py-4">
                      <div className="font-bold text-navy-primary text-sm">
                        {app.patient_name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Booked: {new Date(app.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{app.phone}</span>
                        <a
                          href={`tel:${app.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded bg-slate-100 text-slate-600 hover:text-navy-primary"
                          title="Call phone"
                        >
                          <Phone className="w-3 h-3" />
                        </a>
                        <a
                          href={`https://wa.me/88${app.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          title="WhatsApp chat"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-4 max-w-[200px]">
                      <div className="font-semibold text-slate-800 truncate">
                        {app.service_name || 'General Dental Consultation'}
                      </div>
                      {app.estimated_cost && (
                        <div className="text-[11px] text-amber-700 font-bold">
                          Est: {app.estimated_cost}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                      <div>{app.preferred_date || 'Any Date'}</div>
                      <div className="text-[11px] text-slate-400">{app.preferred_time || app.preferred_time_slot || 'Chamber Hours'}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : app.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={app.status}
                        disabled={loadingId === app.id}
                        onChange={(e) =>
                          handleStatusChange(
                            app.id,
                            e.target.value as any
                          )
                        }
                        className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal / Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-navy-primary">
                Appointment Details
              </h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 font-medium block">Patient Name</span>
                  <span className="font-bold text-slate-800 text-base">{selectedApp.patient_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Phone Number</span>
                  <span className="font-bold text-slate-800 text-base">{selectedApp.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Service / Treatments</span>
                <span className="font-bold text-navy-primary">
                  {selectedApp.service_name || 'General Dental Consultation'}
                </span>
                {selectedApp.estimated_cost && (
                  <span className="block text-xs text-amber-700 font-bold mt-0.5">
                    Estimated Cost: {selectedApp.estimated_cost}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 font-medium block">Preferred Date</span>
                  <span className="font-semibold text-slate-700">{selectedApp.preferred_date || 'Flexible'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Preferred Time</span>
                  <span className="font-semibold text-slate-700">{selectedApp.preferred_time || selectedApp.preferred_time_slot || 'Chamber Hours'}</span>
                </div>
              </div>

              {selectedApp.notes && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-slate-400 font-medium block text-xs">Patient Notes / Complaint</span>
                  <p className="text-slate-700">{selectedApp.notes}</p>
                </div>
              )}

              <div className="pt-2">
                <span className="text-slate-400 font-medium block mb-2">Change Status:</span>
                <div className="grid grid-cols-4 gap-2">
                  {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedApp.id, st)}
                      className={`py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                        selectedApp.status === st
                          ? 'bg-navy-primary text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <a
                href={`tel:${selectedApp.phone}`}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Patient</span>
              </a>
              <a
                href={`https://wa.me/88${selectedApp.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
