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

export function parseProjectCoverImages(rawValue: string | null | undefined) {
  if (!rawValue) {
    return [];
  }

  const normalized = rawValue.trim();
  if (!normalized) {
    return [];
  }

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return [normalized];
  }

  return normalized
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeProjectCoverFileNames(fileNames: string[]) {
  const unique = new Set<string>();

  for (const fileName of fileNames) {
    const normalized = fileName.trim();
    if (!normalized || !isValidProjectCoverFileName(normalized)) {
      continue;
    }
    unique.add(normalized);
  }

  return [...unique];
}

export function serializeProjectCoverImagesFromFileNames(fileNames: string[]) {
  const normalized = normalizeProjectCoverFileNames(fileNames);
  if (normalized.length === 0) {
    return null;
  }

  return normalized.map(toPublicCoverPath).join(",");
}

export function parseLocalCoverFileNamesFromStoredImages(rawValue: string | null | undefined) {
  return parseProjectCoverImages(rawValue)
    .filter((item) => item.startsWith("/project-covers/"))
    .map((item) => item.replace("/project-covers/", ""));
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
