export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: 'web' | 'ai' | 'data';
  tech_stack: string[];
  thumbnail_url: string;
  project_url?: string;
  featured: boolean;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  service_interest: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  avatar_url?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service_interest: string;
  message: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  content: string;
  category: 'web' | 'ai' | 'data';
  tech_stack: string[];
  thumbnail_url: string;
  project_url?: string;
  featured: boolean;
  status: 'draft' | 'published';
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}