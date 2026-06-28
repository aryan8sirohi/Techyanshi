import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import { HERO_STATS } from '@/constants/company';

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="py-20 border-y border-navy-800/50 bg-navy-900/30">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <span className="section-label">By The Numbers</span>
          <h2 className="text-display-md font-display font-bold text-white mt-3">
            Results That <span className="gradient-text-blue">Speak</span>
          </h2>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {HERO_STATS.map((stat, i) => (
            <StaggerContainer key={i}>
              <StaggerItem>
                <div className="relative glass rounded-2xl p-6 text-center group hover:border-accent-500/20 transition-all duration-300 hover:shadow-glow-sm">
                  {/* Glow background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/0 to-accent-500/0 group-hover:from-accent-500/5 group-hover:to-transparent transition-all duration-500" />

                  <div className="relative">
                    <p className="text-4xl lg:text-5xl font-display font-bold stat-number mb-2">
                      {inView ? (
                        <>
                          {stat.prefix && <span>{stat.prefix}</span>}
                          <CountUp
                            end={parseInt(stat.value.replace(/\D/g, '')) || 0}
                            duration={2}
                            enableScrollSpy={false}
                          />
                          {stat.suffix && <span>{stat.suffix}</span>}
                          {isNaN(parseInt(stat.value)) && !stat.prefix && !stat.suffix
                            ? stat.value
                            : null}
                        </>
                      ) : (
                        <span className="opacity-0">0</span>
                      )}
                    </p>
                    <p className="text-sm font-semibold text-white mb-1">{stat.label}</p>
                    <p className="text-xs text-neutral-500">{stat.description}</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
