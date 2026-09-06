"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-studio-accent">Owner</p>
        <h1 className="text-2xl font-semibold text-white">Log in</h1>
        <p className="text-sm text-studio-muted">
          Only you can upload or delete. Visitors can still browse and open share links.
        </p>
      </div>
      <form onSubmit={onSubmit} className="studio-card space-y-4 p-6">
        <label className="block space-y-1.5 text-sm">
          <span className="text-studio-muted">Admin password</span>
          <input
            type="password"
            autoComplete="current-password"
            className="studio-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error ? <p className="text-sm text-studio-danger">{error}</p> : null}
        <button type="submit" disabled={busy} className="studio-btn-primary w-full">
          {busy ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
