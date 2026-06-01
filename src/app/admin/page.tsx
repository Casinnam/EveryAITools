'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { tools } from '@/data/tools';
import { Submission, NewsletterSubscriber } from '@/types';
import { ShieldCheck, Plus, Check, X, Users, Database, Layers, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const { t, language } = useLanguage();

  // State arrays synced with localStorage
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  
  // Modal toggle state
  const [activeTab, setActiveTab] = useState<'submissions' | 'tools' | 'subscribers'>('submissions');

  // Sync state with localStorage on mount
  useEffect(() => {
    const loadData = () => {
      const subsSaved = localStorage.getItem('everyaitools_submissions');
      if (subsSaved) {
        setSubmissions(JSON.parse(subsSaved));
      } else {
        // Initial empty seed
        const seed: Submission[] = [
          {
            id: 'sub-1',
            toolName: 'Perplexity',
            websiteUrl: 'https://perplexity.ai',
            category: 'productivity-ai',
            description: 'AI conversational fact check search engine with sources.',
            pricingType: 'Freemium',
            submitterName: 'CEO Perplexity',
            email: 'admin@perplexity.ai',
            listingType: 'Premium ($199/mo)',
            status: 'pending',
            createdAt: new Date().toISOString()
          }
        ];
        localStorage.setItem('everyaitools_submissions', JSON.stringify(seed));
        setSubmissions(seed);
      }

      const emailSaved = localStorage.getItem('everyaitools_subscribers');
      if (emailSaved) {
        setSubscribers(JSON.parse(emailSaved));
      } else {
        const seed: NewsletterSubscriber[] = [
          { id: 'usr-1', email: 'john.doe@company.com', source: 'homepage', createdAt: new Date().toISOString() }
        ];
        localStorage.setItem('everyaitools_subscribers', JSON.stringify(seed));
        setSubscribers(seed);
      }
    };

    loadData();
  }, []);

  const handleApprove = (id: string) => {
    const updated = submissions.map(sub => {
      if (sub.id === id) return { ...sub, status: 'approved' as const };
      return sub;
    });
    setSubmissions(updated);
    localStorage.setItem('everyaitools_submissions', JSON.stringify(updated));
  };

  const handleReject = (id: string) => {
    const updated = submissions.map(sub => {
      if (sub.id === id) return { ...sub, status: 'rejected' as const };
      return sub;
    });
    setSubmissions(updated);
    localStorage.setItem('everyaitools_submissions', JSON.stringify(updated));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 transition-all duration-300">
      
      {/* 1. Header Layout */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800">
        <div className="flex items-center space-x-3 text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md">
            <ShieldCheck className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white leading-tight">
              {t('adminTitle')}
            </h1>
            <span className="text-[10px] font-extrabold uppercase text-slate-400">
              SaaS Admin Control Desk • 1차 MVP Prototyping
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl dark:bg-slate-900">
          {[
            { id: 'submissions', label: t('adminSubmissions'), icon: Layers },
            { id: 'tools', label: t('adminTotalTools'), icon: Database },
            { id: 'subscribers', label: t('adminSubscribers'), icon: Users }
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                  isSelected
                    ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-950 dark:text-indigo-400'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <TabIcon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB CONTENTS: SUBMISSIONS REVIEW */}
      {activeTab === 'submissions' && (
        <section className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-950 dark:text-white">{t('adminSubmissions')}</h3>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/40">
              {submissions.filter(s => s.status === 'pending').length} Action Required
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full border-collapse text-left text-xs text-slate-600 dark:text-slate-400">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-800/20 dark:text-white">
                  <th className="p-4">Tool Name</th>
                  <th className="p-4">Plan Category</th>
                  <th className="p-4">Short Info</th>
                  <th className="p-4">Pricing</th>
                  <th className="p-4">Plan Tier</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {submissions.length > 0 ? (
                  submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/10">
                      <td className="p-4 font-black text-slate-900 dark:text-white">{sub.toolName}</td>
                      <td className="p-4 font-semibold">{sub.category}</td>
                      <td className="p-4 max-w-xs truncate font-medium">{sub.description}</td>
                      <td className="p-4 font-bold">{sub.pricingType}</td>
                      <td className="p-4 font-extrabold text-indigo-600 dark:text-indigo-400">{sub.listingType}</td>
                      <td className="p-4 text-center font-bold">
                        <span className={`rounded-full px-2 py-0.5 text-[9px] uppercase font-black ${
                          sub.status === 'approved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30' : sub.status === 'rejected' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/30' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/30'
                        }`}>
                          {sub.status === 'approved' ? t('adminStatusApproved') : sub.status === 'rejected' ? t('adminStatusRejected') : t('adminStatusPending')}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {sub.status === 'pending' ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleApprove(sub.id)}
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/40"
                              title={t('adminApprove')}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleReject(sub.id)}
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white dark:bg-rose-950/40"
                              title={t('adminReject')}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold">Handled</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">No submissions listed yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 3. TAB CONTENTS: TOOLS LIVE PREVIEW */}
      {activeTab === 'tools' && (
        <section className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-950 dark:text-white">{t('adminTotalTools')}</h3>
            <button
              onClick={() => alert('New tool creator mock form activated.')}
              className="flex items-center space-x-1 rounded-xl bg-slate-900 text-white px-3.5 py-2 text-xs font-bold hover:bg-indigo-600 transition dark:bg-white dark:text-slate-950"
            >
              <Plus className="h-4 w-4" />
              <span>{t('adminAddToolBtn')}</span>
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full border-collapse text-left text-xs text-slate-600 dark:text-slate-400">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-800/20 dark:text-white">
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Pricing Type</th>
                  <th className="p-4">Starting Price</th>
                  <th className="p-4 text-center">Score rating</th>
                  <th className="p-4 text-center">Featured Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {tools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/10">
                    <td className="p-4 font-black text-slate-900 dark:text-white">{tool.name}</td>
                    <td className="p-4 font-semibold">{tool.categoryId}</td>
                    <td className="p-4 font-bold">{tool.pricingType}</td>
                    <td className="p-4 font-semibold">{tool.startingPrice || 'Free'}</td>
                    <td className="p-4 text-center font-bold text-amber-500">★ {tool.rating}</td>
                    <td className="p-4 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${tool.featured ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30' : 'bg-slate-50 text-slate-400'}`}>
                        {tool.featured ? 'FEATURED' : 'STANDARD'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 4. TAB CONTENTS: NEWSLETTER SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <section className="space-y-4 animate-in fade-in duration-300">
          <h3 className="text-base font-extrabold text-slate-950 dark:text-white">{t('adminSubscribers')}</h3>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 max-w-xl">
            <table className="w-full border-collapse text-left text-xs text-slate-600 dark:text-slate-400">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-800/20 dark:text-white">
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Funnel Source</th>
                  <th className="p-4">Signup Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {subscribers.length > 0 ? (
                  subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/20 dark:hover:bg-slate-800/10">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{sub.email}</td>
                      <td className="p-4 font-semibold uppercase tracking-wide text-[10px] text-slate-400">{sub.source}</td>
                      <td className="p-4 font-semibold text-slate-400">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-400">No subscribers collected yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  );
}
