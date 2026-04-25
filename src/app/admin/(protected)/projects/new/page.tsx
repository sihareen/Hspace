import { createProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";

type NewProjectPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewProjectPage({ searchParams }: NewProjectPageProps) {
  const params = await searchParams;
  const errorMessage =
    params.error === "invalid_type"
      ? "Format file tidak didukung. Gunakan png/jpg/jpeg/webp/gif."
      : params.error === "too_large"
        ? "Ukuran file terlalu besar. Maksimum 5MB."
        : params.error === "missing_token"
          ? "Storage belum terkonfigurasi. Set BLOB_READ_WRITE_TOKEN di environment Vercel."
          : params.error === "upload_failed"
            ? "Upload gagal di storage. Coba ulang atau periksa konfigurasi Blob."
            : params.error === "db_error"
              ? "Gagal menyimpan project ke database. Cek koneksi DATABASE_URL dan coba ulang."
            : params.error
              ? "Invalid input. Please review all fields."
              : null;

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl text-slate-100">Add Project</h1>
        <a href="/admin/projects" className="text-sm text-cyan-200">
          Back to list
        </a>
      </div>

      {errorMessage ? (
        <p className="rounded-md border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {errorMessage}
        </p>
      ) : null}

      <ProjectForm action={createProjectAction} submitLabel="Create Project" />
    </main>
  );
}
