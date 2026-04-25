import { readdir } from "node:fs/promises";
import path from "node:path";

const ALLOWED_IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function isAllowedCoverFileName(fileName: string) {
  const ext = path.extname(fileName).toLowerCase();
  return ALLOWED_IMAGE_EXTENSIONS.has(ext);
}

export function toPublicCoverPath(fileName: string) {
  return `/project-covers/${fileName}`;
}

export async function listProjectCoverFiles() {
  const coversDirectory = path.join(process.cwd(), "public", "project-covers");

  try {
    const entries = await readdir(coversDirectory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && isAllowedCoverFileName(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

export function isValidProjectCoverFileName(value: string | null) {
  if (!value) {
    return false;
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(value)) {
    return false;
  }

  return isAllowedCoverFileName(value);
}
