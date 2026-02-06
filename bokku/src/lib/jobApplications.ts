type JobApplicationInput = {
  fullName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  message?: string;
  roleId?: string;
  roleTitle?: string;
};

// Use backend API instead of direct Supabase connection
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "";

export const submitJobApplication = async (input: JobApplicationInput) => {
  const response = await fetch(`${BACKEND_API_URL}/api/submit-application`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      resumeUrl: input.resumeUrl,
      message: input.message,
      roleId: input.roleId,
      roleTitle: input.roleTitle,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Failed to submit application. Please try again.";
    try {
      const body = await response.json();
      if (body?.error || body?.message) {
        errorMessage = body.message || body.error;
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(errorMessage);
  }

  return response.json();
};
