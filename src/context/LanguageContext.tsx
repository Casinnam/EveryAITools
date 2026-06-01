'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../data/translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isBeginnerMode: boolean;
  setIsBeginnerMode: (value: boolean) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isBeginnerMode, setIsBeginnerModeState] = useState<boolean>(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('everyaitools_lang') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ko')) {
      setLanguageState(savedLang);
    }
    const savedBeginner = localStorage.getItem('everyaitools_beginner');
    if (savedBeginner) {
      setIsBeginnerModeState(savedBeginner === 'true');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('everyaitools_lang', lang);
  };

  const setIsBeginnerMode = (value: boolean) => {
    setIsBeginnerModeState(value);
    localStorage.setItem('everyaitools_beginner', String(value));
  };

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
