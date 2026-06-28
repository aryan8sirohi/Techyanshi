import { Linkedin, Github, Mail, Globe } from 'lucide-react';
import AnimatedSection from '@/components/animations/AnimatedSection';
import { COMPANY } from '@/constants/company';

export default function FounderSection() {
  const { founder } = COMPANY;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label">Our Founder</span>
          <h2 className="text-display-md lg:text-display-lg font-display font-bold text-white mt-3">
            Meet the <span className="gradient-text-blue">Mind Behind</span> TechYanshi
          </h2>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <AnimatedSection direction="left" className="relative">
                <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] relative overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-navy-950/20" />
                </div>
              </AnimatedSection>

              {/* Content */}
              <AnimatedSection direction="right" className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-3xl font-display font-bold text-white mb-1">{founder.name}</h3>
                  <p className="text-accent-400 font-medium">{founder.title}</p>
                </div>

                <p className="text-neutral-400 leading-relaxed mb-6">{founder.bio}</p>

                {/* Quote */}
                <blockquote className="glass rounded-xl p-4 border-l-2 border-accent-500 mb-6">
                  <p className="text-sm text-neutral-300 italic">{founder.quote}</p>
                </blockquote>

                {/* Expertise */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Expertise</p>
                  <ul className="space-y-1.5">
                    {founder.expertise.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Core Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {founder.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 glass rounded-lg text-xs font-semibold text-accent-300 border border-accent-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div className="flex gap-3">
                  <a
                    href={founder.social.linkedin}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-neutral-400 hover:text-accent-400 transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={founder.social.github}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-neutral-400 hover:text-accent-400 transition-colors"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={founder.social.portfolio}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-neutral-400 hover:text-accent-400 transition-colors"
                  >
                    <Globe size={16} />
                  </a>
                  <a
                    href={`mailto:${founder.social.email}`}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-neutral-400 hover:text-accent-400 transition-colors"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
