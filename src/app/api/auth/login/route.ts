import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = String(body.password || "");
    if (!checkPassword(password)) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }
    await createSession();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
