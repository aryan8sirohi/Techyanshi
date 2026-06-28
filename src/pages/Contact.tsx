import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import AnimatedSection from '@/components/animations/AnimatedSection';
import ContactForm from '@/components/forms/ContactForm';
import { COMPANY } from '@/constants/company';

const contactInfo = [
  { icon: <Phone size={20} className="text-accent-400" />, label: 'Call Us', value: COMPANY.contact.phone, href: `tel:${COMPANY.contact.phone}` },
  { icon: <Mail size={20} className="text-success-400" />, label: 'Email Us', value: COMPANY.contact.email, href: `mailto:${COMPANY.contact.email}` },
  { icon: <Globe2 size={20} className="text-warning-400" />, label: 'Visit Us', value: COMPANY.contact.website, href: `https://${COMPANY.contact.website}` },
  { icon: <MapPin size={20} className="text-primary-400" />, label: 'Location', value: COMPANY.contact.location, href: undefined },
];

import { Globe2 } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact TechYanshi — Get a Free Consultation</title>
        <meta name="description" content="Contact TechYanshi for a free consultation on Data Analytics, Dashboard Development, Business Intelligence, Web Development, or Professional Training. +91 8955365468" />
        <link rel="canonical" href="https://www.techyanshi.com/contact" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-accent-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
            <span className="text-sm text-accent-300 font-medium">REQUEST A FREE CONSULTATION</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-xl font-display font-bold text-white mb-4"
          >
            Let Us <span className="gradient-text-blue">Contact You!</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto"
          >
            Please send us information about your project. One of our project managers shall evaluate
            your project requirements and give you a formal proposal. Detailed information will help
            us evaluate your project accurately.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection direction="right">
                <h2 className="text-display-sm font-display font-bold text-white mb-4">
                  Get In <span className="gradient-text-blue">Touch</span>
                </h2>
                <p className="text-neutral-400 leading-relaxed mb-8">
                  TechYanshi is ready to transform your data into decisions and your ideas into digital
                  reality. We respond to every inquiry within 24 hours.
                </p>
              </AnimatedSection>

              {/* Contact cards */}
              <div className="space-y-3">
                {contactInfo.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.1} direction="right">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-4 glass rounded-xl p-4 hover:border-accent-500/20 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{item.label}</p>
                          <p className="text-sm font-semibold text-white group-hover:text-accent-300 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 glass rounded-xl p-4">
                        <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{item.label}</p>
                          <p className="text-sm font-semibold text-white">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </AnimatedSection>
                ))}
              </div>

              {/* Response time */}
              <AnimatedSection delay={0.4} direction="right">
                <div className="glass rounded-xl p-5 border border-success-500/10 bg-success-500/5">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={18} className="text-success-400" />
                    <span className="text-sm font-semibold text-white">Response Time</span>
                  </div>
                  <p className="text-sm text-neutral-400">
                    We respond to all inquiries within <strong className="text-white">24 hours</strong>{' '}
                    during business days. For urgent matters, please call directly.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.5} direction="right">
                <div className="glass rounded-xl p-5 border border-accent-500/10">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageCircle size={18} className="text-accent-400" />
                    <span className="text-sm font-semibold text-white">What to expect</span>
                  </div>
                  <ul className="space-y-1.5">
                    {['Free 30-minute consultation call', 'Custom project proposal within 48 hours', 'No commitment required', 'NDA signed before any data sharing'].map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <AnimatedSection direction="left" className="lg:col-span-3" delay={0.2}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
