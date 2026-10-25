/* ─────────────────────────────────────────────
   Database Types — Supabase Tables
   ───────────────────────────────────────────── */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  company: string;
  focus_area: string;
  timeline: string;
  requirements: string;
  status: "new" | "reviewed" | "contacted" | "closed";
  created_at: string;
}

export interface CareerApplication {
  id: string;
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  profile_url: string;
  background: string;
  status: "new" | "screening" | "interview" | "offered" | "rejected";
  created_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
  badge_text: string | null;
  is_active: boolean;
  display_location: "banner" | "popup" | "section";
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export type GenericRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmission;
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          company: string;
          focus_area?: string;
          timeline?: string;
          requirements: string;
          status?: "new" | "reviewed" | "contacted" | "closed";
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          company?: string;
          focus_area?: string;
          timeline?: string;
          requirements?: string;
          status?: "new" | "reviewed" | "contacted" | "closed";
          created_at?: string;
        };
        Relationships: GenericRelationship[];
      };
      career_applications: {
        Row: CareerApplication;
        Insert: {
          id?: string;
          job_id: string;
          job_title: string;
          full_name: string;
          email: string;
          profile_url: string;
          background?: string;
          status?: "new" | "screening" | "interview" | "offered" | "rejected";
          created_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          job_title?: string;
          full_name?: string;
          email?: string;
          profile_url?: string;
          background?: string;
          status?: "new" | "screening" | "interview" | "offered" | "rejected";
          created_at?: string;
        };
        Relationships: GenericRelationship[];
      };
      newsletter_subscriptions: {
        Row: NewsletterSubscription;
        Insert: {
          id?: string;
          email: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string;
          created_at?: string;
        };
        Relationships: GenericRelationship[];
      };
      campaigns: {
        Row: Campaign;
        Insert: {
          id?: string;
          title: string;
          description?: string;
          image_url?: string | null;
          link_url?: string | null;
          link_text?: string | null;
          badge_text?: string | null;
          is_active?: boolean;
          display_location?: "banner" | "popup" | "section";
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image_url?: string | null;
          link_url?: string | null;
          link_text?: string | null;
          badge_text?: string | null;
          is_active?: boolean;
          display_location?: "banner" | "popup" | "section";
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: GenericRelationship[];
      };
      [key: string]: {
        Row: any;
        Insert: any;
        Update: any;
        Relationships: any[];
      };
    };
    Views: {
      [key: string]: {
        Row: any;
        Relationships: any[];
      };
    };
    Functions: {
      [key: string]: {
        Args: any;
        Returns: any;
      };
    };
  };
}
