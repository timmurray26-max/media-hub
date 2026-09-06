import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createItem } from "@/lib/db";
import { makeSlug } from "@/lib/slug";
import { storeFile } from "@/lib/storage";
import type { MediaType } from "@/lib/types";

export const runtime = "nodejs";

function detectType(mime: string, name: string): MediaType {
  const lower = name.toLowerCase();
  if (mime === "image/gif" || lower.endsWith(".gif")) return "gif";
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime === "application/pdf" || lower.endsWith(".pdf")) return "pdf";
  if (
    mime.includes("spreadsheet") ||
    mime.includes("excel") ||
    /\.(xlsx?|csv|ods)$/i.test(lower)
  )
    return "spreadsheet";
  if (
    mime.includes("document") ||
    mime.includes("msword") ||
    mime.includes("text/") ||
    /\.(docx?|txt|rtf|md|odt)$/i.test(lower)
  )
    return "doc";
  return "other";
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const title =
      String(form.get("title") || "").trim() ||
      file.name.replace(/\.[^.]+$/, "") ||
      "Untitled";
    const description = String(form.get("description") || "");
    const tags = String(form.get("tags") || "");
    const typeOverride = String(form.get("type") || "");

    const buffer = Buffer.from(await file.arrayBuffer());
    const stored = storeFile(buffer, file.name);
    const mime = file.type || "application/octet-stream";
    const type = (typeOverride as MediaType) || detectType(mime, file.name);

    const item = createItem({
      slug: makeSlug(title),
      title,
      description,
      type,
      tags,
      filename: stored,
      originalName: file.name,
      mimeType: mime,
      sizeBytes: buffer.length,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
