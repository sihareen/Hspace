import type { ExperienceEntry } from "@prisma/client";

import { getPrisma } from "@/lib/prisma";

export default async function AdminExperiencesPage() {
  let entries: ExperienceEntry[] = [];
  let hasDbError = false;

  try {
    entries = await getPrisma().experienceEntry.findMany({
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    });
  } catch (error) {
    console.error("Failed to load experience entries.", error);
    hasDbError = true;
  }

  return (
    <main className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl text-slate-100">Manage Experience / Education</h1>
        <a
          href="/admin/experiences/new"
          className="rounded-md border border-cyan-300/50 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.15em] text-cyan-100"
        >
          Add Entry
        </a>
      </div>

      <div className="space-y-3">
        {hasDbError ? (
          <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-200">
            Failed to load experience data. Check `DATABASE_URL`.
          </p>
        ) : null}

        {entries.length === 0 ? (
          <p className="rounded-xl border border-cyan-300/15 bg-slate-900/60 p-4 text-sm text-slate-300">
            No entries yet. Add your first experience or education item.
          </p>
        ) : (
          entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-xl border border-cyan-300/15 bg-slate-900/70 p-4 md:flex md:items-center md:justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-cyan-200">{entry.category}</p>
                <h2 className="mt-1 text-lg text-slate-100">{entry.title}</h2>
                {entry.company ? <p className="mt-1 text-sm text-slate-300">{entry.company}</p> : null}
                <p className="mt-1 text-sm text-slate-400">{entry.period}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-500">Order: {entry.displayOrder}</p>
              </div>
              <a
                href={`/admin/experiences/${entry.id}/edit`}
                className="mt-3 inline-block rounded-md border border-cyan-300/30 px-3 py-2 text-xs uppercase tracking-[0.12em] text-cyan-200 md:mt-0"
              >
                Edit
              </a>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
