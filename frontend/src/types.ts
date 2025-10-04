export interface GenerateRequest {
  resume_text: string;
  job_description: string;
  tone_hint?: string;
}

export interface GenerateResponse {
  cover_letter: string;
  bullets: string[];
}
