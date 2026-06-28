import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Monitor, Brain, Code2, GraduationCap, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import { SERVICES } from '@/constants/services';

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={24} />,
  Monitor: <Monitor size={24} />,
  Brain: <Brain size={24} />,
  Code2: <Code2 size={24} />,
  GraduationCap: <GraduationCap size={24} />,
};

const colorMap = [
  'from-accent-500/20 to-accent-600/10 text-accent-400 border-accent-500/20',
  'from-success-500/20 to-success-600/10 text-success-400 border-success-500/20',
  'from-warning-500/20 to-warning-600/10 text-warning-400 border-warning-500/20',
  'from-primary-500/20 to-primary-600/10 text-primary-400 border-primary-500/20',
  'from-accent-300/20 to-accent-400/10 text-accent-300 border-accent-300/20',
];

export default function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Core Services"
          title="End-to-End Technology"
          titleHighlight="Solutions"
          description="Designed to accelerate growth, eliminate inefficiency, and future-proof your operations."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <StaggerItem key={service.id}>
              <Link to={`/services/${service.slug}`} className="block h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="service-card rounded-2xl p-6 h-full flex flex-col cursor-pointer"
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[i % colorMap.length].split(' ').slice(0, 2).join(' ')} border ${colorMap[i % colorMap.length].split(' ').slice(3).join(' ')} flex items-center justify-center mb-5 ${colorMap[i % colorMap.length].split(' ')[2]}`}
                  >
                    {iconMap[service.icon]}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">{service.name}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed flex-1 mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Features preview */}
                  <ul className="space-y-1.5 mb-5">
                    {service.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-neutral-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm font-medium text-accent-400 group-hover:gap-3 transition-all mt-auto">
                    <span>Learn more</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View all */}
        <div className="text-center mt-12">
          <Link to="/services" className="btn-secondary inline-flex">
            View All Services
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
