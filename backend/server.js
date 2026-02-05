require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase client with SERVICE ROLE KEY (bypasses RLS)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running' });
});

// Job application submission endpoint
app.post('/api/submit-application', async (req, res) => {
  try {
    const { fullName, email, phone, resumeUrl, message, roleId, roleTitle } = req.body;

    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Full name and email are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please provide a valid email address'
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('job_submission')
      .insert([
        {
          full_name: fullName,
          email: email,
          phone: phone || null,
          resume_url: resumeUrl || null,
          message: message || null,
          role_id: roleId || null,
          role_title: roleTitle || null,
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        error: 'Database error',
        message: 'Failed to submit application. Please try again.'
      });
    }

    // Success response
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: data[0]
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'An unexpected error occurred. Please try again.'
    });
  }
});

// Discount subscription endpoint
app.post('/api/subscribe-discount', async (req, res) => {
  try {
    const { fullName, email, source } = req.body;

    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Full name and email are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please provide a valid email address'
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('discount_sales')
      .insert([
        {
          full_name: fullName,
          email: email,
          source: source || null,
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        error: 'Database error',
        message: 'Failed to subscribe. Please try again.'
      });
    }

    // Success response
    res.status(201).json({
      success: true,
      message: 'Subscription received successfully',
      data: data[0]
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'An unexpected error occurred. Please try again.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Discount subscription endpoint: http://localhost:${PORT}/api/subscribe-discount`);
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
  console.log(`📝 Job application endpoint: http://localhost:${PORT}/api/submit-application`);
});
