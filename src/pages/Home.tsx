import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FounderSection from '@/components/sections/FounderSection';
import CTASection from '@/components/sections/CTASection';
import ProblemSection from '@/components/sections/ProblemSection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>TechYanshi — Turning Data Into Insights. Building Digital Solutions.</title>
        <meta
          name="description"
          content="TechYanshi helps businesses transform raw data into actionable insights. Data Analytics, Power BI Dashboards, Business Intelligence, Web Development, and Professional Training."
        />
        <link rel="canonical" href="https://www.techyanshi.com/" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'TechYanshi',
          url: 'https://www.techyanshi.com',
          description: 'Data analytics, dashboard development, business intelligence, web development and professional training services.',
          founder: { '@type': 'Person', name: 'Priyanshi Gupta' },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-8955365468',
            email: 'techyanshi1@gmail.com',
            contactType: 'customer service',
          },
        })}</script>
      </Helmet>

      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
