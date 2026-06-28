import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Monitor, Brain, Code2, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { SERVICES } from '@/constants/services';

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={28} />,
  Monitor: <Monitor size={28} />,
  Brain: <Brain size={28} />,
  Code2: <Code2 size={28} />,
  GraduationCap: <GraduationCap size={28} />,
};

const iconColors = [
  'text-accent-400 bg-gradient-to-br from-accent-500/20 to-accent-600/10 border-accent-500/20',
  'text-success-400 bg-gradient-to-br from-success-500/20 to-success-600/10 border-success-500/20',
  'text-warning-400 bg-gradient-to-br from-warning-500/20 to-warning-600/10 border-warning-500/20',
  'text-primary-400 bg-gradient-to-br from-primary-500/20 to-primary-600/10 border-primary-500/20',
  'text-accent-300 bg-gradient-to-br from-accent-300/20 to-accent-400/10 border-accent-300/20',
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Our Services — TechYanshi | Data Analytics, Dashboards & Web Development</title>
        <meta name="description" content="TechYanshi offers Data Analytics, Dashboard Development (Power BI, Tableau), Business Intelligence, Web Development, and Professional Training. End-to-end tech solutions." />
        <link rel="canonical" href="https://www.techyanshi.com/services" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-accent-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-sm text-accent-300 font-medium">What We Do</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display-xl font-display font-bold text-white mb-6 text-balance"
            >
              End-to-End Technology{' '}
              <span className="gradient-text-blue">Solutions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral-400 leading-relaxed"
            >
              Designed to accelerate growth, eliminate inefficiency, and future-proof your operations.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* Services list */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-8">
            {SERVICES.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.1}>
                <div className="glass rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-300 group">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Content */}
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${iconColors[i % iconColors.length]}`}>
                        {iconMap[service.icon]}
                      </div>
                      <h2 className="text-display-xs font-display font-bold text-white mb-4">{service.name}</h2>
                      <p className="text-neutral-400 leading-relaxed mb-6">{service.longDesc}</p>

                      <ul className="space-y-2 mb-8">
                        {service.features.slice(0, 4).map(feature => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-neutral-300">
                            <CheckCircle size={15} className="text-success-400 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Link to={`/services/${service.slug}`} className="btn-primary w-fit">
                        Learn More
                        <ArrowRight size={16} />
                      </Link>
                    </div>

                    {/* Tech stack / Features visual */}
                    <div className={`p-8 lg:p-12 bg-navy-800/30 flex flex-col justify-center ${i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Technologies</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.technologies.map(tech => (
                          <span key={tech} className="px-3 py-1.5 glass rounded-lg text-xs font-semibold text-accent-300 border border-accent-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Key Benefits</p>
                      <ul className="space-y-2">
                        {service.benefits.slice(0, 3).map(benefit => (
                          <li key={benefit} className="flex items-start gap-2 text-sm text-neutral-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
