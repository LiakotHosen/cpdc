'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  CalendarCheck,
  Stethoscope,
  Settings,
  UserCheck,
  Sparkles,
  Video,
  Image as ImageIcon,
  Star,
  HelpCircle,
  BookOpen,
  Megaphone,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/appointments', label: 'Appointments', icon: CalendarCheck },
    { href: '/admin/announcements', label: 'Notices & Offers', icon: Megaphone },
    { href: '/admin/services', label: 'Services & Pricing', icon: Stethoscope },
    { href: '/admin/settings', label: 'Clinic Settings', icon: Settings },
    { href: '/admin/doctor', label: 'Doctor Profile', icon: UserCheck },
    { href: '/admin/features', label: 'Features (17 Items)', icon: Sparkles },
    { href: '/admin/videos', label: 'Facebook Reels', icon: Video },
    { href: '/admin/gallery', label: 'Photo Gallery', icon: ImageIcon },
    { href: '/admin/reviews', label: 'Patient Reviews', icon: Star },
    { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
    { href: '/admin/blog', label: 'Dental Blog CMS', icon: BookOpen },
  ];

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch {
      // ignore
    }
    // Clear cookie
    document.cookie = 'cpdc_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
    router.refresh();
  };

  const navContent = (
    <div className="flex flex-col h-full bg-navy-dark text-slate-200 border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white p-1">
            <Image
              src="/images/logo.jpeg"
              alt="Care Point Dental"
              fill
              sizes="36px"
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-sm font-black text-white tracking-wider">CARE POINT</h1>
            <span className="text-[10px] text-ash-grey uppercase tracking-widest block font-semibold">
              Admin Portal
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scrollbar-none">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-navy-primary text-white shadow-sm border border-navy-light/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
            Frontend
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-navy-dark text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1 text-slate-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-xs font-black tracking-wider uppercase">Care Point Admin</span>
        </div>
        <Link
          href="/"
          target="_blank"
          className="text-xs text-ash-light hover:text-white flex items-center gap-1"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-xs h-full z-10 shadow-2xl">
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {navContent}
      </aside>
    </>
  );
}
