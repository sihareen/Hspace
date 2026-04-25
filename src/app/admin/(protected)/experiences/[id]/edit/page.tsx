import { notFound } from "next/navigation";

import { deleteExperienceAction, updateExperienceAction } from "@/app/admin/actions";
import { ExperienceForm } from "@/components/admin/experience-form";
import { getPrisma } from "@/lib/prisma";

type EditExperiencePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditExperiencePage({ params, searchParams }: EditExperiencePageProps) {
  const { id } = await params;
  const query = await searchParams;
  const errorMessage =
    query.error === "db_error"
      ? "Failed to update/delete entry in database. Check DATABASE_URL and retry."
      : query.error
        ? "Invalid input. Please review all fields."
        : null;

  const entry = await getPrisma().experienceEntry.findUnique({ where: { id } });
  if (!entry) {
    notFound();
  }

  const boundUpdateAction = updateExperienceAction.bind(null, entry.id);
  const boundDeleteAction = deleteExperienceAction.bind(null, entry.id);

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl text-slate-100">Edit Experience / Education</h1>
        <a href="/admin/experiences" className="text-sm text-cyan-200">
          Back to list
        </a>
      </div>

      {errorMessage ? (
        <p className="rounded-md border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {errorMessage}
        </p>
      ) : null}

      <ExperienceForm
        action={boundUpdateAction}
        submitLabel="Update Entry"
        defaults={{
          period: entry.period,
          title: entry.title,
          description: entry.description,
          tags: entry.tags,
          category: entry.category,
          displayOrder: entry.displayOrder,
        }}
      />

      <form action={boundDeleteAction}>
        <button
          type="submit"
          className="rounded-lg border border-rose-300/50 bg-rose-300/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-rose-100 hover:bg-rose-300/20"
        >
          Delete Entry
        </button>
      </form>
    </main>
  );
}
