import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubmitNeedPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const isVoice = file.type.startsWith("audio/");
    const endpoint = isVoice ? "/extract/voice" : "/extract/form";

    try {
      setUploading(false);
      setProcessing(true);

      const response = await fetch(
        `https://sahaay-923054627985.asia-south1.run.app${endpoint}`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to process file. Please try again.");
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-emerald-200/50 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-10">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg">
              <img src="/sahaay.png" alt="Sahaay Logo" className="h-full w-full object-contain p-1" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">Sahaay</h1>
              <p className="text-xs text-emerald-700">Submit a Need</p>
            </div>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 lg:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black tracking-tight text-slate-900">
            Submit a Field Report
          </h2>
          <p className="mt-4 text-slate-600">
            Upload a photo of a handwritten form or a voice note. Our AI will extract the need automatically.
          </p>
        </div>

        <div className="rounded-[2rem] border border-emerald-200/60 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="rounded-[1.5rem] border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-8 text-center">
            <p className="mb-4 text-sm font-semibold text-slate-700">
              Upload photo (JPG/PNG) or voice note (MP3/WAV)
            </p>
            <input
              type="file"
              accept="image/*,audio/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-500 file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-emerald-600"
            />
            {file && (
              <p className="mt-3 text-sm text-emerald-700 font-medium">
                Selected: {file.name}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!file || uploading || processing}
            className={`mt-6 w-full rounded-2xl px-6 py-4 font-semibold text-white shadow-lg transition ${file && !uploading && !processing
              ? "bg-gradient-to-r from-emerald-500 to-sky-500 hover:-translate-y-0.5"
              : "cursor-not-allowed bg-slate-300"
              }`}
          >
            {uploading ? "Uploading..." : processing ? "Processing with AI (~20s)..." : "Submit for Processing"}
          </button>

          {processing && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
              <p className="text-amber-800 font-semibold">
                🤖 Gemini is processing your form...
              </p>
              <p className="mt-1 text-sm text-amber-600">
                This takes about 20 seconds. Please wait.
              </p>
              <div className="mt-4 h-2 w-full rounded-full bg-amber-200 overflow-hidden">
                <div className="h-2 rounded-full bg-amber-500 animate-pulse w-3/4" />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5">
              <p className="text-rose-700 font-semibold">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="text-lg font-bold mb-4">
                ✅ Need extracted and saved to Firestore
              </h3>
              <div className="space-y-2 text-sm text-slate-700">
                <p><span className="font-semibold">Summary:</span> {result.content?.summary}</p>
                <p><span className="font-semibold">Category:</span> {result.category?.primary}</p>
                <p><span className="font-semibold">Urgency:</span> {result.urgency?.score}/10</p>
                <p><span className="font-semibold">Location:</span> {result.location?.address_text}, {result.location?.district}</p>
                <p><span className="font-semibold">Skills needed:</span> {(result.skills_required || []).join(", ")}</p>
                <p><span className="font-semibold">Status:</span> {result.verification_status}</p>
                <p><span className="font-semibold">Concern:</span> {result.content?.extracted_fields?.primary_concern_english}</p>
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => navigate("/ngo")}
                  className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Go to Coordinator Dashboard →
                </button>
                <button
                  onClick={() => {
                    const content = `
SAHAAY - FIELD REPORT
=====================
Summary: ${result.content?.summary}
Category: ${result.category?.primary}
Urgency: ${result.urgency?.score}/10
Location: ${result.location?.address_text}, ${result.location?.district}
Skills Needed: ${(result.skills_required || []).join(", ")}
Status: ${result.verification_status}
Concern: ${result.content?.extracted_fields?.primary_concern_english}
      `.trim();
                    const blob = new Blob([content], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "field-report.txt";
                    a.click();
                  }}
                  className="rounded-xl border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50"
                >
                  Download Report
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
