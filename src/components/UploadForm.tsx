"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MEDIA_TYPES } from "@/lib/types";

export default function UploadForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setMessage(`Uploaded — share link: /i/${json.item.slug}`);
      form.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="studio-card space-y-4 p-5">
      <div>
        <h2 className="text-lg font-semibold">Upload a file</h2>
        <p className="text-sm text-studio-muted">
          Images, videos, GIFs, PDFs, docs, spreadsheets, or anything else.
        </p>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">File</span>
        <input name="file" type="file" required className="studio-input file:mr-3 file:rounded-lg file:border-0 file:bg-studio-accent/20 file:px-3 file:py-1 file:text-studio-accent" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">Title (optional — defaults to filename)</span>
        <input name="title" className="studio-input" placeholder="My cool still" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">Description</span>
        <textarea name="description" rows={3} className="studio-input resize-y" placeholder="What is this?" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">Tags (comma-separated)</span>
        <input name="tags" className="studio-input" placeholder="studio, wip, 2026" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">Type (optional override)</span>
        <select name="type" className="studio-input" defaultValue="">
          <option value="">Auto-detect</option>
          {MEDIA_TYPES.filter((t) => t.value !== "project").map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      {error ? <p className="text-sm text-studio-danger">{error}</p> : null}
      {message ? <p className="text-sm text-studio-success">{message}</p> : null}

      <button type="submit" disabled={busy} className="studio-btn-primary">
        {busy ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
