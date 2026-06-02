'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Compass, Mail, Shield, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Logo & Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-white">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Every AI Tools
              </span>
            </Link>
            <p className="text-sm max-w-md">
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-400"><Mail className="h-5 w-5" /></a>
              <a href="#" className="hover:text-indigo-400"><BookOpen className="h-5 w-5" /></a>
              <a href="#" className="hover:text-indigo-400"><Shield className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold tracking-wider text-white uppercase">{t('navTools')}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li><Link href="/tools" className="hover:text-white transition-colors">{t('footerAllTools')}</Link></li>
                  <li><Link href="/tools?pricing=Free" className="hover:text-white transition-colors">{t('footerFreeTools')}</Link></li>
                  <li><Link href="/tools?friendly=true" className="hover:text-white transition-colors">{t('footerBeginnerFriendly')}</Link></li>
                  <li><Link href="/compare" className="hover:text-white transition-colors">{t('footerPopularComparisons')}</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-bold tracking-wider text-white uppercase">{t('navCategories')}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li><Link href="/tools?category=blog-writing" className="hover:text-white transition-colors">{t('footerBlogWriting')}</Link></li>
                  <li><Link href="/tools?category=youtube-tools" className="hover:text-white transition-colors">{t('footerYoutubeVideo')}</Link></li>
                  <li><Link href="/tools?category=coding-ai" className="hover:text-white transition-colors">{t('footerCodingAssistant')}</Link></li>
                  <li><Link href="/tools?category=image-generation" className="hover:text-white transition-colors">{t('footerImageArtGen')}</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-bold tracking-wider text-white uppercase">{t('footerResources')}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li><Link href="/blog" className="hover:text-white transition-colors">{t('navBlog')}</Link></li>
                  <li><Link href="/submit" className="hover:text-white transition-colors">{t('navSubmit')}</Link></li>
                  <li><Link href="/finder" className="hover:text-white transition-colors">{t('footerQuizFinder')}</Link></li>
                  <li><Link href="/admin" className="hover:text-white transition-colors">{t('footerDashboardAdmin')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure Area */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-xs text-slate-500 leading-relaxed text-center xl:text-left">
            {t('footerAffiliate')}
          </p>
        </div>

        {/* Copyright Area */}
        <div className="mt-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p className="order-2 md:order-1 mt-4 md:mt-0">{t('allRightsReserved')}</p>
          <div className="order-1 md:order-2 flex space-x-6">
            <a href="#" className="hover:text-white">{t('footerPrivacyPolicy')}</a>
            <a href="#" className="hover:text-white">{t('footerTerms')}</a>
            <a href="#" className="hover:text-white">{t('footerAffiliateLink')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
