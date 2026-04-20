import { createProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";

type NewProjectPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewProjectPage({ searchParams }: NewProjectPageProps) {
  const params = await searchParams;

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl text-slate-100">Add Project</h1>
        <a href="/admin/projects" className="text-sm text-cyan-200">
          Back to list
        </a>
      </div>

      {params.error ? (
        <p className="rounded-md border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {params.error === "invalid_cover"
            ? "Cover image upload failed. Check file type (png/jpg/webp/gif) and max size 5MB."
            : "Invalid input. Please review all fields."}
        </p>
      ) : null}

      <ProjectForm action={createProjectAction} submitLabel="Create Project" />
    </main>
  );
}
