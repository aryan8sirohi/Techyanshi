import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/animations/AnimatedSection';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — TechYanshi</title>
        <meta name="description" content="TechYanshi's Privacy Policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <section className="pt-32 pb-16 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 mesh-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl font-display font-bold text-white mb-4"
          >
            Privacy <span className="gradient-text-blue">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400"
          >
            Last updated: June 28, 2025
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      <section className="py-16">
        <div className="container-custom max-w-3xl">
          <AnimatedSection>
            <div className="prose prose-invert max-w-none
              prose-headings:font-display prose-headings:text-white prose-headings:font-bold
              prose-p:text-neutral-400 prose-p:leading-relaxed
              prose-strong:text-white prose-li:text-neutral-400
            ">
              <h2>Information We Collect</h2>
              <p>When you use our website or contact us, we may collect the following information:</p>
              <ul>
                <li>Name, email address, and phone number</li>
                <li>Company name and project details</li>
                <li>Usage data through analytics tools</li>
                <li>Any information you voluntarily provide in forms</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul>
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send newsletters if you've opted in</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>Data Security</h2>
              <p>We take data security seriously. All project-related data is protected by NDA. We use industry-standard security measures to protect your personal information against unauthorized access, alteration, or disclosure.</p>

              <h2>Third-Party Services</h2>
              <p>We use Supabase for secure data storage and may use analytics tools to understand website usage. These services have their own privacy policies and are bound by data processing agreements.</p>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Opt out of marketing communications at any time</li>
                <li>File a complaint with relevant authorities</li>
              </ul>

              <h2>Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us at <strong>techyanshi1@gmail.com</strong> or call <strong>+91 8955365468</strong>.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
