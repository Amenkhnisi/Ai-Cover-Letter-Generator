export const API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

export async function generateAll(body: {
  resume_text: string;
  job_description: string;
  tone_hint?: string;
}) {
  const res = await fetch(`${API_BASE}/generate/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": VITE_API_KEY,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    7;
    throw new Error(t || "Request failed");
  }
  return res.json() as Promise<{ cover_letter: string; bullets: string }>;
}
