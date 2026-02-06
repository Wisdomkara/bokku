const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
      message: "Use POST for this endpoint"
    });
  }

  try {
    const body = parseBody(req);
    const { fullName, email, phone, resumeUrl, message, roleId, roleTitle } = body;

    if (!fullName || !email) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Full name and email are required"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email",
        message: "Please provide a valid email address"
      });
    }

    const { data, error } = await supabase
      .from("job_submission")
      .insert([
        {
          full_name: fullName,
          email: email,
          phone: phone || null,
          resume_url: resumeUrl || null,
          message: message || null,
          role_id: roleId || null,
          role_title: roleTitle || null
        }
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Database error",
        message: "Failed to submit application. Please try again."
      });
    }

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: data[0]
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      error: "Server error",
      message: "An unexpected error occurred. Please try again."
    });
  }
};
