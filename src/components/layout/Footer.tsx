import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, BarChart3, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { subscribeNewsletter } from '@/services/newsletter.service';
import toast from 'react-hot-toast';
import { COMPANY } from '@/constants/company';

const footerLinks = {
  Services: [
    { label: 'Data Analytics', href: '/services/data-analytics' },
    { label: 'Dashboard Development', href: '/services/dashboard-development' },
    { label: 'Business Intelligence', href: '/services/business-intelligence' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Professional Training', href: '/services/professional-training' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  Support: [
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribeNewsletter(email);
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative border-t border-navy-800/50 bg-navy-950">
      {/* Subtle gradient top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <div className="container-custom pt-20 pb-10">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <img
                src="/logo.jpg"
                alt="TechYanshi Logo"
                className="w-10 h-10 rounded-xl object-cover shadow-glow-sm"
              />
              <span className="font-display font-bold text-2xl text-white">
                Tech<span className="gradient-text-blue">Yanshi</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              Turning raw data into actionable insights and building scalable digital solutions for businesses worldwide.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 mb-6">
              <a
                href={`tel:${COMPANY.contact.phone}`}
                className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-accent-400 transition-colors"
              >
                <Phone size={14} className="text-accent-500" />
                {COMPANY.contact.phone}
              </a>
              <a
                href={`mailto:${COMPANY.contact.email}`}
                className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-accent-400 transition-colors"
              >
                <Mail size={14} className="text-accent-500" />
                {COMPANY.contact.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-neutral-400">
                <MapPin size={14} className="text-accent-500" />
                {COMPANY.contact.location}
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={COMPANY.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-neutral-400 hover:text-accent-400 hover:border-accent-500/30 transition-all duration-200"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={COMPANY.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-neutral-400 hover:text-accent-400 hover:border-accent-500/30 transition-all duration-200"
              >
                <Github size={15} />
              </a>
              <a
                href={`https://${COMPANY.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-neutral-400 hover:text-accent-400 hover:border-accent-500/30 transition-all duration-200"
              >
                <Globe size={15} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={18} className="text-accent-400" />
                <span className="section-label">Newsletter</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Data insights in your inbox</h3>
              <p className="text-sm text-neutral-400">
                Join 500+ business leaders getting weekly analytics tips and industry insights.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="input-field flex-1 md:w-64 text-sm py-2.5"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-sm px-5 py-2.5 flex-shrink-0 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-navy-800/50">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} TechYanshi. All rights reserved.
          </p>
          <p className="text-sm text-neutral-500">
            Built with precision by{' '}
            <span className="text-accent-400 font-medium">Priyanshi Gupta</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
