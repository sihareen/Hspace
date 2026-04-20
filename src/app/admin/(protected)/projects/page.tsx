import { prisma } from "@/lib/prisma";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl text-slate-100">Manage Projects</h1>
        <a
          href="/admin/projects/new"
          className="rounded-md border border-cyan-300/50 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.15em] text-cyan-100"
        >
          Add Project
        </a>
      </div>

      <div className="space-y-3">
        {projects.length === 0 ? (
          <p className="rounded-xl border border-cyan-300/15 bg-slate-900/60 p-4 text-sm text-slate-300">
            No projects yet. Create your first one.
          </p>
        ) : (
          projects.map((project) => (
            <article
              key={project.id}
              className="rounded-xl border border-cyan-300/15 bg-slate-900/70 p-4 md:flex md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-lg text-slate-100">{project.title}</h2>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{project.status}</p>
                <p className="mt-2 text-sm text-slate-300">/{project.slug}</p>
              </div>
              <a
                href={`/admin/projects/${project.id}/edit`}
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
