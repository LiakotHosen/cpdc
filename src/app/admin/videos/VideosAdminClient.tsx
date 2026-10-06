'use client';

import React, { useState } from 'react';
import { VideoReel } from '@/lib/types';
import { saveVideoReel, deleteVideoReel } from '@/lib/data/api';
import {
  Video,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle,
  Save,
  X,
  Play,
  Upload,
  Clock,
  Sparkles,
  HelpCircle,
  Eye,
  ArrowRight,
  Search,
  LayoutGrid,
  List,
} from 'lucide-react';

interface VideosAdminClientProps {
  initialReels: VideoReel[];
}

export function VideosAdminClient({ initialReels }: VideosAdminClientProps) {
  const [reels, setReels] = useState<VideoReel[]>(initialReels);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllReelsModalOpen, setIsAllReelsModalOpen] = useState(false);
  const [editingReel, setEditingReel] = useState<Partial<VideoReel> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  // Search & view mode for the "See All" directory modal
  const [searchQuery, setSearchQuery] = useState('');
  const [allViewMode, setAllViewMode] = useState<'grid' | 'table'>('table');

  // Limit number of reels shown directly on the main admin page to 3
  const DISPLAY_LIMIT = 3;
  const frontReels = reels.slice(0, DISPLAY_LIMIT);

  // Helper to clean and format Facebook URLs
  const cleanUrl = (url: string): string => {
    if (!url) return '';
    return url.trim().replace('web.facebook.com', 'www.facebook.com').replace('m.facebook.com', 'www.facebook.com');
  };

  const openCreateModal = () => {
    setEditingReel({
      title_en: '',
      title_bn: '',
      description_en: '',
      description_bn: '',
      reel_url: 'https://www.facebook.com/reel/',
      video_url: 'https://www.facebook.com/reel/',
      thumbnail_url: '',
      duration: '1:00',
      is_featured: true,
      category: 'Treatment',
      sort_order: reels.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (r: VideoReel) => {
    setEditingReel({ ...r });
    setIsModalOpen(true);
  };

  // Handle local thumbnail image upload (converts to base64 data URL)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('ইমেজ সাইজ ৩ মেগাবাইট (3MB)-এর কম রাখুন।');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result && editingReel) {
        setEditingReel({
          ...editingReel,
          thumbnail_url: result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReel) return;

    const normalizedUrl = cleanUrl(editingReel.video_url || editingReel.reel_url || '');

    const payload: Partial<VideoReel> = {
      ...editingReel,
      reel_url: normalizedUrl,
      video_url: normalizedUrl,
      thumbnail_url: editingReel.thumbnail_url || (editingReel.id ? `/images/reels/${editingReel.id}.jpg` : '/images/logo.jpeg'),
      duration: editingReel.duration || '1:00',
      category: editingReel.category || 'Treatment',
      sort_order: Number(editingReel.sort_order) || (reels.length + 1),
      is_featured: editingReel.is_featured ?? true,
    };

    setSaving(true);
    try {
      const saved = await saveVideoReel(payload);
      setReels((prev) => {
        const exists = prev.some((r) => r.id === saved.id);
        if (exists) {
          return prev.map((r) => (r.id === saved.id ? saved : r));
        }
        return [...prev, saved];
      });
      setIsModalOpen(false);
      setEditingReel(null);
      setSuccessMsg('ভিডিও রিলটি সফলভাবে সংরক্ষণ করা হয়েছে! (Video reel saved successfully)');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to save reel:', err);
      alert('সংরক্ষণে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video reel? (এই রিলটি কি সত্যিই ডিলিট করতে চান?)')) return;
    try {
      await deleteVideoReel(id);
      setReels((prev) => prev.filter((r) => r.id !== id));
      setSuccessMsg('Video reel deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered list for "See All" modal
  const filteredReels = reels.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.title_bn?.toLowerCase().includes(q) ||
      r.title_en?.toLowerCase().includes(q) ||
      r.category?.toLowerCase().includes(q) ||
      r.id?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Video className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-navy-primary tracking-tight">
              Facebook Reels & Videos
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            ডাক্তারের নতুন ফেসবুক রিলস ও চিকিৎসা ভিডিও যোগ করুন, সম্পাদনা করুন বা ক্রমানুসার সাজান।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>{showGuide ? 'গাইড লুকান' : 'কীভাবে যোগ করবেন?'}</span>
          </button>

          <button
            onClick={() => setIsAllReelsModalOpen(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>See All Reels ({reels.length})</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Video Reel</span>
          </button>
        </div>
      </div>

      {/* Step-by-Step Instructions Card */}
      {showGuide && (
        <div className="p-5 bg-[#EEF2FF] border border-[#0F1A48]/15 rounded-2xl shadow-2xs space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>নতুন ফেসবুক রিলস যোগ করার সহজ ধাপসমূহ (3 Easy Steps)</span>
            </h3>
            <button
              onClick={() => setShowGuide(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700 pt-1">
            <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-1">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold inline-flex items-center justify-center text-[10px]">
                ১
              </span>
              <p className="font-bold text-navy-primary">ফেসবুক থেকে লিংক কপি করুন</p>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                ফেসবুকে ডক্টরের রিল বা ভিডিওতে গিয়ে <strong>Share</strong> চাপুন এবং <strong>&quot;Copy link&quot;</strong> করুন।
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-1">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold inline-flex items-center justify-center text-[10px]">
                ২
              </span>
              <p className="font-bold text-navy-primary">Add New Video Reel চাপুন</p>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                কপিকৃত লিংকটি পেস্ট করুন, বাংলা ও ইংরেজি আকর্ষণীয় শিরোনাম দিন এবং ভিডিওর সময়কাল (যেমন: 1:10) লিখুন।
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-1">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold inline-flex items-center justify-center text-[10px]">
                ৩
              </span>
              <p className="font-bold text-navy-primary">থাম্বনেইল ছবি ও সেভ</p>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                ভিডিওটির একটি আকর্ষণীয় স্ক্রিনশট বা ছবি আপলোড করুন এবং <strong>Save Reel</strong> চাপুন। স্বয়ংক্রিয়ভাবে ওয়েবসাইটে যুক্ত হবে!
              </p>
            </div>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Front Section: Latest 3 Video Reels */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-navy-primary tracking-tight">
              Recent Video Reels (সর্বশেষ ৩টি রিল)
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
              {frontReels.length} of {reels.length}
            </span>
          </div>

          <button
            onClick={() => setIsAllReelsModalOpen(true)}
            className="text-xs font-bold text-blue-600 hover:text-navy-primary flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>See All Facebook Reels ({reels.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Front Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {frontReels.map((reel) => {
            const thumb = reel.thumbnail_url || `/images/reels/${reel.id}.jpg`;
            return (
              <div
                key={reel.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-[9/16] w-full bg-slate-950 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumb}
                    alt={reel.title_bn || reel.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/logo.jpeg';
                    }}
                  />

                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-blue-600/90 text-white text-[10px] font-bold shadow-xs">
                      #{reel.sort_order} {reel.category || 'Reel'}
                    </span>
                    {reel.duration && (
                      <span className="px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{reel.duration}</span>
                      </span>
                    )}
                  </div>

                  {/* Homepage Badge */}
                  {reel.is_featured && (
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold shadow-xs flex items-center gap-1 pointer-events-none">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Home</span>
                    </span>
                  )}

                  {/* Bottom Overlay Title */}
                  <div className="absolute bottom-2.5 left-2.5 right-16 text-white pointer-events-none">
                    <h4 className="text-[11px] font-bold line-clamp-2 leading-snug drop-shadow-md">
                      {reel.title_bn || reel.title_en}
                    </h4>
                  </div>
                </div>

                {/* Card Meta & Actions */}
                <div className="p-4 space-y-3 bg-white">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-navy-primary line-clamp-1">
                      {reel.title_en}
                    </h4>
                    <p className="text-[11px] text-slate-600 line-clamp-1">
                      {reel.title_bn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={reel.video_url || reel.reel_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline font-semibold text-[11px]"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Watch FB</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(reel)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-navy-primary hover:bg-slate-100 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(reel.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prominent "See All Facebook Reels" Banner / Trigger */}
      <div className="p-6 bg-[#0F1A48] text-white rounded-3xl shadow-sm border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/20">
            <Video className="w-3.5 h-3.5" />
            <span>মোট {reels.length}টি ফেসবুক রিল সংরক্ষিত রয়েছে</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold">
            সকল রিলস দেখতে ও পরিচালনা করতে চান?
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            এডমিন পেইজের স্ক্রলিং ছোট ও পরিপাটি রাখতে বাকি {Math.max(0, reels.length - DISPLAY_LIMIT)}টি ভিডিও লুকানো রয়েছে। সকল রিল দেখতে ও এডিট করতে বাটনটিতে ক্লিক করুন।
          </p>
        </div>

        <button
          onClick={() => setIsAllReelsModalOpen(true)}
          className="px-5 py-3.5 bg-white hover:bg-blue-50 text-navy-primary font-black rounded-2xl shadow-xl transition-all flex items-center gap-2 text-xs sm:text-sm shrink-0 cursor-pointer hover:scale-102"
        >
          <Eye className="w-4 h-4 text-blue-600" />
          <span>See All Facebook Reels ({reels.length}টি)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* POPUP MODAL: SEE ALL FACEBOOK REELS DIRECTORY & MANAGEMENT                */}
      {/* ========================================================================= */}
      {isAllReelsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
                    <Video className="w-5 h-5" />
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-navy-primary">
                    সকল ফেসবুক রিলস ডিরেক্টরি (All {reels.length} Video Reels)
                  </h2>
                </div>
                <p className="text-xs text-slate-500">
                  সকল ভিডিওর তালিকা, স্ট্যাটাস ও দ্রুত সম্পাদনার জন্য সম্পূর্ণ ডিরেক্টরি ভিউ।
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle: Table / Grid */}
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                  <button
                    onClick={() => setAllViewMode('table')}
                    className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                      allViewMode === 'table'
                        ? 'bg-navy-primary text-white'
                        : 'text-slate-600 hover:text-navy-primary'
                    }`}
                    title="List Table View"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">তালিকা ভিউ</span>
                  </button>
                  <button
                    onClick={() => setAllViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                      allViewMode === 'grid'
                        ? 'bg-navy-primary text-white'
                        : 'text-slate-600 hover:text-navy-primary'
                    }`}
                    title="Card Grid View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">গ্রিড ভিউ</span>
                  </button>
                </div>

                <button
                  onClick={openCreateModal}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Reel</span>
                </button>

                <button
                  onClick={() => setIsAllReelsModalOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="রিলের নাম বা বিষয় লিখে সার্চ করুন..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-navy-primary focus:bg-white transition-all"
                />
              </div>

              <div className="text-xs text-slate-500 font-medium self-start sm:self-auto">
                দেখাচ্ছে: <strong>{filteredReels.length}</strong> / {reels.length} টি রিল
              </div>
            </div>

            {/* Modal Body / Reels Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
              {filteredReels.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <Video className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-sm font-semibold">কোনো রিল খুঁজে পাওয়া যায়নি।</p>
                  <p className="text-xs">সার্চ টার্ম পরিবর্তন করুন অথবা নতুন রিল যোগ করুন।</p>
                </div>
              ) : allViewMode === 'table' ? (
                /* Compact List / Table View (Ideal for managing many videos) */
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-12 text-center">ক্রম</th>
                          <th className="p-3 w-20">থাম্বনেইল</th>
                          <th className="p-3">ভিডিওর শিরোনাম (বাংলা ও ইংরেজি)</th>
                          <th className="p-3 w-28">সময় / ক্যাটাগরি</th>
                          <th className="p-3 w-24 text-center">হোমপেজ</th>
                          <th className="p-3 w-28">ফেসবুক লিংক</th>
                          <th className="p-3 w-24 text-center">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredReels.map((reel) => {
                          const thumb = reel.thumbnail_url || `/images/reels/${reel.id}.jpg`;
                          return (
                            <tr key={reel.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3 text-center font-bold text-slate-400">
                                #{reel.sort_order}
                              </td>

                              <td className="p-3">
                                <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={thumb}
                                    alt={reel.title_bn}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/images/logo.jpeg';
                                    }}
                                  />
                                </div>
                              </td>

                              <td className="p-3 space-y-1">
                                <p className="font-bold text-navy-primary leading-snug">
                                  {reel.title_bn}
                                </p>
                                <p className="text-[11px] text-slate-500 line-clamp-1">
                                  {reel.title_en}
                                </p>
                              </td>

                              <td className="p-3 space-y-1">
                                {reel.duration && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <span>{reel.duration}</span>
                                  </span>
                                )}
                                <span className="block text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit">
                                  {reel.category || 'Treatment'}
                                </span>
                              </td>

                              <td className="p-3 text-center">
                                {reel.is_featured ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                                    <span>সক্রিয়</span>
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-400">
                                    না
                                  </span>
                                )}
                              </td>

                              <td className="p-3">
                                <a
                                  href={reel.video_url || reel.reel_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold text-[11px]"
                                >
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>ফেসবুকে দেখুন</span>
                                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                                </a>
                              </td>

                              <td className="p-3 text-center">
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    onClick={() => openEditModal(reel)}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-navy-primary hover:bg-slate-100 cursor-pointer"
                                    title="Edit"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(reel.id)}
                                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Card Grid View inside the Modal */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredReels.map((reel) => {
                    const thumb = reel.thumbnail_url || `/images/reels/${reel.id}.jpg`;
                    return (
                      <div
                        key={reel.id}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        <div className="relative aspect-[9/16] w-full bg-slate-950 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={thumb}
                            alt={reel.title_bn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/logo.jpeg';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                            <span className="px-2 py-0.5 rounded-md bg-blue-600/90 text-white text-[10px] font-bold">
                              #{reel.sort_order}
                            </span>
                            {reel.duration && (
                              <span className="px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-medium">
                                {reel.duration}
                              </span>
                            )}
                          </div>

                          <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                            <h4 className="text-[11px] font-bold line-clamp-2 leading-snug">
                              {reel.title_bn}
                            </h4>
                          </div>
                        </div>

                        <div className="p-3 bg-white flex items-center justify-between text-xs border-t border-slate-100">
                          <a
                            href={reel.video_url || reel.reel_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-semibold text-[11px] flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Play</span>
                          </a>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditModal(reel)}
                              className="p-1 rounded-lg text-slate-500 hover:text-navy-primary hover:bg-slate-100 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(reel.id)}
                              className="p-1 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                মোট সংরক্ষিত রিলস: <strong>{reels.length}টি</strong>
              </span>

              <button
                onClick={() => setIsAllReelsModalOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl cursor-pointer transition-colors"
              >
                বন্ধ করুন (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD / EDIT REEL MODAL                                                     */}
      {/* ========================================================================= */}
      {isModalOpen && editingReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <Video className="w-5 h-5" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-navy-primary">
                  {editingReel.id ? 'Edit Facebook Video Reel' : 'Add New Facebook Video Reel'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Facebook Reel URL */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Facebook Reel URL / Link *
                </label>
                <input
                  type="url"
                  required
                  value={editingReel.video_url || ''}
                  onChange={(e) =>
                    setEditingReel({
                      ...editingReel,
                      video_url: e.target.value,
                      reel_url: e.target.value,
                    })
                  }
                  placeholder="https://www.facebook.com/reel/1857864901861958"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:border-navy-primary text-xs"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  💡 ফেসবুক অ্যাপ বা পেজ থেকে &quot;Copy link&quot; করে সরাসরি এখানে পেস্ট করুন।
                </p>
              </div>

              {/* Bangla Title */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  ভিডিওর শিরোনাম (বাংলা) *
                </label>
                <input
                  type="text"
                  required
                  value={editingReel.title_bn || ''}
                  onChange={(e) =>
                    setEditingReel({ ...editingReel, title_bn: e.target.value })
                  }
                  placeholder="যেমন: কম খরচে হাফ-বেকড রুট ক্যানেল বনাম পারফেক্ট চিকিৎসা"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:border-navy-primary text-xs"
                />
              </div>

              {/* English Title */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={editingReel.title_en || ''}
                  onChange={(e) =>
                    setEditingReel({ ...editingReel, title_en: e.target.value })
                  }
                  placeholder="e.g. Root Canal Quality: Low-Cost vs Complete Treatment"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:border-navy-primary text-xs"
                />
              </div>

              {/* Duration & Category & Sort Order */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    সময়সীমা (Duration)
                  </label>
                  <input
                    type="text"
                    value={editingReel.duration || ''}
                    onChange={(e) =>
                      setEditingReel({ ...editingReel, duration: e.target.value })
                    }
                    placeholder="1:05"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    ক্যাটাগরি ট্যাগ
                  </label>
                  <input
                    type="text"
                    value={editingReel.category || ''}
                    onChange={(e) =>
                      setEditingReel({ ...editingReel, category: e.target.value })
                    }
                    placeholder="Treatment"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    ক্রমিক নং (Order)
                  </label>
                  <input
                    type="number"
                    value={editingReel.sort_order || 1}
                    onChange={(e) =>
                      setEditingReel({
                        ...editingReel,
                        sort_order: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Thumbnail Image Picker / Upload */}
              <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <label className="block font-bold text-slate-800">
                  থাম্বনেইল কাভার ছবি (Video Cover / Poster)
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <label className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl cursor-pointer font-bold text-navy-primary flex items-center gap-1.5 shadow-2xs text-[11px] shrink-0">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>ছবি আপলোড করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <span className="text-[10px] text-slate-500">বা ইমেজ লিংক দিন:</span>

                  <input
                    type="text"
                    value={editingReel.thumbnail_url || ''}
                    onChange={(e) =>
                      setEditingReel({ ...editingReel, thumbnail_url: e.target.value })
                    }
                    placeholder="/images/reels/reel-1.jpg বা https://..."
                    className="flex-1 w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                {editingReel.thumbnail_url && (
                  <div className="pt-2 flex items-center gap-3">
                    <div className="relative w-14 h-24 bg-slate-900 rounded-lg overflow-hidden border border-slate-300 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editingReel.thumbnail_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      ✓ থাম্বনেইল প্রিভিউ সক্রিয়
                    </span>
                  </div>
                )}
              </div>

              {/* Featured on Home Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredReel"
                  checked={editingReel.is_featured ?? true}
                  onChange={(e) =>
                    setEditingReel({ ...editingReel, is_featured: e.target.checked })
                  }
                  className="rounded text-navy-primary cursor-pointer w-4 h-4"
                />
                <label htmlFor="featuredReel" className="font-semibold text-slate-700 cursor-pointer">
                  হোমপেজের ভিডিও সেকশনে প্রদর্শন করুন (Feature on Homepage)
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl font-bold cursor-pointer text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  বাতিল (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-navy-primary hover:bg-navy-light text-white rounded-xl font-bold cursor-pointer transition-all disabled:opacity-50 flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'Save Reel'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
