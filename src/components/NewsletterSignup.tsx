'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Quick regex email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('language') === 'ko' ? '올바른 이메일 주소를 입력해 주세요.' : 'Please enter a valid email address.');
      return;
    }

    // Save to localStorage for Admin subscriber preview simulation
    const saved = localStorage.getItem('everyaitools_subscribers');
    const list = saved ? JSON.parse(saved) : [];
    list.push({
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      source: 'newsletter_signup',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('everyaitools_subscribers', JSON.stringify(list));

    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 px-6 py-12 shadow-xl shadow-indigo-950/20 sm:px-12 sm:py-16 md:px-16 transition-all duration-300">
      
      {/* Decorative gradient blur background circles */}
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
      
      <div className="relative mx-auto max-w-2xl text-center space-y-6">
        
        {/* Sparkle Icon */}
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
          <Sparkles className="h-6 w-6 animate-bounce" />
        </div>

        {/* Multilingual Text */}
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {t('newsletterTitle')}
        </h2>
        <p className="mx-auto max-w-lg text-sm md:text-base leading-relaxed text-indigo-200/80">
          {t('newsletterSubtitle')}
        </p>

        {/* Subscription Form or Success Message */}
        {submitted ? (
          <div className="mx-auto max-w-md rounded-2xl bg-indigo-950/40 border border-indigo-500/20 p-6 flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in duration-300">
            <CheckCircle className="h-12 w-12 text-emerald-400 animate-pulse" />
            <p className="text-lg font-bold text-white">{t('newsletterSuccess')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col sm:flex-row gap-3">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-4.5 w-4.5 text-indigo-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder={t('newsletterPlaceholder')}
                className="block w-full rounded-xl border-0 bg-white/10 py-3.5 pl-10 pr-4 text-white placeholder-indigo-300/60 ring-1 ring-inset ring-white/10 focus:bg-white/20 focus:ring-2 focus:ring-inset focus:ring-indigo-400 focus:outline-none sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-indigo-950 hover:bg-indigo-50 active:scale-95 shadow-lg shadow-white/5 transition-all duration-200"
            >
              {t('newsletterBtn')}
            </button>
          </form>
        )}

        {/* Realtime Error Feedback */}
        {error && (
          <p className="text-xs font-semibold text-rose-400 animate-pulse">{error}</p>
        )}

      </div>
      
    </div>
  );
};
export default NewsletterSignup;
