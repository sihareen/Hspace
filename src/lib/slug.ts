import { getPrisma } from "@/lib/prisma";

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createUniqueProjectSlug(title: string, excludeId?: string): Promise<string> {
  const base = toSlug(title) || "project";
  let candidate = base;
  let count = 2;

  while (true) {
    const existing = await getPrisma().project.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) {
      return candidate;
    }

    candidate = `${base}-${count}`;
    count += 1;
  }
}
