-- =====================================================
-- Discount Sales Subscription Table for Bokku
-- =====================================================
-- This table stores discount alert subscriptions from the site.
-- Run this SQL in your Supabase SQL Editor.

-- Create the discount_sales table
CREATE TABLE IF NOT EXISTS public.discount_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Subscriber Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_discount_sales_email ON public.discount_sales(email);

-- Create an index on source for filtering by origin
CREATE INDEX IF NOT EXISTS idx_discount_sales_source ON public.discount_sales(source);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_discount_sales_created_at ON public.discount_sales(created_at DESC);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================
-- Enable RLS on the table
ALTER TABLE public.discount_sales ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (anonymous users) to INSERT subscriptions
CREATE POLICY "Allow public insert on discount_sales"
  ON public.discount_sales
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can SELECT subscriptions
CREATE POLICY "Allow admin read on discount_sales"
  ON public.discount_sales
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Add a trigger to automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_discount_sales_updated_at
  BEFORE UPDATE ON public.discount_sales
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- Notes:
-- =====================================================
-- 1. The 'anon' role allows unauthenticated users to submit subscriptions
-- 2. The 'authenticated' role allows logged-in admins to view subscriptions
-- 3. Adjust the SELECT policy based on your admin authentication setup
