import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { supabase } from '@/lib/supabase';
import { formatDateShort, readingTime } from '@/lib/utils';
import type { BlogPost } from '@/types';

const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How to Build a Sales Dashboard in Power BI: A Complete Guide',
    slug: 'how-to-build-sales-dashboard-power-bi',
    excerpt: 'Learn how to create a comprehensive sales dashboard in Power BI that gives your team real-time visibility into revenue, pipeline, and performance metrics.',
    content: '',
    category: 'Dashboard Development',
    tags: ['Power BI', 'Sales Analytics', 'Dashboard'],
    cover_image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Priyanshi Gupta',
    published: true,
    published_at: '2024-06-15T00:00:00Z',
    created_at: '2024-06-15T00:00:00Z',
    updated_at: '2024-06-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Python vs SQL for Data Analysis: Which Should You Learn First?',
    slug: 'python-vs-sql-data-analysis',
    excerpt: 'A practical comparison of Python and SQL for data analysis — when to use each, how they complement each other, and which to prioritize for your career.',
    content: '',
    category: 'Data Analytics',
    tags: ['Python', 'SQL', 'Data Analysis', 'Career'],
    cover_image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Priyanshi Gupta',
    published: true,
    published_at: '2024-06-01T00:00:00Z',
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z',
  },
  {
    id: '3',
    title: '5 Key Metrics Every E-Commerce Business Must Track in 2024',
    slug: 'ecommerce-metrics-2024',
    excerpt: 'From average order value to customer lifetime value — the five analytics metrics that separate profitable e-commerce businesses from the ones that struggle.',
    content: '',
    category: 'Business Intelligence',
    tags: ['E-Commerce', 'Analytics', 'KPIs', 'Business Intelligence'],
    cover_image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Priyanshi Gupta',
    published: true,
    published_at: '2024-05-20T00:00:00Z',
    created_at: '2024-05-20T00:00:00Z',
    updated_at: '2024-05-20T00:00:00Z',
  },
  {
    id: '4',
    title: 'Why Your Business Needs a Real-Time Dashboard (And How to Get One)',
    slug: 'why-real-time-dashboard',
    excerpt: 'Static Excel reports are holding your business back. Here\'s why real-time dashboards are no longer a luxury and how TechYanshi can help you get one fast.',
    content: '',
    category: 'Dashboard Development',
    tags: ['Dashboard', 'Real-time Analytics', 'Business Growth'],
    cover_image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Priyanshi Gupta',
    published: true,
    published_at: '2024-05-10T00:00:00Z',
    created_at: '2024-05-10T00:00:00Z',
    updated_at: '2024-05-10T00:00:00Z',
  },
  {
    id: '5',
    title: 'The MERN Stack Explained: Building Modern Web Applications',
    slug: 'mern-stack-explained',
    excerpt: 'A complete overview of the MERN stack — MongoDB, Express, React, and Node.js — and why it\'s the go-to choice for building scalable web applications.',
    content: '',
    category: 'Web Development',
    tags: ['MERN', 'React', 'Node.js', 'Web Development'],
    cover_image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Priyanshi Gupta',
    published: true,
    published_at: '2024-04-28T00:00:00Z',
    created_at: '2024-04-28T00:00:00Z',
    updated_at: '2024-04-28T00:00:00Z',
  },
  {
    id: '6',
    title: 'Data Cleaning Best Practices: How to Prepare Your Data for Analysis',
    slug: 'data-cleaning-best-practices',
    excerpt: 'Garbage in, garbage out. Learn the essential data cleaning techniques that every data analyst needs to produce reliable, trustworthy insights.',
    content: '',
    category: 'Data Analytics',
    tags: ['Data Cleaning', 'Data Quality', 'Python', 'Pandas'],
    cover_image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Priyanshi Gupta',
    published: true,
    published_at: '2024-04-15T00:00:00Z',
    created_at: '2024-04-15T00:00:00Z',
    updated_at: '2024-04-15T00:00:00Z',
  },
];

const allCategories = ['All', ...Array.from(new Set(PLACEHOLDER_POSTS.map(p => p.category ?? 'Uncategorized')))];

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const { data: dbPosts } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });
      return data as BlogPost[] | null;
    },
  });

  const posts = dbPosts && dbPosts.length > 0 ? dbPosts : PLACEHOLDER_POSTS;

  const filtered = posts.filter(post => {
    const matchCat = category === 'All' || post.category === category;
    const matchSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt ?? '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blog — TechYanshi | Data Analytics & Tech Insights</title>
        <meta name="description" content="Read TechYanshi's blog for insights on data analytics, Power BI, Tableau, web development, and business intelligence. Written by Priyanshi Gupta." />
        <link rel="canonical" href="https://www.techyanshi.com/blog" />
      </Helmet>

      <section className="pt-32 pb-16 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl font-display font-bold text-white mb-4"
          >
            Insights & <span className="gradient-text-blue">Resources</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-xl mx-auto mb-8"
          >
            Practical guides, tutorials, and insights on data analytics, dashboards, and web development.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto relative"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="input-field pl-12"
            />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="flex flex-wrap gap-2 mb-10">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-accent-500 text-white shadow-glow-sm'
                    : 'glass text-neutral-400 hover:text-white hover:border-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <StaggerItem key={post.id}>
                <Link to={`/blog/${post.slug}`} className="block group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-2xl overflow-hidden h-full flex flex-col"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image ?? ''}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      {post.category && (
                        <span className="text-xs font-semibold text-accent-400 mb-2">{post.category}</span>
                      )}
                      <h3 className="font-semibold text-white mb-2 leading-snug group-hover:text-accent-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed flex-1 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-500 mt-auto">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {post.published_at ? formatDateShort(post.published_at) : 'Draft'}
                          </span>
                          {post.content && (
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {readingTime(post.content)}
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-accent-400 font-medium group-hover:gap-2 transition-all">
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
