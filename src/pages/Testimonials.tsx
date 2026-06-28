import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { TESTIMONIALS_STATIC } from '@/constants/company';
import { getInitials } from '@/lib/utils';

export default function Testimonials() {
  return (
    <>
      <Helmet>
        <title>Client Testimonials — TechYanshi</title>
        <meta name="description" content="Read what our clients say about TechYanshi's data analytics, dashboard development, and web development services. Real results from real businesses." />
        <link rel="canonical" href="https://www.techyanshi.com/testimonials" />
      </Helmet>

      <section className="pt-32 pb-16 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl font-display font-bold text-white mb-4"
          >
            What Our Clients <span className="gradient-text-blue">Say</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto"
          >
            Real results from real businesses that trusted TechYanshi with their data and digital transformation.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS_STATIC.map(t => (
              <StaggerItem key={t.id}>
                <div className="glass rounded-2xl p-6 h-full flex flex-col hover:border-white/10 transition-all duration-300 group relative overflow-hidden">
                  <Quote size={60} className="absolute -top-2 -right-2 text-accent-500/5 rotate-180" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-warning-400 fill-warning-400" />
                    ))}
                  </div>
                  <blockquote className="text-neutral-300 text-sm leading-relaxed flex-1 mb-6">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 mt-auto">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.author_name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center text-white text-xs font-bold">
                        {getInitials(t.author_name)}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">{t.author_name}</p>
                      <p className="text-xs text-neutral-500">{t.author_title} — {t.company}</p>
                    </div>
                    {t.service && (
                      <span className="text-xs text-accent-400 glass px-2.5 py-1 rounded-full border border-accent-500/20 flex-shrink-0">
                        {t.service}
                      </span>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
