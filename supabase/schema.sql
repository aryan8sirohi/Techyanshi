/*
# TechYanshi Initial Database Schema

## Overview
This migration creates the complete database schema for the TechYanshi company website.
The site is a single-tenant company website with an admin panel that uses Supabase Auth.
Public visitors interact as `anon` (no sign-in required for contact form, newsletter, etc).
Admin users are authenticated via Supabase Auth and manage all data.

## New Tables

### 1. contacts
Stores contact form submissions from website visitors.
- id: Primary key (uuid)
- name: Visitor's full name
- company: Optional company name
- email: Visitor's email address
- phone: Optional phone number
- country: Optional country
- service: Which service they're interested in
- budget: Budget range selected on form
- message: Project description / message
- status: 'unread' | 'read' | 'replied'
- created_at: Submission timestamp

### 2. newsletter_subscribers
Stores newsletter email subscriptions.
- id: Primary key (uuid)
- email: Subscriber email (unique)
- status: 'active' | 'unsubscribed'
- created_at: Subscription timestamp

### 3. blog_posts
Blog articles with markdown content.
- id: Primary key (uuid)
- title: Post title
- slug: URL-friendly slug (unique)
- excerpt: Short description for listings
- content: Full markdown content
- category: Post category
- tags: Array of tags
- cover_image: URL to cover image
- author: Author name
- published: Whether visible to public
- published_at: Publication date
- created_at, updated_at: Timestamps

### 4. testimonials
Client testimonials/reviews.
- id: Primary key (uuid)
- author_name: Client name
- author_title: Client title/role
- company: Client's company
- avatar_url: Optional profile image URL
- quote: The testimonial text
- rating: Star rating (1-5)
- service: Which service was used
- featured: Whether to highlight prominently
- published: Whether visible to public
- created_at: Creation timestamp

### 5. projects
Portfolio projects / case studies.
- id: Primary key (uuid)
- title: Project title
- slug: URL-friendly slug (unique)
- category: Project type
- description: Project description
- cover_image: Cover image URL
- tags: Array of tags
- tech_stack: Technologies used
- outcome: Results achieved
- featured: Whether to highlight on homepage
- published: Whether visible to public
- created_at: Creation timestamp

### 6. faqs
Frequently asked questions for the FAQ page.
- id: Primary key (uuid)
- question: The question text
- answer: The answer text
- category: FAQ category
- sort_order: Display order
- created_at: Creation timestamp

### 7. careers
Job listings for the careers page.
- id: Primary key (uuid)
- title: Job title
- type: Employment type (Full-time, Contract, etc.)
- location: Work location
- department: Business department
- description: Job description
- requirements: Array of required skills/experience
- benefits: Array of job benefits
- active: Whether listing is currently open
- created_at: Creation timestamp

## Security Notes
- All tables use RLS (Row Level Security)
- Public tables (contacts, newsletter, blog, testimonials, projects, faqs, careers) 
  allow anon reads where appropriate, and anon writes for contact/newsletter
- Admin writes require authenticated session (Supabase Auth)
- The admin panel uses Supabase Auth directly
*/

-- ============================================================
-- CONTACTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  country text,
  service text,
  budget text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Public can INSERT (submit contact form), only authenticated can read/manage
DROP POLICY IF EXISTS "anon_insert_contacts" ON contacts;
CREATE POLICY "anon_insert_contacts" ON contacts FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contacts" ON contacts;
CREATE POLICY "auth_select_contacts" ON contacts FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_contacts" ON contacts;
CREATE POLICY "auth_update_contacts" ON contacts FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contacts" ON contacts;
CREATE POLICY "auth_delete_contacts" ON contacts FOR DELETE
TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public can subscribe (insert/update own email)
DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_newsletter" ON newsletter_subscribers;
CREATE POLICY "auth_select_newsletter" ON newsletter_subscribers FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "anon_update_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_update_newsletter" ON newsletter_subscribers FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_newsletter" ON newsletter_subscribers;
CREATE POLICY "auth_delete_newsletter" ON newsletter_subscribers FOR DELETE
TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);

-- ============================================================
-- BLOG POSTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL DEFAULT '',
  category text,
  tags text[],
  cover_image text,
  author text NOT NULL DEFAULT 'Priyanshi Gupta',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
DROP POLICY IF EXISTS "anon_select_published_blog" ON blog_posts;
CREATE POLICY "anon_select_published_blog" ON blog_posts FOR SELECT
TO anon, authenticated USING (published = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_insert_blog" ON blog_posts;
CREATE POLICY "auth_insert_blog" ON blog_posts FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_blog" ON blog_posts;
CREATE POLICY "auth_update_blog" ON blog_posts FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_blog" ON blog_posts;
CREATE POLICY "auth_delete_blog" ON blog_posts FOR DELETE
TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TESTIMONIALS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_title text,
  company text,
  avatar_url text,
  quote text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  service text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public reads published testimonials
DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT
TO anon, authenticated USING (published = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_insert_testimonials" ON testimonials;
CREATE POLICY "auth_insert_testimonials" ON testimonials FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_testimonials" ON testimonials;
CREATE POLICY "auth_update_testimonials" ON testimonials FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_testimonials" ON testimonials;
CREATE POLICY "auth_delete_testimonials" ON testimonials FOR DELETE
TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published, featured);

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  cover_image text,
  tags text[],
  tech_stack text[],
  outcome text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects" ON projects FOR SELECT
TO anon, authenticated USING (published = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_insert_projects" ON projects;
CREATE POLICY "auth_insert_projects" ON projects FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_projects" ON projects;
CREATE POLICY "auth_update_projects" ON projects FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_projects" ON projects;
CREATE POLICY "auth_delete_projects" ON projects FOR DELETE
TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published, featured);

-- ============================================================
-- FAQS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_faqs" ON faqs;
CREATE POLICY "anon_select_faqs" ON faqs FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_faqs" ON faqs;
CREATE POLICY "auth_insert_faqs" ON faqs FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_faqs" ON faqs;
CREATE POLICY "auth_update_faqs" ON faqs FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_faqs" ON faqs;
CREATE POLICY "auth_delete_faqs" ON faqs FOR DELETE
TO authenticated USING (true);

-- ============================================================
-- CAREERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL DEFAULT 'Full-time',
  location text NOT NULL DEFAULT 'Remote',
  department text NOT NULL,
  description text NOT NULL,
  requirements text[],
  benefits text[],
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE careers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_careers" ON careers;
CREATE POLICY "anon_select_careers" ON careers FOR SELECT
TO anon, authenticated USING (active = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_insert_careers" ON careers;
CREATE POLICY "auth_insert_careers" ON careers FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_careers" ON careers;
CREATE POLICY "auth_update_careers" ON careers FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_careers" ON careers;
CREATE POLICY "auth_delete_careers" ON careers FOR DELETE
TO authenticated USING (true);
