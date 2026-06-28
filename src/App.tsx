import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import LoadingScreen from '@/components/animations/LoadingScreen';
import ScrollToTop from '@/components/layout/ScrollToTop';
import CursorFollower from '@/components/animations/CursorFollower';

// Public pages — lazy loaded
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const Projects = lazy(() => import('@/pages/Projects'));
const CaseStudies = lazy(() => import('@/pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('@/pages/CaseStudyDetail'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogDetail = lazy(() => import('@/pages/BlogDetail'));
const Testimonials = lazy(() => import('@/pages/Testimonials'));
const Careers = lazy(() => import('@/pages/Careers'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Admin pages
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminLeads = lazy(() => import('@/pages/admin/Leads'));
const AdminMessages = lazy(() => import('@/pages/admin/Messages'));
const AdminNewsletter = lazy(() => import('@/pages/admin/Newsletter'));
const AdminBlog = lazy(() => import('@/pages/admin/BlogManagement'));
const AdminTestimonials = lazy(() => import('@/pages/admin/TestimonialsManagement'));
const AdminProjects = lazy(() => import('@/pages/admin/ProjectsManagement'));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CursorFollower />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public routes */}
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="newsletter" element={<AdminNewsletter />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="projects" element={<AdminProjects />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
