import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { CAREERS_STATIC } from '@/constants/company';

export default function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers — Join TechYanshi</title>
        <meta name="description" content="Join the TechYanshi team. We're looking for passionate data analysts, Power BI developers, and web developers to help businesses grow with data and technology." />
        <link rel="canonical" href="https://www.techyanshi.com/careers" />
      </Helmet>

      <section className="pt-32 pb-16 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl font-display font-bold text-white mb-4"
          >
            Build Your Career at{' '}
            <span className="gradient-text-blue">TechYanshi</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto"
          >
            We're a remote-first team passionate about data, technology, and making a real impact for businesses. Join us.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* Culture */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {[
              { title: 'Remote First', desc: 'Work from anywhere. We trust our team.' },
              { title: 'Learning Budget', desc: 'Grow your skills with dedicated learning support.' },
              { title: 'Real Impact', desc: 'Your work directly transforms businesses.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 text-center">
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-400">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mb-10">
            <span className="section-label">Open Positions</span>
            <h2 className="text-display-md font-display font-bold text-white mt-3">
              Current <span className="gradient-text-blue">Openings</span>
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-4 max-w-3xl mx-auto">
            {CAREERS_STATIC.map(job => (
              <StaggerItem key={job.id}>
                <div className="glass rounded-2xl p-6 hover:border-accent-500/20 transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1"><Briefcase size={12} />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12} />{job.type}</span>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1.5 glass rounded-full border border-success-500/20 text-success-400 font-semibold flex-shrink-0">
                      Open
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">{job.description}</p>
                  {job.requirements && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.map(req => (
                        <span key={req} className="px-2.5 py-1 bg-navy-800 rounded-lg text-xs text-neutral-300">
                          {req}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={`mailto:techyanshi1@gmail.com?subject=Application: ${job.title}`}
                    className="btn-primary text-sm px-5 py-2.5 w-fit"
                  >
                    Apply Now
                    <ArrowRight size={14} />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-12">
            <div className="glass rounded-2xl p-8 max-w-lg mx-auto">
              <h3 className="font-semibold text-white mb-2">Don't see the right role?</h3>
              <p className="text-sm text-neutral-400 mb-4">Send us your resume and we'll keep you in mind for future opportunities.</p>
              <a href="mailto:techyanshi1@gmail.com?subject=General Application — TechYanshi" className="btn-secondary text-sm">
                Send Your Resume
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
