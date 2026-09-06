import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteItem, getItemById, updateItem } from "@/lib/db";
import { deleteFile } from "@/lib/storage";
import type { MediaType } from "@/lib/types";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const item = getItemById(Number(id));
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    const body = await req.json();
    const item = updateItem(Number(id), {
      title: body.title !== undefined ? String(body.title) : undefined,
      description: body.description !== undefined ? String(body.description) : undefined,
      type: body.type !== undefined ? (body.type as MediaType) : undefined,
      tags: body.tags !== undefined ? String(body.tags) : undefined,
      projectUrl: body.projectUrl !== undefined ? body.projectUrl : undefined,
    });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ item });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const item = deleteItem(Number(id));
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  deleteFile(item.filename);
  deleteFile(item.coverFilename);
  return NextResponse.json({ ok: true });
}
