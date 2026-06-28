import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useQuery } from '@tanstack/react-query';
import AnimatedSection from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { supabase } from '@/lib/supabase';
import { formatDate, readingTime } from '@/lib/utils';

const SAMPLE_CONTENT = `
## Introduction

Data analytics is transforming how businesses make decisions. In this guide, we'll explore the key concepts and tools you need to get started.

## Why Data Analytics Matters

Organizations that leverage data analytics make decisions **5x faster** and grow revenue **2.3x more** than those relying on manual processes.

## Getting Started

Here are the essential steps to begin your data analytics journey:

1. **Define your business questions** — What do you need to know?
2. **Collect your data** — Identify sources and gather structured data
3. **Clean and prepare** — Remove errors, handle missing values
4. **Analyze and visualize** — Find patterns and create charts
5. **Communicate insights** — Present findings to stakeholders

## Tools You'll Need

- **Python** with Pandas and Matplotlib for scripting
- **SQL** for querying databases
- **Power BI or Tableau** for interactive dashboards
- **Excel** for quick analysis

## Conclusion

Data analytics is a journey, not a destination. Start small, iterate quickly, and let the data guide your decisions.
`;

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Use a sample post if nothing found in DB
  const displayPost = post ?? {
    title: 'How to Build a Sales Dashboard in Power BI',
    excerpt: 'A complete guide to creating powerful sales dashboards.',
    content: SAMPLE_CONTENT,
    category: 'Dashboard Development',
    tags: ['Power BI', 'Dashboard', 'Sales'],
    cover_image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Priyanshi Gupta',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  return (
    <>
      <Helmet>
        <title>{displayPost.title} — TechYanshi Blog</title>
        <meta name="description" content={displayPost.excerpt ?? ''} />
        <link rel="canonical" href={`https://www.techyanshi.com/blog/${slug}`} />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-50" />
        <div className="container-custom relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
          >
            <Link to="/" className="hover:text-accent-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-accent-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{displayPost.title}</span>
          </motion.div>

          {displayPost.category && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold text-accent-400 uppercase tracking-widest"
            >
              {displayPost.category}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-md lg:text-display-lg font-display font-bold text-white mt-3 mb-6"
          >
            {displayPost.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-8"
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(displayPost.published_at ?? displayPost.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {readingTime(displayPost.content)}
            </span>
            <span className="font-medium text-neutral-300">By {displayPost.author}</span>
          </motion.div>

          {displayPost.cover_image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl overflow-hidden aspect-video mb-0"
            >
              <img src={displayPost.cover_image} alt={displayPost.title} className="w-full h-full object-cover" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom max-w-3xl">
          <AnimatedSection>
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-white
              prose-p:text-neutral-400 prose-p:leading-relaxed
              prose-a:text-accent-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-accent-300 prose-code:bg-navy-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-navy-800 prose-pre:border prose-pre:border-navy-700
              prose-blockquote:border-accent-500 prose-blockquote:text-neutral-300
              prose-ul:text-neutral-400 prose-ol:text-neutral-400
              prose-li:marker:text-accent-400
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayPost.content}</ReactMarkdown>
            </div>
          </AnimatedSection>

          {/* Tags */}
          {displayPost.tags && displayPost.tags.length > 0 && (
            <AnimatedSection className="mt-10 pt-8 border-t border-navy-800/50">
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={14} className="text-neutral-500" />
                {displayPost.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1.5 glass rounded-full text-xs font-medium text-neutral-400 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Navigation */}
          <AnimatedSection className="mt-10 flex items-center justify-between">
            <Link to="/blog" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              All Posts
            </Link>
            <Link to="/contact" className="btn-primary text-sm">
              Work With Us
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
