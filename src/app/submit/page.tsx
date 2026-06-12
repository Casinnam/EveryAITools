'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { CheckCircle, Send, Award, DollarSign, Calendar } from 'lucide-react';

export default function SubmitToolPage() {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [toolName, setToolName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [pricingType, setPricingType] = useState('Freemium');
  const [submitterName, setSubmitterName] = useState('');
  const [email, setEmail] = useState('');
  const [listingPlan, setListingPlan] = useState('Free');

  const plans = [
    {
      id: 'Free',
      title: 'Free Listing',
      price: '$0',
      features: {
        en: ['Standard review within 14 days', 'Placed in chosen category', 'Affiliate link allowed'],
        ko: ['14일 이내 순차 검토 후 등록', '지정 카테고리에 기본 노출', '제휴 제안 링크 연동 허용']
      },
      icon: DollarSign,
      styles: 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
    },
    {
      id: 'Featured',
      title: 'Featured Listing',
      price: '$29',
      features: {
        en: ['Fast review within 48 hours', 'Priority listing in Category page', 'Custom tags and badge'],
        ko: ['48시간 이내 긴급 검토 및 우선 승인', '카테고리 상세 페이지 상단 배치', '전용 태그 및 하이라이트 배지 부착']
      },
      icon: Award,
      styles: 'border-indigo-200 hover:border-indigo-300 dark:border-indigo-900 bg-indigo-50/5'
    },
    {
      id: 'Premium',
      title: 'Premium Placement',
      price: '$199/mo',
      features: {
        en: ['Homepage Top Placement guarantee', 'Sponsored review article writeup', 'Weekly Newsletter feature'],
        ko: ['홈페이지 최고 메인 추천 섹션 고정 노출', '상세 장단점 스폰서 리뷰 단독 개설', '주간 뉴스레터 대량 메일 홍보 기사 포함']
      },
      icon: Calendar,
      styles: 'border-purple-200 hover:border-purple-300 dark:border-purple-900 bg-purple-50/5'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!toolName || !websiteUrl || !selectedCat || !shortDesc || !submitterName || !email) {
      alert('Please fill out all required fields.');
      return;
    }

    // Save to localStorage for Admin submission review simulation
    const saved = localStorage.getItem('everyaitools_submissions');
    const list = saved ? JSON.parse(saved) : [];
    
    list.push({
      id: Math.random().toString(36).substr(2, 9),
      toolName,
      websiteUrl,
      category: selectedCat,
      description: shortDesc,
      pricingType,
      submitterName,
      email,
      listingType: listingPlan,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    localStorage.setItem('everyaitools_submissions', JSON.stringify(list));
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 transition-all duration-300">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {t('submitTitle')}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          {t('submitSubtitle')}
        </p>
      </div>

      {submitted ? (
        /* Success Screen */
        <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center space-y-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 animate-in fade-in duration-300">
          <CheckCircle className="mx-auto h-16 w-16 text-emerald-500 animate-pulse" />
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Form Submitted!</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('submitSuccess')}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setToolName('');
              setWebsiteUrl('');
              setShortDesc('');
              setSubmitterName('');
              setEmail('');
            }}
            className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
          >
            <span>Submit Another Tool</span>
          </button>
        </section>
      ) : (
        /* Form + Plans Grid */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main inputs section */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-extrabold text-slate-950 dark:text-white border-l-4 border-indigo-600 pl-3 leading-none">
              AI Tool Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tool Name */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                  {t('formToolName')} *
                </label>
                <input
                  type="text"
                  required
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  placeholder="e.g. Claude"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-xs placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Website URL */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                  {t('formWebsiteUrl')} *
                </label>
                <input
                  type="url"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-xs placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                  {t('formCategory')} *
                </label>
                <select
                  required
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <option value="" disabled>Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name[language] || cat.name['en']}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing Type */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                  {t('formPricingType')} *
                </label>
                <select
                  required
                  value={pricingType}
                  onChange={(e) => setPricingType(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <option value="Free">{t('pricingFree')}</option>
                  <option value="Freemium">{t('pricingFreemium')}</option>
                  <option value="Paid">{t('pricingPaid')}</option>
                </select>
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                {t('formShortDesc')} *
              </label>
              <textarea
                required
                rows={3}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Give a brief summary of what your AI tool does and its main workflow target..."
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-xs placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <h3 className="text-base font-extrabold text-slate-950 dark:text-white border-l-4 border-indigo-600 pl-3 leading-none pt-4">
              Submitter Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Submitter Name */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                  {t('formSubmitterName')} *
                </label>
                <input
                  type="text"
                  required
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-xs placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Submitter Email */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                  {t('formEmail')} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-xs placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

          </div>

          {/* Plan Picker Section */}
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-slate-950 dark:text-white uppercase tracking-wider block">
              {t('formListingType')}
            </h3>

            <div className="space-y-4">
              {plans.map((plan) => {
                const isSelected = listingPlan === plan.id;
                const PlanIcon = plan.icon;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setListingPlan(plan.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 font-bold text-xs transition-all duration-200 flex flex-col space-y-3 cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/10 dark:border-indigo-500 dark:bg-indigo-950/20'
                        : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                          <PlanIcon className="h-4.5 w-4.5" />
                        </div>
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">{plan.title}</span>
                      </div>
                      <span className="text-base font-black text-indigo-600 dark:text-indigo-400">{plan.price}</span>
                    </div>

                    <ul className="space-y-1.5 border-t border-slate-100/80 pt-2.5 w-full dark:border-slate-800/80">
                      {plan.features[language === 'ko' ? 'ko' : 'en'].map((feat, idx) => (
                        <li key={idx} className="text-[10px] font-semibold text-slate-500 flex items-start space-x-1.5">
                          <span className="text-emerald-500">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 py-4 text-sm font-extrabold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/15 active:scale-98 transition-all"
            >
              <span>{t('submitBtn')}</span>
              <Send className="h-4 w-4" />
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
