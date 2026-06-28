import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { PROJECTS } from '@/constants/projects';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) return <Navigate to="/case-studies" replace />;

  return (
    <>
      <Helmet>
        <title>{project.title} — TechYanshi Case Study</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://www.techyanshi.com/case-studies/${slug}`} />
      </Helmet>

      <section className="pt-32 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-50" />
        <div className="container-custom relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
          >
            <Link to="/case-studies" className="hover:text-accent-400 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> All Case Studies
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-label"
          >
            {project.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-lg lg:text-display-xl font-display font-bold text-white mt-3 mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden aspect-video mb-0"
          >
            <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-display-xs font-display font-bold text-white mb-4">The Challenge</h2>
                <p className="text-neutral-400 leading-relaxed mb-8">{project.description}</p>

                <h2 className="text-display-xs font-display font-bold text-white mb-4">Our Solution</h2>
                <p className="text-neutral-400 leading-relaxed mb-8">
                  TechYanshi analyzed the client's existing data infrastructure and designed a custom solution
                  using {project.tech_stack?.join(', ')}. We worked closely with the client's team through
                  our four-phase methodology — Discover, Design, Deliver, Support — ensuring the solution
                  aligned perfectly with their business objectives.
                </p>

                <h2 className="text-display-xs font-display font-bold text-white mb-4">The Process</h2>
                <div className="space-y-4 mb-8">
                  {['Discovery & Requirements', 'Data Architecture Design', 'Implementation & Testing', 'Deployment & Training'].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 glass rounded-xl p-4">
                      <div className="w-8 h-8 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-neutral-300 mt-1">{step}</p>
                    </div>
                  ))}
                </div>

                {project.outcome && (
                  <>
                    <h2 className="text-display-xs font-display font-bold text-white mb-4">Results</h2>
                    <div className="glass rounded-xl p-6 border border-success-500/10 bg-success-500/5">
                      <div className="flex items-start gap-3">
                        <TrendingUp size={20} className="text-success-400 mt-0.5 flex-shrink-0" />
                        <p className="text-neutral-300 leading-relaxed">{project.outcome}</p>
                      </div>
                    </div>
                  </>
                )}
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AnimatedSection direction="left" delay={0.2}>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-white mb-4">Project Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Category</p>
                      <p className="text-sm text-neutral-300">{project.category}</p>
                    </div>
                    {project.tech_stack && (
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Technologies</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech_stack.map(tech => (
                            <span key={tech} className="px-2 py-1 bg-navy-800 rounded text-xs text-neutral-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.tags && (
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 glass rounded text-xs text-neutral-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-white mb-4">Start Your Project</h3>
                  <p className="text-sm text-neutral-400 mb-4">Get a similar solution for your business.</p>
                  <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                    Get Free Consultation
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
