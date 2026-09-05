'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (en: string, bn: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'bn', // Default to warm Bangla as requested in brief for local Ashulia/Savar reach, easily toggled to EN
  setLang: () => {},
  toggleLang: () => {},
  t: (en, bn) => bn || en
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('bn');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cpdc_lang') as Language;
      if (saved === 'en' || saved === 'bn') {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('cpdc_lang', newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'bn' : 'en';
    setLang(next);
  };

  const t = (en: string, bn: string) => {
    return lang === 'bn' ? (bn || en) : (en || bn);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
