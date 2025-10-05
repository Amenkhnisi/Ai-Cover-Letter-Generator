import { useState } from "react";
import OptionsBar from "./OptionsBar";
import Spinner from "./Spinner";
import { generateAll } from "../api";
import UploadResume from "./UploadResume";

export default function JobDescriptionForm() {
  const [resumeText, setResumeText] = useState("");
  const [jd, setJd] = useState("");
  const [tone, setTone] = useState("balanced professional");
  const [cover, setCover] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isLoading] = useState(false);


  // Helper function
  const convertToBullets = (paragraph: string): string[] => {
    return paragraph
      .split('.')
      .map(bullet => bullet.trim())
      .filter(bullet => bullet.length > 0)
      .map(bullet => bullet + '.');
  };

  async function onGenerate() {
    setError(undefined);
    if (resumeText.trim().length < 200 || jd.trim().length < 50) {
      setError("Please provide at least 200 characters for resume and JD.");
      9
      return;
    }
    setLoading(true);
    try {
      const data = await generateAll({
        resume_text: resumeText,
        job_description: jd,
        tone_hint: tone,
      });

      setCover(data.cover_letter);
      setBullets(convertToBullets(data.bullets));
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Generating failed";

      setError(errorMessage);
      console.error("Generation error:", errorMessage);
    } finally {
      setLoading(false);
    }

  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Resume</h2>
            <OptionsBar tone={tone} setTone={setTone} />
          </div>
          <textarea className="w-full h-64 border rounded p-2"
            placeholder="Paste your resume text or upload .txt"
            value={resumeText} onChange={e => setResumeText(e.target.value)} />
        </div>
        <UploadResume onText={setResumeText} />
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <h2 className="font-semibold mb-3">Job Description</h2>
          <textarea className="w-full h-64 border rounded p-2"
            placeholder="Paste the target JD"
            value={jd} onChange={e => setJd(e.target.value)} />
        </div>
        <div className="flex gap-3">
          <button onClick={onGenerate} className="px-4 py-2 rounded-lg bg-black
text-white disabled:opacity-50" disabled={loading}>
            {loading ? <div className="flex items-center gap-2"><Spinner />
              Generating...</div> : "Generate"}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
      <div className="space-y-4">

        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <h2 className="font-semibold mb-3">Cover Letter</h2>

          <div className="relative">
            <textarea
              className="w-full h-64 border rounded p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              value={cover}
              onChange={e => setCover(e.target.value)}
              placeholder="Your tailored cover letter will appear here..."
              disabled={isLoading}
            />

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">Generating cover letter...</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={() => navigator.clipboard.writeText(cover)}
              disabled={!cover || cover.trim().length === 0 || isLoading}
            >
              Copy
            </button>
            <button
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed"
              onClick={() => download("cover-letter.txt", cover)}
              disabled={!cover || cover.trim().length === 0 || isLoading}
            >
              Download
            </button>
          </div>
        </div>
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <h2 className="font-semibold mb-3">ATS Bullets</h2>

          {/* Editable textarea */}
          <textarea
            className="w-full h-64 border rounded p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bullets.join('\n')}
            onChange={e => setBullets(convertToBullets(e.target.value.replace(/\n/g, '.')))}
            placeholder="Your resume bullets will appear here..."
          />

          {/* Preview as list */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Preview:</h3>
            <div className="space-y-2">
              {bullets.map((bullet, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <p className="text-gray-800 text-sm">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={() => navigator.clipboard.writeText(bullets.join('\n'))}
              disabled={bullets.length === 0}
            >
              Copy All
            </button>
            <button
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed"
              onClick={() => download("resume-bullets.txt", bullets.join('\n'))}
              disabled={bullets.length === 0}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function download(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
