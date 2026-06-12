'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '../types';
import { useLanguage } from '../context/LanguageContext';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { language } = useLanguage();
  
  // Dynamically resolve Lucide Icon component
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[category.icon] || Icons.HelpCircle;

  return (
    <Link
      href={`/tools?category=${category.id}`}
      className="group relative flex items-start space-x-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      {/* Icon Wrapper with Dynamic Gradient on Hover */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:text-white dark:bg-indigo-950/40 dark:text-indigo-400">
        <IconComponent className="h-6 w-6 group-hover:animate-pulse" />
      </div>

      {/* Text Info */}
      <div className="space-y-1.5">
        <h3 className="font-bold text-slate-950 group-hover:text-indigo-600 dark:text-white transition-colors duration-200">
          {category.name[language] || category.name['en']}
        </h3>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 h-9">
          {category.description[language] || category.description['en']}
        </p>
      </div>

      {/* Decorative background circle */}
      <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-slate-50 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 dark:bg-slate-800/20" />
    </Link>
  );
};
export default CategoryCard;
