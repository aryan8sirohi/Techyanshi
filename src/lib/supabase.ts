import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          name: string;
          company: string | null;
          email: string;
          phone: string | null;
          country: string | null;
          service: string | null;
          budget: string | null;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['newsletter_subscribers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>;
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          service: string | null;
          budget: string | null;
          source: string | null;
          status: string;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          category: string | null;
          tags: string[] | null;
          cover_image: string | null;
          author: string;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_title: string | null;
          company: string | null;
          avatar_url: string | null;
          quote: string;
          rating: number;
          service: string | null;
          featured: boolean;
          published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: string;
          description: string;
          cover_image: string | null;
          tags: string[] | null;
          tech_stack: string[] | null;
          outcome: string | null;
          featured: boolean;
          published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['faqs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['faqs']['Insert']>;
      };
      careers: {
        Row: {
          id: string;
          title: string;
          type: string;
          location: string;
          department: string;
          description: string;
          requirements: string[] | null;
          benefits: string[] | null;
          active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['careers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['careers']['Insert']>;
      };
    };
  };
};
