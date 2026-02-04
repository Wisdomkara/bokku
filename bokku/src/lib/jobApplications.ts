type JobApplicationInput = {
  fullName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  message?: string;
  roleId?: string;
  roleTitle?: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase env vars: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

export const submitJobApplication = async (input: JobApplicationInput) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/job_submission`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      resume_url: input.resumeUrl,
      message: input.message,
      role_id: input.roleId,
      role_title: input.roleTitle,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Failed to submit application. Please try again.";
    try {
      const body = await response.json();
      if (body?.message) errorMessage = body.message;
    } catch {
      // ignore parse errors
    }
    throw new Error(errorMessage);
  }

  return response.json();
};
