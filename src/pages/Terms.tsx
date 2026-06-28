import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/animations/AnimatedSection';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — TechYanshi</title>
        <meta name="description" content="TechYanshi's Terms of Service. Understand your rights and responsibilities when using our services." />
      </Helmet>

      <section className="pt-32 pb-16 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl font-display font-bold text-white mb-4"
          >
            Terms of <span className="gradient-text-blue">Service</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-neutral-400">
            Last updated: June 28, 2025
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      <section className="py-16">
        <div className="container-custom max-w-3xl">
          <AnimatedSection>
            <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-headings:font-bold prose-p:text-neutral-400 prose-p:leading-relaxed prose-strong:text-white prose-li:text-neutral-400">
              <h2>Acceptance of Terms</h2>
              <p>By accessing or using TechYanshi's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

              <h2>Services</h2>
              <p>TechYanshi provides data analytics, dashboard development, business intelligence, web development, and professional training services. The scope, timeline, and deliverables of each engagement are defined in a separate project agreement or statement of work.</p>

              <h2>Client Responsibilities</h2>
              <p>As a client, you agree to:</p>
              <ul>
                <li>Provide accurate and timely information required for project delivery</li>
                <li>Make payments according to agreed schedules</li>
                <li>Not use our deliverables for illegal purposes</li>
                <li>Maintain confidentiality of any proprietary methodologies shared</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>Upon full payment, clients receive ownership of all custom deliverables created for their project. TechYanshi retains the right to display completed work in portfolio materials unless a separate NDA restricts this.</p>

              <h2>Confidentiality</h2>
              <p>TechYanshi treats all client data and business information as strictly confidential. We sign NDAs at the start of any engagement involving sensitive business data.</p>

              <h2>Limitation of Liability</h2>
              <p>TechYanshi's liability is limited to the fees paid for the specific service in question. We are not responsible for indirect or consequential damages arising from the use of our services.</p>

              <h2>Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be resolved in courts of competent jurisdiction in India.</p>

              <h2>Contact</h2>
              <p>For questions about these terms, contact us at <strong>techyanshi1@gmail.com</strong>.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
