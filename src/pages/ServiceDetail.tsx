import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BarChart3, Monitor, Brain, Code2, GraduationCap, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { SERVICES } from '@/constants/services';

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={32} />,
  Monitor: <Monitor size={32} />,
  Brain: <Brain size={32} />,
  Code2: <Code2 size={32} />,
  GraduationCap: <GraduationCap size={32} />,
};

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/2 transition-colors"
      >
        <span className="font-medium text-white pr-4">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-neutral-400 flex-shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-neutral-400 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const otherServices = SERVICES.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{service.name} — TechYanshi</title>
        <meta name="description" content={service.longDesc} />
        <link rel="canonical" href={`https://www.techyanshi.com/services/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          description: service.longDesc,
          provider: { '@type': 'Organization', name: 'TechYanshi' },
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
          >
            <Link to="/" className="hover:text-accent-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-accent-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.name}</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/10 border border-accent-500/20 text-accent-400 flex items-center justify-center mb-8"
            >
              {iconMap[service.icon]}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display-xl font-display font-bold text-white mb-6"
            >
              {service.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral-400 leading-relaxed mb-8 max-w-2xl"
            >
              {service.longDesc}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact" className="btn-primary">
                Get Started
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Free Consultation
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* Features + Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <AnimatedSection direction="right">
              <h2 className="text-display-sm font-display font-bold text-white mb-6">
                What's <span className="gradient-text-blue">Included</span>
              </h2>
              <div className="space-y-3">
                {service.features.map(feature => (
                  <div key={feature} className="flex items-start gap-3 glass rounded-xl p-4">
                    <CheckCircle size={18} className="text-success-400 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Benefits */}
            <AnimatedSection direction="left" delay={0.1}>
              <h2 className="text-display-sm font-display font-bold text-white mb-6">
                Key <span className="gradient-text-blue">Benefits</span>
              </h2>
              <div className="space-y-3">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 glass rounded-xl p-4">
                    <span className="w-6 h-6 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-neutral-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-navy-900/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-10">
            <span className="section-label">Tech Stack</span>
            <h2 className="text-display-sm font-display font-bold text-white mt-3">
              Technologies We <span className="gradient-text-blue">Use</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="flex flex-wrap justify-center gap-3">
            {service.technologies.map(tech => (
              <StaggerItem key={tech}>
                <span className="px-5 py-2.5 glass rounded-xl text-sm font-semibold text-accent-300 border border-accent-500/20 hover:border-accent-500/40 hover:shadow-glow-sm transition-all duration-200">
                  {tech}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="text-display-sm font-display font-bold text-white mt-3">
              Frequently Asked <span className="gradient-text-blue">Questions</span>
            </h2>
          </AnimatedSection>
          <div className="space-y-3">
            {service.faq.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <FAQAccordion question={item.question} answer={item.answer} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-16 bg-navy-900/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-10">
            <span className="section-label">Related Services</span>
            <h2 className="text-display-sm font-display font-bold text-white mt-3">
              Explore Other <span className="gradient-text-blue">Services</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherServices.map(s => (
              <StaggerItem key={s.id}>
                <Link to={`/services/${s.slug}`} className="glass rounded-2xl p-5 flex flex-col hover:border-accent-500/20 transition-all duration-300 group">
                  <div className="text-accent-400 mb-3">{iconMap[s.icon]}</div>
                  <h3 className="font-semibold text-white mb-2">{s.name}</h3>
                  <p className="text-sm text-neutral-400 flex-1 mb-3">{s.shortDesc}</p>
                  <span className="text-xs font-medium text-accent-400 group-hover:gap-2 flex items-center gap-1 transition-all">
                    Learn more <ArrowRight size={12} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
