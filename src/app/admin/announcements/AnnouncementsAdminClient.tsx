'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TopAnnouncement } from '@/lib/types';
import {
  saveAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementActive,
  reorderAnnouncements
} from '@/lib/data/api';
import {
  Megaphone,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  Clock,
  Sparkles,
  Flame,
  ArrowUp,
  ArrowDown,
  X,
  ExternalLink,
  Calendar,
  AlertCircle,
  Tag,
  RefreshCw,
  Check,
  Moon,
  Star,
  Gift,
  Zap,
  Stethoscope,
  Sun,
  ShieldCheck,
  HeartPulse,
  Smile,
  BadgePercent
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

interface AnnouncementsAdminClientProps {
  initialAnnouncements: TopAnnouncement[];
}

interface PresetTemplate {
  id: string;
  category: 'festivals' | 'packages' | 'camps';
  label_bn: string;
  label_en: string;
  tag: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  data: Partial<TopAnnouncement>;
}

const PRESET_TEMPLATES: PresetTemplate[] = [
  // 1. Religious & Festival Occasions
  {
    id: 'ramadan',
    category: 'festivals',
    label_bn: 'পবিত্র মাহে রমজান অফার',
    label_en: 'Holy Ramadan Special',
    tag: 'ধর্মীয় উৎসব',
    Icon: Moon,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50/70 hover:bg-emerald-100/80',
    borderColor: 'border-emerald-200/80',
    data: {
      occasion_en: 'Holy Ramadan Mubarak Special Dental Care Offer',
      occasion_bn: 'পবিত্র মাহে রমজান উপলক্ষে বিশেষ অফার',
      benefit_en: 'Flat 25% Discount on Dental Scaling & Polishing + Free Oral Health Consultation!',
      benefit_bn: 'দাঁতের স্কেলিং ও পলিশিং-এ ২৫% বিশেষ ছাড় এবং সাথে ফ্রি ওরাল হেলথ চেকআপ!',
      badge_text_en: 'RAMADAN OFFER',
      badge_text_bn: 'রমজান অফার',
      badge_color: 'emerald',
      action_type: 'booking',
      action_text_en: 'Book Serial Now',
      action_text_bn: 'সিরিয়াল বুক করুন',
      duration_seconds: 15,
    }
  },
  {
    id: 'shab_e_barat',
    category: 'festivals',
    label_bn: 'পবিত্র শবে বরাত ডিসকাউন্ট',
    label_en: 'Shab-e-Barat Discount',
    tag: 'ধর্মীয় উপলক্ষ',
    Icon: Star,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50/70 hover:bg-amber-100/80',
    borderColor: 'border-amber-200/80',
    data: {
      occasion_en: 'Shab-e-Barat Special Dental Care',
      occasion_bn: 'পবিত্র শবে বরাত উপলক্ষে স্পেশাল ডেন্টাল ডিসকাউন্ট',
      benefit_en: 'Special 20% discount on Root Canal & Aesthetic Light Cure Fillings + Free RVG X-ray.',
      benefit_bn: 'রুট ক্যানেল ও লাইট কিউর ফিলিং-এ ২০% ছাড় ও ফ্রি ডিজিটাল আরভিজি এক্স-রে!',
      badge_text_en: 'SPECIAL DISCOUNT',
      badge_text_bn: 'বিশেষ ছাড়',
      badge_color: 'amber',
      action_type: 'whatsapp',
      action_text_en: 'Consult on WhatsApp',
      action_text_bn: 'হোয়াটসঅ্যাপে জানুন',
      duration_seconds: 15,
    }
  },
  {
    id: 'eid',
    category: 'festivals',
    label_bn: 'পবিত্র ঈদ স্পেশাল স্মাইল',
    label_en: 'Eid Festive Smiles',
    tag: 'উৎসবের উপহার',
    Icon: Gift,
    iconColor: 'text-teal-600',
    bgColor: 'bg-teal-50/70 hover:bg-teal-100/80',
    borderColor: 'border-teal-200/80',
    data: {
      occasion_en: 'Eid Festive Smile Makeover Offer',
      occasion_bn: 'পবিত্র ঈদ উপলক্ষে স্পেশাল স্মাইল অফার',
      benefit_en: 'Teeth Whitening & Ultrasonic Scaling package at flat 30% off for Eid celebrations!',
      benefit_bn: 'ঈদের বিশেষ উপহার—টিথ হোয়াইটনিং ও স্কেলিং প্যাকেজে ফ্ল্যাট ৩০% ছাড়!',
      badge_text_en: 'EID SPECIAL',
      badge_text_bn: 'ঈদ স্পেশাল',
      badge_color: 'emerald',
      action_type: 'booking',
      action_text_en: 'Claim Eid Offer',
      action_text_bn: 'ঈদ অফার নিন',
      duration_seconds: 15,
    }
  },
  {
    id: 'puja',
    category: 'festivals',
    label_bn: 'শারদীয় দুর্গোৎসব অফার',
    label_en: 'Durga Puja Festive Offer',
    tag: 'উৎসবের ছাড়',
    Icon: Flame,
    iconColor: 'text-rose-600',
    bgColor: 'bg-rose-50/70 hover:bg-rose-100/80',
    borderColor: 'border-rose-200/80',
    data: {
      occasion_en: 'Sharadiya Durga Puja Festive Offer',
      occasion_bn: 'শারদীয় দুর্গোৎসব উপলক্ষে উৎসবের উপহার',
      benefit_en: 'Special festive discount on complete family dental checkup & root canal treatment.',
      benefit_bn: 'সম্পূর্ণ ফ্যামিলি ডেন্টাল চেকআপ ও রুট ক্যানেল চিকিৎসায় বিশেষ উৎসব ছাড়!',
      badge_text_en: 'FESTIVAL OFFER',
      badge_text_bn: 'উৎসব অফার',
      badge_color: 'rose',
      action_type: 'booking',
      action_text_en: 'Book Appointment',
      action_text_bn: 'সিরিয়াল কনফার্ম করুন',
      duration_seconds: 15,
    }
  },
  {
    id: 'boishakh',
    category: 'festivals',
    label_bn: 'পহেলা বৈশাখ নববর্ষ অফার',
    label_en: 'Pohela Boishakh New Year',
    tag: 'বাংলা নববর্ষ',
    Icon: Sun,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-50/70 hover:bg-orange-100/80',
    borderColor: 'border-orange-200/80',
    data: {
      occasion_en: 'Pohela Boishakh New Year Smile Offer',
      occasion_bn: 'পহেলা বৈশাখ ও শুভ নববর্ষের বিশেষ উপহার',
      benefit_en: 'Start the Bengali New Year with a bright smile: 20% off on scaling & cosmetic tooth repair!',
      benefit_bn: 'শুভ নববর্ষে আত্মবিশ্বাসী হাসি—স্কেলিং ও কসমেটিক ফিলিং-এ ২০% বৈশাখী ছাড়!',
      badge_text_en: 'NEW YEAR OFFER',
      badge_text_bn: 'বৈশাখী উপহার',
      badge_color: 'amber',
      action_type: 'booking',
      action_text_en: 'Book Serial Now',
      action_text_bn: 'সিরিয়াল বুক করুন',
      duration_seconds: 15,
    }
  },

  // 2. Clinical Treatments & Discount Packages
  {
    id: 'flash_sale',
    category: 'packages',
    label_bn: 'উইকেন্ড ফ্ল্যাশ সেল ও ডিসকাউন্ট',
    label_en: 'Weekend Flash Sale',
    tag: 'সীমিত সময়',
    Icon: Zap,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50/70 hover:bg-amber-100/80',
    borderColor: 'border-amber-200/80',
    data: {
      occasion_en: 'Weekend Flash Dental Sale',
      occasion_bn: 'সপ্তাহান্তের ফ্ল্যাশ সেল ও ডিসকাউন্ট',
      benefit_en: 'Flat 500 BDT instant waiver on Composite Veneer & Aesthetic Restorations!',
      benefit_bn: 'কম্পোজিট ভেনিয়ার ও স্মাইল ডিজাইনিং চিকিৎসায় তাৎক্ষণিক ৫০০ টাকা ছাড়!',
      badge_text_en: 'FLASH SALE',
      badge_text_bn: 'ফ্ল্যাশ সেল',
      badge_color: 'amber',
      action_type: 'whatsapp',
      action_text_en: 'Inquire on WhatsApp',
      action_text_bn: 'হোয়াটসঅ্যাপে নক দিন',
      duration_seconds: 15,
    }
  },
  {
    id: 'scaling_polishing',
    category: 'packages',
    label_bn: 'স্কেলিং ও পলিশিং কম্বো',
    label_en: 'Scaling & Polishing Combo',
    tag: 'জনপ্রিয় প্যাকেজ',
    Icon: Sparkles,
    iconColor: 'text-teal-600',
    bgColor: 'bg-teal-50/70 hover:bg-teal-100/80',
    borderColor: 'border-teal-200/80',
    data: {
      occasion_en: 'Ultrasonic Scaling & Polishing Special',
      occasion_bn: 'আল্ট্রাসনিক স্কেলিং ও পলিশিং কম্বো প্যাকেজ',
      benefit_en: 'Complete stain removal, calculus cleaning and enamel polishing package at special price!',
      benefit_bn: 'দাঁতের পাথর ও দাগ দূরীকরণ এবং পলিশিং-এ আকর্ষণীয় প্যাকেজ অফার!',
      badge_text_en: 'COMBO PACKAGE',
      badge_text_bn: 'কম্বো অফার',
      badge_color: 'teal',
      action_type: 'booking',
      action_text_en: 'Book Scaling Slot',
      action_text_bn: 'স্কেলিং স্লট নিন',
      duration_seconds: 15,
    }
  },
  {
    id: 'root_canal_crown',
    category: 'packages',
    label_bn: 'রুট ক্যানেল ও জিরকোনিয়া ক্যাপ',
    label_en: 'Root Canal & Zirconia Crown',
    tag: 'স্পেশালিস্ট কেয়ার',
    Icon: ShieldCheck,
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50/70 hover:bg-indigo-100/80',
    borderColor: 'border-indigo-200/80',
    data: {
      occasion_en: 'Painless Root Canal & Zirconia Crown Care',
      occasion_bn: 'ব্যথামুক্ত রুট ক্যানেল ও জিরকোনিয়া ক্যাপ প্যাকেজ',
      benefit_en: 'Single-sitting motorized rotary root canal and high-strength aesthetic zirconia cap guarantee.',
      benefit_bn: 'রোটারি এন্ডোডন্টিক্সে ব্যথামুক্ত রুট ক্যানেল ও প্রিমিয়াম জিরকোনিয়া ক্যাপ!',
      badge_text_en: 'SPECIAL CARE',
      badge_text_bn: 'বিশেষ চিকিৎসা',
      badge_color: 'indigo',
      action_type: 'whatsapp',
      action_text_en: 'Consult Specialist',
      action_text_bn: 'বিশেষজ্ঞ পরামর্শ নিন',
      duration_seconds: 15,
    }
  },

  // 3. Clinic Camps, Family & Notices
  {
    id: 'friday_camp',
    category: 'camps',
    label_bn: 'শুক্রবার ফ্রি ডেন্টাল ক্যাম্প',
    label_en: 'Friday Free Screening',
    tag: 'ফ্রি সেবা',
    Icon: Stethoscope,
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50/70 hover:bg-indigo-100/80',
    borderColor: 'border-indigo-200/80',
    data: {
      occasion_en: 'Friday Free Oral Health Screening',
      occasion_bn: 'প্রতি শুক্রবার শিশু ও প্রবীণদের ফ্রি ডেন্টাল ক্যাম্প',
      benefit_en: 'Free dental checkup & oral health guidelines every Friday (4:00 PM - 9:00 PM).',
      benefit_bn: 'প্রতি শুক্রবার শিশু ও বয়োজ্যেষ্ঠদের জন্য সম্পূর্ণ ফ্রি ডেন্টাল স্ক্রীনিং ও পরামর্শ।',
      badge_text_en: 'FREE CLINIC',
      badge_text_bn: 'ফ্রি ক্যাম্প',
      badge_color: 'indigo',
      action_type: 'booking',
      action_text_en: 'Book Free Serial',
      action_text_bn: 'ফ্রি সিরিয়াল নিন',
      duration_seconds: 15,
    }
  },
  {
    id: 'kids_senior_care',
    category: 'camps',
    label_bn: 'শিশু ও বয়োজ্যেষ্ঠ ডেন্টাল কেয়ার',
    label_en: 'Pediatric & Senior Dental Care',
    tag: 'ফ্যামিলি কেয়ার',
    Icon: HeartPulse,
    iconColor: 'text-rose-600',
    bgColor: 'bg-rose-50/70 hover:bg-rose-100/80',
    borderColor: 'border-rose-200/80',
    data: {
      occasion_en: 'Gentle Pediatric & Senior Dental Care',
      occasion_bn: 'শিশু ও বয়োজ্যেষ্ঠদের বিশেষ ডেন্টাল কেয়ার',
      benefit_en: 'Friendly milk-tooth cavity restoration, fluoride therapy and senior denture consultations.',
      benefit_bn: 'শিশুদের দুধদাঁতের ফিলিং, ফ্লুরাইড থেরাপি ও বয়োজ্যেষ্ঠদের ডেনচার কনসালটেন্সি!',
      badge_text_en: 'FAMILY CARE',
      badge_text_bn: 'পারিবারিক সেবা',
      badge_color: 'rose',
      action_type: 'booking',
      action_text_en: 'Consult for Family',
      action_text_bn: 'সিরিয়াল কনফার্ম করুন',
      duration_seconds: 15,
    }
  },
  {
    id: 'holiday_schedule',
    category: 'camps',
    label_bn: 'চেম্বার বন্ধ বা সময়সূচি নোটিশ',
    label_en: 'Holiday & Operating Hours',
    tag: 'জরুরি নোটিশ',
    Icon: Clock,
    iconColor: 'text-slate-700',
    bgColor: 'bg-slate-100 hover:bg-slate-200/80',
    borderColor: 'border-slate-300',
    data: {
      occasion_en: 'Clinic Operating Hours & Holiday Notice',
      occasion_bn: 'চেম্বার বন্ধ বা পরিবর্তিত সময়সূচি নোটিশ',
      benefit_en: 'Clinic remains open on special schedule. Emergency on-call assistance available 24/7.',
      benefit_bn: 'বিশেষ দিনগুলোতে চেম্বারের সময়সূচি এবং জরুরি প্রয়োজনে অন-কল সহায়তার নির্দেশনা।',
      badge_text_en: 'SCHEDULE NOTICE',
      badge_text_bn: 'জরুরি নোটিশ',
      badge_color: 'indigo',
      action_type: 'whatsapp',
      action_text_en: 'Call / Chat Emergency',
      action_text_bn: 'জরুরি যোগাযোগ',
      duration_seconds: 15,
    }
  }
];

export function AnnouncementsAdminClient({
  initialAnnouncements
}: AnnouncementsAdminClientProps) {
  const [announcements, setAnnouncements] = useState<TopAnnouncement[]>(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<TopAnnouncement> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedPresetCategory, setSelectedPresetCategory] = useState<'all' | 'festivals' | 'packages' | 'camps'>('all');
  const [lastAppliedPresetId, setLastAppliedPresetId] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  // Open modal for creating new announcement
  const openCreateModal = () => {
    setLastAppliedPresetId(null);
    setEditingItem({
      occasion_en: '',
      occasion_bn: '',
      benefit_en: '',
      benefit_bn: '',
      badge_text_en: 'SPECIAL OFFER',
      badge_text_bn: 'বিশেষ অফার',
      badge_color: 'emerald',
      action_type: 'booking',
      action_text_en: 'Book Serial Now',
      action_text_bn: 'সিরিয়াল নিন',
      action_url: '',
      is_active: true,
      duration_seconds: 15,
      sort_order: announcements.length + 1
    });
    setIsModalOpen(true);
  };

  // Apply a preset template
  const applyPreset = (presetId: string) => {
    const preset = PRESET_TEMPLATES.find((p) => p.id === presetId);
    if (!preset || !editingItem) return;

    setEditingItem((prev) => ({
      ...prev,
      ...preset.data
    }));
    setLastAppliedPresetId(presetId);
  };

  const openEditModal = (item: TopAnnouncement) => {
    setLastAppliedPresetId(null);
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.occasion_en?.trim() && !editingItem.occasion_bn?.trim()) {
      alert('Please provide an Occasion / Purpose title (উপলক্ষ).');
      return;
    }

    setSaving(true);
    try {
      const saved = await saveAnnouncement(editingItem);
      setAnnouncements((prev) => {
        const exists = prev.some((a) => a.id === saved.id);
        if (exists) {
          return prev.map((a) => (a.id === saved.id ? saved : a));
        }
        return [...prev, saved];
      });
      setIsModalOpen(false);
      setEditingItem(null);
      showNotification('Notice / Offer saved and synced successfully!');
    } catch {
      alert('Failed to save announcement.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete this notice: "${title}"?`)) return;
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      showNotification('Notice deleted successfully.');
    } catch {
      alert('Failed to delete notice.');
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    const nextStatus = !current;
    try {
      await toggleAnnouncementActive(id, nextStatus);
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === id ? { ...a, is_active: nextStatus } : a))
      );
      showNotification(
        nextStatus ? 'Notice activated on top bar.' : 'Notice deactivated from top bar.'
      );
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= announcements.length) return;

    const reordered = [...announcements];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    setAnnouncements(reordered);
    await reorderAnnouncements(reordered);
    showNotification('Notices reordered successfully.');
  };

  const filteredAnnouncements = announcements.filter((a) => {
    if (activeTab === 'active') return a.is_active;
    if (activeTab === 'inactive') return !a.is_active;
    return true;
  });

  const activeCount = announcements.filter((a) => a.is_active).length;

  const getBadgePill = (color?: string, text?: string) => {
    let classes = 'bg-emerald-50 text-emerald-700 border-emerald-300';
    if (color === 'amber') classes = 'bg-amber-50 text-amber-700 border-amber-300';
    if (color === 'rose') classes = 'bg-rose-50 text-rose-700 border-rose-300';
    if (color === 'indigo') classes = 'bg-indigo-50 text-indigo-700 border-indigo-300';
    if (color === 'purple') classes = 'bg-purple-50 text-purple-700 border-purple-300';
    if (color === 'teal') classes = 'bg-teal-50 text-teal-700 border-teal-300';

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${classes}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {text || 'OFFER'}
      </span>
    );
  };

  const filteredPresets = PRESET_TEMPLATES.filter((p) => {
    if (selectedPresetCategory === 'all') return true;
    return p.category === selectedPresetCategory;
  });

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in font-medium text-sm">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-navy-primary text-xs font-bold mb-2">
            <Megaphone className="w-3.5 h-3.5 text-blue-600" />
            <span>Top Bar Announcement Ticker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Notices & Discount Offers
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Create dynamic notices for Ramadan, Shab-e-Barat, Eid, Puja, or flash sales. These rotate
            smoothly on the website top bar every 15–20 seconds alongside chamber hours and contacts.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 bg-navy-primary hover:bg-navy-dark text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Notice / Offer</span>
        </button>
      </div>

      {/* Live Preview Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Front-End Top Bar Rotation Overview</span>
          </div>
          <div className="text-[11px] text-slate-400">
            <span className="font-semibold text-emerald-400">{activeCount}</span> Active Notices in
            Rotation (+ 1 Default Chamber Info slide)
          </div>
        </div>

        <div className="bg-[#070E28] rounded-xl p-3 border border-white/10 text-xs text-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-400/40 inline-flex items-center gap-1">
                <Moon className="w-3 h-3 text-emerald-300" />
                RAMADAN OFFER
              </span>
              <span className="font-bold text-white">পবিত্র মাহে রমজান উপলক্ষে বিশেষ ছাড়:</span>
              <span className="text-amber-300 font-medium">
                স্কেলিং ও পলিশিং-এ ২৫% বিশেষ ছাড় এবং সাথে ফ্রি ওরাল হেলথ চেকআপ!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] inline-flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" />
                সিরিয়াল নিন →
              </span>
              <span className="text-slate-400 text-[11px]">| 01324-558811</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-navy-primary shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Notices ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'active'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab('inactive')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inactive'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Inactive ({announcements.length - activeCount})
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Megaphone className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No announcements found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Create an announcement to show special discounts, festival greetings, or important notices
              to website visitors.
            </p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-navy-primary text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Add First Notice
            </button>
          </div>
        ) : (
          filteredAnnouncements.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all p-5 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                item.is_active ? 'border-slate-200' : 'border-slate-200/60 opacity-60 bg-slate-50/50'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-4 flex-1">
                {/* Reorder Buttons */}
                <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-bold text-slate-400">#{index + 1}</span>
                  <button
                    disabled={index === filteredAnnouncements.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {getBadgePill(item.badge_color, item.badge_text_en)}
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.duration_seconds || 15}s rotation
                    </span>
                    {item.is_active ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        Live on Site
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                        Paused
                      </span>
                    )}
                  </div>

                  {/* Occasion / Purpose */}
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{item.occasion_en}</h3>
                    <p className="text-xs font-semibold text-slate-600">{item.occasion_bn}</p>
                  </div>

                  {/* Benefit / Offer details */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1 text-xs">
                    <div className="text-slate-800">
                      <strong className="text-navy-primary font-bold">Benefit (EN):</strong>{' '}
                      {item.benefit_en || '—'}
                    </div>
                    <div className="text-slate-700 font-medium">
                      <strong className="text-emerald-700 font-bold">সুবিধা (BN):</strong>{' '}
                      {item.benefit_bn || '—'}
                    </div>
                  </div>

                  {/* Action Link Details */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 pt-0.5">
                    <span className="font-semibold text-slate-600">Action:</span>
                    {item.action_type === 'booking' && (
                      <span className="inline-flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                        <Calendar className="w-3 h-3" />
                        Online Booking Modal ({item.action_text_en || 'Book Now'})
                      </span>
                    )}
                    {item.action_type === 'whatsapp' && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                        <WhatsAppIcon className="w-3 h-3 fill-emerald-600" />
                        WhatsApp Consultation ({item.action_text_en || 'Chat WhatsApp'})
                      </span>
                    )}
                    {item.action_type === 'link' && (
                      <span className="inline-flex items-center gap-1 text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                        <ExternalLink className="w-3 h-3" />
                        Custom URL: {item.action_url || '/contact'}
                      </span>
                    )}
                    {item.action_type === 'none' && (
                      <span className="text-slate-400">Information Only (No Button)</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3 shrink-0 self-end lg:self-center pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto justify-end">
                {/* Active Toggle Switch */}
                <button
                  onClick={() => handleToggleActive(item.id, item.is_active)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    item.is_active
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                  title={item.is_active ? 'Click to deactivate' : 'Click to activate'}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.is_active ? 'bg-emerald-600' : 'bg-slate-400'
                    }`}
                  />
                  <span>{item.is_active ? 'Active' : 'Inactive'}</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 text-slate-500 hover:text-navy-primary hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Edit notice"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item.id, item.occasion_en || item.occasion_bn)}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl space-y-5 my-6 max-h-[92vh] overflow-y-auto border border-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-navy-primary flex items-center justify-center">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {editingItem.id ? 'Edit Notice & Offer' : 'Create New Notice & Offer'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Set occasion, discount benefits, badge styling, and action triggers.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets Section with Lucide React Icons & Categorized Tabs */}
            <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    কুইক প্রিসেট টেমপ্লেট (1-Click Ready Presets)
                  </span>
                </div>
                {/* Category filter pills */}
                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSelectedPresetCategory('all')}
                    className={`px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                      selectedPresetCategory === 'all'
                        ? 'bg-navy-primary text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    সকল ({PRESET_TEMPLATES.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPresetCategory('festivals')}
                    className={`px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                      selectedPresetCategory === 'festivals'
                        ? 'bg-navy-primary text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    ধর্মীয় ও উৎসব
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPresetCategory('packages')}
                    className={`px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                      selectedPresetCategory === 'packages'
                        ? 'bg-navy-primary text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    প্যাকেজ ও ডিসকাউন্ট
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPresetCategory('camps')}
                    className={`px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                      selectedPresetCategory === 'camps'
                        ? 'bg-navy-primary text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    ক্যাম্প ও নোটিশ
                  </button>
                </div>
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredPresets.map((preset) => {
                  const Icon = preset.Icon;
                  const isApplied = lastAppliedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset.id)}
                      className={`group relative text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                        preset.bgColor
                      } ${preset.borderColor} ${
                        isApplied
                          ? 'ring-2 ring-navy-primary bg-white shadow-xs'
                          : 'hover:shadow-2xs'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center shrink-0 border border-slate-200/60">
                        <Icon className={`w-4 h-4 ${preset.iconColor} group-hover:scale-110 transition-transform`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {preset.label_bn}
                          </span>
                          {isApplied ? (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-600 text-white shrink-0 flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" />
                              যুক্ত
                            </span>
                          ) : (
                            <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-white text-slate-500 border border-slate-200 shrink-0">
                              {preset.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-[10.5px] text-slate-500 truncate block font-medium">
                          {preset.label_en}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4">
              {/* Occasion / Purpose (English & Bengali) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Occasion / Purpose (English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Holy Ramadan Special Dental Care Offer"
                    value={editingItem.occasion_en || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => ({ ...prev, occasion_en: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    উপলক্ষ / পারপাস (বাংলা) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: পবিত্র মাহে রমজান উপলক্ষে বিশেষ অফার"
                    value={editingItem.occasion_bn || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => ({ ...prev, occasion_bn: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                </div>
              </div>

              {/* Benefit / Details (English & Bengali) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Benefit / Discount Details (English) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Flat 25% Discount on Dental Scaling & Polishing + Free Oral Health Consultation!"
                    value={editingItem.benefit_en || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => ({ ...prev, benefit_en: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    সুবিধা / ডিসকাউন্ট বিবরণ (বাংলা) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="যেমন: দাঁতের স্কেলিং ও পলিশিং-এ ২৫% বিশেষ ছাড় এবং সাথে ফ্রি ওরাল হেলথ চেকআপ!"
                    value={editingItem.benefit_bn || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => ({ ...prev, benefit_bn: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                </div>
              </div>

              {/* Badge Text & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Badge Text (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. RAMADAN OFFER"
                    value={editingItem.badge_text_en || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => ({ ...prev, badge_text_en: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">ব্যাজ টেক্সট (বাংলা)</label>
                  <input
                    type="text"
                    placeholder="যেমন: রমজান অফার"
                    value={editingItem.badge_text_bn || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => ({ ...prev, badge_text_bn: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Badge Color Theme</label>
                  <select
                    value={editingItem.badge_color || 'emerald'}
                    onChange={(e) =>
                      setEditingItem((prev) => ({
                        ...prev,
                        badge_color: e.target.value as TopAnnouncement['badge_color']
                      }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-semibold"
                  >
                    <option value="emerald">Emerald Green (Ramadan / General Offer)</option>
                    <option value="amber">Amber Gold (Flash Sale / Highlight)</option>
                    <option value="rose">Rose Red (Festive / Special Offer)</option>
                    <option value="indigo">Indigo Blue (Clinical Notice / Free Camp)</option>
                    <option value="teal">Teal Cyan (Combo Packages / Whitening)</option>
                  </select>
                </div>
              </div>

              {/* Action Button Trigger */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Action Type</label>
                  <select
                    value={editingItem.action_type || 'booking'}
                    onChange={(e) =>
                      setEditingItem((prev) => ({
                        ...prev,
                        action_type: e.target.value as TopAnnouncement['action_type']
                      }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-semibold"
                  >
                    <option value="booking">Online Booking Modal (Instant Form)</option>
                    <option value="whatsapp">WhatsApp Consultation (Direct Chat)</option>
                    <option value="link">Custom Website URL (Specific Page)</option>
                    <option value="none">Information Only (Notice Without Button)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Button Text (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. Book Serial Now"
                    value={editingItem.action_text_en || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => ({ ...prev, action_text_en: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">বাটন টেক্সট (বাংলা)</label>
                  <input
                    type="text"
                    placeholder="যেমন: সিরিয়াল বুক করুন"
                    value={editingItem.action_text_bn || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => ({ ...prev, action_text_bn: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                </div>
              </div>

              {editingItem.action_type === 'link' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Custom Target URL</label>
                  <input
                    type="text"
                    placeholder="e.g. /services or /contact"
                    value={editingItem.action_url || ''}
                    onChange={(e) =>
                      setEditingItem((prev) => ({ ...prev, action_url: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                </div>
              )}

              {/* Duration and Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Display Duration (Seconds)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={60}
                    value={editingItem.duration_seconds || 15}
                    onChange={(e) =>
                      setEditingItem((prev) => ({
                        ...prev,
                        duration_seconds: parseInt(e.target.value, 10) || 15
                      }))
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-primary font-medium"
                  />
                  <span className="text-[11px] text-slate-400">
                    Recommended: 15 to 20 seconds for optimal readability.
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.is_active ?? true}
                      onChange={(e) =>
                        setEditingItem((prev) => ({ ...prev, is_active: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-navy-primary accent-navy-primary"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      Show actively on Website Top Bar
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-navy-primary hover:bg-navy-dark text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save & Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
