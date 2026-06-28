export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  service?: string;
  budget?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  notes?: string;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  tags?: string[];
  cover_image?: string;
  author: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_title?: string;
  company?: string;
  avatar_url?: string;
  quote: string;
  rating: number;
  service?: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  cover_image?: string;
  tags?: string[];
  tech_stack?: string[];
  outcome?: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  faq: Array<{ question: string; answer: string }>;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  sort_order: number;
}

export interface Career {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  active: boolean;
  created_at: string;
}

export interface Stat {
  value: string;
  label: string;
  description?: string;
  suffix?: string;
  prefix?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  meta?: PaginationMeta;
}
