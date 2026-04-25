import { put } from "@vercel/blob";

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

export async function uploadProjectCover(file: File) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is missing.");
  }

  const fileName = sanitizeFileName(file.name || "cover.jpg");
  const uniquePrefix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const pathname = `project-covers/${uniquePrefix}-${fileName}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || "image/jpeg",
    token,
  });

  return blob.url;
}
