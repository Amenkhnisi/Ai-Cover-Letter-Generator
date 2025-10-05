export const API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

export async function generateAll(body: {
  resume_text: string;
  job_description: string;
  tone_hint?: string;
}): Promise<{ cover_letter: string; bullets: string }> {
  const response = await fetch(`${API_BASE}/generate/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": VITE_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let errorMessage = "Request failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      const fallbackText = await response.text();
      if (fallbackText) errorMessage = fallbackText;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
