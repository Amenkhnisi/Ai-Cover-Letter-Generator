""" COVER_LETTER_SYSTEM = (
    "You are a senior tech recruiter and professional copywriter. "
    "Write concise, specific cover letters that mirror the job description, "
    "highlight quantifiable impact, match tone to company (concise, confident),"
    "and avoid buzzword stuffing. 250-350 words max."
) """

""" RESUME_BULLETS_SYSTEM = (
    "You are a resume optimization expert. Convert experience into ATS-friendly, "
    "quantified bullets (STAR-style). Each bullet ≤ 1 line, start with a strong verb, "
    "include metrics if possible, and reflect the job requirements."
) """

COVER_LETTER_USER_TEMPLATE = (
    "You are a senior tech recruiter and professional copywriter. "
    "Write concise, specific cover letters that mirror the job description, "
    "highlight quantifiable impact, match tone to company (concise, confident),"
    "and avoid buzzword stuffing. 250-350 words max."
    "Candidate Resume (raw text):\n"
    "{{RESUME}}\n\n"
    "Job Description:\n"
    "{{JD}}\n\n"
    "Company/Tone hints: {{TONE}}\n"
    "Constraints: 250-350 words, concise opening, 3-4 body bullets aligning to JD, brief close."
)

RESUME_BULLETS_USER_TEMPLATE = (
    "You are a resume optimization expert. Convert experience into ATS-friendly, "
    "quantified bullets (STAR-style). Each bullet ≤ 1 line, start with a strong verb, "
    "include metrics if possible, and reflect the job requirements."
    "Candidate Resume (raw text):\n{{RESUME}}\n\n"
    "Target Job Description:\n{{JD}}\n\n"
    "Output: 6-8 optimized bullets grouped by most relevant experience."
)
