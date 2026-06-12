import type { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { JsonLd } from '@/components/JsonLd';
import { blogPostJsonLd, breadcrumbJsonLd } from '@/lib/seo';

interface BlogDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Pick<BlogDetailLayoutProps, 'params'>): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Article not found' };
  }

  return {
    title: post.title.en,
    description: post.excerpt.en,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title.en} | Every AI Tools`,
      description: post.excerpt.en,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.en,
      description: post.excerpt.en,
    },
  };
}

export default async function BlogDetailLayout({ children, params }: BlogDetailLayoutProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  return (
    <>
      {post && (
        <JsonLd
          data={[
            blogPostJsonLd(post),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title.en, path: `/blog/${post.slug}` },
            ]),
          ]}
        />
      )}
      {children}
    </>
  );
}
