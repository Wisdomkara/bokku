type DiscountSubscriberInput = {
  fullName: string;
  email: string;
  source?: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase env vars: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

export const addDiscountSubscriber = async (input: DiscountSubscriberInput) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/discount_sales`, {
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
      source: input.source,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Failed to subscribe. Please try again.";
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
