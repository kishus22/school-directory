import { NextResponse } from "next/server";
import { getDB } from "../../../lib/db";   // ✅ relative path
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDB();
  const [rows] = await db.query("SELECT id, name, address, city, image FROM schools ORDER BY id DESC");
  return NextResponse.json(rows);
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const name = form.get("name");
    const address = form.get("address");
    const city = form.get("city");
    const state = form.get("state");
    const contact = form.get("contact");
    const email_id = form.get("email_id");
    const imageFile = form.get("image");

    // Save image to public/schoolImages
    let relPath = "";
    if (imageFile && typeof imageFile === "object" && imageFile.name) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadDir = path.join(process.cwd(), "public", "schoolImages");
      await fs.mkdir(uploadDir, { recursive: true });
      const safeName = Date.now() + "_" + imageFile.name.replace(/\s+/g, "_");
      const dest = path.join(uploadDir, safeName);
      await fs.writeFile(dest, buffer);
      relPath = `/schoolImages/${safeName}`;
    }

    const db = getDB();
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, String(contact ?? ""), relPath, email_id]
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
