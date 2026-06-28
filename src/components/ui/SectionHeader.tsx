import { cn } from '@/lib/utils';
import AnimatedSection from '@/components/animations/AnimatedSection';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-16', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <AnimatedSection delay={0}>
          <span className="section-label">{eyebrow}</span>
        </AnimatedSection>
      )}
      <AnimatedSection delay={0.1}>
        <h2 className={cn('text-display-md lg:text-display-lg font-display font-bold text-white mt-3 mb-4 text-balance')}>
          {title}{' '}
          {titleHighlight && <span className="gradient-text-blue">{titleHighlight}</span>}
        </h2>
      </AnimatedSection>
      {description && (
        <AnimatedSection delay={0.2}>
          <p className={cn('text-neutral-400 text-lg leading-relaxed', align === 'center' && 'max-w-2xl mx-auto')}>
            {description}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
}
