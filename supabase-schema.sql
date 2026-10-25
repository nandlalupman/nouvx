-- =============================================
-- NOUVX Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- =============================================

-- ── 1. Contact Form Submissions ──
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  focus_area TEXT NOT NULL DEFAULT 'Full-Stack Physical AI Platform',
  timeline TEXT NOT NULL DEFAULT 'Immediate (Production Readiness)',
  requirements TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 2. Career Applications ──
CREATE TABLE IF NOT EXISTS career_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id TEXT NOT NULL,
  job_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  profile_url TEXT NOT NULL,
  background TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'screening', 'interview', 'offered', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 3. Newsletter Subscriptions ──
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 4. Campaigns / Promotions ──
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  link_url TEXT,
  link_text TEXT DEFAULT 'Learn More',
  badge_text TEXT DEFAULT 'NEW',
  is_active BOOLEAN DEFAULT true,
  display_location TEXT DEFAULT 'banner' CHECK (display_location IN ('banner', 'popup', 'section')),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── 5. Storage Bucket for campaign images ──
INSERT INTO storage.buckets (id, name, public)
VALUES ('campaign-images', 'campaign-images', true)
ON CONFLICT (id) DO NOTHING;

-- ── 6. Row Level Security (RLS) Policies ──

-- Contact submissions: anyone can insert, only authenticated can read
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read contacts" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contacts" ON contact_submissions
  FOR UPDATE TO authenticated
  USING (true);

-- Career applications: anyone can insert, only authenticated can read
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit application" ON career_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read applications" ON career_applications
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update applications" ON career_applications
  FOR UPDATE TO authenticated
  USING (true);

-- Newsletter: anyone can insert, only authenticated can read
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" ON newsletter_subscriptions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read subscribers" ON newsletter_subscriptions
  FOR SELECT TO authenticated
  USING (true);

-- Campaigns: anyone can read active, only authenticated can modify
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active campaigns" ON campaigns
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage campaigns" ON campaigns
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Storage policies for campaign images
CREATE POLICY "Anyone can view campaign images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'campaign-images');

CREATE POLICY "Authenticated users can upload campaign images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'campaign-images');

CREATE POLICY "Authenticated users can delete campaign images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'campaign-images');

-- ── 7. Indexes for performance ──
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status ON career_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON career_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_campaigns_active ON campaigns(is_active, display_location);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- ── 8. Updated_at trigger for campaigns ──
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
