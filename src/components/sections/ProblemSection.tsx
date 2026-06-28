import { AlertTriangle, Eye, Globe, Zap } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import { PROBLEM_STATS, DATA_PIPELINE_STEPS } from '@/constants/company';

const problemItems = [
  { icon: <AlertTriangle size={20} className="text-warning-400" />, title: 'Data Overload', desc: 'Too much data, too little clarity. Teams waste hours in spreadsheets instead of making decisions.' },
  { icon: <Eye size={20} className="text-error-400" />, title: 'No Visibility', desc: 'No dashboards, no real-time tracking. Leadership is always one report away from insight.' },
  { icon: <Globe size={20} className="text-neutral-400" />, title: 'Weak Digital Presence', desc: 'No professional website or online identity means opportunities lost every single day.' },
  { icon: <Zap size={20} className="text-accent-400" />, title: 'Slow Decisions', desc: 'Guesswork replaces data-driven strategy. Every day of delay costs your business revenue.' },
];

export default function ProblemSection() {
  return (
    <section className="section-padding bg-navy-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="The Challenge"
          title="The Data Problem"
          titleHighlight="Is Real"
          description="Businesses collect huge amounts of data — but most struggle to understand it, visualize it, or use it to make decisions. Without the right tools, data becomes noise."
        />

        {/* Stats grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {PROBLEM_STATS.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="glass rounded-2xl p-5 text-center border border-navy-700/50">
                <p className="text-3xl lg:text-4xl font-bold stat-number mb-2">{stat.value}</p>
                <p className="text-sm font-semibold text-white mb-1">{stat.label}</p>
                <p className="text-xs text-neutral-500 leading-relaxed">{stat.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Problem cards + Pipeline side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Problems */}
          <div>
            <AnimatedSection delay={0.1} className="mb-6">
              <p className="section-label">Pain Points</p>
              <h3 className="text-display-sm font-display font-bold text-white mt-2">
                Is Your Business Flying Blind?
              </h3>
            </AnimatedSection>
            <div className="space-y-4">
              {problemItems.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1 + 0.2}>
                  <div className="glass rounded-xl p-4 flex items-start gap-4 hover:border-white/15 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Data pipeline */}
          <AnimatedSection direction="left" delay={0.3}>
            <div className="glass rounded-2xl p-8">
              <p className="section-label mb-6">Our Solution</p>
              <h3 className="text-xl font-bold text-white mb-8">From Raw Data to Business Growth</h3>
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-accent-500/50 via-primary-500/30 to-warning-500/50" />

                <div className="space-y-4">
                  {DATA_PIPELINE_STEPS.map((step, i) => (
                    <div key={i} className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-primary-500/10 border border-accent-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-accent-400">{step.step}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{step.title}</p>
                        <p className="text-xs text-neutral-500">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
