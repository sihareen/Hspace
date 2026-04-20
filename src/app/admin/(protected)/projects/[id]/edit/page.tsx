import { notFound } from "next/navigation";

import { deleteProjectAction, updateProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";
import { getPrisma } from "@/lib/prisma";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditProjectPage({ params, searchParams }: EditProjectPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const project = await getPrisma().project.findUnique({ where: { id } });
  if (!project) {
    notFound();
  }

  const boundUpdateAction = updateProjectAction.bind(null, project.id);
  const boundDeleteAction = deleteProjectAction.bind(null, project.id);

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl text-slate-100">Edit Project</h1>
        <a href="/admin/projects" className="text-sm text-cyan-200">
          Back to list
        </a>
      </div>

      {query.error ? (
        <p className="rounded-md border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          Invalid input. Please review all fields.
        </p>
      ) : null}

      <ProjectForm
        action={boundUpdateAction}
        submitLabel="Update Project"
        defaults={{
          title: project.title,
          description: project.description,
          techStack: project.techStack,
          externalUrl: project.externalUrl,
          coverImage: project.coverImage ?? "",
          status: project.status,
        }}
      />

      <form action={boundDeleteAction}>
        <button
          type="submit"
          className="rounded-lg border border-rose-300/50 bg-rose-300/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-rose-100 hover:bg-rose-300/20"
        >
          Delete Project
        </button>
      </form>
    </main>
  );
}
