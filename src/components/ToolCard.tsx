'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tool } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Star, ExternalLink, ArrowRight, CheckCircle2, Plus } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { language, isBeginnerMode, t } = useLanguage();
  const [isInCompare, setIsInCompare] = useState(false);

  // Check if this tool is currently in the comparison list
  useEffect(() => {
    const checkCompareList = () => {
      const saved = localStorage.getItem('everyaitools_compare');
      if (saved) {
        const ids = JSON.parse(saved) as string[];
        setIsInCompare(ids.includes(tool.id));
      }
    };
    
    checkCompareList();
    
    // Add custom window listener for custom event 'compareChanged'
    window.addEventListener('compareChanged', checkCompareList);
    return () => window.removeEventListener('compareChanged', checkCompareList);
  }, [tool.id]);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const saved = localStorage.getItem('everyaitools_compare');
    let ids: string[] = saved ? JSON.parse(saved) : [];
    
    if (ids.includes(tool.id)) {
      ids = ids.filter(id => id !== tool.id);
    } else {
      if (ids.length >= 3) {
        // Simple alert if more than 3 tools selected
        alert(language === 'ko' ? '비교는 최대 3개 도구까지만 가능합니다.' : 'You can compare up to 3 tools at a time.');
        return;
      }
      ids.push(tool.id);
    }
    
    localStorage.setItem('everyaitools_compare', JSON.stringify(ids));
    setIsInCompare(!isInCompare);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('compareChanged'));
  };

  // Determine which description text to display based on Beginner Mode and Language
  const displayDescription = () => {
    if (isBeginnerMode && tool.beginnerDescription) {
      return tool.beginnerDescription[language] || tool.beginnerDescription['en'];
    }
    return tool.description[language] || tool.description['en'];
  };

  // Pricing badge color scheme
  const getPricingBadgeStyles = () => {
    switch (tool.pricingType) {
      case 'Free':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/40 dark:text-emerald-400';
      case 'Freemium':
        return 'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-950/40 dark:text-blue-400';
      case 'Paid':
        return 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/40 dark:text-amber-400';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/50';
    }
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      
      {/* Card Top Area */}
      <div>
        <div className="flex items-start justify-between">
          {/* Logo Icon and Name */}
          <div className="flex items-center space-x-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-xl font-black text-indigo-600 border border-slate-100/50 shadow-inner group-hover:scale-105 transition-transform duration-300 dark:bg-slate-800 dark:border-slate-700">
              {tool.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors dark:text-white">
                {tool.name}
              </h3>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{tool.rating}</span>
              </div>
            </div>
          </div>

          {/* Pricing Capsule Badge */}
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${getPricingBadgeStyles()}`}>
            {tool.pricingType === 'Free' ? t('pricingFree') : tool.pricingType === 'Freemium' ? t('pricingFreemium') : t('pricingPaid')}
          </span>
        </div>

        {/* Dynamic Multilingual / Beginner Description */}
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 h-15 overflow-hidden line-clamp-3">
          {displayDescription()}
        </p>

        {/* Feature Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-500 uppercase border border-slate-100/30 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-800">
              #{tag}
            </span>
          ))}
          {tool.koreanSupport && (
            <span className="rounded-md bg-indigo-50/50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400">
              KO Support
            </span>
          )}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100/80 dark:border-slate-800/80 flex items-center justify-between gap-2">
        {/* Toggle Compare Button */}
        <button
          onClick={toggleCompare}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
            isInCompare
              ? 'bg-indigo-50 text-indigo-600 border border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-900'
              : 'text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800'
          }`}
        >
          {isInCompare ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Compared</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>{t('compare')}</span>
            </>
          )}
        </button>

        <div className="flex items-center space-x-2">
          {/* Detail Link */}
          <Link
            href={`/tools/${tool.slug}`}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
          >
            <span>{t('readReview')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Official Website 제휴 링크 */}
          <a
            href={tool.affiliateUrl || tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm shadow-indigo-600/10 transition-colors duration-200"
            title={t('visitWebsite')}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      
    </div>
  );
};
export default ToolCard;
