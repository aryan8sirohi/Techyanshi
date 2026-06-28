import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import AnimatedSection from '@/components/animations/AnimatedSection';
import { COMPANY } from '@/constants/company';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-navy-900 to-primary-500/10" />
      <div className="absolute inset-0 mesh-grid opacity-30" />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <span className="section-label">Ready to Start?</span>
          <h2 className="text-display-lg lg:text-display-xl font-display font-bold text-white mt-4 mb-6 text-balance">
            Let's Build Something{' '}
            <span className="gradient-text-blue">Great Together</span>
          </h2>
          <p className="text-xl text-neutral-400 leading-relaxed mb-10">
            TechYanshi is ready to transform your data into decisions and your ideas into digital reality. Get a free consultation — no commitment required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/contact" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
              Get Free Consultation
              <ArrowRight size={18} />
            </Link>
            <Link to="/projects" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
              View Our Work
            </Link>
          </div>

          {/* Contact details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`tel:${COMPANY.contact.phone}`}
              className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-accent-400 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                <Phone size={14} className="text-accent-400" />
              </div>
              {COMPANY.contact.phone}
            </a>
            <a
              href={`mailto:${COMPANY.contact.email}`}
              className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-accent-400 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                <Mail size={14} className="text-accent-400" />
              </div>
              {COMPANY.contact.email}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
