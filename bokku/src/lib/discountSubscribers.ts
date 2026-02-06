type DiscountSubscriberInput = {
  fullName: string;
  email: string;
  source?: string;
};

// Use backend API instead of direct Supabase connection
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "";

export const addDiscountSubscriber = async (input: DiscountSubscriberInput) => {
  const response = await fetch(`${BACKEND_API_URL}/api/subscribe-discount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: input.fullName,
      email: input.email,
      source: input.source,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Failed to subscribe. Please try again.";
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
