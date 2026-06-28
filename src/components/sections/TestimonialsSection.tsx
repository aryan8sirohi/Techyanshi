import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection from '@/components/animations/AnimatedSection';
import { TESTIMONIALS_STATIC } from '@/constants/company';
import { getInitials } from '@/lib/utils';

const featured = TESTIMONIALS_STATIC.filter(t => t.featured);

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i === 0 ? featured.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === featured.length - 1 ? 0 : i + 1));

  const testimonial = featured[current];

  return (
    <section className="section-padding bg-navy-900/30">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our"
          titleHighlight="Clients Say"
          description="Real results from real businesses that trusted TechYanshi with their data and digital transformation."
        />

        {/* Featured testimonial - large */}
        <AnimatedSection delay={0.2} className="max-w-4xl mx-auto mb-12">
          <div className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background quote mark */}
            <Quote
              size={120}
              className="absolute -top-4 -right-4 text-accent-500/5 rotate-180"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-warning-400 fill-warning-400" />
                  ))}
                </div>

                <blockquote className="text-lg lg:text-xl text-neutral-200 leading-relaxed mb-8 relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.author_name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent-500/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(testimonial.author_name)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">{testimonial.author_name}</p>
                    <p className="text-sm text-neutral-400">
                      {testimonial.author_title}
                      {testimonial.company && ` — ${testimonial.company}`}
                    </p>
                  </div>
                  {testimonial.service && (
                    <span className="ml-auto text-xs text-accent-400 glass px-3 py-1.5 rounded-full border border-accent-500/20">
                      {testimonial.service}
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy-700/50">
              <div className="flex gap-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-accent-400 w-6' : 'bg-navy-600 hover:bg-navy-500'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent-500/30 transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent-500/30 transition-all duration-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* All testimonials grid - small cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS_STATIC.slice(0, 6).map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.1}>
              <div className="glass rounded-2xl p-5 h-full hover:border-white/15 transition-all duration-300">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-warning-400 fill-warning-400" />
                  ))}
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4 line-clamp-4">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  {t.avatar_url ? (
                    <img
                      src={t.avatar_url}
                      alt={t.author_name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-accent-gradient flex items-center justify-center text-white text-xs font-bold">
                      {getInitials(t.author_name)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">{t.author_name}</p>
                    <p className="text-xs text-neutral-500">{t.company}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
