'use client';

import React from 'react';
import { Comparison, ToolLite } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { StarRating } from './StarRating';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';

interface ComparisonTableProps {
  comparison: Comparison;
  matchedTools: ToolLite[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ comparison, matchedTools }) => {
  const { language, t } = useLanguage();

  if (matchedTools.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
        No tools selected for comparison.
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* 1. Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/20">
              <th className="p-4 sm:p-5 font-extrabold text-slate-900 dark:text-white w-1/4">
                {t('compareTableOverview')}
              </th>
              {matchedTools.map((tool) => (
                <th key={tool.id} className="p-4 sm:p-5 font-extrabold text-slate-900 dark:text-white w-1/4 text-center">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-base text-indigo-600 dark:text-indigo-400">{tool.name}</span>
                    <div className="flex items-center space-x-1.5 justify-center">
                      <StarRating rating={tool.rating} size={13} />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{tool.rating}</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {/* Direct Mock Table Data rows from comparisons */}
            {comparison.tableData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/10">
                <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white bg-slate-50/20 dark:bg-slate-900/20">
                  {row.feature[language] || row.feature['en']}
                </td>
                {matchedTools.map((tool) => {
                  const val = row.values[tool.id];
                  return (
                    <td key={tool.id} className="p-4 sm:p-5 text-center font-medium">
                      {typeof val === 'boolean' ? (
                        val ? (
                          <Check className="mx-auto h-5 w-5 text-emerald-500 font-bold" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-rose-500 font-bold" />
                        )
                      ) : typeof val === 'object' && val !== null ? (
                        val[language] || val['en']
                      ) : (
                        val
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Pros and Cons Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {matchedTools.map((tool) => {
          const pc = comparison.prosAndCons[tool.id];
          if (!pc) return null;
          return (
            <div key={tool.id} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h4 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-4 text-indigo-600 dark:text-indigo-400 dark:border-slate-800">
                {tool.name} {t('compareTableProsCons')}
              </h4>
              
              <div className="space-y-4">
                {/* Pros */}
                <div>
                  <h5 className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">{t('pros')}</h5>
                  <ul className="space-y-2">
                    {pc.pros.map((pro, i) => (
                      <li key={i} className="text-xs font-semibold text-slate-700 dark:text-slate-400 flex items-start space-x-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pro[language] || pro['en']}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h5 className="text-xs font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2">{t('cons')}</h5>
                  <ul className="space-y-2">
                    {pc.cons.map((con, i) => (
                      <li key={i} className="text-xs font-semibold text-slate-700 dark:text-slate-400 flex items-start space-x-1.5">
                        <ShieldAlert className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{con[language] || con['en']}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Final Recommendation Callout */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 border border-indigo-100/80 p-6 sm:p-8 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-indigo-950/20 dark:border-indigo-950">
        <div className="flex items-start space-x-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/10">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-extrabold text-slate-950 dark:text-indigo-300">
              {t('compareTableRecommendation')}
            </h4>
            <p className="text-sm leading-relaxed font-medium text-slate-700 dark:text-slate-300">
              {comparison.recommendation[language] || comparison.recommendation['en']}
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
};
export default ComparisonTable;
