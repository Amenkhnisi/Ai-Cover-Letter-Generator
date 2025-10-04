import { useRef } from "react";


type Props = { onText: (text: string) => void };
export default function UploadResume({ onText }: Props) {
  8;
  const fileRef = useRef<HTMLInputElement>(null);
  async function handleFile(file: File) {
    if (file.name.toLowerCase().endsWith(".txt")) {
      const text = await file.text();
      onText(text);
      console.log(text);
    } else {
      alert("For now upload .txt. You can add PDF/DOCX parsing later.");
    }
  }
  return (
    <div className="flex items-center gap-3">
      <input
        ref={fileRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <button
        className="px-3 py-2 rounded bg-gray-100 border"
        onClick={() => fileRef.current?.click()}
      >
        Upload .txt Resume
      </button>
    </div>
  );
}
