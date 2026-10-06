'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Doctor, DoctorTimelineItem } from '@/lib/types';
import { updateDoctor } from '@/lib/data/api';
import { ImageSelector } from '@/components/admin/ImageSelector';
import {
  UserCheck,
  Save,
  CheckCircle,
  Award,
  Clock,
  GraduationCap,
  Briefcase,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';

interface DoctorAdminClientProps {
  initialDoctor: Doctor;
}

export function DoctorAdminClient({ initialDoctor }: DoctorAdminClientProps) {
  const [doctor, setDoctor] = useState<Doctor>(initialDoctor);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const timelineList: DoctorTimelineItem[] = doctor.timeline || [];

  const handleTimelineChange = (
    index: number,
    field: keyof DoctorTimelineItem,
    value: string
  ) => {
    const updated = [...timelineList];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setDoctor({ ...doctor, timeline: updated });
  };

  const handleAddTimelineItem = () => {
    const newItem: DoctorTimelineItem = {
      id: `tl-${Date.now()}`,
      year: '2024',
      degree_en: 'New Degree / Specialization',
      degree_bn: 'নতুন ডিগ্রি বা প্রশিক্ষণ',
      institution_en: 'Institution Name',
      institution_bn: 'প্রতিষ্ঠানের নাম',
      description_en: 'Short description of this academic or clinical milestone.',
      description_bn: 'এই শিক্ষা বা ক্লিনিক্যাল মাইলফলকের সংক্ষিপ্ত বিবরণ।',
      badge_en: 'Certification',
      badge_bn: 'সনদ',
      type: 'education',
    };
    setDoctor({ ...doctor, timeline: [...timelineList, newItem] });
  };

  const handleDeleteTimelineItem = (index: number) => {
    if (confirm('Are you sure you want to delete this timeline milestone?')) {
      const updated = timelineList.filter((_, i) => i !== index);
      setDoctor({ ...doctor, timeline: updated });
    }
  };

  const handleMoveTimelineItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === timelineList.length - 1)
    ) {
      return;
    }
    const updated = [...timelineList];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setDoctor({ ...doctor, timeline: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateDoctor(doctor);
      setDoctor(updated);
      setSuccessMsg('Doctor profile & educational timeline updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Doctor Profile & Educational Timeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage Dr. Aktar Zahan Ony’s photos, cover banner, credentials, consulting hours, and career journey timeline.
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
        {/* Media & Visual Assets */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <h2 className="text-base font-bold text-navy-primary flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-navy-primary" />
            <span>Visual Assets & Hero Media</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageSelector
                label="Doctor Portrait (Hero Shot)"
                value={doctor.photo_url || '/images/doctor-aktar-zahan-ony.webp'}
                onChange={(url) => setDoctor({ ...doctor, photo_url: url })}
                placeholder="/images/doctor-aktar-zahan-ony.webp or https://..."
                helperText="Authentic portrait photo of Dr. Ony at clinic desk with nameplate."
              />
            </div>

            <div>
              <ImageSelector
                label="About Page Clinic Cover Banner (Full-Width)"
                value={doctor.cover_url || '/images/about-clinic-cover.webp'}
                onChange={(url) => setDoctor({ ...doctor, cover_url: url })}
                placeholder="/images/about-clinic-cover.webp or https://..."
                helperText="Widescreen clinic facility cover banner displayed right under hero header."
              />
            </div>
          </div>
        </div>

        {/* Credentials & Registration */}
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
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
                onChange={(e) =>
                  setDoctor({
                    ...doctor,
                    degrees: e.target.value,
                    qualifications_en: e.target.value,
                  })
                }
                placeholder="BDS, MPH (JU)"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Educational Background & Career Milestones Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-navy-primary flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-navy-primary" />
                <span>Educational Background & Professional Journey Timeline</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage degrees, clinical training, registrations, and milestones displayed on the About page.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddTimelineItem}
              className="px-3.5 py-1.5 bg-[#EEF2FF] hover:bg-[#0F1A48] text-[#0F1A48] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#0F1A48]/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Milestone</span>
            </button>
          </div>

          <div className="space-y-4 pt-2">
            {timelineList.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
                No timeline milestones added yet. Click &quot;Add Milestone&quot; to create one.
              </div>
            ) : (
              timelineList.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#0F1A48] text-white text-[10px] font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        Milestone {idx + 1}
                      </span>
                      <select
                        value={item.type || 'education'}
                        onChange={(e) =>
                          handleTimelineChange(
                            idx,
                            'type',
                            e.target.value as 'education' | 'certification' | 'experience'
                          )
                        }
                        className="text-[11px] font-semibold bg-white border border-slate-300 rounded-lg px-2 py-0.5 text-slate-700"
                      >
                        <option value="education">🎓 Education</option>
                        <option value="certification">📜 Certification / License</option>
                        <option value="experience">💼 Clinical Leadership</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveTimelineItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveTimelineItem(idx, 'down')}
                        disabled={idx === timelineList.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTimelineItem(idx)}
                        className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-600 mb-1">
                        Year / Duration
                      </label>
                      <input
                        type="text"
                        value={item.year}
                        onChange={(e) => handleTimelineChange(idx, 'year', e.target.value)}
                        placeholder="e.g. 2014 – 2019"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-600 mb-1">
                        Highlight Badge (EN)
                      </label>
                      <input
                        type="text"
                        value={item.badge_en || ''}
                        onChange={(e) => handleTimelineChange(idx, 'badge_en', e.target.value)}
                        placeholder="e.g. Core Medical Degree"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-600 mb-1">
                        হাইলাইট ব্যাজ (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={item.badge_bn || ''}
                        onChange={(e) => handleTimelineChange(idx, 'badge_bn', e.target.value)}
                        placeholder="e.g. মূল ডিগ্রি"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-600 mb-1">
                        Degree / Milestone Title (EN)
                      </label>
                      <input
                        type="text"
                        value={item.degree_en}
                        onChange={(e) => handleTimelineChange(idx, 'degree_en', e.target.value)}
                        placeholder="Bachelor of Dental Surgery (B.D.S)"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-600 mb-1">
                        ডিগ্রি বা মাইলফলক নাম (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={item.degree_bn}
                        onChange={(e) => handleTimelineChange(idx, 'degree_bn', e.target.value)}
                        placeholder="ব্যাচেলর অব ডেন্টাল সার্জারি (বি.ডি.এস)"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-600 mb-1">
                        Institution / University (EN)
                      </label>
                      <input
                        type="text"
                        value={item.institution_en}
                        onChange={(e) => handleTimelineChange(idx, 'institution_en', e.target.value)}
                        placeholder="Rangpur Dental College, Rajshahi University"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-600 mb-1">
                        প্রতিষ্ঠান বা বিশ্ববিদ্যালয় (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={item.institution_bn}
                        onChange={(e) => handleTimelineChange(idx, 'institution_bn', e.target.value)}
                        placeholder="রংপুর ডেন্টাল কলেজ, রাজশাহী বিশ্ববিদ্যালয়"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-600 mb-1">
                        Description / Details (EN)
                      </label>
                      <textarea
                        rows={2}
                        value={item.description_en}
                        onChange={(e) => handleTimelineChange(idx, 'description_en', e.target.value)}
                        placeholder="Clinical rotations, specializations, skills acquired..."
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-600 mb-1">
                        বিস্তারিত বিবরণ (বাংলা)
                      </label>
                      <textarea
                        rows={2}
                        value={item.description_bn}
                        onChange={(e) => handleTimelineChange(idx, 'description_bn', e.target.value)}
                        placeholder="ক্লিনিক্যাল ট্রেনিং, দক্ষতা ও অর্জন..."
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white text-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-navy-primary hover:bg-navy-light text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Update Doctor Profile & Timeline'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
