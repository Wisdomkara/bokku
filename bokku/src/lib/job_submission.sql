-- =====================================================
-- Job Submission Table for Bokku Career Applications
-- =====================================================
-- This table stores job applications submitted through the Career Page.
-- Run this SQL in your Supabase SQL Editor.

-- Create the job_submission table
CREATE TABLE IF NOT EXISTS public.job_submission (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Applicant Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  message TEXT,
  
  -- Job Information
  role_id TEXT,
  role_title TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_job_submission_email ON public.job_submission(email);

-- Create an index on role_id for filtering by job role
CREATE INDEX IF NOT EXISTS idx_job_submission_role_id ON public.job_submission(role_id);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_job_submission_created_at ON public.job_submission(created_at DESC);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================
-- Enable RLS on the table
ALTER TABLE public.job_submission ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (anonymous users) to INSERT job applications
-- This allows the public career form to submit applications
CREATE POLICY "Allow public insert on job_submission"
  ON public.job_submission
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can SELECT applications
-- You can modify this to use a specific role or user ID check
CREATE POLICY "Allow admin read on job_submission"
  ON public.job_submission
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

CREATE TRIGGER update_job_submission_updated_at
  BEFORE UPDATE ON public.job_submission
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- Notes:
-- =====================================================
-- 1. The 'anon' role allows unauthenticated users to submit applications
-- 2. The 'authenticated' role allows logged-in admins to view submissions
-- 3. Adjust the SELECT policy based on your admin authentication setup
-- 4. Consider adding email validation or rate limiting at the application level
