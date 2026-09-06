import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { storeFile } from "@/lib/storage";

export const runtime = "nodejs";

/** Store a file on disk without creating a library item (e.g. project covers). */
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
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = storeFile(buffer, file.name);
    return NextResponse.json({
      filename,
      originalName: file.name,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: buffer.length,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
