'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Doctor } from '@/lib/types';
import { updateDoctor } from '@/lib/data/api';
import { UserCheck, Save, CheckCircle, Award, Clock } from 'lucide-react';

interface DoctorAdminClientProps {
  initialDoctor: Doctor;
}

export function DoctorAdminClient({ initialDoctor }: DoctorAdminClientProps) {
  const [doctor, setDoctor] = useState<Doctor>(initialDoctor);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateDoctor(doctor);
      setDoctor(updated);
      setSuccessMsg('Doctor profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Doctor Profile & Credentials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage Dr. Aktar Zahan Ony’s title, qualifications, BMDC registration, and biographies.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-navy-primary flex items-center gap-2">
            <Award className="w-4 h-4 text-navy-primary" />
            <span>Doctor Credentials & Registration</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Doctor Name (English) *
              </label>
              <input
                type="text"
                required
                value={doctor.name_en || ''}
                onChange={(e) => setDoctor({ ...doctor, name_en: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                ডাক্তারের নাম (বাংলা) *
              </label>
              <input
                type="text"
                required
                value={doctor.name_bn || ''}
                onChange={(e) => setDoctor({ ...doctor, name_bn: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Designation / Title (English) *
              </label>
              <input
                type="text"
                required
                value={doctor.title_en || ''}
                onChange={(e) => setDoctor({ ...doctor, title_en: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                পদবি (বাংলা) *
              </label>
              <input
                type="text"
                required
                value={doctor.title_bn || ''}
                onChange={(e) => setDoctor({ ...doctor, title_bn: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Degrees & Qualifications *
              </label>
              <input
                type="text"
                required
                value={doctor.degrees || doctor.qualifications_en || ''}
                onChange={(e) => setDoctor({ ...doctor, degrees: e.target.value, qualifications_en: e.target.value })}
                placeholder="BDS, MPH (JU)"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                BMDC Registration Number *
              </label>
              <input
                type="text"
                required
                value={doctor.bmdc_reg || ''}
                onChange={(e) => setDoctor({ ...doctor, bmdc_reg: e.target.value })}
                placeholder="12990"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Biographies */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-navy-primary">
            Doctor Bio (English & Bengali)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Biography (English)
              </label>
              <textarea
                rows={5}
                value={doctor.bio_en || ''}
                onChange={(e) => setDoctor({ ...doctor, bio_en: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                সংক্ষিপ্ত পরিচিতি (বাংলা)
              </label>
              <textarea
                rows={5}
                value={doctor.bio_bn || ''}
                onChange={(e) => setDoctor({ ...doctor, bio_bn: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Consulting Hours */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-navy-primary flex items-center gap-2">
            <Clock className="w-4 h-4 text-navy-primary" />
            <span>Consulting Hours</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Hours (English)
              </label>
              <input
                type="text"
                value={doctor.consulting_hours_en || ''}
                onChange={(e) => setDoctor({ ...doctor, consulting_hours_en: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                রোগী দেখার সময় (বাংলা)
              </label>
              <input
                type="text"
                value={doctor.consulting_hours_bn || ''}
                onChange={(e) => setDoctor({ ...doctor, consulting_hours_bn: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-navy-primary hover:bg-navy-light text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Update Doctor Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
