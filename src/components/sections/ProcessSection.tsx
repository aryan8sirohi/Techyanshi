import { motion } from 'framer-motion';
import { Search, PenTool, Rocket, HeartHandshake } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import { PROCESS_STEPS } from '@/constants/company';

const iconComponents: Record<string, React.ReactNode> = {
  Search: <Search size={22} />,
  PenTool: <PenTool size={22} />,
  Rocket: <Rocket size={22} />,
  HeartHandshake: <HeartHandshake size={22} />,
};

const stepColors = [
  'from-accent-500/20 to-accent-600/10 text-accent-400',
  'from-primary-500/20 to-primary-600/10 text-primary-400',
  'from-success-500/20 to-success-600/10 text-success-400',
  'from-warning-500/20 to-warning-600/10 text-warning-400',
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-navy-900/30">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Process"
          title="How We"
          titleHighlight="Work"
          description="Our proven four-phase methodology ensures every engagement delivers measurable results — from initial discovery through long-term partnership."
        />

        {/* Desktop horizontal layout */}
        <div className="hidden lg:grid grid-cols-4 gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-accent-500/50 via-primary-500/30 to-warning-500/50" />

          {PROCESS_STEPS.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 0.15} className="text-center px-4">
              <div className="relative inline-block mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stepColors[i]} border border-white/10 flex items-center justify-center mx-auto shadow-premium`}>
                  <span className={stepColors[i].split(' ')[2]}>
                    {iconComponents[step.icon]}
                  </span>
                </div>
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-neutral-300">{step.step}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{step.description}</p>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile layout */}
        <StaggerContainer className="lg:hidden space-y-4">
          {PROCESS_STEPS.map((step, i) => (
            <StaggerItem key={step.step}>
              <div className="flex items-start gap-4 glass rounded-2xl p-5">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stepColors[i]} flex items-center justify-center flex-shrink-0`}>
                  <span className={stepColors[i].split(' ')[2]}>{iconComponents[step.icon]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-neutral-500">{step.step}</span>
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-400">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Industries served */}
        <AnimatedSection delay={0.4} className="mt-16">
          <div className="glass rounded-2xl p-8">
            <p className="text-center section-label mb-6">Industries We Serve</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Retail & E-Commerce', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Startups & SMEs'].map(
                industry => (
                  <span
                    key={industry}
                    className="px-4 py-2 glass rounded-full text-sm font-medium text-neutral-300 border border-white/5 hover:border-accent-500/30 hover:text-accent-300 transition-all duration-200"
                  >
                    {industry}
                  </span>
                )
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
