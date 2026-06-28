import type { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Data Analytics', href: '/services/data-analytics' },
      { label: 'Dashboard Development', href: '/services/dashboard-development' },
      { label: 'Business Intelligence', href: '/services/business-intelligence' },
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Professional Training', href: '/services/professional-training' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
