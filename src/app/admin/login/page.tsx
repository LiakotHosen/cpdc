'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';

  const [email, setEmail] = useState('admin@carepointdental.com');
  const [password, setPassword] = useState('admin123456');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const supabase = createClient();

      if (supabase) {
        // Try Supabase auth first
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If Supabase credentials failed, check for local admin fallback
          if (email === 'admin@carepointdental.com' && password === 'admin123456') {
            document.cookie = `cpdc_admin_token=local_admin_${Date.now()}; path=/; max-age=604800; SameSite=Lax`;
            router.push(redirectUrl);
            return;
          }
          setErrorMsg(error.message || 'Invalid login credentials');
          setLoading(false);
          return;
        }

        if (data?.session) {
          document.cookie = `cpdc_admin_token=active_session_${Date.now()}; path=/; max-age=604800; SameSite=Lax`;
          router.push(redirectUrl);
          return;
        }
      } else {
        // Local mode without external Supabase
        if (email === 'admin@carepointdental.com' && password === 'admin123456') {
          document.cookie = `cpdc_admin_token=local_admin_${Date.now()}; path=/; max-age=604800; SameSite=Lax`;
          router.push(redirectUrl);
          return;
        } else {
          setErrorMsg('Default demo login is admin@carepointdental.com / admin123456');
          setLoading(false);
          return;
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('admin@carepointdental.com');
    setPassword('admin123456');
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
      {/* Logo & Header */}
      <div className="text-center space-y-2">
        <div className="relative w-14 h-14 mx-auto rounded-2xl overflow-hidden bg-white p-2 shadow-md">
          <Image
            src="/images/logo.jpeg"
            alt="Care Point Dental Clinic"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          Care Point Dental Clinic
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Administrative Control Panel (Ashulia, Savar)
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@carepointdental.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-navy-primary/50 focus:border-navy-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-navy-primary/50 focus:border-navy-primary transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-navy-primary hover:bg-navy-light text-white rounded-xl text-xs font-bold shadow-lg shadow-navy-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span>Verifying credentials...</span>
          ) : (
            <>
              <span>Sign In to Admin Panel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Quick Demo Credentials pill */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Demo: admin@carepointdental.com</span>
        <button
          type="button"
          onClick={fillDemo}
          className="text-amber-400 hover:underline font-semibold cursor-pointer"
        >
          Autofill
        </button>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/"
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
        >
          <span>← Back to Public Website</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-navy-dark relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy-primary/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Suspense
          fallback={
            <div className="bg-slate-900/90 p-8 rounded-3xl text-center text-white text-sm">
              Loading admin portal...
            </div>
          }
        >
          <LoginFormContent />
        </Suspense>
      </div>
    </div>
  );
}
