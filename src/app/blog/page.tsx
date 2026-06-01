'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { blogPosts } from '@/data/blogPosts';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogIndexPage() {
  const { t, language } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 transition-all duration-300">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          <BookOpen className="h-5 w-5 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {t('navBlog')} & Information Center
        </h1>
        <p className="mx-auto max-w-lg text-sm text-slate-500">
          Read high-end workflow tutorials, AI trends, and professional comparison guides written by creators.
        </p>
      </div>

      {/* Main Grid Articles list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 transition-all duration-300"
          >
            <div className="space-y-4">
              {/* Category Badge */}
              <span className="inline-flex items-center space-x-1 rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold text-indigo-600 uppercase dark:bg-indigo-950/40 dark:text-indigo-400">
                {post.category}
              </span>

              {/* Title & Excerpt */}
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-950 group-hover:text-indigo-600 dark:text-white transition-colors duration-200 leading-snug">
                  {post.title[language] || post.title['en']}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                  {post.excerpt[language] || post.excerpt['en']}
                </p>
              </div>
            </div>

            {/* Actions & Meta Footer */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between dark:border-slate-800">
              <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
              >
                <span>Read Full Article</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </article>
        ))}
      </div>

    </div>
  );
}
