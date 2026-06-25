'use client';

import React, { createContext, useCallback, useContext, useSyncExternalStore } from 'react';
import { Language, translations } from '../data/translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isBeginnerMode: boolean;
  setIsBeginnerMode: (value: boolean) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const LANG_KEY = 'everyaitools_lang';
const BEGINNER_KEY = 'everyaitools_beginner';
const PREFS_EVENT = 'everyaitools_prefs_changed';

function subscribeToPrefs(callback: () => void) {
  window.addEventListener(PREFS_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(PREFS_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

const getLanguageSnapshot = (): Language => {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'ko' || stored === 'en') return stored;
  // No saved choice yet (first visit): fall back to the browser's language.
  // A Korean browser opens in Korean; everything else opens in English.
  const browserLang = navigator.language || navigator.languages?.[0] || '';
  return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
};
const getLanguageServerSnapshot = (): Language => 'en';
const getBeginnerSnapshot = (): boolean => localStorage.getItem(BEGINNER_KEY) === 'true';
const getBeginnerServerSnapshot = (): boolean => false;

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Preferences live in localStorage; useSyncExternalStore keeps server render
  // deterministic (English defaults) and re-syncs on the client after hydration.
  const language = useSyncExternalStore(subscribeToPrefs, getLanguageSnapshot, getLanguageServerSnapshot);
  const isBeginnerMode = useSyncExternalStore(subscribeToPrefs, getBeginnerSnapshot, getBeginnerServerSnapshot);

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem(LANG_KEY, lang);
    window.dispatchEvent(new Event(PREFS_EVENT));
  }, []);

  const setIsBeginnerMode = useCallback((value: boolean) => {
    localStorage.setItem(BEGINNER_KEY, String(value));
    window.dispatchEvent(new Event(PREFS_EVENT));
  }, []);

  const t = (key: string): string => {
    const trans = translations[key];
    if (!trans) return key;
    return trans[language] || trans['en'] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isBeginnerMode,
        setIsBeginnerMode,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
