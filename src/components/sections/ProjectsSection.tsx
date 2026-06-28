import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import { PROJECTS } from '@/constants/projects';

const featured = PROJECTS.filter(p => p.featured);

export default function ProjectsSection() {
  return (
    <section className="section-padding bg-navy-900/20">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Work"
          title="Real Projects, Real"
          titleHighlight="Results"
          description="From analytics dashboards to full-stack applications — real projects that transform data into decisions and ideas into digital solutions."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featured.map((project, i) => (
            <StaggerItem key={project.id}>
              <Link to={`/projects`} className="block">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-2xl overflow-hidden group cursor-pointer h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                    {/* Overlay CTA */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="glass rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium text-white border border-white/20">
                        <ExternalLink size={14} />
                        View Project
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 glass rounded-full text-xs font-semibold text-accent-300 border border-accent-500/20">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack?.slice(0, 4).map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-navy-800 rounded-lg text-xs font-medium text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center">
          <Link to="/projects" className="btn-secondary inline-flex">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
