import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  BarChart3,
  Monitor,
  Brain,
  Code2,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/constants/nav';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'data-analytics': <BarChart3 size={18} className="text-accent-400" />,
  'dashboard-development': <Monitor size={18} className="text-accent-400" />,
  'business-intelligence': <Brain size={18} className="text-accent-400" />,
  'web-development': <Code2 size={18} className="text-accent-400" />,
  'professional-training': <GraduationCap size={18} className="text-accent-400" />,
};

const SERVICE_DESCS: Record<string, string> = {
  'data-analytics': 'Clean, analyze & visualize data',
  'dashboard-development': 'Power BI & Tableau dashboards',
  'business-intelligence': 'Strategic BI frameworks',
  'web-development': 'High-performance web apps',
  'professional-training': 'Upskilling programs',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-navy-950/90 backdrop-blur-xl border-b border-navy-800/50 shadow-premium'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="TechYanshi Logo"
              className="w-9 h-9 rounded-xl object-cover shadow-glow-sm group-hover:shadow-glow transition-all duration-300"
            />
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Tech<span className="gradient-text-blue">Yanshi</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item =>
              item.children ? (
                <div key={item.label} ref={megaRef} className="relative">
                  <button
                    onClick={() => setMegaOpen(v => !v)}
                    className={cn(
                      'btn-ghost flex items-center gap-1.5',
                      megaOpen && 'text-white bg-white/5'
                    )}
                  >
                    {item.label}
                    <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={14} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[460px] glass-dark rounded-2xl p-3 border border-navy-700/50 shadow-premium"
                      >
                        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest px-3 py-2">
                          Our Services
                        </p>
                        <div className="grid grid-cols-1 gap-1">
                          {item.children.map(child => {
                            const slug = child.href.replace('/services/', '');
                            return (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center group-hover:bg-accent-500/10 transition-all duration-200 flex-shrink-0">
                                  {SERVICE_ICONS[slug]}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">{child.label}</p>
                                  <p className="text-xs text-neutral-500">{SERVICE_DESCS[slug]}</p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="border-t border-navy-700/50 mt-2 pt-2">
                          <Link
                            to="/services"
                            className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-accent-400 hover:text-accent-300 font-medium transition-colors"
                          >
                            View all services →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn('btn-ghost', isActive && 'text-white bg-white/5')
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="btn-primary text-sm px-5 py-2.5">
              Get Free Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-white"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-navy-950/95 backdrop-blur-xl border-t border-navy-800/50"
          >
            <div className="container-custom py-4 space-y-1">
              {NAV_ITEMS.map(item =>
                item.children ? (
                  <div key={item.label}>
                    <p className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                      Services
                    </p>
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 text-neutral-300 hover:text-white transition-all"
                      >
                        {SERVICE_ICONS[child.href.replace('/services/', '')]}
                        <span className="text-sm font-medium">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                        isActive
                          ? 'text-white bg-white/5'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
              <div className="pt-2 border-t border-navy-800/50">
                <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
