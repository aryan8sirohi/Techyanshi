# TechYanshi

A production-ready company website for TechYanshi - a data analytics and technology consulting company. Built with modern web technologies for premium performance and user experience.

## Tech Stack

- **Framework**: React 19 + Vite 7 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Routing**: React Router DOM v7
- **State**: TanStack Query (React Query)
- **Forms**: React Hook Form + Yup validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  components/          # Reusable UI components
    animations/        # Animation components (Framer Motion)
    forms/             # Form components (Contact, Newsletter)
    layout/            # Layout components (Navbar, Footer, AdminLayout)
    sections/          # Page sections (Hero, Services, etc.)
    ui/                # Base UI components (Button, Card, etc.)
  constants/           # Static data and configuration
  hooks/               # Custom React hooks
  lib/                 # Utilities and configurations
    supabase.ts        # Supabase client setup
    utils.ts           # Helper functions
  pages/               # Route pages
    admin/             # Admin panel pages
  services/            # API service functions
  styles/              # Global styles
  types/               # TypeScript type definitions
```

## Features

### Public Site
- Hero section with particle canvas animation
- Services with detailed pages
- Projects portfolio
- Blog with markdown support
- Testimonials with star ratings
- Contact form with lead capture
- Newsletter subscription
- FAQ accordion
- Careers listing
- Responsive design (mobile-first)
- Premium animations and micro-interactions

### Admin Panel
- Dashboard with metrics overview
- Contact/Lead management
- Newsletter subscriber management
- Blog post editor (markdown)
- Testimonial management
- Project portfolio management
- CSV export functionality
- Authentication via Supabase Auth

## Database Schema

Tables:
- `contacts` - Contact form submissions
- `newsletter_subscribers` - Newsletter subscriptions
- `blog_posts` - Blog content
- `testimonials` - Client testimonials
- `projects` - Portfolio projects
- `faqs` - FAQ entries
- `careers` - Job listings

All tables have Row Level Security (RLS) enabled.

## Admin Access

Navigate to `/admin/login` and sign in with your Supabase credentials.

## Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:
- `navy` - Primary dark backgrounds
- `accent` - Accent/CTA color (cyan/teal)
- `primary` - Secondary accent (blue)

### Content
Update files in `src/constants/`:
- `company.ts` - Company info, stats
- `services.ts` - Service offerings
- `projects.ts` - Portfolio projects
- `faqs.ts` - FAQ entries

## SEO

- Meta tags configured in `index.html`
- `robots.txt` in `/public`
- `sitemap.xml` in `/public`
- React Helmet for dynamic page titles

## Deployment

The site is ready for deployment to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting

Build output is in the `dist/` folder after running `npm run build`.

## License

Proprietary - All rights reserved.
