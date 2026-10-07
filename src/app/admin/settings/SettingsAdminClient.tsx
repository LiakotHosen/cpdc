'use client';

import React, { useState } from 'react';
import { SiteSettings } from '@/lib/types';
import { updateSiteSettings } from '@/lib/data/api';
import {
  Settings,
  Save,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface SettingsAdminClientProps {
  initialSettings: SiteSettings;
}

export function SettingsAdminClient({ initialSettings }: SettingsAdminClientProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateSiteSettings(settings);
      setSettings(updated);
      setSuccessMsg('Clinic settings updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Clinic Settings & Contact Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Control phone numbers, WhatsApp, floor number, hours, and hero headlines globally.
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
        {/* Contact Numbers Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-navy-primary flex items-center gap-2">
            <Phone className="w-4 h-4 text-navy-primary" />
            <span>Contact Hotlines & Messaging</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Primary Phone *
              </label>
              <input
                type="text"
                required
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+880 1324-558811"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                WhatsApp Number *
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="+880 1324-558811"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Emergency Email
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="carepointoraldental@gmail.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Addresses & Floor Confirmation Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-navy-primary flex items-center gap-2">
            <MapPin className="w-4 h-4 text-navy-primary" />
            <span>Chamber Address & Location (English & Bangla)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Full Address (English) *
              </label>
              <textarea
                rows={3}
                required
                value={settings.address_en || ''}
                onChange={(e) => setSettings({ ...settings, address_en: e.target.value })}
                placeholder="2nd Floor, Mofizuddin Tower, Pollibidyut, Ashulia, Savar"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                সম্পূর্ণ ঠিকানা (বাংলা) *
              </label>
              <textarea
                rows={3}
                required
                value={settings.address_bn || ''}
                onChange={(e) => setSettings({ ...settings, address_bn: e.target.value })}
                placeholder="২য় তলা, মফিজ উদ্দিন টাওয়ার, পল্লীবিদ্যুৎ বাস স্ট্যান্ড, আশুলিয়া, সাভার"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Google Maps Link
              </label>
              <input
                type="text"
                value={settings.google_maps_url || ''}
                onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                placeholder="https://maps.app.goo.gl/..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Google Review URL (for QR code)
              </label>
              <input
                type="text"
                value={settings.google_review_url || ''}
                onChange={(e) => setSettings({ ...settings, google_review_url: e.target.value })}
                placeholder="https://search.google.com/local/writereview?placeid=..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Consulting Hours */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-navy-primary flex items-center gap-2">
            <Clock className="w-4 h-4 text-navy-primary" />
            <span>Clinic Hours (English & Bangla)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Hours (English) *
              </label>
              <input
                type="text"
                required
                value={settings.hours_en || ''}
                onChange={(e) => setSettings({ ...settings, hours_en: e.target.value })}
                placeholder="Daily: 4:00 PM – 9:00 PM"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                রোগী দেখার সময় (বাংলা) *
              </label>
              <input
                type="text"
                required
                value={settings.hours_bn || ''}
                onChange={(e) => setSettings({ ...settings, hours_bn: e.target.value })}
                placeholder="প্রতিদিন বিকাল ৪:০০ – রাত ৯:০০"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Hero Copy Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-navy-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Home Page Hero Copy</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Hero Headline (English)
              </label>
              <input
                type="text"
                value={settings.hero_headline_en || ''}
                onChange={(e) => setSettings({ ...settings, hero_headline_en: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                মূল শিরোনাম (বাংলা)
              </label>
              <input
                type="text"
                value={settings.hero_headline_bn || ''}
                onChange={(e) => setSettings({ ...settings, hero_headline_bn: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Hero Subheadline (English)
              </label>
              <textarea
                rows={2}
                value={settings.hero_subheadline_en || ''}
                onChange={(e) => setSettings({ ...settings, hero_subheadline_en: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                উপ-শিরোনাম (বাংলা)
              </label>
              <textarea
                rows={2}
                value={settings.hero_subheadline_bn || ''}
                onChange={(e) => setSettings({ ...settings, hero_subheadline_bn: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-navy-primary hover:bg-navy-light text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Settings...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
