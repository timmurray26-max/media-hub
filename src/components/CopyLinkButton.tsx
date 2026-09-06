"use client";

import { useState } from "react";

export default function CopyLinkButton({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older browsers
      prompt("Copy this link:", url);
    }
  }

  return (
    <button type="button" onClick={copy} className="studio-btn-ghost">
      {copied ? "Copied!" : "Copy share link"}
    </button>
  );
}
