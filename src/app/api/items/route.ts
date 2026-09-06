import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createItem, listItems, getAllTags } from "@/lib/db";
import { makeSlug } from "@/lib/slug";
import type { MediaType } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const type = searchParams.get("type") || undefined;
  const tag = searchParams.get("tag") || undefined;
  const items = listItems({ q, type, tag });
  const tags = getAllTags();
  return NextResponse.json({ items, tags });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const type = (body.type || "project") as MediaType;
    const item = createItem({
      slug: makeSlug(title),
      title,
      description: String(body.description || ""),
      type,
      tags: String(body.tags || ""),
      projectUrl: body.projectUrl ? String(body.projectUrl) : null,
      filename: body.filename || null,
      originalName: body.originalName || null,
      mimeType: body.mimeType || null,
      sizeBytes: body.sizeBytes ?? null,
      coverFilename: body.coverFilename || null,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}
