import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Telescope, Diamond, CheckCircle } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import FounderSection from '@/components/sections/FounderSection';
import CTASection from '@/components/sections/CTASection';
import { COMPANY, COMPARISON_TABLE } from '@/constants/company';

const values = [
  { icon: <Target size={22} className="text-accent-400" />, title: 'Integrity', desc: 'We operate with full transparency. No hidden fees, no overpromising, no shortcuts.' },
  { icon: <Diamond size={22} className="text-warning-400" />, title: 'Innovation', desc: 'We stay ahead of the curve, bringing the latest tools and methodologies to every engagement.' },
  { icon: <CheckCircle size={22} className="text-success-400" />, title: 'Precision', desc: 'Every deliverable is crafted with attention to detail. We measure twice and cut once.' },
  { icon: <Telescope size={22} className="text-primary-400" />, title: 'Partnership', desc: 'We treat your business like our own. Long-term success is our definition of a win.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About TechYanshi — Mission, Vision & Team</title>
        <meta name="description" content="Learn about TechYanshi, our mission to empower businesses with data intelligence, our founder Priyanshi Gupta, and our core values of Integrity, Innovation, Precision, and Partnership." />
        <link rel="canonical" href="https://www.techyanshi.com/about" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-accent-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-sm text-accent-300 font-medium">About TechYanshi</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-display-xl font-display font-bold text-white mb-6 text-balance"
            >
              We Help Businesses{' '}
              <span className="gradient-text-blue">Think with Data</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-neutral-400 leading-relaxed"
            >
              {COMPANY.quote}
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* Mission / Vision / Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: <Target size={28} className="text-accent-400" />,
                title: 'Mission',
                content: COMPANY.mission,
                color: 'from-accent-500/10 to-accent-600/5',
              },
              {
                icon: <Telescope size={28} className="text-primary-400" />,
                title: 'Vision',
                content: COMPANY.vision,
                color: 'from-primary-500/10 to-primary-600/5',
              },
              {
                icon: <Diamond size={28} className="text-warning-400" />,
                title: 'Core Values',
                content: 'Integrity. Innovation. Precision. Partnership. We deliver measurable outcomes, not just reports.',
                color: 'from-warning-500/10 to-warning-600/5',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className={`glass rounded-2xl p-8 h-full bg-gradient-to-br ${item.color}`}>
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{item.content}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Core values detail */}
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <span className="section-label">Our Values</span>
              <h2 className="text-display-md font-display font-bold text-white mt-3">
                Principles That <span className="gradient-text-blue">Guide Us</span>
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <StaggerItem key={i}>
                  <div className="glass rounded-2xl p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center flex-shrink-0">
                      {v.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">{v.title}</h4>
                      <p className="text-sm text-neutral-400 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* The problem section */}
      <section className="section-padding bg-navy-900/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <span className="section-label">The Problem We Solve</span>
              <h2 className="text-display-md font-display font-bold text-white mt-3">
                Businesses Have More Data Than Ever —{' '}
                <span className="gradient-text-blue">Yet Most Are Flying Blind</span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                'Data Scattered in Excel', 'Manual Reporting', 'Slow Decision-Making',
                'No Business Visibility', 'Poor Online Presence', 'Low Digital Adoption',
              ].map((problem, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="glass rounded-xl p-4 border border-error-500/10 bg-error-500/5 hover:bg-error-500/10 transition-all duration-200">
                    <p className="text-sm font-medium text-neutral-300">{problem}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FounderSection />
      <CTASection />
    </>
  );
}
