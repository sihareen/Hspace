import { createExperienceAction } from "@/app/admin/actions";
import { ExperienceForm } from "@/components/admin/experience-form";

type NewExperiencePageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewExperiencePage({ searchParams }: NewExperiencePageProps) {
  const params = await searchParams;
  const errorMessage =
    params.error === "db_error"
      ? "Failed to save entry to database. Check DATABASE_URL and retry."
      : params.error
        ? "Invalid input. Please review all fields."
        : null;

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl text-slate-100">Add Experience / Education</h1>
        <a href="/admin/experiences" className="text-sm text-cyan-200">
          Back to list
        </a>
      </div>

      {errorMessage ? (
        <p className="rounded-md border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {errorMessage}
        </p>
      ) : null}

      <ExperienceForm action={createExperienceAction} submitLabel="Create Entry" />
    </main>
  );
}
