'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../data/translations';
import { Menu, X, Compass, Globe, HelpCircle, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, isBeginnerMode, setIsBeginnerMode, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: t('navHome'), path: '/' },
    { name: t('navTools'), path: '/tools' },
    { name: t('navCompare'), path: '/compare' },
    { name: t('navRankings'), path: '/rankings/best-ai-tools-for-bloggers' },
    { name: t('navBlog'), path: '/blog' },
    { name: t('navSubmit'), path: '/submit' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition-all duration-300">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link href="/" className="flex min-w-0 items-center space-x-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Compass className="h-5 w-5 animate-pulse" />
          </div>
          <span className="whitespace-nowrap text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent dark:from-white dark:to-slate-200 sm:text-xl">
            Every AI Tools
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex space-x-1 xl:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* UTILITIES (Language Switcher, Beginner Mode Toggle, Desktop Admin Link) */}
        <div className="hidden lg:flex items-center space-x-4">
          
          {/* Beginner Mode Toggle */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/30 dark:border-indigo-950 dark:bg-indigo-950/20">
            <HelpCircle className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">{t('beginnerMode')}</span>
            <button
              onClick={() => setIsBeginnerMode(!isBeginnerMode)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isBeginnerMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isBeginnerMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-1.5 border-l border-slate-200 pl-4 dark:border-slate-800">
            <Globe className="h-4 w-4 text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer hover:text-indigo-600"
            >
              <option value="en" className="dark:bg-slate-900">English</option>
              <option value="ko" className="dark:bg-slate-900">한국어</option>
            </select>
          </div>

          {/* Admin Dashboard Entry */}
          <Link
            href="/admin"
            className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-indigo-600 transition-colors duration-200 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400"
          >
            <span>{t('navAdmin')}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Quick Language toggle on Mobile */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none"
            title={t('language')}
            aria-label={t('language')}
          >
            <Globe className="h-5 w-5 text-indigo-500" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN NAV */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 px-4 pt-2 pb-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-semibold transition-all ${
                  isActive(item.path)
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 border-t border-slate-100 mt-2 pt-2"
            >
              {t('navAdmin')}
            </Link>
          </nav>

          {/* Beginner Mode toggle in Mobile */}
          <div className="flex items-center justify-between px-3 py-3 rounded-xl border border-indigo-50 bg-indigo-50/20 dark:border-indigo-950/40">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-4.5 w-4.5 text-indigo-500" />
              <span className="text-sm font-bold text-indigo-900 dark:text-indigo-200">{t('beginnerMode')}</span>
            </div>
            <button
              onClick={() => setIsBeginnerMode(!isBeginnerMode)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isBeginnerMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isBeginnerMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
