'use client';

import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion, show immediately without animation
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, once]);

  // Generate transform style based on animation variant
  const getInitialStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      transitionProperty: 'opacity, transform',
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: `${delay}ms`,
      willChange: 'opacity, transform',
    };

    if (isVisible) {
      return {
        ...base,
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      };
    }

    switch (animation) {
      case 'fade-up':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(0, 32px, 0)',
        };
      case 'fade-down':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(0, -32px, 0)',
        };
      case 'fade-left':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(36px, 0, 0)',
        };
      case 'fade-right':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(-36px, 0, 0)',
        };
      case 'zoom-in':
        return {
          ...base,
          opacity: 0,
          transform: 'scale(0.93)',
        };
      case 'fade':
      default:
        return {
          ...base,
          opacity: 0,
        };
    }
  };

  return (
    <div ref={elementRef} style={getInitialStyle()} className={className}>
      {children}
    </div>
  );
}
