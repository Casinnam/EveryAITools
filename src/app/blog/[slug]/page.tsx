'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { blogPosts } from '@/data/blogPosts';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { ShareButtons } from '@/components/ShareButtons';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const { language } = useLanguage();

  // Find corresponding blog post
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  // Inline renderer: supports **bold** and [label](url) links (internal links
  // use next/link; external open in a new tab).
  const renderInline = (text: string): React.ReactNode => {
    const nodes: React.ReactNode[] = [];
    const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
    let last = 0;
    let key = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) nodes.push(text.slice(last, m.index));
      if (m[1] !== undefined) {
        nodes.push(<strong key={key++} className="font-black text-slate-900 dark:text-white">{m[1]}</strong>);
      } else {
        const label = m[2];
        const href = m[3];
        nodes.push(
          href.startsWith('/') ? (
            <Link key={key++} href={href} className="font-bold text-indigo-600 hover:underline dark:text-indigo-400">{label}</Link>
          ) : (
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-600 hover:underline dark:text-indigo-400">{label}</a>
          ),
        );
      }
      last = regex.lastIndex;
    }
    if (last < text.length) nodes.push(text.slice(last));
    return nodes;
  };

  // Pre-process body paragraphs (splits by Markdown-like tags manually for styling).
  // Supports ## / ### headings, "- " bullet lists, and **bold** inline.
  const renderParagraphs = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      // Heading 3
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="text-lg font-black text-slate-950 dark:text-white mt-8 mb-4 border-l-4 border-indigo-600 pl-3 leading-tight">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      // Heading 2
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="text-xl font-extrabold text-slate-950 dark:text-white mt-10 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      // Bullet list — a block whose lines all start with "- "
      const lines = trimmed.split('\n');
      if (lines.every((line) => line.trim().startsWith('- '))) {
        return (
          <ul key={i} className="mb-4 space-y-2 pl-1">
            {lines.map((line, j) => (
              <li key={j} className="flex items-start gap-2 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                <span>{renderInline(line.trim().replace(/^- /, ''))}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Default paragraph
      return (
        <p key={i} className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium mb-4">
          {renderInline(trimmed)}
        </p>
      );
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 transition-all duration-300">
      
      {/* Back to Blog */}
      <div className="flex items-center justify-between">
        <Link
          href="/blog"
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to blog center</span>
        </Link>
        <div className="text-[11px] font-semibold text-slate-400">
          <span>Blog</span> / <span className="text-indigo-600">{slug}</span>
        </div>
      </div>

      {/* Main Column */}
      <article className="space-y-6">
        
        {/* Category badge */}
        <span className="inline-flex items-center space-x-1 rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-extrabold text-indigo-600 uppercase dark:bg-indigo-950/40 dark:text-indigo-400">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-2xl sm:text-4.5xl font-black text-slate-950 dark:text-white leading-tight">
          {post.title[language] || post.title['en']}
        </h1>

        {/* Metadata section */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-100 py-4 text-xs font-bold text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <User className="h-4 w-4 text-slate-400" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{post.date}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Detailed Body Paragraphs */}
        <div className="pt-4 pb-8 border-b border-slate-100 dark:border-slate-800">
          {renderParagraphs(post.content[language] || post.content['en'])}
        </div>

        {/* Sharing Widget Footer */}
        <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
          <ShareButtons title={post.title[language] || post.title['en']} />
        </div>

      </article>

    </div>
  );
}
