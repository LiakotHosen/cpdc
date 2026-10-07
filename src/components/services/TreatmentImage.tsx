'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck, Stethoscope } from 'lucide-react';

interface TreatmentImageProps {
  src?: string | null;
  alt: string;
  variant?: 'card' | 'featured' | 'thumbnail';
  categoryName?: string;
  treatmentName?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Beautiful anatomical dental tooth icon SVG for clinical branding
 */
export function ToothIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17.5 2C15.2 2 13.6 3.2 12 4.6C10.4 3.2 8.8 2 6.5 2C3.8 2 2 4.2 2 7C2 9.8 3.2 12.3 4.5 15C5.6 17.3 6.4 19.8 7.3 22C7.9 22.8 9.5 22.5 10 20.2C10.6 17.8 11.2 15.2 12 13.8C12.8 15.2 13.4 17.8 14 20.2C14.5 22.5 16.1 22.8 16.7 22C17.6 19.8 18.4 17.3 19.5 15C20.8 12.3 22 9.8 22 7C22 4.2 20.2 2 17.5 2Z" />
      <path d="M9.5 7.5C9.5 9 10.5 10.5 12 10.5C13.5 10.5 14.5 9 14.5 7.5" opacity="0.6" />
    </svg>
  );
}

/**
 * Reusable component for treatment visuals.
 * Displays real/demo image when available, or renders an ultra-premium cream skeleton placeholder
 * with shimmer animations and dental branding when no image exists yet.
 */
export function TreatmentImage({
  src,
  alt,
  variant = 'card',
  categoryName,
  treatmentName,
  priority = false,
  className = '',
}: TreatmentImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const hasImage = Boolean(src && src.trim() !== '' && !imageError);

  // 1. MINI THUMBNAIL VARIANT (Right rail / compact lists)
  if (variant === 'thumbnail') {
    return (
      <div
        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 shadow-2xs ${className}`}
      >
        {hasImage ? (
          <Image
            src={src!}
            alt={alt}
            fill
            sizes="64px"
            className={`object-cover object-center transition-all duration-300 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : null}

        {/* Thumbnail Cream Skeleton Placeholder */}
        {(!hasImage || !isLoaded) && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF7] via-[#F7EFE3] to-[#EFE4D3] flex flex-col items-center justify-center text-[#B58C67] p-1 overflow-hidden">
            <ToothIcon className="w-5 h-5 text-[#B58C67]/80" />
            <span className="text-[9px] font-black uppercase tracking-tight text-[#8E6542] mt-0.5">
              CPDC
            </span>
          </div>
        )}
      </div>
    );
  }

  // 2. FEATURED HERO / SHOWCASE VARIANT (Center column in the interactive studio)
  if (variant === 'featured') {
    return (
      <div
        className={`relative w-full h-full min-h-[380px] lg:min-h-[520px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-50 flex items-center justify-center ${className}`}
      >
        {hasImage ? (
          <>
            <Image
              src={src!}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={`object-cover object-center transition-all duration-700 group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsLoaded(true)}
              onError={() => setImageError(true)}
            />
            {/* Elegant overlay gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A48]/80 via-transparent to-black/20 pointer-events-none" />
          </>
        ) : null}

        {/* Featured Cream-Toned Skeleton Placeholder */}
        {(!hasImage || !isLoaded) && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#F4ECE0] to-[#EAE0CF] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
            {/* Subtle luxury background radial rings */}
            <div className="absolute w-96 h-96 rounded-full border border-[#DDCBB2]/50 pointer-events-none animate-pulse-slow" />
            <div className="absolute w-64 h-64 rounded-full border border-[#DDCBB2]/70 pointer-events-none" />

            {/* Shimmer light sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />

            {/* Central Iconic Emblem */}
            <div className="relative z-10 flex flex-col items-center max-w-sm space-y-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDCBB2] shadow-lg flex items-center justify-center text-[#B58C67] group-hover:scale-110 transition-transform">
                <ToothIcon className="w-14 h-14 sm:w-16 sm:h-16 text-[#B58C67]" />
              </div>

              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADCC8] text-[#7A5435] text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#B58C67]" />
                  <span>ক্লিনিক্যাল চিকিৎসা চিত্র</span>
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#0F1A48] leading-tight">
                  {treatmentName || alt}
                </h4>
                {categoryName && (
                  <p className="text-xs font-semibold text-[#8B6E53]">
                    {categoryName}
                  </p>
                )}
              </div>

              {/* Status Note */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 border border-[#DDCBB2] shadow-2xs text-[11px] font-medium text-[#7A5435]">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>প্রকৃত চিকিৎসা ছবি শীঘ্রই যুক্ত হবে</span>
                </div>
              </div>
            </div>

            {/* Clinic watermark stamp in corner */}
            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-[#8B6E53]/50 uppercase tracking-widest">
              Care Point Dental Clinic
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. CARD VARIANT (Standard treatment cards in the bottom grid)
  return (
    <div
      className={`relative w-full h-44 sm:h-48 overflow-hidden rounded-xl border border-slate-200/70 bg-slate-50 group/img ${className}`}
    >
      {hasImage ? (
        <>
          <Image
            src={src!}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </>
      ) : null}

      {/* Card Cream-Toned Skeleton Placeholder */}
      {(!hasImage || !isLoaded) && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#F4ECE1] to-[#EAE0CF] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none" />

          {/* Icon & Label */}
          <div className="relative z-10 flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white/80 border border-[#DDCBB2] shadow-xs flex items-center justify-center text-[#B58C67] group-hover:scale-110 transition-transform">
              <ToothIcon className="w-7 h-7 text-[#B58C67]" />
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-[#7A5435] block">
                {treatmentName || alt}
              </span>
              <span className="inline-block text-[10px] font-medium text-[#8B6E53]/80 px-2 py-0.5 rounded-md bg-[#EADCC8]/60">
                ছবি শীঘ্রই সংযুক্ত হচ্ছে
              </span>
            </div>
          </div>

          {/* Minimalist category indicator */}
          {categoryName && (
            <div className="absolute bottom-2 left-2 text-[10px] font-medium text-[#8B6E53]/70">
              {categoryName}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
