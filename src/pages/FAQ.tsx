import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { FAQS, FAQ_CATEGORIES } from '@/constants/faqs';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass rounded-xl overflow-hidden hover:border-white/10 transition-all duration-200">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between p-6 text-left hover:bg-white/2 transition-colors group"
        aria-expanded={open}
      >
        <span className="font-medium text-white pr-6 text-sm lg:text-base leading-relaxed">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown size={18} className="text-neutral-400 group-hover:text-accent-400 transition-colors" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 border-t border-navy-800/50">
          <p className="text-sm text-neutral-400 leading-relaxed pt-4">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(faq => {
    const matchCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchSearch =
      !search ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>FAQ — TechYanshi | Frequently Asked Questions</title>
        <meta name="description" content="Answers to frequently asked questions about TechYanshi's data analytics, dashboard development, web development, and professional training services." />
        <link rel="canonical" href="https://www.techyanshi.com/faq" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl font-display font-bold text-white mb-4"
          >
            Frequently Asked{' '}
            <span className="gradient-text-blue">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-xl mx-auto mb-8"
          >
            Everything you need to know about working with TechYanshi.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto relative"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="input-field pl-12"
            />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Categories */}
          <AnimatedSection className="flex flex-wrap gap-2 mb-10">
            {['All', ...FAQ_CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-accent-500 text-white shadow-glow-sm'
                    : 'glass text-neutral-400 hover:text-white hover:border-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>

          {/* FAQ list */}
          {filtered.length === 0 ? (
            <AnimatedSection className="text-center py-12">
              <p className="text-neutral-500">No results found for "{search}"</p>
            </AnimatedSection>
          ) : (
            <StaggerContainer className="space-y-3">
              {filtered.map(faq => (
                <StaggerItem key={faq.id}>
                  <FAQItem question={faq.question} answer={faq.answer} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
