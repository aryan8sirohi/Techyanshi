import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection from '@/components/animations/AnimatedSection';
import { COMPARISON_TABLE } from '@/constants/company';

export default function WhyUsSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Why TechYanshi"
          title="What Makes Us"
          titleHighlight="Different"
          description="We don't just deliver reports. We build lasting data capabilities and digital solutions that compound in value over time."
        />

        <div className="max-w-3xl mx-auto">
          {/* Comparison table */}
          <AnimatedSection delay={0.2}>
            <div className="glass rounded-2xl overflow-hidden border border-navy-700/50">
              {/* Header */}
              <div className="grid grid-cols-2 bg-navy-800/50">
                <div className="px-6 py-4 text-sm font-semibold text-neutral-400 border-r border-navy-700/50">
                  Others
                </div>
                <div className="px-6 py-4 text-sm font-semibold text-accent-400">
                  TechYanshi
                </div>
              </div>

              {/* Rows */}
              {COMPARISON_TABLE.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 border-t border-navy-800/50 hover:bg-white/2 transition-colors"
                >
                  <div className="px-6 py-4 border-r border-navy-700/50 flex items-center gap-3">
                    <X size={16} className="text-error-400 flex-shrink-0" />
                    <span className="text-sm text-neutral-400">{row.others}</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <CheckCircle size={16} className="text-success-400 flex-shrink-0" />
                    <span className="text-sm text-white font-medium">{row.techyanshi}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Value props below */}
          <AnimatedSection delay={0.4} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: '5x', label: 'Faster Decisions', desc: 'Data analytics advantage' },
              { value: '40%', label: 'More Efficiency', desc: 'With real-time dashboards' },
              { value: '2.3x', label: 'Revenue Growth', desc: 'Data-driven vs manual' },
            ].map(item => (
              <div key={item.label} className="glass rounded-xl p-5 text-center">
                <p className="text-3xl font-bold stat-number mb-1">{item.value}</p>
                <p className="text-sm font-semibold text-white mb-0.5">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
