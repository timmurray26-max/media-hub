"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectForm() {
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
    const fd = new FormData(form);

    try {
      let coverFilename: string | null = null;
      const cover = fd.get("cover");
      if (cover && cover instanceof File && cover.size > 0) {
        const up = new FormData();
        up.set("file", cover);
        const upRes = await fetch("/api/upload/raw", { method: "POST", body: up });
        const upJson = await upRes.json();
        if (!upRes.ok) throw new Error(upJson.error || "Cover upload failed");
        coverFilename = upJson.filename;
      }

      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: String(fd.get("title") || "").trim(),
          description: String(fd.get("description") || ""),
          tags: String(fd.get("tags") || ""),
          type: "project",
          projectUrl: String(fd.get("projectUrl") || "").trim() || null,
          coverFilename,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to add project");
      setMessage(`Project added — share link: /i/${json.item.slug}`);
      form.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="studio-card space-y-4 p-5">
      <div>
        <h2 className="text-lg font-semibold">Add a project / app</h2>
        <p className="text-sm text-studio-muted">
          Link to a live site or repo. Optional cover image for the library card.
        </p>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">Title</span>
        <input name="title" required className="studio-input" placeholder="Shape Morph" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">Project URL</span>
        <input name="projectUrl" type="url" className="studio-input" placeholder="https://…" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">Description</span>
        <textarea name="description" rows={3} className="studio-input resize-y" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">Tags (comma-separated)</span>
        <input name="tags" className="studio-input" placeholder="app, interactive" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-studio-muted">Cover image (optional)</span>
        <input name="cover" type="file" accept="image/*" className="studio-input file:mr-3 file:rounded-lg file:border-0 file:bg-studio-accent/20 file:px-3 file:py-1 file:text-studio-accent" />
      </label>

      {error ? <p className="text-sm text-studio-danger">{error}</p> : null}
      {message ? <p className="text-sm text-studio-success">{message}</p> : null}

      <button type="submit" disabled={busy} className="studio-btn-primary">
        {busy ? "Saving…" : "Add project"}
      </button>
    </form>
  );
}
