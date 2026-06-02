import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

function isAdmin() {
  const jar = cookies();
  return (jar as unknown as { get: (k: string) => { value: string } | undefined }).get("admin_token")?.value === process.env.ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || ".jpg";
  const filename = `upload-${Date.now()}${ext}`;
  const dest = path.join(process.cwd(), "public", "images", filename);

  await writeFile(dest, buffer);

  return NextResponse.json({ url: `/images/${filename}` });
}
