import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { PROJECTS } from '@/constants/projects';

const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <>
      <Helmet>
        <title>Projects & Portfolio — TechYanshi</title>
        <meta name="description" content="Explore TechYanshi's portfolio of data analytics dashboards, business intelligence solutions, and web development projects across multiple industries." />
        <link rel="canonical" href="https://www.techyanshi.com/projects" />
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
            Our Work in <span className="gradient-text-blue">Action</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto"
          >
            Real projects that transform data into decisions and ideas into digital solutions.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* Projects */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filters */}
          <AnimatedSection className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? 'bg-accent-500 text-white shadow-glow-sm'
                    : 'glass text-neutral-400 hover:text-white hover:border-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <StaggerItem key={project.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-2xl overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="glass rounded-xl px-4 py-2 flex items-center gap-2 text-sm text-white border border-white/20">
                        <ExternalLink size={14} />
                        View Details
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 px-3 py-1 glass rounded-full text-xs font-semibold text-accent-300 border border-accent-500/20">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-warning-500/20 border border-warning-500/30 rounded-full text-xs font-semibold text-warning-300">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {project.outcome && (
                      <div className="glass rounded-lg p-3 mb-4 border border-success-500/10 bg-success-500/5">
                        <p className="text-xs text-success-300 leading-relaxed">{project.outcome}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech_stack?.slice(0, 4).map(tech => (
                        <span key={tech} className="px-2 py-1 bg-navy-800 rounded-md text-xs text-neutral-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
