import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { PROJECTS } from '@/constants/projects';

export default function CaseStudies() {
  return (
    <>
      <Helmet>
        <title>Case Studies — TechYanshi | Real Business Results</title>
        <meta name="description" content="Explore TechYanshi's case studies showing real business results from data analytics, dashboard development, and web development projects." />
        <link rel="canonical" href="https://www.techyanshi.com/case-studies" />
      </Helmet>

      <section className="pt-32 pb-16 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl font-display font-bold text-white mb-4"
          >
            Case <span className="gradient-text-blue">Studies</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto"
          >
            Deep dives into how TechYanshi solved real business problems with data and technology.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="space-y-8">
            {PROJECTS.map((project, i) => (
              <StaggerItem key={project.id}>
                <div className={`glass rounded-3xl overflow-hidden group hover:border-white/10 transition-all duration-300 ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 [direction:ltr]">
                    {/* Image */}
                    <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                      <img
                        src={project.cover_image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/40 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1.5 glass rounded-full text-xs font-semibold text-accent-300 border border-accent-500/20">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h2 className="text-display-xs font-display font-bold text-white mb-4">{project.title}</h2>
                      <p className="text-neutral-400 leading-relaxed mb-6">{project.description}</p>

                      {project.outcome && (
                        <div className="glass rounded-xl p-4 border border-success-500/10 bg-success-500/5 mb-6">
                          <p className="text-xs font-semibold text-success-300 uppercase tracking-wide mb-1">Result</p>
                          <p className="text-sm text-neutral-300">{project.outcome}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech_stack?.map(tech => (
                          <span key={tech} className="px-3 py-1.5 glass rounded-lg text-xs font-semibold text-accent-300 border border-accent-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link to={`/case-studies/${project.slug}`} className="btn-primary w-fit">
                        Read Case Study
                        <ArrowRight size={16} />
                      </Link>
                    </div>
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
