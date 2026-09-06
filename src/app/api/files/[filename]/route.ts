import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { fileExists, getFilePath } from "@/lib/storage";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ filename: string }> };

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".json": "application/json",
  ".zip": "application/zip",
};

export async function GET(req: NextRequest, ctx: Ctx) {
  const { filename } = await ctx.params;
  const safe = path.basename(filename);
  if (!safe || safe !== filename || !fileExists(safe)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const full = getFilePath(safe);
  const data = fs.readFileSync(full);
  const ext = path.extname(safe).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  const download = req.nextUrl.searchParams.get("download") === "1";
  const headers = new Headers();
  headers.set("Content-Type", mime);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  if (download) {
    headers.set("Content-Disposition", `attachment; filename="${safe}"`);
  } else {
    headers.set("Content-Disposition", `inline; filename="${safe}"`);
  }

  return new NextResponse(data, { status: 200, headers });
}
